import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export function HeroTerminal() {
  const [lines, setLines] = useState<{ type: 'cmd' | 'out'; html: string }[]>([])
  const hasRun = useRef(false)
  const containerRef = useRef<HTMLDivElement>(null)
  const [speedMultiplier, setSpeedMultiplier] = useState(1)

  const script: { type: 'cmd' | 'out'; html: string; delay: number }[] = [
    { type: 'cmd', html: 'aim init <span class="terminal-string">"your-company"</span>', delay: 0 },
    { type: 'out', html: 'загрузка контекста компании...', delay: 600 },
    { type: 'cmd', html: 'ontology <span class="terminal-keyword">--map</span> <span class="terminal-string">"company-context"</span>', delay: 1500 },
    { type: 'out', html: 'сущности: сделки, контакты, процессы, знания', delay: 2100 },
    { type: 'cmd', html: 'process <span class="terminal-keyword">--automate</span> <span class="terminal-string">"first-workflow"</span>', delay: 3000 },
    { type: 'out', html: '<span class="terminal-green-text">ai-native трансформация запущена</span>', delay: 3750 },
  ]

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSpeedMultiplier(entry.intersectionRatio > 0.5 ? 1 : 1.5)
        } else {
          setSpeedMultiplier(3)
        }
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1] }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (hasRun.current) return
    hasRun.current = true
    script.forEach(({ type, html, delay }) => {
      setTimeout(
        () => setLines(prev => [...prev, { type, html }]),
        delay * speedMultiplier
      )
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div ref={containerRef} className="terminal-body--hero" style={{ height: 160 }}>
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          {line.type === 'cmd' ? (
            <div className="terminal-line">
              <span className="terminal-prompt">$</span>
              <span className="terminal-command" dangerouslySetInnerHTML={{ __html: line.html }} />
            </div>
          ) : (
            <div className="terminal-output" dangerouslySetInnerHTML={{ __html: line.html }} />
          )}
        </motion.div>
      ))}
    </div>
  )
}
