# FOS Landing v3.0 — Redesign Plan

> **Goal:** Terminal-first redesign inspired by mickel.tech. Cleaner, more interactive, mobile-ready.
> **Reference:** https://mickel.tech — dark terminal aesthetic, system map, glitch effects, [BRACKET] nav
> **Stack:** React 19 + Vite 7 + Framer Motion + CSS custom properties (no Tailwind)
> **Deadline context:** BOS landing needed by 14 Feb

---

## Step 0: Font & Design Token Update

**Files:** `index.html`, `src/index.css`

- Replace `JetBrains Mono` with `IBM Plex Mono` (per HANDOFF preference + classic feel)
- Keep `Space Grotesk` as body font
- Update Google Fonts link in `index.html`
- Keep dark hero but refine overall dark-light hybrid:
  - Hero = dark (current, keep)
  - Sections below = light with terminal accents (current approach but refined)
  - Footer = dark terminal block (new)

---

## Step 1: Hero Redesign — Glitch + Terminal Status Card

**Files:** `src/App.tsx`, `src/index.css`, new `src/components/GlitchText.tsx`

**What changes:**
- Add subtle **CSS glitch effect** on the h1 (like mickel.tech) — `clip-path` + `transform` animation on hover/load
- Add a **"System Status" card** in hero (right side on desktop, below on mobile) inspired by mickel.tech:
  ```
  ┌─ SYSTEM STATUS ──────── ● ONLINE
  │ PROGRAM: BOS SPRINT v2.0
  │ STATUS: ENROLLING
  │ START: 23 MARCH 2026
  │ SLOTS: OPEN
  │ FOCUS PROTOCOLS:
  │   [PERSONAL OS] [BUSINESS OS] [COMPANY FUNCTIONS]
  └──────────────────────────
  ```
- Hero layout: **two-column** on desktop (text left, status card right)
- Remove HeroTerminal animation block from hero (too much decoration per Gershuni feedback)
- Keep stats bar but simplify (remove "~6ч / в неделю" — redundant)

**New component:** `GlitchText` — CSS-only glitch on text, no JS overhead

---

## Step 2: Navigation — Status Bar Style

**Files:** `src/App.tsx`, `src/index.css`

**What changes:**
- Add **status indicator** left: `● ONLINE` + `SYSTEM_ID: AIM_BOS_V2.0` (like mickel.tech top bar)
- Nav links as uppercase mono `[ПРОГРАММА]` `[СПИКЕРЫ]` `[КОНСОЛЬ]` `[ЦЕНЫ]` (already done, keep)
- On mobile: hamburger stays, but nav dropdown gets dark terminal styling
- Add logo_light.png usage (file exists in `/public/logo_light.png`)

---

## Step 3: Program Section — Proper Spacing + Content Update

**Files:** `src/App.tsx`, `src/index.css`

**What changes:**

### 3a. Content update from Program v2.0:
- Week 1: "Personal OS + Skills" (23–28 March)
  - POS pre-recordings as prep (mention explicitly)
  - Deliverable: Working Personal OS + prioritized list of 10 company processes
- Week 2: "Business OS + Agent Infrastructure" (30 Mar – 4 Apr)
  - Deliverable: Company ontology + data model + 2 working skills
- Week 3: "Company Functions + Guest Speakers" (6–11 Apr)
  - Deliverable: Automated process + AI Champion plan + 90-day Roadmap
  - Demo Day: Sat 11 Apr

### 3b. Visual redesign:
- **Reduce quotes to 3** (one per week, keep the best)
- **Case cards:** show title + label only; expand description on hover/click (less stretched)
- **Week headers:** larger, bolder week numbers, smaller descriptions
- **Stack labels:** keep but dim (already good)
- **Timeline line:** keep vertical line with cyan dots (good pattern)
- Add more vertical spacing between weeks (currently `margin-bottom: 100px`, increase to 120px)
- **Week label format:** `01 // PERSONAL OS + SKILLS` (number prominent)

### 3c. Progression diagram (new):
Add a compact visual progression bar:
```
POS recordings → Week 1: Identity → Week 2: Architecture → Week 3: Process → Demo Day
```
Simple horizontal flow with dots/lines, terminal-styled

---

## Step 4: Calendar Schedule — Compact + Hover

**Files:** `src/components/CalendarSchedule.tsx`, `src/index.css`

**What changes:**
- **Remove week detail text blocks** below calendar (too many labels, too stretched)
- **Show event details on hover only** (tooltip already exists — make it the primary interaction)
- **On click** — show a slim detail row below calendar (keep, but simplify)
- **Remove week filter buttons** from top (or collapse into a single "filter" row)
- Calendar grid cells: slightly larger, cleaner look
- Legend: move inline or make smaller
- Overall: more compact, less vertical space

---

## Step 5: Interactive Terminal — Clickable Commands

**Files:** `src/components/InteractiveTerminal.tsx`, `src/index.css`

**What changes:**
- **Output lines with `/command` references become clickable:**
  - When `/help` outputs the command list, each `/command` is a clickable element
  - Clicking executes that command (already works via suggestion click — extend to output)
- **Output formatting:**
  - After running a command, make any `/command` in output text clickable too
  - Add `cursor: pointer` and cyan underline on hover
- **Visual polish:**
  - Wider terminal (remove `max-width: 800px`, use container width)
  - Taller default view (increase from 520px to 600px)
  - Add subtle CRT scanline effect (already has `.terminal-scanlines`)

---

## Step 6: Speaker Cards — Terminal Aesthetic

**Files:** `src/App.tsx`, `src/index.css`, `src/components/VisualMetaphors.tsx`

**What changes:**

### 6a. Main speakers (Stepan + Alex):
- **Dark card background** (not white) — `rgba(10, 10, 12, 0.95)` with terminal border
- Photo stays but with **scanline overlay** or subtle filter
- Info text in terminal mono font
- Links styled as terminal commands: `> github` `> telegram`
- Semi-transparent border with cyan glow on hover
- Less structured layout — more "dossier" feel

### 6b. Secret speakers (4 expert slots):
- **Glass-morphism cards** — `backdrop-filter: blur(10px)` + semi-transparent background
- Remove explicit SpeakerSilhouette SVG — use terminal `[?]` or ASCII art instead
- Show domain label only: `// ai-agents`, `// marketing`, `// operations`, `// product`
- Hover: reveal description text
- Less padding, more compact

---

## Step 7: System Map Section (NEW)

**Files:** `src/App.tsx`, `src/index.css`, new `src/components/SystemMap.tsx`

**Inspired by:** mickel.tech `#map` — node graph with diamond connectors

**What to build:**
- Section between Program and Console
- **Title:** `// system map` → "Карта трансформации"
- Visual flow of the BOS journey:
  ```
       ┌──────────────────────┐
       │ POS PRE-RECORDINGS   │
       │ Базовый AI-стек      │
       └──────────┬───────────┘
                  ◇
       ┌──────────┴───────────┐
       │ WEEK 1: PERSONAL OS  │
       │ Identity + Skills    │
       └──────────┬───────────┘
                  ◇
    ┌─────────────┼─────────────┐
    │             │             │
  ◇ ◇           ◇ ◇          ◇ ◇
┌──────┐   ┌──────────┐   ┌──────┐
│WEEK 2│   │WEEK 3    │   │DEMO  │
│BizOS │   │Functions │   │ DAY  │
└──────┘   └──────────┘   └──────┘
  ```
- Nodes are dark cards with cyan borders
- Diamond connectors between nodes (like mickel.tech)
- CSS-only (no canvas/SVG library — just flexbox + borders)
- Mobile: vertical stack

---

## Step 8: Pricing — Add Bundle Card

**Files:** `src/App.tsx`, `src/index.css`

**What changes:**
- **3-column pricing grid** (not 2):
  1. **POS Sprint** — €890 (2 weeks, personal OS)
  2. **BOS Sprint** — €1,490 (3 weeks, business transformation) — `featured`
  3. **Bundle POS + BOS** — €1,990 (both tracks, save €390) — upsell highlight

- Bundle card styling:
  - Gradient border or special "BEST VALUE" badge
  - Strike-through original combined price (€2,380) → **€1,990**
  - "save €390" in green badge

- Keep Early Bird note (-15% until 9 March)
- Keep referral note (15% commission)
- Keep Enterprise "custom" option as a note below grid (not separate card)

---

## Step 9: Footer Redesign — Clean Terminal

**Files:** `src/App.tsx`, `src/index.css`

**What changes:**
- **Dark background** footer (like nav, `rgba(2, 6, 24, 0.95)`)
- Two-column layout:
  - Left: `AI Mindset × CyberOS` + copyright + year
  - Right: links in terminal style
- Links as `[TELEGRAM]` `[EMAIL]` `[GITHUB]` (bracket style)
- Remove "СВЯЗАТЬСЯ" button (redundant — Open Channel section is above)
- Single row, minimal, no multi-row stacking
- Mobile: stack vertically, centered

---

## Step 10: Open Channel Terminal — Refine

**Files:** `src/App.tsx`

**What changes:**
- Keep but **simplify title** — just `// open channel` without the giant h2
- Terminal works well, keep auto-help animation
- Make terminal full-width (within container)
- Add `/bundle` command → outputs POS+BOS bundle info

---

## Step 11: Mobile Responsive Pass

**Files:** `src/index.css`

**What to check/fix:**
- Hero two-column → single column stack on mobile
- System Map → vertical flow
- Pricing 3-column → single column stack
- Calendar → ensure tooltip doesn't overflow viewport
- Speaker dark cards → full width
- Secret speakers 4-col → 2-col on tablet, 1-col on mobile
- Navigation status bar — hide `SYSTEM_ID` on mobile, keep `● ONLINE`
- Footer — centered single column
- All terminals — ensure horizontal scroll doesn't appear
- Test at 375px (iPhone SE), 390px (iPhone 14), 768px (iPad)

---

## Step 12: Content & Copy Polish

**Files:** `src/App.tsx`, `src/components/InteractiveTerminal.tsx`

- Update program name references: "AI-Centric Companies Sprint" (not "Business Operation System")
- Ensure all quotes are in Russian
- Calendar legend labels → Russian: "Лекция", "Воркшоп", "Практика", "Office Hours", "Demo Day"
- Interactive terminal: update `/about` command text to reflect AI-centric naming
- Verify all dates match Program v2.0 (23 Mar – 11 Apr)
- Bundle pricing in `/apply` command output

---

## Execution Order

| # | Step | Priority | Est. complexity |
|---|------|----------|----------------|
| 0 | Font swap | quick | low |
| 1 | Hero redesign | high | medium |
| 2 | Nav status bar | medium | low |
| 3 | Program content + spacing | high | medium |
| 4 | Calendar compact | medium | medium |
| 5 | Interactive terminal clickable | medium | low |
| 6 | Speaker cards terminal style | high | medium |
| 7 | System Map (new) | high | high |
| 8 | Pricing + bundle | high | low |
| 9 | Footer redesign | medium | low |
| 10 | Open Channel refine | low | low |
| 11 | Mobile pass | high | medium |
| 12 | Content polish | medium | low |

**Recommended flow:** 0 → 1 → 2 → 9 → 3 → 8 → 6 → 7 → 4 → 5 → 10 → 12 → 11

---

## Files Modified

| File | Changes |
|------|---------|
| `index.html` | Font swap to IBM Plex Mono |
| `src/index.css` | Major CSS updates (all steps) |
| `src/App.tsx` | Layout restructure, new sections, content updates |
| `src/components/CalendarSchedule.tsx` | Compact mode, hover-first |
| `src/components/InteractiveTerminal.tsx` | Clickable commands in output |
| `src/components/HeroTerminal.tsx` | May remove or simplify |
| `src/components/GlitchText.tsx` | **NEW** — CSS glitch text effect |
| `src/components/SystemMap.tsx` | **NEW** — transformation map |

---

## Design Reference Summary

From **mickel.tech:**
- `● ONLINE` + `SYSTEM_ID` in nav
- `[BRACKET]` nav links
- Dark bg: `#0a0a0a` / `#0d1117`
- Cyan accent: `#00d9ff`
- System Map with diamond `◇` connectors
- Glitch text effect on hero
- Mono font throughout (IBM Plex Mono)
- Status card in hero

From **Gershuni feedback (11 Feb):**
- Remove decorative elements that carry no meaning
- Simple text, maximum clarity
- For corporate audience — no jargon
- "AI-centric companies" naming (not BOS/ERP)
