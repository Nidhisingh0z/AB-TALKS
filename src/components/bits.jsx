export function ProgressBar({ value, max, colorVar = 'var(--color-amber)', trackClass = '' }) {
  const pct = Math.min(100, Math.round((value / max) * 100))
  return (
    <div className={`h-2 w-full rounded-full bg-[var(--color-surface-2)] overflow-hidden ${trackClass}`}>
      <div
        className="h-full rounded-full transition-all duration-500"
        style={{ width: `${pct}%`, background: colorVar }}
      />
    </div>
  )
}

export function BadgeChip({ label, earned }) {
  return (
    <div
      className={`shrink-0 flex flex-col items-center justify-center gap-1.5 w-20 h-20 rounded-xl border text-center px-1.5 ${
        earned
          ? 'border-[var(--color-amber)]/50 bg-[var(--color-amber)]/10'
          : 'border-[var(--color-line)] bg-[var(--color-surface)] opacity-50'
      }`}
    >
      <span className="text-lg">{earned ? '🏅' : '🔒'}</span>
      <span className="text-[10px] leading-tight font-medium text-[var(--color-text)]">{label}</span>
    </div>
  )
}

export function StatCard({ value, label, mono = true }) {
  return (
    <div className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] px-3.5 py-3">
      <p className={`${mono ? 'font-[var(--font-mono)]' : 'font-[var(--font-display)]'} text-xl font-semibold text-[var(--color-text)]`}>
        {value}
      </p>
      <p className="text-[11px] text-[var(--color-muted)] mt-0.5">{label}</p>
    </div>
  )
}
