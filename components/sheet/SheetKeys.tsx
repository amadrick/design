"use client";

import { useEffect } from "react";

/** How far below the top of the viewport an entry comes to rest. */
const REST = 32;

/** J and K step through the entries, the way they do in the tools this site admires. */
export function SheetKeys() {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;
      const key = e.key.toLowerCase();
      if (key !== "j" && key !== "k") return;

      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;

      const entries = Array.from(document.querySelectorAll<HTMLElement>("[data-entry]"));
      if (entries.length === 0) return;

      const tops = entries.map((el) => el.getBoundingClientRect().top - REST);
      let top: number | null = null;

      if (key === "j") {
        const next = tops.find((t) => t > 4);
        if (next !== undefined) top = window.scrollY + next;
      } else {
        const previous = tops.filter((t) => t < -4).pop();
        top = previous !== undefined ? window.scrollY + previous : 0;
      }

      if (top === null) return;
      e.preventDefault();
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollTo({ top, behavior: reduced ? "auto" : "smooth" });
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return null;
}
