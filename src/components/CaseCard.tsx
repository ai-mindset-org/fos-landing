import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CaseCard({ label, title, desc, detail, before, after }: {
  label: string
  title: string
  desc?: string
  detail?: string
  before?: string
  after?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`case-card ${label === 'ПРАКТИКА' ? 'case-card--practice' : 'case-card--artifact'}`}>
      <div className="case-label">{label}</div>
      <h4 className="case-title">{title}</h4>
      {before && after ? (
        <div className="case-ba">
          <div className="case-ba-row case-ba-before">
            <span className="case-ba-tag">до</span>
            <span>{before}</span>
          </div>
          <div className="case-ba-row case-ba-after">
            <span className="case-ba-tag case-ba-tag--after">после</span>
            <span>{after}</span>
          </div>
        </div>
      ) : (
        <p className="case-desc">{desc}</p>
      )}
      {detail && (
        <>
          <button onClick={() => setOpen(!open)} className="case-detail-toggle">
            {open ? '-- скрыть' : '+ детали'}
          </button>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="case-detail"
              >
                <p>{detail}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </div>
  )
}
