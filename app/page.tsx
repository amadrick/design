import type { Metadata } from "next";
import { BreakpointFade } from "@/components/BreakpointFade";

export const metadata: Metadata = {
  title: "Andy Madrick · Product Designer in San Francisco | Notion, Mercury, Tome",
  description:
    "Andy Madrick is a Product Designer based in San Francisco, currently at Notion. Previously at Tome, Lightfield, Mercury, and ProtoPie. View work experience and portfolio.",
  alternates: {
    canonical: "https://madrick.design",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col gap-[120px] max-md:gap-12 px-6 max-md:px-5 pb-6 max-md:pb-10 overflow-clip">
      {/* Hero */}
      <section>
        <h1 className="type-hero text-t11">
          Designer
        </h1>
      </section>

      {/* Experience Sections */}
      <BreakpointFade>
        <div className="flex flex-col gap-20 max-md:gap-3 type-body">
        {/* Work */}
        <section className="flex gap-3 max-md:flex-col">
          <h2 className="w-40 type-body-book text-t8 shrink-0">Work</h2>
          <div className="flex gap-12 max-md:gap-4">
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[5.5rem]">
              <p className="py-0.5 opsz-20 font-book text-t11">Notion</p>
              <p className="py-0.5 opsz-20 font-book text-t11">Lightfield</p>
              <p className="py-0.5 opsz-20 font-book text-t11">Tome</p>
              <p className="py-0.5 opsz-20 font-book text-t11">Mercury</p>
              <p className="py-0.5 opsz-20 font-book text-t11">Protopie</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[10rem]">
              <p className="py-0.5 opsz-20 font-book text-t8">Product Designer</p>
              <p className="py-0.5 opsz-20 font-book text-t8">Founding Designer</p>
              <p className="py-0.5 opsz-20 font-book text-t8">Design Engineer</p>
              <p className="py-0.5 opsz-20 font-book text-t8">Product Designer</p>
              <p className="py-0.5 opsz-20 font-book text-t8">Product Designer</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1">
              <p className="py-0.5 opsz-20 font-book text-t11">Current</p>
              <p className="py-0.5 opsz-20 font-book text-t11">2024-25</p>
              <p className="py-0.5 opsz-20 font-book text-t11">2024-24</p>
              <p className="py-0.5 opsz-20 font-book text-t11">2022-24</p>
              <p className="py-0.5 opsz-20 font-book text-t11">2021-22</p>
            </div>
          </div>
        </section>

        {/* Study */}
        <section className="flex gap-3 max-md:flex-col">
          <h2 className="w-40 type-body-book text-t8 shrink-0">Study</h2>
          <div className="flex gap-12 max-md:gap-4">
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[5.5rem]">
              <p className="py-0.5 opsz-20 font-book text-t11">Design</p>
              <p className="py-0.5 opsz-20 font-book text-t11">Philosophy</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[10rem]">
              <p className="py-0.5 opsz-20 font-book text-t8">UW Seattle</p>
              <p className="py-0.5 opsz-20 font-book text-t8">Colorado State</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1">
              <p className="py-0.5 opsz-20 font-book text-t11">M. Design</p>
              <p className="py-0.5 opsz-20 font-book text-t11">B. Arts</p>
            </div>
          </div>
        </section>
        </div>
      </BreakpointFade>
    </main>
  );
}
