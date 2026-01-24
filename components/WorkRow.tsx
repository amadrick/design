interface WorkRowProps {
  company: string;
  role: string;
  period: string;
}

export function WorkRow({ company, role, period }: WorkRowProps) {
  return (
    <div className="flex gap-12 max-md:gap-4 py-0.5 opsz-20">
      <p className="w-[118px] max-md:w-20 font-book text-t11">{company}</p>
      <p className="w-[180px] max-md:w-[136px] font-book text-t8">{role}</p>
      <p className="font-book text-t11">{period}</p>
    </div>
  );
}
