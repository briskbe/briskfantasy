"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getPathname, usePathname } from "@/i18n/navigation";
import { routing, type AppLocale, type AppPathname } from "@/i18n/routing";
import { translatedSlugPairs } from "@/i18n/translated-slugs.generated";
import { cn } from "@/lib/utils";

/**
 * During prerendering, a rewrite can expose `/kennisbank/an-english-slug`
 * instead of the public `/guides/an-english-slug`. Resolve either spelling,
 * as well as the template normally returned after hydration, to one route key.
 */
function resolveRoute(pathname: string): AppPathname | undefined {
  const segments = pathname.split("/");
  return (Object.entries(routing.pathnames) as [AppPathname, string | Record<AppLocale, string>][])
    .find(([route, translations]) => {
      const templates = [route, ...(typeof translations === "string" ? [translations] : Object.values(translations))];
      return templates.some((template) => {
        const expected = template.split("/");
        return expected.length === segments.length && expected.every((segment, index) =>
          segment === segments[index] || (/^\[[^/]+\]$/u.test(segment) && segments[index].length > 0),
        );
      });
    })?.[0];
}

/**
 * NL / EN as a plain text toggle.
 *
 * It deliberately has no pill and no lime: it sits beside the primary call to
 * action, and a second filled pill there competed with it and spent the accent
 * twice in one corner. The active language is simply solid, the other muted,
 * separated by a hairline. Crawlable links point to the equivalent page,
 * including its translated slug. The registry contains no article content.
 */
export function LanguageSwitcher({ size = "sm", className }: { size?: "sm" | "lg"; className?: string }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Common");
  const pathname = usePathname();
  const params = useParams();
  const route = resolveRoute(pathname);

  const hrefFor = (next: AppLocale) => {
    if (!route) return getPathname({ href: "/", locale: next });
    const nextParams = { ...params };
    if (
      typeof params.slug === "string" &&
      (route === "/diensten/[slug]" || route === "/kennisbank/[slug]")
    ) {
      const pair = translatedSlugPairs[route].find(([nl, en]) => nl === params.slug || en === params.slug);
      if (pair) nextParams.slug = pair[next === "nl" ? 0 : 1];
    }
    // Both values come from the active route; only the known localized slug
    // changes. Shared region and case slugs retain their current parameters.
    const href = { pathname: route, params: nextParams } as Parameters<typeof getPathname>[0]["href"];
    return getPathname({ href, locale: next });
  };

  return (
    <nav
      aria-label={t("lang.label")}
      className={cn(
        "inline-flex items-center",
        size === "sm" ? "gap-1.5 text-[0.78rem]" : "gap-2 text-[0.95rem]",
        className,
      )}
    >
      {routing.locales.map((l, i) => {
        const active = l === locale;
        return (
          <span key={l} className="inline-flex items-center">
            {i > 0 && (
              <span aria-hidden className={cn("mr-1.5 w-px bg-current opacity-20", size === "sm" ? "h-3" : "h-4")} />
            )}
            <a
              href={hrefFor(l)}
              hrefLang={l}
              lang={l}
              aria-current={active ? "page" : undefined}
              aria-label={t("lang.switchTo", { lang: t(`lang.${l}`) })}
              data-cursor="link"
              className={cn(
                // The visible label stays compact; the padding keeps the tap
                // target at 44px without making the control look chunky.
                "inline-flex min-h-11 items-center px-2 font-medium uppercase tracking-[0.06em] transition-colors duration-300",
                active ? "text-fg" : "text-fg/40 hover:text-fg/80",
              )}
            >
              {l}
            </a>
          </span>
        );
      })}
    </nav>
  );
}
