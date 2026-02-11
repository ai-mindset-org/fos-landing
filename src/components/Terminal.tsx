import type { ReactNode } from 'react'

export function Terminal({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <div className={`terminal ${className}`}>
      <div className="terminal-header">
        <span className="terminal-dot red" />
        <span className="terminal-dot yellow" />
        <span className="terminal-dot green" />
        <span className="terminal-title">{title}</span>
      </div>
      <div className="terminal-body">
        {children}
      </div>
    </div>
  )
}

export function TLine({ prompt = '$', cmd, children }: { prompt?: string; cmd?: string; children?: ReactNode }) {
  return (
    <>
      {cmd && (
        <div className="terminal-line">
          <span className="terminal-prompt">{prompt}</span>
          <span className="terminal-command" dangerouslySetInnerHTML={{ __html: cmd }} />
        </div>
      )}
      {children && <div className="terminal-output">{children}</div>}
    </>
  )
}
