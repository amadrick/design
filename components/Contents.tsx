"use client";

import { useEffect, useState } from "react";
import { sections, sectionNumber } from "@/lib/profile";

/**
 * Table of contents. `variant="sidebar"` is the sticky desktop column;
 * `variant="inline"` is the collapsible block shown under the title on mobile.
 * Highlights the section nearest the top of the viewport.
 */
export function Contents({ variant }: { variant: "sidebar" | "inline" }) {
  const [active, setActive] = useState<string>(sections[0].id);

  useEffect(() => {
    const headings = sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-10% 0px -70% 0px", threshold: 0 }
    );
    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, []);

  const list = (
    <ol className="flex flex-col">
      {sections.map((s) => {
        const isActive = s.id === active;
        const n = sectionNumber(s.id);
        return (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`flex gap-2.5 py-[5px] type-toc transition-colors ${
                isActive ? "text-t11" : "text-t8 hover:text-t10"
              }`}
              aria-current={isActive ? "true" : undefined}
            >
              <span className="tabular-nums w-4 shrink-0 text-t6">{n ?? ""}</span>
              <span>{s.title}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );

  if (variant === "sidebar") {
    return (
      <nav aria-label="Contents" className="max-md:hidden sticky top-10">
        <p className="type-eyebrow text-t7 mb-2">Contents</p>
        {list}
      </nav>
    );
  }

  return (
    <details className="md:hidden group rounded-lg border-[0.5px] border-t4 bg-z2 px-4 py-3">
      <summary className="flex items-center justify-between type-eyebrow text-t8 cursor-pointer list-none select-none [&::-webkit-details-marker]:hidden">
        Contents
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="transition-transform group-open:rotate-180">
          <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </summary>
      <div className="mt-2">{list}</div>
    </details>
  );
}
