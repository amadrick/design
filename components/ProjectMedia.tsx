import Image from "next/image";

interface ProjectMediaProps {
  image: string;
  alt: string;
  video?: string;
  imageSizes?: string;
  containerClassName?: string;
  borderClassName?: string;
  showBorder?: boolean;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ProjectMedia({
  image,
  alt,
  video,
  imageSizes = "(max-width: 768px) 100vw, 940px",
  containerClassName,
  borderClassName,
  showBorder = true,
}: ProjectMediaProps) {
  return (
    <div
      className={joinClasses(
        "aspect-video bg-z0 overflow-hidden relative w-full",
        containerClassName
      )}
    >
      {video ? (
        <video
          src={video}
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover"
        />
      ) : (
        <Image src={image} alt={alt} fill className="object-cover" sizes={imageSizes} />
      )}
      {showBorder && (
        <div
          className={joinClasses(
            "absolute inset-0 border-[0.5px] border-t2 pointer-events-none",
            borderClassName
          )}
        />
      )}
    </div>
  );
}
