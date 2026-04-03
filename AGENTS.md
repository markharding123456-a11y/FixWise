<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# FixWise Development Guide

## Quick Start
```bash
npm install
npm run dev
```
Site runs at http://localhost:3000

## What This Project Is
FixWise is a static website that combines DIY home repair guides with a directory of experienced, semi-retired contractors. The **semi-retired angle is the core brand identity** — every feature, piece of content, and design choice should reinforce this.

## Architecture Rules
- This is a **static export** site (`output: "export"` in next.config.ts). No API routes, no server-side dynamic features.
- Deployed to **GitHub Pages** with basePath `/FixWise`. All internal links must work with this prefix.
- Push to `master` triggers auto-deploy via GitHub Actions.

## How to Add Content

### New Guide
1. Create `content/guides/{slug}.md` with frontmatter (see existing guides for format)
2. **Also** add a matching entry to `src/lib/guides-data.ts` — required because the listing page is a client component
3. Push to master — auto-deploys

### New Contractor
Add entry to `src/lib/contractors-data.ts`. Push to master.

## Code Patterns
- **Server components** (guide detail, contractor profile) can use `src/lib/guides.ts` (reads filesystem)
- **Client components** (guide listing, contractor listing) use `src/lib/guides-data.ts` and `src/lib/contractors-data.ts` (no fs)
- `params` is a **Promise** in Next.js 16 — always `await params`
- Custom colors: `--color-fw-*` tokens in `src/app/globals.css` via `@theme inline`
- Responsive: mobile-first, test at 375px

## Brand Voice
- **Honest and direct** — say when it's DIY and when to call a pro
- **Experience is the selling point** — "30 years" beats "affordable"
- **No corporate speak** — write like a tradesman, not a marketing department
- Contractor profiles need personality — real stories, real people

## Don't
- Don't add API routes (static export)
- Don't use `searchParams` in server components (breaks static export)
- Don't forget to update `guides-data.ts` when adding markdown guides
- Don't make it feel like a tech startup — it's a trusted tradesman's recommendation
