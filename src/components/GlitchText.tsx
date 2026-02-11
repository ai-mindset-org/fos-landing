import { useEffect, useState, createElement } from 'react'

export function GlitchText({ text, tag = 'h1' }: { text: string; tag?: string }) {
  const [glitching, setGlitching] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setGlitching(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return createElement(tag, {
    className: glitching ? 'glitch-text' : '',
    'data-text': text,
    dangerouslySetInnerHTML: { __html: text },
  })
}
