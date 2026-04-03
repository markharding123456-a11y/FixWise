# FixWise — Project Memory

## Status: MVP Complete (v0.1)
Built: 2026-04-02

## What It Is
A content-driven website that attracts homeowners with DIY guides and connects them with experienced, semi-retired contractors. SEO-first approach.

## Tech Stack
- **Next.js 16** (App Router, static generation for SEO)
- **Tailwind CSS v4** (via @tailwindcss/postcss)
- **SQLite** (via better-sqlite3) for contractor directory and leads
- **Markdown** content for guides (gray-matter + remark)
- **TypeScript**

## Key Files
- `src/lib/guides.ts` — Markdown processing, guide metadata
- `src/lib/db.ts` — SQLite database, contractor/lead CRUD, seed data
- `src/components/` — Header, Footer, GuideCard, ContractorCard
- `src/app/page.tsx` — Homepage (hero, categories, featured guides, CTAs)
- `src/app/guides/page.tsx` — Guide listing with category filters
- `src/app/guides/[slug]/page.tsx` — Individual guide with HowTo schema
- `src/app/find-a-pro/page.tsx` — Contractor directory (client-side search)
- `src/app/find-a-pro/[id]/page.tsx` — Contractor profile with LocalBusiness schema
- `src/app/get-help/page.tsx` — Lead generation form
- `src/app/for-contractors/page.tsx` — Contractor signup/application
- `src/app/about/page.tsx` — About page
- `src/app/api/contractors/route.ts` — Contractor search API
- `src/app/api/leads/route.ts` — Lead submission API
- `src/app/api/contractor-applications/route.ts` — Contractor application API
- `content/guides/*.md` — Guide content files
- `data/fixwise.db` — SQLite database (auto-created)
- `next.config.ts` — serverExternalPackages for better-sqlite3

## Content
5 guides written across 4 categories:
- General Repair: Leaky faucet, drywall patching
- Water & Mold: Flooded basement
- Maintenance: Seasonal checklist
- Remodeling: Bathroom renovation planning

6 demo contractors seeded (auto-seed on first API call)

## Design
- **Colors**: Blue (#1e3a5f) primary, green (#276749) for contractors, orange (#c05621) for CTAs
- **Font**: Inter
- **Style**: Clean, trustworthy, practical — not tech-startup-y
- **Logo**: SVG house icon in orange circle + FixWise text (placeholder, needs proper design)

## Important Notes
- `params` is a Promise in Next.js 16 — must await it in pages and generateMetadata
- Tailwind v4 uses `@theme inline` in globals.css for custom colors
- better-sqlite3 requires `serverExternalPackages` in next.config.ts
- Database auto-seeds demo contractors on first GET to /api/contractors

## Testing Results (2026-04-02)
- [x] Homepage renders — hero, categories, guide cards, CTAs, footer
- [x] Guide listing page — category filters working
- [x] Guide detail pages — breadcrumbs, metadata, tools/materials, content, CTA
- [x] Contractor directory — search/filter by trade and location
- [x] Contractor profiles — contact info, trades, bio
- [x] Get Help form — submits to SQLite, shows success page
- [x] For Contractors page — benefits section, application form
- [x] About page — renders correctly
- [x] Mobile responsive — tested at 375px
- [x] No console errors
- [x] No failed network requests

## Not Yet Built
- [ ] Proper logo design
- [ ] More guides (target 10+)
- [ ] Contractor self-service portal
- [ ] Email notifications for leads
- [ ] Guide comments / Q&A
- [ ] Blog
- [ ] Analytics
- [ ] Sitemap.xml / robots.txt generation
- [ ] Vercel deployment
- [ ] Domain registration (fixwise.com / fixwise.ca)

## Next Priorities
1. Design a proper logo
2. Write 5-7 more guides
3. Deploy to Vercel
4. Register domain
5. Set up analytics (Google Analytics or Plausible)
