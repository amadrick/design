# Madrick Portfolio

Portfolio site built with Next.js App Router, TypeScript, and Tailwind CSS.

## Local Development

```bash
npm install
npm run dev
```

If Next cache gets stale, use:

```bash
npm run clean
```

## Scripts

- `npm run dev` - start dev server
- `npm run build` - production build
- `npm run start` - serve production build
- `npm run lint` - run ESLint
- `npm run clean` - clear `.next` and start dev server

## Project Structure

- `app/layout.tsx` - root metadata and global shell
- `app/(site)/layout.tsx` - shared header for home/contact routes
- `app/(site)/page.tsx` - home page, the changelog sheet
- `app/work/[slug]/page.tsx` - project detail page
- `app/about/page.tsx` - about page
- `app/(site)/contact/page.tsx` - contact page
- `components/` - shared UI and interactive components
- `components/sheet/` - pieces of the changelog sheet: `ReleaseSection` (a company, label in the margin), `EntryBlock` (a case study), `ChangeList` (the verb lines), `MediaFrame` (covers), `AutoVideo`, `Colophon` (the résumé tables), `SheetKeys` (J/K stepping), `NowDot`
- `components/vignettes/` - coded, looping covers for entries with no footage yet; drawn on a fixed 960x600 stage (`Stage.tsx`)
- `app/lab/` - unlinked dev-only preview routes for the vignettes; they 404 in production
- `lib/projects.ts` - single source of truth for content

## Content Updates

- The home page is built from `releases` in `lib/projects.ts`: one per company, newest first. Each release has `id`, `company`, `role`, `period`, an optional `current: true`, and its `entries`
- To add an entry, push an object onto that release's `entries`. Order on the page is array order. An entry needs `slug`, `title`, `summary`, and `media`; optional fields are:
  - `changes`: "what I did" lines, each `{ verb, text }`. `verb` is `now`, `designed`, `built`, `launched`, or `result`
  - `media`: the cover, one of `{ kind: "video", src, poster, width, height }`, `{ kind: "image", src, width, height }`, or `{ kind: "vignette", name }`
  - `more`: supporting media, shown two-up beneath the cover. Each can take a `caption`
  - `size: "half"`: the entry takes half a row, and two half entries in a row sit side by side
  - `date`: a stamp beside the title, e.g. `"Sep 2025"`
  - `page: true`: creates a `/work/[slug]` page and a sitemap entry. Those pages can also take `images` (the carousel) and `description` (a longer caption, falling back to `summary`)
- A vignette cover is swapped for real footage by changing that entry's `media` in `lib/projects.ts` to a `video` or `image`. `name` is one of `claude-code`, `grok`, `cursor`, or `meeting-notes`
- `experience` and `education` in `lib/projects.ts` feed the Work and Study tables at the bottom of the home page and on the about page. A row with a `release` links to that release on the home page

