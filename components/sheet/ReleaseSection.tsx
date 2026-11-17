import type { Entry, Release } from "@/lib/projects";
import { EntryBlock } from "./EntryBlock";
import { NowDot } from "./NowDot";

/** Consecutive half-width entries share a row; everything else stands alone. */
function groupEntries(entries: Entry[]) {
  const groups: Entry[][] = [];
  for (const entry of entries) {
    const last = groups[groups.length - 1];
    if (entry.size === "half" && last && last[0].size === "half" && last.length < 2) {
      last.push(entry);
    } else {
      groups.push([entry]);
    }
  }
  return groups;
}

interface ReleaseSectionProps {
  release: Release;
  /** The first release on the sheet: its cover loads eagerly. */
  first?: boolean;
}

/**
 * One company. The label sits in the margin and stays put while its entries
 * scroll past, the way a version number does in a changelog.
 */
export function ReleaseSection({ release, first = false }: ReleaseSectionProps) {
  const groups = groupEntries(release.entries);

  return (
    <section
      id={release.id}
      aria-labelledby={`${release.id}-label`}
      className="sheet-grid border-t-[0.5px] border-t4 py-16 max-md:py-10"
    >
      <header className="md:sticky md:top-8 md:self-start flex flex-col gap-0.5 max-md:flex-row max-md:items-baseline max-md:gap-2.5">
        {release.period && (
          <p className="type-meta text-t8 flex items-center gap-2 md:mb-1.5 max-md:order-3 max-md:ml-auto">
            {release.current && <NowDot />}
            <span>{release.period}</span>
          </p>
        )}
        <h2 id={`${release.id}-label`} className="type-small font-medium text-t12">
          {release.company}
        </h2>
        <p className="type-small text-t8">{release.role}</p>
      </header>

      <div className="flex flex-col gap-20 max-md:gap-14 min-w-0">
        {groups.map((group, g) =>
          group[0].size === "half" ? (
            <div
              key={group[0].slug}
              className="grid grid-cols-2 gap-x-6 gap-y-14 max-md:grid-cols-1"
            >
              {group.map((entry) => (
                <EntryBlock key={entry.slug} entry={entry} />
              ))}
            </div>
          ) : (
            <EntryBlock key={group[0].slug} entry={group[0]} priority={first && g === 0} />
          )
        )}
      </div>
    </section>
  );
}
