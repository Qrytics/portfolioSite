# portfolioSite

A developer portfolio built with [SvelteKit](https://kit.svelte.dev/) — inspired by the clean, terminal-style aesthetic of [thavlik.dev](https://thavlik.dev/). It's a showcase of software engineering projects, technical experiments, and coding journey. It's basically a resume with better syntax highlighting.

## Features

- **Dark terminal theme** — near-black background, monospace fonts, green accent color
- **Single-page layout** — Hero → Projects → About → Skills → Contact
- **Individual project pages** — `/projects/[slug]` with full detail view
- **Easy to customize** — update two data files and the rest of the UI follows

## File Architecture

```
src/
├── app.css                        # Global styles & CSS variables (colors, fonts)
├── app.html                       # HTML shell
├── lib/
│   ├── components/
│   │   ├── Nav.svelte             # Fixed top navigation
│   │   ├── Hero.svelte            # Landing hero with terminal prompt effect
│   │   ├── ProjectCard.svelte     # Individual project card
│   │   ├── ProjectList.svelte     # Project grid with show-more toggle
│   │   ├── Bio.svelte             # About / bio section
│   │   ├── Skills.svelte          # Grouped skills section
│   │   ├── Contact.svelte         # Contact links section
│   │   └── Footer.svelte          # Page footer
│   ├── data/
│   │   ├── profile.ts             # ← YOUR INFO: name, bio, skills, social links
│   │   └── projects.ts            # ← YOUR PROJECTS: title, description, tags, links
│   └── index.ts                   # Re-exports data helpers
└── routes/
    ├── +layout.svelte             # Root layout (Nav + Footer wrapper)
    ├── +page.svelte               # Home page (assembles all sections)
    └── projects/
        └── [slug]/
            ├── +page.ts           # Data loader (looks up project by slug)
            └── +page.svelte       # Project detail page
```

## Getting Started

```bash
npm install
npm run dev
```

## Customization

### 1. Update your profile (`src/lib/data/profile.ts`)

Fill in your name, title, bio, location, email, GitHub, LinkedIn, and skill groups.

### 2. Add your projects (`src/lib/data/projects.ts`)

Each project needs a unique `slug`, a `title`, `description`, `tags`, optional `github`/`demo` links, a `status` (`active` | `wip` | `archived`), and a `year`. Set `featured: true` to show the project above the "show more" fold.

### 3. Adjust colors (`src/app.css`)

The entire color theme is driven by CSS custom properties at the top of `app.css`. Change `--accent` to your brand color.

## Build & Deploy

```bash
npm run build       # Production build
npm run preview     # Preview the build locally
npm run check       # TypeScript + Svelte type checking
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

**Internal navigation:** Main nav, project cards, search, and terminal use **`assignAppLocation()` / `navigateInternal()`** (`src/lib/utils/internalNav.ts`) which call SvelteKit **`goto()`** (router-aware navigation) while still respecting **`kit.paths.base`**. Hash links like `/#about-me` still use normal `<a>` behavior.
