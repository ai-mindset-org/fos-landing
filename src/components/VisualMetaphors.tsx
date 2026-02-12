export function SpeakerSilhouette() {
  return (
    <div className="vm-speaker-silhouette">
      <svg viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
        <circle cx="40" cy="22" r="12" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1.5" />
        <polygon points="22,75 58,75 52,42 28,42" fill="var(--bg-tertiary)" stroke="var(--border)" strokeWidth="1.5" />
      </svg>
    </div>
  )
}
