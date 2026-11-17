import type { Metadata } from "next";
import { entryList, releases } from "@/lib/projects";
import { ScrollToHash } from "@/components/ScrollToHash";
import { Colophon } from "@/components/sheet/Colophon";
import { ReleaseSection } from "@/components/sheet/ReleaseSection";
import { SheetKeys } from "@/components/sheet/SheetKeys";

export const metadata: Metadata = {
  title: "Andy Madrick · Product Designer in San Francisco | Anthropic, Notion, Mercury",
  description:
    "Andy Madrick is a Product Designer based in San Francisco, currently at Anthropic working on Claude Code. Previously at SpaceX, Cursor, Notion, Lightfield, and Mercury. A changelog of the work.",
  alternates: {
    canonical: "https://madrick.design",
  },
};

function Company({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <a
      href={`#${id}`}
      className="text-t12 underline decoration-transparent decoration-1 underline-offset-[5px] transition-colors duration-200 hover:decoration-t6"
    >
      {children}
    </a>
  );
}

export default function Home() {
  return (
    <main className="px-7 max-md:px-5">
      <ScrollToHash />
      <SheetKeys />
      <div className="mx-auto max-w-[1128px]">
        {/* Statement */}
        <section className="sheet-grid pt-14 pb-20 max-md:pt-6 max-md:pb-12">
          <p className="type-small text-t8 md:pt-[7px] max-md:hidden">
            Product Designer
            <br />
            San Francisco
          </p>
          <h1 className="type-intro text-t8 max-w-[660px]">
            <span className="text-t12">I&apos;m a product designer who builds.</span> Right now
            I&apos;m at <Company id="anthropic">Anthropic</Company>, working on Claude Code. Before
            that I redesigned grok.com at <Company id="spacex">SpaceX</Company>, shipped a few
            things at <Company id="cursor">Cursor</Company>, designed Meeting Notes and credits at{" "}
            <Company id="notion">Notion</Company>, was the founding designer at{" "}
            <Company id="lightfield">Lightfield</Company>, and launched personal banking at{" "}
            <Company id="mercury">Mercury</Company>.
          </h1>
        </section>

        {/* Changelog */}
        <div className="sheet-grid max-md:flex max-md:items-baseline max-md:justify-between pb-4 max-md:pb-3 type-meta text-t8">
          <p>changelog</p>
          <p className="flex items-center justify-between gap-4">
            <span>{entryList.length} entries, newest first</span>
            <span className="flex items-center gap-1.5 max-md:hidden" aria-hidden="true">
              <kbd className="keycap">J</kbd>
              <kbd className="keycap">K</kbd>
              <span className="ml-1">to step</span>
            </span>
          </p>
        </div>

        {releases.map((release, i) => (
          <ReleaseSection key={release.id} release={release} first={i === 0} />
        ))}

        <Colophon />
      </div>
    </main>
  );
}
