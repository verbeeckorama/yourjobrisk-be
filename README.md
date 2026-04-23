# Your Job Risk · Belgium

A Belgian companion to [yourjobrisk.com](https://www.yourjobrisk.com): a
single-page landing site that models AI exposure across Belgium's 11
provinces and 10 ISCO-08 occupation families.

## Stack

- Next.js 14 (App Router) + React 18
- TypeScript
- Tailwind CSS

## Run locally

```powershell
npm install
npm run dev
```

Open http://localhost:3000.

## Build

```powershell
npm run build
npm run start
```

## Deploy to GitHub Pages

The site is a fully static Next.js export (no server code at runtime), so
it drops straight onto GitHub Pages.

1. Push this folder to a GitHub repository on the `main` branch.
2. In the repo: **Settings → Pages → Source = GitHub Actions**.
3. The included workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
   does the rest on every push to `main`:
   - detects whether the repo is a user/org page (`<user>.github.io`) or a
     project page, and sets `NEXT_PUBLIC_BASE_PATH` accordingly,
   - runs `npm ci && npm run build`,
   - uploads `out/` as the Pages artifact and deploys it.

Configuration lives in [next.config.mjs](next.config.mjs):

- `output: "export"` — emits a static site to `out/`.
- `trailingSlash: true` — GitHub Pages needs `/methodology/index.html`,
  not `/methodology.html`.
- `images.unoptimized: true` — `next/image` optimisation is not available
  in `output: "export"`.
- `basePath` / `assetPrefix` — driven by `NEXT_PUBLIC_BASE_PATH` so the
  same code builds correctly for both user pages (empty) and project
  pages (`/<repo-name>`).

To test the static build locally:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/your-repo-name"   # omit for user pages
npm run build
npx serve out
```

## Data

All figures live in [lib/data.ts](lib/data.ts). Exposure scores are modelled
from the Felten–Raj–Rock (2021) AI Occupational Exposure index aggregated to
ISCO-08 major groups, combined with approximate Statbel LFS 2023 employment
shares. Province workforce totals are rounded Statbel 2024 figures. Layoff
figures come from public press announcements and are narrative, not precise.

These numbers are **indicative** — useful for framing, not for policy
decisions. Swap the constants in `lib/data.ts` with vetted sources before
publishing.

## Structure

```
app/
  layout.tsx      # root HTML + metadata
  page.tsx        # composes sections
  globals.css     # Tailwind + base styles
components/
  Hero.tsx
  LayoffsStrip.tsx
  ProvinceCartogram.tsx
  OccupationsTable.tsx
  Narrative.tsx
  Footer.tsx
lib/
  data.ts         # all modelled data
```
