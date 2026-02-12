import { type ReactNode } from 'react'

export function GlitchText({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <span className={`glitch-text ${className}`} data-text={typeof children === 'string' ? children : ''}>
      {children}
    </span>
  )
}
