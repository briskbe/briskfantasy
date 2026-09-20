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
    const privateHeaders = [
      { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive" },
      { key: "Cache-Control", value: "private, no-store" },
      { key: "Referrer-Policy", value: "no-referrer" },
      { key: "X-Content-Type-Options", value: "nosniff" },
      { key: "X-Frame-Options", value: "DENY" },
    ];
    return [
      ...(process.env.VERCEL_ENV === "preview" ? [{ source: "/:path*", headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] }] : []),
      ...["/cms/:path*", "/quote/:path*", "/api/cms/:path*", "/api/quotes/:path*", "/api/auth/:path*"].map((source) => ({ source, headers: privateHeaders })),
    ];
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
