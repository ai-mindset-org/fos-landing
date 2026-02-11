# FOS Landing — Handoff Context

## Project
- **Path**: `/Users/alex/Library/CloudStorage/Dropbox/notes/code tools/fos-landing/`
- **Stack**: React 19 + Vite 7 + Framer Motion (Tailwind REMOVED)
- **Dev server**: `npx vite --port 3000`
- **Product name**: CyberOS x AI Mindset — BOS Sprint

## Current state
- Dark terminal theme applied (CSS custom properties in index.css)
- All React components working: Reveal, Terminal, TLine, InteractiveTerminal, HeroTerminal, CaseCard (expandable), QuoteCard
- Content in Russian, branding: CyberOS
- Speaker photos in `/public/speakers/`

## TODO (from user feedback)
1. **Switch to WHITE/LIGHT theme** — user prefers white background like the original old HTML version. Dark is nice but white is default
2. **Font: IBM Plex Mono** — return to IBM Plex Mono instead of JetBrains Mono. "Classical font, fits better"
3. **Square bracket nav** — like mickel.tech: `[ПРОГРАММА]` `[СПИКЕРЫ]` `[КОНСОЛЬ]` `[ЦЕНЫ]`
4. **More spacing** — terminals need more padding, overall more "air" between elements
5. **Fewer quotes** — reduce quote blocks (currently 6, make 3-4 max)
6. **"Workshop expert" in Russian** — translate secret speaker placeholders to Russian
7. **Terminal styling** — reference manifest.aimindset.org for cleaner, more laconic terminal style in white theme
8. **Glow effects** — keep subtle glow on terminals even in white theme
9. **Content**: reference BOS sprint docs at `/Users/alex/Library/CloudStorage/Dropbox/notes/AI mindset {shared}/ai-mindset-2026/Labs/s2 – BOS sprint/`

## Reference sites
- **mickel.tech** — nav with [BRACKETS], terminal aesthetic, dark theme benchmark
- **cybos.ai** — CybOS product, terminal UI, Core Primitives (CONTEXT, AGENT, RULES)
- **manifest.aimindset.org** — AI Mindset manifesto, terminal styling reference, white-friendly

## Key files
- `src/index.css` — all CSS (custom properties, no Tailwind)
- `src/App.tsx` — single-file React app with all components
- `index.html` — entry point with meta tags
- `vite.config.ts` — Vite config (react plugin only)

## Content source
- 1-Pager: `{AIM} {offer} BOS Sprint 1-Pager v2.0`
- Program: `{sprint} {BOS} Business Operation System Program v1.0`
- Agreements: `{AIM} {deal} BOS Sprint Agreements Gershuni`
- All in: `/AI mindset {shared}/ai-mindset-2026/Labs/s2 – BOS sprint/`
