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
- `app/(site)/page.tsx` - home: one sheet of work, grouped by company, newest first
- `app/work/[slug]/page.tsx` - project detail page
- `app/about/page.tsx` - about page
- `app/(site)/contact/page.tsx` - contact page
- `components/` - shared UI and interactive components
- `components/transition/` - carries a cover into its case study and back (View Transitions API; plain navigation where unsupported)
- `lib/projects.ts` - single source of truth for content: `releases` (the home sheet) and `experience` / `education` (the about page)

## Content Updates

- The home page is built from `releases` in `lib/projects.ts`: one per company, newest first, each with its `projects`
- Add, remove, or reorder companies and projects there
- A project with an `image` shows its media on the home page and gets a `/work/[slug]` page, a place in the prev/next order, and a sitemap entry
- A project without an `image` is a line of text on the home page until there is something to show; add `image` (and `video`, `poster`, `images`) when there is
- The about page's Work and Study tables read from `experience` and `education` in the same file
