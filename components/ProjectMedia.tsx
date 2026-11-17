import Image from "next/image";
import { AutoVideo } from "@/components/AutoVideo";

interface ProjectMediaProps {
  image: string;
  alt: string;
  video?: string;
  /** The frame the video holds until it plays. Defaults to `image`. */
  poster?: string;
  imageSizes?: string;
  containerClassName?: string;
  borderClassName?: string;
  showBorder?: boolean;
  /** Marks the frame a cover lands on when a case study opens. Off for covers on the home page. */
  transitionTarget?: boolean;
}

function joinClasses(...classes: Array<string | false | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function ProjectMedia({
  image,
  alt,
  video,
  poster,
  imageSizes = "(max-width: 768px) 100vw, 940px",
  containerClassName,
  borderClassName,
  showBorder = true,
  transitionTarget = true,
}: ProjectMediaProps) {
  return (
    <div
      data-vt-media={transitionTarget ? "" : undefined}
      className={joinClasses(
        "aspect-video bg-z0 overflow-hidden relative w-full",
        containerClassName
      )}
    >
      {video ? (
        <AutoVideo
          src={video}
          poster={poster ?? image}
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
