# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

| Task | Command |
|------|---------|
| Dev server (localhost:5173) | `npm run dev` |
| **Validation gate** — type check | `npm run check` |
| Type check in watch mode | `npm run check:watch` |
| Production build (Vercel — the default) | `npm run build` |
| Production build (Pi / Docker) | `ADAPTER=node npm run build` |
| Serve build output | `npm run preview` |

There is **no ESLint and no unit-test runner**. `npm run check` (`svelte-kit sync` + `svelte-check` against a `strict` + `checkJs` tsconfig) is the primary gate — run it before considering any change done. Node.js ≥ 20 is required (`.npmrc` sets `engine-strict=true`).

### Verification scripts

Three assertion suites, ~1000 checks total. They are the closest thing this repo has to tests.

```bash
npm run verify:seo                # 893 checks over the prerendered build output; needs `npm run build` first

npm i --no-save playwright && npx playwright install chromium   # not a devDependency, see below
npm run dev                       # the two browser suites need a live server
node scripts/verify-ui.mjs        # 82 checks: nav, modals, routing, toast, games links, assets
node scripts/verify-chart.mjs     # 34 checks: the contribution heatmap specifically
```

`playwright` is deliberately **not** a devDependency: its postinstall downloads browsers, which Vercel would pay for on every build to run a script it never executes. Install it with `--no-save` when you need it.

`verify:seo` reads `.svelte-kit/output/prerendered/` rather than driving a browser, because the invariants are per-route and there are 43 routes — and because the bug it exists to prevent (duplicate `<meta name="description">`) was only visible in the served bytes, not the hydrated DOM.

**`npm run build` cannot complete on Windows without Developer Mode.** `adapter-vercel` dedupes identical function bundles with a symlink, which needs the privilege; it fails with `EPERM` *after* prerendering finishes, so `verify:seo` still works and prerender errors are still caught. Enable Settings → System → For developers → Developer Mode to get a clean build. `ADAPTER=node npm run build` has no symlink step and completes cleanly on Windows either way. The `[404] GET /games/<slug>/` lines during prerender are expected — see `svelte.config.js`.

### Generator scripts (not part of `npm run build`)

```bash
npm run update:project-language-bytes   # → src/lib/data/projectLanguageBytes.ts   (needs GH_TOKEN)
npm run generate:sounds                 # → static/sounds/*.mp3
npm run generate:demo-card
node scripts/update-github-recent.mjs    # → static/github-recent.json  (needs GH_TOKEN)
node scripts/update-github-contrib.mjs   # → static/github-contrib.json (needs GH_TOKEN)
npm run build:gartic-draw | build:dodge-lol | build:rogue-swipe |
       build:soundvisual-avora | build:paddle-ball   # rebuild a static game sub-app
node scripts/build-aim-trainer.mjs
```

Game build scripts download the upstream source, patch the `base` path, build, and copy output into `static/games/<slug>/`. Run them individually and commit the resulting static files.

Server code reads the token as `env.GH_TOKEN || env.GITHUB_TOKEN` — either name works. Without a token, GitHub data falls back to the committed static JSON.

## Architecture

SvelteKit 2 + **Svelte 5 runes** + TypeScript. Global CSS variables only — no CSS framework, no component library. **There are no production dependencies at all** — `package.json` has no `dependencies` key. Keep it that way unless there's a reason a hand-written module can't cover: the previous entry was `zod`, whose schemas were imported by nothing and whose contribution-response schema was wrong (it expected `data.user`; both callers query `viewer`).

### Two hosts, two adapters

`svelte.config.js` selects the adapter from `process.env.ADAPTER`:

| | Adapter | Output | Used by |
|---|---|---|---|
| `ADAPTER=node` | `@sveltejs/adapter-node` | `build/` (run `node build`) | Self-hosting on a Raspberry Pi 5 — Cloudflare Tunnel → Caddy → this process. See `PI-HOSTING-PLAN.md`, and the repo `Dockerfile` / `docker-compose.yml` / `Caddyfile`. |
| *unset* (default) | `@sveltejs/adapter-vercel` | `.vercel/output/` | The Vercel project, kept deployed on its `*.vercel.app` URL as a fallback that is one DNS record away. |

**Keep both adapters and keep `vercel.json` — the fallback depends on all three.** Vercel stays the default so nothing about that deployment needs to know the variable exists.

Only the two `/api/github-*` routes need a running process; everything else prerenders. Total runtime env surface is one `GH_TOKEN`, read via `$env/dynamic/private` — so rotating it is a container restart, not a rebuild. On adapter-node the module-level 30-minute memo in those routes genuinely persists, which is better than Vercel's per-invocation lambdas.

The Pi runs `docker-compose.yml` (three services: the app, `caddy`, its own `cloudflared`) from the checkout at `~/apps/portfolio`, with secrets in a `.env` that exists only there. Two things about that file are deliberate and worth not "simplifying": secrets are passed per-service as `${VAR:?message}` rather than with `env_file:`, so neither container sees the other's secret and a missing value fails `up` loudly instead of degrading to the static-JSON fallback; and no service sets `container_name`, because those are global to the Docker daemon and another compose project on that host already claims `cloudflared`. `.env.example` is the committed template.

`vercel.json` is Vercel-only. On the Pi its work is the root `Caddyfile`'s job instead — **the two are a pair, and anything added to one must be added to the other or the two hosts diverge silently.** Not everything transfers literally: Caddy's `path` matcher is a literal prefix (so each proxied route is an explicit bare-path/subtree pair of patterns, never a bare `*` suffix), Go's RE2 has `(?i)` where JS regex needs per-character case classes, and `handle` blocks are sorted by path-matcher specificity rather than by written order. Directory-index resolution for `static/games/<slug>/` does *not* transfer at all: adapter-node's static handler already does it, and a Caddy rewrite for it would break `/games/typetest/` — a real route. Phase 2 of `PI-HOSTING-PLAN.md` records what was measured.

### Rendering model (the most important thing to get right)

- `src/routes/+layout.ts` sets `export const prerender = true` **globally** — every route is prerendered by default.
- Any new `+page.ts` or `+server.ts` that fetches at request time **must** set `export const prerender = false`. Both `/api/*` endpoints do.
- **The home page has no `+page.ts` and prerenders to a static file.** It used to fetch GitHub data in `load` with `prerender = false`, blocking every visitor's first byte on two API calls (one of them a five-round-trip GraphQL fan-out) for data that never reached the HTML — both consumers sit behind a `requestIdleCallback` gate. Don't reintroduce a `load` for client-only data; call `loadContrib`/`loadRecent` from `src/lib/utils/githubData.ts` after mount instead.
- `svelte.config.js` sets `paths.relative = false` and whitelists prerender HTTP errors for the vendored game directories under `static/games/`, **derived from the filesystem** rather than hardcoded. The prerenderer resolves static assets by exact path and has no notion of a directory index, so `/games/<slug>/` always looks like a 404 to it even though Vercel serves it fine. The list used to be four literal slugs and the build broke the moment a fifth game was added — don't turn it back into a literal list. In `npm run dev` the same gap is fixed properly by the `serveVendoredGameIndexes` plugin in `vite.config.ts`, which must stay `enforce: 'pre'` **and** first in the `plugins` array to run before SvelteKit's own `static/` middleware.
- API routes hold module-level in-memory caches (`let cachedPayload`) that reset on cold starts — never rely on their persistence.

### GitHub data: three-tier fallback

`loadContrib` / `loadRecent` in `src/lib/utils/githubData.ts` (called from the client after mount) try the live API route (`/api/github-contrib`, `/api/github-recent`) → fall back to the static JSON in `static/` → fall back to a synthetic empty payload, surfacing `contribError` / `recentReposError` to the UI instead of throwing.

Two things make that fallback actually reachable, and both are load-bearing:

- The API routes return a real **`503`** on error, not `200` with an `error` field. With `200`, the `!res.ok` guard never fired and the whole static-fallback tier was dead code — a tokenless deploy rendered an empty chart while a valid committed dataset sat unused.
- When the static tier succeeds, only *its* `error` is surfaced — not the live-fetch failure. The static file is a complete dataset, just possibly stale; reporting the API error on top of it would paint an error box over good data.

Payload validation lives in **`src/lib/utils/contribShape.ts`** — one module, imported by both the API route and the client loader. Don't hand-write another day/week sanitiser (there were three). It has no `$app`/`$env` imports specifically so a `+server.ts` and a browser module can share it.

### Externally proxied routes

`vercel.json` rewrites `/games/vcKaraoke`, `/games/spotifyHero`, `/room/*`, `/_next/*`, and `/tutoring` to separate deployed apps. **Do not add SvelteKit routes for these slugs** — a game proxied this way needs only a `vercel.json` rewrite plus an entry in `src/lib/data/games.ts`.

**`vercel.json` is strict JSON and cannot carry comments, so the two non-obvious things about it are documented here:**

1. **`rewrites` are first-match-wins, and rule order is a correctness constraint.** `/_next/:path*` is a root-level catch-all pointing at the karaoke app, but `/games/spotifyHero` proxies a *different* Next.js app — and Next emits root-absolute `/_next/*` asset URLs. So `/games/spotifyHero/_next/:path*` must stay **above** the bare `/_next/:path*`, or every Spotify Hero chunk is fetched from the wrong origin: a white screen, no console error, and nothing pointing back at this file. (It also bills the karaoke app's asset bandwidth to this project.) Any future proxied Next app needs its own scoped rule added above the catch-all.
2. **`headers` rules all merge** (later rules override same-named keys) — unlike `rewrites`. The long-lived asset cache rule matches extensions with **per-character case classes** (`[pP][nN][gG]`, not `png`) because JS regex has no inline `(?i)` flag and `static/about/` holds four `.JPG` and one `.JPEG`; a lowercase-only alternation silently dropped 894 KB of images out of the cache rule. (There is no `.PNG` under `static/` — an earlier revision of this line said there was.)
3. `Permissions-Policy` deliberately allows `microphone=(self)` — the proxied vcKaraoke app needs it. Everything else in that list is denied.

### Content lives in data files

All site content is in `src/lib/data/` — `profile.ts`, `projects.ts`, `games.ts`, `about-photos.ts`, `spotify-favorites.ts`, `typetest-snippets.ts`. Editing these drives the UI; components rarely need touching for content changes.

- `profile.github` must stay a full URL (`https://github.com/<user>`) — scripts and server endpoints regex-parse the username out of it.
- `projectLanguageBytes.ts`, `static/github-contrib.json`, `static/github-recent.json` are **auto-generated**. Never hand-edit.
- New project: add to the `projects` array in `projects.ts` (routing follows automatically via `entries: EntryGenerator` in `projects/[slug]/+page.ts`), then update the `topProjectSlugs` allowlist in `src/routes/+page.svelte` if it should appear on the landing page.

### Page metadata is centralised — do not add `<svelte:head>` to a route

Every route's title, description, canonical, `og:*`, `twitter:*` and JSON-LD come from **`src/lib/data/seo.ts`**, resolved once in `+layout.svelte` via `resolveSeo(page.url.pathname, page.data.project)`. To change a route's metadata, edit the `ROUTES` map there — not the route file.

This is enforced by convention rather than by the compiler, and the reason matters: **`<svelte:head>` dedupes `<title>` but not arbitrary meta tags.** When routes carried their own head blocks, the prerendered `/games` HTML shipped *two* `<meta name="description">` tags with the generic one first, so crawlers reading the first tag got the homepage blurb on every route. Separately, `og:url` was hardcoded to the homepage, so all 36 project pages claimed to *be* the homepage.

A `<svelte:head>` in a route is only correct for genuinely page-specific, non-metadata tags — `src/routes/+page.svelte` keeps one solely for its LCP image preload.

- `SITE_URL` is hardcoded, not derived from the request: Vercel also serves `*.vercel.app` preview domains, and a canonical pointing at a preview deployment teaches crawlers the wrong home for the content.
- Project OG images skip `.svg` on purpose (Facebook, LinkedIn, Slack and X all refuse to render one) and skip `.mp4` (`project.image` is frequently the demo video). 8 of 36 projects therefore fall back to `/og.jpg`, which is correct — a generic preview beats none.
- `og:image:width`/`height` are declared **only** for the default image, whose dimensions are known. The previous code declared `1200x630` for a 2880×1800 file.
- `/sitemap.xml` is a prerendered `+server.ts` generated from `projects.ts` + a static route list; `static/robots.txt` points at it. `npm run verify:seo` asserts the sitemap and the prerendered pages are the same set, in both directions.

## Conventions

- **Svelte 5 runes only** — `$props()`, `$state()`, `$derived()`, `$effect()`. No `export let`, no `$:`.
- **Never `window.location.href =`** for internal links — use `navigateInternal` / `assignAppLocation` from `src/lib/utils/internalNav.ts` so `base` is respected.
- **Never touch `localStorage` / `sessionStorage` directly** — use `getLocalItem` / `setLocalItem` / `getSessionItem` / `setSessionItem` from `src/lib/utils/safeStorage.ts` (SSR- and private-browsing-safe).
- **Scroll lock**: `lockScroll` / `unlockScroll` from `src/lib/utils/scrollLock.ts`; `resetScrollLock()` is already wired into layout navigation hooks.
- **Overlays** that must escape a stacking context: the `portal` action in `src/lib/utils/portal.ts`.
- **GitHub fetches**: the API routes deliberately **fail fast** — one attempt with `AbortSignal.timeout(8000)`, no retry — then return a real `503` so `githubData.ts` falls through to the committed static JSON. Retrying in-request would only delay that fallback, and GitHub's primary rate limit (a `403`, not a `429`) can take up to an hour to reset, so sleeping is never the right move inside a serverless function. Errors are negatively cached for 60 s.
- **GitHub username**: `getGithubUser()` from `src/lib/utils/githubUser.ts` — derived from `profile.github`, never re-parsed inline.
- **URL parsing in markup**: `new URL()` throws on malformed input and takes the route to an error boundary during render. Use the guarded helpers in `src/lib/utils/urls.ts` (e.g. `isGitHubRepo`).
- **Sounds**: `playSound(id)` from `src/lib/utils/sound.ts`. New sounds require both a `SoundId` union member and a matching `.mp3` in `static/sounds/`. Only ever trigger these from a genuine user interaction — never from scroll or an `IntersectionObserver`; there is no mute UI.
- **Tags**: `getTagKind(tag)` from `src/lib/utils/tags.ts` — do not re-declare tag Sets in components.
- Components are imported by direct path. There is no barrel; the old `src/lib/components/index.ts` was imported by nothing and has been removed.

## Styling

- Tokens are CSS custom properties in `src/app.css`: `--bg`, `--panel`, `--panel-2`, `--border`, `--border-2`, `--text`, `--muted`, `--muter`, `--accent`, `--accent-2`, `--font-mono`. Changing `--accent` rethemes the whole site.
- Monospace-only UI (`--font-mono` is the sole font family) — dark terminal aesthetic.
- Dark is default; light mode is `data-theme="light"` on `<html>`. Component overrides use `:global([data-theme='light']) .local-class { }`.
- Use `color-mix(in srgb, var(--token) N%, transparent)` for alpha variants — **never raw `rgba(...)` literals in `<style>` blocks**. Raw values in JS canvas `fillStyle` are fine.

## Known inconsistencies

- `README.md` describes `@sveltejs/adapter-static` and a `build/` directory. `adapter-static` is still wrong — but `build/` is now real, since that is where adapter-node emits. Trust `svelte.config.js`.
- `@sveltejs/adapter-auto` and `@sveltejs/adapter-static` are devDependencies that nothing imports. Only `adapter-node` and `adapter-vercel` are wired up.
- `scripts/build-{gartic-draw,aim-trainer,dodge-lol,soundvisual-avora}.mjs` are run by **no** CI. The workflow that referenced them (`deploy.yml`) discarded its output at a failing publish step and has been deleted. The built games are committed under `static/games/`; re-run these by hand when a sub-app needs updating.
- Data-refresh CI is `.github/workflows/refresh-github-data.yml` (cron + `workflow_dispatch`). Each generator runs with `continue-on-error` behind a `git checkout --` revert guard, because both GitHub generators write an *empty* `{ error, ... }` payload before exiting non-zero — committing that unconditionally would replace good-but-stale data with a blank chart.
- `AGENTS.md` and `.bob/rules-*/AGENTS.md` cover the same ground as this file. If you change a convention, update them too.
