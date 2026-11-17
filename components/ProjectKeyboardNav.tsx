"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { navigateWithTransition } from "@/components/transition/viewTransition";

interface ProjectKeyboardNavProps {
  prevSlug: string | null;
  nextSlug: string | null;
}

export function ProjectKeyboardNav({ prevSlug, nextSlug }: ProjectKeyboardNavProps) {
  const router = useRouter();

  useEffect(() => {
    function go(href: string) {
      const push = (to: string) => router.push(to);
      if (!navigateWithTransition({ href, kind: "step", navigate: push })) push(href);
    }

    function handleKey(e: KeyboardEvent) {
      if (e.key === "ArrowUp" && prevSlug) {
        e.preventDefault();
        go(`/work/${prevSlug}`);
      }
      if (e.key === "ArrowDown" && nextSlug) {
        e.preventDefault();
        go(`/work/${nextSlug}`);
      }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [prevSlug, nextSlug, router]);

  return null;
}
