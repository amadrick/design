import type { Metadata } from "next";
import { Header } from "@/components/Header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Andy Madrick - Designer",
  description: "Product Designer based in Seattle. Currently at Notion.",
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
