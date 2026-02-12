// Visual metaphor SVG components

export function TokenStream() {
  return (
    <div className="vm-token-stream">
      <svg viewBox="0 0 500 120" xmlns="http://www.w3.org/2000/svg">
        <line x1="155" y1="60" x2="195" y2="60" stroke="var(--border)" strokeWidth="1.5" />
        <line x1="315" y1="60" x2="355" y2="60" stroke="var(--border)" strokeWidth="1.5" />
        <rect x="30" y="30" width="125" height="60" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.2" />
        <text x="92" y="66" textAnchor="middle" fill="var(--accent)" fontSize="13" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">INFO</text>
        <rect x="195" y="25" width="120" height="70" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="255" y="66" textAnchor="middle" fill="var(--cyan)" fontSize="13" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">DECIDE</text>
        <rect x="355" y="30" width="115" height="60" rx="4" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.2" />
        <text x="412" y="66" textAnchor="middle" fill="var(--green)" fontSize="13" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">ACT</text>
        <circle className="vm-dot vm-dot-1a" r="3.5" fill="var(--cyan)" opacity="0.9" />
        <circle className="vm-dot vm-dot-1b" r="3" fill="var(--cyan)" opacity="0.5" />
        <circle className="vm-dot vm-dot-2a" r="3.5" fill="var(--green)" opacity="0.9" />
        <circle className="vm-dot vm-dot-2b" r="3" fill="var(--green)" opacity="0.5" />
      </svg>
    </div>
  );
}

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
        <rect x="10" y="25" width="150" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1" />
        <text x="85" y="50" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">AI-Assisted</text>
        <text x="85" y="80" textAnchor="middle" fill="var(--accent)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">2020-23</text>
        <line x1="165" y1="45" x2="210" y2="45" stroke="var(--border)" strokeWidth="1.5" />
        <polygon points="210,45 203,40 203,50" fill="var(--border)" />
        <rect x="215" y="20" width="160" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="2" />
        <rect x="215" y="20" width="160" height="50" rx="4" fill="none" stroke="var(--cyan)" strokeWidth="4" opacity="0.3" style={{ animation: 'vm-glow-pulse 2s ease-in-out infinite' }} />
        <text x="295" y="50" textAnchor="middle" fill="var(--cyan)" fontSize="13" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">AI-Native</text>
        <text x="295" y="82" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">2024-25</text>
        <text x="295" y="12" textAnchor="middle" fill="var(--cyan)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">we are here</text>
        <line x1="295" y1="14" x2="295" y2="19" stroke="var(--cyan)" strokeWidth="1" />
        <line x1="380" y1="45" x2="425" y2="45" stroke="var(--border)" strokeWidth="1.5" />
        <polygon points="425,45 418,40 418,50" fill="var(--border)" />
        <rect x="430" y="25" width="160" height="40" rx="4" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.2" />
        <text x="510" y="50" textAnchor="middle" fill="var(--green)" fontSize="12" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">Agent-Centric</text>
        <text x="510" y="80" textAnchor="middle" fill="var(--green)" fontSize="9" fontFamily="'IBM Plex Mono', monospace">2025+</text>
      </svg>
    </div>
  );
}

export function LeverageFormula() {
  return (
    <div className="vm-leverage">
      <svg viewBox="0 0 500 160" xmlns="http://www.w3.org/2000/svg">
        <text x="20" y="30" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.5">before</text>
        <rect x="80" y="14" width="400" height="32" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
        <text x="100" y="35" fill="var(--accent)" fontSize="12" fontFamily="'IBM Plex Mono', monospace">{`10 people \u00D7 1.0 skill \u00D7 8h \u00D7 AI\u2070`}</text>
        <text x="430" y="35" textAnchor="end" fill="var(--accent)" fontSize="12" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">= 80</text>
        <line x1="80" y1="60" x2="480" y2="60" stroke="var(--accent)" strokeWidth="0.5" opacity="0.2" />
        <text x="20" y="90" fill="var(--cyan)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">after</text>
        <rect x="80" y="74" width="400" height="32" rx="4" fill="var(--bg-tertiary)" stroke="var(--cyan)" strokeWidth="1.5" />
        <text x="100" y="95" fill="var(--cyan)" fontSize="12" fontFamily="'IBM Plex Mono', monospace">{`3 people \u00D7 2.5 skill \u00D7 8h \u00D7 AI\u00B3`}</text>
        <text x="430" y="95" textAnchor="end" fill="var(--green)" fontSize="12" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">= 1620</text>
        <rect x="180" y="120" width="140" height="30" rx="4" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="250" y="140" textAnchor="middle" fill="var(--green)" fontSize="13" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">20x leverage</text>
      </svg>
    </div>
  );
}

export function CoaseanFirm() {
  return (
    <div className="vm-coasean-firm">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes vm-flow-1 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
          @keyframes vm-flow-2 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
          .vm-flow-dot-a { offset-path: path('M130,60 L250,100'); animation: vm-flow-1 2s linear infinite; }
          .vm-flow-dot-b { offset-path: path('M250,100 L370,60'); animation: vm-flow-1 2.4s linear infinite 0.5s; }
          .vm-flow-dot-c { offset-path: path('M250,100 L190,155'); animation: vm-flow-2 2.2s linear infinite 0.3s; }
          .vm-flow-dot-d { offset-path: path('M250,100 L340,155'); animation: vm-flow-2 2.6s linear infinite 0.8s; }
        `}</style>
        <line x1="130" y1="60" x2="250" y2="100" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <line x1="250" y1="100" x2="370" y2="60" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <line x1="250" y1="100" x2="190" y2="155" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <line x1="250" y1="100" x2="340" y2="155" stroke="var(--border)" strokeWidth="1" opacity="0.5" />
        <circle className="vm-flow-dot-a" r="3" fill="var(--cyan)" />
        <circle className="vm-flow-dot-b" r="3" fill="var(--green)" />
        <circle className="vm-flow-dot-c" r="3" fill="var(--amber)" />
        <circle className="vm-flow-dot-d" r="3" fill="var(--cyan)" />
        <circle cx="130" cy="60" r="28" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="130" y="57" textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">market</text>
        <text x="130" y="68" textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">-ing</text>
        <circle cx="250" cy="100" r="32" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="250" y="104" textAnchor="middle" fill="var(--green)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">product</text>
        <circle cx="370" cy="60" r="28" fill="var(--bg-tertiary)" stroke="var(--amber)" strokeWidth="1.5" />
        <text x="370" y="64" textAnchor="middle" fill="var(--amber)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">sales</text>
        <circle cx="190" cy="155" r="24" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.2" />
        <text x="190" y="158" textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">analytics</text>
        <circle cx="340" cy="155" r="24" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.2" />
        <text x="340" y="158" textAnchor="middle" fill="var(--accent)" fontSize="8" fontWeight="500" fontFamily="'IBM Plex Mono', monospace">support</text>
        <text x="250" y="196" textAnchor="middle" fill="var(--terminal-text-secondary)" fontSize="11" fontFamily="'IBM Plex Mono', monospace">24/7 координация без людей</text>
      </svg>
    </div>
  );
}

export function WeekIdentitySVG() {
  return (
    <div className="vm-week-identity">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <circle cx="250" cy="75" r="14" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.5" />
        <path d="M232,105 Q250,95 268,105 L265,120 Q250,115 235,120 Z" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.5" />
        <circle cx="250" cy="90" r="45" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 4" opacity="0.7" />
        <text x="310" y="60" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.8">context</text>
        <circle cx="250" cy="90" r="70" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 4" opacity="0.5" />
        <text x="335" y="75" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.7">skills</text>
        <circle cx="250" cy="90" r="95" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="6 4" opacity="0.3" />
        <text x="360" y="95" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace" opacity="0.6">workflows</text>
      </svg>
    </div>
  );
}

export function WeekArchitectureSVG() {
  return (
    <div className="vm-week-architecture">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <line x1="250" y1="55" x2="100" y2="130" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line x1="250" y1="55" x2="200" y2="140" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line x1="250" y1="55" x2="300" y2="140" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <line x1="250" y1="55" x2="400" y2="130" stroke="var(--accent)" strokeWidth="1" strokeDasharray="4 3" opacity="0.5" />
        <polygon points="175,92 180,87 185,92 180,97" fill="var(--accent)" opacity="0.6" />
        <polygon points="225,97 230,92 235,97 230,102" fill="var(--accent)" opacity="0.6" />
        <polygon points="275,97 280,92 285,97 280,102" fill="var(--accent)" opacity="0.6" />
        <polygon points="325,92 330,87 335,92 330,97" fill="var(--accent)" opacity="0.6" />
        <rect x="205" y="25" width="90" height="32" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="250" y="46" textAnchor="middle" fill="var(--accent)" fontSize="12" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">COMPANY</text>
        <rect x="50" y="125" width="100" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1" />
        <text x="100" y="144" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">deals</text>
        <rect x="162" y="135" width="80" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1" />
        <text x="202" y="154" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">contacts</text>
        <rect x="258" y="135" width="85" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1" />
        <text x="300" y="154" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">processes</text>
        <rect x="355" y="125" width="95" height="28" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1" />
        <text x="402" y="144" textAnchor="middle" fill="var(--accent)" fontSize="10" fontFamily="'IBM Plex Mono', monospace">knowledge</text>
      </svg>
    </div>
  );
}

export function WeekProcessSVG() {
  return (
    <div className="vm-week-process">
      <svg viewBox="0 0 500 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
          @keyframes vm-week-flow { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
          .vm-week-flow-1 { offset-path: path('M135,80 L195,80'); animation: vm-week-flow 1.5s linear infinite; }
          .vm-week-flow-2 { offset-path: path('M295,80 L355,80'); animation: vm-week-flow 1.5s linear infinite 0.5s; }
        `}</style>
        <rect x="40" y="55" width="95" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="87" y="85" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">classify</text>
        <line x1="140" y1="80" x2="190" y2="80" stroke="var(--green)" strokeWidth="1.5" />
        <polygon points="190,80 183,75 183,85" fill="var(--green)" />
        <rect x="195" y="55" width="95" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="242" y="85" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">route</text>
        <line x1="295" y1="80" x2="350" y2="80" stroke="var(--green)" strokeWidth="1.5" />
        <polygon points="350,80 343,75 343,85" fill="var(--green)" />
        <rect x="355" y="55" width="95" height="50" rx="4" fill="var(--bg-tertiary)" stroke="var(--accent)" strokeWidth="1.5" />
        <text x="402" y="85" textAnchor="middle" fill="var(--accent)" fontSize="11" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">execute</text>
        <path d="M440,100 Q445,145 250,150 Q55,145 60,100" fill="none" stroke="var(--accent)" strokeWidth="1" strokeDasharray="5 3" opacity="0.5" />
        <polygon points="60,100 55,108 65,108" fill="var(--accent)" opacity="0.5" />
        <text x="250" y="168" textAnchor="middle" fill="var(--accent)" fontSize="9" fontFamily="'IBM Plex Mono', monospace" opacity="0.6">feedback loop</text>
        <circle className="vm-week-flow-1" r="3" fill="var(--green)" />
        <circle className="vm-week-flow-2" r="3" fill="var(--green)" />
        <rect x="455" y="60" width="40" height="40" rx="20" fill="var(--bg-tertiary)" stroke="var(--green)" strokeWidth="1.5" />
        <text x="475" y="77" textAnchor="middle" fill="var(--green)" fontSize="8" fontWeight="700" fontFamily="'IBM Plex Mono', monospace">ROI</text>
        <text x="475" y="90" textAnchor="middle" fill="var(--green)" fontSize="9" fontWeight="600" fontFamily="'IBM Plex Mono', monospace">20x</text>
      </svg>
    </div>
  );
}

export function SpeakerSilhouette() {
  return (
    <div className="vm-speaker-silhouette">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="22" r="12" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1.5" />
        <polygon points="22,75 58,75 52,42 28,42" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1.5" />
      </svg>
    </div>
  );
}
