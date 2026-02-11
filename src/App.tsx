import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'

import { Reveal } from './components/Reveal'
import { CodeBlock } from './components/CodeBlock'
import { CaseCard } from './components/CaseCard'
import { HeroTerminal } from './components/HeroTerminal'
import { InteractiveTerminal } from './components/InteractiveTerminal'
import { CalendarSchedule } from './components/CalendarSchedule'
import { SpeakerSilhouette } from './components/VisualMetaphors'

function renderTerminalOutput(text: string) {
  const urlRegex = /(https?:\/\/[^\s]+|t\.me\/[^\s]+)/g
  const parts = text.split(urlRegex)
  if (parts.length === 1) return <span className="interactive-line--out">{text}</span>

  return (
    <span className="interactive-line--out">
      {parts.map((part, i) => {
        if (urlRegex.test(part)) {
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

  // Auto-type "help" and execute when section scrolls into view
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
                const responses: Record<string, string[]> = {
                  help: [
                    '  /telegram    открыть канал сообщества',
                    '  /email       написать команде',
                    '  /apply       подать заявку на AI-Native Organizations Sprint',
                    '  /website     сайт AI Mindset',
                    '  /linkedin    профиль в LinkedIn',
                    '  /stepan      Степан Гершуни (CyberOS)',
                    '  /alex        Александр Поваляев (AI Mindset)',
                    '  /download    скачать skills pack',
                  ],
                }
                responses.help.forEach((line, idx) => {
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
      help: [
        '  /telegram    открыть канал сообщества',
        '  /email       написать команде',
        '  /apply       подать заявку на AI-Native Organizations Sprint',
        '  /website     сайт AI Mindset',
        '  /linkedin    профиль в LinkedIn',
        '  /stepan      Степан Гершуни (CyberOS)',
        '  /alex        Александр Поваляев (AI Mindset)',
        '  /download    скачать skills pack',
      ],
      '/telegram': ['-> https://t.me/aim_community'],
      '/email': ['-> team@aimindset.co'],
      '/apply': ['-> заявка: https://t.me/alex_named', '', 'AI Mindset x CyberOS -- AI-Native Organizations Sprint', 'старт: 23 марта 2026'],
      '/website': ['-> https://aimindset.org'],
      '/linkedin': ['-> https://www.linkedin.com/in/povalyaev/'],
      '/stepan': ['Степан Гершуни', 'Principal at cyber.fund // CybOS // CoDos', '', '-> t.me/sgershuni'],
      '/alex': ['Александр Поваляев', 'Founder // AI Mindset', '', '-> t.me/alex_named'],
      '/download': ['-> скачать skills pack:', 'https://bos.aimindset.org/downloads/bos-skills-pack.md'],
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
            {line.type === 'cmd' && <span><span style={{ color: 'var(--cyan)' }}>aim&gt;</span> {line.text}</span>}
            {line.type === 'out' && renderTerminalOutput(line.text)}
          </div>
        ))}
        <div className="open-channel-input-row">
          <span className="terminal-prompt" style={{ color: 'var(--cyan)' }}>aim&gt;</span>
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

export default function App() {
  const [mobileMenu, setMobileMenu] = useState(false)
  const [expandedAudience, setExpandedAudience] = useState<string | null>(null)
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set())

  const toggleCheck = (idx: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev)
      if (next.has(idx)) next.delete(idx)
      else next.add(idx)
      return next
    })
  }

  return (
    <div className="app-wrapper">
      {/* ── nav ── */}
      <nav>
        <div className="nav-content">
          <a href="#" className="logo"><img src="/logo.png" alt="AI Mindset" className="logo-img" /> AI Mindset <span className="logo-dim">&times; CyberOS</span></a>
          <button
            className="mobile-toggle"
            onClick={() => setMobileMenu(!mobileMenu)}
            aria-label="Menu"
          >///</button>
          <div className={`nav-links ${mobileMenu ? 'open' : ''}`}>
            <a href="#program">[программа]</a>
            <a href="#speakers">[спикеры]</a>
            <a href="#pricing">[цены]</a>
            <a href="https://t.me/alex_named" className="nav-apply" style={{ color: 'var(--cyan)' }}>[/apply]</a>
          </div>
        </div>
      </nav>

      {/* ── hero ── */}
      <section className="hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-badge">ai-native organizations // 3 недели // 23 марта &ndash; 11 апреля</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h1 style={{ fontFamily: 'var(--font-mono, monospace)', textTransform: 'lowercase', fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.1, margin: '24px 0' }}>
              ai-native organizations {'{'}<span style={{ color: 'var(--cyan)' }}>sprint</span>{'}'}
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-subtitle"
          >
            3-недельная программа для фаундеров и C-level. агенты &ndash; новые сотрудники. не автоматизация старых процессов, а новая архитектура бизнеса.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <CodeBlock title="cyberos ~ init">
              <HeroTerminal />
            </CodeBlock>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="hero-buttons"
          >
            <a href="#pricing" className="btn btn-primary">подать заявку</a>
            <a href="#program" className="btn btn-outline">программа</a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="hero-stats"
          >
            <div className="stat">
              <div className="stat-value">3</div>
              <div className="stat-label">недели</div>
            </div>
            <div className="stat">
              <div className="stat-value">70/30</div>
              <div className="stat-label">люди / софт</div>
            </div>
            <div className="stat">
              <div className="stat-value">~6ч</div>
              <div className="stat-label">в неделю</div>
            </div>
            <div className="stat">
              <div className="stat-value">live</div>
              <div className="stat-label">воркшопы, коворкинг, фокус-сессии</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── для кого ── */}
      <section>
        <div className="container">
          <Reveal>
            <div className="section-label">// для кого</div>
            <h2 className="section-title">для кого этот спринт</h2>
            <p className="section-subtitle">фаундеры и C-level компаний 10&ndash;300 человек. те, кто строит, а не просто потребляет AI-контент.</p>
          </Reveal>

          <div className="audience-grid">
            <Reveal>
              <div className="audience-card card-bracketed" onClick={() => setExpandedAudience(expandedAudience === 'founder' ? null : 'founder')}>
                <div className="audience-card-icon">// founder</div>
                <div className="audience-card-title">фаундеры стартапов</div>
                <div className="audience-card-desc">вы хотите, чтобы команда из 5 человек работала как 50. AI &ndash; это рычаг, но сначала нужна правильная архитектура.</div>
                <button className="case-detail-toggle">{expandedAudience === 'founder' ? '[ свернуть ]' : '[ подробнее ]'}</button>
                {expandedAudience === 'founder' && (
                  <div className="case-detail">вы получите: персональную AI-OS, настроенный стек (Claude, Cursor, MCP), библиотеку навыков для ежедневных задач, и метод масштабирования команды через агентов. результат &ndash; операционная система, где 5 человек работают как 50.</div>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="audience-card card-bracketed" onClick={() => setExpandedAudience(expandedAudience === 'clevel' ? null : 'clevel')}>
                <div className="audience-card-icon">// c-level</div>
                <div className="audience-card-title">CEO и CTO</div>
                <div className="audience-card-desc">ваша компания работает на встречах и ручной координации. пора строить операционную систему, которая думает вместе с вами.</div>
                <button className="case-detail-toggle">{expandedAudience === 'clevel' ? '[ свернуть ]' : '[ подробнее ]'}</button>
                {expandedAudience === 'clevel' && (
                  <div className="case-detail">вы построите онтологию компании &ndash; структурированный контекст, который видят все агенты. MCP-интеграции с вашими системами. автоматизация процессов. от ручной координации к agent-native оркестрации.</div>
                )}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="audience-card card-bracketed" onClick={() => setExpandedAudience(expandedAudience === 'operator' ? null : 'operator')}>
                <div className="audience-card-icon">// operator</div>
                <div className="audience-card-title">COO и директора по операциям</div>
                <div className="audience-card-desc">вы видите 50 процессов, которые можно автоматизировать. нужен метод и стек, чтобы это реально сделать.</div>
                <button className="case-detail-toggle">{expandedAudience === 'operator' ? '[ свернуть ]' : '[ подробнее ]'}</button>
                {expandedAudience === 'operator' && (
                  <div className="case-detail">вы автоматизируете один полный процесс за 3 недели. научитесь измерять ROI. получите 90-дневный план трансформации. стек: Claude Code, MCP-серверы, агентные пайплайны, оркестрация.</div>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── сдвиг ── */}
      <section className="section-bg-top">
        <div className="container">
          <Reveal>
            <div className="section-label">// сдвиг происходит сейчас</div>
          </Reveal>
          <Reveal>
            <h2 className="section-title">экономика меняется фундаментально</h2>
          </Reveal>
          <Reveal>
            <p className="section-subtitle">internet-native заняло 15 лет. mobile-native &ndash; 8. AI-native &ndash; 3. каждая компания станет AI-компанией, как каждая стала интернет-компанией.</p>
          </Reveal>

          <Reveal>
            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-card-value">70%</div>
                <div className="stat-card-label">организаций застряли<br />в индустриальной эре</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">34%</div>
                <div className="stat-card-label">глубоко трансформируют<br />бизнес с помощью AI</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">1000&times;</div>
                <div className="stat-card-label">снижение стоимости<br />инференса за 2.5 года</div>
              </div>
              <div className="stat-card">
                <div className="stat-card-value">65%</div>
                <div className="stat-card-label">венчурных сделок в США<br />&ndash; AI-компании</div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="inline-quote quote-margin">&laquo;компании, которые не успеют измениться за ближайший год-два, умрут. IT &ndash; ~1 год на адаптацию. другие бизнесы &ndash; 2-3 года.&raquo; &ndash; Степан Гершуни</div>
          </Reveal>
        </div>
      </section>

      {/* ── программа ── */}
      <section id="program">
        <div className="container">
          <Reveal>
            <div className="section-label">// программа</div>
            <h2 className="section-title">три недели трансформации</h2>
            <p className="section-subtitle">от персональной OS до AI-native организации. рабочие артефакты, не теория. 3&ndash;4 лекции (Степан Гершуни) + 3&ndash;4 воркшопа + домашка + office hours.</p>
          </Reveal>

          <div className="program-timeline">
            {/* Week 1 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header">
                  <div className="week-label week-label--big">week_01 // Personal OS + Skills</div>
                  <h3 className="week-title">Personal OS + Skills</h3>
                  <p className="week-desc">установка AI-стека. claude, cursor, MCP. контекст и первые скиллы. POS pre-recordings как подготовка.</p>
                  <p className="week-level">от awareness к usage. первые 30 часов.</p>
                  <p className="week-stack">стек: Claude Code, CLAUDE.md, skills, evals, GitHub</p>
                </div>

                <Reveal>
                  <div className="inline-quote quote-margin">&laquo;сначала человек пришёл, у него есть просто установленная платформа с подпиской.&raquo; &ndash; Степан Гершуни</div>
                </Reveal>

                <div className="case-grid">
                  <CaseCard label="ARTIFACT" title="CLAUDE.md" desc="контекстный файл: роль, компания, принципы решений, стиль коммуникации." detail="фундамент всего. агент знает кто вы, что вам важно, как вы принимаете решения. без этого AI -- просто чат." />
                  <CaseCard label="ARTIFACT" title="skills + evals" desc="2-3 слэш-команды для ежедневных задач. каждая с оценкой качества." detail="написать навык, создать набор тестов, опубликовать на GitHub. бинарная оценка pass/fail -- никаких шкал." />
                  <CaseCard label="CASE" title="утренний бриф" desc="автоматическая ежедневная сводка: календарь, почта, telegram, приоритеты." detail="не просто саммари, а actionable next steps. агент знает ваш контекст и фильтрует шум." />
                </div>
              </div>
            </Reveal>

            {/* Week 2 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header">
                  <div className="week-label week-label--big">week_02 // Business OS + Agent Infrastructure</div>
                  <h3 className="week-title">Business OS + Agent Infrastructure</h3>
                  <p className="week-desc">онтология компании. модель данных. безопасность и compliance. компания читаема для агентов.</p>
                  <p className="week-level">от usage к building. контекст важнее промпта.</p>
                  <p className="week-stack">стек: MCP-серверы, Telegram/Calendar/Linear интеграции, онтология</p>
                </div>

                <Reveal>
                  <div className="inline-quote quote-margin">&laquo;на выходе получает онтологию &ndash; структуру контекста размечено.&raquo; &ndash; Степан Гершуни</div>
                </Reveal>

                <div className="case-grid">
                  <CaseCard label="CASE // VC FUND" title="auto due diligence" desc="после Zoom: транскрипт запускает 4 параллельных агента. полная карточка сделки за 3 минуты." detail="финансы, рынок, инвестиционный тезис, команда -- каждый агент работает параллельно. вместо 3 дней ручной работы аналитика." />
                  <CaseCard label="CASE // LEGAL" title="юрист с контекстом" desc="контрактный агент знает: кто контрагент, кто инициировал, история похожих контрактов." detail="50-страничное дело загружено в AI. результат за секунды стоил бы GBP 500K и месяцы работы в лондонской фирме." />
                  <CaseCard label="ARTIFACT" title="онтология компании" desc="структурированный контекст: философия, сделки, портфельные компании, контакты." detail="инвестиционная философия, сделки, портфельные компании -- всё на карте. навыки автоматически срабатывают на события." />
                </div>
              </div>
            </Reveal>

            {/* Week 3 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header">
                  <div className="week-label week-label--big">week_03 // Company Functions + масштабирование</div>
                  <h3 className="week-title">Company Functions + масштабирование</h3>
                  <p className="week-desc">конкретный процесс: маркетинг, sales или operations. ROI-метрики. AI Champion plan. 90-day Roadmap.</p>
                  <p className="week-level">от building к engineering. агенты, MCP, оркестрация.</p>
                  <p className="week-stack">стек: агентные пайплайны, оркестрация, ROI-метрики, Cursor</p>
                </div>

                <Reveal>
                  <div className="inline-quote quote-margin">&laquo;конкретно маркетинг. реально процесс, которым можно считать ROI.&raquo; &ndash; Степан Гершуни</div>
                </Reveal>

                <div className="case-grid">
                  <CaseCard label="CASE // ORGANIZATION" title="микро-переговоры" desc="маркетинг-агент говорит продуктовому: фича готова -- включай в кампанию." detail="автоматическая координация между отделами. агенты договариваются 24/7 без участия людей." />
                  <CaseCard label="CASE // AGENCY" title="агент поиска площадок" desc="агент собирает цены всех площадок города, анализирует, предлагает оптимальный вариант." detail="задача 6 человек сведена к 1 агенту. не просто парсинг цен -- полный анализ с учётом требований, доступности, логистики." />
                  <CaseCard label="ARTIFACT" title="90-дневный план" desc="полный план трансформации: quick wins, чемпионы, governance, масштабирование." detail="конкретный план: что делать в первую неделю, первый месяц, первый квартал." />
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="section-subtitle" style={{ marginTop: 32 }}>текущий стек: claude code, cursor, MCP, github, linear, telegram, airtable. технологии меняются &ndash; парадигмы остаются.</p>
          </Reveal>

          <Reveal>
            <CalendarSchedule />
          </Reveal>
        </div>
      </section>

      {/* ── интерактивная консоль ── */}
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

      {/* ── самопроверка ── */}
      <section>
        <div className="container">
          <Reveal>
            <div className="section-label">// вопросы для каждого бизнеса</div>
            <h2 className="section-title">самопроверка</h2>
          </Reveal>

          <Reveal>
            <div className="selfcheck-grid">
              {[
                { q: 'вы платите людям, чью работу мог бы делать агент?', h: 'начните с очевидных сокращений' },
                { q: 'где в вашем workflow AI даёт 10x рычаг?', h: 'фокус на росте, не на экономии' },
                { q: 'какие данные вы генерируете, которых нет у конкурентов?', h: 'поймите свой moat' },
                { q: 'может ли AI-native стартап из 5 человек повторить вашу ценность за 6 месяцев?', h: 'ваш главный риск прямо сейчас' },
              ].map((item, idx) => (
                <div key={idx} className={`selfcheck-card ${checkedItems.has(idx) ? 'checked' : ''}`} onClick={() => toggleCheck(idx)}>
                  <div className="selfcheck-checkbox">{checkedItems.has(idx) ? '\u2713' : ''}</div>
                  <div className="selfcheck-content">
                    <div className="selfcheck-num">{String(idx + 1).padStart(2, '0')}</div>
                    <div className="selfcheck-question">{item.q}</div>
                    <div className="selfcheck-hint">{item.h}</div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── about: кто мы ── */}
      <section id="about">
        <div className="container">
          <Reveal>
            <div className="section-label">// о нас</div>
            <h2 className="section-title">AI Mindset &times; CyberOS</h2>
            <p className="section-subtitle">ai mindset &ndash; 6 когорт, 200+ выпускников. cyberos &ndash; open-source os для компаний. не курс. система.</p>
          </Reveal>

          <div className="identity-grid">
            <Reveal>
              <div className="identity-card card-bracketed">
                <div className="identity-value">6+</div>
                <div className="identity-label">когорт AI Lab. от персональных AI-навыков до организационной трансформации.</div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="identity-card card-bracketed">
                <div className="identity-value">200+</div>
                <div className="identity-label">выпускников. фаундеры, CTO, продакт-лиды, которые построили свой AI-стек.</div>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <div className="identity-card card-bracketed">
                <div className="identity-value">CybOS</div>
                <div className="identity-label">open-source AI-native OS для организаций. context engineering, оркестрация агентов, MCP-интеграции.</div>
              </div>
            </Reveal>
            <Reveal delay={0.3}>
              <div className="identity-card card-bracketed">
                <div className="identity-value">CoDos</div>
                <div className="identity-label">AI-powered консалтинг. стратегический анализ уровня McKinsey за минуты, а не месяцы.</div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="inline-quote quote-margin">&laquo;образование &ndash; это не про контент. это про бренд. мы берём деньги за трансформацию.&raquo; &ndash; Степан Гершуни</div>
          </Reveal>
        </div>
      </section>

      {/* ── спикеры ── */}
      <section id="speakers">
        <div className="container">
          <Reveal>
            <div className="section-label">// спикеры</div>
            <h2 className="section-title">кто ведёт программу</h2>
          </Reveal>

          <Reveal>
            <div className="speakers-grid">
              <div className="speaker-card card-bracketed">
                <img src="/speakers/stepan-gershuni.jpg" alt="Степан Гершуни" className="speaker-avatar" />
                <div className="speaker-info">
                  <h3 className="speaker-name">Степан Гершуни</h3>
                  <p className="speaker-role">Principal at cyber.fund // CybOS // CoDos</p>
                  <p className="speaker-bio">фаундер Credentia, Deep Skills, Codex Town, Friendroid. VC в Cyber Fund с 200+ портфельными компаниями. автор CybOS &ndash; open-source AI-native OS для организаций. CoDos &ndash; AI-powered McKinsey.</p>
                  <div className="speaker-links">
                    <a href="https://github.com/sgershuni" className="speaker-link" target="_blank" rel="noopener">GitHub</a>
                    <a href="https://x.com/sgershuni" className="speaker-link" target="_blank" rel="noopener">Twitter</a>
                    <a href="https://t.me/sgershuni" className="speaker-link" target="_blank" rel="noopener">Telegram</a>
                  </div>
                </div>
              </div>
              <div className="speaker-card card-bracketed">
                <img src="/speakers/alexander-povaliaev.jpg" alt="Александр Поваляев" className="speaker-avatar" />
                <div className="speaker-info">
                  <h3 className="speaker-name">Александр Поваляев</h3>
                  <p className="speaker-role">Founder // AI Mindset</p>
                  <p className="speaker-bio">фаундер AI Mindset. стратег, эксперт по AI-интеграции. 15+ лет на пересечении технологий, бизнеса и людей. 6 когорт AI Lab, 200+ выпускников. context engineering, агентные системы, knowledge management.</p>
                  <div className="speaker-links">
                    <a href="https://www.linkedin.com/in/povalyaev/" className="speaker-link" target="_blank" rel="noopener">LinkedIn</a>
                    <a href="https://aimindset.org" className="speaker-link" target="_blank" rel="noopener">Website</a>
                    <a href="https://t.me/alex_named" className="speaker-link" target="_blank" rel="noopener">Telegram</a>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <div className="secret-speakers-grid">
              <div className="secret-card">
                <div>
                  <div className="vm-silhouette"><SpeakerSilhouette /></div>
                  <div className="section-label" style={{ marginBottom: 8 }}>эксперт воркшопа</div>
                  <div className="secret-label">практики из индустрии, которых вы наверняка знаете. эксперты по AI-агентам, маркетингу и организационной трансформации. имена объявим ближе к старту.</div>
                </div>
              </div>
              <div className="secret-card">
                <div>
                  <div className="vm-silhouette"><SpeakerSilhouette /></div>
                  <div className="section-label" style={{ marginBottom: 8 }}>эксперт воркшопа</div>
                  <div className="secret-label">практики из индустрии, которых вы наверняка знаете. эксперты по AI-агентам, маркетингу и организационной трансформации. имена объявим ближе к старту.</div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── цены ── */}
      <section id="pricing">
        <div className="container">
          <Reveal>
            <div className="section-label text-center">// тарифы</div>
            <h2 className="section-title text-center">инвестиция в трансформацию</h2>
            <p className="section-subtitle text-center" style={{ margin: '0 auto 48px' }}>фаундеры и C-level компаний 10&ndash;300 человек.</p>
          </Reveal>

          <Reveal>
            <div className="pricing-grid">
              <div className="price-card featured card-bracketed" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="price-tier">base</div>
                <div className="price-amount">&euro;1,490</div>
                <div className="price-period">за участника</div>
                <div className="price-discount">команда 3+: &euro;1,290/человек</div>
                <ul className="price-features">
                  <li>все лекции + воркшопы (3 недели)</li>
                  <li>персональные и командные артефакты</li>
                  <li>office hours с разбором кейсов</li>
                  <li>сообщество практиков</li>
                  <li>библиотека навыков</li>
                  <li>презентации, воркшопы, коворкинг</li>
                </ul>
                <a href="https://t.me/alex_named" className="btn btn-primary btn-block" style={{ marginTop: 'auto' }}>подать заявку</a>
              </div>
              <div className="price-card card-bracketed" style={{ display: 'flex', flexDirection: 'column' }}>
                <div className="price-tier">enterprise</div>
                <div className="price-amount">Custom</div>
                <div className="price-period">от 5 участников</div>
                <div className="price-discount price-discount--neutral">индивидуальный расчёт</div>
                <ul className="price-features">
                  <li>всё из Base</li>
                  <li>индивидуальная стратегия трансформации</li>
                  <li>воркшопы на месте</li>
                  <li>интеграция с вашими системами</li>
                  <li>выделенная поддержка</li>
                  <li>кастомный слой оркестрации агентов</li>
                </ul>
                <a href="https://t.me/alex_named" className="btn btn-primary btn-block" style={{ marginTop: 'auto' }}>обсудить pricing</a>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="early-bird-note">Early Bird: -15% до 9 марта &middot; Реферальная программа: 15% комиссия</p>
          </Reveal>

          <Reveal>
            <p className="early-bird-note">POS Sprint (&euro;890) &ndash; рекомендуемый первый шаг. участники получают POS pre-recordings за 2 недели до старта.</p>
          </Reveal>

        </div>
      </section>

      {/* ── OPEN CHANNEL (contact) ── */}
      <section id="contact" className="open-channel">
        <div className="container">
          <Reveal>
            <h2 className="open-channel-title">OPEN CHANNEL</h2>
          </Reveal>

          <Reveal>
            <OpenChannelTerminal />
          </Reveal>
        </div>
      </section>

      {/* ── footer ── */}
      <footer>
        <div className="container">
          <div className="footer-links-row">
            <a href="https://aimindset.org" target="_blank" rel="noopener">AI Mindset</a>
            <a href="https://cybos.ai" target="_blank" rel="noopener">CyberOS</a>
            <a href="https://cyber.fund" target="_blank" rel="noopener">cyber.fund</a>
            <a href="https://github.com/sgershuni" target="_blank" rel="noopener">GitHub</a>
          </div>
          <div className="footer-contacts-row">
            <a href="https://t.me/alex_named" target="_blank" rel="noopener">telegram @alex_named</a>
            <a href="mailto:team@aimindset.co">team@aimindset.co</a>
            <a href="https://t.me/aim_community" target="_blank" rel="noopener">@aim_community</a>
          </div>
          <div className="footer-bottom-row">
            <a href="#contact" className="btn btn-outline btn-sm">связаться</a>
            <span>AI Mindset &times; cyber.fund &middot; 2026</span>
          </div>
        </div>
      </footer>
    </div>
  )
}
