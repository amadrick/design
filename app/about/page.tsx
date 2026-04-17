import type { Metadata } from "next";
import { BreakpointFade } from "@/components/BreakpointFade";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "About · Andy Madrick · Product Designer",
  description:
    "Andy Madrick is a Product Designer based in San Francisco, currently at Notion. Previously at Tome, Lightfield, Mercury, and ProtoPie. View work experience and portfolio.",
  alternates: {
    canonical: "https://madrick.design/about",
  },
};

export default function AboutPage() {
  return (
    <main className="flex flex-col gap-16 max-md:gap-10 px-7 max-md:px-5 pb-6 max-md:pb-10 overflow-clip">
      <Breadcrumb current="About" />

      {/* Hero */}
      <section>
        <h1 className="type-hero text-t11">
          Designer
        </h1>
      </section>

      {/* Experience Sections */}
      <BreakpointFade>
        <div className="flex flex-col gap-10 max-md:gap-3 text-base leading-[1.45] tracking-[0.08px] opsz-20 ff-body font-book">
        {/* Work */}
        <section className="flex gap-3 max-md:flex-col">
          <h2 className="w-[140px] text-t8 shrink-0">Work</h2>
          <div className="flex gap-12 max-md:gap-4">
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[5.5rem]">
              <p className="py-0.5 font-medium text-t11">Notion</p>
              <p className="py-0.5 font-medium text-t11">Lightfield</p>
              <p className="py-0.5 font-medium text-t11">Tome</p>
              <p className="py-0.5 font-medium text-t11">Mercury</p>
              <p className="py-0.5 font-medium text-t11">ProtoPie</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[8.5rem]">
              <p className="py-0.5 text-t8">Product Designer</p>
              <p className="py-0.5 text-t8">Founding Designer</p>
              <p className="py-0.5 text-t8">Design Engineer</p>
              <p className="py-0.5 text-t8">Product Designer</p>
              <p className="py-0.5 text-t8">Product Designer</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1">
              <p className="py-0.5 text-t11">Current</p>
              <p className="py-0.5 text-t11">2024-25</p>
              <p className="py-0.5 text-t11">2023-24</p>
              <p className="py-0.5 text-t11">2022-24</p>
              <p className="py-0.5 text-t11">2021-22</p>
            </div>
          </div>
        </section>

        {/* Study */}
        <section className="flex gap-3 max-md:flex-col">
          <h2 className="w-[140px] text-t8 shrink-0">Study</h2>
          <div className="flex gap-12 max-md:gap-4">
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[5.5rem]">
              <p className="py-0.5 font-medium text-t11">Design</p>
              <p className="py-0.5 font-medium text-t11">Philosophy</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[8.5rem]">
              <p className="py-0.5 text-t8">UW Seattle</p>
              <p className="py-0.5 text-t8">Colorado State</p>
            </div>
            <div className="flex flex-col gap-1.5 max-md:gap-1">
              <p className="py-0.5 text-t11">M. Design</p>
              <p className="py-0.5 text-t11">B. Arts</p>
            </div>
          </div>
        </section>
        </div>
      </BreakpointFade>
    </main>
  );
}
