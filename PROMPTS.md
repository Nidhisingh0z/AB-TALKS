# PROMPTS.md

This project was built with Claude (Anthropic). Below are the prompts that drove the build,
in order. Debugging/deployment prompts (Node.js path issues, Vercel settings, git commands) are
summarized rather than pasted verbatim since they were mostly back-and-forth troubleshooting
specific to one machine's environment, not part of the actual product build.

---

## 1. Initial brief (full spec, pasted as-is)

> Redesign ABTalks
> Reimagine the platform you're standing on.
>
> The Situation
> ABTalks runs a 60-day coding challenge for Indian college students.
> Students pick a track, build something every day, and maintain a public learning streak by
> submitting:
> - A GitHub commit
> - A LinkedIn post
>
> This daily proof of work helps them build consistency and become visible to recruiters.
> Most students use the platform on their phones, late at night after college.
> The product works. It has never been designed.
>
> Ship at Minimum
> Design and build the following three screens.
> 1. Landing Page (`/`) — first experience for a student who's never heard of ABTalks. Show
>    enough trust, clarity, and motivation that they're willing to commit to a 60-day challenge.
> 2. Student Dashboard (`/dashboard`) — home screen after logging in. Include: current streak,
>    today's task, progress through the challenge, overall completion, student standing or
>    achievements.
> 3. Challenge Day (`/day/12`) — complete experience of a single challenge day: read the day's
>    task, understand what needs to be built, submit proof of work (GitHub repo/commit, LinkedIn
>    post).
>
> What We're Looking For: mobile-first (390px) design, understandable to a first-time student,
> handles edge cases (first day/no streak, a missed day, an empty profile), and introduces at
> least one thoughtful idea that improves the student experience. Mocked data only — no auth,
> no real accounts, no database, no recruiter dashboard, no admin panel.

## 2. Follow-up: continue / iterate

> Continue

(Used to move from planning into implementation after the initial design direction was set.)

## 3. Deployment troubleshooting (summarized)

A long back-and-forth debugging session followed, covering:
- Explaining what `src/main.jsx` does and how the project runs
- Step-by-step Vercel deployment guidance (drag-and-drop vs. Git-based deploys)
- Diagnosing a broken local Node.js install (`npm run build` failing with
  `spawn "D:\node.exe" ENOENT`)
- Root-causing it to a corrupted Windows `ComSpec` environment variable pointing at
  `D:\node.exe` instead of `cmd.exe`, and fixing it via
  `[System.Environment]::SetEnvironmentVariable("ComSpec", "C:\WINDOWS\system32\cmd.exe", ...)`
- Fixing a Vercel "Output Directory" misconfiguration left over from an earlier drag-and-drop
  deploy, which caused 404s once the project switched to a Git-based deploy
- A full clean-slate restart: fresh GitHub repo, `git init` / `add` / `commit` / `push`, fresh
  Vercel import with auto-detected Vite settings (no manual overrides), ending in a working
  live deployment on all three routes

## 4. Final ask

> Your full project source, public and cloneable... a PROMPTS.md in the repo... this is how we
> verify the build was genuinely vibe-coded.

→ resulted in this file.
