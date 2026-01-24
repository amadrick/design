import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andy Madrick · Designer",
  description: "Andy Madrick · Designer",
  keywords: ["Andy Madrick", "Madrick", "Designer", "Product Designer", "Notion"],
  authors: [{ name: "Andy Madrick" }],
  creator: "Andy Madrick",
  metadataBase: new URL("https://madrick.design"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Andy Madrick · Designer",
    description: "Andy Madrick · Designer",
    url: "https://madrick.design",
    siteName: "Andy Madrick",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Andy Madrick · Designer",
    description: "Andy Madrick · Designer",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-z1">
        <Header />
        {children}
      </body>
    </html>
  );
}
