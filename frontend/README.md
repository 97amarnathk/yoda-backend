# Yoda — boxing reaction training analytics

Next.js port of the Yoda prototype, ready to deploy on Vercel.

## Run locally
```
npm install
npm run dev
```

## Deploy to Vercel
Option A — CLI:
```
npm i -g vercel
vercel
```
Option B — Git:
1. Push this folder to a GitHub repo.
2. Go to vercel.com → New Project → import the repo. Framework preset "Next.js" is auto-detected. No env vars needed.

## Structure
- `app/page.tsx` — the whole app (landing, dashboard, session detail, search) as one client component with view-switching state.
- `components/ui.tsx` — Card, Badge, Button, Input, Icon primitives matching the Yoda design system tokens.
- `lib/data.ts` — mock data generation (sessions, heatmap, trends, coach insights). Swap this for real API calls when a backend exists.
- `app/globals.css` — design tokens (colors, type, spacing, radius/shadow) as CSS variables, ported 1:1 from the Yoda design system.

Data is randomly generated client-side (seeded, so stable per load) — replace `lib/data.ts` with real fetches when you have a device/session API.
