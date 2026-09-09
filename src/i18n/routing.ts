import { defineRouting } from "next-intl/routing";

/**
 * Internal pathnames use the Dutch slugs (they match the folder names under
 * `src/app/[locale]`). Each key maps to a localized public URL per locale.
 */
export const routing = defineRouting({
  locales: ["nl", "en"],
  defaultLocale: "nl",
  localePrefix: "as-needed",
  // URL is the single source of truth: no Accept-Language / cookie redirects.
  // Many Belgian visitors browse with English UI; they should still land on NL.
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/website-op-maat": { nl: "/website-op-maat", en: "/custom-websites" },
    "/webshop-op-maat": { nl: "/webshop-op-maat", en: "/custom-webshops" },
    "/software-op-maat": { nl: "/software-op-maat", en: "/custom-software" },
    "/mobiele-apps": { nl: "/mobiele-apps", en: "/mobile-apps" },
    "/referenties": { nl: "/referenties", en: "/work" },
    "/over-ons": { nl: "/over-ons", en: "/about" },
    "/gesprek-inplannen": { nl: "/gesprek-inplannen", en: "/book-a-call" },
    "/privacy": { nl: "/privacy", en: "/privacy" },
    // SEO landing pages. `[slug]` differs per locale where the term does — see
    // `clusterSlugFor` and the region slugs (place names are not translated).
    "/diensten": { nl: "/diensten", en: "/services" },
    "/diensten/[slug]": { nl: "/diensten/[slug]", en: "/services/[slug]" },
    "/regio": { nl: "/regio", en: "/regions" },
    "/regio/[slug]": { nl: "/regio/[slug]", en: "/regions/[slug]" },
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;

/**
 * Routes with no dynamic segment, so they can be passed to `Link` (and to our
 * `Button`) as a plain string. A dynamic route needs `{ pathname, params }`,
 * which is a different shape, so keeping the two apart is what stops a
 * `/diensten/[slug]` template string being linked to by accident.
 */
export type StaticAppPathname = Exclude<AppPathname, `${string}[${string}`>;
