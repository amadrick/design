interface StudyRowProps {
  field: string;
  school: string;
  degree: string;
}

export function StudyRow({ field, school, degree }: StudyRowProps) {
  return (
    <div className="flex gap-12 opsz-20">
      <p className="w-[118px] font-medium text-t11">{field}</p>
      <p className="w-[244px] font-[450] text-t8">{school}</p>
      <p className="font-[450] text-t11">{degree}</p>
    </div>
  );
}
