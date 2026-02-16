import { useState, useEffect, useRef } from 'react'

const commandList: { cmd: string; desc: string }[] = [
  { cmd: '/help', desc: 'все навыки' },
  { cmd: '/due-diligence', desc: 'AI-аудит компании' },
  { cmd: '/onboarding', desc: 'онбординг сотрудника' },
  { cmd: '/hr-pipeline', desc: 'автоматизация найма' },
  { cmd: '/support', desc: 'саппорт на агентах' },
  { cmd: '/sales', desc: 'квалификация лидов' },
  { cmd: '/marketing', desc: 'контент-пайплайн' },
  { cmd: '/daily-brief', desc: 'утренний бриф' },
  { cmd: '/research', desc: 'глубокий ресёрч' },
  { cmd: '/ontology', desc: 'контекстная карта' },
  { cmd: '/coordination', desc: 'межагентная коммуникация' },
  { cmd: '/apply', desc: 'подать заявку' },
  { cmd: '/about', desc: 'о программе' },
]

const commands: Record<string, string[]> = {
  '/help': [
    'ai-native organizations sprint // навыки агента',
    '',
    'бизнес-процессы:',
    '  /due-diligence     AI-аудит компании',
    '  /onboarding        онбординг сотрудника за 2 часа',
    '  /hr-pipeline       автоматизация найма',
    '  /support           саппорт на агентах 24/7',
    '  /sales             квалификация лидов',
    '  /marketing         контент-пайплайн',
    '',
    'персональные:',
    '  /daily-brief       утренний бриф из всех источников',
    '  /research          глубокий ресёрч за 3 минуты',
    '  /ontology          контекстная карта компании',
    '  /coordination      межагентная коммуникация',
    '',
    'программа:',
    '  /apply             подать заявку на спринт',
    '  /about             о программе',
  ],
  '/due-diligence': [
    '$ skill "due-diligence" --company "target-co"',
    '',
    'подключение MCP серверов...',
    '  [mcp] crunchbase       -> connected',
    '  [mcp] linkedin          -> connected',
    '  [mcp] company-registry  -> connected',
    '  [mcp] news-api          -> connected',
    '',
    'запуск 6 параллельных агентов...',
    '  v финансовый анализ      -> revenue model, unit economics',
    '  v команда                -> 47 сотрудников, 3 ключевых ухода',
    '  v рынок                  -> TAM $2.3B, 12 конкурентов',
    '  v технологии             -> стек, патенты, tech debt',
    '  v репутация              -> 234 упоминания, sentiment 0.72',
    '  v риски                  -> 3 red flags, 2 yellow flags',
    '',
    'отчёт: 28 страниц за 4 минуты',
    'раньше: 2 аналитика, 2 недели, $15k',
    '',
    '-> reports/due-diligence-target-co.md',
  ],
  '/onboarding': [
    '$ skill "onboarding" --employee "новый менеджер"',
    '',
    'создание персонального onboarding-агента...',
    '',
    'день 1:',
    '  -> доступы: jira, slack, notion, crm -- автоматически',
    '  -> welcome pack: структура, культура, ключевые люди',
    '  -> first meeting: подготовлен контекст по команде',
    '',
    'неделя 1:',
    '  -> агент отвечает на вопросы по процессам 24/7',
    '  -> автоматический чеклист: 23 из 30 пунктов закрыто',
    '  -> buddy-система: напоминания, follow-ups',
    '',
    'результат: time-to-productivity 2 недели вместо 2 месяцев',
    'HR-менеджеру: 6 часов вместо 40 часов на человека',
  ],
  '/hr-pipeline': [
    '$ skill "hr-pipeline" --role "product manager"',
    '',
    'текущий flow (ручной):',
    '  резюме -> HR читает -> интервью -> решение',
    '  среднее время: 3 недели на кандидата',
    '',
    'ai-native flow:',
    '  [1] скрининг          -> 200 резюме за 2 минуты',
    '  [2] pre-qualification -> автоматический опросник',
    '  [3] scoring           -> fit по 12 критериям',
    '  [4] scheduling        -> автоматическая запись на интервью',
    '',
    'результат:',
    '  200 резюме -> 12 кандидатов -> 4 интервью',
    '  время: 15 минут вместо 3 недель',
    '  человеку: провести 4 финальных интервью',
  ],
  '/support': [
    '$ skill "support-automation" --mode "production"',
    '',
    'агент обрабатывает входящие...',
    '',
    'за последние 24 часа:',
    '  входящих: 156 тикетов',
    '  автоматически решено: 119 (76%)',
    '  эскалация к человеку: 37 (24%)',
    '',
    'категории:',
    '  FAQ / how-to       -> 89 (авто-ответ + ссылка на docs)',
    '  баг-репорты        -> 23 (триаж + jira + уведомление dev)',
    '  billing            -> 18 (проверка + решение)',
    '  сложные кейсы      -> 26 (контекст + draft + эскалация)',
    '',
    'CSAT: 4.6/5 (vs 4.1 до автоматизации)',
    'среднее время ответа: 12 секунд',
  ],
  '/sales': [
    '$ skill "lead-qualification" --source "inbound"',
    '',
    'новых лидов за сутки: 23',
    '',
    'автоматическая квалификация:',
    '  A-tier (ready to close)  -> 3 лида',
    '  B-tier (nurture)         -> 8 лидов',
    '  C-tier (not fit)         -> 12 лидов',
    '',
    'A-tier: draft ответов готов',
    'B-tier: добавлены в nurture-цепочку',
    '',
    'человеку: approve 3 ответа, остальное -- автомат',
  ],
  '/marketing': [
    '$ skill "content-pipeline" --channel "all"',
    '',
    'запуск контент-пайплайна...',
    '  [1] аналитика     -> топ-10 тем по engagement за неделю',
    '  [2] генерация     -> 5 постов, 3 рассылки, 1 лонгрид',
    '  [3] адаптация     -> telegram, linkedin, email -- автоформат',
    '  [4] расписание    -> оптимальное время публикации',
    '',
    'время: 4 минуты вместо 2 дней',
    'контент готов к ревью -> drafts/week-07/',
  ],
  '/daily-brief': [
    '$ skill "daily-brief" --run',
    '',
    'подключение MCP серверов...',
    '  [mcp] google-calendar    -> connected (3 events today)',
    '  [mcp] gmail              -> connected (47 unread)',
    '  [mcp] telegram           -> connected (12 chats active)',
    '  [mcp] linear             -> connected (sprint: week 2)',
    '  [mcp] notion             -> connected (workspace synced)',
    '',
    'агент сканирует источники...',
    '',
    'приоритеты дня:',
    '  1. product sync в 10:00 (zoom) -- подготовить OKR update',
    '  2. 2 срочных треда: партнёр ждёт ответ, клиент escalation',
    '  3. дедлайн спринта: пятница, 3 задачи open',
    '',
    'рекомендации:',
    '  -> перенести обед с 12:00 на 13:00 (конфликт с sync)',
    '  -> draft ответ партнёру готов, approve?',
    '  -> escalation: агент подготовил context summary',
    '',
    'бриф сохранён -> daily/2026-02-15.md',
    'время выполнения: 8 секунд',
  ],
  '/research': [
    '$ skill "deep-research" --topic "market analysis"',
    '',
    'запуск 4 параллельных агентов...',
    '  v конкурентный ландшафт    -> 34 компании',
    '  v тренды рынка             -> 18 отчётов за Q1',
    '  v клиентские инсайты       -> 230 отзывов',
    '  v ценообразование          -> 12 benchmarks',
    '',
    'результат: 3 минуты вместо 3 дней',
  ],
  '/ontology': [
    '$ ontology --map "company-context"',
    '',
    'сканирование источников...',
    '',
    'сущности найдены:',
    '  контакты     -> 847 (crm + telegram + email)',
    '  сделки       -> 124 (pipeline + closed)',
    '  процессы     -> 31 (повторяющихся)',
    '  знания       -> 2,340 документов',
    '',
    'связи построены: 4,891 ребро',
    'контекстный граф доступен агентам',
    '',
    '-> agents теперь видят всю компанию',
  ],
  '/coordination': [
    '$ orchestrate --demo "inter-agent-communication"',
    '',
    'маркетинг-агент:',
    '  "фича x готова, включаю в кампанию"',
    '',
    'продуктовый-агент:',
    '  "ок, вот changelog и скриншоты"',
    '',
    'sales-агент:',
    '  "3 лида ждут эту фичу, отправляю апдейт"',
    '',
    'межагентная коммуникация 24/7',
    'обмен знаниями между отделами',
    '',
    '-> output = people * skill * time * ai_leverage^n',
  ],
  '/apply': [
    'открываю форму заявки...',
    '',
    'AI-Native Organizations Sprint',
    'старт: 23 марта 2026. 3 недели.',
    'программа для руководителей, менеджеров и профессионалов.',
  ],
  '/about': [
    'ai mindset x cybos',
    'ai-native organizations sprint',
    '',
    '10+ когорт. 700+ выпускников.',
    'от персональных ai-навыков',
    'до трансформации компании.',
    '',
    '70% -- люди и процессы',
    '30% -- софт',
    '',
    'не курс по промптингу.',
    'архитектура ai-native организации.',
    '',
    'агенты -- не инструменты.',
    'они -- новая команда.',
  ],
}

function ClickableOutput({ text, onCommand }: { text: string; onCommand: (cmd: string) => void }) {
  const parts = text.split(/(\/[a-z-]+)/g)
  if (parts.length === 1) return <span>{text}</span>
  return (
    <span>
      {parts.map((part, i) => {
        if (/^\/[a-z-]+$/.test(part) && commands[part]) {
          return (
            <span
              key={i}
              className="terminal-cmd-link"
              onClick={() => onCommand(part)}
            >
              {part}
            </span>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

export function InteractiveTerminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{ type: 'cmd' | 'out'; text: string }[]>([
    { type: 'out', text: 'ai-native organizations sprint // console' },
    { type: 'out', text: 'введите /help для списка навыков' },
  ])
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const [suggestions, setSuggestions] = useState<typeof commandList>([])
  const [activeIdx, setActiveIdx] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const hasAutoSlashed = useRef(false)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [history])

  useEffect(() => {
    if (input.startsWith('/') && input.length > 1) {
      const filtered = commandList.filter(c => c.cmd.startsWith(input.toLowerCase()))
      setSuggestions(filtered)
      setActiveIdx(0)
    } else if (input === '/') {
      setSuggestions(commandList)
      setActiveIdx(0)
    } else {
      setSuggestions([])
    }
  }, [input])

  // auto-type "/" then "/help" and execute on scroll into view
  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoSlashed.current) {
          hasAutoSlashed.current = true
          setInput('/')
          inputRef.current?.focus()
          setTimeout(() => {
            setInput('/hel')
            setTimeout(() => {
              setInput('/help')
              setTimeout(() => {
                setInput('')
                setSuggestions([])
                setHistory(prev => [...prev, { type: 'cmd', text: '/help' }])
                if (commands['/help']) {
                  commands['/help'].forEach((line, i) => {
                    setTimeout(() => {
                      setHistory(prev => [...prev, { type: 'out', text: line }])
                    }, i * 100)
                  })
                }
              }, 400)
            }, 500)
          }, 800)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const execute = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()
    if (!trimmed) return

    setHistory(prev => [...prev, { type: 'cmd', text: cmd }])
    setCmdHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)
    setSuggestions([])

    if (trimmed === 'clear') {
      setHistory([
        { type: 'out', text: 'ai-native organizations sprint // console' },
        { type: 'out', text: 'введите /help для списка навыков' },
      ])
      setInput('')
      return
    }

    if (commands[trimmed]) {
      commands[trimmed].forEach((line, i) => {
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'out', text: line }])
        }, i * 100)
      })
      // Open Tally popup for /apply
      if (trimmed === '/apply') {
        setTimeout(() => {
          const w = window as any
          if (w.Tally) w.Tally.openPopup('vGMZB0', {
            layout: 'modal',
            width: 600,
            hideTitle: true,
            overlay: true,
            emoji: { text: '/apply', animation: 'flash' },
            hiddenFields: {
              default_choice: 'AI-native orgs {sprint} / 23 марта / €1490',
              utm_source: 'bos-sprint-landing',
            },
          })
        }, 400)
      }
    } else if (trimmed) {
      setHistory(prev => [
        ...prev,
        { type: 'out', text: `команда не найдена: ${trimmed}` },
        { type: 'out', text: 'введите /help для списка навыков' },
      ])
    }
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (suggestions.length > 0) {
      if (e.key === 'Tab') {
        e.preventDefault()
        setInput(suggestions[activeIdx].cmd)
        setSuggestions([])
        return
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const trimmed = input.trim().toLowerCase()
        // if input exactly matches a command, execute it directly
        if (commands[trimmed]) {
          execute(input)
        } else {
          // fill in active suggestion and execute
          const selectedCmd = suggestions[activeIdx].cmd
          execute(selectedCmd)
        }
        return
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActiveIdx(prev => Math.max(0, prev - 1))
        return
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActiveIdx(prev => Math.min(suggestions.length - 1, prev + 1))
        return
      }
      if (e.key === 'Escape') {
        setSuggestions([])
        return
      }
    }

    if (e.key === 'Enter') {
      execute(input)
    } else if (e.key === 'ArrowUp' && suggestions.length === 0) {
      e.preventDefault()
      if (cmdHistory.length > 0) {
        const next = Math.min(historyIndex + 1, cmdHistory.length - 1)
        setHistoryIndex(next)
        setInput(cmdHistory[next])
      }
    } else if (e.key === 'ArrowDown' && suggestions.length === 0) {
      e.preventDefault()
      if (historyIndex > 0) {
        const next = historyIndex - 1
        setHistoryIndex(next)
        setInput(cmdHistory[next])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div ref={containerRef} className="terminal interactive-terminal terminal-scanlines">
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">ai-native ~ console</span>
        <span className="terminal-title-right">root@aim:~</span>
      </div>
      <div ref={scrollRef} className="interactive-terminal-body">
        {history.map((line, i) => (
          <div key={i} className={`interactive-line ${line.type === 'cmd' ? 'interactive-line--cmd' : 'interactive-line--out'}`}>
            {line.type === 'cmd' ? (
              <span><span className="terminal-prompt">$</span> {line.text}</span>
            ) : (
              <ClickableOutput text={line.text} onCommand={execute} />
            )}
          </div>
        ))}
        <div className="interactive-input-row interactive-input-row--centered">
          {suggestions.length > 0 && (
            <div className="slash-suggestions">
              {suggestions.map((s, i) => (
                <div
                  key={s.cmd}
                  className={`slash-suggestion ${i === activeIdx ? 'active' : ''}`}
                  onMouseEnter={() => setActiveIdx(i)}
                  onClick={() => { execute(s.cmd); inputRef.current?.focus() }}
                >
                  <span className="slash-suggestion-cmd">{s.cmd}</span>
                  <span className="slash-suggestion-desc">{s.desc}</span>
                </div>
              ))}
            </div>
          )}
          <span className="terminal-prompt">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="type / to explore..."
            className="interactive-input"
          />
          <span className="interactive-cursor" />
        </div>
      </div>
    </div>
  )
}
