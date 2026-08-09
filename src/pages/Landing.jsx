import { Link } from 'react-router-dom'
import data from '../data/mock.json'

const { stats, tracks, steps, testimonials } = data.landing

export default function Landing() {
  return (
    <div className="min-h-screen bg-[var(--color-ink)]">
      <header className="max-w-lg md:max-w-3xl mx-auto px-5 pt-6 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--color-amber)]" />
          <span className="font-[var(--font-display)] font-semibold tracking-tight">ABTalks</span>
        </div>
        <Link
          to="/dashboard"
          className="text-xs font-medium text-[var(--color-muted)] hover:text-[var(--color-text)] transition-colors"
        >
          I already have a streak →
        </Link>
      </header>

      {/* Hero */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-10 pb-8">
        <p className="font-[var(--font-mono)] text-[11px] tracking-wider text-[var(--color-amber)] uppercase mb-4">
          A 60-day public build challenge
        </p>
        <h1 className="font-[var(--font-display)] text-[2.55rem] leading-[1.05] font-semibold tracking-tight text-[var(--color-text)]">
          Show up.
          <br />
          Ship daily.
          <br />
          <span className="text-[var(--color-amber)]">Get seen.</span>
        </h1>
        <p className="mt-5 text-[15px] leading-relaxed text-[var(--color-muted)] max-w-md">
          Most students code in bursts before deadlines and lose the thread. ABTalks gives you one
          sized task a day for 60 days — you commit it to GitHub and post it on LinkedIn. No essays,
          no fluff. Just a public record that you actually build things.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <Link
            to="/dashboard"
            className="w-full text-center rounded-xl bg-[var(--color-amber)] text-[var(--color-ink)] font-semibold py-3.5 text-[15px] active:scale-[0.98] transition-transform"
          >
            Start Day 1 — it's free
          </Link>
          <p className="text-[11px] text-center text-[var(--color-muted)]">
            Late-night coder? So is everyone here. Tasks are sized for after class, not before it.
          </p>
        </div>
      </section>

      {/* Trust stats */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5">
        <div className="grid grid-cols-3 gap-2.5 border-y border-[var(--color-line)] py-5">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <p className="font-[var(--font-mono)] text-lg font-semibold text-[var(--color-text)]">{s.value}</p>
              <p className="text-[10.5px] text-[var(--color-muted)] mt-1 leading-tight">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works — a real ordered sequence, so numbering earns its place */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-10">
        <h2 className="font-[var(--font-display)] text-xl font-semibold mb-5">How the streak works</h2>
        <ol className="space-y-0">
          {steps.map((step, i) => (
            <li key={step.title} className="flex gap-4 relative">
              <div className="flex flex-col items-center">
                <span className="font-[var(--font-mono)] text-xs w-7 h-7 rounded-full border border-[var(--color-amber)]/40 text-[var(--color-amber)] flex items-center justify-center shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
                {i < steps.length - 1 && <span className="w-px flex-1 bg-[var(--color-line)] my-1" />}
              </div>
              <div className="pb-7">
                <p className="font-medium text-[15px] text-[var(--color-text)]">{step.title}</p>
                <p className="text-[13.5px] text-[var(--color-muted)] mt-1 leading-relaxed">{step.detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Tracks */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-4">
        <h2 className="font-[var(--font-display)] text-xl font-semibold mb-4">Pick a track</h2>
        <div className="flex flex-col gap-3">
          {tracks.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[var(--color-line)] bg-[var(--color-surface)] p-4 flex items-center justify-between"
            >
              <div>
                <p className="font-medium text-[14.5px] text-[var(--color-text)]">{t.name}</p>
                <p className="text-[12.5px] text-[var(--color-muted)] mt-0.5">{t.detail}</p>
              </div>
              <span className="text-[var(--color-mint)] text-lg">→</span>
            </div>
          ))}
        </div>
      </section>

      {/* Streak freeze — the trust/motivation differentiator */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-10">
        <div className="rounded-2xl border border-[var(--color-frost)]/30 bg-[var(--color-frost)]/5 p-5">
          <p className="font-[var(--font-mono)] text-[11px] tracking-wider text-[var(--color-frost)] uppercase mb-2">
            Built for real life
          </p>
          <h3 className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">
            Miss a day for a genuine reason? Your streak doesn't die for it.
          </h3>
          <p className="text-[13.5px] text-[var(--color-muted)] mt-2 leading-relaxed">
            Every student gets 3 streak freezes. Use one on an exam day or a family emergency and
            your public streak stays intact — marked openly as protected, not hidden.
          </p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pt-10 pb-6">
        <h2 className="font-[var(--font-display)] text-xl font-semibold mb-4">From students who finished</h2>
        <div className="flex flex-col gap-3">
          {testimonials.map((t) => (
            <blockquote key={t.name} className="rounded-xl border border-[var(--color-line)] p-4">
              <p className="text-[14px] text-[var(--color-text)] leading-relaxed">"{t.quote}"</p>
              <footer className="mt-3 text-[12px] text-[var(--color-muted)]">
                {t.name} · {t.meta}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="max-w-lg md:max-w-3xl mx-auto px-5 pb-10">
        <div className="rounded-2xl bg-[var(--color-surface)] border border-[var(--color-line)] p-6 text-center">
          <p className="font-[var(--font-display)] text-lg font-semibold text-[var(--color-text)]">
            Day 1 takes 90 minutes. Day 60 takes a portfolio's worth of proof.
          </p>
          <Link
            to="/dashboard"
            className="mt-4 inline-block w-full rounded-xl bg-[var(--color-amber)] text-[var(--color-ink)] font-semibold py-3.5 text-[15px] active:scale-[0.98] transition-transform"
          >
            Start your streak
          </Link>
        </div>
      </section>
    </div>
  )
}
