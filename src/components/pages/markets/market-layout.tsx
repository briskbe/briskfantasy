import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import type { MarketContent } from "@/data/markets/types";
import { marketPath } from "@/data/markets";
import { siteConfig } from "@/data/site";
import { fontVariables } from "@/lib/fonts";
import { JsonLd } from "@/components/seo/json-ld";
import { GoogleAnalytics, AnalyticsPreferencesButton } from "@/components/analytics/google-analytics";
import { ScrollReset } from "@/components/layout/scroll-reset";
import { jsonLdGraph, organizationSchema, websiteSchema } from "@/lib/seo";
import "@/app/globals.css";

export const marketLayoutMetadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION, other: process.env.BING_SITE_VERIFICATION ? { "msvalidate.01": process.env.BING_SITE_VERIFICATION } : undefined },
};

export function MarketLayout({ market, children }: { market: MarketContent; children: React.ReactNode }) {
  return (
    <html lang={market.language} className={`${fontVariables} theme-dark`}>
      <body className="min-h-dvh bg-ink text-paper">
        <ScrollReset />
        <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-brand focus:p-4 focus:text-ink">{market.labels.skipToContent}</a>
        <JsonLd data={jsonLdGraph([{ ...organizationSchema("en"), description: market.labels.basedIn }, websiteSchema()])} />
        <header className="border-b border-line">
          <div className="container-x flex flex-wrap items-center justify-between gap-6 py-7">
            <Link href={market.prefix} aria-label={`Brisk — ${market.labels.home}`}><Image src="/logo-light.svg" alt="Brisk" width={120} height={36} loading="eager" /></Link>
            <nav aria-label={market.labels.navigation} className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm">
              {market.pages.filter((p) => ["websites", "ecommerce", "pricing"].includes(p.id)).map((page) => <Link href={marketPath(market, page.id)} key={page.id} className="py-2 hover:text-accent">{page.nav}</Link>)}
              <a href="#contact" className="rounded-full border border-line-2 px-5 py-3 hover:border-accent">{market.labels.contact}</a>
            </nav>
          </div>
        </header>
        <main id="main">{children}</main>
        <footer className="border-t border-line">
          <div className="container-x flex flex-wrap justify-between gap-6 py-8 text-sm text-muted">
            <p>© {new Date().getFullYear()} Brisk · {market.labels.basedIn}</p>
            <a href={`mailto:${siteConfig.email}`} className="hover:text-accent">{siteConfig.email}</a>
            <a href={siteConfig.googleBusinessUrl} target="_blank" rel="noopener noreferrer" className="hover:text-accent">Herenstraat 15, 3600 Genk, Belgium · Google Maps</a>
            <Link href={market.id === "nl-NL" ? "/privacy" : "/en/privacy"} hrefLang={market.id === "nl-NL" ? "nl" : "en"} className="hover:text-accent">{market.labels.privacy}{["fr-FR", "de-DE"].includes(market.id) ? " (English)" : ""}</Link>
            <AnalyticsPreferencesButton locale={market.language} className="hover:text-accent" />
          </div>
        </footer>
        <GoogleAnalytics locale={market.language} />
      </body>
    </html>
  );
}
