/**
 * Single source of truth for the site's content.
 *
 * The home page is one sheet that reads like a changelog: `releases`, one per
 * company and newest first, each holding its `projects`. A project with an
 * `image` also gets a /work/[slug] page; one without is a line of text until
 * there is something to show.
 */

const BLOB = "https://5yamkyhmjxoztw18.public.blob.vercel-storage.com";

export type Entry = {
  /** Anchor on the home sheet (/#slug) and, with an `image`, the /work/[slug] route. */
  slug: string;
  title?: string;
  description: string;
  /** The still. Leave it out for a text-only entry. */
  image?: string;
  video?: string;
  /** The frame the video holds until it plays. */
  poster?: string;
  /** Stills for the /work/[slug] carousel. */
  images?: string[];
};

/** An entry that has media, and so a /work/[slug] page. */
export type Project = Entry & { title: string; image: string };

export type Release = {
  /** Anchor on the home sheet (/#id). */
  id: string;
  company: string;
  role?: string;
  period?: string;
  projects: Entry[];
};

export const releases: Release[] = [
  {
    id: "anthropic",
    company: "Anthropic",
    role: "Product Designer",
    period: "Current",
    projects: [
      {
        slug: "claude-code",
        title: "Claude Code",
        description: "Working on Claude Code. More soon.",
      },
    ],
  },
  {
    id: "spacex",
    company: "SpaceX",
    role: "Product Designer",
    period: "2026",
    projects: [
      {
        slug: "grok",
        title: "grok.com",
        description: "Redesigned grok.com.",
      },
    ],
  },
  {
    id: "cursor",
    company: "Cursor",
    role: "Product Designer",
    period: "2026",
    projects: [
      {
        slug: "cursor",
        description: "Shipped a few things.",
      },
    ],
  },
  {
    id: "notion",
    company: "Notion",
    role: "Product Designer",
    period: "2025-26",
    projects: [
      {
        slug: "meeting-notes",
        title: "AI Meeting Notes",
        description: "Designed Notion's AI notetaker.",
      },
      {
        slug: "notion-credits",
        image: "/work/1.png",
        title: "Notion Credits Dashboard",
        description:
          "Rethinking how to design a billing and credits consumption page for Notion AI.",
        video: `${BLOB}/notioncredits.mp4`,
        poster: "/work/posters/notion-credits.jpg",
      },
      {
        slug: "notion-credits-purchase",
        image: "/work/1.png",
        title: "Notion Credits Purchase Experience",
        description: "Making it easy to manage AI credits.",
        video: `${BLOB}/checkout1.mp4`,
        poster: "/work/posters/notion-credits-purchase.jpg",
      },
      {
        slug: "make-with-notion",
        image: "/work/7.png",
        title: "Make with Notion 2025",
        description: "Designed and built in-product promotional modals and experiences.",
        video: `${BLOB}/mwnedit2.mp4`,
        poster: "/work/posters/make-with-notion.jpg",
      },
      {
        slug: "ai-unboxing",
        image: "/work/ai-unboxing/1.png",
        title: "AI Unboxing",
        description:
          "Growth lever to encourage use of free AI tools. Implementing this flow resulted in a 34% uptake in AI usage.",
        images: [
          "/work/ai-unboxing/1.png",
          "/work/ai-unboxing/2.png",
          "/work/ai-unboxing/3.png",
          "/work/ai-unboxing/4.png",
        ],
      },
    ],
  },
  {
    id: "lightfield",
    company: "Lightfield",
    role: "Founding Designer",
    period: "2024-25",
    projects: [
      {
        slug: "lightfield",
        image: "/work/lightfield.png",
        title: "Lightfield",
        description:
          "I was the founding designer at Lightfield, an AI CRM.\nI designed the app and built a large swath of the front end as well.",
        video: `${BLOB}/lightfield.mp4`,
        poster: "/work/posters/lightfield.jpg",
      },
    ],
  },
  {
    id: "mercury",
    company: "Mercury",
    role: "Product Designer",
    period: "2022-24",
    projects: [
      {
        slug: "mercury-personal",
        image: "/work/merc/hero.png",
        title: "Mercury Personal",
        description: "Founding designer on Mercury's first consumer product.",
        images: ["/work/merc/hero.png", "/work/merc/1.png", "/work/merc/2.png"],
      },
    ],
  },
  {
    id: "studies",
    company: "Studies",
    projects: [
      {
        slug: "motion-design",
        image: "/work/8.png",
        title: "Motion Design Study",
        description: "Speculative redesign of the National Parks app.",
        video: `${BLOB}/sequence_01_v1%20%281080p%29.mp4`,
        poster: "/work/posters/motion-design.jpg",
      },
      {
        slug: "editorial-study",
        image: "/work/wicf/1.png",
        title: "Editorial Study",
        description: "Had some fun with Untitled Sans.",
        images: ["/work/wicf/1.png", "/work/wicf/2.png", "/work/wicf/3.png"],
      },
    ],
  },
];

/** The résumé, as shown on the about page. Includes roles with no release above. */
export type Role = {
  company: string;
  role: string;
  period: string;
};

export const experience: Role[] = [
  { company: "Anthropic", role: "Product Designer", period: "Current" },
  { company: "SpaceX", role: "Product Designer", period: "2026" },
  { company: "Cursor", role: "Product Designer", period: "2026" },
  { company: "Notion", role: "Product Designer", period: "2025-26" },
  { company: "Lightfield", role: "Founding Designer", period: "2024-25" },
  { company: "Tome", role: "Design Engineer", period: "2023-24" },
  { company: "Mercury", role: "Product Designer", period: "2022-24" },
  { company: "ProtoPie", role: "Product Designer", period: "2021-22" },
];

export const education: Role[] = [
  { company: "Design", role: "UW Seattle", period: "M. Design" },
  { company: "Philosophy", role: "Colorado State", period: "B. Arts" },
];

/* -------------------------------------------------------------------------- */
/* /work/[slug] pages                                                          */
/* -------------------------------------------------------------------------- */

export function hasPage(entry: Entry): entry is Project {
  return Boolean(entry.image && entry.title);
}

/** Every entry with media, in the order it appears on the home sheet. */
export const projectList: Project[] = releases
  .flatMap((release) => release.projects)
  .filter(hasPage);

const projectsBySlug = new Map<string, Project>(
  projectList.map((project) => [project.slug, project])
);

export function getProjectBySlug(slug: string) {
  return projectsBySlug.get(slug);
}

export function getProjectNav(slug: string) {
  const idx = projectList.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? projectList[idx - 1].slug : null,
    next: idx < projectList.length - 1 ? projectList[idx + 1].slug : null,
  };
}
