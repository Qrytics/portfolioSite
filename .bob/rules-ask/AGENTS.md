# Project Documentation Context (Ask Mode)

## Counterintuitive structure

- **Adapter is `@sveltejs/adapter-vercel`, not `adapter-static`** — `svelte.config.js` uses the Vercel adapter. `@sveltejs/adapter-static` is installed but not active.
- **Every route is pre-rendered, including the home page.** It has no `+page.ts` at all: the GitHub fetches moved into `src/lib/utils/githubData.ts` and run on the client after mount, because both consumers sit behind a `requestIdleCallback` gate and so were never in the server-rendered HTML anyway — the old `load` blocked TTFB for nothing.
- **There are no barrel modules.** `src/lib/index.ts` and `src/lib/components/index.ts` were imported by nothing while keeping unused components in the module graph; both are deleted. Import by direct path.
- **Several "game" routes don't exist as SvelteKit pages** — `/games/vcKaraoke`, `/games/spotifyHero`, `/tutoring` are pure `vercel.json` rewrites to external deployments.
- **Games in `static/games/`** are fully independent apps (own `index.html`, own JS bundles) built by scripts. SvelteKit knows nothing about their internals; the build just ignores HTTP errors for their paths.
- **`static/github-contrib.json` and `static/github-recent.json`** serve as build-time fallbacks when the API endpoints are unavailable, not as the primary data source.
- **The project has no production dependencies.** `package.json` has no `dependencies` key. Runtime validation is hand-written type guards; the shared contribution-payload validator is `src/lib/utils/contribShape.ts`. (`src/lib/types/github.ts` and its `zod` schemas were deleted — nothing imported them, and its GraphQL schema expected `data.user` while both callers query `viewer`.)
- **There is a Konami code easter egg** wired in `src/routes/+layout.svelte` that shows a Matrix overlay.
- **`instant-home-hash-scroll`** is a `sessionStorage` key the Nav uses to coordinate jump-to-section from other pages back to home without triggering native browser hash smooth scroll.
