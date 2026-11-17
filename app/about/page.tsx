import type { Metadata } from "next";
import { BreakpointFade } from "@/components/BreakpointFade";
import { Breadcrumb } from "@/components/Breadcrumb";
import { experience, education, type Role } from "@/lib/projects";

function RoleTable({ title, rows }: { title: string; rows: Role[] }) {
  return (
    <section className="flex gap-3 max-md:flex-col">
      <h2 className="w-[140px] text-t8 shrink-0">{title}</h2>
      <div className="flex gap-12 max-md:gap-4">
        <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[5.5rem]">
          {rows.map((r) => (
            <p key={r.company} className="py-0.5 font-medium text-t11">{r.company}</p>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 max-md:gap-1 min-w-[8.5rem]">
          {rows.map((r) => (
            <p key={r.company} className="py-0.5 text-t8">{r.role}</p>
          ))}
        </div>
        <div className="flex flex-col gap-1.5 max-md:gap-1">
          {rows.map((r) => (
            <p key={r.company} className="py-0.5 text-t11">{r.period}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

export const metadata: Metadata = {
  title: "About · Andy Madrick · Product Designer",
  description:
    "Andy Madrick is a Product Designer based in San Francisco, currently at Anthropic working on Claude Code. Previously at SpaceX, Cursor, Notion, Lightfield, Tome, Mercury, and ProtoPie. View work experience and portfolio.",
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
        <RoleTable title="Work" rows={experience} />
        <RoleTable title="Study" rows={education} />
        </div>
      </BreakpointFade>
    </main>
  );
}
