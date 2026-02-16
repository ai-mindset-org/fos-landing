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

## Tech Stack

- React 19 + TypeScript + Vite 7
- Framer Motion (animations)
- Pure CSS (custom properties, no Tailwind utility classes)
- Netlify deploy: https://bos-sprint.netlify.app/
