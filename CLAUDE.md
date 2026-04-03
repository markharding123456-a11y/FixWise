# FixWise — Project Memory

## Status: MVP Live (v0.2)
Built: 2026-04-02 | Deployed: GitHub Pages

**Live site:** https://markharding123456-a11y.github.io/FixWise/

## What It Is
A content-driven website that attracts homeowners with DIY guides and connects them with experienced, semi-retired contractors. The semi-retired angle is the core differentiator — nobody else owns this niche. SEO-first approach.

## Tech Stack
- **Next.js 16** (App Router, static export for GitHub Pages)
- **Tailwind CSS v4** (via @tailwindcss/postcss)
- **Markdown** content for guides (gray-matter + remark)
- **TypeScript**
- **GitHub Pages** hosting (auto-deploys via GitHub Actions on push to master)

## Architecture
The site is fully static — no server, no database, no API routes. All data lives in TypeScript files and markdown. This keeps hosting free and deployment simple.

- **Guides** are markdown files in `content/guides/` — processed at build time by `src/lib/guides.ts` into static HTML pages with HowTo schema
- **Contractor data** lives in `src/lib/contractors-data.ts` — static TypeScript array, client-side search/filter
- **Guide metadata** (for listing pages) is in `src/lib/guides-data.ts` — must be kept in sync with the markdown files
- **Forms** (Get Help, Contractor Signup) show the UI but don't persist data yet — they simulate submission for the demo

## Key Files
- `content/guides/*.md` — Guide content (markdown with frontmatter)
- `src/lib/guides.ts` — Server-side markdown processing (fs-based, used by [slug] pages)
- `src/lib/guides-data.ts` — Client-side guide metadata (no fs, used by listing pages)
- `src/lib/contractors-data.ts` — All contractor data and search functions
- `src/components/` — Header, Footer, GuideCard, ContractorCard
- `src/app/page.tsx` — Homepage
- `src/app/guides/page.tsx` — Guide listing with category filters (client component)
- `src/app/guides/[slug]/page.tsx` — Individual guide (server component, uses guides.ts)
- `src/app/find-a-pro/page.tsx` — Contractor directory (client component)
- `src/app/find-a-pro/[id]/page.tsx` — Contractor profile (server component)
- `src/app/get-help/page.tsx` — Lead form (demo mode)
- `src/app/for-contractors/page.tsx` — Contractor application (demo mode)
- `src/app/about/page.tsx` — About page
- `next.config.ts` — Static export config with /FixWise basePath
- `.github/workflows/deploy.yml` — GitHub Pages deployment

## Adding a New Guide
1. Create `content/guides/your-slug.md` with frontmatter (see existing guides for format)
2. Add matching entry to `src/lib/guides-data.ts` in the `guides` array
3. Push to master — GitHub Actions auto-builds and deploys

## Adding a New Contractor
1. Add entry to `src/lib/contractors-data.ts` in the `contractors` array
2. Push to master

## Design
- **Colors**: Blue (#1e3a5f) primary, green (#276749) for contractors, orange (#c05621) for CTAs
- **Font**: Inter
- **Style**: Clean, trustworthy, practical — "experienced tradesman" not "tech startup"
- **Brand voice**: Honest, direct, no BS. Tell people when it's DIY and when it's not.
- **Core angle**: Semi-retired pros with decades of experience, fair prices, no upselling

## Important Technical Notes
- `params` is a Promise in Next.js 16 — must await it
- Tailwind v4 uses `@theme inline` in globals.css for custom colors
- `output: "export"` in next.config.ts — no API routes, no server components that use dynamic features
- `basePath: "/FixWise"` — required for GitHub Pages subdirectory hosting
- Guide listing page is a client component (can't use searchParams with static export)
- When adding guides, you must update BOTH the markdown file AND guides-data.ts

## Content
5 guides across 4 categories:
- General Repair: Leaky faucet, drywall patching
- Water & Mold: Flooded basement
- Maintenance: Seasonal checklist
- Remodeling: Bathroom renovation planning

6 demo contractors seeded across US and Canada

## Next Priorities
1. Lean harder into the semi-retired pro angle — rework copy, profile format, content voice
2. Add "Why I'm still at it" stories to contractor profiles
3. Write guides from the pro's perspective ("What a 35-year plumber wants you to know")
4. Design a proper logo
5. Write 5-7 more guides
6. Add video walkthrough support
7. Set up a real backend (forms, contractor self-signup)
8. Register domain (fixwise.com / fixwise.ca)
9. Set up analytics
