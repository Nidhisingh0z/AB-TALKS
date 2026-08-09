# ABTalks — Redesign

A mobile-first redesign of ABTalks' three core screens, built with React, React Router, and
Tailwind CSS v4. All data is mocked in `src/data/mock.json` — no auth, no backend.

## Route map

```
/
/dashboard
/day/12
```

## Run it

```bash
npm install
npm run dev       # local dev server
npm run build     # production build to dist/
npm run preview   # serve the production build
```

## Deploying (for the "live deployment URL" requirement)

This is a static Vite build, so it deploys anywhere static-friendly in under a minute:

- **Vercel**: `npx vercel` from this folder, or connect the repo at vercel.com/new and accept
  the auto-detected Vite settings (build command `npm run build`, output dir `dist`).
- **Netlify**: drag-and-drop the `dist/` folder onto app.netlify.com/drop, or connect the repo
  with build command `npm run build` and publish directory `dist`.

Because this is a client-side single-page app, whichever host you use needs a SPA rewrite rule
(`/* → /index.html`) so that deep links like `/day/12` don't 404 on refresh. Vercel and Netlify
both add this automatically for Vite projects; a `vercel.json` with a catch-all rewrite is
included just in case.

## Design approach

**Audience**: Indian college students, mostly coding on their phones, late at night, after
class. The visual language leans into that — a deep-ink background instead of pure black or a
daylight palette, warm amber for the "desk-lamp glow" of a late-night session, mint/frost for
completed and protected states.

**Typography**: Space Grotesk for display headings (technical but warm), Inter for body copy,
JetBrains Mono for anything numeric or data-like (streak counts, day counters, URLs) — a nod to
the audience's own tools.

**Signature element — the Streak Constellation**: instead of a generic GitHub-style heatmap
grid, the 60-day journey is drawn as a winding line of stars across several rows. Shipped days
glow mint, the current day pulses amber, freeze-protected days get a dashed frost ring instead
of a dead/red mark, and future days sit dim and unlit. It's meant to read as "a sky you're
filling in," not a spreadsheet of pass/fail cells.

## The one thoughtful idea: streak freezes, shown honestly

Streak products usually handle a missed day one of two ways: break the streak (punishing, and
students on this platform *will* miss a day for exams or emergencies), or silently ignore misses
(dishonest — recruiters are meant to be able to trust the streak). Instead, every student gets
3 streak freezes. A missed day protected by a freeze is shown openly on the dashboard and in the
constellation — not hidden, not deleted, just clearly marked as "freeze-protected" rather than
"shipped." This is called out explicitly on the landing page as a trust signal for students
deciding whether to commit to 60 days.

## Edge cases handled

- **First day, no streak** (`src/pages/Dashboard.jsx`): if `currentStreak` and `completedDays`
  are both `0`, the hero swaps from a streak counter to a non-judgmental "Day 1 of 60" prompt
  instead of showing "0 days 🔥," which would read as failure.
- **A missed day**: modeled as day 7 in the mock data (`status: "frozen"`). The dashboard shows
  a dedicated banner explaining what happened and how many freezes remain; the constellation
  renders it with a distinct dashed/frost treatment rather than lumping it in with "shipped" or
  showing it as a hard failure.
- **Empty profile**: `src/components/Avatar.jsx` falls back to initials on a gradient badge when
  `avatarUrl` is `null`, and to a neutral glyph if even a name is missing — never a broken image.
- **Unsubmitted / invalid proof-of-work**: `/day/12`'s submission form validates both URLs
  client-side (must look like a real `github.com` and `linkedin.com/posts/...` link) before the
  submit button is enabled, with inline errors on attempted submit.
- **Visiting a day outside the demo's content** (e.g. `/day/40`): `ChallengeDay.jsx` shows a
  dedicated "not in this preview" state with a way back to the dashboard, instead of crashing or
  rendering a blank page.

## Structure

```
src/
  data/mock.json            all mocked content (student, 14 sample days, landing copy)
  components/
    Avatar.jsx               profile photo w/ empty-state fallback
    StreakConstellation.jsx  the 60-day signature visual
    bits.jsx                 ProgressBar, BadgeChip, StatCard
  pages/
    Landing.jsx               /
    Dashboard.jsx             /dashboard
    ChallengeDay.jsx           /day/:dayId
```
