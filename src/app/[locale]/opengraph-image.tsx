import { ImageResponse } from "next/og";

export const alt = "Brisk — digital agency";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const copy = {
  nl: {
    headline: "Websites, webshops, software en apps op maat.",
    tagline: "brisk.be · Digitaal bureau",
  },
  en: {
    headline: "Custom websites, webshops, software and apps.",
    tagline: "brisk.be · Digital agency",
  },
} as const;

export default async function OpenGraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = copy[locale === "en" ? "en" : "nl"];

  return new ImageResponse(
    (
      <div
        style={{
          width: 1200,
          height: 630,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#07080C",
          color: "#F4F1EA",
          fontFamily: "Inter, Helvetica, Arial, sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            right: -180,
            bottom: -260,
            width: 820,
            height: 820,
            borderRadius: 9999,
            background: "radial-gradient(circle, rgba(255,159,77,0.38) 0%, rgba(255,159,77,0.12) 38%, rgba(7,8,12,0) 70%)",
          }}
        />
        <div style={{ display: "flex", fontSize: 72, fontWeight: 600, letterSpacing: "-0.04em", lineHeight: 1 }}>
          <span>Brisk</span>
          <span style={{ color: "#FF9F4D" }}>.</span>
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 64,
            fontWeight: 500,
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
            maxWidth: 900,
          }}
        >
          {t.headline}
        </div>
        <div
          style={{
            display: "flex",
            fontFamily: "ui-monospace, Menlo, Consolas, monospace",
            fontSize: 22,
            letterSpacing: "0.02em",
            color: "#9A968E",
          }}
        >
          {t.tagline}
        </div>
      </div>
    ),
    size,
  );
}
