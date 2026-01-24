"use client";

import { useEffect, useRef } from "react";

export function BreakpointFade({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const wasDesktop = useRef<boolean | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");

    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const isDesktop = e.matches;

      if (wasDesktop.current !== null && wasDesktop.current !== isDesktop) {
        ref.current?.classList.remove("breakpoint-fade");
        void ref.current?.offsetWidth; // trigger reflow
        ref.current?.classList.add("breakpoint-fade");
      }

      wasDesktop.current = isDesktop;
    };

    handleChange(mq);
    mq.addEventListener("change", handleChange);

    return () => mq.removeEventListener("change", handleChange);
  }, []);

  return <div ref={ref}>{children}</div>;
}
