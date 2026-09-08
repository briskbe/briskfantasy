"use client";

import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "motion/react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type AppLocale } from "@/i18n/routing";
import { cn } from "@/lib/utils";

/**
 * NL / EN pill with a sliding amber thumb. Switching keeps the visitor on the
 * same page (localized pathnames are resolved by next-intl).
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
        "relative inline-flex items-center rounded-full border border-line-2 bg-fg/[0.04] p-1 font-mono uppercase tracking-[0.14em]",
        size === "sm" ? "text-[0.68rem]" : "text-[0.8rem]",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t("lang.switchTo", { lang: t(`lang.${l}`) })}
            onClick={() => switchTo(l)}
            data-cursor="link"
            className={cn(
              "relative z-10 rounded-full transition-colors duration-500",
              size === "sm" ? "px-3 py-1.5" : "px-5 py-2.5",
              active ? "text-ink" : "text-muted hover:text-fg",
            )}
          >
            {active && (
              <motion.span
                layoutId={`lang-thumb-${size}`}
                className="absolute inset-0 -z-10 rounded-full bg-amber"
                transition={{ type: "spring", stiffness: 420, damping: 34 }}
              />
            )}
            {l}
          </button>
        );
      })}
    </div>
  );
}
