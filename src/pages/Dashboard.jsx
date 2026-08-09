import { Link } from 'react-router-dom'
import data from '../data/mock.json'
import Avatar from '../components/Avatar.jsx'
import StreakConstellation from '../components/StreakConstellation.jsx'
import { ProgressBar, BadgeChip, StatCard } from '../components/bits.jsx'

const { student, days } = data
const today = days.find((d) => d.status === 'today')
const frozenDays = days.filter((d) => d.status === 'frozen')
const completionPct = Math.round((student.completedDays / student.totalDays) * 100)

// Edge case: a brand-new student with no streak yet gets a different,
// non-judgmental headline instead of "0 day streak" (which reads like failure).
const isFirstDay = student.currentStreak === 0 && student.completedDays === 0

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)] pb-10">
      {/* Top bar */}
      <header className="max-w-lg md:max-w-3xl mx-auto px-5 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Avatar name={student.name} initials={student.initials} avatarUrl={student.avatarUrl} />
          <div>
            <p className="font-medium text-[14.5px] text-[var(--color-text)] leading-tight">{student.name}</p>
            <p className="text-[12px] text-[var(--color-muted)] leading-tight">{student.track}</p>
          </div>
        </div>
        <Link
          to="/"
          className="text-[11px] font-[var(--font-mono)] text-[var(--color-muted)] border border-[var(--color-line)] rounded-full px-3 py-1.5"
        >
          exit
        </Link>
      </header>

      {/* Streak hero */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-6">
        {isFirstDay ? (
          <div>
            <p className="font-[var(--font-mono)] text-[11px] tracking-wider text-[var(--color-amber)] uppercase">
              Day 1 of 60
            </p>
            <h1 className="font-[var(--font-display)] text-2xl font-semibold mt-1 text-[var(--color-text)]">
              No streak yet — that's exactly where everyone starts.
            </h1>
            <p className="text-[13.5px] text-[var(--color-muted)] mt-2">
              Ship today's task and your streak begins tonight.
            </p>
          </div>
        ) : (
          <div className="flex items-end justify-between">
            <div>
              <p className="font-[var(--font-mono)] text-[11px] tracking-wider text-[var(--color-amber)] uppercase">
                Current streak
              </p>
              <div className="flex items-baseline gap-2 mt-1">
                <span className="font-[var(--font-display)] text-5xl font-semibold text-[var(--color-text)]">
                  {student.currentStreak}
                </span>
                <span className="text-[15px] text-[var(--color-muted)]">days 🔥</span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-[var(--color-muted)]">best</p>
              <p className="font-[var(--font-mono)] text-sm text-[var(--color-text)]">{student.longestStreak}d</p>
            </div>
          </div>
        )}

        {/* Missed-day / freeze banner — comeback mode, no shame framing */}
        {frozenDays.length > 0 && (
          <div className="mt-4 rounded-xl border border-[var(--color-frost)]/30 bg-[var(--color-frost)]/5 px-4 py-3 flex gap-3">
            <span className="text-lg">❄️</span>
            <p className="text-[12.5px] text-[var(--color-text)] leading-relaxed">
              Day {frozenDays.map((d) => d.day).join(', ')} was auto-protected by a streak freeze — your
              streak stayed alive.{' '}
              <span className="text-[var(--color-muted)]">
                {student.streakFreezesTotal - student.streakFreezesUsed} of {student.streakFreezesTotal} freezes left.
              </span>
            </p>
          </div>
        )}
      </section>

      {/* Today's task */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-6">
        {today ? (
          <Link
            to={`/day/${today.day}`}
            className="block rounded-2xl bg-[var(--color-amber)] text-[var(--color-ink)] p-5 active:scale-[0.99] transition-transform"
          >
            <p className="font-[var(--font-mono)] text-[11px] uppercase tracking-wider opacity-70">
              Today · Day {today.day}
            </p>
            <h2 className="font-[var(--font-display)] text-lg font-semibold mt-1 leading-snug">
              {today.title}
            </h2>
            <p className="text-[12.5px] mt-2 opacity-80">
              ~{today.estMinutes} min · {today.trackLabel}
            </p>
            <span className="inline-block mt-3.5 text-[13px] font-semibold underline underline-offset-2">
              Open today's task →
            </span>
          </Link>
        ) : (
          <div className="rounded-2xl border border-[var(--color-line)] p-5 text-center">
            <p className="text-[13.5px] text-[var(--color-muted)]">No task scheduled — check back tomorrow.</p>
          </div>
        )}
      </section>

      {/* Progress */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-8">
        <div className="flex items-center justify-between mb-2">
          <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text)]">
            Challenge progress
          </p>
          <p className="font-[var(--font-mono)] text-xs text-[var(--color-muted)]">
            {student.currentDay} / {student.totalDays}
          </p>
        </div>
        <ProgressBar value={student.currentDay} max={student.totalDays} />

        <div className="grid grid-cols-3 gap-2.5 mt-4">
          <StatCard value={`${completionPct}%`} label="overall complete" />
          <StatCard value={student.completedDays} label="days shipped" />
          <StatCard value={`Top ${student.percentile}%`} label={`of ${student.cohortSize.toLocaleString('en-IN')} students`} />
        </div>
      </section>

      {/* Streak constellation */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-6">
        <StreakConstellation days={days} totalDays={student.totalDays} currentDay={student.currentDay} />
      </section>

      {/* Achievements */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-7">
        <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text)] mb-3">
          Achievements
        </p>
        <div className="flex gap-2.5 overflow-x-auto pb-1 -mx-5 px-5">
          {student.badges.map((b) => (
            <BadgeChip key={b.id} label={b.label} earned={b.earned} />
          ))}
        </div>
      </section>
    </div>
  )
}
