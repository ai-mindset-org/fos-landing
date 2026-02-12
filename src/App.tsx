import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

import { Reveal } from './components/Reveal'
import { CaseCard } from './components/CaseCard'
import { GlitchText } from './components/GlitchText'
import { InteractiveTerminal } from './components/InteractiveTerminal'
import { CalendarSchedule } from './components/CalendarSchedule'
import { SystemMap } from './components/SystemMap'
import { CustomCursor } from './components/CustomCursor'
import { WeekIdentitySVG, WeekArchitectureSVG, WeekProcessSVG } from './components/VisualMetaphors'

/* ── Open Channel Terminal ── */

function renderTerminalOutput(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+|t\.me\/[^\s]+)/g
  const parts = text.split(urlRegex)
  if (parts.length === 1) return <span className="interactive-line--out">{text}</span>

  return (
    <span className="interactive-line--out">
      {parts.map((part, i) => {
        if (/(https?:\/\/[^\s]+|t\.me\/[^\s]+)/.test(part)) {
          const href = part.startsWith('http') ? part : `https://${part}`
          return (
            <a key={i} href={href} target="_blank" rel="noopener" className="terminal-link">
              {part}
            </a>
          )
        }
        return <span key={i}>{part}</span>
      })}
    </span>
  )
}

function OpenChannelTerminal() {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<{ type: 'sys' | 'cmd' | 'out'; text: string }[]>([
    { type: 'sys', text: 'AI Mindset console online.' },
    { type: 'sys', text: 'Type "help" for available commands.' },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  const hasAutoHelped = useRef(false)

  const helpLines = [
    '  /telegram    открыть канал сообщества',
    '  /apply       подать заявку на спринт',
    '  /pos         POS Sprint (отдельная программа)',
    '  /bundle      POS + AINC bundle',
    '  /website     сайт AI Mindset',
    '  /stepan      Степан Гершуни (CyberOS)',
    '  /alex        Александр Поваляев (AI Mindset)',
  ]

  useEffect(() => {
    const el = scrollRef.current?.closest('.open-channel')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoHelped.current) {
          hasAutoHelped.current = true
          inputRef.current?.focus()
          const chars = 'help'.split('')
          let i = 0
          const typeInterval = setInterval(() => {
            if (i < chars.length) {
              setInput(prev => prev + chars[i])
              i++
            } else {
              clearInterval(typeInterval)
              setTimeout(() => {
                setInput('')
                setLines(prev => [...prev, { type: 'cmd', text: 'help' }])
                helpLines.forEach((line, idx) => {
                  setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), idx * 80)
                })
              }, 300)
            }
          }, 100)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const execute = (cmd: string) => {
    const t = cmd.trim().toLowerCase()
    if (!t) return
    setLines(prev => [...prev, { type: 'cmd', text: cmd }])

    const responses: Record<string, string[]> = {
      help: helpLines,
      '/telegram': ['-> https://t.me/aim_community'],
      '/apply': ['-> заявка: https://t.me/alex_named', '', 'AI Mindset x CyberOS -- ai-native organizations sprint', 'старт: 23 марта 2026'],
      '/pos': ['POS Sprint: €890 (2 недели, Personal OS)', '', 'отдельная программа:', '-> https://aimindset.org/sprint-pos'],
      '/bundle': ['POS + AI-Native Organizations Sprint bundle: €1,990 (экономия €390)', '', 'POS Sprint (€890) -- персональный AI-стек, контекст, навыки.', 'готовит фундамент для AI-Native Organizations Sprint.', 'pre-recordings за 2 недели до старта.', '', 'AI-Native Organizations Sprint (€1,490) -- онтология, agent infra,', 'company functions, Demo Day.', '', '-> заявка: https://t.me/alex_named'],
      '/website': ['-> https://aimindset.org'],
      '/linkedin': ['-> https://www.linkedin.com/in/povalyaev/'],
      '/stepan': ['Степан Гершуни', 'Principal at cyber.fund // CybOS // CoDos', '', '-> t.me/sgershuni'],
      '/alex': ['Александр Поваляев', 'Founder // AI Mindset', '', '-> t.me/alex_named'],
    }

    const resp = responses[t]
    if (resp) {
      resp.forEach((line, i) => {
        setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 80)
      })
    } else {
      setLines(prev => [...prev, { type: 'out', text: `unknown: ${t}. type "help"` }])
    }
    setInput('')
  }

  return (
    <div className="terminal terminal-scanlines open-channel-terminal">
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title-right">root@aim:~</span>
      </div>
      <div ref={scrollRef} className="terminal-body" style={{ minHeight: 240, padding: '28px 32px' }}>
        {lines.map((line, i) => (
          <div key={i} style={{ marginBottom: 2 }}>
            {line.type === 'sys' && <span className="terminal-green-text">{line.text}</span>}
            {line.type === 'cmd' && <span><span style={{ color: '#fff' }}>●</span><span style={{ color: '#5588aa' }}>/</span> {line.text}</span>}
            {line.type === 'out' && renderTerminalOutput(line.text)}
          </div>
        ))}
        <div className="open-channel-input-row">
          <span className="terminal-prompt"><span style={{ color: '#fff' }}>●</span><span style={{ color: '#5588aa' }}>/</span></span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') execute(input) }}
            placeholder="Type a command..."
            className="open-channel-input"
          />
        </div>
      </div>
    </div>
  )
}

/* ── Scroll Progress ── */

function ScrollProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setProgress(h > 0 ? window.scrollY / h : 0)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div className="scroll-progress" style={{ height: `${progress * 100}%` }} />
  )
}

/* ── Main App ── */

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false)

  return (
    <div className="app-wrapper">
      <CustomCursor />
      <ScrollProgress />
      {/* ── nav ── */}
      <nav>
        <div className="nav-content">
          <div className="nav-status">
            <span className="nav-status-dot" />
            <span className="nav-status-text">ONLINE</span>
            <span className="nav-system-id">SYSTEM_ID: AIM_AINC_V2.0</span>
          </div>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >///</button>
          <div className={`nav-links ${mobileMenu ? 'open' : ''}`}>
            <a href="#program">программа</a>
            <a href="#map">карта</a>
            <a href="#speakers">спикеры</a>
            <a href="#console">консоль</a>
            <a href="#pricing">цены</a>
            <a href="https://t.me/alex_named" className="nav-apply">/apply</a>
          </div>
        </div>
      </nav>

      {/* ── 1. HERO ── */}
      <section className="hero">
        <div className="hero-noise" />
        <div className="container hero-grid">
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">ai-native organizations sprint // 3 недели // 23 марта &ndash; 11 апреля</div>

            <h1>
              <GlitchText>агенты &ndash; новые сотрудники.</GlitchText>
              <br />
              <span style={{ color: '#d0d0d4' }}>трансформация за 3 недели.</span>
            </h1>

            <p className="hero-subtitle">
              не автоматизация старых процессов, а новая архитектура бизнеса.
              для фаундеров и C-level компаний 10&ndash;300 человек.
            </p>

            <div className="hero-buttons">
              <a href="#pricing" className="btn btn-primary">подать заявку</a>
              <a href="#program" className="btn btn-outline">программа</a>
            </div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="status-card">
              <div className="status-card-header">
                <span className="status-card-title">SYSTEM STATUS</span>
                <span className="status-card-indicator" />
              </div>
              <div className="status-card-row">
                <span className="status-card-label">PROGRAM</span>
                <span className="status-card-value">AI-NATIVE ORGANIZATIONS SPRINT v2.0</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">STATUS</span>
                <span className="status-card-value status-card-value--active">ENROLLING</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">START</span>
                <span className="status-card-value">23 MARCH 2026</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">DURATION</span>
                <span className="status-card-value">3 WEEKS &middot; ~6H/WEEK</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">ALUMNI</span>
                <span className="status-card-value">500+ &middot; 10+ COHORTS</span>
              </div>
              <div className="status-card-protocols">
                <span className="status-card-label">FOCUS PROTOCOLS</span>
                <div className="status-card-tags">
                  <span className="status-tag">PERSONAL OS</span>
                  <span className="status-tag">BUSINESS OS</span>
                  <span className="status-tag">COMPANY FUNCTIONS</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. ПРОГРАММА (dark) ── */}
      <section id="program" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// программа</div>
            <h2 className="section-title section-title--light">три недели трансформации</h2>
            <p className="section-subtitle section-subtitle--light">от персональной OS до AI-native организации. артефакты, не теория. лекции (Степан Гершуни) + воркшопы + office hours.</p>
          </Reveal>

          <div className="program-timeline">
            {/* Week 1 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header">
                  <div className="week-number">01</div>
                  <div className="week-header-text">
                    <div className="week-label">PERSONAL OS + SKILLS</div>
                    <p className="week-desc">установка AI-стека. claude code, cursor, MCP. контекст и первые скиллы.</p>
                    <p className="week-stack">стек: Claude Code, CLAUDE.md, skills, evals, GitHub</p>
                    <p className="week-dates">23&ndash;28 марта &middot; пн/ср/пт 18:00 CET</p>
                  </div>
                </div>

                <div className="week-metaphor">
                  <WeekIdentitySVG />
                </div>

                <div className="case-grid">
                  <CaseCard label="АРТЕФАКТ" title="CLAUDE.md" desc="файл, который объясняет AI кто вы и как вы работаете." detail="роль, компания, принципы решений, стиль. без этого AI -- просто чат. с этим -- персональный ассистент." />
                  <CaseCard label="АРТЕФАКТ" title="skills + evals" desc="команды для ежедневных задач с автоматической проверкой качества." detail="пишете навык, создаёте тесты, публикуете. оценка pass/fail -- работает или нет." />
                  <CaseCard label="КЕЙС" title="утренний бриф" desc="каждое утро агент собирает сводку: календарь, почта, задачи." detail="не саммари, а конкретные следующие шаги. агент знает ваш контекст и фильтрует шум." />
                </div>

                <Reveal>
                  <div className="inline-quote">&laquo;сначала человек пришёл, у него есть просто установленная платформа с подпиской.&raquo; &ndash; Степан Гершуни</div>
                </Reveal>
              </div>
            </Reveal>

            {/* Week 2 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header">
                  <div className="week-number">02</div>
                  <div className="week-header-text">
                    <div className="week-label">BUSINESS OS + AGENT INFRASTRUCTURE</div>
                    <p className="week-desc">онтология компании. модель данных. безопасность, права доступа, compliance.</p>
                    <p className="week-stack">стек: MCP-серверы, Telegram/Calendar/Linear, онтология</p>
                    <p className="week-dates">30 марта &ndash; 4 апреля &middot; пн/ср/пт 18:00 CET</p>
                  </div>
                </div>

                <div className="week-metaphor">
                  <WeekArchitectureSVG />
                </div>

                <div className="case-grid">
                  <CaseCard label="КЕЙС // VC FUND" title="auto due diligence" desc="после звонка 4 агента параллельно собирают карточку сделки. 3 минуты вместо 3 дней." detail="финансы, рынок, тезис, команда -- каждый агент работает одновременно. заменяет ручную работу аналитика." />
                  <CaseCard label="КЕЙС // LEGAL" title="юрист с контекстом" desc="агент анализирует контракт с учётом истории и контрагента." detail="50-страничное дело за секунды. в лондонской фирме это стоило бы GBP 500K и месяцы работы." />
                  <CaseCard label="АРТЕФАКТ" title="онтология компании" desc="карта бизнеса для AI: люди, сделки, процессы, знания." detail="агент видит всю картину. навыки срабатывают автоматически на события в компании." />
                </div>
              </div>
            </Reveal>

            {/* Week 3 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header">
                  <div className="week-number">03</div>
                  <div className="week-header-text">
                    <div className="week-label">COMPANY FUNCTIONS + МАСШТАБИРОВАНИЕ</div>
                    <p className="week-desc">конкретный процесс: маркетинг, sales или operations. ROI-метрики. Demo Day.</p>
                    <p className="week-stack">стек: агентные пайплайны, оркестрация, ROI-метрики, Cursor</p>
                    <p className="week-dates">6&ndash;11 апреля &middot; пн/ср/пт 18:00 + сб 12:00 Demo Day</p>
                  </div>
                </div>

                <div className="week-metaphor">
                  <WeekProcessSVG />
                </div>

                <div className="case-grid">
                  <CaseCard label="КЕЙС // ОРГАНИЗАЦИЯ" title="микро-переговоры" desc="агенты отделов координируются между собой без участия людей." detail="маркетинг-агент говорит продуктовому: фича готова -- включай в кампанию. 24/7 без менеджеров." />
                  <CaseCard label="КЕЙС // АГЕНТСТВО" title="агент поиска площадок" desc="один агент заменяет 6 человек: собирает, сравнивает, рекомендует." detail="не просто парсинг цен -- полный анализ всех площадок города с учётом требований." />
                  <CaseCard label="АРТЕФАКТ" title="90-дневный план" desc="конкретный план: что делать на первой неделе, в первый месяц, в первый квартал." detail="quick wins, чемпионы внутри команды, правила работы с AI, масштабирование." />
                </div>

                <Reveal>
                  <div className="inline-quote">&laquo;конкретно маркетинг. реально процесс, которым можно считать ROI.&raquo; &ndash; Степан Гершуни</div>
                </Reveal>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="section-note">текущий стек: claude code, cursor, MCP, github, linear, telegram, airtable. технологии меняются &ndash; парадигмы остаются.</p>
          </Reveal>

          <Reveal>
            <CalendarSchedule />
          </Reveal>
        </div>
      </section>

      {/* ── 3. SYSTEM MAP (dark) ── */}
      <section id="map" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// карта трансформации</div>
            <h2 className="section-title section-title--light">путь участника</h2>
            <p className="section-subtitle section-subtitle--light">от POS pre-recordings до Demo Day. каждый этап &ndash; конкретный артефакт.</p>
          </Reveal>

          <Reveal>
            <SystemMap />
          </Reveal>
        </div>
      </section>

      {/* ── 4. КОНСОЛЬ (light) ── */}
      <section id="console">
        <div className="container">
          <Reveal>
            <div className="section-label">// консоль</div>
            <h2 className="section-title">попробуйте сами</h2>
            <p className="section-subtitle">введите / &ndash; увидите все навыки. tab &ndash; автодополнение. /dd &ndash; due diligence. /agents &ndash; микро-переговоры.</p>
          </Reveal>
          <Reveal>
            <InteractiveTerminal />
          </Reveal>
        </div>
      </section>

      {/* ── 5. СПИКЕРЫ (dark) ── */}
      <section id="speakers" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// спикеры</div>
            <h2 className="section-title section-title--light">кто ведёт программу</h2>
          </Reveal>

          <Reveal>
            <div className="speakers-grid">
              <div className="speaker-card-dark">
                <div className="speaker-card-dark-photo">
                  <img src="/speakers/stepan-gershuni.jpg" alt="Степан Гершуни" className="speaker-avatar-dark" />
                  <div className="speaker-scanline-overlay" />
                </div>
                <div className="speaker-info-dark">
                  <div className="speaker-role-dark">Principal // cyber.fund // CybOS</div>
                  <h3 className="speaker-name-dark">Степан Гершуни</h3>
                  <p className="speaker-bio-dark">фаундер Credentia, Deep Skills. Principal в Cyber Fund, 200+ портфельных компаний. 15+ лет в крипте и AI. автор CybOS и agent-centric методологии.</p>
                  <div className="speaker-links-dark">
                    <a href="https://github.com/sgershuni" target="_blank" rel="noopener">&gt; github</a>
                    <a href="https://x.com/sgershuni" target="_blank" rel="noopener">&gt; twitter</a>
                    <a href="https://t.me/sgershuni" target="_blank" rel="noopener">&gt; telegram</a>
                  </div>
                </div>
              </div>
              <div className="speaker-card-dark">
                <div className="speaker-card-dark-photo">
                  <img src="/speakers/alexander-povaliaev.jpg" alt="Александр Поваляев" className="speaker-avatar-dark" />
                  <div className="speaker-scanline-overlay" />
                </div>
                <div className="speaker-info-dark">
                  <div className="speaker-role-dark">Founder // AI Mindset</div>
                  <h3 className="speaker-name-dark">Александр Поваляев</h3>
                  <p className="speaker-bio-dark">фаундер AI Mindset. 10+ когорт, 500+ выпускников. context engineering, агентные пайплайны, evals. ex-product в HR-tech и EdTech.</p>
                  <div className="speaker-links-dark">
                    <a href="https://www.linkedin.com/in/povalyaev/" target="_blank" rel="noopener">&gt; linkedin</a>
                    <a href="https://aimindset.org" target="_blank" rel="noopener">&gt; website</a>
                    <a href="https://t.me/alex_named" target="_blank" rel="noopener">&gt; telegram</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="secret-speakers-grid">
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// ai-агенты</div>
                <div className="secret-card-hint">практик, строящий агентные системы в продакшне</div>
              </div>
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// маркетинг</div>
                <div className="secret-card-hint">AI-native маркетолог. воронки, контент, аналитика</div>
              </div>
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// operations</div>
                <div className="secret-card-hint">трансформация процессов через агентов</div>
              </div>
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// продукт</div>
                <div className="secret-card-hint">AI-first продуктовый подход. MCP, навыки</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 6. РЕЗУЛЬТАТЫ (light-gray) ── */}
      <section id="results" className="section-bg-top">
        <div className="container">
          <Reveal>
            <div className="section-label">// результаты</div>
            <h2 className="section-title">что говорят выпускники</h2>
          </Reveal>

          <Reveal>
            <div className="results-grid">
              <div className="result-card">
                <div className="result-value">500+</div>
                <div className="result-label">выпускников<br />10+ когорт</div>
              </div>
              <div className="result-card">
                <div className="result-value">57%</div>
                <div className="result-label">оценили<br />на 5 из 5</div>
              </div>
              <div className="result-card">
                <div className="result-value">3 мин</div>
                <div className="result-label">вместо 3 дней<br />due diligence</div>
              </div>
              <div className="result-card">
                <div className="result-value">10x</div>
                <div className="result-label">рычаг<br />через AI-агентов</div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="testimonials-grid">
              <div className="testimonial-card card-bracketed">
                <div className="testimonial-quote">&laquo;автоматизацию по сбору информации о совещаниях я хотел сделать ещё год назад. сейчас наконец-то сделал благодаря вам. это вот такой вот волшебный пендель.&raquo;</div>
                <div className="testimonial-author">Виталий</div>
                <div className="testimonial-role">выпускник AUTO02</div>
              </div>
              <div className="testimonial-card card-bracketed">
                <div className="testimonial-quote">&laquo;начал с Cursor, по-настоящему затянуло с Claude &ndash; подсел на Anthropic за человечность моделей.&raquo;</div>
                <div className="testimonial-author">Анатолий</div>
                <div className="testimonial-role">Director of Engineering, Semrush</div>
              </div>
              <div className="testimonial-card card-bracketed">
                <div className="testimonial-quote">&laquo;преодоление барьера, связанного с использованием AI в рабочих процессах. ноль разочарований.&raquo;</div>
                <div className="testimonial-author">Ольга</div>
                <div className="testimonial-role">выпускница AUTO02</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 7. ТАРИФЫ (light) ── */}
      <section id="pricing">
        <div className="container">
          <Reveal>
            <div className="section-label text-center">// тарифы</div>
            <h2 className="section-title text-center">инвестиция в трансформацию</h2>
          </Reveal>

          <Reveal>
            <div className="pricing-grid pricing-grid--2">
              <div className="price-card featured card-bracketed">
                <div className="price-tier">AI-Native Organizations Sprint</div>
                <div className="price-amount">&euro;1,490</div>
                <div className="price-period">3 недели &middot; Business OS</div>
                <div className="price-discount">команда 3+: &euro;1,290/чел</div>
                <ul className="price-features">
                  <li>все лекции + воркшопы</li>
                  <li>персональные и командные артефакты</li>
                  <li>office hours с разбором кейсов</li>
                  <li>сообщество практиков</li>
                  <li>библиотека навыков</li>
                  <li>Demo Day + 90-day Roadmap</li>
                </ul>
                <a href="https://t.me/alex_named" className="btn btn-primary btn-block">подать заявку</a>
              </div>

              <div className="price-card price-card--bundle">
                <div className="price-badge">BEST VALUE</div>
                <div className="price-tier">POS + AI-Native Organizations bundle</div>
                <div className="price-original">&euro;2,380</div>
                <div className="price-amount">&euro;1,990</div>
                <div className="price-period">оба спринта &middot; 5 недель</div>
                <div className="price-save">экономия &euro;390</div>
                <ul className="price-features">
                  <li>POS Sprint: персональный AI-стек + контекст</li>
                  <li>AI Native Company Sprint: онтология + agent infra</li>
                  <li>POS pre-recordings за 2 нед до старта</li>
                  <li>полный путь трансформации</li>
                  <li>приоритетная поддержка</li>
                </ul>
                <a href="https://t.me/alex_named" className="btn btn-primary btn-block">подать заявку</a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="pricing-pos-link">POS Sprint (&euro;890) &ndash; <a href="https://aimindset.org/sprint-pos" target="_blank" rel="noopener">отдельная программа</a></p>
            <p className="early-bird-note">Early Bird: -15% до 9 марта &middot; Реферальная программа: 15% комиссия</p>
          </Reveal>
        </div>
      </section>

      {/* ── OPEN CHANNEL (dark) ── */}
      <section id="contact" className="open-channel section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// open channel</div>
          </Reveal>
          <Reveal>
            <OpenChannelTerminal />
          </Reveal>
        </div>
      </section>

      {/* ── footer ── */}
      <footer className="footer-dark">
        <div className="container">
          <div className="footer-row">
            <div className="footer-brand">
              <span className="footer-logo">AI Mindset &times; CyberOS</span>
              <span className="footer-year">2026</span>
            </div>
            <div className="footer-nav">
              <a href="https://aimindset.org" target="_blank" rel="noopener">AI Mindset</a>
              <a href="https://cybos.ai" target="_blank" rel="noopener">CyberOS</a>
              <a href="https://cyber.fund" target="_blank" rel="noopener">cyber.fund</a>
            </div>
            <div className="footer-contacts">
              <a href="https://t.me/alex_named" target="_blank" rel="noopener">@alex_named</a>
              <a href="https://t.me/sgershuni" target="_blank" rel="noopener">@sgershuni</a>
              <a href="mailto:info@aimindset.org">info@aimindset.org</a>
              <a href="https://t.me/aim_community" target="_blank" rel="noopener">@aim_community</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
