# Self-host the portfolio on the Raspberry Pi 5 (Cloudflare Tunnel → Caddy → SvelteKit)

> **How to use this document.** It is a phase-by-phase migration plan, written to be executed by a
> fresh Claude Code session. Phases are ordered by dependency. **Phases 0–3 are DONE, and Phase 4 is
> done except for the three things that need the Cloudflare dashboard — start with those** (create the
> second tunnel, write `.env` on the Pi, add the apex public hostname). Phase 5 writes a script but
> changes nothing live; **Phase 4 step 4 is the cutover**, and everything before it is reversible with
> no downtime. Nothing is live on the Pi yet: the site is still served by Vercel.
>
> Pi access: `ssh marioserver` (user `qrytics`, `192.168.1.72`, also reachable over Tailscale). A
> dedicated key is installed, so the bare host alias works; password auth is disabled.
>
> **Decisions already taken — do not relitigate.** Each is argued in its own phase section:
>
> - **App path is `~/apps/portfolio`** on the ext4 root, *not* `/mnt/data/...`. That path does not
>   exist and the 2TB drive is NTFS. (Phase 0)
> - **A second, independent Cloudflare tunnel**, owned by the portfolio compose project — *not* the
>   existing homelab tunnel. (Phase 3, "Why B")
> - **No `@gamedir` rewrite in the `Caddyfile`.** adapter-node already resolves the directory index,
>   and the rewrite as originally drafted broke `/games/typetest/`. (Phase 2)
> - **Clone `~/apps/portfolio` *before* writing its `.env`.** `git clone` refuses any non-empty
>   destination, and a lone dot-file counts. (Phase 3 results) — **done this way, cleanly.**
> - **The cutover's public hostnames are the apex and `www`, and nothing else.** Adding `tutoring`
>   would make `/tutoring` an infinite proxy loop, because the `Caddyfile` proxies it to
>   `tutoring.mario-belmonte.com`. (Phase 4 results)
>
> | Phase | What | Live impact | Status |
> |---|---|---|---|
> | 0 | Inventory the Pi (read-only) | none | **DONE 2026-08-23** — results below |
> | 1 | Repo changes: dual adapter, Dockerfile, 2 small fixes | none | **DONE 2026-08-23** — results below |
> | 2 | Write the `Caddyfile` | none | **DONE 2026-08-23** — results below |
> | 3 | Write `docker-compose.yml` + `.env` | none | **DONE 2026-08-23** (approach **B**) — results below |
> | 4 | Second tunnel, apex public hostname, **cutover** | steps 1–3 none; step 4 is the switch | **PARTLY DONE 2026-08-23** — steps 1–2 verified, Pi cloned/built/re-verified; ← **the tunnel, step 4 and step 5 need the dashboard** |
> | 5 | Deploy script + systemd timer | none | **UNBLOCKED** — `main` is pushed at `e1ceecbd` |
> | 6 | Verification | none | **run once against `127.0.0.1:8080`** in Phase 4 (all green); re-run after cutover |

## Context

The site currently runs on Vercel via `@sveltejs/adapter-vercel`, and `vercel.json` is doing
real work: 12 reverse-proxy rewrites to three external apps, three header rules, and — least
visibly — **directory-index resolution** for the six vendored game builds under `static/games/`.
The goal is to serve `mario-belmonte.com` from the Pi instead, without regressing any of that,
while keeping the Vercel project alive on its `*.vercel.app` URL as a fallback.

Decisions already made: **Cloudflare Tunnel** for exposure (no port-forwarding, home IP hidden,
survives CGNAT), **build on the Pi**, **poll git on a timer** for deploys, **leave the GitHub data
refresh in GitHub Actions**, **keep Vercel as a fallback**.

What an audit of the repo established:

- **Only two files need a running Node process**: `src/routes/api/github-contrib/+server.ts` and
  `src/routes/api/github-recent/+server.ts`. Everything else — 36 project pages, `/sitemap.xml`,
  `/projects-index.json`, all games — prerenders. Total runtime env surface is one `GH_TOKEN`.
- Both API routes read `$env/dynamic/private`, so the token is read **at runtime** — rotating it
  needs a container restart, not a rebuild.
- Both routes already hold a module-level 30-min memo. On a single long-lived process that memo
  actually persists, which is *better* than Vercel's per-invocation lambdas.
- `@sveltejs/adapter-node` is **not** currently a devDependency (only `adapter-vercel`,
  plus dead `adapter-auto`/`adapter-static`).

## Target architecture

```
Internet → Cloudflare edge (DNS, TLS, WAF, cache)
             │  outbound-only tunnel, no open ports
             ▼
        cloudflared ──► caddy:8080 ──┬─► portfolio:3000   (adapter-node: prerendered pages + /api/*)
        (container)     (container)  ├─► spotifyhero-web.vercel.app
                                     ├─► vckaraoke-frontend.vercel.app   (/games/vcKaraoke, /room/*, /_next/*)
                                     └─► tutoring.mario-belmonte.com
```

Caddy — not adapter-node — owns the rewrites, the security headers, and the cache rules, because
that is what `vercel.json` was doing. Nothing is published to the host except `127.0.0.1:8080`
for local testing.

---

## Phase 0 — Inventory the Pi (read-only, do this first)

```bash
docker --version && docker compose version      # get-docker.sh exists; confirm it ran
cat ~/homelab/docker-compose.yml                # what's already running, which host ports are taken
lsblk -f                                        # ← FSTYPE of the 2TB drive: MUST be ext4
findmnt /mnt/... ; cat /etc/fstab               # mounted by UUID with nofail?
df -h ; free -h ; nproc ; vcgencmd measure_temp
```

**The filesystem check is a hard gate.** If the 2TB drive is exFAT or NTFS, `npm ci` will fail on
it (no symlinks, no exec bits, no POSIX ownership). Options if so: reformat to ext4 (destructive —
back up first), or keep the app on the internal disk and use the drive only for backups/media.
The paths below assume ext4; substitute `~/apps/portfolio` otherwise.

Target location: `/mnt/data/apps/portfolio` (repo checkout) — keeps rebuild churn off the SD card.

### RESULTS — executed 2026-08-23 (script: `.verify/pi-inventory.sh`, output: `.verify/pi-inventory-output.txt`)

Pi 5 Model B Rev 1.1, 8 GB, 4 cores, Debian 13 (trixie) arm64, kernel 6.18.34, up 22 days.
`node:22-bookworm-slim` is arm64-native — no emulation. 57.6 °C idle, `throttled=0x0` (never
throttled). 7.1 GB RAM available, 2 GB zram swap. Comfortable for `npm ci` + vite in Docker.

**Green — no action needed:**

- Docker 29.7.1, Compose v5.3.1, daemon reachable **without sudo** (`qrytics` is in group `docker`).
  Phase 5's systemd unit can run as `qrytics`; no `sudo` anywhere in Phases 3/5.
- **Ports 8080, 3000, 80 and 443 are all free.** Only `4533` (navidrome), `22`, `111` (rpcbind)
  and Tailscale are listening. Phase 3 can publish `127.0.0.1:8080` as drafted.
- `git` 2.47.3 present; no host `node`/`npm` — irrelevant, the build is in Docker.
- 21 GB free on the ext4 root. A full clone is ~154 MB (16.1 MB working tree over 279 tracked
  files, 138 MB pack). The Docker **build context is only 16 MB** — the six vendored game builds
  are 81 tracked files and the largest single asset is 1.4 MB.
- fstab mounts the external drive **by UUID with `nofail`** ✓. Root and boot use PARTUUID, which
  is the Raspberry Pi default and stable.
- Tailscale 1.98.10 up; `marioserver` = `100.114.30.124`.

**⚠ HARD GATE FAILED — 2TB drive is NTFS, but this matters much less than assumed.**

`/dev/sda1` ("Seagate Portable Drive") is **NTFS via ntfs-3g/fuseblk**, mounted at **`/mnt/storage`**,
not `/mnt/data` — which does not exist. The POSIX probe reported `symlink=ok exec-bit=ok`, but that
is a false pass: ntfs-3g emulates symlinks as reparse points, and the mount options
(`user_id=0,group_id=0,allow_other`, no `permissions`) make every file appear `0777` root-owned, so
`chmod` is a silent no-op and the exec-bit test passes trivially. There is no real POSIX ownership.

**However, the plan's stated rationale for using the drive — "keeps rebuild churn off the SD card" —
does not hold.** `npm ci` never touches the host filesystem: Phase 1b builds inside Docker, so it
runs in a container layer under `/var/lib/docker`, which is `overlayfs` on the **SD card**. Moving
the git checkout to the drive relocates a 16 MB build context and changes nothing about write churn.
The lever for SD wear is Docker's `data-root`, not the repo path — and that cannot move to this drive
either, since overlayfs cannot run on fuseblk.

→ **Decision: use `~/apps/portfolio` on the ext4 root** (the plan's own fallback). Do not reformat:
it is not required, and the drive holds navidrome's music library plus appdata (4.2 GB used).
Substitute `~/apps/portfolio` for `/mnt/data/apps/portfolio` throughout Phases 3 and 5.
Revisit only if SD-card wear becomes a measured problem, at which point reformatting the drive to
ext4 and moving Docker's `data-root` is the real fix.

**⚠ Phase 4 steps 1–2 are ALREADY DONE, and risk #3 is retired.**

`mario-belmonte.com` is already a Cloudflare zone: a `cloudflared` container has been running for
3 weeks serving `music.mario-belmonte.com` → `http://navidrome:4533`. The nameservers have therefore
already moved and live email has been running on this DNS since ~2026-08-01. **Risk #3 (missing
MX/SPF/DKIM/DMARC when nameservers move) no longer applies** — the move already happened uneventfully.
Phase 4 reduces to: add a public hostname for the apex, which is the cutover. Still glance at the
record list, since the zone is being edited.

The existing tunnel's ingress lists only `music.` — so **`tutoring.mario-belmonte.com` is not routed
through the tunnel**, which is what risk #5 asks for. Confirm the DNS record itself in Phase 4.

**⚠ Phase 3's open question is answered: yes, there is a reason to share a network.**

The running `cloudflared` is attached to **`homelab_default`** (from `~/homelab/docker-compose.yml`)
and nothing else. Two ways forward — pick one at Phase 3:

| | Approach | Cost |
|---|---|---|
| **A** | Reuse the existing tunnel: attach the portfolio's `caddy` to `homelab_default` as an `external` network, then add the apex public hostname → `http://caddy:8080` in the dashboard. | Couples the two compose projects. `caddy` is a free service name on that network — homelab has no such service, so no collision. |
| **B** | Second tunnel: own `cloudflared` in the portfolio project with its own `TUNNEL_TOKEN`, as Phase 3 currently drafts. | One more container (~30 MB RAM) and a second connector; keeps the projects independent. |

**⚠ Incidental, outside this plan's scope — flagged because the inventory surfaced them:**

1. **The `TUNNEL_TOKEN` is in plaintext in `~/homelab/docker-compose.yml`** (mode 664, group
   `docker`), and is consequently in this session's transcript. It was redacted from
   `.verify/pi-inventory-output.txt`, and `.verify/` is gitignored so it cannot be committed. A
   tunnel token lets a holder run a connector for that tunnel — i.e. serve traffic for its
   hostnames. Rotating it is prudent. Phase 3's `600`-mode `.env` is the better pattern regardless.
2. `rpcbind` listens on `0.0.0.0:111` and **no firewall is installed** (`ufw` absent); navidrome is
   published to the whole LAN on `0.0.0.0:4533`. Unrelated to this migration.

---

## Phase 1 — Repo changes (on Windows, branch off `site-overhaul`)

### 1a. Dual adapter in `svelte.config.js`

Keep Vercel as the default so the fallback deployment is untouched; select adapter-node by env:

```js
import adapterVercel from '@sveltejs/adapter-vercel';
import adapterNode from '@sveltejs/adapter-node';
// ...
// Two adapters on purpose: the Pi is the primary host (ADAPTER=node → `build/`, a long-lived
// Node process), and the Vercel project stays deployed on its *.vercel.app URL as a fallback.
adapter: process.env.ADAPTER === 'node'
  ? adapterNode()
  : adapterVercel({ runtime: 'nodejs22.x', regions: ['iad1'] })
```

- Add `@sveltejs/adapter-node` to `devDependencies`. Leave `vercel.json` and `adapter-vercel` in
  place — **the fallback depends on both.**
- Leave `prerender.handleHttpError` exactly as-is: the prerenderer still can't resolve
  `/games/<slug>/`, regardless of adapter.
- Leave `SITE_URL` (`src/lib/data/seo.ts:24`) and `static/robots.txt` alone — the domain isn't changing.

### 1b. `Dockerfile` (multi-stage, arm64 native)

Build stage `node:22-bookworm-slim`: copy `package*.json`, `npm ci`, copy the rest,
`ADAPTER=node npm run build`. Runtime stage: copy `build/` + `package.json` only — adapter-node
bundles its own deps and the repo has **zero production dependencies**, so no `node_modules` ships.
Run as a non-root user. `CMD ["node", "build"]`.

Env for the runtime stage:

| Var | Value | Why |
|---|---|---|
| `NODE_ENV` | `production` | |
| `PORT` | `3000` | |
| `ORIGIN` | `https://mario-belmonte.com` | **Required.** adapter-node behind a proxy otherwise mis-resolves request URLs. |
| `ADDRESS_HEADER` | `CF-Connecting-IP` | Real client IPs in logs. |

`HEALTHCHECK` should hit `/projects-index.json` (prerendered, static) — **not** an `/api/*` route,
which would burn GitHub quota on every probe.

Add `.dockerignore`: `.git`, `node_modules`, `.svelte-kit`, `.vercel`, `.verify`, `build`.
Do **not** exclude `static/` — the six game builds live there.

### 1c. Two small fixes the migration makes necessary

- `src/lib/data/games.ts:75` — dodgeLoL's `playUrl` is `https://mario-belmonte.com/games/dodgeLoL`
  even though the game is vendored locally. Change to `/games/dodgeLoL/`. This also fixes it in
  `npm run dev`, since `vite.config.ts` derives `vendoredGamePaths` from `playUrl`.
  (Leave vcKaraoke's absolute URL — that one is genuinely a different app.)
- `scripts/verify-chart.mjs:19` — `const OUT = 'C:/Users/MarioBelmonte/...'` is a hardcoded Windows
  path and will fail on the Pi. Change to `path.join(process.cwd(), '.verify')`.

Run `npm run check` before pushing.

### RESULTS — executed 2026-08-23 (branch `site-overhaul`; ~~not committed, not pushed~~ — **committed as `77840c09` and pushed to `main` in Phase 4**)

All of 1a/1b/1c done as specified, plus a doc pass that CLAUDE.md's own rules make mandatory.

**Changed:** `svelte.config.js` (dual adapter), `package.json` + `package-lock.json`
(`@sveltejs/adapter-node@^5.5.7` in devDependencies), `src/lib/data/games.ts` (dodgeLoL `playUrl`),
`scripts/verify-chart.mjs` (`OUT` → `path.join(process.cwd(), '.verify')`).
**New:** `Dockerfile`, `.dockerignore`.
**Docs:** `CLAUDE.md` (new "Two hosts, two adapters" section, build-command table, Known
inconsistencies), `AGENTS.md`, `.bob/rules-ask/AGENTS.md`.

Two implementation choices that differ from the letter of the spec above, both deliberate:

- The `HEALTHCHECK` uses `node -e "fetch(...)"` against `/projects-index.json` rather than `curl`.
  The slim base image is not guaranteed to keep `curl` across a rebase; `node` is guaranteed present.
- `.dockerignore` excludes root markdown as `/*.md`, not `*.md`, so `static/sounds/README.md` still
  ships and the served static tree stays byte-identical to what Vercel serves.

**Verified, not assumed:**

| Check | Result |
|---|---|
| `npm run check` | 210 files, **0 errors** |
| `ADAPTER=node npm run build` | clean; 43 prerendered routes; `build/` emitted |
| `npm run verify:seo` against that build | **893 passed, 0 failed** — confirms Phase 6's claim that this suite now runs without Windows Developer Mode |
| `npm run build` (Vercel default) | still the documented Windows `EPERM`, *inside* `adapter-vercel`'s symlink step after prerendering. Pre-existing, not a regression — the fallback path is intact. |
| `node build` smoke test | `/`, `/projects-index.json`, `/sitemap.xml`, `/games` and a real project page → 200; `/api/github-contrib` → **503** (the load-bearing status, no local token); the `Dockerfile`'s healthcheck command exits 0 verbatim |
| all six `/games/<slug>/` | **200** — see the Phase 2 note, this changes the Caddyfile |

`dodgeLoL` now appears in the expected `[404] GET /games/<slug>/` prerender lines. That is correct,
and is the proof the 1c fix took effect: the link is relative now, so the crawler reaches it and
`handleHttpError` whitelists it.

**Outstanding:** nothing is committed. Phase 5's `deploy.sh` tracks `origin/main` while this work is
on `site-overhaul` — see the Phase 5 prerequisite.

---

## Phase 2 — `Caddyfile` (the highest-risk piece)

Translating `vercel.json`. Two ordering constraints and one case-sensitivity trap carry over.

**Read this before writing the file. The draft below has been corrected since it was first written,
and one directive was deleted because it was actively wrong.** Both findings come from running the
real adapter-node build in Phase 1 — measured, not reasoned:

- **All six vendored games already return 200 at `/games/<slug>/` straight from adapter-node.** Its
  static handler (sirv) *does* resolve a directory index, unlike the prerenderer and unlike the dev
  server. Risk #1 is handled by the origin, so Caddy does not need to touch it.
- **The originally drafted `@gamedir` rewrite was a bug and has been removed.** Its regex
  `^/games/([^/]+)/$` also matches `/games/typetest/` — and `/games/typetest` is a **real SvelteKit
  route**, not a vendored directory. Measured: `/games/typetest/` → **308** (correct; SvelteKit
  redirects to the no-trailing-slash form) and `/games/typetest/index.html` → **404**. The rewrite
  would have turned a working redirect into a 404 on a page that works today. This is precisely the
  trap `serveVendoredGameIndexes` in `vite.config.ts` documents and guards against by checking
  `games.ts` — and Caddy *cannot* make that check, because the static files live inside the
  `portfolio` container where Caddy cannot see them. Let the origin do it; verify with the six-game
  curl loop in Phase 6.

**The block below is the original draft, kept for its reasoning — do not copy it verbatim.** Two of
its directive forms do not parse and two rewrites are missing; the file as written and verified is
`Caddyfile` in the repo root. See RESULTS at the end of this phase.

```caddyfile
:8080 {
    encode zstd gzip

    # vercel.json headers rule A — applies to every response, proxied ones included
    header {
        Strict-Transport-Security "max-age=63072000; includeSubDomains; preload"
        X-Content-Type-Options    nosniff
        Referrer-Policy           strict-origin-when-cross-origin
        X-Frame-Options           SAMEORIGIN
        Content-Security-Policy   "frame-ancestors 'self'"
        Permissions-Policy        "camera=(), geolocation=(), payment=(), usb=(), microphone=(self)"
        -Server
    }

    # rule B — long-lived asset cache. Go's RE2 has (?i), so the per-character case classes
    # collapse to one case-insensitive class. This is what covers the two .PNG about-photos.
    @longcache path_regexp (?i)\.(png|jpe?g|gif|webp|avif|svg|ico|mp4|webm|mp3|wav|ogg|woff2?|ttf|otf)$
    header @longcache Cache-Control "public, max-age=604800, s-maxage=31536000, stale-while-revalidate=86400"

    # rule C
    @ghjson path /github-contrib.json /github-recent.json
    header @ghjson Cache-Control "public, max-age=300, s-maxage=1800, stale-while-revalidate=86400"

    # ── external proxies. First matching `handle` wins, so the scoped spotifyHero /_next/
    #    block MUST stay above the root /_next/* catch-all (see CLAUDE.md:82).
    #    Each proxy is an explicit two-pattern pair (bare path + subtree) rather than one `*`
    #    suffix, because Caddy's `path` is a *literal prefix* match: `/games/spotifyHero*` would
    #    also swallow `/games/spotifyHeroFoo`, which `vercel.json` does not. Copy these as written.
    handle /games/spotifyHero/_next/* { reverse_proxy https://spotifyhero-web.vercel.app { header_up Host {upstream_hostport} } }
    handle /games/spotifyHero /games/spotifyHero/* { reverse_proxy https://spotifyhero-web.vercel.app { header_up Host {upstream_hostport} } }

    # handle_path strips the prefix: /games/vcKaraoke → upstream /, /games/vcKaraoke/x → /x.
    # That asymmetry is what rewrites 5-7 do and it's easy to lose in translation. The bare
    # pattern strips to "", which Caddy normalises to "/" — exactly rewrites 5-6.
    handle_path /games/vcKaraoke /games/vcKaraoke/* { reverse_proxy https://vckaraoke-frontend.vercel.app { header_up Host {upstream_hostport} } }
    handle /room/*                   { reverse_proxy https://vckaraoke-frontend.vercel.app { header_up Host {upstream_hostport} } }
    handle /tutoring /tutoring/*     { reverse_proxy https://tutoring.mario-belmonte.com     { header_up Host {upstream_hostport} } }
    handle /_next/*                  { reverse_proxy https://vckaraoke-frontend.vercel.app { header_up Host {upstream_hostport} } }

    # ── directory index for the vendored games: DELIBERATELY ABSENT.
    # adapter-node already resolves /games/<slug>/ (verified: all six → 200), and a naive
    # `^/games/([^/]+)/$` rewrite here would also catch /games/typetest/ — a real SvelteKit
    # route — turning a working 308 into a 404. Caddy cannot tell the two apart; the files
    # are inside the portfolio container. See the note above this code block.

    handle { reverse_proxy portfolio:3000 }
}
```

Notes:

- **No ACME/TLS in Caddy.** Cloudflare terminates TLS and the tunnel is authenticated, so Caddy
  serves plain HTTP on an internal network. No cert volume, no port 80 needed.
- `_app/immutable/*.js` doesn't match `@longcache` (no `js` in the extension list), so
  adapter-node's own `immutable` headers survive — matching current behaviour.
- `header_up Host {upstream_hostport}` is required on every Vercel upstream; Vercel routes by Host
  and will 404 without it.
- Caddy evaluates `handle` blocks in written order and they are mutually exclusive, so writing them
  in the order above is what satisfies the `/_next/*` ordering constraint. Nothing else enforces it.
- The explicit two-pattern pairs in the proxy matchers are deliberate, not verbosity — see the
  comment above them. Caddy's `path` is a literal prefix match, so a bare `*` suffix over-matches
  (`/games/spotifyHeroFoo`) in a way `vercel.json`'s `/games/spotifyHero/:path*` does not.
- ~~One knowingly-accepted deviation: `vercel.json` maps bare `/tutoring` to upstream `/tutoring/`
  *with* a trailing slash, whereas `handle` forwards `/tutoring` as-is.~~ **RETIRED — and it was two,
  not one** (`/games/spotifyHero/` has the mirror-image asymmetry). The upstreams answer the
  unrewritten form with a 308, not a 404, so both are reproduced with a `rewrite` instead of
  accepted. See RESULTS item 3.
- `@ghjson` matches only `/github-contrib.json` and `/github-recent.json`, which is what
  `vercel.json`'s `/(github-(?:contrib|recent)\.json)` matches. `.json` is absent from the
  `@longcache` extension list, so the two rules cannot both fire on the same path.

### The 12 `vercel.json` rewrites being replaced, for reference

| # | Source | Destination |
|---|---|---|
| 1 | `/games/spotifyHero/_next/:path*` | `https://spotifyhero-web.vercel.app/games/spotifyHero/_next/:path*` |
| 2–4 | `/games/spotifyHero`, `/`, `/:path*` | `https://spotifyhero-web.vercel.app/games/spotifyHero/...` |
| 5–6 | `/games/vcKaraoke`, `/games/vcKaraoke/` | `https://vckaraoke-frontend.vercel.app/` ← **upstream root** |
| 7 | `/games/vcKaraoke/:path*` | `https://vckaraoke-frontend.vercel.app/:path*` |
| 8 | `/room/:path*` | `https://vckaraoke-frontend.vercel.app/room/:path*` |
| 9–11 | `/tutoring`, `/`, `/:path*` | `https://tutoring.mario-belmonte.com/tutoring/...` |
| 12 | `/_next/:path*` | `https://vckaraoke-frontend.vercel.app/_next/:path*` |

### RESULTS — executed 2026-08-23 (`Caddyfile` at the repo root; ~~not committed~~ **committed in Phase 4**, nothing live changed)

The file is `Caddyfile` in the repo root, so Phase 3's `./Caddyfile:/etc/caddy/Caddyfile:ro` bind
resolves from the checkout directory. `.dockerignore` already excludes it (Phase 1), so it never
enters the image.

The draft above is implemented as written, with four changes — each forced by measurement, not taste:

1. **Named matchers instead of inline pattern pairs.** `handle /games/spotifyHero /games/spotifyHero/* { … }`
   **does not parse**: a directive's inline matcher is a *single* token. Two-pattern matching is still
   the right behaviour (verified: `/games/spotifyHeroFoo` and `/games/vcKaraokeFoo` fall through to the
   origin, exactly as on Vercel), so the pairs moved into `@spotifyHero`, `@vcKaraoke`, `@tutoring`.
2. **`handle_path` → an explicit `uri strip_prefix`.** Same root cause: `handle_path` takes one literal
   path, which would have forced the over-matching `/games/vcKaraoke*`. Measured through the real
   config: bare → upstream `/`, trailing slash → `/`, `/games/vcKaraoke/room/x` → `/room/x` — i.e.
   rewrites 5–7 reproduced exactly.
3. **Two missing rewrites, each of which silently downgraded a live 200 to a client-visible 308.**
   Rewrite 3 maps `/games/spotifyHero/` to the upstream path *without* the slash, and rewrite 9 maps
   bare `/tutoring` to `/tutoring/` *with* one. Both asymmetries exist because the upstreams answer
   the other form with a 308 — measured on both hosts. Added `rewrite @spotifyHeroSlash /games/spotifyHero`
   and `rewrite @tutoringBare /tutoring/`. **The draft's "one knowingly-accepted deviation" note is
   retired:** it was two deviations, and neither had to be accepted.
4. **The `/_next/*` ordering constraint is defensive, not currently load-bearing** — the file now says
   so rather than repeating the stronger claim. Spotify Hero sets Next's `basePath`, so its markup
   references `/games/spotifyHero/_next/...` and never bare `/_next/...` (read out of the served HTML).
   Caddy's `path` is a prefix match, so `@nextAssets` cannot swallow those and `@spotifyHeroNext` is
   in fact redundant with `@spotifyHero`. Separately, **written order is not what orders them**: the
   Caddyfile adapter sorts `handle` routes by path-matcher specificity, and swapping the two blocks
   leaves the adapted JSON byte-identical. Both are kept, in the safe order, for the next proxied Next
   app that has no `basePath`.

**Verified in a throwaway `caddy:2-alpine` container on the Pi** (removed afterwards; nothing was left
listening, the image stays pulled because Phase 3 needs it):

| Check | Result |
|---|---|
| `caddy validate` | **Valid configuration** |
| `caddy fmt --diff` | no differences — fmt-clean |
| 11 proxied paths, status vs live `https://mario-belmonte.com` | **0 mismatches** (incl. a real Spotify Hero JS chunk and CSS file, `/room/test`, `/tutoring/contact` → 404 on both) |
| matcher precision | `/games/spotifyHeroFoo`, `/games/vcKaraokeFoo` → origin, not the proxies |
| `/_next/...` chunk via the scoped rule vs the catch-all | 200 vs 404 — the two upstreams are genuinely different apps |
| headers rule A on a proxied 200 **and** on an origin 502 | all six present, each exactly once, `Server` stripped |
| headers rule B | fires on `.jpg`, `.JPG`, `.JPEG`, `.png`, `.mp3`, `.ico`; **not** on `/_app/immutable/*.js` (origin keeps deciding) or `/sitemap.xml` |
| headers rule C | fires on both `/github-contrib.json` and `/github-recent.json`, and cannot collide with rule B |
| `/games/typetest/`, `/games/<slug>/`, `/`, `/about` | forwarded unmodified — no rewrite touches them |

Origin-backed paths answered **502** in this test because no `portfolio` container exists yet. That is
expected, and it is also the proof that the final `handle { reverse_proxy portfolio:3000 }` fallthrough
is reached. Phase 6 is where those turn 200.

**Two findings that change how Phase 6 should be read:**

1. **`vercel.json` as committed has never been deployed.** It exists only on `site-overhaul`
   (commit `ee3d464b`); production serves `main`'s version — 11 rewrites and **no `headers` block at
   all**. Measured on the live site: no `Content-Security-Policy`, no `Permissions-Policy`,
   `server: Vercel` still advertised, `Strict-Transport-Security: max-age=63072000` without
   `includeSubDomains; preload`, and every asset `public, max-age=0, must-revalidate` rather than the
   long cache. The Caddyfile is faithful to `vercel.json`; the cutover therefore **adds** the three
   header rules to what visitors get rather than preserving them. Intended, but don't read a header
   diff against today's live site as a Caddy bug.
2. **There is no `.PNG` anywhere under `static/`.** The uppercase files are four `.JPG` and one
   `.JPEG` in `static/about/`, 894 KB in total — so CLAUDE.md's "~800 KB" figure holds while its
   extension does not. Phase 6's cache-header curl now names a real file, and CLAUDE.md is corrected.

**Deliberately absent:** the `@gamedir` rewrite (see the decisions at the top of this document), any
TLS/ACME config, and a `log` block — Phase 3's docker `logging` cap is what bounds log growth.

---

## Phase 3 — `docker-compose.yml` (**approach B**: the portfolio owns its own tunnel)

At **`~/apps/portfolio/`** — not `/mnt/data/...`, which does not exist (Phase 0). This is also the
git checkout root. Its own compose project, sharing **no** network with `~/homelab`.

| Service | Image | Notes |
|---|---|---|
| `portfolio` | built from the repo `Dockerfile` | `env_file: .env` (`GH_TOKEN`), **no published ports** |
| `caddy` | `caddy:2-alpine` | `./Caddyfile:/etc/caddy/Caddyfile:ro`, published on `127.0.0.1:8080` only |
| `cloudflared` | `cloudflare/cloudflared:latest` | `command: tunnel --no-autoupdate run`, `TUNNEL_TOKEN` from `.env` |

All three: `restart: unless-stopped`, plus a `logging` block with `max-size`/`max-file` so the
journal and the SD card don't fill. Neither homelab service has one — don't copy that habit.

`.env` at mode `600`, holding `GH_TOKEN` and `TUNNEL_TOKEN`. It sits in the checkout directory, which
is safe in both directions already: `.gitignore` covers `.env` so it cannot be committed, and
`.dockerignore` excludes it so it cannot enter the image. **Do not** pass `GH_TOKEN` as a build arg —
both API routes read it from `$env/dynamic/private` at request time, so a restart rotates it.

Use a **remote-managed tunnel** (token from the Cloudflare dashboard) rather than a local
`config.yml` — the public-hostname → `http://caddy:8080` mapping then lives in the dashboard and
the DNS record is created for you.

### Why B (own tunnel) rather than A (reuse the homelab tunnel)

Phase 0 found a `cloudflared` already running from `~/homelab/docker-compose.yml` — a two-service
file, navidrome + cloudflared, nothing else — serving `music.mario-belmonte.com`. Reusing it would
save one ~30 MB container. Rejected, for three reasons in descending order of importance:

1. **It would put the apex domain's uptime inside a project you edit for unrelated reasons.** Every
   `docker compose down` in `~/homelab` to add or change a service would take the public site down
   with it. Homelab is the tinkering surface; the portfolio should be boring. On an 8 GB Pi with
   7.1 GB available, 30 MB is not worth that coupling.
2. **`homelab_default` is an *implicit* network.** That compose file has no `networks:` block at all,
   so the name is derived from the directory name. Rename `~/homelab`, or set `COMPOSE_PROJECT_NAME`,
   and an `external: true` reference from here silently stops resolving — `caddy` then won't start,
   with nothing in either file explaining why. (If B is ever revisited in favour of A, the first step
   is declaring a real named network in homelab rather than depending on the derived string.)
3. **The secret story is better.** Homelab's `TUNNEL_TOKEN` is plaintext at mode `664` and has been
   through a session transcript, so it wants rotating anyway. Two independent tunnels means rotating
   either one needs no coordination with the other.

### Three traps, all of which fail quietly

1. **Do not reuse homelab's `TUNNEL_TOKEN` here — create a genuinely separate tunnel.** A
   remote-managed tunnel's ingress rules are per-*tunnel* and shared by every connector running that
   token, and Cloudflare distributes requests across connectors. A second connector on the same token
   would advertise itself as able to serve `music.mario-belmonte.com` — which it cannot, because
   `navidrome` sits on a network it is not attached to. The result is a fraction of music requests
   failing at random, with nothing pointing back at this project. **Second connector ⇒ second
   tunnel, distinct token.**
2. **Do not set `container_name:` on any of the three services.** Homelab already claims the names
   `cloudflared` and `navidrome`, and container names are global to the Docker daemon — the container
   would simply fail to create. Let compose derive `portfolio-cloudflared-1` etc.
3. **Publish caddy as `127.0.0.1:8080`, not `8080`.** Phase 0 confirmed the port is free, but there
   is no firewall on this Pi (`ufw` absent) and navidrome is already exposed LAN-wide on
   `0.0.0.0:4533`. Don't add a second one. Nothing needs to reach Caddy except `cloudflared` (over
   the compose network) and your own `curl` during Phase 6.

---

### RESULTS — executed 2026-08-23 (`docker-compose.yml` at the repo root; ~~not committed~~ **committed in Phase 4**, nothing live changed)

Approach **B** implemented as decided. The file is `docker-compose.yml` in the repo root, so it ships
with the checkout and `./Caddyfile` resolves next to it; `.dockerignore` already excludes both.

**New:** `docker-compose.yml`, `.env.example`, `.gitattributes`. **Changed:** `.gitignore` — `!.env.example` had to be
re-asserted at the end of the file. The Env section's existing `!.env.example` is dead: the Vite
section below it carries a bare `.env*`, and gitignore is last-match-wins, so the template was
unstageable until a negation came after it. (Confirmed with `git status`, not with
`git check-ignore -v`, which prints the negation line and still exits 0.)

Five choices differ from the letter of the phase spec above. Each is a fail-loud-instead-of-quiet
trade, not taste:

1. **`environment: - GH_TOKEN=${GH_TOKEN:?…}` rather than `env_file: .env`.** `env_file` hands
   *every* variable in the file to the container, so the portfolio would receive `TUNNEL_TOKEN` and
   `cloudflared` would receive `GH_TOKEN` — neither has any business with the other's secret. And a
   `.env` that lost `GH_TOKEN` would then fail *silently* in the worst way available: the API routes
   503, the client falls through to `static/github-*.json`, and the chart renders fine but frozen.
   Interpolation with `:?` aborts `docker compose up` instead, which on a redeploy leaves the
   previous container serving. Both messages name the file and its mode. Compose still reads `./.env`
   for the interpolation, so the file the phase spec describes is unchanged.
2. **Explicit `image: portfolio-site:latest`.** Compose would otherwise derive `portfolio-portfolio`.
   Phase 5 step 4 rolls back to "the previous image tag", which needs a name that does not depend on
   the directory the checkout happens to live in.
3. **Named `caddy_data` / `caddy_config` volumes.** `caddy:2-alpine` declares `VOLUME /data` and
   `/config`, so volumes exist either way; naming them stops anonymous ones accumulating. Neither
   holds anything to preserve while Cloudflare terminates TLS and there is no ACME state.
4. **`depends_on: [portfolio]` is start-order only — deliberately *not* `condition: service_healthy`.**
   Caddy answers four route groups that never touch the origin (`/tutoring`, `/games/vcKaraoke`,
   `/room/*`, `/_next/*`). Gating its start on the origin's health would take those down too, and
   would replace a localised 502 from Caddy with a dead site and a Cloudflare error page.
5. **A committed `.env.example`.** The real `.env` cannot be committed and holds two secrets, so the
   template is where "what goes in it, and why each value matters" can live in the repo.

`logging` is a YAML anchor (`&logging` / `*logging`) shared by all three services rather than three
copies — verified in the resolved config, not assumed. No `container_name` anywhere (trap 2), and
Caddy is published on `127.0.0.1:8080` only (trap 3).

`.gitattributes` is new and is a **precaution, not a fix** — the four Pi-facing files are LF on disk
today (checked by counting CR bytes; an earlier `grep -c` whose `^M` the shell had already consumed
read as a *count of every line* rather than of CR bytes, which is why an early note here claimed the
opposite). It pins `eol=lf` on `Dockerfile`, `docker-compose.yml`,
`Caddyfile`, `.env.example` and `*.sh` because this clone's `core.autocrlf=true` is a *setting* rather
than a property of the repo: a commit made without it would ship CRLF, and each of these files then
fails opaquely rather than loudly — a trailing `^M` inside `TUNNEL_TOKEN` surfaces as a cloudflared
auth error, and Phase 5's `deploy.sh` would die as `bad interpreter: /bin/bash^M`. Scoped to those
paths on purpose; a blanket `* text=auto` would renormalise every tracked file and bury the next real
diff.

**Verified on the Pi.** The compose file plus the working tree (`git ls-files` + the four untracked
new files, 284 files, 12 MB) were copied to a throwaway `/tmp/portfolio` — named so the derived
project name matches the real `~/apps/portfolio` — built, brought up **without `cloudflared`**, and
removed afterwards.

| Check | Result |
|---|---|
| `docker compose config`, no `.env` | **exit 1**, error names `TUNNEL_TOKEN` and quotes the "set it in ~/apps/portfolio/.env (mode 600)" hint |
| same, `GH_TOKEN=` empty | **exit 1** — empty counts as missing, which is the point of `:?` over `:-` |
| resolved config | project `portfolio`, network `portfolio_default`, volumes `portfolio_caddy_{data,config}`, no `container_name`, log cap on all three, `GH_TOKEN` only on `portfolio` and `TUNNEL_TOKEN` only on `cloudflared` |
| `docker compose build portfolio` | **clean, arm64-native, no qemu** — the first time the `Dockerfile` has actually been built anywhere (Phase 1 verified `ADAPTER=node npm run build` on Windows, not the image) |
| `docker compose up -d portfolio caddy` | containers `portfolio-portfolio-1` / `portfolio-caddy-1` — no name collision with homelab; origin **healthy in 6 s** on the Dockerfile's `HEALTHCHECK` |
| **six `/games/<slug>/` through Caddy** | **6 × 200** — risk #1 closed on the real fronting proxy, with no `@gamedir` rewrite |
| `/games/typetest/` | **308**, i.e. still the real route — the thing that rewrite would have broken |
| `/`, `/about`, `/games`, `/projects-index.json`, `/sitemap.xml`, 3 real project pages | 200 |
| deep vendored asset `/games/paddleBall/_next/static/…/_buildManifest.js` | 200 |
| four external proxies (`/games/spotifyHero`, `/games/vcKaraoke`, `/room/test`, `/tutoring`) | 200 — these were the 502s Phase 2 predicted would flip once an origin existed |
| a real Spotify Hero chunk, scoped vs the bare `/_next/*` catch-all | **200 vs 404** — risk #2's two upstreams confirmed distinct end-to-end |
| vcKaraoke prefix strip (bare, trailing slash, `/room/x`) | 200 / 200 / 200 |
| `/games/spotifyHeroFoo`, `/games/vcKaraokeFoo` | 404 from the origin — matchers still do not over-reach |
| `/api/github-contrib`, `/api/github-recent` with a *dummy* `GH_TOKEN` | **503 both** — the load-bearing status survives the whole chain |
| header rule A on `/` | all six present, each **exactly once** (`uniq -d` empty), `Server` stripped |
| cache rules | `.JPEG` → 7-day/1-year; `/github-contrib.json` → 5-min; `/sitemap.xml` → no rule, origin decides |
| `/sitemap.xml` `<loc>` count, `/` canonical | 43, `https://mario-belmonte.com/` — unchanged by the new host |
| host listener scope | `ss -tlnH` → `127.0.0.1:8080` only; `curl http://192.168.1.72:8080/` **refused** |
| log cap actually applied | `json-file map[max-file:3 max-size:10m]` on both containers |

**Torn down and confirmed clean:** `docker compose down -v`, image removed, `/tmp/portfolio` deleted.
Only `navidrome` and homelab's `cloudflared` are running, the image list is the same three as before,
nothing listens on 8080, root still shows 21 GB free.

**One new trap, found by testing it rather than by reasoning about it — hence the fourth entry in the
decisions at the top of this document:** `git clone` refuses a destination that already contains
anything, **including a single dot-file**. So Phase 4 step 3's "put the token in
`~/apps/portfolio/.env`" must come *after* the clone, or the clone fails with
`destination path already exists and is not an empty directory` (measured). Correct order:

```bash
mkdir -p ~/apps && git clone <repo> ~/apps/portfolio && cd ~/apps/portfolio
cp .env.example .env && chmod 600 .env && nano .env      # fill in both values
docker compose up -d
```

If a `.env` does get written first, `git -C ~/apps/portfolio init && git remote add origin … &&
git fetch && git checkout -f main` reaches the same state — but the clone-first order is one line.

**Not verifiable in this phase:** `cloudflared`. It needs the real token for the *new* tunnel, which
Phase 4 step 3 creates — the container was excluded from the smoke test rather than started with a
dummy token it would only crashloop on. Everything downstream of it is now measured, so Phase 4's
first `docker compose up -d` is exercising exactly one untested service.

---

## Phase 4 — Cloudflare (do the DNS move *before* the cutover) — **PARTLY DONE, results below**

1. ~~**Add the `mario-belmonte.com` zone** to Cloudflare.~~ **ALREADY DONE** — the zone has existed
   for ~3 weeks (Phase 0). ~~Still worth one glance at the record list.~~ **DONE — queried rather than
   eyeballed; results below.** The record set is smaller than this step assumed: there is **no `MX`,
   no apex `SPF` `TXT` and no `_dmarc`** on this zone at all.
2. ~~**Change nameservers at the registrar.**~~ **ALREADY DONE** — moved ~2026-08-01. ~~and live email
   has been running on this DNS since, uneventfully. This is why risk #3 is retired.~~ **The
   nameserver move is confirmed (`dee`/`walt.ns.cloudflare.com`); the email half of that sentence was
   never true** — there are no mail records on this zone to have been running. Risk #3 stays retired,
   for the stronger reason that there is nothing here to break.
3. **Create a NEW tunnel** (Zero Trust → Networks → Tunnels → Create) — **STILL OPEN; needs the
   dashboard.** There is no Cloudflare API token on this machine or on the Pi, so this cannot be
   scripted. **The Pi half of this step is DONE:** `~/apps/portfolio` is cloned at `main`,
   `portfolio-site:latest` is built and cached, and everything except `cloudflared` has been
   re-verified there — only `.env` and `docker compose up -d` remain. It must be a *second, distinct*
   tunnel — **not** the one already serving `music.`, and not its token. See Phase 3 trap 1 for what
   goes wrong otherwise. Then, **clone first and write `.env` second** — `git clone` refuses a
   destination holding even one dot-file (measured; Phase 3 results has the exact command sequence):
   clone the repo to `~/apps/portfolio`, `cp .env.example .env`, `chmod 600 .env`, fill in both
   `GH_TOKEN` and the new `TUNNEL_TOKEN`, then `docker compose up -d`. Confirm all three containers
   are healthy and `curl -sI localhost:8080/` answers **before** step 4 — step 4 is the
   irreversible-ish one. Only `cloudflared` is untested at this point; the other two and the whole
   Caddyfile were measured in Phase 3.
4. Add public hostname `mario-belmonte.com` → `http://caddy:8080` (and `www` if it exists).
   Adding it rewrites the apex DNS record to the tunnel — **this is the cutover.**
5. Cloudflare settings: "Always Use HTTPS" on, Brotli on. **Do not add a cache rule over `/api/*`.**
   That would reintroduce exactly the trap `svelte.config.js` documents about ISR: a status-blind
   edge cache freezing a 503 from a rate limit for the whole TTL. The in-process 30-min memo is
   the cache for those routes now, and it survives (single long-lived process, no cold starts).

~~**Verify `tutoring.mario-belmonte.com` still resolves to its own host and is not routed through
the tunnel**~~ — **DONE, clear:** it is a `CNAME` to `cname.vercel-dns.com`, i.e. Vercel, not the Pi,
so `/tutoring` proxies off-box and there is no loop. It stays clear only as long as step 4 adds public
hostnames for the apex and `www` **and nothing else** — adding `tutoring` to this tunnel is precisely
what would create the loop, because the `Caddyfile` proxies `/tutoring` to that very hostname.

~~**Rollback is one DNS record**: point the apex back at Vercel. Save the current Vercel A/CNAME
values before step 4.~~ **DONE — values recorded below.** Note that the rollback became *meaningfully*
better in this phase for a reason unrelated to DNS: `main` now carries the overhaul, so Vercel serves
the same site. Before that merge, "point the apex back at Vercel" would have rolled back to a
10-commit-older site — a rollback in name only.

### RESULTS — executed 2026-08-23 (steps 1–2 verified, step 3's Pi half done; **the tunnel, step 4 and step 5 are still open — they need the Cloudflare dashboard**)

**What this phase closed, and what it could not.** Phase 4 is half dashboard work and half Pi work, and
only the Pi half can be executed from a shell. There is **no Cloudflare API token** on the Windows box
or on the Pi — checked: no `CF_*`/`CLOUDFLARE_*` in the environment, no local `.env`, no `cloudflared`
CLI on either host, and `~/homelab` holds only a `docker-compose.yml` and `get-docker.sh` (its tunnel
token is inline in that compose file, and is homelab's — the one token that must **not** be reused).
So creating the tunnel, adding the public hostname and flipping the zone settings stay manual.
Everything that could be measured, was.

**The prerequisite is closed — this was the real blocker.** Risk #11 is gone: Phases 1–3's files are
committed (`77840c09`) and `main` is pushed at `e1ceecbd`, 12 commits ahead of where `origin/main` sat.
Gates run before the push, all clean:

| Gate | Result |
|---|---|
| `npm run check` | **210 files, 0 errors, 0 warnings** — run twice, before and after merging `origin/main`'s two `rogueSwipe` sync commits |
| `ADAPTER=node npm run build` | **clean on Windows** (no symlink step, so no `EPERM`); the whitelisted `[404] GET /games/<slug>/` prerender lines appear and are swallowed as designed |
| `npm run verify:seo` | **893 passed, 0 failed** |
| merge `origin/main` → `site-overhaul` | no conflicts; `main` then fast-forwarded, so it carries no merge commit of its own |

`.gitattributes` was verified end-to-end rather than assumed, which is the only way this particular
precaution *can* be checked: `git check-attr` reports `eol=lf` on all four Pi-facing files, the
**staged blobs** hold 0 CR bytes, and after the clone the **files on the Pi** hold 0 CR bytes —
authored on a clone with `core.autocrlf=true`, landing on ext4 as pure LF.

#### Steps 1–2: the zone, measured rather than eyeballed

Queried over DNS (`Resolve-DnsName` against 1.1.1.1), not read off the dashboard:

| Record | Value | Bearing on the cutover |
|---|---|---|
| `NS` | `dee.ns.cloudflare.com`, `walt.ns.cloudflare.com` | step 2 confirmed done |
| `mario-belmonte.com` `A` | **`76.76.21.21`** | Vercel's apex IP, **DNS-only (grey cloud)** — we see the origin IP, not a Cloudflare one. **This is the rollback value.** |
| `www` `CNAME` | `cname.vercel-dns.com` | it **does** exist, so step 4's "and `www` if it exists" is not optional |
| `tutoring` `CNAME` | `cname.vercel-dns.com` | **risk #5 clear** — off-box, no proxy loop |
| `MX` | **none** (SOA only) | — |
| apex `TXT` | **none** | no SPF |
| `_dmarc` | **NXDOMAIN** | — |

**The document was wrong about email, and it is worth saying why that is good news rather than bad.**
Step 2 justified retiring risk #3 with "live email has been running on this DNS since". No mail records
exist on this zone, so nothing has been running. The conclusion survives and gets *stronger* — there is
no mail configuration for the nameserver move to have broken, and none for step 4 to break — but the
stated evidence for it was false, and a later reader would otherwise have carried the belief that a
working mail setup was sitting one bad DNS edit away.

Also worth knowing before step 4: the apex is **grey-cloud today**. Adding the public hostname does not
merely repoint it, it makes it a *proxied* record — Cloudflare begins terminating TLS on this hostname
for the first time. That is intended (the `Caddyfile` deliberately has no ACME and serves plain HTTP),
but it is a larger change than "the A record's value moves".

#### Step 3, Pi half: cloned, built, re-verified

Clone-order trap avoided — `mkdir -p ~/apps && git clone …` with **no `.env` written first**; the clone
landed clean at `main` (`e1ceecbd`). `.env` is still absent, deliberately.

The `${VAR:?}` guards were re-checked on the real path, and both fail exactly as designed:

| Attempt | Result |
|---|---|
| `docker compose config`, no `.env` | **exit 1** — `required variable GH_TOKEN is missing a value: set GH_TOKEN in ~/apps/portfolio/.env (mode 600) — see .env.example` |
| same, `GH_TOKEN=dummy` + `TUNNEL_TOKEN=` empty | **exit 1** on `TUNNEL_TOKEN` — **empty counts as missing**, which is the whole point of `:?` over `:-` |

`docker compose build portfolio` → **clean, arm64-native, `portfolio-site:latest` 386 MB**, left cached
so the first real `up -d` takes seconds rather than minutes. Then `portfolio` + `caddy` were brought up
on `~/apps/portfolio` (cloudflared excluded — no real token yet) with a **dummy** `GH_TOKEN`, and the
whole Phase 6 curl battery re-run. **Origin healthy in 6 s.**

This re-run was not redundant with Phase 3. Phase 3 tested a copy of the *working tree* in
`/tmp/portfolio`; this tested the **real checkout at the real path, built from the pushed `main`** —
including the two `rogueSwipe` sync commits that Phase 3 predates.

| Check | Result |
|---|---|
| **six `/games/<slug>/` through Caddy** | **6 × 200** — risk #1 still closed, now on the merged tree |
| `/games/typetest/` | **308** — still the real route, the thing an `@gamedir` rewrite would have broken |
| `/`, `/about`, `/games`, `/projects-index.json`, `/sitemap.xml`, `/robots.txt` | 200 |
| four external proxies (`/games/spotifyHero`, `/games/vcKaraoke`, `/room/test`, `/tutoring`) | 200 |
| `/games/spotifyHeroFoo`, `/games/vcKaraokeFoo` | **404** — matchers still do not over-reach |
| **risk #2**: a real Spotify Hero chunk, scoped vs bare `/_next/*` | **200 vs 404** — the two upstreams remain provably distinct |
| vcKaraoke prefix strip (bare, trailing slash, `/room/x`) | 200 / 200 / 200 |
| deep vendored asset `/games/paddleBall/_next/static/…/_buildManifest.js` | 200 |
| `/api/github-contrib`, `/api/github-recent`, dummy token | **503 both** — the load-bearing status survives the whole chain |
| six security headers on `/` | all present, **each exactly once** (`uniq -d` empty), `Server` stripped |
| `.JPEG` long-cache rule | `max-age=604800, s-maxage=31536000` — the case-insensitive class fires |
| `/github-contrib.json`, `/github-recent.json` | `max-age=300, s-maxage=1800` — the short rule, and never both |
| `/_app/immutable/entry/start.*.js` | `public,max-age=31536000,immutable` — **adapter-node's own header survives untouched**, which is exactly what `js` being absent from `@longcache` buys |
| `/sitemap.xml` `<loc>` count, `/` canonical | **43**, `https://mario-belmonte.com/` — unchanged by the new host |
| listener scope | `127.0.0.1:8080` only; `curl http://192.168.1.72:8080/` **refused** |
| log cap | `json-file map[max-file:3 max-size:10m]` on both containers |

**Torn down again on purpose.** `docker compose down`, volumes and image kept. Leaving the stack up
would have left containers whose *baked config* holds `GH_TOKEN=dummy-for-verification`, and
`restart: unless-stopped` would faithfully restore that across a reboot — a site whose contribution
chart is silently frozen on the static-JSON fallback, which is the precise failure mode `:?` exists to
prevent. The next `up -d` must be the one that reads a real `.env`. Only `navidrome` and homelab's
`cloudflared` are running, nothing listens on 8080, 21 GB free.

#### What remains, in order

1. **Create the second tunnel** in Zero Trust → Networks → Tunnels. Not homelab's, not its token.
2. On the Pi: `cd ~/apps/portfolio && cp .env.example .env && chmod 600 .env`, fill in `GH_TOKEN` and
   the new `TUNNEL_TOKEN`, then `docker compose up -d`. Confirm **all three** containers are up and
   `portfolio` is `healthy`; `cloudflared` is the one service never yet started, so read its logs.
   With a real token `/api/github-contrib` should now answer **200** rather than the 503 measured
   above — that single status is the check that the token actually works.
3. **Step 4, the cutover:** add public hostname `mario-belmonte.com` → `http://caddy:8080`, and `www`
   (it exists). **Nothing else** — no `tutoring`.
4. **Step 5:** "Always Use HTTPS" on, Brotli on, and **no cache rule over `/api/*`**.

Rollback, if needed: set the apex back to `A 76.76.21.21`, DNS-only. Vercel now serves the same commit,
so this is a real fallback rather than a trip 10 commits into the past.

---

## Phase 5 — Deploy script + timer

> **Prerequisite MET in Phase 4 — `deploy.sh` can track `origin/main` as written.** Phases 1–3's
> changes are committed (`77840c09`) and `main` is pushed at `e1ceecbd`; the Pi's `~/apps/portfolio`
> is already a clone of it. The paragraph below is kept for the reasoning, not as an open item.
>
> ~~Phases 1–3's changes live on branch `site-overhaul` and are not
> committed or pushed. `deploy.sh` below tracks `origin/main`, so **the branch has to reach `main`
> before this phase can deploy anything** — otherwise the Pi checks out a tree with no `Dockerfile`,
> no `docker-compose.yml` and no `Caddyfile`, and `docker compose build` fails. Phase 4 step 3 has
> the same prerequisite, since it clones before it brings the stack up. Either merge to `main`, or change the script's tracking branch
> deliberately and write down that you did.

`~/apps/portfolio/deploy.sh`, `set -euo pipefail`:

1. `git fetch origin main`; exit 0 if `HEAD == origin/main`.
2. `git reset --hard origin/main` — safe because the Pi never edits the tree, and it's what makes
   the CI-committed `static/github-*.json` and `static/games/rogueSwipe` land cleanly.
3. `docker compose build portfolio` → `docker compose up -d portfolio`.
4. Poll the healthcheck; on failure, `docker compose up -d` the previous image tag and exit non-zero.
5. `docker image prune -f`.

Systemd timer every 5 min with `RandomizedDelaySec`, logging to the journal. This picks up both
existing cron workflows' commits automatically — `refresh-github-data.yml` (6-hourly) and
`sync-rogueswipe.yml` (30-min) — with no CI changes at all.

Because the build runs inside Docker, the host needs no Node toolchain.

---

## Phase 6 — Verification

**Before pushing (Windows):** `npm run check`.

**On the Pi, against `127.0.0.1:8080` before the DNS cutover:**

```bash
# security headers present exactly once
curl -sI localhost:8080/ | sort | uniq -d

# ← THE critical one: directory index for all six vendored games
for g in aimTrainer dodgeLoL garticDraw paddleBall rogueSwipe soundVisual-Avora; do
  curl -o /dev/null -sw "$g %{http_code}\n" "localhost:8080/games/$g/"; done   # expect 6× 200

# a deep asset inside a vendored Next build (pick a real chunk from the dir)
curl -o /dev/null -sw "%{http_code}\n" localhost:8080/games/paddleBall/_next/static/...

# the four external proxies, incl. the ordering-sensitive spotifyHero chunk
for u in /games/spotifyHero /games/vcKaraoke /room/test /tutoring; do
  curl -o /dev/null -sw "$u %{http_code}\n" "localhost:8080$u"; done

# the load-bearing 503: with GH_TOKEN present → 200; with it removed → 503, not 200
curl -o /dev/null -sw "%{http_code}\n" localhost:8080/api/github-contrib

# case-insensitive cache rule. NB there is no .PNG anywhere under static/ — the uppercase files
# are four .JPG and one .JPEG in static/about/ (Phase 2 results). Any of them exercises the rule:
curl -sI "localhost:8080/about/IMG_8025.JPEG" | grep -i cache-control

# canonicals unchanged
curl -s localhost:8080/sitemap.xml | grep -c '<loc>'
curl -s localhost:8080/ | grep -o 'rel="canonical" href="[^"]*"'
```

**The three assertion suites (~1000 checks):**

- `npm run verify:seo` — reads `.svelte-kit/output/prerendered/`. `ADAPTER=node npm run build`
  produces that directory too, so this now runs cleanly **on the Pi** and sidesteps the Windows
  `EPERM` symlink failure entirely.
- `VERIFY_URL=http://localhost:8080 node scripts/verify-ui.mjs` (82 checks) and
  `verify-chart.mjs` (34 checks) — need the `verify-chart.mjs` OUT-path fix from 1c, plus
  `npm i --no-save playwright && npx playwright install chromium`. If arm64 chromium won't
  install, run these two from Windows against the live tunnel URL after cutover instead.

**After cutover:** `curl -sI https://mario-belmonte.com` from Windows; walk every Play button on
`/games`; confirm the contribution heatmap renders with real data; check `og:url`/canonical are
unchanged (no re-indexing needed — the domain doesn't move).

---

## Risks, in rough order of how quietly they fail

Numbering is stable — Phase 0's notes cross-reference #3 and #5, so retired risks keep their slot.

1. ~~**`/games/<slug>/` directory index** — silently 404s every Play button.~~ **CLOSED in Phase 3:**
   all six answer 200 *through Caddy*, and `/games/typetest/` still 308s — the exact pair the
   rejected `@gamedir` rewrite would have broken. adapter-node's static handler covers it, so the
   Caddyfile must stay without that rewrite. Re-run the six-game loop after the cutover as a smoke
   test, not as an open question.
2. **`/_next/*` rule order** — the scoped spotifyHero block must stay above the root catch-all, or
   Spotify Hero is a white screen with no console error. In Caddy this is just written order.
   **Measured in Phase 3:** a real chunk is 200 via the scoped rule and 404 via the bare path, so the
   two upstreams are confirmed to be different apps end-to-end. Currently defensive rather than
   load-bearing (Spotify Hero sets Next's `basePath`), and that is exactly why it must not be
   "tidied away" — the next proxied Next app without a `basePath` needs it.
3. ~~**Missing MX/TXT records** when the nameservers move~~ — **RETIRED, but not for the reason
   originally given.** The move already happened (~2026-08-01). The claim that "email has been fine
   since" was never checkable, because **this zone has no `MX`, no apex SPF `TXT` and no `_dmarc` at
   all** (measured in Phase 4). Retired on the stronger ground that there is no mail configuration
   here for either the nameserver move or the cutover to break — not on the ground that a working one
   survived. Phase 0, corrected in Phase 4.
4. ~~**2TB drive formatted exFAT/NTFS** — `npm ci` fails.~~ **RETIRED as a blocker.** It *is* NTFS,
   but `npm ci` runs inside Docker on the ext4 root and never touches that drive. The app path moved
   to `~/apps/portfolio` instead. Phase 0.
5. ~~**`tutoring.` pointed at the tunnel** — infinite proxy loop.~~ **CONFIRMED CLEAR in Phase 4:**
   `tutoring.mario-belmonte.com` is a `CNAME` to `cname.vercel-dns.com`, so `/tutoring` proxies
   off-box. **It stays clear only by omission** — the `Caddyfile` proxies `/tutoring` to that exact
   hostname, so adding `tutoring` as a public hostname on this tunnel, at any point in the future,
   creates the loop. Not a closed risk so much as a permanent constraint on the tunnel's ingress list.
6. **`ORIGIN` unset** on adapter-node behind a proxy — subtly wrong request URLs. Set in the
   `Dockerfile`; override it if the image is ever run under a different public hostname.
7. **A Cloudflare cache rule over `/api/*`** — freezes a 503; the exact trap ISR was rejected for.
8. **Single point of failure.** No CDN origin redundancy any more: a power cut, a failed SD card, or
   a botched deploy takes the site down. Cloudflare caching softens the first two; the Vercel
   fallback is one DNS record away. Consider a UPS and an uptime check.
9. **A second connector on homelab's tunnel token** — a fraction of `music.` requests fail at random,
   and nothing points back at this project. Phase 3 trap 1.
10. ~~**`container_name` collision with homelab** — the container just fails to create.~~ **CLOSED:**
    `docker-compose.yml` sets no `container_name`; compose derived `portfolio-caddy-1` /
    `portfolio-portfolio-1` alongside the running `cloudflared` and `navidrome` with no conflict.
    Phase 3 results.
11. ~~**`deploy.sh` tracking `origin/main` while Phases 1–3 sit on `site-overhaul`** — the Pi would
    build a tree with no `Dockerfile` and no `docker-compose.yml`.~~ **CLOSED in Phase 4:** committed
    as `77840c09`, `main` fast-forwarded and pushed at `e1ceecbd`, and `~/apps/portfolio` on the Pi is
    a clone of it with all four Pi-facing files present. `deploy.sh` can track `origin/main` as
    drafted. A side effect worth knowing: Vercel now serves the same commit, which is what turns
    "point the apex back at Vercel" from a rollback in name only into a real fallback (risk #8).
12. ~~**A `.env` written before the clone** — `git clone` refuses a non-empty destination, dot-files
    included, and the error names the directory rather than the cause.~~ **AVOIDED in Phase 4:** the
    clone ran into an empty `~/apps/portfolio` and `.env` is still absent, to be written next. Phase 3
    results has the sequence; it stays here because a re-clone or a rebuild-from-scratch hits it again.
13. **A stack left running on a placeholder `GH_TOKEN`.** Phase 4 brought `portfolio`+`caddy` up with
    a dummy token to run the Phase 6 battery, and took them down afterwards *specifically* so nothing
    survived with that value baked into the container config — `restart: unless-stopped` would have
    restored it across a reboot, and the symptom is a site that looks completely fine with a
    contribution chart frozen on the static-JSON fallback. If `/api/github-contrib` answers **503**
    after the real `.env` is in place, the token is wrong or the container was not recreated.

## Out of scope (flagged, not done)

`README.md` still describes `adapter-static` and a `build/` directory. `build/` is real now
(adapter-node emits there), but `adapter-static` is still wrong, so that section still wants a pass.
The dead `adapter-auto` and `adapter-static` devDependencies could go.

**Done in Phase 1, contrary to the line above:** `CLAUDE.md`, `AGENTS.md` and
`.bob/rules-ask/AGENTS.md` now describe the dual adapter and the Pi hosting model — CLAUDE.md's own
rule ("if you change a convention, update them too") made that mandatory rather than optional.
`.bob/rules-agent/AGENTS.md` and `.bob/rules-plan/AGENTS.md` mention no adapter at all and needed no
change.

Also surfaced by Phase 0 and still untouched, none of it blocking: no firewall on the Pi (`ufw`
absent), `rpcbind` on `0.0.0.0:111`, navidrome published LAN-wide on `0.0.0.0:4533`, homelab's
plaintext `TUNNEL_TOKEN` (rotate it), and neither homelab service having a `logging` cap.
