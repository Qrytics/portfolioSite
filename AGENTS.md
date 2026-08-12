# AGENTS.md

This file provides guidance to agents when working with code in this repository.

## Stack
SvelteKit 2 + Svelte 5 (runes: `$props`, `$state`, `$derived`, `$effect`) deployed to **Vercel** via `@sveltejs/adapter-vercel`. Node.js v20+ required (`.npmrc` has `engine-strict=true`).

## Key Commands

| Task | Command |
|------|---------|
| Type check (primary quality gate) | `npm run check` |
| Dev server | `npm run dev` |
| Production build | `npm run build` |

No ESLint, no test framework. `npm run check` (svelte-check + tsc strict mode) is the only automated gate.

## Critical Architecture Facts

- **`prerender = true` is set at layout level** (`src/routes/+layout.ts`) — this makes all routes pre-rendered by default. To opt a route out, explicitly set `export const prerender = false;` in its `+page.ts` or `+server.ts`.
- **The home page (`+page.ts`) overrides to `prerender = false`** because it fetches live GitHub data at request time. The API routes (`/api/github-contrib`, `/api/github-recent`) also do this.
- **`paths.relative = false`** is set in `svelte.config.js` — always use `base` from `$app/paths` when constructing internal URLs (see `src/lib/utils/internalNav.ts`).
- **Prerender build intentionally ignores HTTP errors** for game sub-paths (`/games/garticDraw`, `/games/aimTrainer`, etc.) — those are static sub-apps copied into `static/games/`.
- **Several games are proxied externally** via `vercel.json` rewrites (`/games/vcKaraoke` → separate Vercel app, `/games/spotifyHero` → another app, `/tutoring` → external domain). Do not add SvelteKit routes for these slugs.
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
- **GitHub API calls**: Use `fetchWithRetry` from `src/lib/utils/fetchWithRetry.ts` for resilience against rate limiting (handles 429 with `X-RateLimit-Reset` header).
- **Sounds**: Play via `playSound(id: SoundId)` from `src/lib/utils/sound.ts`. Valid IDs: `timeline-tick`, `confetti-pop`, `typing-key`, `typing-complete`, `game-start`, `game-over`, `ui-click`. Sound files live in `static/sounds/`. Regenerate with `npm run generate:sounds`.
- **Tag classification**: Use `getTagKind(tag)` from `src/lib/utils/tags.ts` — do not duplicate the Sets locally in components.

## GitHub Token

The env var is checked as `env.GH_TOKEN || env.GITHUB_TOKEN` in server code. Either name works. Without it, contribution data falls back to the static JSON files.

## Styling

- Design uses CSS custom properties defined in `src/app.css`. Key tokens: `--bg`, `--panel`, `--panel-2`, `--border`, `--border-2`, `--text`, `--muted`, `--muter`, `--accent`, `--accent-2`, `--font-mono`.
- Dark mode is default. Light mode is toggled via `data-theme="light"` on `<html>` — component styles that differ must use `:global([data-theme='light']) .selector { }`.
- `--font-mono` is the only font family defined — the entire UI uses monospace (thavlik.dev-inspired design).
- Use `color-mix(in srgb, var(--token) N%, transparent)` for alpha variants of tokens — **never raw `rgba(54, 242, 194, ...)` or `rgba(243, 246, 255, ...)` in CSS `<style>` blocks**. Raw values in JS canvas `fillStyle` are acceptable.

## Component Exports

Components are barrel-exported from `src/lib/components/index.ts`. Not all components are in the barrel (e.g. `MediaSection`, `MatrixOverlay`, `WaveCheckeredBackground`, `EegBackground`); import those directly.

## Game Sub-Apps

External games (garticDraw, aimTrainer, dodgeLoL, etc.) are standalone static builds copied into `static/games/<slug>/`. Build scripts in `scripts/build-*.mjs` download source, patch the `base` path, build, and copy the output. Run them individually; they are not part of the main `npm run build`.
