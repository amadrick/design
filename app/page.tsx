export default function Home() {
  return (
    <div className="min-h-screen bg-z1 overflow-clip">
      {/* Header */}
      <header className="flex items-center justify-between px-7 py-6">
        <p className="text-sm font-medium text-t11 tracking-[0.07px] leading-[1.45]">
          Andy Madrick
        </p>
        <div className="flex items-center gap-1.5">
          <span className="text-sm font-medium text-t11 tracking-[0.07px] leading-[1.45]">
            Contact
          </span>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex flex-col gap-[135px] px-6 pb-16">
        {/* Hero */}
        <section>
          <h1 className="text-[288px] font-medium text-t11 leading-[1.19] tracking-[1.44px]">
            Designer
          </h1>
        </section>

        {/* Experience Sections */}
        <div className="flex flex-col gap-20 text-xl leading-[1.19] tracking-[0.1px] px-4">
          {/* Work */}
          <section className="flex gap-3">
            <h2 className="w-40 font-[450] text-t8 shrink-0">Work</h2>
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
            <h2 className="w-40 font-[450] text-t8 shrink-0">Study</h2>
            <div className="flex flex-col gap-2.5">
              <StudyRow field="Design" school="UW Seattle" degree="Master of Design" />
              <StudyRow field="Philosophy" school="Colorado State University" degree="Bachelor of Arts" />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}

function WorkRow({ company, role, period }: { company: string; role: string; period: string }) {
  return (
    <div className="flex gap-12">
      <p className="w-[118px] font-medium text-t11">{company}</p>
      <p className="w-[244px] font-[450] text-t8">{role}</p>
      <p className="font-[450] text-t11">{period}</p>
    </div>
  );
}

function StudyRow({ field, school, degree }: { field: string; school: string; degree: string }) {
  return (
    <div className="flex gap-12">
      <p className="w-[118px] font-medium text-t11">{field}</p>
      <p className="w-[244px] font-[450] text-t8">{school}</p>
      <p className="font-[450] text-t11">{degree}</p>
    </div>
  );
}
