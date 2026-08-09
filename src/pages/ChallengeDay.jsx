import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import data from '../data/mock.json'

const { student } = data

const { days } = data

const GITHUB_RE = /^https:\/\/(www\.)?github\.com\/[\w-]+\/[\w.-]+\/?(commit\/[a-f0-9]+)?\/?$/i
const LINKEDIN_RE = /^https:\/\/(www\.)?linkedin\.com\/(posts|feed)\/[\w-]+/i

export default function ChallengeDay() {
  const { dayId } = useParams()
  const dayNum = Number(dayId)
  const day = days.find((d) => d.day === dayNum)

  // Edge case: someone visits a day this demo doesn't have full content for.
  if (!day || !day.title) {
    return (
      <div className="min-h-screen bg-[var(--color-ink)] px-5 pt-6 pb-10 max-w-lg md:max-w-3xl mx-auto">
        <BackLink />
        <div className="mt-10 text-center">
          <p className="text-4xl mb-3">🌌</p>
          <h1 className="font-[var(--font-display)] text-xl font-semibold text-[var(--color-text)]">
            Day {dayNum || '?'} isn't in this preview
          </h1>
          <p className="text-[13.5px] text-[var(--color-muted)] mt-2 max-w-xs mx-auto">
            This demo has full task content for Day 12. Head back to your dashboard to pick up
            today's task.
          </p>
          <Link
            to="/dashboard"
            className="inline-block mt-5 rounded-xl bg-[var(--color-amber)] text-[var(--color-ink)] font-semibold px-5 py-2.5 text-sm"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return <DayContent day={day} />
}

function BackLink() {
  return (
    <Link to="/dashboard" className="inline-flex items-center gap-1.5 text-[12.5px] text-[var(--color-muted)]">
      ← Dashboard
    </Link>
  )
}

function DayContent({ day }) {
  const [github, setGithub] = useState('')
  const [linkedin, setLinkedin] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [touched, setTouched] = useState(false)

  const githubValid = useMemo(() => GITHUB_RE.test(github.trim()), [github])
  const linkedinValid = useMemo(() => LINKEDIN_RE.test(linkedin.trim()), [linkedin])
  const canSubmit = githubValid && linkedinValid

  function handleSubmit(e) {
    e.preventDefault()
    setTouched(true)
    if (canSubmit) setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[var(--color-ink)] px-5 pt-6 pb-10 max-w-lg md:max-w-3xl mx-auto">
        <BackLink />
        <div className="mt-14 text-center">
          <p className="text-5xl mb-4">✅</p>
          <h1 className="font-[var(--font-display)] text-2xl font-semibold text-[var(--color-text)]">
            Day {day.day} shipped
          </h1>
          <p className="text-[13.5px] text-[var(--color-muted)] mt-2 max-w-xs mx-auto">
            Your streak is now {student.currentStreak + 1}. Both links are saved to your public profile.
          </p>
          <div className="mt-6 flex flex-col gap-2.5 text-left rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
            <SubmittedRow label="GitHub" value={github} />
            <SubmittedRow label="LinkedIn" value={linkedin} />
          </div>
          <Link
            to="/dashboard"
            className="mt-6 inline-block w-full rounded-xl bg-[var(--color-amber)] text-[var(--color-ink)] font-semibold py-3.5 text-[15px]"
          >
            Back to dashboard
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[var(--color-ink)] pb-14">
      <header className="max-w-lg md:max-w-3xl mx-auto px-5 pt-6 flex items-center justify-between">
        <BackLink />
        <span className="font-[var(--font-mono)] text-[11px] text-[var(--color-muted)]">
          Day {day.day} / 60
        </span>
      </header>

      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-5">
        <p className="font-[var(--font-mono)] text-[11px] tracking-wider text-[var(--color-amber)] uppercase">
          {day.trackLabel}
        </p>
        <h1 className="font-[var(--font-display)] text-2xl font-semibold mt-1.5 leading-snug text-[var(--color-text)]">
          {day.title}
        </h1>
        <p className="text-[12.5px] text-[var(--color-muted)] mt-2">~{day.estMinutes} minutes</p>
        <p className="text-[14px] text-[var(--color-text)]/90 leading-relaxed mt-4">{day.brief}</p>
      </section>

      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-7">
        <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text)] mb-3">
          What to build
        </p>
        <ul className="flex flex-col gap-2.5">
          {day.spec.map((item, i) => (
            <li key={i} className="flex gap-2.5 text-[13.5px] text-[var(--color-text)]/90 leading-relaxed">
              <span className="mt-1 w-1.5 h-1.5 rounded-full bg-[var(--color-mint)] shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </section>

      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-7">
        <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text)] mb-3">
          Resources
        </p>
        <div className="flex flex-col gap-2">
          {day.resources.map((r) => (
            <a
              key={r.label}
              href={r.url}
              className="text-[13px] text-[var(--color-frost)] underline underline-offset-2"
            >
              {r.label}
            </a>
          ))}
        </div>
      </section>

      {/* Submission */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-8">
        <div className="rounded-2xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4">
          <p className="font-[var(--font-display)] text-sm font-semibold text-[var(--color-text)]">
            Submit proof of work
          </p>
          <p className="text-[12px] text-[var(--color-muted)] mt-1 mb-4">
            Both links must be public so recruiters and your cohort can see them.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Field
              label="GitHub commit or repo URL"
              placeholder="https://github.com/yourname/rate-limiter"
              value={github}
              onChange={setGithub}
              valid={githubValid}
              showError={touched && !githubValid}
              error="Paste a github.com repo or commit link."
              icon="⌥"
            />
            <Field
              label="LinkedIn post URL"
              placeholder="https://linkedin.com/posts/yourname_day12..."
              value={linkedin}
              onChange={setLinkedin}
              valid={linkedinValid}
              showError={touched && !linkedinValid}
              error="Paste a linkedin.com/posts/... link."
              icon="in"
            />

            <button
              type="submit"
              className={`w-full rounded-xl py-3.5 text-[15px] font-semibold transition-colors ${
                canSubmit
                  ? 'bg-[var(--color-amber)] text-[var(--color-ink)] active:scale-[0.98]'
                  : 'bg-[var(--color-surface-2)] text-[var(--color-muted)]'
              }`}
            >
              Submit Day {day.day}
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

function Field({ label, placeholder, value, onChange, valid, showError, error, icon }) {
  return (
    <label className="block">
      <span className="text-[12.5px] font-medium text-[var(--color-text)]">{label}</span>
      <div
        className={`mt-1.5 flex items-center gap-2 rounded-lg border bg-[var(--color-ink)] px-3 py-2.5 ${
          showError ? 'border-[var(--color-coral)]' : 'border-[var(--color-line)] focus-within:border-[var(--color-amber)]'
        }`}
      >
        <span className="font-[var(--font-mono)] text-xs text-[var(--color-muted)] shrink-0">{icon}</span>
        <input
          type="url"
          inputMode="url"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full bg-transparent text-[13px] text-[var(--color-text)] placeholder:text-[var(--color-muted)]/60 outline-none"
        />
        {value && (
          <span className={`text-xs shrink-0 ${valid ? 'text-[var(--color-mint)]' : 'text-[var(--color-coral)]'}`}>
            {valid ? '✓' : '!'}
          </span>
        )}
      </div>
      {showError && <p className="text-[11px] text-[var(--color-coral)] mt-1">{error}</p>}
    </label>
  )
}

function SubmittedRow({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[11px] text-[var(--color-muted)]">{label}</span>
      <span className="text-[12.5px] text-[var(--color-mint)] truncate font-[var(--font-mono)]">{value}</span>
    </div>
  )
}
