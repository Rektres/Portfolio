# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # Vite dev server (http://localhost:5173)
npm run build      # Production build to dist/
npm run preview    # Preview production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit (React/TS side only)
```

For the static site, just open `index.html` in a browser or use any static file server.

## Architecture: Two Parallel Implementations

This repo contains **two distinct layers** that are mostly independent:

### 1. Static site (primary — what's actually deployed)
- **`index.html`** — the entire portfolio as a single HTML file
- **`styles.css`** — custom CSS (animations, reveal, timeline, dark-mode scrollbar, mobile menu)
- **`main.js`** — vanilla JS module handling: dark mode toggle (`localStorage`), navbar scroll state, active nav link via `IntersectionObserver`, scroll-reveal animations, mobile menu, contact form validation, smooth scroll
- **`assets/CV_Mateo_AranedaMedina.pdf`** — downloadable CV

Tailwind is loaded from CDN inside `index.html` with inline config (dark mode `class`, custom `accent`/`surface` color tokens, `Inter`/`JetBrains Mono` fonts). The npm `tailwindcss` package in `devDependencies` is for the React side, not this file.

### 2. Vite + React + TypeScript scaffold (stub — not yet deployed)
- **`src/App.tsx`** — currently a placeholder
- **`src/main.tsx`** — React entry point
- Dependencies include `@supabase/supabase-js` (unused) and `lucide-react` — likely planned for a future React rewrite or contact form backend

## Key Design Tokens

Accent color: `#00D26A` (green). Dark surfaces: `#0D1117` / `#161B22` / `#21262D`. These are hardcoded in `styles.css` and in the CDN Tailwind config inside `index.html`.

## Contact Form

Currently frontend-only — the submit handler in `main.js` validates inputs and shows a success message but does not send data anywhere. Supabase is installed as a dependency, suggesting a planned backend integration.

## Sections (in order)

`#inicio` → `#sobre-mi` → `#experiencia` → `#proyectos` → `#contacto`

Each section uses `.reveal` class for scroll-triggered fade-in via `IntersectionObserver`.
