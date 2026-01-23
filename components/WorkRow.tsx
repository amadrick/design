interface WorkRowProps {
  company: string;
  role: string;
  period: string;
}

export function WorkRow({ company, role, period }: WorkRowProps) {
  return (
    <div className="flex gap-12 max-md:gap-4 opsz-20">
      <p className="w-[118px] max-md:w-20 font-medium text-t11">{company}</p>
      <p className="w-[244px] max-md:w-[136px] font-[450] text-t8">{role}</p>
      <p className="font-[450] text-t11">{period}</p>
    </div>
  );
}
