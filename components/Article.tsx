import type { ReactNode } from "react";
import type { Fact, MediaItem, Quote } from "@/lib/profile";
import { sectionNumber } from "@/lib/profile";

export function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-10 flex flex-col gap-4">
      <h2 className="type-h2 text-t11 flex items-baseline gap-3 pb-2 border-b-[0.5px] border-t4">
        <span className="text-t6 tabular-nums">{sectionNumber(id)}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

export function Prose({ children }: { children: ReactNode }) {
  return <div className="type-article text-t10 flex flex-col gap-4">{children}</div>;
}

export function Infobox({ name, facts }: { name: string; facts: Fact[] }) {
  return (
    <aside
      aria-label="Quick facts"
      className="md:float-right md:ml-8 md:mb-4 md:w-[260px] max-md:w-full max-md:mb-6 rounded-lg border-[0.5px] border-t4 bg-z2 overflow-hidden"
    >
      <div className="px-4 py-3 border-b-[0.5px] border-t4">
        <p className="type-infobox-title text-t11">{name}</p>
      </div>
      <dl className="px-4 py-3 flex flex-col gap-1.5">
        {facts.map((f, i) => (
          <div key={i} className="grid grid-cols-[88px_1fr] gap-3 type-small">
            <dt className="text-t8">{f.label}</dt>
            <dd className="text-t11">
              {f.href ? (
                <a
                  href={f.href}
                  target={f.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="underline decoration-t5 underline-offset-[3px] hover:decoration-t9 transition-colors"
                >
                  {f.value}
                </a>
              ) : (
                f.value
              )}
            </dd>
          </div>
        ))}
      </dl>
    </aside>
  );
}

export function MediaList({ items }: { items: MediaItem[] }) {
  return (
    <ul className="flex flex-col">
      {items.map((m) => (
        <li
          key={m.title}
          className="grid md:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] gap-x-8 gap-y-0.5 py-3 border-b-[0.5px] border-t3 last:border-b-0"
        >
          <div className="type-article">
            <span className="text-t11 font-medium">
              {m.href ? (
                <a href={m.href} target="_blank" rel="noopener noreferrer" className="hover:text-t9 transition-colors">
                  {m.title}
                </a>
              ) : (
                m.title
              )}
            </span>
            <span className="text-t8">
              {" "}
              · {m.by}
              {m.year ? ` · ${m.year}` : ""}
            </span>
          </div>
          {m.note ? <p className="type-small text-t8 md:text-t9">{m.note}</p> : <span />}
        </li>
      ))}
    </ul>
  );
}

export function QuoteList({ quotes }: { quotes: Quote[] }) {
  return (
    <ol className="flex flex-col gap-7">
      {quotes.map((q, i) => (
        <li key={i} className="grid grid-cols-[1.5rem_1fr] gap-x-2">
          <span className="type-small text-t6 tabular-nums pt-[3px]">{i + 1}</span>
          <blockquote className="flex flex-col gap-2">
            <p className="type-quote text-t11">“{q.text}”</p>
            <footer className="type-small text-t8">
              {q.who}
              {q.source ? <span className="text-t7">, {q.source}</span> : null}
            </footer>
          </blockquote>
        </li>
      ))}
    </ol>
  );
}
