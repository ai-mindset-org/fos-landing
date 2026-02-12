import { useState } from 'react';

type EventType = 'lecture' | 'workshop' | 'office-hours' | 'demo-day';

interface CalEvent {
  day: number;
  month: 3 | 4;
  type: EventType;
  title: string;
  week?: number;
}

const events: CalEvent[] = [
  { day: 23, month: 3, type: 'lecture', title: 'Lecture: Personal OS', week: 1 },
  { day: 25, month: 3, type: 'workshop', title: 'Workshop', week: 1 },
  { day: 26, month: 3, type: 'office-hours', title: 'Office Hours', week: 1 },
  { day: 28, month: 3, type: 'lecture', title: 'Lecture', week: 1 },
  { day: 30, month: 3, type: 'lecture', title: 'Lecture: Business OS', week: 2 },
  { day: 1, month: 4, type: 'workshop', title: 'Workshop', week: 2 },
  { day: 2, month: 4, type: 'office-hours', title: 'Office Hours', week: 2 },
  { day: 4, month: 4, type: 'lecture', title: 'Lecture', week: 2 },
  { day: 6, month: 4, type: 'lecture', title: 'Lecture: Company Functions', week: 3 },
  { day: 8, month: 4, type: 'workshop', title: 'Workshop', week: 3 },
  { day: 9, month: 4, type: 'office-hours', title: 'Office Hours', week: 3 },
  { day: 11, month: 4, type: 'demo-day', title: 'Lecture + Demo Day', week: 3 },
];

const typeLabels: Record<EventType, string> = {
  lecture: 'Lecture',
  workshop: 'Workshop',
  'office-hours': 'Office Hours',
  'demo-day': 'Demo Day',
};

const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

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

function isInSprint(day: number, month: 3 | 4): boolean {
  if (month === 3) return day >= 23 && day <= 31;
  if (month === 4) return day >= 1 && day <= 11;
  return false;
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
  const monthName = month === 3 ? 'MARCH' : 'APRIL';

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  return (
    <div className="cal2-month">
      <div className="cal2-month-title">{monthName}</div>
      <div className="cal2-grid">
        {dayNames.map(d => (
          <div key={d} className="cal2-weekday">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="cal2-cell cal2-empty" />;
          }

          const evs = getEventsForDay(day, month);
          const inSprint = isInSprint(day, month);
          const primaryEv = evs[0];
          const isHovered = hoveredDay?.day === day && hoveredDay?.month === month;

          let cellClass = 'cal2-cell';
          if (!inSprint) {
            cellClass += ' cal2-inactive';
          } else if (primaryEv) {
            cellClass += ` cal2-${primaryEv.type}`;
          } else {
            cellClass += ' cal2-sprint-empty';
          }

          return (
            <div
              key={day}
              className={cellClass}
              onMouseEnter={() => evs.length > 0 && onHover(day, month)}
              onMouseLeave={onLeave}
            >
              <span className="cal2-day-num">{day}</span>
              {primaryEv?.type === 'demo-day' && <span className="cal2-red-dot" />}
              {isHovered && evs.length > 0 && (
                <div className="cal2-tooltip">
                  <div className="cal2-tooltip-arrow" />
                  {evs.map((ev, idx) => (
                    <div key={idx}>
                      <div className="cal2-tooltip-type">{typeLabels[ev.type]}</div>
                      <div className="cal2-tooltip-title">{ev.title}</div>
                      {ev.week && <div className="cal2-tooltip-week">Week {ev.week}</div>}
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
    <div className="cal2-wrap">
      <div className="cal2-title">// sprint schedule</div>
      <div className="cal2-subtitle">March 23 &ndash; April 11, 2026 &middot; 3 weeks &middot; ~6 hrs/week &middot; CET</div>
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
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-lecture" /> lecture</span>
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-workshop" /> workshop</span>
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-office" /> office hours</span>
        <span className="cal2-legend-item"><span className="cal2-legend-swatch cal2-legend-demo" /> demo day</span>
      </div>
    </div>
  );
}
