# Madrick Portfolio

A modern, responsive portfolio website built with Next.js, TypeScript, and Tailwind CSS.

## Features

- 🚀 Built with Next.js 14 (App Router)
- 💻 TypeScript for type safety
- 🎨 Tailwind CSS for styling
- 🌙 Dark mode support
- 📱 Fully responsive design
- ⚡ Fast and optimized

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
```

2. Run the development server:
```bash
npm run dev
# or
yarn dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## Project Structure

```
madrick/
├── app/                 # Next.js app directory
│   ├── about/          # About page
│   ├── projects/       # Projects page
│   ├── contact/        # Contact page
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # Reusable components
│   ├── Header.tsx      # Navigation header
│   └── Footer.tsx      # Footer component
├── public/             # Static assets
└── package.json        # Dependencies and scripts
```

## Customization

### Update Personal Information

1. **Home Page**: Edit `app/page.tsx` to update your introduction
2. **About Page**: Edit `app/about/page.tsx` to add your bio and skills
3. **Projects Page**: Edit `app/projects/page.tsx` to showcase your projects
4. **Contact Page**: Edit `app/contact/page.tsx` to update contact links and form

### Update Branding

- Change the site name "Madrick" in `components/Header.tsx` and `app/layout.tsx`
- Update colors in `tailwind.config.ts` or modify the Tailwind classes throughout components

### Add New Pages

Create new directories in the `app/` folder with a `page.tsx` file. Next.js will automatically create routes for them.

## Build for Production

```bash
npm run build
npm start
```

## Deploy

This project can be easily deployed on:
- [Vercel](https://vercel.com) (recommended for Next.js)
- [Netlify](https://netlify.com)
- Any platform that supports Node.js

## License

MIT

