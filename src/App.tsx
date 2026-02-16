import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

import { Reveal } from './components/Reveal'
import { CaseCard } from './components/CaseCard'
import { GlitchText } from './components/GlitchText'
import { InteractiveTerminal } from './components/InteractiveTerminal'
import { CalendarSchedule } from './components/CalendarSchedule'
import { SystemMap } from './components/SystemMap'
import { CustomCursor } from './components/CustomCursor'
import { WeekIdentitySVG, WeekArchitectureSVG, WeekProcessSVG } from './components/VisualMetaphors'

/* ── Analytics Helper ── */

const YM_ID = 106857835

function track(event: string, data?: Record<string, string | number>) {
  const w = window as any
  if (w.umami) w.umami.track(event, data)
  if (w.ym) w.ym(YM_ID, 'reachGoal', event, data)
}

/* ── Tally Form Helper ── */

const TALLY_FORM_ID = 'vGMZB0'
const TALLY_PRODUCTS = {
  sprint: 'AI-native orgs {sprint} / 23 марта / €1490',
  bundle: 'personal OS + AI-native bundle / €1990',
  pos: 'personal OS {sprint} / 2 марта / €890',
  lab: 'AI Mindset {lab} / старт 20 апреля / from €590',
} as const

function openTallyForm(product: keyof typeof TALLY_PRODUCTS = 'sprint') {
  track('apply-click', { product })
  const w = window as any
  const choice = TALLY_PRODUCTS[product]
  if (w.Tally) {
    w.Tally.openPopup(TALLY_FORM_ID, {
      layout: 'modal',
      width: 600,
      hideTitle: true,
      overlay: true,
      emoji: { text: '/apply', animation: 'flash' },
      hiddenFields: {
        default_choice: choice,
        utm_source: 'bos-sprint-landing',
      },
    })
  } else {
    // Fallback: open Tally form URL with query params
    window.open(
      `https://tally.so/r/${TALLY_FORM_ID}?default_choice=${encodeURIComponent(choice)}&utm_source=bos-sprint-landing`,
      '_blank'
    )
  }
}

/* ── Slash Overlay (global floating terminal) ── */

function SlashOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [input, setInput] = useState('')
  const [lines, setLines] = useState<{ type: 'sys' | 'cmd' | 'out'; text: string }[]>([])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  useEffect(() => {
    if (open) {
      setLines([])
      setInput('')
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [open])

  const normalize = (cmd: string) => {
    let t = cmd.trim().toLowerCase()
    if (t && !t.startsWith('/')) t = '/' + t
    return t
  }

  const execute = (cmd: string) => {
    const t = normalize(cmd)
    if (!t) return
    setLines(prev => [...prev, { type: 'cmd', text: t }])

    const responses: Record<string, string[]> = {
      '/help': [
        '  /faq         частые вопросы',
        '  /apply       подать заявку на спринт',
        '  /program     программа спринта',
        '  /schedule    расписание',
        '  /contacts    контакты программы',
      ],
      '/apply': ['открываю форму заявки...'],
      '/program': ['переход к программе...'],
      '/schedule': ['переход к расписанию...'],
      '/contacts': [
        'контакты:',
        '  telegram   -> t.me/ai_mind_set',
        '  alex       -> t.me/alex_named',
        '  stepan     -> t.me/sgershuni',
        '  email      -> info@aimindset.org',
      ],
    }

    // FAQ
    if (t === '/faq') {
      const faqList = faqItems.map((item, i) => `  ${i + 1}. ${item.q}`)
      const out = ['FAQ:', ...faqList, '', '  /faq [номер] -- ответ']
      out.forEach((line, i) => {
        setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 60)
      })
      setInput('')
      return
    }
    const faqMatch = t.match(/^\/faq\s+(\d+)$/)
    if (faqMatch) {
      const idx = parseInt(faqMatch[1]) - 1
      if (idx >= 0 && idx < faqItems.length) {
        const item = faqItems[idx]
        const out = [`Q: ${item.q}`, '', `A: ${item.a}`]
        out.forEach((line, i) => {
          setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 60)
        })
      }
      setInput('')
      return
    }
    // Handle bare /N as /faq N
    const bareNumMatch = t.match(/^\/(\d+)$/)
    if (bareNumMatch) {
      const idx = parseInt(bareNumMatch[1]) - 1
      if (idx >= 0 && idx < faqItems.length) {
        const item = faqItems[idx]
        const out = [`Q: ${item.q}`, '', `A: ${item.a}`]
        out.forEach((line, i) => {
          setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 60)
        })
        setInput('')
        return
      }
    }

    const resp = responses[t]
    if (resp) {
      resp.forEach((line, i) => {
        setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 80)
      })
      if (t === '/apply') {
        setTimeout(() => {
          openTallyForm('sprint')
          onClose()
        }, 400)
      }
      if (t === '/program') {
        setTimeout(() => {
          onClose()
          document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
      if (t === '/schedule') {
        setTimeout(() => {
          onClose()
          document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
    } else {
      setLines(prev => [...prev, { type: 'out', text: `unknown: ${t}. /help -- список команд` }])
    }
    setInput('')
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="slash-overlay-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={onClose}
          />
          <motion.div
            className="slash-overlay"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.15, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="slash-overlay-header">
              <span className="slash-overlay-title">/ command</span>
              <div className="slash-overlay-quick">
                <button className="slash-quick-btn" onClick={() => execute('faq')}>faq</button>
                <button className="slash-quick-btn" onClick={() => execute('apply')}>apply</button>
                <button className="slash-quick-btn" onClick={() => execute('program')}>program</button>
                <button className="slash-quick-btn" onClick={() => execute('schedule')}>schedule</button>
                <button className="slash-quick-btn" onClick={() => execute('contacts')}>contacts</button>
              </div>
              <button className="slash-overlay-close" onClick={onClose}>esc</button>
            </div>
            <div ref={scrollRef} className="slash-overlay-body">
              {lines.length === 0 && (
                <div style={{ color: 'var(--terminal-dim)', fontSize: 12 }}>
                  введите команду или нажмите кнопку выше
                </div>
              )}
              {lines.map((line, i) => (
                <div key={i} style={{ marginBottom: 2 }}>
                  {line.type === 'cmd' && <span style={{ fontSize: 13 }}><span style={{ color: 'var(--accent-blue)' }}>$</span> {line.text}</span>}
                  {line.type === 'out' && (
                    line.text.match(/^\s+\d+\.\s/) ? (
                      <span
                        className="interactive-line--out terminal-clickable"
                        style={{ fontSize: 13 }}
                        onClick={() => {
                          const num = line.text.match(/^\s+(\d+)\./)?.[1]
                          if (num) execute(`/faq ${num}`)
                        }}
                      >
                        {line.text}
                      </span>
                    ) : (
                      <span style={{ fontSize: 13 }}>{renderTerminalOutput(line.text)}</span>
                    )
                  )}
                </div>
              ))}
            </div>
            <div className="slash-overlay-input-row">
              <span style={{ color: 'var(--accent-blue)', marginRight: 8 }}>$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => {
                  if (e.key === 'Enter') execute(input)
                  if (e.key === 'Escape') onClose()
                }}
                placeholder="faq, apply, contacts..."
                className="slash-overlay-input"
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

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
    { type: 'sys', text: 'Type "help" for available commands. /contacts -- связаться с нами.' },
  ])
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' })
  }, [lines])

  const hasAutoHelped = useRef(false)

  const helpLines = [
    '  /faq         частые вопросы',
    '  /apply       подать заявку на спринт',
    '  /program     программа спринта',
    '  /schedule    расписание',
    '  /contacts    контакты программы',
    '',
    '  (POS Sprint и bundle -- см. /faq 5)',
  ]

  useEffect(() => {
    const el = scrollRef.current?.closest('.open-channel')
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAutoHelped.current) {
          hasAutoHelped.current = true
          inputRef.current?.focus()
          const chars = '/faq'.split('')
          let i = 0
          const typeInterval = setInterval(() => {
            if (i < chars.length) {
              setInput(prev => prev + chars[i])
              i++
            } else {
              clearInterval(typeInterval)
              setTimeout(() => {
                setInput('')
                setLines(prev => [...prev, { type: 'cmd', text: '/faq' }])
                const faqList = faqItems.map((item, idx) => `  ${idx + 1}. ${item.q}`)
                const out = ['FAQ:', ...faqList, '', '  /faq [номер] -- ответ на вопрос']
                out.forEach((line, idx) => {
                  setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), idx * 80)
                })
              }, 300)
            }
          }, 120)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const execute = (cmd: string) => {
    let t = cmd.trim().toLowerCase()
    if (!t) return
    // normalize: add / prefix if missing
    if (t !== 'help' && t !== 'clear' && !t.startsWith('/') && !t.match(/^\d+$/)) t = '/' + t
    setLines(prev => [...prev, { type: 'cmd', text: t }])

    const responses: Record<string, string[]> = {
      help: helpLines,
      '/help': helpLines,
      '/apply': ['открываю форму заявки...', '', 'AI-Native Organizations Sprint', 'старт: 23 марта 2026', '\u20AC1,490 \u00B7 3 недели \u00B7 программа для руководителей, менеджеров и профессионалов'],
      '/program': ['переход к программе...'],
      '/schedule': ['переход к расписанию...'],
      '/contacts': [
        'контакты программы:',
        '',
        '  telegram   -> t.me/ai_mind_set',
        '  alex       -> t.me/alex_named (Александр Поваляев)',
        '  stepan     -> t.me/sgershuni (Степан Гершуни)',
        '  email      -> info@aimindset.org',
        '  website    -> https://aimindset.org',
      ],
    }

    // Handle /faq and /faq N
    if (t === '/faq' || t === 'faq') {
      const faqList = faqItems.map((item, i) => `  ${i + 1}. ${item.q}`)
      const out = ['FAQ:', ...faqList, '', '  /faq [номер] -- ответ на вопрос']
      out.forEach((line, i) => {
        setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 60)
      })
      setInput('')
      return
    }
    // Handle clicking FAQ number directly (e.g. "1", "2")
    const faqDirectMatch = t.match(/^(\d+)$/)
    if (faqDirectMatch) {
      const idx = parseInt(faqDirectMatch[1]) - 1
      if (idx >= 0 && idx < faqItems.length) {
        const item = faqItems[idx]
        const out = [`Q: ${item.q}`, '', `A: ${item.a}`]
        const link = (item as any).link
        if (link) out.push('', `-> ${link.text}: ${link.href}`)
        out.forEach((line, i) => {
          setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 60)
        })
        setInput('')
        return
      }
    }
    const faqMatch = t.match(/^\/faq\s+(\d+)$/)
    if (faqMatch) {
      const idx = parseInt(faqMatch[1]) - 1
      if (idx >= 0 && idx < faqItems.length) {
        const item = faqItems[idx]
        const out = [`Q: ${item.q}`, '', `A: ${item.a}`]
        const link = (item as any).link
        if (link) out.push('', `-> ${link.text}: ${link.href}`)
        out.forEach((line, i) => {
          setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 60)
        })
      } else {
        setLines(prev => [...prev, { type: 'out', text: `нет вопроса #${faqMatch[1]}. /faq -- список` }])
      }
      setInput('')
      return
    }

    const resp = responses[t]
    if (resp) {
      resp.forEach((line, i) => {
        setTimeout(() => setLines(prev => [...prev, { type: 'out', text: line }]), i * 80)
      })
      // Open Tally popup for /apply
      if (t === '/apply') {
        setTimeout(() => openTallyForm('sprint'), 400)
      }
      if (t === '/program') {
        setTimeout(() => {
          document.getElementById('program')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
      if (t === '/schedule') {
        setTimeout(() => {
          document.getElementById('map')?.scrollIntoView({ behavior: 'smooth' })
        }, 300)
      }
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
            {line.type === 'out' && (
              line.text.match(/^\s+\/\w+/) ? (
                <span
                  className="interactive-line--out terminal-clickable"
                  onClick={() => {
                    const cmd = line.text.trim().split(/\s+/)[0]
                    execute(cmd)
                  }}
                >
                  <span className="terminal-cmd-highlight">{line.text.match(/^\s+\/\w+/)?.[0]}</span>{line.text.replace(/^\s+\/\w+/, '')}
                </span>
              ) : line.text.match(/^\s+\d+\.\s/) ? (
                <span
                  className="interactive-line--out terminal-clickable"
                  onClick={() => {
                    const num = line.text.match(/^\s+(\d+)\./)?.[1]
                    if (num) execute(`/faq ${num}`)
                  }}
                >
                  <span className="terminal-faq-num">{line.text.match(/^\s+\d+\./)?.[0]}</span>{line.text.replace(/^\s+\d+\./, '')}
                </span>
              ) : renderTerminalOutput(line.text)
            )}
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
    <div className="scroll-progress" style={{ transform: `scaleX(${progress})` }} />
  )
}

/* ── ScrollSpy navigation ── */

/* ── Theme Toggle ── */

function ThemeToggle() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark'
    setTheme(next)
    document.documentElement.setAttribute('data-theme', next)
    track('theme-toggle', { theme: next })
  }

  return (
    <button className="theme-toggle" onClick={toggle}>
      {theme === 'dark' ? '◐' : '●'}
    </button>
  )
}

/* ── Nav Logo (always visible) ── */

function NavLogo() {
  return (
    <img
      src="/logo.png"
      alt="AI Mindset"
      className="nav-logo nav-logo--visible"
    />
  )
}

/* ── FAQ Accordion ── */

const faqItems = [
  {
    q: 'а чем это отличается от обычного курса по AI?',
    a: 'это не курс по промптингу. мы не учим кнопки. мы строим агентную инфраструктуру для компании: онтология, agent harness, автоматизация процессов, 90-дневный план. 7 конкретных артефактов, которые работают на следующий день.',
  },
  {
    q: 'у нас уже все используют ChatGPT. зачем платить €1,490?',
    a: 'ChatGPT \u2014 это ai-assisted. вы на уровне 1 из 3. агентоцентричная организация \u2014 это когда агенты координируются между собой, работают на ваших данных, 24/7. разница \u2014 как между электронной почтой и ERP.',
  },
  {
    q: 'нужен ли технический бэкграунд?',
    a: 'нет. программа для руководителей, менеджеров и профессионалов. мы учим архитектуру и процессы, не код. если вы умеете пользоваться ChatGPT \u2014 вы готовы.',
  },
  {
    q: '€1,490 \u2014 дорого. какой ROI?',
    a: 'один автоматизированный процесс экономит 6\u201320 часов в неделю. при зарплате специалиста \u2014 программа окупается за 2\u20134 недели. 340% ROI за первый месяц в кейсе автоматизации лидов.',
  },
  {
    q: 'что такое POS Sprint и зачем он нужен?',
    a: 'POS Sprint (\u20AC890, 2 недели) \u2014 персональный AI-стек: контекст, навыки, ассистент с памятью. это фундамент для AI-Native Sprint. можно пройти отдельно или в bundle (\u20AC1,990, экономия \u20AC390). мы выдаём prerequisite-материалы за 2 недели до старта.',
  },
  {
    q: 'можно ли участвовать командой?',
    a: 'да, и рекомендуется. команда 3+ человек \u2014 \u20AC1,290/чел. когда 2\u20133 человека из одной компании \u2014 внедрение идёт в 3\u00D7 быстрее. корпоративный формат \u2014 напишите нам.',
  },
  {
    q: 'что если у меня не получится внедрить?',
    a: 'каждый артефакт \u2014 рабочий документ, не теория. 90-дневный план включает quick wins на первую неделю. 700+ выпускников, 10+ когорт. если не подойдёт \u2014 напишите до конца первой недели, обсудим.',
  },
]

/* ── ScrollSpy Navigation ── */

const spySections = [
  { id: 'why-now', label: 'why now' },
  { id: 'program', label: 'program' },
  { id: 'map', label: 'path' },
  { id: 'console', label: 'console' },
  { id: 'speakers', label: 'speakers' },
  { id: 'results', label: 'results' },
  { id: 'pricing', label: 'pricing' },
  { id: 'contact', label: 'contact' },
]

function ScrollSpy() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id)
          }
        }
      },
      { threshold: 0.15, rootMargin: '-10% 0px -40% 0px' }
    )

    spySections.forEach(s => {
      const el = document.getElementById(s.id)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  const activeIdx = spySections.findIndex(s => s.id === active)

  return (
    <div className="scrollspy">
      {spySections.map((s, i) => {
        let cls = 'scrollspy-item'
        if (active === s.id) cls += ' active'
        else if (activeIdx >= 0 && i < activeIdx) cls += ' passed'
        else if (activeIdx >= 0 && i > activeIdx) cls += ' upcoming'
        return (
          <a key={s.id} href={`#${s.id}`} className={cls}>
            <span className="scrollspy-dot" />
            <span className="scrollspy-label">{s.label}</span>
          </a>
        )
      })}
    </div>
  )
}

/* ── Main App ── */

export default function App() {
  const [slashOpen, setSlashOpen] = useState(false)

  const handleSlashKey = useCallback((e: KeyboardEvent) => {
    // Don't trigger if already typing in an input/textarea
    const tag = (e.target as HTMLElement).tagName
    if (tag === 'INPUT' || tag === 'TEXTAREA') return
    if (e.key === '/' && !slashOpen) {
      e.preventDefault()
      setSlashOpen(true)
      track('slash-overlay-open')
    }
    if (e.key === 'Escape' && slashOpen) {
      setSlashOpen(false)
    }
  }, [slashOpen])

  useEffect(() => {
    window.addEventListener('keydown', handleSlashKey)
    return () => window.removeEventListener('keydown', handleSlashKey)
  }, [handleSlashKey])

  // ── Scroll depth tracking (25/50/75/100%) ──
  useEffect(() => {
    const fired = new Set<number>()
    const onScroll = () => {
      const pct = Math.round((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100)
      for (const threshold of [25, 50, 75, 100]) {
        if (pct >= threshold && !fired.has(threshold)) {
          fired.add(threshold)
          track('scroll-depth', { depth: threshold })
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // ── Section visibility tracking ──
  useEffect(() => {
    const sections = ['program', 'map', 'console', 'speakers', 'results', 'pricing', 'open-channel']
    const seen = new Set<string>()
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !seen.has(entry.target.id)) {
          seen.add(entry.target.id)
          track('section-view', { section: entry.target.id })
        }
      })
    }, { threshold: 0.3 })
    sections.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <div className="app-wrapper">
      <CustomCursor />
      <ScrollProgress />
      <SlashOverlay open={slashOpen} onClose={() => setSlashOpen(false)} />
      <ScrollSpy />
      {/* ── nav ── */}
      <nav>
        <div className="nav-content">
          <div className="nav-status">
            <NavLogo />
            <span className="nav-status-text">AI Mindset &times; CybOS</span>
          </div>
          <div className="nav-links">
            <ThemeToggle />
            <button className="nav-apply" onClick={() => openTallyForm('sprint')}>/apply</button>
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
            <h1>
              <GlitchText className="hero-accent">агентоцентричные организации.</GlitchText>
              <br />
              <span className="hero-secondary">от персонального AI-стека до инфраструктуры компании за 3 недели.</span>
            </h1>

            <p className="hero-subtitle">
              программа для руководителей, менеджеров и профессионалов.
              автоматизация рутинных процессов, кастомные агенты для каждой функции,
              инфраструктура, которая работает стабильно и безопасно.
            </p>

            <div className="slash-hint">нажмите <kbd>/</kbd> в любом месте страницы</div>
          </motion.div>

          <motion.div
            className="hero-right"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="status-card status-card--large">
              <div className="status-card-header">
                <span className="status-card-title">SYSTEM STATUS</span>
                <span className="status-card-indicator" />
              </div>
              <div className="status-card-row" style={{ flexDirection: 'column', gap: '4px' }}>
                <span className="status-card-label">PROGRAM</span>
                <span className="status-card-value" style={{ fontSize: '15px', fontWeight: 700 }}>AI-NATIVE ORGANIZATIONS SPRINT</span>
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
                <span className="status-card-label">END</span>
                <span className="status-card-value">11 APRIL 2026</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">DURATION</span>
                <span className="status-card-value">3 WEEKS &middot; ~6H/WEEK</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">FORMAT</span>
                <span className="status-card-value">ONLINE &middot; LIVE</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">AUDIENCE</span>
                <span className="status-card-value">EXECS &middot; MANAGERS &middot; PROFESSIONALS</span>
              </div>
              <div className="status-card-row">
                <span className="status-card-label">ALUMNI</span>
                <span className="status-card-value">700+ &middot; 10+ COHORTS</span>
              </div>
              <button className="status-card-cta" onClick={() => openTallyForm('sprint')}>/apply</button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── WHY NOW ── */}
      <section id="why-now" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// почему сейчас</div>
            <h2 className="section-title section-title--light">что изменилось</h2>
          </Reveal>

          <div className="why-now-grid">
            <Reveal>
              <div className="why-now-item">
                <div className="why-now-icon-row">
                  <span className="why-now-num">01</span>
                  <svg className="why-now-icon" viewBox="0 0 32 32" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5"><path d="M16 4v24M8 12l8-8 8 8" opacity="0.4"/><rect x="6" y="20" width="20" height="8" rx="2" opacity="0.6"/><text x="16" y="26" textAnchor="middle" fill="var(--accent-blue)" fontSize="7" fontFamily="monospace" stroke="none">&darr;100&times;</text></svg>
                </div>
                <h3 className="why-now-heading">в 10&ndash;100 раз дешевле</h3>
                <p className="why-now-text">AI выполняет рутинные задачи за долю стоимости. то, что раньше требовало команду аналитиков &ndash; делает один агент.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="why-now-item">
                <div className="why-now-icon-row">
                  <span className="why-now-num">02</span>
                  <svg className="why-now-icon" viewBox="0 0 32 32" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5"><circle cx="16" cy="16" r="10" opacity="0.3"/><path d="M16 10v6l4 2" strokeLinecap="round" opacity="0.7"/><path d="M24 8l2-2M8 8L6 6" opacity="0.4"/></svg>
                </div>
                <h3 className="why-now-heading">в тысячи раз быстрее</h3>
                <p className="why-now-text">люди общаются со скоростью 5 токенов в секунду. AI обрабатывает задачу за миллисекунды. это компаундится.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="why-now-item">
                <div className="why-now-icon-row">
                  <span className="why-now-num">03</span>
                  <svg className="why-now-icon" viewBox="0 0 32 32" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5"><circle cx="10" cy="16" r="3" opacity="0.5"/><circle cx="22" cy="10" r="3" opacity="0.5"/><circle cx="22" cy="22" r="3" opacity="0.5"/><line x1="13" y1="15" x2="19" y2="11" opacity="0.3"/><line x1="13" y1="17" x2="19" y2="21" opacity="0.3"/><line x1="22" y1="13" x2="22" y2="19" opacity="0.3"/></svg>
                </div>
                <h3 className="why-now-heading">пропускная способность &infin;</h3>
                <p className="why-now-text">человек управляет 10&ndash;15 подчинёнными. агент &ndash; сотнями параллельно. 100 клиентов одновременно &ndash; не проблема.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="why-now-item">
                <div className="why-now-icon-row">
                  <span className="why-now-num">04</span>
                  <svg className="why-now-icon" viewBox="0 0 32 32" fill="none" stroke="var(--accent-blue)" strokeWidth="1.5"><rect x="8" y="8" width="7" height="7" rx="1" opacity="0.5"/><rect x="17" y="8" width="7" height="7" rx="1" opacity="0.5"/><rect x="8" y="17" width="7" height="7" rx="1" opacity="0.5"/><rect x="17" y="17" width="7" height="7" rx="1" opacity="0.5"/><path d="M14 4h4M14 28h4M4 14v4M28 14v4" opacity="0.3" strokeDasharray="2 2"/></svg>
                </div>
                <h3 className="why-now-heading">мгновенная масштабируемость</h3>
                <p className="why-now-text">обучение хорошего специалиста &ndash; 10 лет. настройка агента &ndash; часы. клонирование &ndash; секунды.</p>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <p className="why-now-closing">это не прогноз. это уже происходит.<br />79% руководителей используют AI-агентов в 2026 году. вопрос &ndash; используете ли вы их системно.</p>
          </Reveal>

          <Reveal>
            <div className="for-whom-block">
              <h3 className="for-whom-title">для кого</h3>
              <div className="for-whom-cards">
                <div className="for-whom-card">
                  <span className="for-whom-card-role">руководители</span>
                  <span className="for-whom-card-desc">агентная инфраструктура, онтология, 90-дневный план трансформации</span>
                </div>
                <div className="for-whom-card">
                  <span className="for-whom-card-role">менеджеры</span>
                  <span className="for-whom-card-desc">автоматизация процессов, agent harness, метрики и ROI</span>
                </div>
                <div className="for-whom-card">
                  <span className="for-whom-card-role">профессионалы</span>
                  <span className="for-whom-card-desc">персональная OS, кастомные навыки, агенты для ежедневных задач</span>
                </div>
              </div>

              <div className="for-whom-split">
                <div className="for-whom-wants">
                  <h4>вы хотите:</h4>
                  <span>&ndash; автоматизировать рутинные процессы</span>
                  <span>&ndash; создавать кастомных агентов</span>
                  <span>&ndash; организовать процесс для всей команды</span>
                  <span>&ndash; построить стабильную инфраструктуру</span>
                </div>

                <div className="for-whom-not">
                  <h4>не подходит, если:</h4>
                  <span>&ndash; ищете техническую сертификацию</span>
                  <span>&ndash; нужен AI для одной задачи</span>
                  <span>&ndash; не готовы менять процессы</span>
                </div>
              </div>

              <div className="for-whom-tags">
                <span className="for-whom-tag">10&ndash;300 сотрудников</span>
                <span className="for-whom-tag">без кода</span>
                <span className="for-whom-tag for-whom-tag--dim">команды 3+: скидка</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── 2. ПРОГРАММА (dark) ── */}
      <section id="program" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// программа</div>
            <h2 className="section-title section-title--light">три недели &ndash; от личного стека до компании</h2>
            <p className="section-subtitle section-subtitle--light">каждая неделя &ndash; конкретный результат, который работает на следующий день. лекции (Степан Гершуни) + hands-on воркшопы + приглашённые эксперты.</p>
          </Reveal>

          <div className="program-timeline">
            {/* Week 1 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header-new">
                  <div className="week-number-big">01</div>
                  <div className="week-header-text">
                    <div className="week-label">PERSONAL OS + TEAM PROCESSES</div>
                    <p className="week-dates">23&ndash;28 марта &middot; пн лекция / вт фокус / ср воркшоп / пт гостевая лекция</p>
                    <p className="week-theme">от личных навыков к командным процессам.</p>
                    <p className="week-desc">что получите: работающая персональная операционная система, кастомные навыки для ежедневных задач, первые командные автоматизации, приоритизированный список 10 процессов компании.</p>
                    <p className="week-stack">инструменты: Claude Code, Obsidian, MCP, терминальные интеграции</p>
                  </div>
                  <div className="week-metaphor-side">
                    <WeekIdentitySVG />
                  </div>
                </div>

                <div className="case-grid">
                  <CaseCard label="АРТЕФАКТ" title="персональная OS" before="ChatGPT как чат. каждый раз заново. нет контекста." after="ассистент с памятью, навыками и вашим контекстом. работает за вас." detail="не чат, а ассистент с памятью и навыками. роль, компания, принципы решений -- всё в контексте." />
                  <CaseCard label="АРТЕФАКТ" title="командные автоматизации" before="каждый в команде использует AI по-своему. нет стандартов." after="общие навыки, один агент на команду. синхронная работа." detail="синхронная работа, общие навыки, агент, который знает контекст всей команды." />
                  <CaseCard label="ПРАКТИКА" title="приоритизация процессов" before="всё хочется автоматизировать. непонятно с чего начать." after="10 процессов, ранжированных по сложности и влиянию. конкретный план." detail="с этого списка начинается автоматизация на неделях 2-3. конкретный план действий." />
                </div>

                <Reveal>
                  <div className="inline-quote">&laquo;работающая система на следующий день, не через месяц.&raquo;</div>
                </Reveal>
              </div>
            </Reveal>

            {/* Week 2 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header-new">
                  <div className="week-number-big">02</div>
                  <div className="week-header-text">
                    <div className="week-label">INFRASTRUCTURE + ОНТОЛОГИЯ</div>
                    <p className="week-dates">30 марта &ndash; 4 апреля &middot; пн лекция / вт фокус / ср воркшоп / пт гостевая лекция</p>
                    <p className="week-theme">компания становится читаемой для AI.</p>
                    <p className="week-desc">что получите: онтология компании, безопасность и access rights для агентов, agent harness для бизнес-задач. организационный дизайн, плейбуки внедрения.</p>
                    <p className="week-stack">инструменты: vault, context directories, agent harness, security policies</p>
                  </div>
                  <div className="week-metaphor-side">
                    <WeekArchitectureSVG />
                  </div>
                </div>

                <div className="case-grid">
                  <CaseCard label="АРТЕФАКТ" title="онтология компании" before="агент не знает, как устроен ваш бизнес. каждый раз объяснять." after="структура бизнеса читаема для AI. агент видит всю картину." detail="клиенты, сделки, процессы, команда -- всё типизировано и связано. агент видит всю картину." />
                  <CaseCard label="АРТЕФАКТ" title="безопасность + access rights" before="агент имеет доступ ко всему или ни к чему." after="политики, аудит, правила. контроль без замедления работы." detail="compliance, аудит, правила работы с данными. контроль без замедления работы." />
                  <CaseCard label="АРТЕФАКТ" title="плейбук внедрения" before="каждый отдел внедряет AI по-своему. нет стандарта." after="готовый playbook: что делать, в каком порядке, что может сломаться." detail="организационный дизайн, failure modes, human dynamics. практический артефакт для каждого отдела." />
                </div>
              </div>
            </Reveal>

            <Reveal>
              <div className="inline-quote">&laquo;компания читаема для AI &ndash; не теория, а работающий артефакт.&raquo;</div>
            </Reveal>

            {/* Week 3 */}
            <Reveal>
              <div className="week-block">
                <div className="week-header-new">
                  <div className="week-number-big">03</div>
                  <div className="week-header-text">
                    <div className="week-label">COMPANY FUNCTIONS + ROI</div>
                    <p className="week-dates">6&ndash;11 апреля &middot; пн лекция / вт фокус / ср+пт воркшопы / сб Demo Day</p>
                    <p className="week-theme">конкретная бизнес-функция &rarr; agent pipeline с метриками.</p>
                    <p className="week-desc">3&ndash;4 воркшопа с приглашёнными экспертами. кейсы по функциям: маркетинг, продажи, саппорт, HR, операции, финансы, разработка, стратегия.</p>
                    <div className="company-functions-grid">
                      <span className="company-fn-tag">маркетинг</span>
                      <span className="company-fn-tag">продажи</span>
                      <span className="company-fn-tag">саппорт</span>
                      <span className="company-fn-tag">HR</span>
                      <span className="company-fn-tag">операции</span>
                      <span className="company-fn-tag">финансы</span>
                      <span className="company-fn-tag">разработка</span>
                      <span className="company-fn-tag">стратегия</span>
                      <span className="company-fn-tag">people management</span>
                      <span className="company-fn-tag">юриспруденция</span>
                      <span className="company-fn-tag">логистика</span>
                    </div>
                  </div>
                  <div className="week-metaphor-side">
                    <WeekProcessSVG />
                  </div>
                </div>

                <div className="case-grid">
                  <CaseCard label="АРТЕФАКТ" title="автоматизированный процесс" before="процесс занимает 4 часа. ручная работа, ошибки." after="pipeline от начала до конца. метрики. измеримый ROI." detail="не прототип, а работающий pipeline. конкретная бизнес-функция с измеримым ROI." />
                  <CaseCard label="АРТЕФАКТ" title="90-дневный план" before="непонятно что делать после курса. знания без применения." after="план на первую неделю, месяц и квартал. quick wins + масштабирование." detail="quick wins, AI champions в команде, новые роли (AI coordinator, prompt engineer), правила работы с AI, масштабирование." />
                  <CaseCard label="ПРАКТИКА" title="межагентная коммуникация" before="отделы работают в изоляции. ручная координация." after="агенты координируются между собой. 24/7 без участия людей." detail="маркетинг-агент передаёт продуктовому: фича готова -- включай в кампанию. 24/7 координация." />
                </div>

                <Reveal>
                  <div className="inline-quote">&laquo;90-дневный план &ndash; очень сочно. просто за план я бы заплатил.&raquo; &ndash; Степан Гершуни</div>
                </Reveal>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <div className="section-note">
              <p className="section-note-heading">
                стек меняется каждый месяц. мы учим не кнопки &ndash; мы учим архитектуру.
              </p>
              <p className="section-note-text">
                context engineering, agent infrastructure, evals, организационный дизайн &ndash;<br />
                это останется, даже когда инструменты сменятся трижды.
              </p>
            </div>
          </Reveal>

        </div>
      </section>

      {/* ── 3. ПУТЬ + РАСПИСАНИЕ (unified dark) ── */}
      <section id="map" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// путь</div>
            <h2 className="section-title section-title--light">от первого навыка до трансформации компании</h2>
            <p className="section-subtitle section-subtitle--light">каждый этап &ndash; конкретный артефакт, который работает на следующий день.</p>
          </Reveal>

          <div className="path-schedule-grid">
            <Reveal>
              <SystemMap />
            </Reveal>
            <Reveal>
              <CalendarSchedule />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── 4. КОНСОЛЬ (dark) ── */}
      <section id="console" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// консоль</div>
            <h2 className="section-title section-title--light">попробуйте сами</h2>
            <p className="section-subtitle section-subtitle--light">введите / &ndash; увидите, как работают навыки агента. /due-diligence &ndash; аудит компании. /onboarding &ndash; сотрудник за 2 часа. /support &ndash; саппорт 24/7.</p>
          </Reveal>
          <Reveal>
            <InteractiveTerminal />
          </Reveal>
        </div>
      </section>

      {/* ── CTA after console ── */}
      <Reveal>
        <div className="inline-cta section-dark">
          <div className="container" style={{ textAlign: 'center' }}>
            <button className="inline-cta-btn" onClick={() => openTallyForm('sprint')}>/apply &mdash; подать заявку на спринт</button>
          </div>
        </div>
      </Reveal>

      {/* ── 5. СПИКЕРЫ (dark) ── */}
      <section id="speakers" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// спикеры</div>
            <h2 className="section-title section-title--light">кто ведёт программу</h2>
          </Reveal>

          <Reveal>
            <div className="speakers-lead-grid">
              <div className="speaker-lead-card">
                <div className="speaker-left">
                  <div className="speaker-avatar-wrap">
                    <img src="/speakers/stepan-gershuni.jpg" alt="Степан Гершуни" className="speaker-lead-avatar" />
                  </div>
                  <div className="speaker-lead-links">
                    <a href="https://github.com/sgershuni" target="_blank" rel="noopener">github</a>
                    <a href="https://x.com/sgershuni" target="_blank" rel="noopener">twitter</a>
                    <a href="https://t.me/sgershuni" target="_blank" rel="noopener">telegram</a>
                  </div>
                </div>
                <div className="speaker-lead-info">
                  <h3 className="speaker-lead-name">Степан Гершуни</h3>
                  <div className="speaker-lead-role">Principal // cyber.fund // CybOS</div>
                  <p className="speaker-lead-bio">фаундер Credentia, Deep Skills. 200+ портфельных компаний. 15+ лет в крипте и AI. автор CybOS, agent-centric методологии и AI-Native Organizations Playbook.</p>
                </div>
              </div>
              <div className="speaker-lead-card">
                <div className="speaker-left">
                  <div className="speaker-avatar-wrap">
                    <img src="/speakers/alexander-povaliaev.jpg" alt="Александр Поваляев" className="speaker-lead-avatar" />
                  </div>
                  <div className="speaker-lead-links">
                    <a href="https://www.linkedin.com/in/povalyaev/" target="_blank" rel="noopener">linkedin</a>
                    <a href="https://aimindset.org" target="_blank" rel="noopener">website</a>
                    <a href="https://t.me/alex_named" target="_blank" rel="noopener">telegram</a>
                  </div>
                </div>
                <div className="speaker-lead-info">
                  <h3 className="speaker-lead-name">Александр Поваляев</h3>
                  <div className="speaker-lead-role">Founder // AI Mindset</div>
                  <p className="speaker-lead-bio">фаундер AI Mindset. 10+ когорт, 700+ выпускников. context engineering, агентные пайплайны, evals. ex-product в HR-tech и EdTech.</p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal>
            <p className="secret-speakers-intro">воркшоп-спикеры &ndash; практики из индустрии с реальным field-опытом внедрения AI. каждый проходит dry-run подготовку с командой программы. мы приглашаем новых спикеров в каждую когорту &ndash; людей, которые прямо сейчас строят агентные системы в своих компаниях.</p>
            <div className="secret-speakers-grid">
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// ai-агенты</div>
                <div className="secret-card-hint">строит агентные системы в продакшне. реальные кейсы масштабирования.</div>
              </div>
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// маркетинг</div>
                <div className="secret-card-hint">AI-native маркетинг. воронки, контент-пайплайны, аналитика на агентах.</div>
              </div>
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// operations</div>
                <div className="secret-card-hint">трансформация операционных процессов. автоматизация через agent infra.</div>
              </div>
              <div className="secret-card-glass">
                <div className="secret-card-icon">[?]</div>
                <div className="secret-card-domain">// продукт</div>
                <div className="secret-card-hint">AI-first продуктовый подход. от прототипа до production pipeline.</div>
              </div>
            </div>
            <p className="secret-speakers-intro" style={{ marginTop: '20px' }}>формат: 2&ndash;2.5 часа hands-on воркшоп. конкретная бизнес-функция. артефакт на выходе. если вы практик и хотите провести воркшоп &ndash; напишите нам.</p>
          </Reveal>
        </div>
      </section>

      {/* ── 6. РЕЗУЛЬТАТЫ (dark) ── */}
      <section id="results" className="section-dark section-bg-top">
        <div className="container">
          <Reveal>
            <div className="section-label">// результаты</div>
            <h2 className="section-title section-title--light">что говорят выпускники</h2>
          </Reveal>

          <Reveal>
            <div className="results-compact">
              <div className="results-stats-row">
                <span className="result-stat"><span className="result-stat-num">700+</span> выпускников</span>
                <span className="result-stat-divider">/</span>
                <span className="result-stat"><span className="result-stat-num">10+</span> когорт</span>
                <span className="result-stat-divider">/</span>
                <span className="result-stat"><span className="result-stat-num">57%</span> оценили на 5 из 5</span>
                <span className="result-stat-divider">/</span>
                <span className="result-stat"><span className="result-stat-num">10x</span> рычаг через AI-агентов</span>
              </div>

              <p className="testimonials-disclaimer">из предыдущих программ AI Mindset</p>

              <div className="testimonials-featured">
                <div className="testimonial-featured-card">
                  <svg className="testimonial-quote-icon" viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z" />
                    <path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z" />
                  </svg>
                  <p className="testimonial-featured-text">я боялась, что это слишком сложно для нетехнического человека. но через 3 недели я уже создавала агентов и автоматизации. теперь веду трек по AI для 700+ коллег. AI Mindset оказался не обучением, а инициацией &ndash; переходом на следующий уровень.</p>
                  <div className="testimonial-featured-author">
                    <span className="testimonial-featured-name">Екатерина Грачёва</span>
                    <span className="testimonial-featured-role">HR Communications // ex-Avito, Аэрофлот, МТС, Альфа-Банк, Сбер</span>
                  </div>
                </div>
              </div>

              <div className="testimonials-quotes">
                <div className="testimonial-quote-line">
                  <span className="testimonial-quote-text">&laquo;волшебный пендель &ndash; наконец-то сделал автоматизацию, которую хотел год назад.&raquo;</span>
                  <span className="testimonial-quote-author">Виталий, AUTO02</span>
                </div>
                <div className="testimonial-quote-line">
                  <span className="testimonial-quote-text">&laquo;мы буквально сидим на гигантской куче данных, но не умеем их использовать. AI Mindset показывает реальный путь &ndash; как превратить данные в инструмент управления.&raquo;</span>
                  <span className="testimonial-quote-author">Олег Цербаев // Apple, Avito, Deutsche Bank</span>
                </div>
                <div className="testimonial-quote-line">
                  <span className="testimonial-quote-text">&laquo;одно из немногих мест, где AI вплетается в жизнь не как магический инструмент, а как часть системы мышления. снять страх, собрать свою систему.&raquo;</span>
                  <span className="testimonial-quote-author">Дмитрий Лаухин // евангелист Obsidian</span>
                </div>
                <div className="testimonial-quote-line">
                  <span className="testimonial-quote-text">&laquo;преодоление барьера с AI в рабочих процессах. ноль разочарований.&raquo;</span>
                  <span className="testimonial-quote-author">Ольга, AUTO02</span>
                </div>
                <div className="testimonial-quote-line">
                  <span className="testimonial-quote-text">&laquo;офигела, как Клод чётко прописал схему планирования, чтобы не выпадать из режима. очень круто вытащил поведенческие паттерны года.&raquo;</span>
                  <span className="testimonial-quote-author">Вероника Долгих // COO, SETTERS Agency</span>
                </div>
                <div className="testimonial-quote-line">
                  <span className="testimonial-quote-text">&laquo;данные за год хранятся в вашем цифровом следе. не нужно вспоминать &ndash; нужно их вытащить и структурировать.&raquo;</span>
                  <span className="testimonial-quote-author">Сергей Сухов // Context Lab</span>
                </div>
                <div className="testimonial-quote-line">
                  <span className="testimonial-quote-text">&laquo;подсел на Anthropic за человечность моделей. по-настоящему затянуло.&raquo;</span>
                  <span className="testimonial-quote-author">Анатолий // Dir. of Engineering, Semrush</span>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── CTA after results ── */}
      <Reveal>
        <div className="inline-cta section-dark">
          <div className="container" style={{ textAlign: 'center' }}>
            <button className="inline-cta-btn" onClick={() => openTallyForm('sprint')}>/apply &mdash; присоединиться к спринту</button>
          </div>
        </div>
      </Reveal>

      {/* ── FOMO divider ── */}
      <Reveal>
        <div className="fomo-divider section-dark">
          <div className="container">
            <p className="fomo-text">internet-native заняло 15 лет. mobile-native &ndash; 8. ai-native &ndash; 3 года.<br />окно для перестройки компании закрывается. стартап из 5 человек уже делает то, что делает ваш отдел из 30.</p>
          </div>
        </div>
      </Reveal>

      {/* ── 7. ТАРИФЫ (dark) ── */}
      <section id="pricing" className="section-dark">
        <div className="container">
          <Reveal>
            <div className="section-label">// тарифы</div>
            <h2 className="section-title section-title--light">инвестиция в трансформацию</h2>
          </Reveal>

          <Reveal>
            <div className="pricing-cards">
              <article className="pricing-card">
                <div className="pricing-card-meta">3 НЕДЕЛИ &middot; 23 МАР &ndash; 11 АПР</div>
                <h3 className="pricing-card-title">AI-Native Sprint</h3>
                <div className="pricing-card-price-row">
                  <div className="pricing-card-price">&euro;1,490</div>
                  <span className="pricing-card-team-note">команда 3+: &euro;1,290/чел</span>
                </div>
                <p className="pricing-card-desc">9 лайв-сессий &middot; артефакты &middot; Demo Day</p>
                <ul className="pricing-card-features">
                  <li>лекции + воркшопы + Demo Day</li>
                  <li>плейбук внедрения AI в компанию</li>
                  <li>план имплементации для вашей организации</li>
                  <li>фокус-сессии + сообщество практиков</li>
                  <li>90-дневный план трансформации</li>
                </ul>
                <button className="pricing-card-cta" onClick={() => openTallyForm('sprint')}>/apply</button>
              </article>

              <article className="pricing-card pricing-card--featured">
                <div className="pricing-card-meta">5 НЕДЕЛЬ &middot; ПОЛНЫЙ ПУТЬ</div>
                <h3 className="pricing-card-title">POS + AI-Native</h3>
                <div className="pricing-card-price-row">
                  <div className="pricing-card-price">&euro;1,990</div>
                  <span className="pricing-card-badge">экономия &euro;390</span>
                </div>
                <p className="pricing-card-desc">Personal OS (&euro;890) + AI-Native (&euro;1,490)</p>
                <ul className="pricing-card-features">
                  <li>POS: персональный AI-стек + контекст + навыки</li>
                  <li>AI-Native: онтология + agent infra + company functions</li>
                  <li>prerequisite-материалы за 2 недели до старта</li>
                </ul>
                <button className="pricing-card-cta pricing-card-cta--featured" onClick={() => openTallyForm('bundle')}>/apply</button>
              </article>
            </div>
          </Reveal>

          <Reveal>
            <div className="pricing-extras">
              <p className="pricing-pos-link">POS Sprint (&euro;890) &ndash; <a href="https://aimindset.org/sprint-pos" target="_blank" rel="noopener">отдельная программа</a></p>
              <p className="early-bird-note">реферальная программа: 10% комиссия</p>
              <p className="pricing-enterprise">корпоративные заказы &ndash; напишите нам, ответим в течение дня</p>
            </div>
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
              <span className="footer-logo">AI Mindset &times; CybOS</span>
              <span className="footer-year">2026</span>
            </div>
            <div className="footer-nav">
              <a href="https://t.me/ai_mind_set" target="_blank" rel="noopener">telegram</a>
              <a href="https://aimindset.org" target="_blank" rel="noopener">website</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
