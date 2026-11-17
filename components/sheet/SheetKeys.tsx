"use client";

import { useEffect } from "react";

/** How far below the top of the viewport an entry comes to rest. */
const REST = 32;

function scrollToY(top: number) {
  const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  window.scrollTo({ top: Math.max(0, top), behavior: reduced ? "auto" : "smooth" });
}

/**
 * Getting around the sheet without a mouse wheel.
 * J and K step through the entries, the way they do in the tools this site
 * admires, and in-page links (the company names in the statement, the rows of
 * the Work table) glide to their release instead of jumping.
 */
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
      scrollToY(top);
    }

    function onClick(e: MouseEvent) {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.altKey || e.shiftKey) return;

      const link = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>("a[href^='#']");
      const id = link?.getAttribute("href")?.slice(1);
      if (!link || !id) return;

      const section = document.getElementById(id);
      if (!section) return;

      e.preventDefault();
      scrollToY(window.scrollY + section.getBoundingClientRect().top);
      // Move focus with the view, so the next Tab continues from the release.
      section.setAttribute("tabindex", "-1");
      section.style.outline = "none";
      section.focus({ preventScroll: true });
    }

    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, []);

  return null;
}
