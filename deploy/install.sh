#!/usr/bin/env bash
# One-time bootstrap of the Pi: brings the whole stack up and installs the auto-deploy timer, so that
# from then on a power cycle or a push to main is all it takes. Run on the Pi, as qrytics, from the
# checkout — it sudo-prompts once for the systemd steps:
#
#   cd ~/apps/portfolio && git pull && bash deploy/install.sh
#
# Safe to re-run; every step is idempotent. It does NOT do the cutover: that is adding the public
# hostnames to the tunnel in the Cloudflare dashboard (PI-HOSTING-PLAN.md Phase 4 step 4), and this
# script stops short of it on purpose — until then the Pi serves only 127.0.0.1:8080.
#
# What survives a reboot afterwards, and why:
#   - docker.service is enabled here, and every compose service is `restart: unless-stopped`, so the
#     containers come back on their own when the daemon starts.
#   - portfolio-deploy.timer has OnBootSec=3min, so the first thing the Pi does after boot is catch up
#     with whatever was pushed while it was off.

set -euo pipefail

log() { printf '\n==> %s\n' "$*"; }
die() { printf '\nERROR: %s\n' "$*" >&2; exit 1; }

cd "$(dirname "$(readlink -f "$0")")/.."

# ── pre-flight (PI-HOSTING-PLAN.md Phase 5) ──────────────────────────────────────────────────────────
log 'pre-flight checks'
[[ "$(id -un)" == qrytics ]] || die "run as qrytics, not $(id -un) — the deploy unit runs as qrytics"
id -nG | tr ' ' '\n' | grep -qx docker \
	|| die 'qrytics is not in the docker group: sudo usermod -aG docker qrytics, log out and back in'
[[ -f .env ]] || die '.env is missing — cp .env.example .env, fill in GH_TOKEN and TUNNEL_TOKEN, chmod 600 .env'
for var in GH_TOKEN TUNNEL_TOKEN; do
	grep -qE "^${var}=.+" .env || die "$var is empty in .env (see .env.example for where to get it)"
done
grep -q $'\r' .env && die '.env has Windows line endings; fix with: sed -i "s/\r$//" .env'
chmod 600 .env
git fetch --quiet origin main || die 'git fetch failed — check the Pi has internet access'
if [[ -f ~/homelab/docker-compose.yml ]] && grep -q 'build:' ~/homelab/docker-compose.yml; then
	die 'homelab builds images locally, so deploy.sh'"'"'s global `docker image prune -f` is unsafe — see Phase 5'
fi

# ── stack ────────────────────────────────────────────────────────────────────────────────────────────
log 'syncing to origin/main'
git reset --hard --quiet FETCH_HEAD

log 'building and starting every service (a cold build takes a few minutes on a Pi 5)'
docker compose up -d --build

log 'waiting for the site to report healthy'
cid=$(docker compose ps -q portfolio)
for _ in $(seq 90); do
	status=$(docker inspect -f '{{.State.Health.Status}}' "$cid" 2>/dev/null || echo gone)
	[[ "$status" == healthy ]] && break
	[[ "$status" == unhealthy || "$status" == gone ]] && die "portfolio is $status — docker compose logs portfolio"
	sleep 2
done
[[ "$status" == healthy ]] || die "portfolio still '$status' after 3 minutes — docker compose logs portfolio"

for path in / /Moxel/; do
	code=$(curl -s -o /dev/null -w '%{http_code}' "http://127.0.0.1:8080$path")
	[[ "$code" == 200 ]] || die "GET $path returned $code, expected 200"
	echo "   $path 200"
done
docker compose ps

# ── boot persistence + auto-deploy ───────────────────────────────────────────────────────────────────
log 'enabling docker at boot and installing the deploy timer (sudo)'
sudo systemctl enable docker.service
sudo cp deploy/portfolio-deploy.{service,timer} /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable --now portfolio-deploy.timer
systemctl list-timers portfolio-deploy.timer --no-pager

log 'done'
cat <<'EOF'
The Pi now restarts everything on boot and redeploys within ~5 minutes of every push to main.

Last step, in the Cloudflare dashboard (this is the cutover — the site moves off Vercel):
  Zero Trust → Networks → Tunnels → the portfolio tunnel → Public hostnames
    mario-belmonte.com      → http://caddy:8080
    www.mario-belmonte.com  → http://caddy:8080
  Then: Always Use HTTPS on, Brotli on, no cache rule over /api/*.

Logs: journalctl -u portfolio-deploy -f
EOF
