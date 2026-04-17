import type { Metadata } from "next";
import Link from "next/link";
import { projectList } from "@/lib/projects";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ProjectMedia } from "@/components/ProjectMedia";

export const metadata: Metadata = {
  title: "Andy Madrick · Product Designer in San Francisco | Notion, Mercury, Tome",
  description:
    "Andy Madrick is a Product Designer based in San Francisco, currently at Notion. Previously at Tome, Lightfield, Mercury, and ProtoPie. View work experience and portfolio.",
  alternates: {
    canonical: "https://madrick.design",
  },
};

export default function Home() {
  return (
    <main className="px-7 max-md:px-5 mt-10 max-md:mt-6 pb-10">
      <ScrollToHash />
      <div className="flex flex-col gap-10 max-w-[940px] mx-auto">
        {projectList.map((project) => (
          <Link
            key={project.slug}
            id={project.slug}
            href={`/work/${project.slug}`}
            className="group rounded-xl overflow-hidden relative block"
          >
            <ProjectMedia
              image={project.image}
              video={project.video}
              alt={project.title}
              containerClassName="rounded-xl"
              showBorder={false}
            />
            <div className="absolute inset-0 bg-t1 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="absolute inset-0 rounded-xl border-[0.5px] border-t2 pointer-events-none" />
          </Link>
        ))}
      </div>
    </main>
  );
}
