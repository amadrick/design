"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

interface ProjectKeyboardNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

export function ProjectKeyboardNav({ prevSlug, nextSlug }: ProjectKeyboardNavProps) {
  const router = useRouter();

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowUp" && prevSlug) {
        e.preventDefault();
        router.push(`/work/${prevSlug}`);
      }
      if (e.key === "ArrowDown" && nextSlug) {
        e.preventDefault();
        router.push(`/work/${nextSlug}`);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prevSlug, nextSlug, router]);

  return null;
}
