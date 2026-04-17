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
- `app/(site)/page.tsx` - home project grid
- `app/work/[slug]/page.tsx` - project detail page
- `app/about/page.tsx` - about page
- `app/(site)/contact/page.tsx` - contact page
- `components/` - shared UI and interactive components
- `lib/projects.ts` - single source of truth for project content/order

## Content Updates

- Add, remove, or reorder projects in `lib/projects.ts`
- Home and detail pages both read from `projectList` automatically
- `/work/[slug]` routes, nav order, and sitemap entries are generated from that same data

