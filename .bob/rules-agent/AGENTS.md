# Project Coding Rules (Agent Mode)

## Must-follow patterns

- **Svelte 5 runes only** — use `$props()`, `$state()`, `$derived()`, `$effect()`. Never use Svelte 4 `export let`, `$:`, or `reactive` blocks.
- **`prerender = false` is required** on any new `+server.ts` or `+page.ts` that does runtime data fetching — the layout sets `prerender = true` globally.
- **Never use `window.location.href =`** for internal links — use `assignAppLocation` / `navigateInternal` from `src/lib/utils/internalNav.ts` so that `base` from `$app/paths` is respected.
- **Never use `localStorage` / `sessionStorage` directly** — use the safe wrappers in `src/lib/utils/safeStorage.ts` (handles SSR and private browsing).
- **Tag classification sets** in `ProjectCard.svelte` and `projects/[slug]/+page.svelte` are duplicated. If you add a new technology tag, update both files.
- **`projectLanguageBytes.ts` is auto-generated** — never hand-edit; run `npm run update:project-language-bytes` instead.
- **`static/github-contrib.json` and `static/github-recent.json` are auto-generated** by scripts. Do not hand-edit.
- **Adding a new project**: add to `src/lib/data/projects.ts` (the `projects` array + `getProject` function covers routing via `entries: EntryGenerator`). Update `topProjectSlugs` in `src/routes/+page.svelte` if it should appear on the landing page.
- **Adding a new game**: add to `src/lib/data/games.ts` AND create a build script in `scripts/` if it needs a custom static build. Games proxied externally only need an entry in `vercel.json` and `games.ts` — no SvelteKit route.
- **`src/lib/data/profile.ts` `github` field** must remain a full URL (`https://github.com/<user>`) — scripts regex-parse the username from it.
- **Sound IDs are typed** — new sounds must be added to `SoundId` in `src/lib/utils/sound.ts` and the corresponding `.mp3` must be placed in `static/sounds/`.
- **API validation**: validate/sanitize API responses with manual type guards (`isRecord()` + field-by-field checks), not a schema library — the project has **no production dependencies** and `zod` was removed along with the unused `src/lib/types/github.ts`. Contribution-calendar payloads have a shared validator: `src/lib/utils/contribShape.ts`, imported by both `api/github-contrib/+server.ts` and `src/lib/utils/githubData.ts`. Don't write a fourth copy.
- **CSS naming**: scoped styles inside `.svelte` files; light-mode overrides use `:global([data-theme='light']) .local-class { }`.
- **Validation gate**: run `npm run check` before considering any change done. There is no ESLint, no test runner.
