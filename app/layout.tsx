import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const siteUrl = "https://madrick.design";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Andy Madrick · Product Designer in San Francisco",
    template: "%s | Andy Madrick",
  },
  description:
    "Andy Madrick is a Product Designer and Design Engineer in San Francisco with a background in philosophy. Currently at Notion, previously Design Engineer at Tome (AI). Philosophy informs his approach to design ethics and building thoughtful, human-centered tools.",
  keywords: [
    "Andy Madrick",
    "Product Designer",
    "Design Engineer",
    "San Francisco Designer",
    "Bay Area Designer",
    // Company keywords
    "Notion Designer",
    "Mercury Designer",
    "Tome Designer",
    "Lightfield",
    "ProtoPie",
    // AI-focused keywords for recruiter discovery
    "AI Product Designer",
    "AI UX Designer",
    "LLM Interface Design",
    "AI Tools Designer",
    "Conversational AI Design",
    "Human-AI Interaction",
    "Machine Learning Products",
    "Generative AI",
    // Philosophy + Design (unique differentiator for AI companies)
    "Design Philosophy",
    "Design Ethics",
    "AI Ethics",
    "Ethical Design",
    "Philosophy of Design",
    "Human-Centered AI",
    "Responsible AI Design",
    "AI Alignment",
    "Thoughtful Design",
    // Technical skills
    "Design Systems",
    "UI/UX Designer",
    "Interaction Design",
    "Digital Product Design",
    "Technical Product Designer",
    "Complex Systems Design",
    "0-1 Product Design",
    // Location
    "San Francisco",
    "SF Designer",
  ],
  authors: [{ name: "Andy Madrick", url: siteUrl }],
  creator: "Andy Madrick",
  publisher: "Andy Madrick",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Andy Madrick",
    title: "Andy Madrick · Product Designer in San Francisco",
    description:
      "Product Designer & Design Engineer with a philosophy background. Currently at Notion, previously at Tome (AI). Focused on design ethics, human-centered AI, and building tools that respect how people think.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Andy Madrick - Product Designer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Andy Madrick · Product Designer & Design Engineer",
    description:
      "Philosophy grad turned Product Designer. At Notion, prev Tome (AI). Thinking about design ethics, human-AI interaction, and tools that respect how people think.",
    images: ["/og-image.png"],
    creator: "@andymadrick",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: siteUrl,
  },
  category: "Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <JsonLd />
      </head>
      <body className="min-h-screen bg-z1">
        <Header />
        {children}
      </body>
    </html>
  );
}
