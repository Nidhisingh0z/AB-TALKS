import { useMemo } from 'react'

const STATUS_COLOR = {
  completed: 'var(--color-mint)',
  frozen: 'var(--color-frost)',
  today: 'var(--color-amber)',
  upcoming: 'var(--color-line)',
  missed: 'var(--color-coral)',
}

// Builds a full 60-day array, filling in "upcoming" placeholders for days
// not present in the mocked data (i.e. everything after the current day).
function buildDays(days, totalDays) {
  const byDay = new Map(days.map((d) => [d.day, d]))
  const out = []
  for (let i = 1; i <= totalDays; i++) {
    out.push(byDay.get(i) || { day: i, status: 'upcoming' })
  }
  return out
}

const ROW_SIZE = 15
const NODE_R = 5
const ROW_H = 34
const AMP = 9 // wave amplitude

export default function StreakConstellation({ days, totalDays, currentDay }) {
  const full = useMemo(() => buildDays(days, totalDays), [days, totalDays])
  const rows = useMemo(() => {
    const r = []
    for (let i = 0; i < full.length; i += ROW_SIZE) r.push(full.slice(i, i + ROW_SIZE))
    return r
  }, [full])

  const width = 340
  const stepX = width / (ROW_SIZE - 1 + 0.4)

  return (
    <div className="w-full overflow-hidden rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-4">
      <div className="flex items-center justify-between mb-2">
        <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text)]">
          60-day sky
        </p>
        <p className="font-[var(--font-mono)] text-[11px] text-[var(--color-muted)]">
          day {currentDay} / {totalDays}
        </p>
      </div>
      <svg
        viewBox={`0 0 ${width} ${rows.length * ROW_H + 8}`}
        className="w-full"
        role="img"
        aria-label={`Progress map showing ${totalDays} days. Currently on day ${currentDay}.`}
      >
        {rows.map((row, ri) => {
          const y0 = ri * ROW_H + ROW_H / 2
          const points = row.map((d, i) => {
            const x = i * stepX + 6
            const y = y0 + Math.sin(i * 0.9 + ri) * AMP
            return { ...d, x, y }
          })
          const linePath = points
            .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`)
            .join(' ')
          return (
            <g key={ri}>
              <path
                d={linePath}
                fill="none"
                stroke="var(--color-line)"
                strokeWidth="1.5"
              />
              {points.map((p) => {
                const isToday = p.day === currentDay
                const isFrozen = p.status === 'frozen'
                const color = STATUS_COLOR[p.status] || STATUS_COLOR.upcoming
                return (
                  <g key={p.day}>
                    {isToday && (
                      <circle cx={p.x} cy={p.y} r={NODE_R + 5} fill="none" stroke={color} strokeWidth="1.5" opacity="0.55">
                        <animate attributeName="r" values={`${NODE_R + 3};${NODE_R + 7};${NODE_R + 3}`} dur="2.4s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.6;0.15;0.6" dur="2.4s" repeatCount="indefinite" />
                      </circle>
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={isToday ? NODE_R + 1.5 : NODE_R}
                      fill={p.status === 'upcoming' ? 'var(--color-ink)' : color}
                      stroke={color}
                      strokeWidth={isFrozen ? 1.5 : 1}
                      strokeDasharray={isFrozen ? '2 1.5' : undefined}
                    />
                  </g>
                )
              })}
            </g>
          )
        })}
      </svg>
      <div className="flex flex-wrap gap-x-4 gap-y-1.5 mt-3 font-[var(--font-mono)] text-[10.5px] text-[var(--color-muted)]">
        <Legend color="var(--color-mint)" label="shipped" />
        <Legend color="var(--color-frost)" label="freeze-protected" dashed />
        <Legend color="var(--color-amber)" label="today" />
        <Legend color="var(--color-line)" label="ahead" outline />
      </div>
    </div>
  )
}

function Legend({ color, label, dashed, outline }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span
        className="inline-block w-2.5 h-2.5 rounded-full"
        style={{
          background: outline ? 'transparent' : color,
          border: `1.5px ${dashed ? 'dashed' : 'solid'} ${color}`,
        }}
      />
      {label}
    </span>
  )
}
