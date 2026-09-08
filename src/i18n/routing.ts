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
  },
});

export type AppLocale = (typeof routing.locales)[number];
export type AppPathname = keyof typeof routing.pathnames;
