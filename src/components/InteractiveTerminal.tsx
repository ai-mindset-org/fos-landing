import { useState, useEffect, useRef } from 'react'

const commandList: { cmd: string; desc: string }[] = [
  { cmd: '/help', desc: 'все навыки' },
  { cmd: '/daily-brief', desc: 'утренний бриф' },
  { cmd: '/research', desc: 'глубокий ресёрч' },
  { cmd: '/draft', desc: 'черновик документа' },
  { cmd: '/calendar', desc: 'расписание' },
  { cmd: '/dd', desc: 'auto due diligence' },
  { cmd: '/ontology', desc: 'контекстная карта' },
  { cmd: '/automate', desc: 'автоматизация' },
  { cmd: '/stack', desc: 'текущий стек' },
  { cmd: '/mckinsey', desc: 'почему консалтинг умирает' },
  { cmd: '/transform', desc: 'ai-readiness check' },
  { cmd: '/agents', desc: 'микро-переговоры' },
  { cmd: '/apply', desc: 'подать заявку' },
  { cmd: '/about', desc: 'о программе' },
]

const commands: Record<string, string[]> = {
  '/help': [
    'ai-native organizations sprint',
    '',
    'навыки:',
    '  /daily-brief      утренний бриф',
    '  /research          глубокий ресёрч за 3 минуты',
    '  /draft             черновик документа',
    '  /calendar          расписание на сегодня',
    '  /dd                auto due diligence',
    '  /ontology          контекстная карта компании',
    '  /automate          автоматизация процесса',
    '  /stack             текущий стек',
    '  /mckinsey          почему консалтинг умирает',
    '  /transform         ai-readiness check',
    '  /agents            микро-переговоры агентов',
    '  /apply             подать заявку',
    '  /about             о программе',
  ],
  '/daily-brief': [
    '$ skill "daily-brief" --run',
    '',
    'источники: calendar, gmail, telegram, linear',
    'сканирую 47 непрочитанных...',
    '',
    '-> 3 встречи сегодня (первая: 10:00 product sync)',
    '-> 2 срочных треда в telegram',
    '-> дедлайн спринта: пятница',
    '',
    'бриф сохранён -> daily/2026-02-10.md',
  ],
  '/research': [
    '$ skill "deep-research" --company "target"',
    '',
    'запуск 4 параллельных агентов...',
    '  v финансовый анализ     -> 47 источников',
    '  v рыночное позиционирование -> 23 отчёта',
    '  v инвестиционный тезис  -> синтезировано',
    '  v оценка команды        -> 12 профилей',
    '',
    'результат: 3 минуты вместо 3 дней',
  ],
  '/draft': [
    '$ skill "draft" --type "proposal"',
    '',
    'загрузка контекста: claude.md + онтология компании',
    '',
    '-> intro (identity-first позиционирование)',
    '-> проблема (70% компаний застряли)',
    '-> решение (3 недели трансформации)',
    '-> доказательства (кейсы: vc, legal, agency)',
    '',
    'черновик готов -> review before send',
  ],
  '/calendar': [
    '$ calendar --today',
    '',
    '10:00  product sync (zoom)',
    '12:00  обед с инвестором',
    '14:00  подготовка ai-native sprint',
    '16:00  office hours',
    '',
    'свободные слоты: 11:00-12:00, 15:00-16:00',
  ],
  '/dd': [
    '$ skill "due-diligence" --target "series-b-fintech"',
    '',
    'zoom-транскрипт загружен. запуск 4 агентов:',
    '  [1] финансы       -> ARR $4.2M, burn rate, runway 18mo',
    '  [2] рынок         -> tam $12B, 3 прямых конкурента',
    '  [3] тезис         -> fit с портфелем: 87%, синергии с 3 компаниями',
    '  [4] команда       -> 2x ex-stripe, CTO из MIT, 94% retention',
    '',
    'полная карточка сделки: 3 минуты',
    'ручная работа аналитика: 3 дня',
    '',
    'рекомендация: proceed to partner meeting',
    '-> сохранено: deals/series-b-fintech.md',
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
  '/automate': [
    '$ process --automate "inbound-leads"',
    '',
    'текущий flow:',
    '  email -> менеджер читает -> crm -> ответ',
    '  среднее время: 4.2 часа',
    '',
    'ai-native flow:',
    '  email -> агент классифицирует -> crm auto',
    '  -> draft ответа -> человек approve',
    '  среднее время: 12 секунд',
    '',
    'экономия: 6 человек -> 1 оператор',
    'roi за первый месяц: 340%',
  ],
  '/stack': [
    'текущий стек:',
    '',
    '  claude code     skills, evals, MCP',
    '  cursor          ai-native IDE',
    '  github          версионирование, CI/CD',
    '  linear          project management',
    '  telegram        коммуникация, боты',
    '  airtable        данные, CRM',
    '',
    'парадигмы > инструменты.',
    'инструменты меняются каждый месяц.',
    'context engineering остаётся.',
  ],
  '/mckinsey': [
    '$ explain "why-consulting-dies"',
    '',
    '"нет компании, которая перестала',
    ' платить палантиру. это indefinitely.',
    ' вопрос -- кто построит такую же',
    ' зависимость через ai?"',
    '                        -- степан гершуни',
    '',
    'консалтинг теперь скейлится:',
    '  10 человек обслуживают 100 клиентов',
    '  благодаря ai-агентам',
    '',
    'юрист загрузил 50-страничное дело в ai.',
    'результат за секунды стоил бы gbp 500k',
    'и месяцы работы в лондонской фирме.',
  ],
  '/transform': [
    '$ aim --check "ai-readiness"',
    '',
    'ai-assisted -> ai-native -> agent-centric',
    '(используем gpt)  (сначала ai)  (агенты = workforce)',
    '',
    'ваша компания:',
    '  [?] платите людям за работу агентов?',
    '  [?] где ai даёт 10x рычаг?',
    '  [?] какие данные есть только у вас?',
    '  [!] может ли стартап из 5 повторить вас за 6 мес?',
    '',
    'internet-native: 15 лет',
    'mobile-native:   8 лет',
    'ai-native:       3 года',
    '',
    '-> время на адаптацию заканчивается',
  ],
  '/agents': [
    '$ orchestrate --demo "micro-negotiations"',
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
    'координация 24/7 без участия людей',
    'агенты договариваются между собой',
    '',
    '-> output = people * skill * time * ai_leverage^n',
  ],
  '/apply': [
    '-> заявка: t.me/alex_named',
    '',
    'старт: 23 марта 2026. 3 недели.',
    'identity -> architecture -> process.',
  ],
  '/about': [
    'ai mindset x cyberos',
    'identity-first organization',
    '',
    '6+ когорт. 200+ выпускников.',
    'от персональных ai-навыков',
    'до организационной трансформации.',
    '',
    '70% -- люди и процессы',
    '30% -- софт',
    '',
    'не курс по промптингу.',
    'трансформация компании в ai-native организацию.',
    '',
    '"образование -- это про бренд, не про контент.',
    ' мы берём деньги за трансформацию,',
    ' не за информацию."',
  ],
}

export function InteractiveTerminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<{ type: 'cmd' | 'out'; text: string }[]>([
    { type: 'out', text: 'ai-native organizations // sprint' },
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
            setInput('/help')
            setTimeout(() => {
              setInput('')
              setSuggestions([])
              setHistory(prev => [...prev, { type: 'cmd', text: '/help' }])
              if (commands['/help']) {
                commands['/help'].forEach((line, i) => {
                  setTimeout(() => {
                    setHistory(prev => [...prev, { type: 'out', text: line }])
                  }, i * 60)
                })
              }
            }, 300)
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
        { type: 'out', text: 'ai-native organizations // sprint' },
        { type: 'out', text: 'введите /help для списка навыков' },
      ])
      setInput('')
      return
    }

    if (commands[trimmed]) {
      commands[trimmed].forEach((line, i) => {
        setTimeout(() => {
          setHistory(prev => [...prev, { type: 'out', text: line }])
        }, i * 60)
      })
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
              <span>{line.text}</span>
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
