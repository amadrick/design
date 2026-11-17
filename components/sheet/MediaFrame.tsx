import Image from "next/image";
import type { Media } from "@/lib/projects";
import { vignettes } from "@/components/vignettes";
import { AutoVideo } from "./AutoVideo";

interface MediaFrameProps {
  media: Media;
  alt: string;
  /** `sizes` hint for the image optimiser. */
  sizes?: string;
  /** Load eagerly: for the first frame on the page. */
  priority?: boolean;
  /** Force a shape, e.g. "3 / 2", so frames in a row line up. Vignettes keep their own. */
  ratio?: string;
  className?: string;
}

/** Vignettes are drawn on a 16:10 stage; everything else keeps its own shape. */
function aspectRatio(media: Media, ratio?: string) {
  if (media.kind === "vignette") return "16 / 10";
  return ratio ?? `${media.width} / ${media.height}`;
}

/**
 * One frame for every kind of cover: footage, a still, or a coded vignette.
 * It owns the shape, the radius and the hairline, so they never disagree.
 */
export function MediaFrame({
  media,
  alt,
  sizes = "(max-width: 767px) 100vw, 880px",
  priority = false,
  ratio,
  className,
}: MediaFrameProps) {
  const Vignette = media.kind === "vignette" ? vignettes[media.name] : null;

  return (
    <div
      className={["relative w-full overflow-hidden rounded-xl max-md:rounded-lg bg-z2", className]
        .filter(Boolean)
        .join(" ")}
      style={{ aspectRatio: aspectRatio(media, ratio) }}
    >
      {media.kind === "video" && (
        <AutoVideo
          src={media.src}
          poster={media.poster}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      {media.kind === "image" && (
        <Image
          src={media.src}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
        />
      )}
      {Vignette && <Vignette />}
      <div className="pointer-events-none absolute inset-0 rounded-xl max-md:rounded-lg border-[0.5px] border-t3" />
    </div>
  );
}
