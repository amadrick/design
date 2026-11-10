/**
 * Single source of truth for the home page "article".
 *
 * Everything on the home page reads from here. Media and quotes below are a
 * first draft to show the shape of the page — swap them for your own picks.
 */

export type Fact = { label: string; value: string; href?: string };

export type MediaItem = {
  title: string;
  by: string;
  year?: string;
  note?: string;
  href?: string;
};

export type Quote = {
  text: string;
  who: string;
  source?: string;
};

export type Reference = { label: string; href: string; detail?: string };

export const profile = {
  name: "Andy Madrick",
  pronunciation: "MAD-rick",
  /** The one-line description under the title. */
  lede:
    "Andy Madrick is a product designer and design engineer based in San Francisco. He currently works at Notion.",
  /** Opening paragraphs. Keep these short; the sections do the rest. */
  overview: [
    "Madrick studied philosophy before design, and most of his work sits where the two meet: tools for thinking, interfaces for systems that are hard to see, and the question of what software should ask of a person's attention.",
    "He has worked as a founding designer at early-stage companies and as a design engineer, shipping both the design and a good share of the front end. Outside of work he rides bikes, reads more than he finishes, and keeps a running list of the things below.",
  ],
  facts: [
    { label: "Based in", value: "San Francisco" },
    { label: "Occupation", value: "Product designer, design engineer" },
    { label: "Currently", value: "Notion", href: "https://notion.so" },
    { label: "Previously", value: "Lightfield, Tome, Mercury, ProtoPie" },
    { label: "Education", value: "M.Des, University of Washington" },
    { label: "", value: "B.A. Philosophy, Colorado State" },
    { label: "Website", value: "madrick.design", href: "https://madrick.design" },
  ] satisfies Fact[],

  work: {
    intro:
      "A short account of where Madrick has worked. Selected projects are collected separately",
    roles: [
      { org: "Notion", title: "Product Designer", years: "2024–present", note: "AI billing and credits, in-product growth, Make with Notion." },
      { org: "Lightfield", title: "Founding Designer", years: "2024–25", note: "Designed an AI-native CRM and built much of its front end." },
      { org: "Tome", title: "Design Engineer", years: "2023–24", note: "Prototyping and production UI for an AI presentation tool." },
      { org: "Mercury", title: "Product Designer", years: "2022–24", note: "Founding designer on Mercury's first consumer product." },
      { org: "ProtoPie", title: "Product Designer", years: "2021–22" },
    ],
  },

  reading: [
    { title: "Zen and the Art of Motorcycle Maintenance", by: "Robert M. Pirsig", year: "1974", note: "Quality as something you recognize before you can define it." },
    { title: "The Timeless Way of Building", by: "Christopher Alexander", year: "1979", note: "The best argument for why some things feel alive and others don't." },
    { title: "Gödel, Escher, Bach", by: "Douglas Hofstadter", year: "1979", note: "Read it for the dialogues." },
    { title: "The Sovereignty of Good", by: "Iris Murdoch", year: "1970", note: "Attention as a moral act. Short, dense, worth rereading." },
    { title: "The Design of Everyday Things", by: "Don Norman", year: "1988", note: "Obvious now because of this book." },
  ] satisfies MediaItem[],

  watching: [
    { title: "Columbus", by: "Kogonada", year: "2017", note: "A film about looking at buildings and what that does to two people." },
    { title: "Paris, Texas", by: "Wim Wenders", year: "1984" },
    { title: "Stalker", by: "Andrei Tarkovsky", year: "1979" },
    { title: "Jiro Dreams of Sushi", by: "David Gelb", year: "2011", note: "Craft as repetition." },
  ] satisfies MediaItem[],

  listening: [
    { title: "Blue", by: "Joni Mitchell", year: "1971" },
    { title: "In a Silent Way", by: "Miles Davis", year: "1969" },
    { title: "Music for Airports", by: "Brian Eno", year: "1978", note: "Working music." },
    { title: "Either/Or", by: "Elliott Smith", year: "1997" },
  ] satisfies MediaItem[],

  quotes: [
    { text: "Attention is the rarest and purest form of generosity.", who: "Simone Weil", source: "Letter to Joë Bousquet, 1942" },
    { text: "Weniger, aber besser. Less, but better.", who: "Dieter Rams" },
    { text: "The real cycle you're working on is a cycle called yourself.", who: "Robert M. Pirsig", source: "Zen and the Art of Motorcycle Maintenance" },
    { text: "Love is the extremely difficult realisation that something other than oneself is real.", who: "Iris Murdoch", source: "The Sublime and the Good" },
    { text: "The limits of my language mean the limits of my world.", who: "Ludwig Wittgenstein", source: "Tractatus Logico-Philosophicus, 5.6" },
  ] satisfies Quote[],

  /** What's going on right now. Date it so it's obviously a snapshot. */
  now: {
    asOf: "November 2026",
    items: [
      "Designing at Notion.",
      "Riding more than last year. Mostly road, some gravel when the Headlands are dry.",
      "Rereading Murdoch, slowly.",
      "Rebuilding this site to be less of an index and more of a person.",
    ],
  },

  references: [
    { label: "X", href: "https://x.com/andymadrick", detail: "@andymadrick" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/andy-madrick-67815589/" },
    { label: "Contact", href: "/contact", detail: "Form on this site" },
  ] satisfies Reference[],
};

export const sections = [
  { id: "overview", title: "Overview" },
  { id: "work", title: "Work" },
  { id: "reading", title: "Reading" },
  { id: "watching", title: "Watching" },
  { id: "listening", title: "Listening" },
  { id: "quotes", title: "Quotes" },
  { id: "now", title: "Now" },
  { id: "references", title: "References" },
] as const;

export type SectionId = (typeof sections)[number]["id"];

/** Section number as shown in headings and the contents. The overview is the lead and is unnumbered. */
export function sectionNumber(id: string): number | null {
  const numbered = sections.filter((s) => s.id !== "overview");
  const idx = numbered.findIndex((s) => s.id === id);
  return idx === -1 ? null : idx + 1;
}
