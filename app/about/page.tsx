import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Andy Madrick - Philosophy + Design | Notion, San Francisco",
  description:
    "Andy Madrick is a Product Designer with a philosophy background (B.A. Philosophy, Colorado State; M. Design, UW). Currently at Notion, prev Tome (AI). His philosophy training shapes his approach to design ethics, human-AI interaction, and building thoughtful tools.",
  alternates: {
    canonical: "https://madrick.design/about",
  },
  openGraph: {
    title: "About Andy Madrick - Philosophy Meets Design",
    description:
      "Product Designer with a philosophy degree, focused on design ethics and human-centered AI. Currently at Notion in San Francisco, previously Design Engineer at Tome.",
    url: "https://madrick.design/about",
  },
};

export default function AboutPage() {
  return (
    <main className="px-6 pb-16 pt-12 max-w-2xl">
      <h1 className="text-4xl font-medium text-t11 leading-[1.2] tracking-[0.2px] mb-12">
        About
      </h1>

      <div className="flex flex-col gap-8 text-xl leading-[1.5] tracking-[0.1px]">
        <p className="text-t11">
          I&apos;m a product designer currently working at Notion, where I focus on
          building tools that help people organize their thoughts and work.
        </p>

        <p className="text-t8">
          Before Notion, I was a founding designer at Lightfield and worked as a
          design engineer at Tome. I&apos;ve also spent time at Mercury and Protopie,
          contributing to products that prioritize clarity and craft.
        </p>

        <p className="text-t8">
          I studied design at the University of Washington and philosophy at
          Colorado State University. The intersection of these fields shapes how
          I think about the purpose and ethics of the tools we build.
        </p>

        <p className="text-t8">Based in San Francisco.</p>
      </div>
    </main>
  );
}
