import type { Metadata } from "next";
import { getPathname } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { marketAlternates, marketPageForLegacyPath } from "@/data/markets";

/**
 * SEO helpers.
 *
 * Two things every page needs and none of them had: a self-referencing
 * canonical, and hreflang alternates. Without hreflang a bilingual site with
 * two URLs per page competes with itself, and Google picks the wrong one for
 * the wrong market. `x-default` points at the Dutch URL, which is the primary
 * market.
 */

type Href = Parameters<typeof getPathname>[0]["href"];

/**
 * A route, or a function returning the route for a given locale.
 *
 * The function form exists because some slugs differ per locale — the English
 * cluster pages use English slugs. Passing one fixed `params` object for every
 * locale would emit an alternate pointing at a URL that does not exist in that
 * locale, which is worse than having no hreflang at all.
 */
export type LocalisedHref = Href | ((locale: AppLocale) => Href);

const resolveHref = (href: LocalisedHref, locale: AppLocale): Href =>
  typeof href === "function" ? href(locale) : href;

/** Absolute URL for an internal route in one locale. Route params are for dynamic segments. */
export function absoluteUrl(href: LocalisedHref, locale: AppLocale): string {
  const path = getPathname({ href: resolveHref(href, locale), locale });
  // Match Next's metadata serialization for the origin URL (no trailing slash).
  return siteConfig.url + (path === "/" ? "" : path);
}

/**
 * Canonical + hreflang for a route. Pass the internal pathname key (and params
 * for a dynamic route) exactly as you would to `Link`.
 */
export function alternates(href: LocalisedHref, locale: AppLocale): NonNullable<Metadata["alternates"]> {
  const canonical = absoluteUrl(href, locale);
  const marketPage = marketPageForLegacyPath(new URL(canonical).pathname);
  if (marketPage) return { canonical, languages: marketAlternates(marketPage) };
  const languages: Record<string, string> = {};
  for (const l of routing.locales) languages[l] = absoluteUrl(href, l);
  languages["nl-BE"] = absoluteUrl(href, "nl");
  // The Dutch page is the default for anyone Google cannot place by language.
  languages["x-default"] = absoluteUrl(href, routing.defaultLocale);
  return { canonical: absoluteUrl(href, locale), languages };
}

/**
 * Standard page metadata: title, description, canonical, hreflang and the
 * matching Open Graph URL. Use this instead of returning a bare object, so no
 * page can silently ship without a canonical again.
 */
export function pageMetadata({
  title,
  description,
  href,
  locale,
  keywords,
  images,
  noIndex,
}: {
  title: string;
  description: string;
  href: LocalisedHref;
  locale: AppLocale;
  keywords?: string[];
  images?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = absoluteUrl(href, locale);
  return {
    title,
    description,
    keywords: keywords?.length ? keywords : undefined,
    alternates: alternates(href, locale),
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: siteConfig.name,
      locale: locale === "nl" ? "nl_BE" : "en_GB",
      images: (images ?? ["/hero-poster.jpg"]).map((u) => ({ url: u })),
    },
    twitter: { card: "summary_large_image", title, description, images: images ?? ["/hero-poster.jpg"] },
    robots: noIndex
      ? { index: false, follow: true }
      : { index: true, follow: true, googleBot: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
  };
}

/* ------------------------------------------------------------------ */
/* Structured data                                                      */
/* ------------------------------------------------------------------ */

type Json = Record<string, unknown>;

/** Stable @id so every graph node refers to the same organisation. */
export const ORG_ID = `${siteConfig.url}/#organization`;
const SITE_ID = `${siteConfig.url}/#website`;

/**
 * The agency itself. `areaServed` is what tells Google which markets this
 * business covers, which is the honest way to be findable across Belgium and
 * the Netherlands rather than claiming a physical address in every city.
 */
export function organizationSchema(locale: AppLocale): Json {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: siteConfig.name,
    url: siteConfig.url,
    email: siteConfig.email,
    description:
      locale === "nl"
        ? "Digitaal bureau uit België. Websites, webshops, software en mobiele apps op maat."
        : "Digital agency from Belgium. Custom websites, webshops, software and mobile apps.",
    logo: `${siteConfig.url}/logo.svg`,
    image: `${siteConfig.url}/hero-poster.jpg`,
    address: { "@type": "PostalAddress", ...siteConfig.address },
    hasMap: siteConfig.googleBusinessUrl,
    areaServed: [
      { "@type": "Country", name: "Belgium" },
      { "@type": "Country", name: "Netherlands" },
      { "@type": "Country", name: "France" },
      { "@type": "Country", name: "Germany" },
      { "@type": "Country", name: "United Kingdom" },
      { "@type": "Country", name: "United States" },
    ],
    sameAs: [...siteConfig.socials.map((s) => s.href), siteConfig.googleBusinessUrl],
  };
}

export function websiteSchema(): Json {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: siteConfig.url,
    name: siteConfig.name,
    inLanguage: ["nl-BE", "nl-NL", "en", "fr-FR", "de-DE", "en-GB", "en-US"],
    publisher: { "@id": ORG_ID },
  };
}

/** A single service offering, tied back to the organisation. */
export function serviceSchema({
  name,
  description,
  url,
  serviceType,
  areaServed,
}: {
  name: string;
  description: string;
  url: string;
  serviceType?: string;
  areaServed?: string[];
}): Json {
  return {
    "@type": "Service",
    name,
    description,
    serviceType: serviceType ?? name,
    url,
    provider: { "@id": ORG_ID },
    areaServed: (areaServed ?? ["Belgium", "Netherlands"]).map((a) => ({ "@type": "AdministrativeArea", name: a })),
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]): Json {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/** Only ever build this from questions and answers that are visible on the page. */
export function faqSchema(qa: { question: string; answer: string }[]): Json | null {
  if (!qa.length) return null;
  return {
    "@type": "FAQPage",
    mainEntity: qa.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };
}

/** Wrap nodes into one @graph document — one script tag per page, not five. */
export function jsonLdGraph(nodes: (Json | null | undefined)[]) {
  return { "@context": "https://schema.org", "@graph": nodes.filter(Boolean) };
}
