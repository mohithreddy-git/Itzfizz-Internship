# Welcome Itzfizz — Scroll Car Hero

A single scroll-driven hero section: a pinned black/green strip with an
orange McLaren 720S (top view) driving left → right as you scroll, revealing
the "WELCOME ITZFIZZ" headline and four stat cards along the way. Built as an
accurate recreation of a reference implementation — see
`src/animations/heroAnimation.js` for the exact reveal math.

## Tech Stack

- Next.js 16 (App Router, static export)
- React 19
- JavaScript / JSX — no TypeScript anywhere in the project
- Tailwind CSS v4
- GSAP + ScrollTrigger

## How it works

Everything is driven off a single normalized scroll progress value (0 → 1)
computed by one `ScrollTrigger` with `scrub: 1`, pinning the hero for 100vh
of extra scroll (`src/components/Hero.jsx` + `src/animations/heroAnimation.js`):

- **Car** — `gsap.set(car, { x })`, translated from the left edge to past the
  right edge.
- **Green reveal** — a full-width trail element scaled on `scaleX` from a
  transform origin of `left center`.
- **Headline** — "WELCOME ITZFIZZ" is revealed via `clip-path`, synced to the
  same car-position marker as the green trail, so the car visually uncovers
  the letters as it passes over them.
- **Stat cards** — four cards (`src/components/StatCard.jsx`) fade/translate/
  scale in across staggered windows of the same progress value.

Because every visual is a pure function of `progress`, scrolling back up
replays the entire sequence in reverse with no special-cased logic.

## Local Setup

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
```

Produces a static export in `./out` (`output: "export"` in `next.config.mjs`).

## Deployment

A GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and
deploys `./out` to GitHub Pages on every push to `main`, setting
`NEXT_PUBLIC_BASE_PATH=/<repo-name>` so assets (including the car image,
referenced via a plain `<img>` tag) resolve under the project subpath.
Enable **Pages → Source: GitHub Actions** once in repo settings.

The same build also runs unmodified on Vercel (`NEXT_PUBLIC_BASE_PATH` is
unset there, so `basePath` stays empty).

## Live Demo

_Not yet deployed._

## GitHub Repository

_Not yet pushed._
