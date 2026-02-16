import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const nodes = [
  {
    label: 'prerequisite',
    title: 'POS PRE-RECORDINGS',
    sub: 'базовый AI-стек: Claude Code, Obsidian, MCP',
    detail: 'отдельная программа — выдаётся за 2 нед до старта',
    link: 'https://aimindset.org/sprint-pos',
    type: 'hollow' as const
  },
  {
    label: 'week 01',
    title: 'PERSONAL OS + TEAM PROCESSES',
    sub: 'от личных навыков к командным процессам',
    detail: 'артефакт: персональная OS, командные автоматизации, список 10 процессов',
    type: 'active' as const
  },
  {
    label: 'week 02',
    title: 'INFRASTRUCTURE + ОНТОЛОГИЯ',
    sub: 'компания становится читаемой для AI',
    detail: 'артефакт: онтология компании, access rights, плейбук внедрения',
    type: 'active' as const
  },
  {
    label: 'week 03',
    title: 'COMPANY FUNCTIONS + ROI',
    sub: 'конкретные бизнес-процессы с метриками',
    detail: 'артефакт: автоматизированный процесс, 90-дневный план, межагентная коммуникация',
    type: 'active' as const
  },
  {
    label: 'финал',
    title: 'DEMO DAY',
    sub: 'презентация roadmaps + 90-day plan',
    detail: 'обратная связь от группы и экспертов',
    type: 'demo' as const
  },
]

export function SystemMap() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="gitlog">
      {nodes.map((node, i) => (
        <motion.div
          key={i}
          className="gitlog-row"
          initial={{ opacity: 0, x: -16 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.35, delay: i * 0.12 }}
        >
          {/* Vertical line + dot */}
          <div className="gitlog-rail">
            {i > 0 && <div className="gitlog-line gitlog-line--top" />}
            <div className={`gitlog-dot gitlog-dot--${node.type}`} />
            {i < nodes.length - 1 && <div className="gitlog-line gitlog-line--bottom" />}
          </div>

          {/* Text content */}
          <div className="gitlog-content">
            <span className="gitlog-label">{node.label}</span>
            <span className="gitlog-sep"> — </span>
            {node.link ? (
              <a className="gitlog-title" href={node.link} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none', color: 'inherit' }}>{node.title}</a>
            ) : (
              <span className="gitlog-title">{node.title}</span>
            )}
            <div className="gitlog-sub">{node.sub}</div>
            {node.detail && <div className="gitlog-detail">{node.detail}</div>}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
