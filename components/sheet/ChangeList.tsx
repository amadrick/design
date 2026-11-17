import type { Change } from "@/lib/projects";

/** "What I did", set like a changelog: a verb in the margin, then the line. */
export function ChangeList({ changes }: { changes: Change[] }) {
  return (
    <ul className="flex flex-col">
      {changes.map((change, i) => (
        <li
          key={i}
          className="grid grid-cols-[84px_minmax(0,1fr)] items-baseline gap-x-3 border-t-[0.5px] border-t3 py-2 last:border-b-[0.5px]"
        >
          <span className="type-meta text-t8">{change.verb}</span>
          <span className="type-small text-t11">{change.text}</span>
        </li>
      ))}
    </ul>
  );
}
