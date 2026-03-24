# AGENTS.md

## Cursor Cloud specific instructions

This is a SvelteKit 2 + Svelte 5 developer portfolio site that pre-renders to static HTML via `@sveltejs/adapter-static`.

### Key commands

See `package.json` scripts. Relevant ones:

| Task | Command |
|------|---------|
| Dev server | `npm run dev` (Vite, default port 5173) |
| Type check | `npm run check` |
| Production build | `npm run build` (outputs to `build/`) |
| Preview build | `npm run preview` |

### Notes

- There is no database, Docker, or external service dependency. All project/profile data lives in `src/lib/data/`.
- `GITHUB_TOKEN` env var is optional — used only by the `/api/github-recent` server endpoint. The site works without it (falls back to static JSON in `static/`).
- The `.npmrc` has `engine-strict=true`; Node.js v20+ is required.
- No linter (ESLint) is configured — `npm run check` (svelte-check + TypeScript) is the primary code-quality gate.
- No test framework is configured — there are no automated tests in the repository.
