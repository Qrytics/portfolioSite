# Fix-All Plan

## Overview

Six categories of real issues were found by audit. This plan fixes all of them in a safe, ordered sequence:
1. Quick isolation fixes (storage, barrel)
2. Shared utility extraction (tags, sounds)
3. Data refresh (projectLanguageBytes)
4. CSS theming cleanup (largest scope, done last so the codebase is stable first)

No new features. No refactors beyond what's required to fix the issues.

---

## Sub-Tasks

---

### Sub-Task 1 — Fix raw sessionStorage access in `+page.svelte`

**Status:** [ ] pending

**Intent**
`src/routes/+page.svelte` calls `window.sessionStorage.getItem()` and `window.sessionStorage.removeItem()` directly in `consumeInstantHomeHashScroll()`. Every other component in the project uses the `safeStorage` utility for this, which handles SSR and private-browsing mode gracefully.

**Expected Outcomes**
- `window.sessionStorage` is no longer called directly in `+page.svelte`.
- `getSessionItem` and `removeSessionItem` from `src/lib/utils/safeStorage.ts` are used instead.
- `npm run check` passes with no new errors.

**Todo List**
1. In `src/routes/+page.svelte`, add `getSessionItem`, `removeSessionItem` to the import from `$lib/utils/safeStorage`.
2. Replace `window.sessionStorage.getItem(key)` with `getSessionItem(key)`.
3. Replace `window.sessionStorage.removeItem(key)` with `removeSessionItem(key)`.
4. Remove the `if (typeof window === 'undefined') return null;` guard — the safeStorage utility handles SSR internally.
5. Run `npm run check`.

**Relevant Context**
- File: `src/routes/+page.svelte` lines 39–45 (`consumeInstantHomeHashScroll` function)
- Utility: `src/lib/utils/safeStorage.ts` — exports `getSessionItem(key, fallback?)` and `removeSessionItem(key)`
- `src/lib/components/Nav.svelte` line 7 shows the correct import pattern already used elsewhere

---

### Sub-Task 2 — Fix incomplete barrel export in `src/lib/components/index.ts`

**Status:** [ ] pending

**Intent**
`src/lib/components/index.ts` is missing exports for 16 components that exist and are actively used in routes. This makes discoverability inconsistent — some components must be imported directly while others come from the barrel with no documented reason for the split.

**Expected Outcomes**
- All `.svelte` files in `src/lib/components/` (excluding the `games/` subfolder) are exported from the barrel.
- Existing direct imports in routes/layout continue to work unchanged (barrel additions are non-breaking).
- `npm run check` passes.

**Todo List**
1. Read the current `src/lib/components/index.ts` to see what is already exported.
2. Compare against all files returned by `src/lib/components/*.svelte` glob.
3. Add the missing exports: `AboutMeTeaser`, `ReviewCta`, `GitHubContribChart`, `MediaSection`, `ScrollProgress`, `MatrixOverlay`, `LatestFromBlog`, `WaveCheckeredBackground`, `Bio`, `Contact`, `EegBackground`, `FunSection`, `Skills`, `Stats`, `Timeline`.
   - Note: `games/TypeTest.svelte` lives in a subfolder — export it as `TypeTest` with path `./games/TypeTest.svelte`.
4. Run `npm run check`.

**Relevant Context**
- File to edit: `src/lib/components/index.ts`
- Components used in `src/routes/+layout.svelte`: `Nav`, `Footer`, `ScrollProgress`, `MatrixOverlay`
- Components used in `src/routes/+page.svelte`: `Hero`, `AboutMeTeaser`, `ProjectList`, `ReviewCta`, `CurrentlyBuilding`, `Timeline`, `GitHubContribChart`

---

### Sub-Task 3 — Extract duplicate tag classification logic to a shared utility

**Status:** [ ] pending

**Intent**
The six tag-category Sets (`languageTags`, `frameworkTags`, `apiTags`, `serviceTags`, `protocolTags`, `toolTags`) and the `getTagKind()` function are defined identically in two separate files. Any tag taxonomy update currently requires editing both. Extract to a shared utility.

**Expected Outcomes**
- A new file `src/lib/utils/tags.ts` exports the six Sets and the `getTagKind()` function.
- Both `src/lib/components/ProjectCard.svelte` and `src/routes/projects/[slug]/+page.svelte` import from the new utility instead of defining their own copies.
- The local definitions are removed from both components.
- `npm run check` passes.

**Todo List**
1. Create `src/lib/utils/tags.ts` with the six `const` Sets and the exported `getTagKind(tag: string)` function. Copy the exact values from either source file (they are identical).
2. In `src/lib/components/ProjectCard.svelte`, remove the six Set declarations and `getTagKind` function. Add `import { getTagKind } from '$lib/utils/tags';`.
3. In `src/routes/projects/[slug]/+page.svelte`, do the same.
4. Run `npm run check`.

**Relevant Context**
- `src/lib/components/ProjectCard.svelte` lines 62–90
- `src/routes/projects/[slug]/+page.svelte` lines 8–36
- Tag kind values: `'language' | 'framework' | 'api' | 'service' | 'protocol' | 'tool' | 'other'`

---

### Sub-Task 4 — Add missing sound files to `static/sounds/`

**Status:** [ ] pending

**Intent**
`src/lib/utils/sound.ts` references 7 `.mp3` files under `/sounds/` but the `static/sounds/` directory is empty (only a `README.md`). Sounds fail silently at runtime — the site works but sound features (timeline ticks, typing test feedback, Konami game-start, etc.) are all non-functional. The `README.md` already documents the required files and recommends CC0 sources.

**Expected Outcomes**
- All 7 required `.mp3` files exist in `static/sounds/`: `tick.mp3`, `pop.mp3`, `key.mp3`, `complete.mp3`, `start.mp3`, `gameover.mp3`, `click.mp3`.
- The sound system plays correctly when interacting with timeline, typing test, and Konami easter egg.
- No code changes required — only asset files.

**Todo List**
1. Source 7 CC0 (public domain) sound effects. The `static/sounds/README.md` provides exact search terms and example freesound.org URLs for each:
   - `tick.mp3` — short mechanical click (~50ms)
   - `pop.mp3` — soft bubble pop (~100ms)
   - `key.mp3` — mechanical keyboard click (~30ms)
   - `complete.mp3` — success chime (~200ms)
   - `start.mp3` — retro game start beep (~150ms)
   - `gameover.mp3` — game over tone (~300ms)
   - `click.mp3` — UI button click (~40ms)
2. Process each file with ffmpeg per the README instructions (MP3, 128kbps, -3dB normalization, silence trimmed).
3. Place all 7 files in `static/sounds/`.
4. If a sound requires attribution, add it to `static/sounds/README.md`.
5. Manually verify by running `npm run dev` and triggering each sound (timeline scroll-reveal, typing test keypress, Konami code).

**Relevant Context**
- `src/lib/utils/sound.ts` lines 42–50 — the `loadSounds()` mapping
- `static/sounds/README.md` — full sourcing and processing instructions
- Sound IDs used: `timeline-tick` in Timeline component, `typing-key`/`typing-complete` in TypeTest, `game-start` in the Konami easter egg (layout.svelte)

---

### Sub-Task 5 — Refresh `projectLanguageBytes.ts` by running the generation script

**Status:** [ ] pending

**Intent**
`src/lib/data/projectLanguageBytes.ts` is auto-generated and is stale — at least 12 projects with GitHub URLs exist in `projects.ts` but are absent from the generated file. Running the existing script regenerates it.

**Expected Outcomes**
- `src/lib/data/projectLanguageBytes.ts` contains entries for all projects that have a public GitHub URL in `projects.ts`.
- The file's `Last updated` comment reflects the current date.
- `npm run check` passes.

**Todo List**
1. Ensure `GH_TOKEN` or `GITHUB_TOKEN` is set in the environment (the script exits early if missing).
2. Run `npm run update:project-language-bytes`.
3. Inspect the output — the script logs which entries were written. Verify the count matches the number of projects with GitHub URLs.
4. If any entries show `0` bytes (a warning was logged), investigate whether the repo is private or renamed.
5. Run `npm run check` to confirm the generated TypeScript is valid.

**Relevant Context**
- Script: `scripts/update-project-language-bytes.mjs`
- Output file: `src/lib/data/projectLanguageBytes.ts`
- The script reads `src/lib/data/projects.ts` to find projects with `github: 'https://github.com/...'` URLs — do not change that format.

---

### Sub-Task 6 — Replace raw accent/text color values with CSS custom properties

**Status:** [ ] pending

**Intent**
21 of 22 component files use raw `rgba(...)` values for colors that correspond to design tokens already defined in `src/app.css`. This causes:
- Inconsistency with the light-mode theme (light mode overrides `--accent`, `--text`, etc., but raw rgba values are invisible to those overrides without extra `:global([data-theme='light'])` rules).
- Hard maintenance — changing the accent color `#36f2c2` requires grep-and-replace across the entire codebase instead of one variable edit.

The replacement strategy uses `color-mix(in srgb, var(--token) X%, transparent)` for alpha variants — this is already used correctly in several places in the codebase (e.g. `ProjectCard.svelte` btn styles). For canvas/JavaScript color strings (e.g., `MatrixOverlay.svelte` `fillStyle = '#36f2c2'`), raw values are acceptable and should NOT be changed.

**Key color mappings** (use these when doing replacements):
| Raw value | Replace with |
|---|---|
| `rgba(54, 242, 194, N%)` | `color-mix(in srgb, var(--accent) N%, transparent)` |
| `rgba(243, 246, 255, 0.92)` | `var(--text)` |
| `rgba(243, 246, 255, 0.68)` | `var(--muted)` |
| `rgba(243, 246, 255, 0.52)` | `var(--muter)` |
| `rgba(243, 246, 255, N%)` (other) | `color-mix(in srgb, var(--text) N%, transparent)` |
| `rgba(246, 193, 119, N%)` | `color-mix(in srgb, var(--accent-2) N%, transparent)` |
| `rgba(0, 0, 0, N%)` | keep as-is (black overlays are theme-agnostic) |
| `rgba(255, 255, 255, N%)` | keep as-is (white overlays/glows are theme-agnostic) |
| `#36f2c2` in CSS | `var(--accent)` |
| `#36f2c2` in JS (canvas fillStyle) | keep as-is |
| `#0b0e12` in CSS | `var(--bg)` |

**Scope — process these files one at a time:**
1. `src/lib/components/MatrixOverlay.svelte` — small file, good warmup
2. `src/lib/components/Nav.svelte` — the `rgba(54, 242, 194, 0.5)` glow on focus
3. `src/lib/components/AboutMeTeaser.svelte` — multiple `rgba(243, 246, 255, ...)` text colors
4. `src/lib/components/GitHubContribChart.svelte` — the CSS portions (not the JS canvas drawing code)
5. `src/lib/components/Timeline.svelte`
6. `src/lib/components/Hero.svelte`
7. `src/lib/components/CurrentlyBuilding.svelte`
8. `src/lib/components/Contact.svelte`
9. `src/lib/components/Footer.svelte`
10. `src/lib/components/Bio.svelte`
11. `src/lib/components/FunSection.svelte`
12. `src/lib/components/Search.svelte`
13. `src/lib/components/Terminal.svelte`
14. `src/lib/components/LatestFromBlog.svelte`
15. `src/lib/components/MediaSection.svelte`
16. `src/lib/components/ReviewCta.svelte`
17. `src/lib/components/Skills.svelte`
18. `src/lib/components/EegBackground.svelte`
19. `src/lib/components/WaveCheckeredBackground.svelte`
20. `src/lib/components/games/TypeTest.svelte`
21. `src/routes/projects/[slug]/+page.svelte` (CSS only — JS helpers are fine)
22. `src/routes/+page.svelte` (CSS only)

After all files: run `npm run check`. Then `npm run build` to ensure no build regressions. Manually check dark→light toggle to verify no visual regressions.

**Expected Outcomes**
- No `rgba(54, 242, 194, ...)` in `.svelte` CSS `<style>` blocks (except intentional black/white overlays).
- No `rgba(243, 246, 255, ...)` in `.svelte` CSS `<style>` blocks.
- Changing `--accent` in `src/app.css` now updates the full UI in both themes without needing per-component fixes.
- `npm run check` and `npm run build` both pass.

**Relevant Context**
- Token definitions: `src/app.css` lines 1–31
- Example of correct `color-mix` usage already in codebase: `src/lib/components/ProjectCard.svelte` `.btn--primary` styles
- Do NOT change: JS/canvas color strings, `src/app.css` itself (it's the source of truth), or any `rgba(0,0,0,...)` / `rgba(255,255,255,...)` overlays used for depth/glow effects

---

## Implementation Order

```
ST1 (storage) → ST2 (barrel) → ST3 (tags util) → ST4 (sounds) → ST5 (langbytes) → ST6 (CSS)
```

ST1–ST4 are independent of each other and can technically be done in any order, but the sequence above is easiest for review. ST6 is last because it touches the most files and benefits from the codebase being clean first.
