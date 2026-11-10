import type { Metadata } from "next";
import Link from "next/link";
import { profile, sections } from "@/lib/profile";
import { projectList } from "@/lib/projects";
import { Contents } from "@/components/Contents";
import { Infobox, MediaList, Prose, QuoteList, Section } from "@/components/Article";

export const metadata: Metadata = {
  title: "Andy Madrick",
  description: profile.lede,
  alternates: {
    canonical: "https://madrick.design",
  },
};

const titleOf = (id: string) => sections.find((s) => s.id === id)?.title ?? id;

export default function Home() {
  const featured = projectList.slice(0, 4);

  return (
    <main className="px-7 max-md:px-5 pb-24 max-md:pb-16">
      <div className="mx-auto max-w-[1040px] grid md:grid-cols-[168px_minmax(0,1fr)] gap-x-14 mt-6 md:mt-12">
        {/* Contents */}
        <div className="max-md:hidden">
          <Contents variant="sidebar" />
        </div>

        {/* Article */}
        <article className="min-w-0 flex flex-col gap-14 max-md:gap-10">
          <header className="flex flex-col gap-3 pb-5 border-b-[0.5px] border-t4">
            <h1 className="type-title text-t12">{profile.name}</h1>
            <p className="type-small text-t7">
              Article · Last edited {profile.now.asOf}
            </p>
          </header>

          <div className="md:hidden -mt-4">
            <Contents variant="inline" />
          </div>

          {/* Overview */}
          <div id="overview" className="scroll-mt-10 flow-root">
            <Infobox name={profile.name} facts={profile.facts} />
            <Prose>
              <p className="text-t11">{profile.lede}</p>
              {profile.overview.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </Prose>
          </div>

          <Section id="work" title={titleOf("work")}>
            <Prose>
              <p>
                {profile.work.intro}{" "}
                <Link href="/work" className="underline decoration-t5 underline-offset-[3px] hover:decoration-t9 transition-colors text-t11">
                  under Work
                </Link>
                .
              </p>
            </Prose>
            <ul className="flex flex-col">
              {profile.work.roles.map((r) => (
                <li
                  key={r.org + r.years}
                  className="grid grid-cols-[minmax(0,1fr)_auto] md:grid-cols-[120px_minmax(0,1fr)_auto] gap-x-6 gap-y-0.5 py-2.5 border-b-[0.5px] border-t3 last:border-b-0 type-article"
                >
                  <span className="text-t11 font-medium">{r.org}</span>
                  <span className="text-t9 max-md:col-span-2 max-md:order-3">
                    {r.title}
                    {r.note ? <span className="text-t8"> — {r.note}</span> : null}
                  </span>
                  <span className="text-t7 type-small tabular-nums pt-[3px] text-right">{r.years}</span>
                </li>
              ))}
            </ul>
            <div className="mt-2 flex flex-col gap-2">
              <p className="type-eyebrow text-t7">Selected projects</p>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {featured.map((p) => (
                  <li key={p.slug}>
                    <Link href={`/work/${p.slug}`} className="group flex flex-col gap-2">
                      <div className="aspect-[4/3] rounded-lg overflow-hidden border-[0.5px] border-t3 bg-z2">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={p.image}
                          alt=""
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      </div>
                      <span className="type-small text-t9 group-hover:text-t11 transition-colors leading-snug">
                        {p.title}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
              <Link href="/work" className="type-small text-t8 hover:text-t11 transition-colors w-fit mt-1">
                All work →
              </Link>
            </div>
          </Section>

          <Section id="reading" title={titleOf("reading")}>
            <MediaList items={profile.reading} />
          </Section>

          <Section id="watching" title={titleOf("watching")}>
            <MediaList items={profile.watching} />
          </Section>

          <Section id="listening" title={titleOf("listening")}>
            <MediaList items={profile.listening} />
          </Section>

          <Section id="quotes" title={titleOf("quotes")}>
            <QuoteList quotes={profile.quotes} />
          </Section>

          <Section id="now" title={titleOf("now")}>
            <p className="type-small text-t7 -mt-2">As of {profile.now.asOf}</p>
            <Prose>
              <ul className="flex flex-col gap-2 list-disc pl-5 marker:text-t5">
                {profile.now.items.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </Prose>
          </Section>

          <Section id="references" title={titleOf("references")}>
            <ol className="flex flex-col gap-2">
              {profile.references.map((r, i) => (
                <li key={r.href} className="grid grid-cols-[1.5rem_1fr] gap-x-2 type-small">
                  <span className="text-t6 tabular-nums">{i + 1}</span>
                  <span className="text-t9">
                    <a
                      href={r.href}
                      target={r.href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="text-t11 underline decoration-t5 underline-offset-[3px] hover:decoration-t9 transition-colors"
                    >
                      {r.label}
                    </a>
                    {r.detail ? <span className="text-t7"> · {r.detail}</span> : null}
                  </span>
                </li>
              ))}
            </ol>
          </Section>
        </article>
      </div>
    </main>
  );
}
