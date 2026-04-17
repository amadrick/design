import type { ReactNode } from "react";
import Link from "next/link";

interface BreadcrumbProps {
  current: ReactNode;
  truncateCurrent?: boolean;
  className?: string;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function Breadcrumb({ current, truncateCurrent = false, className }: BreadcrumbProps) {
  return (
    <div className={joinClasses("flex items-center gap-2 type-nav text-t11 min-w-0", className)}>
      <Link href="/" className="hover:text-t9 transition-colors shrink-0">
        Andy Madrick
      </Link>
      <svg width="4" height="14" viewBox="0 0 4 14" fill="none" className="shrink-0">
        <line
          x1="3.5"
          y1="0.5"
          x2="0.5"
          y2="13.5"
          stroke="currentColor"
          strokeLinecap="round"
          className="text-t6"
        />
      </svg>
      <span className={joinClasses(truncateCurrent && "truncate")}>{current}</span>
    </div>
  );
}
