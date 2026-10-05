# Site audit — 2026-10-05

A full pass over mario-belmonte.com: bugs, UI/UX, accessibility, discoverability (things that exist but
can't be reached), infrastructure, and features worth adding. The rule for every change was **keep the
vibe and remove nothing**: same palette, same monospace terminal look, same easter eggs, same routes.

Branch: `feat/site-audit`. Each group below is its own commit, so any one can be reverted alone.

**Status key:** ✅ fixed in this pass · ⏸ deferred (reason given) · 🚫 left as is on purpose · ❌ checked, not a real problem

---

## How to see the live site

`scripts/snapshot-site.mjs` (new) screenshots every route in `/sitemap.xml` at 390px and 1440px, in dark
and light mode, and records console errors, failed requests and non-2xx documents. It uses
Playwright's bundled Chromium, so no Chrome install is needed.

```bash
npm i --no-save playwright && npx playwright install chromium
npm run snapshot:live                     # → .snapshots/mario-belmonte.com/index.html
npm run snapshot:local                    # against npm run dev
node scripts/snapshot-site.mjs --compare  # live vs local side by side → .snapshots/compare.html
npm run verify:live                       # verify-ui + verify-chart against production
```

The baseline run against production (before any of these changes) was 176 snapshots (44 routes × 2
viewports × 2 themes). Every one returned 200 with no uncaught exceptions. The only console noise was
from the Google Drive embed on `/resume`: a 401 from its sign-in probe, and a `chrome-extension://` URL
it tries to load. Neither is something this site can fix.

---

## 1. Discoverability — things you couldn't reach

| | Finding | Status |
|---|---|---|
| ✅ | **`/games/typetest` was linked from nowhere.** It only appeared in `sitemap.xml`. | It now has a card on `/games` (`route: true` in `games.ts`), a "← back to games" link, and a search entry. |
| ✅ | **Moxel was not in `/games`.** The only way in was the Moxel project's "Visit Site" button. | Card added to `/games`. |
| 🚫 | **rogueSwipe is built and live at `/games/rogueSwipe/`, but its card is "In Progress" with no link.** | Your decision: it stays unlinked. It does work in `npm run dev` now (see C1). |
| 🚫 | **spotifyHero's proxy works, but its card has no link** (`playUrl: '#'`). | Your decision: it stays unlinked. |
| ✅ | **Search only covered projects.** "aim trainer", "karaoke" and "resume" found nothing. | Search now covers games and pages. The terminal also gained `games` and `play <name>`. |
| ✅ | **The home page shows 3 of 37 projects and had no way to the rest** except the nav. | Added a "view all 37 projects →" link. |
| ✅ | **Project pages were dead ends.** | Added prev/next links (they wrap around). |
| ✅ | **The vcKaraoke and tutoring links hardcoded `https://mario-belmonte.com/…`.** The Pi and preview deployments sent visitors to production. | They are relative now. `npm run dev` reaches them through a dev proxy in `vite.config.ts`. |
| ✅ | **rogueSwipe 404'd in `npm run dev`.** The dev directory-index rewrite only covered linked games. | It now covers built-but-unlinked games as well. |
| 🚫 | **`/room/*` isn't linked.** | By design: it is only reached from inside the karaoke app. |
| 🚫 | **The smart-home LIVE Dashboard link (`http://smarthome:3000`) is LAN-only.** | Intentional, and the page labels it "in-person showcase". |

## 2. Bugs

| | Finding | Status |
|---|---|---|
| ✅ | **Type test: multi-line snippets could never be completed cleanly.** The answer box was an `<input type="text">`, which strips line breaks, so the newline characters could never be typed. Most medium and all hard snippets are multi-line. | The answer box is now a `<textarea>`. A full hard run with no typos now scores 0 mistakes (verified). |
| ✅ | **Type test: Tab was swallowed for the whole test,** so keyboard users were stuck until they finished. There was also no way to quit. | Tab works normally; Esc and a "quit" button abort the test. |
| ✅ | **Type test: pasting the snippet "won" instantly.** | Paste and drop are blocked. |
| ✅ | **Type test: WPM ignored errors** (it was computed from snippet length), **and the clock started on Shift.** | WPM now counts only correct characters, and the mistake count is shown. The clock starts on the first typed character. Leaderboard scores saved before this change used the old formula. |
| ✅ | **Contribution chart lost Dec 28–31 every year.** Each year was fetched as a 364-day window starting on the Monday before Jan 1. The committed data ends on 2026-12-27. In late December the "last 365 days" view would show zero for today, and each year's total counted a few days of the previous December. | Both `api/github-contrib` and `scripts/update-github-contrib.mjs` now fetch exact calendar years. The chart places each day by its date, so alignment doesn't matter. |
| ✅ | **One failed GitHub refresh threw away a good cached copy,** and `Promise.all` discarded both years if either failed. | Both routes now serve the last good payload while GitHub is erroring. Contrib uses `allSettled` and reuses the last good copy of a failed year. |
| ✅ | **`/api/github-recent` forwarded GitHub's error message verbatim.** The rate-limit message includes the server's IP, which on the Pi is the home IP the tunnel hides. | The message is logged on the server and replaced with fixed text. |
| ✅ | **Terminal: Tab-completion lost focus.** The focus trap ran first and moved focus to the ✕ button. | The input opts out with `data-trap-owns-tab`; Shift+Tab is still trapped. |
| ✅ | **Terminal: `projects` printed an empty list** if run before the project index loaded. | Commands that need the index now wait for it. |
| ✅ | **Search: an effect loop I introduced mid-pass** (a fresh proxy re-triggered the effect). It was caught by a hung test run and fixed with `untrack` before any commit. | Never shipped. |
| ✅ | **Project page: unguarded `new URL(project.demo)` in the markup.** A malformed URL would crash the route. | Uses the shared `getYouTubeId()` in `utils/urls.ts`. |
| ✅ | **Project page showed two identical "Visit Site" buttons** when both URL fields were set. | One button. |
| ✅ | **Scroll lock race.** A stale unlock that ran after a navigation reset could release a newer lock. | Locks carry generation tokens. |
| ✅ | **`safeStorage` checked availability with a test write,** so a full quota also disabled every read. | It probes reads separately from writes. |
| ✅ | **The Konami code missed "↑ ↑ ↑ ↓ …"** (one extra Up). | It now matches on a rolling buffer of recent keys. |
| ✅ | **Sound: `toggle()` before the first play ignored a saved "off".** | The saved preference is restored before toggling. |
| ✅ | **Two `theme-color` meta tags;** the static one claimed dark mode while in light mode. | The static one is removed; `app.html` and Nav own it. |
| ✅ | **`apple-touch-icon` was an `.ico`,** which iOS ignores. | 180×180 PNG. |
| ✅ | **Toast: copying the same email twice wasn't re-announced** to screen readers, and the toast sat under the iPhone home indicator. | Both fixed. Hover-pause was tried and reverted, because the toast sits over the footer's copy button and swallowed clicks meant for it. |
| ✅ | **Timer and listener leaks** in the About teaser and the Nav theme effect. | Cleaned up on unmount. |
| ✅ | **paddleBall's preview image was a 1×1 pixel.** | Replaced with a real screenshot. |
| ✅ | **Reduced motion still ran infinite animations at frame rate** (a flicker). | `animation-iteration-count: 1` is added under reduced motion. |

## 3. Accessibility

| | Finding | Status |
|---|---|---|
| ✅ | No custom error page: 404s showed SvelteKit's unstyled default with no way back. | Terminal-styled `+error.svelte` with links home and to search; marked `noindex`. |
| ✅ | The focus ring was ~1.3:1 on white, effectively invisible in light mode. | Token-based ring with at least 3:1 in both themes. |
| ✅ | Light-mode link and tag text (#0d9488) was ~3.7:1. | Uses `--accent-text` (#0f766e, ≥4.5:1). Fills and borders keep the brand teal. |
| ✅ | Mobile menu: no Escape, focus didn't move into it, and an `aria-label` hid the visible word "menu". | All fixed, plus `aria-controls` and `aria-current` on nav links. |
| ✅ | The theme toggle used two conflicting state models (a changing label plus `aria-pressed`). | Fixed label, `aria-pressed` only. |
| ✅ | False empty states while loading: search, chart, "currently building", terminal. | "loading…" states, and a `role=status` result count in search. |
| ✅ | Type test: no h1, unlabelled input, letter-by-letter screen-reader output, focus dropped on every state change. | All fixed. |
| ✅ | `/projects` had no h1, and its sort buttons didn't report which was selected. | h1, `role=group`, and `aria-pressed` here and on the chart's year buttons. |
| ✅ | Autoplaying preview videos had no pause control (WCAG 2.2.2). | Small play/pause toggle; once paused by hand, scrolling back doesn't restart it. |
| ✅ | The About teaser photo rotated every 4 s with no way to pause it. | Pauses while hovered or focused. |
| ✅ | The timeline was invisible without JS. | It is only hidden when `@media (scripting: enabled)`. |
| ✅ | Inputs under 16px made iOS zoom in; many tap targets were under 44px. | 16px floor on inputs, 44px targets on touch screens. |
| ✅ | ↗ links didn't say they open a new tab, and card links all read "GitHub Repo" / "details". | Screen-reader-only text adds "(opens in new tab)" and the project name. |
| ✅ | Copy-email buttons gave no hint that they copy. | Label and title added. |
| ✅ | Back-to-top left focus at the bottom of the page. | Moves focus to the site title. |
| ✅ | The breadcrumb wasn't a landmark. | `<nav aria-label="Breadcrumb">` with `aria-current`. |
| ⏸ | **About photos have generic alt text.** | `about-photos.ts` now has an optional `alt` field. Only you can describe the photos accurately; until then the fallback reads "Photo N of 23…". |
| ⏸ | **Rhythm-game iframe titles are generic** ("Rhythm game video"). | Edit `title` in `rhythm-games/+page.svelte` — it needs the actual song or game. |
| ⏸ | **Native demo videos have no captions** (`<track>`). | Needs caption files. |

## 4. Light mode and convention cleanup

| | Finding | Status |
|---|---|---|
| ✅ | Type test had no light-mode rules: wrong-character red was ~3:1, the input was grey, the pills were pale. | Light palette added. |
| ✅ | The LIVE Dashboard button was ~1.4:1 in light mode. The community/multi-site badges and the terminal error line were also too pale. | Darker same-hue colours in light mode. |
| ✅ | Raw `rgba()` literals in `<style>` blocks across 10 components (a CLAUDE.md violation). | Converted to the exact `color-mix()` equivalent, so nothing renders differently. |
| ✅ | The tech-badge palette was duplicated in ProjectCard and the project page. | `--tag-c` / `--tag-fg` tokens in `app.css`. |
| 🚫 | Light mode shows every tech badge as the same teal pill. | Looks like a deliberate light-theme design, so I kept it. Per-kind colours are a one-rule change if you want them. |
| ❌ | "The hero canvas is invisible in light mode but still animating." | Disproved by measurement: the canvas changes ~330k pixels in light mode, so it is visible. |
| 🚫 | Hovering the portrait with a mouse swaps it. | The hover swap is a documented design choice in the code. |

## 5. Features added (additive only)

- **`/projects`:** a text filter, chips for the 14 most-used tags (any tag works via the URL), a result
  count, and state kept in `?q=&tag=&sort=` so a filtered view can be shared.
- **`/games`:** tag filter chips.
- **About gallery:** a lightbox with prev/next, arrow keys and Escape; focus returns to the photo you
  opened. The hover zoom now only applies to devices with real hover.
- **Resume:** "download PDF" and "open full screen" buttons, because the embedded viewer is cramped on a
  phone.
- **Type test:** a mute toggle, clearing the leaderboard, and highlighting your latest run.
- **Terminal:** `games` and `play <name|n>` commands.
- **Mobile project cards:** descriptions are clamped to 3 lines instead of hidden.
- **Rhythm-games:** empty states written for visitors (they used to tell the visitor to edit a source
  file).

## 6. Pi / infrastructure

| | Finding | Status |
|---|---|---|
| ✅ | **`deploy.sh` never retried a failed deploy.** HEAD moved at `git reset` before the build, so after any later failure HEAD == target and every later tick exited early. | It compares against a last-successful marker in `.git/portfolio-deployed` instead. |
| ✅ | **Caddyfile changes never went live.** The single-file bind mount is pinned to its inode, `git reset --hard` replaces the file with a new inode, so `caddy reload` re-read the old file and reported success. | The new file is validated in a throwaway container, then caddy is force-recreated — after the health gate, so a Caddy failure can't skip the rollback. |
| ✅ | **The Pi served HTML with no Cache-Control,** so browsers cached it by guesswork and could request JS chunks a newer deploy had removed. | `?Cache-Control "public, max-age=0, must-revalidate"` (only applied when no other header is set), matching Vercel. |
| ✅ | **Caddy differed from Vercel on bare `/room` and on the Moxel redirect** (Caddy sent 301, Vercel 308). | Both match now. |
| ✅ | **`engine-strict=true` enforced nothing,** because `package.json` had no `engines` field. | `"node": ">=20"`. |
| ✅ | **`adapter-auto` and `adapter-static` were installed but used by nothing,** and the README described adapter-static. | Removed; README rewritten. |
| ⏸ | **Not validated with Caddy locally** (no Docker on this machine). | `deploy.sh` now validates before applying. Run `docker compose run --rm caddy caddy validate --config /etc/caddy/Caddyfile` on the Pi once. |
| ⏸ | **Possible duplicate Cache-Control headers on proxied assets in Caddy.** | Unconfirmed; check with `curl -I` on the Pi before changing anything. |
| ⏸ | **No real CSP or COOP on either host.** | Needs an inventory of the inline scripts in `app.html`, the JSON-LD and the proxied apps' needs. Ship it report-only first. |
| ⏸ | **`/games/aimTrainer` without a trailing slash breaks the game's relative asset paths.** | All in-site links use the slash; a per-game redirect would need entries in both `vercel.json` and the Caddyfile. |
| ⏸ | **Caddy's `path` matching ignores case** (so `/Tutoring` is proxied on the Pi but not on Vercel). | Harmless, and documented. |
| ⏸ | **`services/moxel-signal` has no lockfile.** | It's vendored from the Moxel repo by `build-moxel.mjs`; fix it upstream. |

## 7. Smaller things left as they are

- The row-normalising `$effect` in `projects/+page.svelte` reads and writes `expandedSlugs`. It
  converges and is documented; changing it risks the row-sync behaviour.
- `verify-chart.mjs`'s "no-token fallback" check passes trivially when a token is set.
- `navigateInternal` in `internalNav.ts` has no callers. Kept, because it is a documented public helper.
- Historical counts in comments ("all 35 project pages…") describe the moment a bug happened and are
  correct as history. Only comments that claim the *current* count were made count-agnostic.

---

## Verification (final state of the branch)

| Gate | Result |
|---|---|
| `npm run check` | 0 errors, 0 warnings |
| `npm run build` (Vercel) | ✅ |
| `ADAPTER=node npm run build` (Pi) | ✅ |
| `npm run verify:seo` | 914 passed, 0 failed (was 893; more pages and links now) |
| `node scripts/verify-ui.mjs` | 94 passed, 0 failed. New checks: type test and Moxel cards, no hardcoded production links, route vs reload links, `/games/typetest` route |
| `node scripts/verify-chart.mjs` | 34 passed, 0 failed |
| `bash -n deploy.sh` | parses |
| Snapshots, local, both themes and both widths | reviewed for the changed pages |

After merging and deploying, run `npm run snapshot:live` and `npm run verify:live` to confirm production.
