interface ProjectCaptionProps {
  title?: string;
  description: string;
  /** Heading level for the title: h1 on a case-study page, h3 on the home sheet. */
  as?: "h1" | "h3";
}

export function ProjectCaption({ title, description, as: Title = "h1" }: ProjectCaptionProps) {
  return (
    <div className="flex flex-col w-[315px] max-md:w-full shrink-0 ff-body leading-[1.45] tracking-[0.07px] text-sm opsz-20">
      {title && <Title className="font-semibold text-t11">{title}</Title>}
      <p className="text-t9 whitespace-pre-line">{description}</p>
    </div>
  );
}
