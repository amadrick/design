import { WorkRow } from "@/components/WorkRow";
import { StudyRow } from "@/components/StudyRow";
import { BreakpointFade } from "@/components/BreakpointFade";

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
        <div className="flex flex-col gap-20 max-md:gap-6 type-body">
        {/* Work */}
        <section className="flex gap-3 max-md:flex-col">
          <h2 className="w-40 type-body-book text-t8 shrink-0">Work</h2>
          <div className="flex flex-col gap-1.5 max-md:gap-1">
            <WorkRow company="Notion" role="Product Designer" period="Current" />
            <WorkRow company="Lightfield" role="Founding Designer" period="2024-25" />
            <WorkRow company="Tome" role="Design Engineer" period="2024-24" />
            <WorkRow company="Mercury" role="Product Designer" period="2022-24" />
            <WorkRow company="Protopie" role="Product Designer" period="2021-22" />
          </div>
        </section>

        {/* Study */}
        <section className="flex gap-3 max-md:flex-col">
          <h2 className="w-40 type-body-book text-t8 shrink-0">Study</h2>
          <div className="flex flex-col gap-1.5 max-md:gap-1">
            <StudyRow field="Design" school="UW Seattle" degree="M. Design" />
            <StudyRow field="Philosophy" school="Colorado State" degree="B. Arts" />
          </div>
        </section>
        </div>
      </BreakpointFade>
    </main>
  );
}
