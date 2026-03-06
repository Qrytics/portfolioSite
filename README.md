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
