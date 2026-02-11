# BOS Skills Pack
## AI Mindset x CyberOS -- Business Operation System Sprint

---

## Quick Start

1. Установите Claude Code: `npm install -g @anthropic-ai/claude-code`
2. Создайте CLAUDE.md в корне рабочей директории
3. Добавьте навыки из этого пакета
4. Запустите: `claude` и введите `/help`

---

## CLAUDE.md Template

```markdown
# Context

## Role
[Ваша роль: CEO / CTO / COO / Founder]

## Company
[Название компании, размер команды, индустрия]

## Priorities
- [Приоритет 1]
- [Приоритет 2]
- [Приоритет 3]

## Communication Style
- Лаконично, без воды
- Конкретные действия, не абстрактные советы
- Русский язык по умолчанию

## Decision Framework
- ROI > 100% за первый квартал
- Автоматизация > найм
- Data-driven решения
```

---

## Example Skills

### /daily-brief
Утренняя сводка: календарь, почта, telegram, приоритеты.

```markdown
# /daily-brief

источники: calendar, gmail, telegram, linear
формат: actionable next steps

1. Собери события на сегодня из calendar
2. Проверь непрочитанные в telegram (топ-5 по важности)
3. Проверь email (срочные + от ключевых контактов)
4. Сформируй 3 главных приоритета дня
5. Предложи оптимальное расписание
```

### /research
Глубокий ресёрч по теме или компании за 3 минуты.

```markdown
# /research [topic]

1. Определи ключевые вопросы по теме
2. Найди 10+ релевантных источников
3. Синтезируй ключевые инсайты
4. Сформируй executive summary (5-7 пунктов)
5. Укажи gaps и рекомендации для следующих шагов
```

### /dd
Auto Due Diligence -- полная карточка компании.

```markdown
# /dd [company]

Запусти 4 параллельных анализа:
1. Финансы: P&L, unit economics, runway
2. Рынок: TAM/SAM/SOM, конкуренция, тренды
3. Тезис: fit с портфелем, синергии, риски
4. Команда: профили, трекрекорд, culture fit

Формат: структурированная карточка сделки
```

---

## Eval Rubric Summary

Каждый ответ AI проходит три проверки. Binary pass/fail.

| Area | Criteria |
|------|----------|
| **T (Text)** | структура, ясность, инсайты, actionable |
| **R (Rules)** | naming convention, папки, форматирование |
| **C (Code)** | работает, минимализм, идиоматичность |

Формат: `eval: T:pass R:pass C:n/a`

---

## Links

- Telegram: t.me/alex_named
- Community: t.me/aim_community
- Website: aimindset.org
- Email: team@aimindset.co

---

(c) 2026 AI Mindset x CyberOS. BOS Sprint.
