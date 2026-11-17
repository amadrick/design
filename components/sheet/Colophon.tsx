import Link from "next/link";
import { education, experience, type Role } from "@/lib/projects";

function Rows({ rows }: { rows: Role[] }) {
  return (
    <ul className="flex flex-col">
      {rows.map((row) => (
        <li
          key={`${row.company}-${row.period}`}
          className="grid grid-cols-[132px_172px_minmax(0,1fr)] max-md:grid-cols-[92px_minmax(0,1fr)_auto] gap-x-3 py-1"
        >
          {row.release ? (
            <a
              href={`#${row.release}`}
              className="font-medium text-t12 underline decoration-transparent underline-offset-4 transition-colors hover:decoration-t6"
            >
              {row.company}
            </a>
          ) : (
            <span className="font-medium text-t12">{row.company}</span>
          )}
          <span className="text-t8">{row.role}</span>
          <span className="text-t11 tabular-nums">{row.period}</span>
        </li>
      ))}
    </ul>
  );
}

const linkClass =
  "text-t11 underline decoration-t5 underline-offset-4 transition-colors hover:decoration-t9";

/** The sheet's last page: the résumé in three short tables. */
export function Colophon() {
  return (
    <footer className="border-t-[0.5px] border-t4 pt-16 pb-20 max-md:pt-10 max-md:pb-14 flex flex-col gap-10 max-md:gap-8 type-small">
      <section className="sheet-grid">
        <h2 className="text-t8">Work</h2>
        <Rows rows={experience} />
      </section>

      <section className="sheet-grid">
        <h2 className="text-t8">Study</h2>
        <Rows rows={education} />
      </section>

      <section className="sheet-grid">
        <h2 className="text-t8">Elsewhere</h2>
        <ul className="flex flex-wrap gap-x-6 gap-y-1 py-1">
          <li>
            <Link href="/contact" className={linkClass}>
              Email
            </Link>
          </li>
          <li>
            <a
              href="https://x.com/andymadrick"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              X
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/andy-madrick-67815589/"
              target="_blank"
              rel="noopener noreferrer"
              className={linkClass}
            >
              LinkedIn
            </a>
          </li>
        </ul>
      </section>
    </footer>
  );
}
