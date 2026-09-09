"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Link, usePathname } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { LanguageSwitcher } from "./language-switcher";
import { Button } from "@/components/ui/button";

type NavItem = { href: AppPathname; key: "websites" | "webshops" | "software" | "apps" | "references" | "about" };

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
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
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
              <Button href="/gesprek-inplannen" size="sm" className="hidden md:inline-flex" magnetic={false}>
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
            className="fixed inset-0 z-[90] theme-dark bg-ink text-paper"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="absolute inset-0 grain" aria-hidden />
            <div className="container-x relative flex h-full flex-col pt-28 pb-8">
              <nav className="flex flex-1 flex-col justify-center" aria-label="Menu">
                <p className="eyebrow text-muted mb-6">{t("servicesLabel")}</p>
                <ul className="space-y-1">
                  {NAV.map((item, i) => (
                    <motion.li
                      key={item.key}
                      initial={{ y: 40, opacity: 0 }}
                      animate={{ y: 0, opacity: 1, transition: { delay: 0.25 + i * 0.05, duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
                      exit={{ opacity: 0, transition: { duration: 0.2 } }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "group flex items-baseline gap-4 text-[clamp(2.25rem,8vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.04em] transition-colors",
                          pathname === item.href ? "text-accent" : "text-paper hover:text-accent",
                        )}
                      >
                        <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">0{i + 1}</span>
                        {t(item.key)}
                        <ArrowUpRight className="size-6 -translate-x-2 opacity-0 transition-all duration-500 group-hover:translate-x-0 group-hover:opacity-100" />
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </nav>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.6, duration: 0.6 } }}
                exit={{ opacity: 0, transition: { duration: 0.2 } }}
                className="grid gap-6 border-t border-line pt-6 sm:grid-cols-[1fr_auto] sm:items-end"
              >
                <div>
                  <p className="eyebrow text-muted mb-2">{t("menuEmailLabel")}</p>
                  <a href={`mailto:${siteConfig.email}`} className="text-lg underline-offset-6 hover:underline">
                    {siteConfig.email}
                  </a>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <LanguageSwitcher size="lg" />
                  <Button href="/gesprek-inplannen" size="md" magnetic={false} onClick={() => setOpen(false)}>
                    {t("cta")}
                  </Button>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
