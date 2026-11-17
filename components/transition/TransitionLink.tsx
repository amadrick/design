"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ComponentProps, MouseEvent } from "react";
import { isModifiedClick, navigateWithTransition, type TransitionKind } from "./viewTransition";

type TransitionLinkProps = Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  transition: TransitionKind;
  /** The case study the link opens or closes, for "open" and "close". */
  slug?: string;
};

/**
 * A `next/link` that navigates inside a view transition when it can, and
 * behaves exactly like `next/link` when it cannot.
 */
export function TransitionLink({ href, transition, slug, onClick, ...props }: TransitionLinkProps) {
  const router = useRouter();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    onClick?.(e);
    if (e.defaultPrevented || isModifiedClick(e)) return;
    const handled = navigateWithTransition({
      href,
      kind: transition,
      slug,
      navigate: (to) => router.push(to),
    });
    if (handled) e.preventDefault();
  }

  return <Link href={href} onClick={handleClick} {...props} />;
}
