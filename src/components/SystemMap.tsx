import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const nodes = [
  { label: 'prerequisite', title: 'POS pre-recordings', sub: 'базовый AI-стек' },
  { label: 'week 01', title: 'Personal OS + Skills', sub: 'identity, контекст, навыки' },
  { label: 'week 02', title: 'Business OS', sub: 'онтология, agent infra' },
  { label: 'week 03', title: 'Company Functions', sub: 'маркетинг, sales, ROI' },
  { label: 'финал', title: 'Demo Day', sub: 'roadmap 90 дней' },
]

function Diamond() {
  return (
    <div className="journey-connector">
      <div className="journey-line" />
      <div className="journey-diamond" />
      <div className="journey-line" />
    </div>
  )
}

export function SystemMap() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div ref={ref} className="journey-track">
      {nodes.map((node, i) => (
        <div key={i} className="journey-item">
          {i > 0 && <Diamond />}
          <motion.div
            className="journey-node"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: i * 0.15 }}
          >
            <div className="journey-node-label">{node.label}</div>
            <div className="journey-node-title">{node.title}</div>
            <div className="journey-node-sub">{node.sub}</div>
          </motion.div>
        </div>
      ))}
    </div>
  )
}
