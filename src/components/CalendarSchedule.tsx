import { useState } from 'react';

type EventType = 'lecture' | 'workshop' | 'practice' | 'office-hours' | 'demo-day' | 'focus-session';

interface CalEvent {
  day: number;
  month: 3 | 4;
  time: string;
  type: EventType;
  title: string;
  speaker?: string;
}

const events: CalEvent[] = [
  // Week 1: Personal OS + Skills (23-28 March)
  { day: 23, month: 3, time: '18:00 CET', type: 'lecture', title: 'Agent-Centric Paradigm', speaker: 'Степан Гершуни' },
  { day: 25, month: 3, time: '18:00 CET', type: 'workshop', title: 'Установка Personal OS', speaker: 'Приглашённый эксперт' },
  { day: 27, month: 3, time: '18:00 CET', type: 'office-hours', title: 'Q&A, peer review', speaker: 'Степан + AIM' },
  // Week 2: Business OS + Agent Infrastructure (30 March - 4 April)
  { day: 30, month: 3, time: '18:00 CET', type: 'lecture', title: 'Firm as a token flow. Context graph. Security', speaker: 'Степан Гершуни' },
  { day: 1, month: 4, time: '18:00 CET', type: 'workshop', title: 'Модель данных компании. Agent infrastructure', speaker: 'Приглашённый эксперт' },
  { day: 3, month: 4, time: '18:00 CET', type: 'office-hours', title: 'Peer review онтологий', speaker: 'Степан + AIM' },
  // Week 3: Company Functions + Guest Speakers (6-11 April)
  { day: 6, month: 4, time: '18:00 CET', type: 'lecture', title: 'Масштабирование. AI Champions. Новые роли', speaker: 'Степан Гершуни' },
  { day: 8, month: 4, time: '18:00 CET', type: 'workshop', title: 'Автоматизация процесса: маркетинг/sales/operations', speaker: 'Гость-эксперт' },
  { day: 10, month: 4, time: '18:00 CET', type: 'practice', title: 'Подготовка к Demo Day', speaker: 'AIM' },
  { day: 11, month: 4, time: '12:00 CET', type: 'demo-day', title: 'Demo Day — Презентация roadmaps' },
];

const weekLabels: Record<number, string> = {
  1: 'Week 1: Personal OS + Skills',
  2: 'Week 2: Business OS + Agent Infrastructure',
  3: 'Week 3: Company Functions + Guest Speakers',
};

const typeLabels: Record<EventType, string> = {
  lecture: 'Lecture',
  workshop: 'Workshop',
  practice: 'Practice',
  'office-hours': 'Office Hours',
  'demo-day': 'Demo Day',
  'focus-session': 'Focus Session',
};

const typeColors: Record<EventType, string> = {
  lecture: 'var(--cyan)',
  workshop: 'var(--green)',
  practice: 'var(--amber)',
  'office-hours': 'var(--gray)',
  'demo-day': 'var(--pink)',
  'focus-session': 'var(--purple, #a78bfa)',
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

interface MonthGridProps {
  month: 3 | 4;
  year: number;
  selectedDay: { day: number; month: number } | null;
  hoveredDay: { day: number; month: number } | null;
  activeWeek: number | null;
  onSelect: (day: number, month: 3 | 4) => void;
  onHover: (day: number, month: 3 | 4) => void;
  onLeave: () => void;
}

function MonthGrid({ month, year, selectedDay, hoveredDay, activeWeek, onSelect, onHover, onLeave }: MonthGridProps) {
  const totalDays = getDaysInMonth(month, year);
  const firstDay = getFirstDayOfWeek(month, year);
  const monthName = month === 3 ? 'March 2026' : 'April 2026';

  const cells: (number | null)[] = [];
  for (let i = 0; i < firstDay; i++) cells.push(null);
  for (let d = 1; d <= totalDays; d++) cells.push(d);

  const sprintStart = month === 3 ? 23 : 1;
  const sprintEnd = month === 3 ? 31 : 11;

  return (
    <div className="cal-month">
      <div className="cal-month-title">{monthName}</div>
      <div className="cal-grid">
        {dayNames.map(d => (
          <div key={d} className="cal-header">{d}</div>
        ))}
        {cells.map((day, i) => {
          if (day === null) {
            return <div key={`empty-${i}`} className="cal-day cal-empty" />;
          }
          const evs = getEventsForDay(day, month as 3 | 4);
          const week = getWeekNumber(day, month as 3 | 4);
          const inSprint = day >= sprintStart && day <= sprintEnd && week !== null;
          const isSelected = selectedDay?.day === day && selectedDay?.month === month;
          const isHovered = hoveredDay?.day === day && hoveredDay?.month === month;
          const dimmed = activeWeek !== null && week !== activeWeek;
          const primaryEv = evs[0];
          const showTooltip = isHovered && !isSelected && evs.length > 0;

          return (
            <div
              key={day}
              className={[
                'cal-day',
                inSprint ? 'cal-sprint' : '',
                primaryEv ? `cal-${primaryEv.type}` : '',
                week ? `cal-week-${week}` : '',
                isSelected ? 'cal-day-selected' : '',
                dimmed ? 'cal-day-dimmed' : '',
                evs.length > 0 ? 'cal-day-has-events' : '',
              ].filter(Boolean).join(' ')}
              onClick={() => evs.length > 0 && onSelect(day, month as 3 | 4)}
              onMouseEnter={() => evs.length > 0 && onHover(day, month as 3 | 4)}
              onMouseLeave={onLeave}
            >
              <span className="cal-day-num">{day}</span>
              {evs.length > 0 && (
                <span className="cal-day-dots">
                  {evs.map((ev, idx) => (
                    <span key={idx} className="cal-day-dot" style={{ background: typeColors[ev.type] }} />
                  ))}
                </span>
              )}
              {showTooltip && (
                <div className="cal-tooltip">
                  {evs.map((ev, idx) => (
                    <div key={idx} className={idx > 0 ? 'cal-tooltip-event-sep' : ''}>
                      <div className="cal-tooltip-type" style={{ color: typeColors[ev.type] }}>{typeLabels[ev.type]}</div>
                      <div className="cal-tooltip-title">{ev.title}</div>
                      <div className="cal-tooltip-time">{ev.time}</div>
                      {ev.speaker && <div className="cal-tooltip-speaker">{ev.speaker}</div>}
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

function DayDetail({ day, month, onClose }: { day: number; month: 3 | 4; onClose: () => void }) {
  const evs = getEventsForDay(day, month);
  const week = getWeekNumber(day, month);
  const weekName = week ? weekLabels[week] : '';
  const dateStr = `${day} ${month === 3 ? 'марта' : 'апреля'} 2026`;

  return (
    <div className="cal-day-detail">
      <div className="cal-day-detail-header">
        <div>
          <span className="cal-day-detail-date">{dateStr}</span>
          {weekName && <span className="cal-day-detail-week">{weekName}</span>}
        </div>
        <button className="cal-day-detail-close" onClick={onClose}>[x]</button>
      </div>
      <div className="cal-day-detail-events">
        {evs.map((ev, idx) => (
          <div key={idx} className="cal-day-detail-event">
            <div className="cal-day-detail-type" style={{ color: typeColors[ev.type] }}>
              {typeLabels[ev.type]}
            </div>
            <div className="cal-day-detail-title">{ev.title}</div>
            <div className="cal-day-detail-time">{ev.time}</div>
            {ev.speaker && <div className="cal-day-detail-speaker">{ev.speaker}</div>}
          </div>
        ))}
      </div>
    </div>
  );
}

export function CalendarSchedule() {
  const [selectedDay, setSelectedDay] = useState<{ day: number; month: 3 | 4 } | null>(null);
  const [hoveredDay, setHoveredDay] = useState<{ day: number; month: number } | null>(null);
  const [activeWeek, setActiveWeek] = useState<number | null>(null);

  const handleSelect = (day: number, month: 3 | 4) => {
    if (selectedDay?.day === day && selectedDay?.month === month) {
      setSelectedDay(null);
    } else {
      setSelectedDay({ day, month });
    }
  };

  const handleWeekClick = (week: number) => {
    setActiveWeek(activeWeek === week ? null : week);
  };

  return (
    <div className="cal-schedule">
      <div className="cal-schedule-title">// расписание спринта</div>
      <div className="cal-schedule-subtitle">23 марта &ndash; 11 апреля 2026 &middot; 3 недели &middot; ~6 часов в неделю &middot; CET</div>
      <div className="cal-week-labels">
        {Object.entries(weekLabels).map(([num, label]) => (
          <button
            key={num}
            className={`cal-week-label cal-week-label-${num} ${activeWeek === Number(num) ? 'cal-week-label-active' : ''}`}
            onClick={() => handleWeekClick(Number(num))}
          >
            {label}
          </button>
        ))}
      </div>
      <div className="cal-months">
        <MonthGrid
          month={3}
          year={2026}
          selectedDay={selectedDay}
          hoveredDay={hoveredDay}
          activeWeek={activeWeek}
          onSelect={handleSelect}
          onHover={(d, m) => setHoveredDay({ day: d, month: m })}
          onLeave={() => setHoveredDay(null)}
        />
        <MonthGrid
          month={4}
          year={2026}
          selectedDay={selectedDay}
          hoveredDay={hoveredDay}
          activeWeek={activeWeek}
          onSelect={handleSelect}
          onHover={(d, m) => setHoveredDay({ day: d, month: m })}
          onLeave={() => setHoveredDay(null)}
        />
      </div>

      {selectedDay && (
        <DayDetail
          day={selectedDay.day}
          month={selectedDay.month}
          onClose={() => setSelectedDay(null)}
        />
      )}

      <div className="cal-legend">
        <span className="cal-legend-item"><span className="cal-legend-swatch cal-legend-lecture" /> Lecture</span>
        <span className="cal-legend-item"><span className="cal-legend-swatch cal-legend-workshop" /> Workshop</span>
        <span className="cal-legend-item"><span className="cal-legend-swatch cal-legend-practice" /> Practice</span>
        <span className="cal-legend-item"><span className="cal-legend-swatch cal-legend-office" /> Office Hours</span>
        <span className="cal-legend-item"><span className="cal-legend-swatch cal-legend-demo" /> Demo Day</span>
      </div>
      <div className="cal-week-details">
        <div className={`cal-week-detail ${activeWeek !== null && activeWeek !== 1 ? 'cal-week-detail-dimmed' : ''}`}>
          <div className="cal-week-detail-title cal-week-label-1">week 1 // personal OS + skills</div>
          <div className="cal-week-detail-list">
            <div>Mon 23 Mar 18:00 CET &mdash; лекция: Agent-Centric Paradigm (Степан Гершуни)</div>
            <div>Wed 25 Mar 18:00 CET &mdash; воркшоп: Установка Personal OS (Приглашённый эксперт)</div>
            <div>Fri 27 Mar 18:00 CET &mdash; office hours: Q&A, peer review (Степан + AIM)</div>
          </div>
        </div>
        <div className={`cal-week-detail ${activeWeek !== null && activeWeek !== 2 ? 'cal-week-detail-dimmed' : ''}`}>
          <div className="cal-week-detail-title cal-week-label-2">week 2 // business OS + agent infrastructure</div>
          <div className="cal-week-detail-list">
            <div>Mon 30 Mar 18:00 CET &mdash; лекция: Firm as a token flow. Context graph. Security (Степан Гершуни)</div>
            <div>Wed 1 Apr 18:00 CET &mdash; воркшоп: Модель данных компании. Agent infrastructure (Приглашённый эксперт)</div>
            <div>Fri 3 Apr 18:00 CET &mdash; office hours: Peer review онтологий (Степан + AIM)</div>
          </div>
        </div>
        <div className={`cal-week-detail ${activeWeek !== null && activeWeek !== 3 ? 'cal-week-detail-dimmed' : ''}`}>
          <div className="cal-week-detail-title cal-week-label-3">week 3 // company functions + guest speakers</div>
          <div className="cal-week-detail-list">
            <div>Mon 6 Apr 18:00 CET &mdash; лекция: Масштабирование. AI Champions. Новые роли (Степан Гершуни)</div>
            <div>Wed 8 Apr 18:00 CET &mdash; воркшоп: Автоматизация процесса: маркетинг/sales/operations (Гость-эксперт)</div>
            <div>Fri 10 Apr 18:00 CET &mdash; подготовка к Demo Day (AIM)</div>
            <div>Sat 11 Apr 12:00 CET &mdash; DEMO DAY: Презентация roadmaps</div>
          </div>
        </div>
      </div>
    </div>
  );
}
