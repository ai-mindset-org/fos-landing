# FOS Landing — Handoff v7 (2026-02-13)

## Проект
- **URL:** https://bos-sprint.netlify.app
- **Путь:** `/Users/alex/Library/CloudStorage/Dropbox/notes/code tools/fos-landing/`
- **Stack:** React 19 + Vite 7 + Framer Motion + TypeScript 5.9
- **Font:** IBM Plex Mono
- **Deploy:** `npm run build && npx netlify deploy --prod --dir=dist`
- **Netlify Site ID:** `87814d9b-ca85-42c5-8a31-54d3a207e453`
- **Git:** `origin` → aPoWall/fos-landing, `org` → ai-mindset-org/fos-landing

## Источники программы
- `{sprint} {BOS} Program v3.0 – 2026-02-13 – Claude Code.md` (ai-mindset-2026/Labs/s2 – BOS sprint/)
- `{AIM} {offer} BOS Sprint 1-Pager v4.0 – 2026-02-13 – Claude Code.md` (same dir)

## Что сделано (v8 — текущая сессия, NOT committed)

### v6 (предыдущая сессия)
- Week 1-3 контент по v3.0
- Фокус-сессии (Tue 12:00 CET) в CalendarSchedule
- ScrollSpy: left side, dots only
- Nav: minimal (brand + /apply + theme toggle)
- Weeks: big "01/02/03" numbers + title left, SVG metaphor right

### v7
- Отзывы → карточки (3x2 grid), featured с синей подсветкой
- SVG метафоры на light theme — CSS variable override
- Прайсинг — featured карточка: 2px border, glow, синий price amount
- Bundle naming → "AI-Centric Companies"

### v8 (текущая сессия)
- [x] **Название** — всё переименовано в "AI-Native Organizations Sprint" (hero badge, status card, pricing, terminal, bundle)
- [x] **Путь + Календарь** — объединены в одну секцию (#map), side-by-side grid: SystemMap слева, CalendarSchedule справа
- [x] **ScrollSpy labels** — теперь показываются на hover/active (positioned absolute left:24px)
- [x] **Спикеры** — компактные terminal-card: маленький аватар (56px), одна строка bio, 2 колонки
- [x] **Отзывы** — alternating backgrounds (even cards чуть ярче)
- [x] **Неделя spacing** — margin-bottom 200px → 80px
- [x] **Case cards** — metallic grain texture (fractalNoise SVG overlay)
- [x] **Open Channel terminal** — усиленная глубина (border, shadow, background)
- [x] **Theme toggle** — переместили в bottom-right, circular (32px), subtle
- [x] **Nav logo** — logo_light.png появляется на scroll (>200px), invert для light theme

### Файлы изменены
| Файл | Что |
|------|-----|
| `src/App.tsx` | Path+Calendar merge, compact speakers, NavLogo, theme toggle icon, AI-Native naming |
| `src/index.css` | ScrollSpy labels, week spacing, alternating testimonials, grain texture, theme toggle, speakers, terminal depth, nav logo, path-schedule grid |

## TODO (оставшиеся)

### Высокий приоритет
1. [ ] **Мобильная версия** — полная проверка на телефоне
2. [ ] **Git commit + push** — все изменения не закоммичены!

### Средний приоритет
3. [ ] **OG-image** — web-cover.png
4. [ ] **CI/CD** — Netlify ← GitHub ai-mindset-org/fos-landing

## Ресерч (собран, не использован полностью)
Агент собрал 8 реальных AI бизнес-кейсов с метриками:
- IBM AskHR (80+ tasks automated, 94% containment)
- Klarna AI (2.3M chats/month, work of 700 agents)
- JPMorgan Coach AI (95% faster info retrieval)
- BASF multi-agent (11K employees, 70+ sites)
- Stats: 78% companies adopted AI, only 6% "high performers"

## Prompt
```
Продолжи fos-landing v7 (bos-sprint.netlify.app).
Путь: /Users/alex/Library/CloudStorage/Dropbox/notes/code tools/fos-landing/
Deploy: npm run build && npx netlify deploy --prod --dir=dist
Прочитай CONTEXT-HANDOFF.md.

ПРИОРИТЕТ:
1. Объединить путь участника + календарь
2. Мобильная версия
3. Terminal ярче
4. OG-image
5. Git commit + push
```
