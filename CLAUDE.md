# FOS Landing – AI-Native Organizations Sprint

## Tally Form Integration

**Form ID:** `vGMZB0`
**Form:** "запись на продукты AI Mindset" (общая форма для всех продуктов)

### Product Pre-selection

Форма имеет скрытое поле `default_choice`, которое предвыбирает продукт. **ВСЕГДА** передавай `hiddenFields.default_choice` при открытии формы.

### Настройка в Tally (одноразово)

Чтобы pre-selection работал, в Tally form builder нужно:

1. Добавить блок **Hidden Field** с именем `default_choice`
2. В поле "какие продукты тебя интересуют" включить **Default answer**
3. Установить Default answer = `{{default_choice}}`

Код на сайте передаёт `hiddenFields: { default_choice: "AI-native orgs {sprint} / 23 марта / €1490" }` — Tally заполняет hidden field, а checkbox автоматически выбирает совпадающую опцию.

### Хелпер `openTallyForm(product)`

Определён в `App.tsx`. Принимает ключ продукта и открывает popup с правильным `default_choice`.

```tsx
openTallyForm('sprint')  // AI-native orgs sprint
openTallyForm('bundle')  // POS + AI-native bundle
openTallyForm('pos')     // Personal OS sprint
openTallyForm('lab')     // AI Mindset lab
```

### Точные значения default_choice (из Tally)

**НЕ МЕНЯТЬ** – должны точно совпадать с опциями в Tally-форме:

| Ключ | Значение в Tally |
|------|------------------|
| `sprint` | `AI-native orgs {sprint} / 23 марта / €1490` |
| `bundle` | `personal OS + AI-native bundle / €1990` |
| `pos` | `personal OS {sprint} / 2 марта / €890` |
| `lab` | `AI Mindset {lab} / старт 20 апреля / from €590` |

### Правила для новых CTA-кнопок

При добавлении новой кнопки "apply" / "подать заявку":

1. **Использовать `onClick={() => openTallyForm('sprint')}`** – не `data-tally-open`
2. **Выбирать правильный product key** – `'sprint'` для Sprint-кнопок, `'bundle'` для Bundle
3. **НЕ использовать `data-tally-open` атрибуты** – они не поддерживают `hiddenFields`
4. **Если даты или цены изменились в Tally** – обновить `TALLY_PRODUCTS` в App.tsx

### Текущие CTA на сайте

| Место | Product key |
|-------|-------------|
| Nav `/apply` | `sprint` |
| Status card `/apply` | `sprint` |
| Inline CTA (after console) | `sprint` |
| Inline CTA (after results) | `sprint` |
| Pricing Sprint | `sprint` |
| Pricing Bundle | `bundle` |
| Slash Overlay `/apply` | `sprint` |
| Open Channel `/apply` | `sprint` |

## Analytics

### Umami

- **Dashboard:** https://cloud.umami.is (info@aimindset.org)
- **Website ID:** `7fdf2d83-5e45-4917-8df1-84d140b36007`
- **Script:** `<script defer src="https://cloud.umami.is/script.js" data-website-id="7fdf2d83-5e45-4917-8df1-84d140b36007"></script>`
- **API:** `umami.track(event, data)` — вызывается через хелпер `track()` в App.tsx

### Yandex.Metrika

- **Dashboard:** https://metrika.yandex.ru/?id=106857835 (info@aimindset.org)
- **Counter ID:** `106857835`
- **Возможности:** webvisor (записи сессий), clickmap (тепловая карта), accurateTrackBounce
- **API:** `ym(106857835, 'reachGoal', event, data)` — вызывается через тот же хелпер `track()`
- **OAuth app (для API целей):** ClientID `841e15c50bf142a890c11534d32a5e7c` (AIM Metrika)
- **Скрипт создания целей:** `scripts/create-metrika-goals.sh` (нужен `YM_TOKEN`)

### Хелпер `track(event, data)`

Определён в `App.tsx`. Отправляет события **одновременно** в Umami и Яндекс.Метрику.

```tsx
track('apply-click', { product: 'sprint' })
```

### Custom Events (отправляются в обе системы)

| Event | Когда | Data |
|---|---|---|
| `apply-click` | Клик на `/apply` | `{ product: 'sprint' \| 'bundle' }` |
| `scroll-depth` | Скролл страницы | `{ depth: 25 \| 50 \| 75 \| 100 }` |
| `section-view` | Секция видна (30%+ viewport) | `{ section: 'program' \| 'pricing' \| ... }` |
| `terminal-command` | Команда в терминале | `{ command: '/help' \| '/faq' \| ... }` |
| `theme-toggle` | Переключение темы | `{ theme: 'light' \| 'dark' }` |
| `slash-overlay-open` | Нажатие `/` | — |

### Добавление новых событий

1. Использовать `track('event-name', { key: 'value' })`
2. Для Яндекс.Метрики: создать цель через `scripts/create-metrika-goals.sh` или в UI
3. Umami: события появляются автоматически, цели не нужны

## Tech Stack

- React 19 + TypeScript + Vite 7
- Framer Motion (animations)
- Pure CSS (custom properties, no Tailwind utility classes)
- **Production:** https://ai-native.aimindset.org
- **Netlify Site:** bos-sprint (ID: `87814d9b-ca85-42c5-8a31-54d3a207e453`)
- **GitHub:** `ai-mindset-org/fos-landing` (org), `aPoWall/fos-landing` (origin)
- **Deploy:** `npm run build && npx netlify deploy --prod --dir=dist`
