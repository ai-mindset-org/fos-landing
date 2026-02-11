import { Reveal } from './Reveal'

const skills = [
  { cmd: '/daily-brief', desc: 'утренний бриф' },
  { cmd: '/research', desc: 'глубокий ресёрч' },
  { cmd: '/draft', desc: 'черновик документа' },
  { cmd: '/calendar', desc: 'расписание' },
  { cmd: '/eval', desc: 'оценка качества ответа AI' },
  { cmd: '/dd', desc: 'auto due diligence' },
  { cmd: '/ontology', desc: 'контекстная карта компании' },
  { cmd: '/automate', desc: 'автоматизация процесса' },
  { cmd: '/meeting-prep', desc: 'подготовка к встрече' },
  { cmd: '/pipeline-review', desc: 'обзор sales pipeline' },
  { cmd: '/agents', desc: 'микро-переговоры агентов' },
  { cmd: '/roi-calc', desc: 'расчёт ROI автоматизации' },
] as const

export function SkillsSection() {
  return (
    <section id="skills">
      <div className="container">
        <Reveal>
          <div className="section-label">// навыки</div>
          <h2 className="section-title">библиотека навыков</h2>
          <p className="section-subtitle">
            slash-команды для работы с AI. каждая с оценкой и автоматизацией.
          </p>
        </Reveal>

        <Reveal>
          <div className="skills-list" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px 32px' }}>
            {skills.map((skill) => (
              <div key={skill.cmd} className="skill-item">
                <span className="skill-cmd">{skill.cmd}</span>
                <span className="skill-desc"> &mdash; {skill.desc}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal>
          <div style={{ textAlign: 'center', marginTop: 32 }}>
            <a href="/downloads/bos-skills-pack.md" download className="btn btn-outline">
              скачать skills pack
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
