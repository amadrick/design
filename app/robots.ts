import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: "/lab",
      },
    ],
    sitemap: "https://madrick.design/sitemap.xml",
  };
}
