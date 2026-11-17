"use client";

import { useEffect, useRef } from "react";

interface AutoVideoProps {
  src: string;
  poster?: string;
  className?: string;
}

/**
 * A muted loop that plays only while it is on screen, and holds its poster
 * when the visitor has asked for reduced motion.
 */
export function AutoVideo({ src, poster, className }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !reduced.matches && document.visibilityState === "visible") {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        sync();
      },
      { threshold: 0.2 }
    );
    io.observe(video);

    document.addEventListener("visibilitychange", sync);
    reduced.addEventListener("change", sync);

    return () => {
      io.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduced.removeEventListener("change", sync);
    };
  }, []);

  return (
    <video
      ref={ref}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      aria-hidden="true"
      className={className}
    />
  );
}
