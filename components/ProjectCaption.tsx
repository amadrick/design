interface ProjectCaptionProps {
  title: string;
  description: string;
}

export function ProjectCaption({ title, description }: ProjectCaptionProps) {
  return (
    <div className="flex flex-col w-[315px] max-md:w-full shrink-0 ff-body leading-[1.45] tracking-[0.07px] text-sm opsz-20">
      <h1 className="font-semibold text-t11">{title}</h1>
      <p className="text-t9 whitespace-pre-line">{description}</p>
    </div>
  );
}
