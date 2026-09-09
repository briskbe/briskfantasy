import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import { clusters, clusterSlugFor } from "@/data/seo/clusters";
import { regions } from "@/data/seo/regions";
import { hasClusterContent, hasRegionContent } from "@/data/seo/content";

type Href = Parameters<typeof getPathname>[0]["href"];
type LocalisedHref = Href | ((locale: (typeof routing.locales)[number]) => Href);

/**
 * Every indexable URL, each with its hreflang alternates.
 *
 * The alternates are the important part on a bilingual site: without them the
 * Dutch and English versions of a page compete as duplicates and Google picks
 * one, often for the wrong market.
 */
function entry(href: LocalisedHref, priority: number, changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"]) {
  const at = (locale: (typeof routing.locales)[number]) => (typeof href === "function" ? href(locale) : href);
  const languages = Object.fromEntries(
    routing.locales.map((locale) => [locale, siteConfig.url + getPathname({ href: at(locale), locale })]),
  );
  return {
    url: siteConfig.url + getPathname({ href: at(routing.defaultLocale), locale: routing.defaultLocale }),
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: { languages },
  };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPriority: Record<string, number> = {
    "/": 1,
    "/gesprek-inplannen": 0.9,
    "/website-op-maat": 0.9,
    "/webshop-op-maat": 0.9,
    "/software-op-maat": 0.9,
    "/mobiele-apps": 0.9,
    "/referenties": 0.8,
    "/diensten": 0.8,
    "/regio": 0.8,
    "/over-ons": 0.6,
    "/privacy": 0.2,
  };

  const staticPages = (Object.keys(routing.pathnames) as Href[])
    // Dynamic routes are expanded from their data below, not listed as templates.
    .filter((href): href is Exclude<Href, { pathname: string }> => typeof href === "string" && !href.includes("["))
    .map((href) => entry(href, staticPriority[href as string] ?? 0.5, href === "/" ? "weekly" : "monthly"));

  const clusterPages = clusters.filter((c) => hasClusterContent(c.slug)).map((c) =>
    entry(
      // The English pages use English slugs, so each locale has to resolve its
      // own — a fixed slug would emit an alternate pointing at a 404.
      (locale) => ({ pathname: "/diensten/[slug]" as const, params: { slug: clusterSlugFor(c, locale) } }),
      // Cost and quote pages carry the highest commercial intent.
      c.intent === "pricing" ? 0.8 : 0.7,
      "monthly",
    ),
  );

  const regionPages = regions.filter((r) => hasRegionContent(r.slug)).map((r) => entry({ pathname: "/regio/[slug]", params: { slug: r.slug } }, 0.6, "monthly"));

  return [...staticPages, ...clusterPages, ...regionPages];
}
