#!/usr/bin/env bash
# Pull ~/apps/portfolio up to origin/main and redeploy, health-gated, with a one-generation rollback.
#
# Run by deploy/portfolio-deploy.timer every 5 minutes; see PI-HOSTING-PLAN.md Phase 5 for the install
# steps. The common case is the early return below — nothing to deploy, no Docker call at all. This is
# what picks up both existing CI cron workflows' commits, refresh-github-data.yml (6-hourly) and
# sync-rogueswipe.yml (30-min), with no CI changes at all.
#
# Because the build runs inside Docker, the host needs no Node toolchain.
#
# THE main()/exit WRAPPER IS LOAD-BEARING, not style. `git reset --hard` below rewrites *this file*
# while bash is executing it, and bash reads a script by byte offset — a mid-run change in length
# makes it resume at the wrong offset and execute a fragment. Defining a function forces the whole
# body to be parsed up front, and `main "$@"; exit $?` on ONE line means the `exit` is parsed with the
# call, so bash never reads from the file again after main returns.

set -euo pipefail

log() { printf '%s  %s\n' "$(date -Is)" "$*"; }

# Restore the previous image and recreate. $1 is 1 when a rollback point was tagged.
rollback() {
	if [[ "$1" != 1 ]]; then
		log 'no rollback point existed; leaving the failed container up for inspection'
		return 0
	fi
	log 'rolling back to portfolio-site:previous'
	# --force-recreate because the tag *name* is unchanged — only what it points at moved, and a
	# plain `up -d` compares the tag.
	docker image tag portfolio-site:previous portfolio-site:latest \
		&& docker compose up -d --force-recreate portfolio \
		|| log 'ROLLBACK ITSELF FAILED — the site is down; intervene by hand'
}

main() {
	# One deploy at a time. systemd already refuses to start portfolio-deploy.service while an
	# instance runs, so this guards the other case: a human running ./deploy.sh as the timer fires.
	# Exit 0, not 1 — a skipped tick is normal, and non-zero would paint `systemctl status` red.
	local lock="${TMPDIR:-/tmp}/portfolio-deploy.lock"
	exec 9>"$lock"
	if ! flock -n 9; then
		log "another deploy holds $lock; skipping this run"
		return 0
	fi

	# This script sits in the repo root next to docker-compose.yml, and every `docker compose` call
	# below resolves relative to the working directory. readlink -f so a symlinked path still works.
	cd "$(dirname "$(readlink -f "$0")")"

	# FETCH_HEAD, not origin/main: it is exactly what this fetch just wrote, and it does not depend on
	# the clone's remote.origin.fetch refspec being configured the usual way.
	git fetch --quiet origin main
	local current target
	current=$(git rev-parse HEAD)
	target=$(git rev-parse FETCH_HEAD)

	# The common path, ~99% of ticks: silent, and Docker is never invoked.
	[[ "$current" == "$target" ]] && return 0

	log "deploying ${current:0:8} -> ${target:0:8}"

	# `.env` (GH_TOKEN, TUNNEL_TOKEN) is untracked *and* gitignored, so --hard cannot touch it. A reset
	# rather than a pull is right because the Pi never edits this tree: it lands CI's commits to
	# static/github-*.json and static/games/rogueSwipe cleanly, where a pull could conflict.
	git reset --hard --quiet "$target"

	local changed
	changed=$(git diff --name-only "$current" HEAD)

	# One-generation rollback point. docker-compose.yml pins `image: portfolio-site:latest` precisely
	# so there is a stable tag to move here rather than compose's derived name.
	local have_rollback=0
	if docker image inspect portfolio-site:latest >/dev/null 2>&1; then
		docker image tag portfolio-site:latest portfolio-site:previous
		have_rollback=1
	else
		log 'no portfolio-site:latest yet — this deploy has no rollback point'
	fi

	docker compose build portfolio

	# Scope the recreate to what actually changed. caddy answers four proxied route groups that never
	# touch the origin (/tutoring, /games/vcKaraoke, /room/*, /_next/*) and cloudflared is the tunnel
	# itself; neither should be cycled just because the app rebuilt.
	if grep -qx 'docker-compose.yml' <<<"$changed"; then
		log 'docker-compose.yml changed — recreating the whole project'
		docker compose up -d
	else
		docker compose up -d portfolio
	fi

	# The Caddyfile is a read-only bind mount and caddy does not watch it, so without this a
	# Caddyfile-only commit sits unapplied until something unrelated restarts the container: the config
	# on disk and the config being served diverge silently, which is the failure mode the whole
	# "vercel.json and the Caddyfile are a pair" rule exists to avoid. `reload` validates first and
	# keeps the running config if the new one is bad, so a broken Caddyfile is a non-zero exit here
	# rather than an outage. -T because there is no TTY under systemd.
	if grep -qx 'Caddyfile' <<<"$changed"; then
		if [[ -n "$(docker compose ps -q caddy)" ]]; then
			log 'Caddyfile changed — reloading caddy'
			docker compose exec -T caddy caddy reload --config /etc/caddy/Caddyfile --adapter caddyfile
		else
			log 'Caddyfile changed but caddy is not running; it will read the new file on next start'
		fi
	fi

	# ── health gate ────────────────────────────────────────────────────────────────────────────────
	# The probe is the Dockerfile's HEALTHCHECK (prerendered /projects-index.json — deliberately not an
	# /api/* route, which would burn the GitHub rate limit on a 30 s interval). Worst case to a verdict
	# is start-period 15s + 3 x interval 30s, so 150 s of margin covers only a container stuck in
	# `starting`: an explicit `unhealthy` breaks out at once, because every second spent waiting on a
	# container that has already failed is a second of 502s.
	local cid status started=$SECONDS
	cid=$(docker compose ps -q portfolio)
	if [[ -z "$cid" ]]; then
		log 'FAILED: no portfolio container exists after up -d'
		rollback "$have_rollback"
		return 1
	fi

	while :; do
		status=$(docker inspect -f '{{if .State.Health}}{{.State.Health.Status}}{{else}}none{{end}}' "$cid" 2>/dev/null || echo gone)
		case "$status" in
			healthy)
				log "healthy after $((SECONDS - started))s"
				break
				;;
			unhealthy|gone)
				log "FAILED: portfolio reports '$status' after $((SECONDS - started))s"
				rollback "$have_rollback"
				return 1
				;;
			none)
				# The image lost its HEALTHCHECK, so this deploy cannot be verified. Roll back rather
				# than ship blind — the gate is the only thing standing between a bad build and the
				# live site, and the journal line says exactly what to fix.
				log 'FAILED: the image declares no HEALTHCHECK, so the deploy cannot be verified'
				rollback "$have_rollback"
				return 1
				;;
		esac
		if (( SECONDS - started >= 150 )); then
			log "FAILED: still '$status' after $((SECONDS - started))s"
			rollback "$have_rollback"
			return 1
		fi
		sleep 2
	done

	# Dangling images only — not `-a` — so portfolio-site:previous survives: it is tagged, and it is
	# the next rollback point. NB pruning is global to the Docker daemon, the same class of
	# cross-project hazard as container_name; homelab runs prebuilt images and builds nothing, so it
	# has no dangling images here to lose.
	docker image prune -f >/dev/null

	log "deployed ${target:0:8}"
}

main "$@"; exit $?
