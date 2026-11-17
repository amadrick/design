"use client";

import { useEffect, useRef, useState } from "react";

interface AutoVideoProps {
  src: string;
  poster: string;
  className?: string;
}

/**
 * A muted loop that only plays while it is on screen, and never when the
 * visitor has asked for reduced motion. The poster holds the frame until then.
 */
export function AutoVideo({ src, poster, className }: AutoVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let onScreen = false;

    const sync = () => {
      if (onScreen && !reduced.matches && document.visibilityState === "visible") {
        if (video.preload !== "auto") video.preload = "auto";
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
      { threshold: 0.25, rootMargin: "200px 0px" }
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
      onPlaying={() => setReady(true)}
      data-ready={ready ? "true" : "false"}
      className={className}
    />
  );
}
