// Visual metaphor SVG components

/* ── TokenStream ──
   3 connected boxes: INFO → DECIDE → ACT
   Animated dots flow between them via CSS keyframes
*/
export function TokenStream() {
  return (
    <div className="vm-token-stream">
      <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines */}
        <line x1="155" y1="60" x2="195" y2="60" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="315" y1="60" x2="355" y2="60" stroke="var(--border)" strokeWidth="1.5" />

        {/* INFO box */}
        <rect x="30" y="30" width="125" height="60" rx="4" fill="var(--bg-tertiary)" stroke="var(--dim)" strokeWidth="1.2" />
        <text x="92" y="66" textAnchor="middle" fill="var(--dim)" fontSize="13" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">INFO</text>

        {/* DECIDE box */}
        <rect x="195" y="25" width="120" height="70" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="255" y="66" textAnchor="middle" fill="var(--cyan)" fontSize="13" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">DECIDE</text>

        {/* ACT box */}
        <rect x="355" y="30" width="115" height="60" rx="4" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.2" />
        <text x="412" y="66" textAnchor="middle" fill="var(--green)" fontSize="13" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">ACT</text>

        {/* Flowing dots: segment 1 (INFO → DECIDE) */}
        <circle className="vm-dot vm-dot-1a" r="3.5" fill="var(--cyan)" opacity="0.9" />
        <circle className="vm-dot vm-dot-1b" r="3" fill="var(--cyan)" opacity="0.5" />

        {/* Flowing dots: segment 2 (DECIDE → ACT) */}
        <circle className="vm-dot vm-dot-2a" r="3.5" fill="var(--green)" opacity="0.9" />
        <circle className="vm-dot vm-dot-2b" r="3" fill="var(--green)" opacity="0.5" />
      </svg>
    </div>
  );
}

/* ── StackLayers ──
   5 vertically stacked rectangles: CONTEXT → MEMORY → TOOLS → HARNESS → MODEL
   Each layer slightly wider than the one above. Subtle glow on hover.
*/
export function StackLayers() {
  const layers = [
    { label: 'CONTEXT', color: 'var(--cyan)' },
    { label: 'MEMORY', color: 'var(--amber)' },
    { label: 'TOOLS', color: 'var(--green)' },
    { label: 'HARNESS', color: 'var(--cyan)' },
    { label: 'MODEL', color: 'var(--dim)' },
  ];

  return (
    <div className="vm-stack-layers">
      <svg viewBox="0 0 300 280" xmlns="http://www.w3.org/2000/svg">
        {layers.map((layer, i) => {
          const width = 140 + i * 28;
          const x = (300 - width) / 2;
          const y = 10 + i * 52;
          return (
            <g key={layer.label} className="vm-stack-layer">
              <rect
                x={x} y={y}
                width={width} height="40" rx="4"
                fill="var(--bg-tertiary)"
                stroke={layer.color}
                strokeWidth="1.2"
              />
              <text
                x={150} y={y + 25}
                textAnchor="middle"
                fill={layer.color}
                fontSize="11"
                fontWeight="600"
                fontFamily="'IBM Plex Mono', monospace"
              >
                {layer.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

/* ── FormulaViz ──
   Output = People x Skill x Time x AI^n
   Each variable in its own box. AI^n highlighted in cyan.
*/
export function FormulaViz() {
  return (
    <div className="vm-formula">
      <svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
        {/* Outer container rect */}
        <rect x="5" y="10" width="590" height="80" rx="6" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1" />

        {/* Output = */}
        <text x="30" y="58" fill="var(--dim)" fontSize="15" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">
          Output =
        </text>

        {/* People box */}
        <rect x="140" y="30" width="80" height="40" rx="3" fill="none" stroke="var(--dim)" strokeWidth="1" opacity="0.5" />
        <text x="180" y="56" textAnchor="middle" fill="var(--text-secondary)" fontSize="13" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">People</text>

        {/* x */}
        <text x="235" y="58" textAnchor="middle" fill="var(--dim)" fontSize="14" fontFamily="'IBM Plex Mono', monospace">&times;</text>

        {/* Skill box */}
        <rect x="252" y="30" width="65" height="40" rx="3" fill="none" stroke="var(--dim)" strokeWidth="1" opacity="0.5" />
        <text x="284" y="56" textAnchor="middle" fill="var(--text-secondary)" fontSize="13" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">Skill</text>

        {/* x */}
        <text x="332" y="58" textAnchor="middle" fill="var(--dim)" fontSize="14" fontFamily="'IBM Plex Mono', monospace">&times;</text>

        {/* Time box */}
        <rect x="348" y="30" width="65" height="40" rx="3" fill="none" stroke="var(--dim)" strokeWidth="1" opacity="0.5" />
        <text x="380" y="56" textAnchor="middle" fill="var(--text-secondary)" fontSize="13" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">Time</text>

        {/* x */}
        <text x="428" y="58" textAnchor="middle" fill="var(--dim)" fontSize="14" fontFamily="'IBM Plex Mono', monospace">&times;</text>

        {/* AI^n box — highlighted */}
        <rect className="vm-formula-ai-box" x="445" y="25" width="130" height="50" rx="4" fill="none" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="490" y="58" textAnchor="middle" fill="var(--cyan)" fontSize="16" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">
          AI
        </text>
        <text x="510" y="45" textAnchor="start" fill="var(--cyan)" fontSize="12" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">
          n
        </text>
        <text x="535" y="58" textAnchor="start" fill="var(--dim)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">
          n&gt;1
        </text>
      </svg>
    </div>
  );
}

/* ── LeverageFormula ──
   Enhanced FormulaViz with actual numbers showing leverage effect
   Before vs After comparison
*/
export function LeverageFormula() {
  return (
    <div className="vm-leverage">
      <svg viewBox="0 0 500 160" xmlns="http://www.w3.org/2000/svg">
        {/* Before row */}
        <text x="20" y="30" fill="var(--dim)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.5">before</text>
        <rect x="80" y="14" width="400" height="32" rx="4" fill="var(--bg-tertiary)" stroke="var(--dim)" strokeWidth="1" opacity="0.5" />
        <text x="100" y="35" fill="var(--dim)" fontSize="12" fontFamily="'IBM Plex Mono', monospace">
          {'10 people \u00D7 1.0 skill \u00D7 8h \u00D7 AI\u2070'}
        </text>
        <text x="430" y="35" textAnchor="end" fill="var(--dim)" fontSize="12" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">
          = 80
        </text>

        {/* Divider */}
        <line x1="80" y1="60" x2="480" y2="60" stroke="var(--dim)" strokeWidth="0.5" opacity="0.2" />

        {/* After row */}
        <text x="20" y="90" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">after</text>
        <rect x="80" y="74" width="400" height="32" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="100" y="95" fill="var(--cyan)" fontSize="12" fontFamily="'IBM Plex Mono', monospace">
          {'3 people \u00D7 2.5 skill \u00D7 8h \u00D7 AI\u00B3'}
        </text>
        <text x="430" y="95" textAnchor="end" fill="var(--green)" fontSize="12" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">
          = 1620
        </text>

        {/* Leverage multiplier */}
        <rect x="180" y="120" width="140" height="30" rx="4" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="250" y="140" textAnchor="middle" fill="var(--green)" fontSize="13" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">
          20x leverage
        </text>
      </svg>
    </div>
  );
}

/* ── CostCollapse ──
   Two data points: $1M (2023) → $10K (today) with declining line
   Label: "1000x снижение за 2.5 года"
*/
export function CostCollapse() {
  return (
    <div className="vm-cost-collapse">
      <svg viewBox="0 0 500 150" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes vm-cost-dash {
            to { stroke-dashoffset: 0; }
          }
        `}</style>

        {/* Background */}
        <rect x="0" y="0" width="500" height="150" rx="6" fill="var(--bg-tertiary)" />

        {/* 2023 data point */}
        <circle cx="100" cy="35" r="6" fill="none" stroke="#f87171" strokeWidth="2" />
        <circle cx="100" cy="35" r="2.5" fill="#f87171" />
        <text x="100" y="22" textAnchor="middle" fill="#f87171" fontSize="18" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">$1M</text>
        <text x="100" y="55" textAnchor="middle" fill="var(--dim)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">2023</text>

        {/* Declining line */}
        <line
          x1="110" y1="35" x2="390" y2="95"
          stroke="var(--border)" strokeWidth="1.5"
          strokeDasharray="6 4"
          strokeDashoffset="280"
          style={{ animation: 'vm-cost-dash 2s ease-out forwards' }}
        />
        {/* Arrow head */}
        <polygon points="390,95 380,88 382,98" fill="var(--border)" />

        {/* Today data point */}
        <circle cx="400" cy="95" r="6" fill="none" stroke="var(--cyan)" strokeWidth="2" />
        <circle cx="400" cy="95" r="2.5" fill="var(--cyan)" />
        <text x="400" y="82" textAnchor="middle" fill="var(--cyan)" fontSize="18" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">$10K</text>
        <text x="400" y="115" textAnchor="middle" fill="var(--dim)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">2025</text>

        {/* Label */}
        <text x="250" y="140" textAnchor="middle" fill="var(--text-secondary)" fontSize="12" fontFamily="'IBM Plex Mono', monospace">
          1000x снижение за 2.5 года
        </text>
      </svg>
    </div>
  );
}

/* ── EvolutionStages ──
   3 horizontal stages connected with arrows
   AI-Assisted → AI-Native (highlighted) → Agent-Centric
*/
export function EvolutionStages() {
  return (
    <div className="vm-evolution-stages">
      <svg viewBox="0 0 600 100" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes vm-glow-pulse {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 0.7; }
          }
        `}</style>

        {/* Stage 1: AI-Assisted */}
        <rect x="10" y="25" width="150" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--dim)" strokeWidth="1" />
        <text x="85" y="50" textAnchor="middle" fill="var(--dim)" fontSize="12" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">AI-Assisted</text>
        <text x="85" y="80" textAnchor="middle" fill="var(--dim)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">2020–23</text>

        {/* Arrow 1→2 */}
        <line x1="165" y1="45" x2="210" y2="45" stroke="var(--border)" strokeWidth="1.5" />
        <polygon points="210,45 203,40 203,50" fill="var(--border)" />

        {/* Stage 2: AI-Native (highlighted) */}
        <rect x="215" y="20" width="160" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="2" />
        {/* Glow effect */}
        <rect
          x="215" y="20" width="160" height="50" rx="4"
          fill="none" stroke="var(--cyan)" strokeWidth="4"
          opacity="0.3"
          style={{ animation: 'vm-glow-pulse 2s ease-in-out infinite' }}
        />
        <text x="295" y="50" textAnchor="middle" fill="var(--cyan)" fontSize="13" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">AI-Native</text>
        <text x="295" y="82" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">2024–25</text>

        {/* "we are here" indicator */}
        <text x="295" y="12" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">we are here</text>
        <line x1="295" y1="14" x2="295" y2="19" stroke="var(--cyan)" strokeWidth="1" />

        {/* Arrow 2→3 */}
        <line x1="380" y1="45" x2="425" y2="45" stroke="var(--border)" strokeWidth="1.5" />
        <polygon points="425,45 418,40 418,50" fill="var(--border)" />

        {/* Stage 3: Agent-Centric */}
        <rect x="430" y="25" width="160" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.2" />
        <text x="510" y="50" textAnchor="middle" fill="var(--green)" fontSize="12" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">Agent-Centric</text>
        <text x="510" y="80" textAnchor="middle" fill="var(--green)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">2025+</text>
      </svg>
    </div>
  );
}

/* ── CoaseanFirm ──
   Agent nodes with animated connection lines showing data exchange
*/
export function CoaseanFirm() {
  return (
    <div className="vm-coasean-firm">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes vm-flow-1 {
            0%   { offset-distance: 0%; opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          @keyframes vm-flow-2 {
            0%   { offset-distance: 0%; opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          .vm-flow-dot-a { offset-path: path('M130,60 L250,100'); animation: vm-flow-1 2s linear infinite; }
          .vm-flow-dot-b { offset-path: path('M250,100 L370,60'); animation: vm-flow-1 2.4s linear infinite 0.5s; }
          .vm-flow-dot-c { offset-path: path('M250,100 L190,155'); animation: vm-flow-2 2.2s linear infinite 0.3s; }
          .vm-flow-dot-d { offset-path: path('M250,100 L340,155'); animation: vm-flow-2 2.6s linear infinite 0.8s; }
          .vm-flow-dot-e { offset-path: path('M130,60 L190,155'); animation: vm-flow-1 3s linear infinite 0.2s; }
          .vm-flow-dot-f { offset-path: path('M370,60 L340,155'); animation: vm-flow-2 2.8s linear infinite 1s; }
        `}</style>

        {/* Connection lines */}
        <line x1="130" y1="60" x2="250" y2="100" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <line x1="250" y1="100" x2="370" y2="60" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <line x1="250" y1="100" x2="190" y2="155" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <line x1="250" y1="100" x2="340" y2="155" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <line x1="130" y1="60" x2="190" y2="155" stroke="var(--border)" strokeWidth="1" opacity="0.3" />
        <line x1="370" y1="60" x2="340" y2="155" stroke="var(--border)" strokeWidth="1" opacity="0.3" />

        {/* Flowing dots */}
        <circle className="vm-flow-dot-a" r="3" fill="var(--cyan)" />
        <circle className="vm-flow-dot-b" r="3" fill="var(--green)" />
        <circle className="vm-flow-dot-c" r="3" fill="var(--amber)" />
        <circle className="vm-flow-dot-d" r="3" fill="var(--cyan)" />
        <circle className="vm-flow-dot-e" r="2.5" fill="var(--green)" />
        <circle className="vm-flow-dot-f" r="2.5" fill="var(--amber)" />

        {/* Agent nodes */}
        {/* Marketing */}
        <circle cx="130" cy="60" r="28" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="130" y="57" textAnchor="middle" fill="var(--cyan)" fontSize="8" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">market</text>
        <text x="130" y="68" textAnchor="middle" fill="var(--cyan)" fontSize="8" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">-ing</text>

        {/* Product (center) */}
        <circle cx="250" cy="100" r="32" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="250" y="104" textAnchor="middle" fill="var(--green)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">product</text>

        {/* Sales */}
        <circle cx="370" cy="60" r="28" fill="var(--bg-tertiary)" stroke="var(--amber)" strokeWidth="1.5" />
        <text x="370" y="64" textAnchor="middle" fill="var(--amber)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">sales</text>

        {/* Analytics */}
        <circle cx="190" cy="155" r="24" fill="var(--bg-tertiary)" stroke="var(--dim)" strokeWidth="1.2" />
        <text x="190" y="158" textAnchor="middle" fill="var(--dim)" fontSize="8" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">analytics</text>

        {/* Support */}
        <circle cx="340" cy="155" r="24" fill="var(--bg-tertiary)" stroke="var(--dim)" strokeWidth="1.2" />
        <text x="340" y="158" textAnchor="middle" fill="var(--dim)" fontSize="8" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">support</text>

        {/* Label */}
        <text x="250" y="196" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">
          24/7 координация без людей
        </text>
      </svg>
    </div>
  );
}

/* ── SpeakerSilhouette ──
   Minimalist geometric person: circle head + trapezoid body
   Placeholder for "эксперт воркшопа скоро объявим"
*/
export function SpeakerSilhouette() {
  return (
    <div className="vm-speaker-silhouette">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        {/* Head */}
        <circle cx="40" cy="22" r="12" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1.5" />
        {/* Body (trapezoid) */}
        <polygon points="22,75 58,75 52,42 28,42" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}

/* ── WeekIdentitySVG ──
   Person silhouette with expanding context rings (radio waves)
   Center: small person icon, 3 concentric dashed circles with labels
   Animation: rings pulse outward (scale + fade) via CSS
*/
export function WeekIdentitySVG() {
  return (
    <div className="vm-week-identity">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        {/* Person silhouette */}
        <circle cx="250" cy="75" r="14" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <path d="M232,105 Q250,95 268,105 L265,120 Q250,115 235,120 Z" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />

        {/* Ring 1 — context */}
        <circle className="vm-week-ring vm-week-ring-1" cx="250" cy="90" r="45" fill="none" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="6 4" opacity="0.7" />
        <text x="310" y="60" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.8">context</text>

        {/* Ring 2 — skills */}
        <circle className="vm-week-ring vm-week-ring-2" cx="250" cy="90" r="70" fill="none" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
        <text x="335" y="75" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.7">skills</text>

        {/* Ring 3 — workflows */}
        <circle className="vm-week-ring vm-week-ring-3" cx="250" cy="90" r="95" fill="none" stroke="var(--cyan)" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
        <text x="360" y="95" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.6">workflows</text>

        {/* Label */}
        <text x="250" y="195" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">
          Week 1: Identity
        </text>
      </svg>
    </div>
  );
}

/* ── WeekArchitectureSVG ──
   Tree/graph of connected nodes (ontology visualization)
   Central node with 4 branches, diamond connectors
   Animation: nodes appear sequentially, lines draw in via CSS
*/
export function WeekArchitectureSVG() {
  return (
    <div className="vm-week-architecture">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        {/* Connection lines (dashed) */}
        <line className="vm-week-line vm-week-line-1" x1="250" y1="55" x2="100" y2="130" stroke="var(--dim)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line className="vm-week-line vm-week-line-2" x1="250" y1="55" x2="200" y2="140" stroke="var(--dim)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line className="vm-week-line vm-week-line-3" x1="250" y1="55" x2="300" y2="140" stroke="var(--dim)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line className="vm-week-line vm-week-line-4" x1="250" y1="55" x2="400" y2="130" stroke="var(--dim)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />

        {/* Diamond connectors at branch midpoints */}
        <polygon className="vm-week-diamond vm-week-diamond-1" points="175,92 180,87 185,92 180,97" fill="var(--cyan)" opacity="0.6" />
        <polygon className="vm-week-diamond vm-week-diamond-2" points="225,97 230,92 235,97 230,102" fill="var(--cyan)" opacity="0.6" />
        <polygon className="vm-week-diamond vm-week-diamond-3" points="275,97 280,92 285,97 280,102" fill="var(--cyan)" opacity="0.6" />
        <polygon className="vm-week-diamond vm-week-diamond-4" points="325,92 330,87 335,92 330,97" fill="var(--cyan)" opacity="0.6" />

        {/* Central node */}
        <rect className="vm-week-node vm-week-node-center" x="205" y="25" width="90" height="32" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="250" y="46" textAnchor="middle" fill="var(--cyan)" fontSize="12" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">COMPANY</text>

        {/* Branch nodes */}
        <rect className="vm-week-node vm-week-node-1" x="50" y="125" width="100" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1" />
        <text x="100" y="144" textAnchor="middle" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">deals</text>

        <rect className="vm-week-node vm-week-node-2" x="162" y="135" width="80" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1" />
        <text x="202" y="154" textAnchor="middle" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">contacts</text>

        <rect className="vm-week-node vm-week-node-3" x="258" y="135" width="85" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1" />
        <text x="300" y="154" textAnchor="middle" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">processes</text>

        <rect className="vm-week-node vm-week-node-4" x="355" y="125" width="95" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1" />
        <text x="402" y="144" textAnchor="middle" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">knowledge</text>

        {/* Label */}
        <text x="250" y="190" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">
          Week 2: Architecture
        </text>
      </svg>
    </div>
  );
}

/* ── WeekProcessSVG ──
   Workflow pipeline with agent pods
   3 agent boxes connected by arrows, feedback loop, ROI badge
   Animation: flowing dots along arrows via CSS
*/
export function WeekProcessSVG() {
  return (
    <div className="vm-week-process">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes vm-week-flow {
            0%   { offset-distance: 0%; opacity: 0; }
            10%  { opacity: 1; }
            90%  { opacity: 1; }
            100% { offset-distance: 100%; opacity: 0; }
          }
          .vm-week-flow-1 { offset-path: path('M135,80 L195,80'); animation: vm-week-flow 1.5s linear infinite; }
          .vm-week-flow-2 { offset-path: path('M295,80 L355,80'); animation: vm-week-flow 1.5s linear infinite 0.5s; }
          .vm-week-flow-3 { offset-path: path('M440,95 Q445,140 250,145 Q55,140 60,95'); animation: vm-week-flow 3s linear infinite 0.2s; }
        `}</style>

        {/* Agent box 1: classify */}
        <rect x="40" y="55" width="95" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="87" y="85" textAnchor="middle" fill="var(--cyan)" fontSize="11" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">classify</text>

        {/* Arrow 1→2 */}
        <line x1="140" y1="80" x2="190" y2="80" stroke="var(--green)" strokeWidth="1.5" />
        <polygon points="190,80 183,75 183,85" fill="var(--green)" />

        {/* Agent box 2: route */}
        <rect x="195" y="55" width="95" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="242" y="85" textAnchor="middle" fill="var(--cyan)" fontSize="11" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">route</text>

        {/* Arrow 2→3 */}
        <line x1="295" y1="80" x2="350" y2="80" stroke="var(--green)" strokeWidth="1.5" />
        <polygon points="350,80 343,75 343,85" fill="var(--green)" />

        {/* Agent box 3: execute */}
        <rect x="355" y="55" width="95" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="402" y="85" textAnchor="middle" fill="var(--cyan)" fontSize="11" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">execute</text>

        {/* Feedback loop arrow (below) */}
        <path
          d="M440,100 Q445,145 250,150 Q55,145 60,100"
          fill="none" stroke="var(--dim)" strokeWidth="1" strokeDasharray="5 3" opacity="0.5"
        />
        <polygon points="60,100 55,108 65,108" fill="var(--dim)" opacity="0.5" />
        <text x="250" y="168" textAnchor="middle" fill="var(--dim)" fontSize="9" fontFamily="'IBM Plex Mono', monospace" opacity="0.6">feedback loop</text>

        {/* Flowing dots along arrows */}
        <circle className="vm-week-flow-1" r="3" fill="var(--green)" />
        <circle className="vm-week-flow-2" r="3" fill="var(--green)" />
        <circle className="vm-week-flow-3" r="2.5" fill="var(--dim)" opacity="0.7" />

        {/* ROI badge */}
        <rect x="455" y="60" width="40" height="40" rx="20" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="475" y="77" textAnchor="middle" fill="var(--green)" fontSize="8" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">ROI</text>
        <text x="475" y="90" textAnchor="middle" fill="var(--green)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">20x</text>

        {/* Label */}
        <text x="250" y="195" textAnchor="middle" fill="var(--text-secondary)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">
          Week 3: Process
        </text>
      </svg>
    </div>
  );
}