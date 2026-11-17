import Link from "next/link";
import type { Entry } from "@/lib/projects";
import { ChangeList } from "./ChangeList";
import { MediaFrame } from "./MediaFrame";

interface EntryBlockProps {
  entry: Entry;
  /** Load the cover eagerly: for the first entry on the page. */
  priority?: boolean;
}

/** Frames that share a row share a shape, so their edges line up. */
const HALF_RATIO = "3 / 2";
const MORE_RATIO = "16 / 10";

function Heading({ entry }: { entry: Entry }) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-baseline gap-3">
        <h3 className="type-title text-t12">{entry.title}</h3>
        {entry.date && <span className="type-meta text-t8">{entry.date}</span>}
      </div>
      <p className="type-text text-t9 max-w-[420px]">{entry.summary}</p>
    </div>
  );
}

function Cover({ entry, priority }: EntryBlockProps) {
  const half = entry.size === "half";
  const frame = (
    <MediaFrame
      media={entry.media}
      alt={entry.title}
      priority={priority}
      ratio={half ? HALF_RATIO : undefined}
      sizes={half ? "(max-width: 767px) 100vw, 428px" : undefined}
    />
  );

  if (!entry.page) return frame;

  return (
    <Link
      href={`/work/${entry.slug}`}
      aria-label={`${entry.title}, open case study`}
      className="group relative block rounded-xl max-md:rounded-lg"
    >
      {frame}
      <span className="pointer-events-none absolute inset-0 rounded-xl max-md:rounded-lg bg-t1 opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </Link>
  );
}

/**
 * One case study.
 *
 * Full entries lead with words: title and summary on the left, "what I did" on
 * the right, then the cover and any supporting media.
 * Half entries lead with the cover, so two of them line up side by side.
 */
export function EntryBlock({ entry, priority = false }: EntryBlockProps) {
  const half = entry.size === "half";
  const changes = entry.changes?.length ? <ChangeList changes={entry.changes} /> : null;

  if (half) {
    return (
      <article id={entry.slug} data-entry className="flex flex-col gap-5">
        <Cover entry={entry} />
        <div className="flex flex-col gap-4">
          <Heading entry={entry} />
          {changes}
        </div>
      </article>
    );
  }

  return (
    <article id={entry.slug} data-entry className="flex flex-col gap-6 max-md:gap-5">
      <header className="grid grid-cols-2 gap-x-6 gap-y-4 max-md:grid-cols-1">
        <Heading entry={entry} />
        {changes && <div className="md:pt-[5px]">{changes}</div>}
      </header>

      <Cover entry={entry} priority={priority} />

      {entry.more && entry.more.length > 0 && (
        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 max-md:gap-5">
          {entry.more.map((media, i) => (
            <figure key={i} className="flex flex-col gap-2.5">
              <MediaFrame
                media={media}
                alt={`${entry.title}: ${media.caption ?? `detail ${i + 1}`}`}
                ratio={MORE_RATIO}
                sizes="(max-width: 767px) 100vw, 428px"
              />
              {media.caption && (
                <figcaption className="type-meta text-t8">{media.caption}</figcaption>
              )}
            </figure>
          ))}
        </div>
      )}
    </article>
  );
}
