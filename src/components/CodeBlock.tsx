import type { ReactNode } from 'react'

export function CodeBlock({ title, children }: { title?: string; children: ReactNode }) {
  return (
    <div className="code-block">
      {title && <div className="code-block-title">{title}</div>}
      <div className="code-content">
        {children}
      </div>
    </div>
  )
}
