# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Stack
SvelteKit 2 + Svelte 5 (runes: `$props`, `$state`, `$derived`, `$effect`). Node.js v20+ required (`.npmrc` has `engine-strict=true`).

**Two adapters, selected by env** in `svelte.config.js`: `ADAPTER=node` → `@sveltejs/adapter-node` (output `build/`, a long-lived Node process — self-hosting on a Raspberry Pi behind Caddy + a Cloudflare Tunnel, see `PI-HOSTING-PLAN.md`); anything else → `@sveltejs/adapter-vercel`, which stays the default so the Vercel deployment remains a working fallback. **Keep both, and keep `vercel.json` — the fallback depends on all three.**

## Key Commands

| Task | Command |
|------|---------|
| Type check (primary quality gate) | `npm run check` |
| Dev server | `npm run dev` |
| Production build (Vercel) | `npm run build` |
| Production build (Pi / Docker) | `ADAPTER=node npm run build` |

No ESLint, no unit-test framework. `npm run check` (svelte-check + tsc strict mode) is the primary gate.

Three assertion suites cover the rest (~1000 checks): `npm run verify:seo` reads the prerendered build output; `node scripts/verify-ui.mjs` and `node scripts/verify-chart.mjs` drive a browser against `npm run dev` and need `npm i --no-save playwright && npx playwright install chromium` first (playwright is intentionally not a devDependency — Vercel would download browsers on every build).

**`npm run build` fails with `EPERM` on Windows without Developer Mode** — `adapter-vercel` needs symlink privilege. It fails *after* prerendering, so prerender errors are still caught and `verify:seo` still works. `ADAPTER=node npm run build` has no symlink step and completes cleanly on Windows.

## Critical Architecture Facts

- **`prerender = true` is set at layout level** (`src/routes/+layout.ts`) — this makes all routes pre-rendered by default. To opt a route out, explicitly set `export const prerender = false;` in its `+page.ts` or `+server.ts`.
- **The home page has no `+page.ts` and is prerendered to a static file.** It used to override to `prerender = false` so `load` could fetch GitHub data — blocking first byte on a five-round-trip GraphQL fan-out for data that never reached the HTML, since both consumers render after mount. Don't reintroduce a `load` for client-only data; call `loadContrib`/`loadRecent` from `src/lib/utils/githubData.ts` after mount. The `/api/*` routes do set `prerender = false`, as must any new request-time route.
- **`paths.relative = false`** is set in `svelte.config.js` — always use `base` from `$app/paths` when constructing internal URLs (see `src/lib/utils/internalNav.ts`).
- **Prerender build intentionally ignores HTTP errors** for the game sub-paths (`/games/garticDraw/`, `/games/aimTrainer/`, …) — those are static sub-apps copied into `static/games/`, and the prerenderer has no notion of a directory index so they always look like 404s. `svelte.config.js` derives the list from the filesystem; do not turn it back into literal slugs (the build broke when a fifth game was added). In dev, the `serveVendoredGameIndexes` plugin in `vite.config.ts` handles the same gap and must stay `enforce: 'pre'` and first in `plugins`.
- **Several games are proxied externally** via `vercel.json` rewrites (`/games/vcKaraoke` → separate Vercel app, `/games/spotifyHero` → another app, `/tutoring` → external domain). Do not add SvelteKit routes for these slugs. The root **`Caddyfile`** is the same set of rewrites and header rules for the Pi host (served by the root `docker-compose.yml`) — **edit both or the two hosts diverge silently.**
- **In-memory caches** live in the API server files (module-level `let cachedPayload`). These are ephemeral and reset on cold starts — do not rely on persistence.

## Data Layer

- All site content lives in `src/lib/data/` — edit these files to change portfolio content.
- `src/lib/data/profile.ts` — GitHub username is parsed **from the URL** at `profile.github` by scripts and server endpoints. Do not change its format.
- `src/lib/data/projectLanguageBytes.ts` is **auto-generated** by `npm run update:project-language-bytes` (requires `GH_TOKEN`/`GITHUB_TOKEN`). Do not hand-edit it.
- `static/github-contrib.json` and `static/github-recent.json` are **static fallbacks** populated by `scripts/update-github-contrib.mjs` and `scripts/update-github-recent.mjs`. The live API endpoints take precedence at runtime; the static files are the CDN/build fallback.
- The homepage `topProjectSlugs` allowlist in `src/routes/+page.svelte` controls which projects appear on the landing page — it is separate from the full projects list.

## Utility Conventions

- **Storage**: Use `getLocalItem`/`setLocalItem`/`getSessionItem`/`setSessionItem` from `src/lib/utils/safeStorage.ts` instead of `localStorage`/`sessionStorage` directly — they handle SSR and private-browsing gracefully.
- **Scroll lock**: Use `lockScroll`/`unlockScroll` from `src/lib/utils/scrollLock.ts`. Call `resetScrollLock()` in `beforeNavigate`/`afterNavigate` to prevent stuck locks after route transitions (already wired in layout).
- **DOM portals**: Use the `portal` action from `src/lib/utils/portal.ts` for overlays that must escape parent stacking contexts.
- **Internal navigation**: Use `navigateInternal` / `assignAppLocation` from `src/lib/utils/internalNav.ts` — never `window.location.href =` directly, as it ignores `base`.
- **GitHub API calls**: No retry helper. The `/api/github-*` routes make one attempt with `AbortSignal.timeout(8000)` and, on failure, return `503` with a generic message so `loadContrib`/`loadRecent` in `src/lib/utils/githubData.ts` can fall through to the committed static JSON. Errors are negatively cached for 60 s. Derive the username with `getGithubUser()` from `src/lib/utils/githubUser.ts` (server/`$lib`) or `readGithubUser()` from `scripts/lib/profile-github.mjs` (Node scripts).
- **Contribution payload shape**: Validate with `src/lib/utils/contribShape.ts` — do not hand-write another day/week sanitiser. `scripts/update-github-contrib.mjs` carries a documented twin because plain Node cannot import the TS module.
- **Sounds**: Play via `playSound(id: SoundId)` from `src/lib/utils/sound.ts`. Valid IDs: `timeline-tick`, `confetti-pop`, `typing-key`, `typing-complete`, `game-start`, `game-over`, `ui-click`. Sound files live in `static/sounds/`. Regenerate with `npm run generate:sounds`.
- **Tag classification**: Use `getTagKind(tag)` from `src/lib/utils/tags.ts` — do not duplicate the Sets locally in components.

## GitHub Token

The env var is checked as `env.GH_TOKEN || env.GITHUB_TOKEN` in server code. Either name works. Without it, contribution data falls back to the static JSON files.

## Styling

- Design uses CSS custom properties defined in `src/app.css`. Key tokens: `--bg`, `--panel`, `--panel-2`, `--border`, `--border-2`, `--text`, `--muted`, `--muter`, `--accent`, `--accent-2`, `--font-mono`.
- Dark mode is default. Light mode is toggled via `data-theme="light"` on `<html>` — component styles that differ must use `:global([data-theme='light']) .selector { }`.
- `--font-mono` is the only font family defined — the entire UI uses monospace (thavlik.dev-inspired design).
- Use `color-mix(in srgb, var(--token) N%, transparent)` for alpha variants of tokens — **never raw `rgba(54, 242, 194, ...)` or `rgba(243, 246, 255, ...)` in CSS `<style>` blocks**. Raw values in JS canvas `fillStyle` are acceptable.

## Page Metadata

**Do not add `<svelte:head>` to a route.** Titles, descriptions, canonicals, `og:*`, `twitter:*` and JSON-LD all live in `src/lib/data/seo.ts` and are resolved once in `+layout.svelte`. Edit the `ROUTES` map there.

`<svelte:head>` dedupes `<title>` but **not** arbitrary meta tags, so a per-route head block shipped a second `<meta name="description">` — generic one first — on every page that had one. `og:url` was separately hardcoded to the homepage on all 36 project pages. `npm run verify:seo` asserts one description tag per route and `og:url === canonical`.

The one legitimate exception is a genuinely page-specific non-metadata tag: `src/routes/+page.svelte` keeps a head block solely for its LCP image preload.

## Component Exports

Import components by direct path. There is no barrel: `src/lib/components/index.ts` (and `src/lib/index.ts`) were imported by nothing while keeping unused components in the module graph, and have been removed.

## Game Sub-Apps

External games (garticDraw, aimTrainer, dodgeLoL, etc.) are standalone static builds copied into `static/games/<slug>/`. Build scripts in `scripts/build-*.mjs` download source, patch the `base` path, build, and copy the output. Run them individually; they are not part of the main `npm run build`.
