"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Link, usePathname } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";

type NavItem = { href: StaticAppPathname; key: "websites" | "webshops" | "software" | "apps" | "references" | "about" };

const NAV: NavItem[] = [
  { href: "/website-op-maat", key: "websites" },
  { href: "/webshop-op-maat", key: "webshops" },
  { href: "/software-op-maat", key: "software" },
  { href: "/mobiele-apps", key: "apps" },
  { href: "/referenties", key: "references" },
  { href: "/over-ons", key: "about" },
];

export function Header() {
  const t = useTranslations("Nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 160 && y > prev && !open);
  });

  // Lock scroll while the menu is open (links close it on click).
  useEffect(() => {
    if (!open) return;
    const htmlOverflow = document.documentElement.style.overflow;
    const bodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = htmlOverflow;
      document.body.style.overflow = bodyOverflow;
    };
  }, [open]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[10001] focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-ink"
      >
        {useTranslations("Common")("skip")}
      </a>

      <motion.header
        className="fixed inset-x-0 top-0 z-[100] theme-dark text-paper"
        animate={{ y: hidden ? -96 : 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="container-x">
          <div
            className={cn(
              "mt-3 flex h-14 items-center justify-between rounded-full px-2 pl-5 transition-[background-color,border-color,backdrop-filter] duration-500 sm:mt-4 lg:h-16",
              scrolled || open ? "glass" : "border border-transparent",
            )}
          >
            <Logo className="text-[1.45rem] lg:text-[1.6rem]" onClick={() => setOpen(false)} />

            <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
              {NAV.map((item) => {
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.key}
                    href={item.href}
                    data-cursor="link"
                    className={cn(
                      "group relative rounded-full px-3.5 py-2 text-[0.92rem] tracking-[-0.01em] transition-colors duration-300",
                      active ? "text-paper" : "text-paper/70 hover:text-paper",
                    )}
                  >
                    {t(item.key)}
                    <span
                      className={cn(
                        "absolute inset-x-3.5 -bottom-0.5 h-px origin-left scale-x-0 bg-brand transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                );
              })}
            </nav>

            <div className="flex items-center gap-2 sm:gap-3">
              <LanguageSwitcher className="hidden sm:inline-flex" />
              <Button href="/gesprek-inplannen" size="sm" className="hidden md:inline-flex" icon="none">
                {t("cta")}
              </Button>
              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="site-menu"
                aria-label={open ? t("closeMenu") : t("openMenu")}
                data-cursor="link"
                className="flex h-10 items-center gap-2 rounded-full border border-paper/15 px-3.5 text-[0.85rem] tracking-[-0.01em] transition-colors hover:border-paper/40 lg:hidden"
              >
                <span className="relative block h-3 w-4">
                  <span
                    className={cn(
                      "absolute left-0 top-0 h-px w-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)]",
                      open && "translate-y-[5.5px] rotate-45",
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 bottom-0 h-px w-full bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)]",
                      open && "-translate-y-[5.5px] -rotate-45",
                    )}
                  />
                </span>
                {open ? t("close") : t("menu")}
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="site-menu"
            key="menu"
            className="fixed inset-0 z-[90] overflow-y-auto theme-dark bg-ink text-paper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="container-x relative flex min-h-full flex-col pt-28 pb-8">
              <nav className="flex flex-1 flex-col justify-center" aria-label="Menu">
                <ul className="space-y-1">
                  {NAV.map((item) => (
                    <li key={item.key}>
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className={cn(
                          "block py-1 text-[clamp(2.25rem,8vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-colors",
                          pathname === item.href ? "text-accent" : "text-paper hover:text-accent",
                        )}
                      >
                        {t(item.key)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div
                className="mt-8 grid gap-6 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:items-end"
              >
                <div>
                  <a href={`mailto:${siteConfig.email}`} className="text-lg underline-offset-6 hover:underline">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <LanguageSwitcher size="lg" />
                  <Link href="/gesprek-inplannen" onClick={() => setOpen(false)} className="inline-flex h-12 items-center justify-center rounded-full bg-brand px-6 text-[0.95rem] font-medium text-ink transition-colors hover:bg-brand-2">
                    {t("cta")}
                  </Link>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
