import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Vercel Image Optimization returns 402 when quota/billing is exceeded,
    // which breaks most next/image tags site-wide. Serve originals instead.
    unoptimized: true,
    remotePatterns: [
      { protocol: "https", hostname: "**" },
      { protocol: "http", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      {
        source: "/landing-page-01",
        destination: "/ok-prime-shirokane-takanawa",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
