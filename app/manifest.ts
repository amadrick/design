import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Andy Madrick - Product Designer",
    short_name: "Andy Madrick",
    description:
      "Product Designer & Design Engineer in San Francisco. Currently at Anthropic working on Claude Code, previously SpaceX, Cursor, Notion, Lightfield, and Mercury. Specializing in complex systems and thoughtful product design.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#000000",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon.svg",
        sizes: "180x180",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
