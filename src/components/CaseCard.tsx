import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export function CaseCard({ label, title, desc, detail }: { label: string; title: string; desc: string; detail?: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="case-card">
      <div className="case-label">{label}</div>
      <h4 className="case-title">{title}</h4>
      <p className="case-desc">{desc}</p>
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
