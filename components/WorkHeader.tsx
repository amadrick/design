import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";

interface WorkHeaderProps {
  title: string;
  slug: string;
  prevSlug: string | null;
  nextSlug: string | null;
}

export function WorkHeader({ title, slug, prevSlug, nextSlug }: WorkHeaderProps) {
  return (
    <header className="flex items-center justify-between h-[72px] px-7 max-md:px-5">
      <Breadcrumb current={title} truncateCurrent />
      <nav className="flex items-center gap-1.5 shrink-0">
        {prevSlug ? (
          <Link
            href={`/work/${prevSlug}`}
            className="flex items-center justify-center size-5 rounded-[6px] hover:bg-t4 transition-colors"
            aria-label="Previous project"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 8.5L7 5L10.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-t8" />
            </svg>
          </Link>
        ) : (
          <div className="flex items-center justify-center size-5 rounded-[6px]" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 8.5L7 5L10.5 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-t5" />
            </svg>
          </div>
        )}
        {nextSlug ? (
          <Link
            href={`/work/${nextSlug}`}
            className="flex items-center justify-center size-5 rounded-[6px] hover:bg-t4 transition-colors"
            aria-label="Next project"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-t8" />
            </svg>
          </Link>
        ) : (
          <div className="flex items-center justify-center size-5 rounded-[6px]" aria-hidden="true">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3.5 5.5L7 9L10.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-t5" />
            </svg>
          </div>
        )}
        <Link
          href={`/#${slug}`}
          className="flex items-center justify-center size-5 rounded-[6px] hover:bg-t4 transition-colors"
          aria-label="Close"
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M4 4L10 10M10 4L4 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="text-t8" />
          </svg>
        </Link>
      </nav>
    </header>
  );
}
