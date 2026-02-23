---
name: web-designer
description: Обновление и редизайн BOS Sprint лендинга. Работа с контентом, дизайном, компонентами.
triggers:
  - "обнови сайт"
  - "измени дизайн"
  - "добавь секцию"
  - "обнови контент"
  - "web designer"
  - "лендинг"
---

# /web-designer — BOS Sprint Landing Page

## Контекст проекта

**Проект:** CyberOS × AI Mindset — BOS Sprint Landing Page
**Путь:** `/Users/alex/Library/CloudStorage/Dropbox/notes/code tools/fos-landing-new/`
**Стек:** Vite + React 19 + TypeScript + Tailwind CSS v4 + Framer Motion
**Дизайн:** белая тональность, JetBrains Mono, терминальная эстетика, lowercase

## Источники контента

**BOS Sprint документы:**
```
/AI mindset {shared}/ai-mindset-2026/Labs/s2 – ai-native sprint/
```
- `{AIM} {deal} BOS Sprint Agreements Gershuni – 2026-02-10` — условия, цены, таймлайн
- `{AIM} {context} Gershuni Course Structure Discussion – 2026-02-08` — структура программы, цитаты
- `{AIM} {offer} BOS Sprint 1-Pager v2.0 – 2026-02-10` — оффер, тарифы

**Презентация Гершуни:**
```
/code tools/w26-at05-gershuni-deck/
```

**Референсы дизайна:**
- https://cybos.ai — CybOS (dark theme, terminal aesthetic, Core Primitives cards)
- https://mickel.tech — Interactive terminal, brackets navigation, CRT effects

## Дизайн-система

### Цвета
```
bg: #fafafa | card: #ffffff | terminal: #0a0a0c
fg: #0a0a0a | muted: #6b6b6b | dim: #a1a1a1
border: #e5e5e5 | accent: #0891b2 | green: #059669
```

### Компоненты
- `<Terminal>` — темный блок с title bar и traffic lights
- `<InteractiveTerminal>` — терминал с вводом команд (/help, /cases, /evals...)
- `<CaseCard>` — карточка кейса с раскрывающимся "подробнее"
- `<QuoteCard>` — карточка цитаты
- `<Reveal>` — scroll animation wrapper (framer-motion)
- `<TLine>` — строка в терминале

### Секции
1. Nav (fixed, backdrop-blur, brackets links)
2. Hero (badge, h1 lowercase, animated terminal, stats)
3. Quotes (6 цитат из Гершуни и Поваляева)
4. The Shift (статистика, output formula terminal)
5. Core Primitives (Context / Agent / Rules cards)
6. Program (3 weeks timeline)
7. Interactive Console (пользователь вводит команды)
8. Self-Assessment (вопросы в терминале)
9. Speakers (2 + 2 secret)
10. Pricing (Base €1,490 / Enterprise custom)
11. CTA
12. Footer

## Инструкции

При обновлении:
1. Читай источники контента для актуальных данных
2. Весь текст на **русском языке**, **lowercase**
3. Сохраняй терминальную эстетику (JetBrains Mono, grid bg, terminal-glow)
4. Используй `<Reveal>` для scroll-анимаций
5. Кейсы делай с раскрывающимися деталями (`<CaseCard detail="..."`)
6. Терминалы с фиксированной высотой, не сдвигают layout
7. После изменений: `npx vite build` для проверки
8. Обнови OG cover если меняется брендинг: `public/og-cover.html`
