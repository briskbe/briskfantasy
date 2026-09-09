"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * NL / EN as a plain text toggle.
 *
 * It deliberately has no pill and no lime: it sits beside the primary call to
 * action, and a second filled pill there competed with it and spent the accent
 * twice in one corner. The active language is simply solid, the other muted,
 * separated by a hairline. Switching keeps the visitor on the same page —
 * next-intl resolves the localized pathname.
 */
export function LanguageSwitcher({ size = "sm", className }: { size?: "sm" | "lg"; className?: string }) {
  const locale = useLocale() as AppLocale;
  const t = useTranslations("Common");
  const pathname = usePathname();
  const router = useRouter();
  const params = useParams();

  const switchTo = (next: AppLocale) => {
    if (next === locale) return;
    router.replace(
      // @ts-expect-error -- pathname + params are valid for every route in `routing.pathnames`
      { pathname, params },
      { locale: next },
    );
  };

  return (
    <div
      role="radiogroup"
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
            <button
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={t("lang.switchTo", { lang: t(`lang.${l}`) })}
              onClick={() => switchTo(l)}
              data-cursor="link"
              className={cn(
                // The visible label stays compact; the padding keeps the tap
                // target at 44px without making the control look chunky.
                "inline-flex min-h-11 items-center px-2 font-medium uppercase tracking-[0.06em] transition-colors duration-300",
                active ? "text-fg" : "text-fg/40 hover:text-fg/80",
              )}
            >
              {l}
            </button>
          </span>
        );
      })}
    </div>
  );
}
