import type { Metadata } from "next";
import { hasPage, releases } from "@/lib/projects";
import { ScrollToHash } from "@/components/ScrollToHash";
import { ProjectCaption } from "@/components/ProjectCaption";
import { ProjectMedia } from "@/components/ProjectMedia";
import { TransitionLink } from "@/components/transition/TransitionLink";

export const metadata: Metadata = {
  title: "Andy Madrick · Product Designer in San Francisco | Anthropic, Notion, Mercury",
  description:
    "Andy Madrick is a Product Designer based in San Francisco, currently at Anthropic working on Claude Code. Previously at SpaceX, Cursor, Notion, Lightfield, and Mercury. View work experience and portfolio.",
  alternates: {
    canonical: "https://madrick.design",
  },
};

/** A release that ends in media needs more room after it than one that ends in a line of text. */
function followsMedia(index: number) {
  const previous = releases[index - 1];
  return Boolean(previous && previous.projects.some(hasPage));
}

export default function Home() {
  return (
    <main className="px-7 max-md:px-5 mt-10 max-md:mt-6 pb-24 max-md:pb-16">
      <ScrollToHash />
      <h1 className="sr-only">Andy Madrick, Product Designer</h1>
      <div className="flex flex-col max-w-[940px] mx-auto">
        {releases.map((release, i) => (
          <section
            key={release.id}
            id={release.id}
            className={`flex flex-col gap-6 ${
              i === 0 ? "" : followsMedia(i) ? "mt-[120px] max-md:mt-20" : "mt-[72px] max-md:mt-12"
            }`}
          >
            <header className="flex gap-12 max-md:gap-4 text-base leading-[1.45] tracking-[0.08px] opsz-20 ff-body font-book">
              <h2 className="w-[5.5rem] shrink-0 font-medium text-t11">{release.company}</h2>
              {release.role && <p className="w-[8.5rem] shrink-0 text-t8">{release.role}</p>}
              {release.period && <p className="text-t11">{release.period}</p>}
            </header>

            <div className="flex flex-col gap-14 max-md:gap-10">
              {release.projects.map((project) => (
                <article key={project.slug} id={project.slug} className="flex flex-col gap-4">
                  <ProjectCaption
                    as="h3"
                    title={project.title}
                    description={project.description}
                  />
                  {hasPage(project) && (
                    <TransitionLink
                      href={`/work/${project.slug}`}
                      transition="open"
                      slug={project.slug}
                      data-vt-cover={project.slug}
                      aria-label={`${project.title}, open case study`}
                      className="group rounded-xl overflow-hidden relative block"
                    >
                      <ProjectMedia
                        image={project.image}
                        video={project.video}
                        poster={project.poster}
                        alt={project.title}
                        containerClassName="rounded-xl"
                        showBorder={false}
                        transitionTarget={false}
                      />
                      <div className="absolute inset-0 bg-t1 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="absolute inset-0 rounded-xl border-[0.5px] border-t2 pointer-events-none" />
                    </TransitionLink>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </main>
  );
}
