import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getProjectBySlug, getProjectNav, projectList } from "@/lib/projects";
import { WorkHeader } from "@/components/WorkHeader";
import { ImageCarousel } from "@/components/ImageCarousel";
import { ProjectKeyboardNav } from "@/components/ProjectKeyboardNav";
import { ProjectMedia } from "@/components/ProjectMedia";
import { ProjectCaption } from "@/components/ProjectCaption";

export function generateStaticParams() {
  return projectList.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: `${project.title} · Andy Madrick`,
    description: project.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const { prev, next } = getProjectNav(slug);
  const carouselImages = project.images ?? [];
  const hasCarousel = carouselImages.length > 0;

  return (
    <>
      <ProjectKeyboardNav prevSlug={prev} nextSlug={next} />
      <WorkHeader title={project.title} slug={slug} prevSlug={prev} nextSlug={next} />
      <main className="px-7 max-md:px-5 mt-10 max-md:mt-6">
        <div className="flex flex-col gap-8 max-w-[940px] mx-auto">
          {hasCarousel ? (
            <ImageCarousel
              images={carouselImages}
              alt={project.title}
              video={project.video}
              title={project.title}
              description={project.description}
            />
          ) : (
            <>
              <ProjectMedia
                image={project.image}
                video={project.video}
                alt={project.title}
                containerClassName="rounded-xl max-md:rounded-lg"
                borderClassName="rounded-xl max-md:rounded-lg"
              />
              <div className="flex items-start max-md:flex-col max-md:gap-4">
                <ProjectCaption title={project.title} description={project.description} />
              </div>
            </>
          )}
        </div>
      </main>
    </>
  );
}
