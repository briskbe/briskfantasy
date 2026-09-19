import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";
import { clusters, clusterSlugFor } from "@/data/seo/clusters";
import { regions } from "@/data/seo/regions";
import { hasClusterContent, hasRegionContent } from "@/data/seo/content";
import { guides, guideHrefFor } from "@/data/seo/guides";
import { caseStudies, caseHrefFor } from "@/data/seo/cases";
import { markets, marketPath, marketAlternates } from "@/data/markets";
import { alternates, type LocalisedHref } from "@/lib/seo";

type Href = Parameters<typeof getPathname>[0]["href"];

/** List each canonical URL, including every language, as its own sitemap entry.
 * No lastModified is emitted without a real editorial modification date.
 */
function entries(href: LocalisedHref): MetadataRoute.Sitemap {
  return routing.locales.map((locale) => {
    const links = alternates(href, locale);
    return { url: String(links.canonical), alternates: { languages: links.languages as Record<string, string> } };
  });
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = (Object.keys(routing.pathnames) as Href[])
    .filter((href): href is Extract<Href, string> => typeof href === "string" && !href.includes("["))
    .flatMap((href) => entries(href));
  const clusterPages = clusters.filter((c) => hasClusterContent(c.slug)).flatMap((c) => entries(
    (locale) => ({ pathname: "/diensten/[slug]", params: { slug: clusterSlugFor(c, locale) } }),
  ));
  const regionPages = regions.filter((r) => hasRegionContent(r.slug)).flatMap((r) =>
    entries({ pathname: "/regio/[slug]", params: { slug: r.slug } }),
  );
  const guidePages = guides.flatMap((guide) => entries(guideHrefFor(guide)));
  const casePages = caseStudies.flatMap((caseStudy) => entries(caseHrefFor(caseStudy)));
  const marketPages = markets.flatMap((market) => market.pages.map((page) => ({
    url: siteConfig.url + marketPath(market, page.id),
    alternates: { languages: marketAlternates(page.id) },
  })));
  return [...staticPages, ...clusterPages, ...regionPages, ...guidePages, ...casePages, ...marketPages];
}
