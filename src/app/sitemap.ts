import type { MetadataRoute } from "next";
import { routing, type AppPathname } from "@/i18n/routing";
import { getPathname } from "@/i18n/navigation";
import { siteConfig } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pathnames = Object.keys(routing.pathnames) as AppPathname[];
  return pathnames.map((pathname) => {
    const alternates = Object.fromEntries(
      routing.locales.map((locale) => [locale, siteConfig.url + getPathname({ href: pathname, locale })]),
    );
    return {
      url: siteConfig.url + getPathname({ href: pathname, locale: routing.defaultLocale }),
      lastModified: new Date(),
      changeFrequency: pathname === "/" ? "weekly" : "monthly",
      priority: pathname === "/" ? 1 : pathname === "/gesprek-inplannen" ? 0.9 : 0.7,
      alternates: { languages: alternates },
    };
  });
}
