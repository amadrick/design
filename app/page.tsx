import { WorkRow } from "@/components/WorkRow";
import { StudyRow } from "@/components/StudyRow";

export default function Home() {
  return (
    <main className="flex flex-col gap-[135px] px-6 pb-16 overflow-clip">
      {/* Hero */}
      <section>
        <h1 className="type-hero text-t11">
          Designer
        </h1>
      </section>

      {/* Experience Sections */}
      <div className="flex flex-col gap-20 type-body px-4">
        {/* Work */}
        <section className="flex gap-3">
          <h2 className="w-40 type-body-book text-t8 shrink-0">Work</h2>
          <div className="flex flex-col gap-2.5">
            <WorkRow company="Notion" role="Product Designer" period="Current" />
            <WorkRow company="Lightfield" role="Founding Designer" period="2024-25" />
            <WorkRow company="Tome" role="Design Engineer" period="2024-24" />
            <WorkRow company="Mercury" role="Product Designer" period="2022-24" />
            <WorkRow company="Protopie" role="Product Designer" period="2021-22" />
          </div>
        </section>

        {/* Study */}
        <section className="flex gap-3">
          <h2 className="w-40 type-body-book text-t8 shrink-0">Study</h2>
          <div className="flex flex-col gap-2.5">
            <StudyRow field="Design" school="UW Seattle" degree="Master of Design" />
            <StudyRow field="Philosophy" school="Colorado State University" degree="Bachelor of Arts" />
          </div>
        </section>
      </div>
    </main>
  );
}
