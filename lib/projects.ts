/**
 * Single source of truth for the site's content.
 *
 * The home page is a changelog: a list of `releases` (one per company, newest
 * first), each holding `entries` (the case studies). Entries marked `page: true`
 * also get a /work/[slug] page, and feed the sitemap through `projectList`.
 */

const BLOB = "https://5yamkyhmjxoztw18.public.blob.vercel-storage.com";

export type VignetteName = "claude-code" | "grok" | "cursor" | "meeting-notes";

export type Media =
  | { kind: "video"; src: string; poster: string; width: number; height: number; caption?: string }
  | { kind: "image"; src: string; width: number; height: number; caption?: string }
  | { kind: "vignette"; name: VignetteName; caption?: string };

/** The changelog's vocabulary. Each line of "what I did" starts with one. */
export type Verb = "now" | "designed" | "built" | "launched" | "result";

export type Change = {
  verb: Verb;
  text: string;
};

export type Entry = {
  /** Anchor on the sheet (/#slug) and, when `page` is set, the /work/[slug] route. */
  slug: string;
  title: string;
  /** Optional stamp shown beside the title, e.g. "Apr 2024". */
  date?: string;
  /** One or two sentences. What it is. */
  summary: string;
  /** What I did, as changelog lines. */
  changes?: Change[];
  /** The cover. */
  media: Media;
  /** Supporting media, shown two-up beneath the cover. */
  more?: Media[];
  /** Half-width entries sit side by side with the next half-width entry. */
  size?: "full" | "half";
  /** Give this entry a /work/[slug] page. */
  page?: boolean;
  /** Stills for the /work/[slug] carousel. */
  images?: string[];
  /** Longer caption for the /work/[slug] page. Falls back to `summary`. */
  description?: string;
};

export type Release = {
  /** Anchor on the sheet (/#id). */
  id: string;
  company: string;
  role: string;
  /** Written the way it should read, e.g. "2024 — 25". Omit for undated groups. */
  period?: string;
  /** Marks the release that is still shipping. */
  current?: boolean;
  entries: Entry[];
};

export const releases: Release[] = [
  {
    id: "anthropic",
    company: "Anthropic",
    role: "Product Designer",
    period: "2026 — Now",
    current: true,
    entries: [
      {
        slug: "claude-code",
        title: "Claude Code",
        summary: "Working on Claude Code, Anthropic's agentic coding tool.",
        changes: [{ verb: "now", text: "In progress. The write-up lands here when it's ready." }],
        media: { kind: "vignette", name: "claude-code" },
      },
    ],
  },
  {
    id: "spacex",
    company: "SpaceX",
    role: "Product Designer",
    period: "2026",
    entries: [
      {
        slug: "grok",
        title: "grok.com",
        summary: "A redesign of grok.com, the home of Grok on the web.",
        changes: [{ verb: "designed", text: "The redesign of grok.com" }],
        media: { kind: "vignette", name: "grok" },
      },
    ],
  },
  {
    id: "cursor",
    company: "Cursor",
    role: "Product Designer",
    period: "2026",
    entries: [
      {
        slug: "cursor",
        title: "Cursor",
        summary: "A few things, shipped.",
        media: { kind: "vignette", name: "cursor" },
      },
    ],
  },
  {
    id: "notion",
    company: "Notion",
    role: "Product Designer",
    period: "2025 — 26",
    entries: [
      {
        slug: "meeting-notes",
        title: "AI Meeting Notes",
        summary: "Notion records the meeting and writes the notes.",
        changes: [{ verb: "designed", text: "AI Meeting Notes" }],
        media: { kind: "vignette", name: "meeting-notes" },
      },
      {
        slug: "notion-credits",
        title: "Notion credits",
        summary: "How a workspace sees, tracks and buys the credits that Notion AI runs on.",
        description:
          "Rethinking how to design a billing and credits consumption page for Notion AI.",
        changes: [
          {
            verb: "designed",
            text: "The credits dashboard, rethinking billing and consumption for Notion AI",
          },
          { verb: "designed", text: "The purchase experience, making credits easy to manage" },
        ],
        media: {
          kind: "video",
          src: `${BLOB}/notioncredits.mp4`,
          poster: "/work/posters/notion-credits.jpg",
          width: 3022,
          height: 1760,
        },
        more: [
          {
            kind: "video",
            src: `${BLOB}/checkout1.mp4`,
            poster: "/work/posters/notion-credits-purchase.jpg",
            width: 2686,
            height: 1574,
            caption: "Purchase",
          },
          { kind: "image", src: "/work/1.png", width: 2066, height: 1378, caption: "Usage" },
        ],
        page: true,
        images: ["/work/1.png", "/work/3.png"],
      },
      {
        slug: "make-with-notion",
        title: "Make with Notion 2025",
        date: "Sep 2025",
        summary: "Designed and built the in-product promotional modals and experiences.",
        description: "Designed and built in-product promotional modals and experiences.",
        media: {
          kind: "video",
          src: `${BLOB}/mwnedit2.mp4`,
          poster: "/work/posters/make-with-notion.jpg",
          width: 2584,
          height: 1836,
        },
        size: "half",
        page: true,
      },
      {
        slug: "ai-unboxing",
        title: "AI Unboxing",
        summary: "A growth lever to encourage use of the free AI tools.",
        description:
          "Growth lever to encourage use of free AI tools. Implementing this flow resulted in a 34% uptake in AI usage.",
        changes: [{ verb: "result", text: "34% uptake in AI usage" }],
        media: { kind: "image", src: "/work/2.png", width: 1376, height: 922 },
        size: "half",
        page: true,
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
    period: "2024 — 25",
    entries: [
      {
        slug: "lightfield",
        title: "Lightfield",
        summary: "An AI CRM, from the first screen.",
        description:
          "I was the founding designer at Lightfield, an AI CRM.\nI designed the app and built a large swath of the front end as well.",
        changes: [
          { verb: "designed", text: "The app, as founding designer" },
          { verb: "built", text: "A large swath of the front end" },
        ],
        media: {
          kind: "video",
          src: `${BLOB}/lightfield.mp4`,
          poster: "/work/posters/lightfield.jpg",
          width: 2834,
          height: 1580,
        },
        more: [
          { kind: "image", src: "/work/6.png", width: 2726, height: 1706, caption: "Account" },
          {
            kind: "image",
            src: "/work/lightfield-ds.png",
            width: 7680,
            height: 4320,
            caption: "Component spec",
          },
        ],
        page: true,
        images: ["/work/lightfield.png", "/work/6.png", "/work/lightfield-ds.png"],
      },
    ],
  },
  {
    id: "mercury",
    company: "Mercury",
    role: "Product Designer",
    period: "2022 — 24",
    entries: [
      {
        slug: "mercury-personal",
        title: "Mercury Personal",
        date: "Apr 2024",
        summary: "Personal banking, Mercury's first consumer product.",
        description: "Founding designer on Mercury's first consumer product.",
        changes: [
          { verb: "designed", text: "Mercury's first consumer product, as its founding designer" },
          { verb: "launched", text: "Personal banking" },
        ],
        media: { kind: "image", src: "/work/merc/hero.png", width: 4294, height: 2404 },
        more: [
          { kind: "image", src: "/work/merc/1.png", width: 4294, height: 2404, caption: "Card" },
          {
            kind: "image",
            src: "/work/merc/2.png",
            width: 4294,
            height: 2404,
            caption: "Early access",
          },
        ],
        page: true,
        images: ["/work/merc/hero.png", "/work/merc/1.png", "/work/merc/2.png"],
      },
    ],
  },
  {
    id: "studies",
    company: "Studies",
    role: "Self-initiated",
    entries: [
      {
        slug: "motion-design",
        title: "Motion Design Study",
        summary: "Speculative redesign of the National Parks app.",
        media: {
          kind: "video",
          src: `${BLOB}/sequence_01_v1%20%281080p%29.mp4`,
          poster: "/work/posters/motion-design.jpg",
          width: 1920,
          height: 1080,
        },
        size: "half",
        page: true,
      },
      {
        slug: "editorial-study",
        title: "Editorial Study",
        summary: "Had some fun with Untitled Sans.",
        media: { kind: "image", src: "/work/wicf/1.png", width: 3500, height: 2187 },
        size: "half",
        page: true,
        images: ["/work/wicf/1.png", "/work/wicf/2.png", "/work/wicf/3.png"],
      },
    ],
  },
];

/** Everything on the résumé, including roles that have no release on the sheet. */
export type Role = {
  company: string;
  role: string;
  period: string;
  /** Release id to link to, when there is one. */
  release?: string;
};

export const experience: Role[] = [
  { company: "Anthropic", role: "Product Designer", period: "Current", release: "anthropic" },
  { company: "SpaceX", role: "Product Designer", period: "2026", release: "spacex" },
  { company: "Cursor", role: "Product Designer", period: "2026", release: "cursor" },
  { company: "Notion", role: "Product Designer", period: "2025-26", release: "notion" },
  { company: "Lightfield", role: "Founding Designer", period: "2024-25", release: "lightfield" },
  { company: "Tome", role: "Design Engineer", period: "2023-24" },
  { company: "Mercury", role: "Product Designer", period: "2022-24", release: "mercury" },
  { company: "ProtoPie", role: "Product Designer", period: "2021-22" },
];

export const education: Role[] = [
  { company: "Design", role: "UW Seattle", period: "M. Design" },
  { company: "Philosophy", role: "Colorado State", period: "B. Arts" },
];

/* -------------------------------------------------------------------------- */
/* /work/[slug] pages                                                          */
/* -------------------------------------------------------------------------- */

export type Project = {
  slug: string;
  image: string;
  title: string;
  description: string;
  video?: string;
  images?: string[];
};

function toProject(entry: Entry): Project {
  const { media } = entry;
  const image =
    media.kind === "video" ? media.poster : media.kind === "image" ? media.src : "/og-image.png";
  return {
    slug: entry.slug,
    image: entry.images?.[0] ?? image,
    title: entry.title,
    description: entry.description ?? entry.summary,
    video: media.kind === "video" ? media.src : undefined,
    images: entry.images,
  };
}

export const entryList: Entry[] = releases.flatMap((release) => release.entries);

export const projectList: Project[] = entryList.filter((entry) => entry.page).map(toProject);

const projectsBySlug = new Map<string, Project>(
  projectList.map((project) => [project.slug, project])
);

export function getProjectBySlug(slug: string) {
  return projectsBySlug.get(slug);
}

/** The sheet entry behind a /work/[slug] page, for its "what I did" lines. */
export function getEntryBySlug(slug: string) {
  return entryList.find((entry) => entry.slug === slug);
}

export function getProjectNav(slug: string) {
  const idx = projectList.findIndex((p) => p.slug === slug);
  if (idx === -1) return { prev: null, next: null };
  return {
    prev: idx > 0 ? projectList[idx - 1].slug : null,
    next: idx < projectList.length - 1 ? projectList[idx + 1].slug : null,
  };
}
