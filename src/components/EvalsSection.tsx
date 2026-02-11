import { Reveal } from './Reveal'

const evals = [
  {
    rank: 'T',
    area: 'text',
    criteria: 'структура, ясность, инсайты, actionable',
  },
  {
    rank: 'R',
    area: 'rules',
    criteria: 'naming, папки, форматирование, конвенции',
  },
  {
    rank: 'C',
    area: 'code',
    criteria: 'работает, минимализм, идиоматичность',
  },
] as const

export function EvalsSection() {
  return (
    <section id="evals">
      <div className="container">
        <Reveal>
          <div className="section-label">// evals</div>
          <h2 className="section-title">система оценки качества</h2>
          <p className="section-subtitle">
            binary pass/fail для каждого ответа AI.
          </p>
        </Reveal>

        <Reveal>
          <div className="eval-badges">
            {evals.map((ev) => (
              <div key={ev.rank} className="eval-badge">
                <div className="eval-badge-rank">{ev.rank}</div>
                <div className="eval-badge-info">
                  <div className="eval-badge-area">{ev.area}</div>
                  <div className="eval-badge-criteria">{ev.criteria}</div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div className="eval-inline">
            <span>▫ eval: </span>
            <span>T:</span><span className="eval-pass">&#x2713;</span>
            <span> R:</span><span className="eval-pass">&#x2713;</span>
            <span> C:</span><span className="eval-na">&#x25CB;</span>
          </div>
        </Reveal>

        <Reveal>
          <div className="inline-quote">
            &laquo;evals are the new PRD&raquo; &ndash; Hamel Husain
          </div>
        </Reveal>
      </div>
    </section>
  )
}
