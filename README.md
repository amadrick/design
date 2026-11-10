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
- `app/(site)/page.tsx` - home page: an encyclopedia-style article about Andy
- `app/(site)/work/page.tsx` - project grid
- `app/work/[slug]/page.tsx` - project detail page
- `app/(site)/contact/page.tsx` - contact page
- `components/Article.tsx`, `components/Contents.tsx` - article layout pieces
- `components/` - shared UI and interactive components
- `lib/profile.ts` - single source of truth for the home page (facts, media, quotes, now)
- `lib/projects.ts` - single source of truth for project content/order
- `/about` redirects to `/`

## Content Updates

- Edit the home page article (lede, quick facts, reading/watching/listening, quotes, now) in `lib/profile.ts`
- Sections and their order live in the `sections` array in the same file

- Add, remove, or reorder projects in `lib/projects.ts`
- Home and detail pages both read from `projectList` automatically
- `/work/[slug]` routes, nav order, and sitemap entries are generated from that same data

