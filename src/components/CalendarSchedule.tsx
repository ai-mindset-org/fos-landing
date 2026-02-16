import { useState, useEffect, useRef } from 'react';

type EventType = 'lecture' | 'workshop' | 'office-hours' | 'prep' | 'demo-day' | 'bonus' | 'focus';

interface SprintDay {
  date: number;
  month: 3 | 4;
  dow: string;
  type?: EventType;
  label?: string;
  time?: string;
  who?: string;
}

const weeks: SprintDay[][] = [
  // Week 1: Mar 23-29 (Mon-Sun)
  [
    { date: 23, month: 3, dow: 'Mon', type: 'lecture', label: 'Agent-Centric Paradigm', time: '18:00 CET', who: 'Степан' },
    { date: 24, month: 3, dow: 'Tue', type: 'focus', label: 'Фокус-сессия: co-working', time: '12:00 CET', who: 'AIM' },
    { date: 25, month: 3, dow: 'Wed', type: 'workshop', label: 'Установка Personal OS', time: '18:00 CET', who: 'Guest' },
    { date: 26, month: 3, dow: 'Thu' },
    { date: 27, month: 3, dow: 'Fri', type: 'bonus', label: 'гостевая лекция', time: '18:00 CET', who: 'Team' },
    { date: 28, month: 3, dow: 'Sat', type: 'office-hours', label: 'Office Hours', time: '12:00 CET', who: 'Team' },
    { date: 29, month: 3, dow: 'Sun' },
  ],
  // Week 2: Mar 30 - Apr 5 (Mon-Sun)
  [
    { date: 30, month: 3, dow: 'Mon', type: 'lecture', label: 'Firm as token flow, Ontology', time: '18:00 CET', who: 'Степан' },
    { date: 31, month: 3, dow: 'Tue', type: 'focus', label: 'Фокус-сессия: co-working', time: '12:00 CET', who: 'AIM' },
    { date: 1, month: 4, dow: 'Wed', type: 'workshop', label: 'Data model, Skills, Agent infra', time: '18:00 CET', who: 'Guest' },
    { date: 2, month: 4, dow: 'Thu' },
    { date: 3, month: 4, dow: 'Fri', type: 'bonus', label: 'гостевая лекция', time: '18:00 CET', who: 'Team' },
    { date: 4, month: 4, dow: 'Sat', type: 'office-hours', label: 'Office Hours', time: '12:00 CET', who: 'Team' },
    { date: 5, month: 4, dow: 'Sun' },
  ],
  // Week 3: Apr 6-12 (Mon-Sun)
  [
    { date: 6, month: 4, dow: 'Mon', type: 'lecture', label: 'Scaling, AI Champions', time: '18:00 CET', who: 'Степан' },
    { date: 7, month: 4, dow: 'Tue', type: 'focus', label: 'Фокус-сессия: co-working', time: '12:00 CET', who: 'AIM' },
    { date: 8, month: 4, dow: 'Wed', type: 'workshop', label: 'Company function + ROI', time: '18:00 CET', who: 'Guest-expert' },
    { date: 9, month: 4, dow: 'Thu' },
    { date: 10, month: 4, dow: 'Fri', type: 'bonus', label: 'гостевая лекция + подготовка к Demo Day', time: '18:00 CET', who: 'Team' },
    { date: 11, month: 4, dow: 'Sat', type: 'demo-day', label: 'Demo Day — Презентация roadmaps', time: '12:00 CET', who: 'All' },
    { date: 12, month: 4, dow: 'Sun' },
  ],
];

const weekLabels = ['W1 Personal OS', 'W2 Infrastructure', 'W3 Company Functions'];
const dowHeaders = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

const CUBE_SIZE = 40;
const CUBE_GAP = 4;
const CUBE_RADIUS = 4;

const eventColors: Record<EventType, string> = {
  'lecture': '#64b5d9',
  'workshop': '#38d9a9',
  'office-hours': 'transparent',
  'prep': 'rgba(255,255,255,0.15)',
  'demo-day': '#ff6b6b',
  'bonus': '#da77f2',
  'focus': '#7cc8e6',
};

const eventLabelsShort: Record<EventType, string> = {
  'lecture': 'Лекция',
  'workshop': 'Воркшоп',
  'office-hours': 'Office Hrs',
  'prep': 'Prep',
  'demo-day': 'Demo Day',
  'bonus': 'Бонус',
  'focus': 'Фокус',
};



function monthName(m: 3 | 4): string {
  return m === 3 ? 'марта' : 'апреля';
}

export function CalendarSchedule() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const weekLabelWidth = 120;
  const gridWidth = weekLabelWidth + (CUBE_SIZE + CUBE_GAP) * 7;

  return (
    <div className="sprint-timeline" ref={containerRef} style={{ maxWidth: gridWidth + 40 }}>
      <div className="sprint-header">
        <div className="sprint-title">// sprint schedule</div>
        <div className="sprint-sub">
          23 марта &ndash; 11 апреля 2026 &middot; 3 weeks &middot; ~6h/week &middot; CET
        </div>
      </div>

      {/* DOW headers */}
      <div style={{
        display: 'flex',
        marginLeft: weekLabelWidth,
        gap: CUBE_GAP,
        marginBottom: 6,
      }}>
        {dowHeaders.map((d) => (
          <div
            key={d}
            style={{
              width: CUBE_SIZE,
              textAlign: 'center',
              fontSize: 9,
              fontWeight: 600,
              color: 'var(--cal-dow, rgba(255,255,255,0.4))',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-mono)',
              textTransform: 'uppercase' as const,
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Week rows */}
      {weeks.map((week, wi) => (
        <div key={wi} style={{ display: 'flex', alignItems: 'center', marginBottom: CUBE_GAP }}>
          {/* Week label */}
          <div style={{
            width: weekLabelWidth,
            paddingRight: 12,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 2,
            flexShrink: 0,
          }}>
            <span style={{
              fontSize: 11,
              fontWeight: 700,
              color: 'var(--accent-blue)',
              letterSpacing: '0.08em',
              fontFamily: 'var(--font-mono)',
              lineHeight: 1,
            }}>
              {weekLabels[wi].split(' ')[0]}
            </span>
            <span style={{
              fontSize: 9,
              color: 'var(--terminal-dim)',
              fontFamily: 'var(--font-mono)',
              letterSpacing: '0.03em',
              lineHeight: 1.3,
            }}>
              {weekLabels[wi].split(' ').slice(1).join(' ')}
            </span>
          </div>

          {/* Day cubes */}
          <div style={{ display: 'flex', gap: CUBE_GAP }}>
            {week.map((day, di) => {
              const key = `${wi}-${di}`;
              const isHovered = hovered === key;
              const isEvent = !!day.type;
              const isDemoDay = day.type === 'demo-day';
              const isOfficeHours = day.type === 'office-hours';
              const isPrep = day.type === 'prep';
              const isBonus = day.type === 'bonus';
              const isFocus = day.type === 'focus';
              const flatIndex = wi * 7 + di;

              // Cube background
              const isWorkshop = day.type === 'workshop';
              let bg = 'var(--cal-empty, rgba(255,255,255,0.04))';
              if (isEvent && day.type) {
                if (isDemoDay) {
                  bg = isHovered ? 'rgba(255,107,107,0.35)' : 'rgba(255,107,107,0.2)';
                } else if (isOfficeHours) {
                  bg = isHovered ? 'var(--cal-oh-hover, rgba(255,255,255,0.06))' : 'transparent';
                } else if (isPrep) {
                  bg = isHovered ? 'var(--cal-prep-hover, rgba(255,255,255,0.2))' : 'var(--cal-prep, rgba(255,255,255,0.15))';
                } else if (isBonus) {
                  bg = isHovered ? 'rgba(218,119,242,0.35)' : 'rgba(218,119,242,0.2)';
                } else if (isFocus) {
                  bg = isHovered ? 'rgba(116,192,252,0.35)' : 'rgba(116,192,252,0.15)';
                } else if (isWorkshop) {
                  bg = isHovered ? 'rgba(56,217,169,0.4)' : 'rgba(56,217,169,0.25)';
                } else {
                  const color = eventColors[day.type];
                  bg = isHovered ? color : color;
                }
              }

              // Date text color
              let dateColor = 'var(--cal-date, rgba(255,255,255,0.2))';
              if (isEvent && day.type) {
                if (day.type === 'lecture' || day.type === 'workshop' || isBonus) {
                  dateColor = '#fff';
                } else if (isFocus) {
                  dateColor = 'rgba(116,192,252,0.9)';
                } else if (isDemoDay) {
                  dateColor = '#fff';
                } else if (isOfficeHours) {
                  dateColor = 'var(--cal-oh-text, rgba(255,255,255,0.5))';
                } else if (isPrep) {
                  dateColor = 'var(--cal-prep-text, rgba(255,255,255,0.6))';
                }
              }

              // Border
              let border = '1px solid transparent';
              if (isOfficeHours) {
                border = '1px dashed var(--cal-oh-border, rgba(255,255,255,0.15))';
              } else if (isFocus) {
                border = '1px solid rgba(116,192,252,0.3)';
              } else if (isWorkshop) {
                border = '2px solid rgba(56,217,169,0.5)';
              }

              // Box shadow for demo day glow
              let boxShadow = 'none';
              if (isDemoDay) {
                boxShadow = isHovered
                  ? '0 0 20px rgba(255,107,107,0.5), 0 0 40px rgba(255,107,107,0.2)'
                  : '0 0 12px rgba(255,107,107,0.3), 0 0 24px rgba(255,107,107,0.1)';
              } else if (isWorkshop) {
                boxShadow = isHovered
                  ? '0 0 16px rgba(56,217,169,0.4)'
                  : '0 0 8px rgba(56,217,169,0.15)';
              }

              return (
                <div
                  key={key}
                  onMouseEnter={() => isEvent && setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: CUBE_SIZE,
                    height: CUBE_SIZE,
                    borderRadius: CUBE_RADIUS,
                    background: bg,
                    border,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    cursor: isEvent ? 'none' : 'default',
                    transition: 'all 0.2s ease',
                    transform: isHovered && isEvent ? 'scale(1.15)' : 'scale(1)',
                    boxShadow,
                    opacity: visible ? 1 : 0,
                    animation: visible ? `calCubeFadeIn 0.35s ease ${flatIndex * 0.03}s both` : 'none',
                    zIndex: isHovered ? 10 : 1,
                  }}
                >
                  {/* Date number */}
                  <span style={{
                    fontSize: isDemoDay ? 12 : 11,
                    fontWeight: isDemoDay ? 800 : 600,
                    fontFamily: 'var(--font-mono)',
                    color: dateColor,
                    lineHeight: 1,
                    position: 'relative',
                    zIndex: 2,
                    userSelect: 'none',
                  }}>
                    {day.date}
                  </span>

                  {/* Workshop label indicator */}
                  {isWorkshop && (
                    <span style={{
                      position: 'absolute',
                      bottom: 2,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      fontSize: 7,
                      fontWeight: 700,
                      color: 'rgba(56,217,169,0.9)',
                      letterSpacing: '0.05em',
                      fontFamily: 'var(--font-mono)',
                      zIndex: 3,
                      textTransform: 'uppercase' as const,
                    }}>WS</span>
                  )}

                  {/* Demo Day persistent glow */}
                  {isDemoDay && (
                    <span style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      width: CUBE_SIZE + 8,
                      height: CUBE_SIZE + 8,
                      borderRadius: CUBE_RADIUS + 2,
                      transform: 'translate(-50%, -50%)',
                      background: 'rgba(255,107,107,0.1)',
                      animation: 'calDemoGlow 2s ease-in-out infinite',
                      zIndex: 0,
                      pointerEvents: 'none',
                    }} />
                  )}

                  {/* Tooltip */}
                  {isHovered && day.label && (
                    <div className="sprint-tooltip" style={{
                      bottom: 'calc(100% + 8px)',
                      left: '50%',
                      transform: 'translateX(-50%)',
                    }}>
                      <div className="sprint-tooltip-label">
                        {eventLabelsShort[day.type!]}: {day.label}
                      </div>
                      <div className="sprint-tooltip-meta">
                        {day.date} {monthName(day.month)} &middot; {day.time} &middot; {day.who}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Legend */}
      <div style={{
        display: 'flex',
        gap: 16,
        marginTop: 20,
        marginLeft: weekLabelWidth,
        flexWrap: 'wrap',
      }}>
        {([
          { type: 'lecture' as EventType, label: 'лекция', bg: '#64b5d9' },
          { type: 'workshop' as EventType, label: 'воркшоп', bg: '#38d9a9' },
          { type: 'bonus' as EventType, label: 'гостевая', bg: '#da77f2' },
          { type: 'focus' as EventType, label: 'фокус-сессия', bg: '#7cc8e6' },
          { type: 'office-hours' as EventType, label: 'office hours', bg: 'transparent', border: '1px dashed var(--cal-oh-border, rgba(255,255,255,0.4))' },
          { type: 'demo-day' as EventType, label: 'demo day', bg: '#ff6b6b' },
        ] as const).map((item) => (
          <span key={item.type} style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 11,
            color: 'var(--terminal-dim)',
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{
              width: 10,
              height: 10,
              borderRadius: 2,
              background: item.bg,
              border: 'border' in item ? item.border : 'none',
              flexShrink: 0,
            }} />
            {item.label}
          </span>
        ))}
      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes calCubeFadeIn {
          from { opacity: 0; transform: scale(0.7); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes calDotPulse {
          0%, 100% { opacity: 0.7; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.4); }
        }
        @keyframes calDemoGlow {
          0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
          50% { opacity: 0; transform: translate(-50%, -50%) scale(1.4); }
        }
      `}</style>
    </div>
  );
}
