"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ProjectCaption } from "@/components/ProjectCaption";
import { ProjectMedia } from "@/components/ProjectMedia";

interface ImageCarouselProps {
  images: string[];
  alt: string;
  video?: string;
  title: string;
  description: string;
}

export function ImageCarousel({ images, alt, video, title, description }: ImageCarouselProps) {
  const [current, setCurrent] = useState(0);
  const currentRef = useRef(0);
  const total = images.length;

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(index, total - 1));
    currentRef.current = next;
    setCurrent(next);
  }, [total]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") goTo(currentRef.current - 1);
      if (e.key === "ArrowRight") goTo(currentRef.current + 1);
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goTo]);

  const image = images[current] ?? images[0];
  if (!image) return null;

  const showVideo = Boolean(video) && current === 0;

  return (
    <>
      <ProjectMedia
        image={image}
        video={showVideo ? video : undefined}
        alt={`${alt} – ${current + 1}`}
        containerClassName="rounded-xl max-md:rounded-lg"
        borderClassName="rounded-xl max-md:rounded-lg"
      />
      <div className="flex items-start justify-between max-md:flex-col max-md:gap-4">
        <ProjectCaption title={title} description={description} />
        {total > 1 && (
          <div className="flex items-center gap-2 mt-0.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`size-2 rounded-full transition-colors ${
                  i === current ? "bg-z7" : "bg-z5 hover:bg-z6"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
