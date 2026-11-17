/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async redirects() {
    return [
      // The purchase flow now lives inside the Notion credits case study.
      {
        source: "/work/notion-credits-purchase",
        destination: "/work/notion-credits",
        permanent: true,
      },
    ];
  },
}

module.exports = nextConfig
