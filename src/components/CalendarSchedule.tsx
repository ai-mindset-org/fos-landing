import { useState } from 'react';

type EventType = 'lecture' | 'workshop' | 'practice' | 'office-hours' | 'demo-day';

interface CalEvent {
  day: number;
  month: 3 | 4;
  time: string;
  type: EventType;
  title: string;
  speaker?: string;
}

const events: CalEvent[] = [
  { day: 23, month: 3, time: '18:00 CET', type: 'lecture', title: 'Agent-Centric Paradigm', speaker: 'Степан Гершуни' },
  { day: 25, month: 3, time: '18:00 CET', type: 'workshop', title: 'Установка Personal OS', speaker: 'Приглашённый эксперт' },
  { day: 27, month: 3, time: '18:00 CET', type: 'office-hours', title: 'Q&A, peer review', speaker: 'Степан + AIM' },
  { day: 30, month: 3, time: '18:00 CET', type: 'lecture', title: 'Онтология компании. Безопасность и доступ', speaker: 'Степан Гершуни' },
  { day: 1, month: 4, time: '18:00 CET', type: 'workshop', title: 'Модель данных компании. Agent infrastructure', speaker: 'Приглашённый эксперт' },
  { day: 3, month: 4, time: '18:00 CET', type: 'office-hours', title: 'Peer review онтологий', speaker: 'Степан + AIM' },
  { day: 6, month: 4, time: '18:00 CET', type: 'lecture', title: 'Масштабирование. AI Champions. Новые роли', speaker: 'Степан Гершуни' },
  { day: 8, month: 4, time: '18:00 CET', type: 'workshop', title: 'Автоматизация процесса: маркетинг/sales/operations', speaker: 'Гость-эксперт' },
  { day: 10, month: 4, time: '18:00 CET', type: 'practice', title: 'Подготовка к Demo Day', speaker: 'AIM' },
  { day: 11, month: 4, time: '12:00 CET', type: 'demo-day', title: 'Demo Day — Презентация roadmaps' },
];

const typeLabels: Record<EventType, string> = {
  lecture: 'Лекция',
  workshop: 'Воркшоп',
  practice: 'Практика',
  'office-hours': 'Office Hours',
  'demo-day': 'Demo Day',
};

function getDaysInMonth(month: number, year: number) {
  return new Date(year, month, 0).getDate();
}

function getFirstDayOfWeek(month: number, year: number) {
  const d = new Date(year, month - 1, 1).getDay();
  return d === 0 ? 6 : d - 1;
}

function getEventsForDay(day: number, month: 3 | 4): CalEvent[] {
  return events.filter(e => e.day === day && e.month === month);
}

function getWeekNumber(day: number, month: 3 | 4): number | null {
  if (month === 3 && day >= 23 && day <= 28) return 1;
  if ((month === 3 && day >= 30) || (month === 4 && day <= 4)) return 2;
  if (month === 4 && day >= 6 && day <= 11) return 3;
  return null;
}

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

function getTypeClass(type: EventType): string {
  switch (type) {
    case 'lecture': return 'cal2-lecture';
    case 'workshop': return 'cal2-workshop';
    case 'office-hours': return 'cal2-office';
    case 'practice': return 'cal2-practice';
    case 'demo-day': return 'cal2-demo';
    default: return '';
  }
}

interface MonthGridProps {
  month: 3 | 4;
  year: number;
  hoveredDay: { day: number; month: number } | null;
  onHover: (day: number, month: 3 | 4) => void;
  onLeave: () => void;
}

function MonthGrid({ month, year, hoveredDay, onHover, onLeave }: MonthGridProps) {
  const totalDays = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfWeek(month, year);
  const monthName = month === 3 ? 'March 2026' : 'April 2026';

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  return (
    <div className="cal2-month">
      <div className="cal2-month-title">{monthName}</div>
      <div className="cal2-grid">
        {dayNames.map(d => (
          <div key={d} className="cal2-header">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="cal2-cell cal2-empty" />;
          }
          const evs = getEventsForDay(day, month as 3 | 4);
          const week = getWeekNumber(day, month as 3 | 4);
          const inSprint = week !== null;
          const primaryEv = evs[0];
          const isHovered = hoveredDay?.day === day && hoveredDay?.month === month;

          return (
            <div
              key={day}
              className={[
                'cal2-cell',
                inSprint ? 'cal2-sprint' : '',
                primaryEv ? getTypeClass(primaryEv.type) : '',
                evs.length > 0 ? 'cal2-has-event' : '',
              ].filter(Boolean).join(' ')}
              onMouseEnter={() => evs.length > 0 && onHover(day, month as 3 | 4)}
              onMouseLeave={onLeave}
            >
              <span className="cal2-day-num">{day}</span>
              {primaryEv?.type === 'demo-day' && <span className="cal2-demo-dot" />}
              {isHovered && evs.length > 0 && (
                <div className="cal2-tooltip">
                  <div className="cal2-tooltip-arrow" />
                  {evs.map((ev, idx) => (
                    <div key={idx} className={idx > 0 ? 'cal2-tooltip-sep' : ''}>
                      <div className="cal2-tooltip-type">{typeLabels[ev.type]}</div>
                      <div className="cal2-tooltip-title">{ev.title}</div>
                      <div className="cal2-tooltip-time">{ev.time}</div>
                      {ev.speaker && <div className="cal2-tooltip-speaker">{ev.speaker}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function CalendarSchedule() {
  const [hoveredDay, setHoveredDay] = useState<{ day: number; month: number } | null>(null);

  return (
    <div className="cal2-schedule">
      <div className="cal2-schedule-title">// расписание спринта</div>
      <div className="cal2-schedule-subtitle">23 марта &ndash; 11 апреля 2026 &middot; 3 недели &middot; ~6 часов в неделю &middot; CET</div>
      <div className="cal2-months">
        <MonthGrid
          month={3}
          year={2026}
          hoveredDay={hoveredDay}
          onHover={(d, m) => setHoveredDay({ day: d, month: m })}
          onLeave={() => setHoveredDay(null)}
        />
        <MonthGrid
          month={4}
          year={2026}
          hoveredDay={hoveredDay}
          onHover={(d, m) => setHoveredDay({ day: d, month: m })}
          onLeave={() => setHoveredDay(null)}
        />
      </div>

      <div className="cal2-legend">
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-lecture" /> лекция</span>
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-workshop" /> воркшоп</span>
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-practice" /> практика</span>
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-office" /> office hours</span>
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-demo" /> demo day</span>
      </div>
    </div>
  );
}
