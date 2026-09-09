import type { ClusterContentMap, RegionContentMap } from "./types";
import { websiteClusterContent } from "./websites";
import { webshopClusterContent } from "./webshops";
import { softwareClusterContent } from "./software";
import { appClusterContent } from "./apps";
import { belgiumRegionContent } from "./regions-be";
import { netherlandsRegionContent } from "./regions-nl";

/**
 * All landing-page copy, merged. Split into one file per service so the pages
 * can be written and reviewed independently, joined here so the routes have a
 * single lookup.
 */
export const clusterContent: ClusterContentMap = {
  ...websiteClusterContent,
  ...webshopClusterContent,
  ...softwareClusterContent,
  ...appClusterContent,
};

export const regionContent: RegionContentMap = {
  ...belgiumRegionContent,
  ...netherlandsRegionContent,
};

/** True when a cluster or region has copy in both locales — the routes and the
 *  sitemap are built from this, never from the definitions alone, so a defined
 *  but unwritten page can never be prerendered empty or advertised to Google. */
export const hasClusterContent = (slug: string) =>
  Boolean(clusterContent[slug]?.nl && clusterContent[slug]?.en);

export const hasRegionContent = (slug: string) =>
  Boolean(regionContent[slug]?.nl && regionContent[slug]?.en);

export type { ClusterContentMap, RegionContentMap, LocalisedPageContent, RegionCopy, Faq } from "./types";
