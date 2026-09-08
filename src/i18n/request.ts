import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

/**
 * Messages are split per namespace so that pages can own their own copy
 * without touching a shared file. Every namespace exists for both locales.
 */
export const NAMESPACES = [
  "Common",
  "Nav",
  "Footer",
  "Home",
  "Websites",
  "Webshops",
  "Software",
  "Apps",
  "References",
  "About",
  "Contact",
  "Privacy",
] as const;

export type Namespace = (typeof NAMESPACES)[number];

const loaders: Record<string, Record<Namespace, () => Promise<{ default: Record<string, unknown> }>>> = {
  nl: {
    Common: () => import("../../messages/nl/common.json"),
    Nav: () => import("../../messages/nl/nav.json"),
    Footer: () => import("../../messages/nl/footer.json"),
    Home: () => import("../../messages/nl/home.json"),
    Websites: () => import("../../messages/nl/websites.json"),
    Webshops: () => import("../../messages/nl/webshops.json"),
    Software: () => import("../../messages/nl/software.json"),
    Apps: () => import("../../messages/nl/apps.json"),
    References: () => import("../../messages/nl/references.json"),
    About: () => import("../../messages/nl/about.json"),
    Contact: () => import("../../messages/nl/contact.json"),
    Privacy: () => import("../../messages/nl/privacy.json"),
  },
  en: {
    Common: () => import("../../messages/en/common.json"),
    Nav: () => import("../../messages/en/nav.json"),
    Footer: () => import("../../messages/en/footer.json"),
    Home: () => import("../../messages/en/home.json"),
    Websites: () => import("../../messages/en/websites.json"),
    Webshops: () => import("../../messages/en/webshops.json"),
    Software: () => import("../../messages/en/software.json"),
    Apps: () => import("../../messages/en/apps.json"),
    References: () => import("../../messages/en/references.json"),
    About: () => import("../../messages/en/about.json"),
    Contact: () => import("../../messages/en/contact.json"),
    Privacy: () => import("../../messages/en/privacy.json"),
  },
};

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale;

  const entries = await Promise.all(
    NAMESPACES.map(async (ns) => [ns, (await loaders[locale][ns]()).default] as const),
  );

  return {
    locale,
    messages: Object.fromEntries(entries),
    timeZone: "Europe/Brussels",
  };
});
