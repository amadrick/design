import type { ReactNode } from "react";

/**
 * Preview bench for a single vignette: once at sheet width, once at phone width.
 * Lives under /lab, which is not linked, indexed, or built for production.
 */
export function LabPage({ name, children }: { name: string; children: ReactNode }) {
  return (
    <main className="px-7 max-md:px-5 py-10">
      <p className="type-meta text-t8 mb-6">lab / {name}</p>
      <div className="flex flex-col gap-10">
        <div
          id="stage-large"
          className="relative w-full max-w-[880px] aspect-[16/10] rounded-xl overflow-hidden"
        >
          {children}
          <div className="absolute inset-0 rounded-xl border-[0.5px] border-t3 pointer-events-none" />
        </div>
        <div
          id="stage-small"
          className="relative w-[335px] aspect-[16/10] rounded-lg overflow-hidden"
        >
          {children}
          <div className="absolute inset-0 rounded-lg border-[0.5px] border-t3 pointer-events-none" />
        </div>
      </div>
    </main>
  );
}
