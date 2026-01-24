interface StudyRowProps {
  field: string;
  school: string;
  degree: string;
}

export function StudyRow({ field, school, degree }: StudyRowProps) {
  return (
    <div className="flex gap-12 max-md:gap-4 py-0.5 opsz-20">
      <p className="w-[118px] max-md:w-20 font-book text-t11">{field}</p>
      <p className="w-[180px] max-md:w-[136px] font-book text-t8">{school}</p>
      <p className="font-book text-t11">{degree}</p>
    </div>
  );
}
