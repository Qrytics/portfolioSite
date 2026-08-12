# Project Architecture Rules (Plan Mode)

## Hidden constraints

- **`prerender = true` at layout level is the load-bearing default** — any new server route or dynamic page must explicitly opt out or the build will fail trying to pre-render it.
- **`paths.relative = false` in `svelte.config.js`** means relative asset paths in HTML will break on nested routes. All internal paths must go through `base` from `$app/paths`.
- **Vercel rewrites in `vercel.json` are outside SvelteKit's routing** — do not create SvelteKit route files for `vcKaraoke`, `spotifyHero`, `tutoring` paths; they would conflict with the proxy rewrites.
- **API routes use module-level in-memory caches** (not edge KV, not Redis) — they reset on cold start and are not shared across serverless instances. Cache duration: 30 min for contrib, 5 min for recent repos.
- **GitHub username coupling**: both `scripts/update-github-*.mjs` and the runtime API servers derive the GitHub username by regex/URL-parsing `profile.github`. Changing the URL format breaks all GitHub data fetches.
- **Game sub-apps are fully decoupled static bundles** — they have no shared state, no shared components, no shared CSS with the SvelteKit app. They are served as static files from `static/games/<slug>/`.
- **The two-tier data flow for GitHub data**: `scripts/` populate static JSON → deployed as CDN fallback → at runtime, Vercel serverless functions fetch live data and cache in-memory → `+page.ts` tries live API first, falls back to static JSON. Changing either tier independently can silently break the fallback chain.
- **`topProjectSlugs` in `+page.svelte` is a hardcoded allowlist** — the home page will not automatically show new projects added to `projects.ts` unless the slug is added there too.
- **Tag coloring logic is duplicated** between `ProjectCard.svelte` and `projects/[slug]/+page.svelte` — there is no shared utility. Any tag taxonomy changes need both files updated.
- **`projectLanguageBytes.ts` is a generated file committed to git** — it intentionally lives in `src/lib/data/` not `static/`, because it's imported as a TypeScript module by components.
