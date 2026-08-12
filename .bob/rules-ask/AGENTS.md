# Project Documentation Context (Ask Mode)

## Counterintuitive structure

- **Adapter is `@sveltejs/adapter-vercel`, not `adapter-static`** — `svelte.config.js` uses the Vercel adapter. `@sveltejs/adapter-static` is installed but not active.
- **The home page is NOT pre-rendered** — `src/routes/+page.ts` explicitly sets `prerender = false` to support live GitHub data. All other pages are pre-rendered via the layout default.
- **`src/lib/index.ts` only re-exports data** (profile + projects). Component exports live in `src/lib/components/index.ts`.
- **Several "game" routes don't exist as SvelteKit pages** — `/games/vcKaraoke`, `/games/spotifyHero`, `/tutoring` are pure `vercel.json` rewrites to external deployments.
- **Games in `static/games/`** are fully independent apps (own `index.html`, own JS bundles) built by scripts. SvelteKit knows nothing about their internals; the build just ignores HTTP errors for their paths.
- **`static/github-contrib.json` and `static/github-recent.json`** serve as build-time fallbacks when the API endpoints are unavailable, not as the primary data source.
- **`src/lib/types/github.ts` has Zod schemas** but they are not used by the API routes — the runtime validation is done with manual `isRecord()` guards in the server files and `+page.ts`.
- **There is a Konami code easter egg** wired in `src/routes/+layout.svelte` that shows a Matrix overlay.
- **`instant-home-hash-scroll`** is a `sessionStorage` key the Nav uses to coordinate jump-to-section from other pages back to home without triggering native browser hash smooth scroll.
