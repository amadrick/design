export type Project = {
  slug: string;
  image: string;
  title: string;
  description: string;
  video?: string;
  images?: string[];
};

export const projectList: Project[] = [
  {
    slug: "make-with-notion",
    image: "/work/7.png",
    title: "Make with Notion 2025",
    description: "Designed and built in-product promotional modals and experiences.",
    video: "https://5yamkyhmjxoztw18.public.blob.vercel-storage.com/mwnedit2.mp4",
  },
  {
    slug: "motion-design",
    image: "/work/8.png",
    title: "Motion Design Study",
    description: "Speculative redesign of the National Parks app.",
    video: "https://5yamkyhmjxoztw18.public.blob.vercel-storage.com/sequence_01_v1%20%281080p%29.mp4",
  },
  {
    slug: "notion-credits",
    image: "/work/1.png",
    title: "Notion Credits Dashboard",
    description: "Rethinking how to design a billing and credits consumption page for Notion AI.",
    video: "https://5yamkyhmjxoztw18.public.blob.vercel-storage.com/notioncredits.mp4",
  },
  {
    slug: "lightfield",
    image: "/work/lightfield.png",
    title: "Lightfield",
    description: "I was the founding designer at Lightfield, an AI CRM.\nI designed the app and built a large swath of the front end as well.",
    video: "https://5yamkyhmjxoztw18.public.blob.vercel-storage.com/lightfield.mp4",
  },
  {
    slug: "notion-credits-purchase",
    image: "/work/1.png",
    title: "Notion Credits Purchase Experience",
    description: "Making it easy to manage AI credits.",
    video: "https://5yamkyhmjxoztw18.public.blob.vercel-storage.com/checkout1.mp4",
  },
  {
    slug: "editorial-study",
    image: "/work/wicf/1.png",
    title: "Editorial Study",
    description: "Had some fun with Untitled Sans.",
    images: [
      "/work/wicf/1.png",
      "/work/wicf/2.png",
      "/work/wicf/3.png",
    ],
  },
  {
    slug: "mercury-personal",
    image: "/work/merc/hero.png",
    title: "Mercury Personal",
    description: "Founding designer on Mercury's first consumer product.",
    images: [
      "/work/merc/hero.png",
      "/work/merc/1.png",
      "/work/merc/2.png",
    ],
  },
  {
    slug: "ai-unboxing",
    image: "/work/ai-unboxing/1.png",
    title: "AI Unboxing",
    description: "Growth lever to encourage use of free AI tools. Implementing this flow resulted in a 34% uptake in AI usage.",
    images: [
      "/work/ai-unboxing/1.png",
      "/work/ai-unboxing/2.png",
      "/work/ai-unboxing/3.png",
      "/work/ai-unboxing/4.png",
    ],
  },
];

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
