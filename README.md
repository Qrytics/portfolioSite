# portfolioSite

> **Live site:** [mario-belmonte.com](https://mario-belmonte.com/)

A statically-generated developer portfolio built with **SvelteKit 2**, **Svelte 5**, and **TypeScript** — featuring a dark terminal aesthetic, case-study project pages, a GitHub contributions chart, a live GitHub activity feed, a career timeline, and a full-text project search. It's basically a résumé with better syntax highlighting.

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [File Architecture](#file-architecture)
4. [Routes](#routes)
5. [Getting Started](#getting-started)
6. [Customization](#customization)
   - [Profile](#1-update-your-profile-srclibdataprofilets)
   - [Projects](#2-add-your-projects-srclibdataprojectsts)
   - [Colors & Theme](#3-adjust-colors--theme-srcappcss)
7. [Build & Deploy](#build--deploy)
8. [Scripts](#scripts)

---

## Features

- **Dark terminal theme** — near-black background (`#0b0e12`), monospace fonts, teal-green accent (`--accent`)
- **Hero section** — tagline, description, call-to-action, and one-click email copy with animated wave/checkered background
- **Project grid** — card-based layout with media (image or video), tags, status badge, and "show more" fold; links to GitHub, live demo, and deployed site
- **Individual project pages** — `/projects/[slug]` with long description, problem statement, architecture breakdown, challenges, tradeoffs, outcome, and key learnings; optional Google Slides embed
- **Full-text project search** — keyboard-accessible modal (`Ctrl/⌘ K`) searching title, subtitle, description, and tags
- **GitHub Contribution Chart** — heat-map grid of daily commit contributions across up to 5 years, loaded from a pre-generated static JSON file (`static/github-contrib.json`)
- **Currently Building** — feed of public GitHub repos pushed within the last week, loaded from a pre-generated static JSON file (`static/github-recent.json`)
- **Career timeline** — chronological list of milestones, hackathons, and work experience with accent highlights
- **About page** — responsive photo gallery at `/about`
- **Rhythm Games page** — YouTube videos and shorts showcase at `/rhythm-games`
- **Resume page** — embedded Google Drive PDF viewer at `/resume`
- **Skills section** — grouped skill tags (Languages, Frontend & APIs, Backend & DevOps, Testing & QA, Hardware & EDA, ML & Security, Tools, Languages (spoken))
- **Stats section** — key at-a-glance numbers
- **Review CTA** — call-to-action banner
- **Prerendered & static** — built with `@sveltejs/adapter-static`; every page (including `[slug]`) is pre-rendered at build time
- **SEO + OpenGraph** — `<meta>` description, OG title/description/image, Twitter card, and `theme-color` baked into the root layout
- **Easy to customize** — update two data files (`profile.ts` + `projects.ts`) and the rest of the UI follows automatically

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [SvelteKit 2](https://kit.svelte.dev/) + Svelte 5 |
| Language | TypeScript 5 |
| Rendering | Static (adapter-static + full prerender) |
| Build tool | Vite 7 |
| Styling | Global CSS variables (`src/app.css`) — no CSS framework |
| Type checking | `svelte-check` + `tsc` |
| Package manager | npm |

---

## File Architecture

```
portfolioSite/
├── scripts/
│   ├── extract-posters.ps1             # PowerShell: extract first-frame poster PNGs from MP4s
│   ├── gif-to-mp4.ps1                  # PowerShell: batch-convert GIFs to MP4
│   ├── update-github-contrib.mjs       # Node.js: fetch GitHub contribution data → static/github-contrib.json
│   └── update-github-recent.mjs        # Node.js: fetch recent GitHub repos → static/github-recent.json
├── src/
│   ├── app.css                         # Global styles & CSS custom properties (colors, fonts, shadows)
│   ├── app.html                        # HTML shell (fonts, viewport)
│   └── lib/
│       ├── assets/
│       │   └── favicon.svg             # Favicon SVG
│       ├── components/
│       │   ├── Nav.svelte                      # Fixed top navigation with Search trigger
│       │   ├── Hero.svelte                     # Landing hero: tagline, description, CTA, email copy
│       │   ├── WaveCheckeredBackground.svelte  # Animated SVG background used in Hero
│       │   ├── EegBackground.svelte            # EEG-style animated SVG background
│       │   ├── ProjectCard.svelte              # Individual project card (media, tags, links)
│       │   ├── ProjectList.svelte              # Project grid with show-more toggle
│       │   ├── MediaSection.svelte             # Reusable media block (image / video)
│       │   ├── GitHubContribChart.svelte       # GitHub contributions heat-map (multi-year)
│       │   ├── CurrentlyBuilding.svelte        # Recent GitHub activity feed
│       │   ├── Timeline.svelte                 # Chronological career/milestone timeline
│       │   ├── AboutMeTeaser.svelte            # Bio teaser linking to /about
│       │   ├── ReviewCta.svelte                # Call-to-action banner
│       │   ├── Bio.svelte                      # Full bio section
│       │   ├── Skills.svelte                   # Grouped skill-tag section
│       │   ├── Contact.svelte                  # Contact links section
│       │   ├── Stats.svelte                    # At-a-glance stats
│       │   ├── FunSection.svelte               # Fun/personal section
│       │   ├── LatestFromBlog.svelte           # Latest blog post teaser
│       │   ├── Terminal.svelte                 # Decorative terminal component
│       │   ├── Search.svelte                   # Full-text project search modal (Ctrl/⌘ K)
│       │   ├── Footer.svelte                   # Page footer
│       │   └── index.ts                        # Re-exports all components
│       ├── data/
│       │   ├── blog.ts            # Blog post data
│       │   ├── profile.ts         # ← YOUR INFO: name, bio, skills, social links
│       │   └── projects.ts        # ← YOUR PROJECTS: full project list + data schema
│       ├── utils/
│       │   ├── internalNav.ts     # Router-aware navigation helpers (assignAppLocation / navigateInternal)
│       │   ├── portal.ts          # Svelte action: teleports a node to document.body
│       │   └── scrollLock.ts      # Scroll-lock helpers used by Search modal
│       └── index.ts               # Re-exports from data (profile, projects)
└── src/routes/
    ├── +layout.ts                 # export const prerender = true (global)
    ├── +layout.svelte             # Root layout: Nav, Footer, SEO meta tags
    ├── +page.svelte               # Home page: Hero → Projects → GitHub Contrib Chart → Currently Building → Timeline → About teaser → ReviewCta
    ├── +page.ts                   # Home page load function: fetches github-contrib.json + github-recent.json
    ├── about/
    │   └── +page.svelte           # Photo gallery page
    ├── api/
    │   └── github-recent/
    │       └── +server.ts         # Dev/SSR GitHub activity endpoint (cached; optional GITHUB_TOKEN)
    ├── resume/
    │   └── +page.svelte           # Embedded Google Drive PDF viewer
    ├── rhythm-games/
    │   └── +page.svelte           # YouTube videos and shorts showcase
    └── projects/
        └── [slug]/
            ├── +page.ts           # Prerender entries + data loader (getProject by slug)
            └── +page.svelte       # Project detail page (case-study layout)
```

---

## Routes

| Path | Description |
|---|---|
| `/` | Home — Hero, project grid, GitHub contributions chart, live GitHub feed, timeline, bio teaser |
| `/projects/[slug]` | Project detail / case study page |
| `/about` | Photo gallery |
| `/resume` | Embedded PDF résumé viewer |
| `/rhythm-games` | YouTube videos and shorts showcase |

---

## Getting Started

**Prerequisites:** Node.js ≥ 20 and npm.

```bash
# 1. Clone the repository
git clone https://github.com/Qrytics/portfolioSite.git
cd portfolioSite

# 2. Install dependencies
npm install

# 3. Start the dev server (http://localhost:5173)
npm run dev
```

---

## Customization

### 1. Update your profile (`src/lib/data/profile.ts`)

Replace the exported `profile` object with your own information. Every field is typed:

```ts
export interface Profile {
  name: string;          // Full name shown in <title> and layout
  handle: string;        // URL-friendly handle
  tagline: string;       // Hero headline
  description: string;   // Hero sub-heading paragraph
  heroCta?: string;      // Optional call-to-action line below description
  bio: string;           // Full bio (AboutMeTeaser / Bio component)
  location: string;
  email: string;
  github: string;        // Full URL, e.g. "https://github.com/yourhandle"
  linkedin: string;      // Full URL
  twitter?: string;
  skills: SkillGroup[];  // Array of { category: string; items: string[] }
}
```

`GitHubContribChart` and `CurrentlyBuilding` automatically derive your GitHub username from `profile.github`, so no extra config is needed.

---

### 2. Add your projects (`src/lib/data/projects.ts`)

Add entries to the `projects` array. The full `Project` interface:

```ts
export interface Project {
  // ── Required ──────────────────────────────────────────────────────────
  slug: string;           // URL-safe identifier → /projects/[slug]
  title: string;
  subtitle: string;       // One-line summary shown on the card
  description: string;    // Card body text
  type: 'open-source' | 'closed-source' | 'community / ecosystem' | 'multi-site';
  tags: string[];
  status: 'active' | 'wip' | 'archived';
  startMonth: Month;      // 'Jan' | 'Feb' | … | 'Dec'
  startYear: number;
  endMonth: Month;
  endYear: number;
  year: number;           // Primary year shown in card meta

  // ── Optional text ─────────────────────────────────────────────────────
  shortTitle?: string;    // Shorter card title used at narrow widths
  longDescription?: string; // Multi-line text shown on the detail page
  note?: string;

  // ── Links ─────────────────────────────────────────────────────────────
  github?: string;
  demo?: string;          // YouTube or other video/demo URL
  siteUrl?: string;       // Live deployed app — shows a "Visit Site" button
  slides?: string;        // Google Slides URL — embedded below demo video

  // ── Media ─────────────────────────────────────────────────────────────
  image?: string;         // Single image or MP4/WebM video path (in /static)
  poster?: string;        // Poster image shown before video plays
  images?: string[];      // Multiple images shown side-by-side
  mediaAspect?: 'default' | 'schematic' | 'auto';  // Card media aspect ratio
  mediaScale?: number;    // 0–1 scale factor for padded media layout
  mediaStyle?: Record<string, string>; // Inline CSS for the media element

  // ── Case-study fields ─────────────────────────────────────────────────
  problem?: string;           // Short problem statement
  architecture?: string[];    // Key architectural components (bullet list)
  challenges?: string[];      // Technical challenges (bullet list)
  tradeoffs?: string[];       // Design tradeoffs (bullet list)
  outcome?: string;           // Result summary
  whatYouLearned?: string[];  // Key learnings (bullet list)
}
```

The first entry in `projects` is used for an `<link rel="preload">` hint on the home page.

> **Also:** `src/lib/data/blog.ts` holds placeholder blog post data (`BlogPost[]`). Replace the sample entries with your own posts when you wire up a blog.

---

### 3. Adjust colors & theme (`src/app.css`)

All visual tokens live in the `:root` block at the top of `src/app.css`:

```css
:root {
  --accent:   #36f2c2;   /* primary teal-green — change this to your brand color */
  --bg:       #0b0e12;
  --panel:    #111418;
  --border:   rgba(255,255,255,0.06);
  --muted:    rgba(243,246,255,0.55);
  --font-mono: 'JetBrains Mono', monospace;
  /* … */
}
```

Change `--accent` to retheme the entire site (nav links, timeline dots, tag highlights, terminal prompts, etc.).

---

## Build & Deploy

```bash
npm run build       # Production build → /build (static files)
npm run preview     # Serve the /build output locally for verification
npm run check       # TypeScript + Svelte type checking (svelte-check)
npm run check:watch # Type checking in watch mode
```

### Static output (adapter-static) & hosting

After `npm run build`, the site is written to **`build/`**. Routes are emitted as **`.html` files** at the root of that folder (not always as `path/index.html`):

| App route | File on disk |
|-----------|----------------|
| `/` | `build/index.html` |
| `/projects` | `build/projects.html` |
| `/projects/<slug>` | `build/projects/<slug>.html` (one file per project) |
| `/about`, `/resume`, … | `build/about.html`, `build/resume.html`, … |

**Why this matters:** Some static hosts only serve “pretty” URLs like `/projects/mono-pix-scout` if they **rewrite** that path to `projects/mono-pix-scout.html`. If they don’t, a **full page load** or **refresh** on that URL may return **`index.html`**, **`404.html`**, or another fallback — so the address bar can look right while the **wrong document** (e.g. the landing page) is what actually loaded.

**How to verify (DevTools):**

1. Open **Network**, enable **Preserve log**.
2. Hard-refresh or open a project URL directly: `/projects/<slug>` (or `/your-base/projects/<slug>` if you use `kit.paths.base`).
3. Click the **first document** request (type **document**). Check:
   - **Status 200** and the response is the **project** page (not the home hero), **or**
   - If it’s always **`index.html`** or a generic **404** shell, fix **host rewrites** or consider SvelteKit’s **`trailingSlash`** / deploy docs so paths match what your host expects.

**Internal navigation:** Main nav, project cards, search, and terminal use **`assignAppLocation()` / `navigateInternal()`** (`src/lib/utils/internalNav.ts`) which call `window.location.assign()` with the correct `kit.paths.base` prefix. Hash links like `/#about-me` still use normal `<a>` behavior.

---

## Scripts

The `scripts/` directory contains two Node.js scripts that pre-generate static JSON files consumed by the home page `load` function. Run them (with a GitHub token) before `npm run build` so the data stays current.

| Script | Output file | What it does |
|--------|-------------|--------------|
| `update-github-recent.mjs` | `static/github-recent.json` | Fetches public repos pushed within the last week via the GitHub REST API |
| `update-github-contrib.mjs` | `static/github-contrib.json` | Fetches 5 years of daily contribution data via the GitHub GraphQL API |

Both scripts read your GitHub username from `src/lib/data/profile.ts` automatically.

```bash
# Run individually (GH_TOKEN takes precedence over GITHUB_TOKEN)
GH_TOKEN=ghp_... node scripts/update-github-recent.mjs
GH_TOKEN=ghp_... node scripts/update-github-contrib.mjs
```

> **Note:** `GITHUB_TOKEN` is sufficient when running in GitHub Actions. The site works without these scripts — it falls back to whatever JSON files are already committed in `static/`.

## Updating garticDraw
When the garticDraw repo receives new commits, refresh the static assets with:

```
npm run build:gartic-draw
```
then commit the updated static/garticDraw/ files
