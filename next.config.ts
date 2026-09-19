import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactStrictMode: true,
  async redirects() {
    // Preserve the established canonical pages; aliases consolidate synonyms.
    return [
      { source: "/website-laten-maken", destination: "/website-op-maat", permanent: true },
      { source: "/webshop-laten-maken", destination: "/webshop-op-maat", permanent: true },
      { source: "/website-laten-bouwen", destination: "/website-op-maat", permanent: true },
      { source: "/website-laten-maken-prijs", destination: "/diensten/website-laten-maken-kosten", permanent: true },
      { source: "/website-redesign", destination: "/diensten/website-laten-vernieuwen", permanent: true },
      { source: "/webdesign", destination: "/diensten/webdesign-bureau", permanent: true },
      { source: "/contact", destination: "/gesprek-inplannen", permanent: true },
      { source: "/cases", destination: "/referenties", permanent: true },
    ];
  },
  async headers() {
    return process.env.VERCEL_ENV === "preview"
      ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }]
      : [];
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "api.microlink.io" },
      { protocol: "https", hostname: "*.microlink.io" },
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
    ],
  },
};

export default withNextIntl(nextConfig);
