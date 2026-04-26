# AI Jobs · Belgium

> ### 🌐 Live site: **https://verbeeckorama.github.io/ai-jobs-belgium/**
>
> _(Until the repo is renamed to `ai-jobs-belgium`, the current live URL is
> [https://verbeeckorama.github.io/yourjobrisk-be/](https://verbeeckorama.github.io/yourjobrisk-be/).
> See **[Recommended GitHub repo name](#recommended-github-repo-name)** below.)_

An independent, non-commercial research site mapping **AI exposure across
Belgium's 11 provinces and 10 ISCO-08 occupation families**. Belgian
companion to [yourjobrisk.com](https://www.yourjobrisk.com).

Pages:

- **/** — interactive Belgian AI-exposure map, occupation table, layoff strip
- **/tool** — pick a province, pick a role, pick an adoption scenario
- **/jevons** — counter-view: an AI Jevons paradox? early Belgian signals
- **/methodology** — every number, every source

---

## Recommended GitHub repo name

The repo currently lives at `verbeeckorama/yourjobrisk-be`. For SEO and
clarity, rename it to:

```
ai-jobs-belgium
```

Why: short, hyphenated, contains the three terms people actually search for
(_AI_ + _jobs_ + _Belgium_), and reads cleanly in English, Dutch and French
contexts. After renaming on GitHub (Settings → General → Repository name),
the deploy workflow auto-detects the new name and the site becomes:

> **https://verbeeckorama.github.io/ai-jobs-belgium/**

GitHub keeps a permanent redirect from the old name, so existing links stay
live.

Alternative names if `ai-jobs-belgium` is taken:

- `ai-job-risk-belgium`
- `belgium-ai-jobs`
- `aijobs-be`

---

## Stack

- Next.js 14 (App Router) + React 18
- TypeScript
- Tailwind CSS
- Static export (`output: "export"`) → fits on GitHub Pages, no server

## Run locally

```powershell
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

> **OneDrive caveat.** This repo lives in a OneDrive folder. If `next dev`
> ever shows `EBUSY: ... _ssgManifest.js` and the page returns 500, kill
> node, delete `.next/`, restart `npm run dev`. Never run `npm run build`
> while `next dev` is live — it corrupts `.next/`.

## Build

```powershell
npm run build
```

`out/` is a fully static site you can serve with any web server.

## Deploy to GitHub Pages

The site is a fully static Next.js export, so it drops straight onto
GitHub Pages.

1. Push this folder to a GitHub repository on the `main` branch.
2. In the repo: **Settings → Pages → Source = GitHub Actions**.
3. The workflow [.github/workflows/deploy.yml](.github/workflows/deploy.yml)
   does the rest on every push to `main`:
   - detects whether the repo is a user/org page (`<user>.github.io`) or a
     project page, and sets `NEXT_PUBLIC_BASE_PATH` accordingly,
   - runs `npm ci && npm run build`,
   - uploads `out/` as the Pages artifact and deploys it.

The deployed URL is shown at the top of every successful workflow run
under **Deployments → github-pages → page_url**.

### Custom domain (optional)

If you want `www.aijobs-belgium.be` (or similar) instead of the
`*.github.io` URL:

1. Add a `CNAME` file at the repo root containing the domain.
2. Set `NEXT_PUBLIC_SITE_URL=https://your-domain.tld` as a repo variable
   so canonical URLs and the sitemap point at the right place.
3. Configure the DNS A/CNAME records as documented in
   [GitHub Pages: managing a custom domain](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site).

## Configuration

[next.config.mjs](next.config.mjs):

- `output: "export"` — emits a static site to `out/`.
- `trailingSlash: true` — GitHub Pages needs `/methodology/index.html`,
  not `/methodology.html`.
- `images.unoptimized: true` — `next/image` optimisation is not available
  in `output: "export"`.
- `basePath` / `assetPrefix` — driven by `NEXT_PUBLIC_BASE_PATH` so the
  same code builds correctly for both user pages (empty) and project
  pages (`/<repo-name>`).

To preview the static build locally:

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/ai-jobs-belgium"   # match the repo name
npm run build
npx serve out
```

## Data

All figures live in [lib/data.ts](lib/data.ts). Exposure scores are
modelled from the Felten–Raj–Rock (2021) AI Occupational Exposure (AIOE)
index aggregated to ISCO-08 major groups, cross-checked against
Eloundou et al. (2023), ILO 2025, OECD Employment Outlook 2025 and the
Anthropic Economic Index 2025. Belgian employment from Statbel LFS 2024.

These numbers are **indicative** — useful for framing, not for policy
decisions.

## SEO

The site ships with auto-generated `sitemap.xml` and `robots.txt`
([app/sitemap.ts](app/sitemap.ts), [app/robots.ts](app/robots.ts)),
per-page OpenGraph + Twitter cards, JSON-LD structured data
(`WebSite` + `Dataset` on `/`, `Article` + `BreadcrumbList` on
`/jevons`), and bilingual NL/FR/EN keyword sets.

## Structure

```
app/
  layout.tsx           root HTML + global metadata + SiteNav
  page.tsx             homepage (composes sections)
  jevons/page.tsx      AI Jevons paradox — Belgian counter-view
  tool/page.tsx        scenario explorer
  methodology/page.tsx every number, every source
  sitemap.ts           auto sitemap.xml
  robots.ts            auto robots.txt
components/
  SiteNav.tsx          global sticky nav
  Hero.tsx
  BelgiumMap.tsx
  LayoffsStrip.tsx
  OccupationsTable.tsx
  Narrative.tsx
  Tool.tsx
  Footer.tsx
lib/
  data.ts              all modelled data (provinces, occupations, layoffs)
  geo.ts / geoData.ts  GeoJSON helpers for the map
public/
  be-provinces.geojson
```

## Licence

Code is MIT. Data and prose are CC BY 4.0 — please credit
**Your Job Risk · Belgium** if you reuse them.
