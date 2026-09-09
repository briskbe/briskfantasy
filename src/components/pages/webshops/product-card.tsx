"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";
import { FilterMark } from "./filter-mark";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Typographic product card used in the hero to demonstrate the micro-interactions
 * we build into shops: a variant switch, an add-to-cart button that morphs into a
 * checkmark and a cart badge that counts up. Everything on it is real type — no
 * placeholder bars — and the button stays neutral so the hero keeps one amber CTA.
 */
export function ProductCard({ className }: { className?: string }) {
  const t = useTranslations("Webshops.hero.card");
  const [variant, setVariant] = useState<"1" | "2">("1");
  const [count, setCount] = useState(0);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const add = () => {
    setCount((c) => c + 1);
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div
      className={cn(
        "theme-dark relative w-[min(20rem,100%)] rounded-2xl border border-line bg-ink-2/95 p-5 text-paper shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md",
        className,
      )}
    >
      {/* header */}
      <div className="flex items-center justify-between">
        <span className="eyebrow text-muted">{t("label")}</span>
        <span className="relative flex size-9 items-center justify-center rounded-full border border-line text-fg" aria-hidden>
          <ShoppingBag className="size-4" />
          <AnimatePresence mode="popLayout" initial={false}>
            {count > 0 && (
              <motion.span
                key={count}
                initial={{ scale: 0.4, opacity: 0, y: -4 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.6, opacity: 0 }}
                transition={{ type: "spring", stiffness: 420, damping: 22 }}
                className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-fg px-1 font-mono text-[0.62rem] font-medium text-bg tabular-nums"
              >
                {count}
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <span className="sr-only" aria-live="polite">
          {t("cartStatus", { count })}
        </span>
      </div>

      {/* product */}
      <div className="mt-5 flex items-start gap-4">
        <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-line bg-fg/[0.04] p-2 text-fg/70">
          <FilterMark detail={false} />
        </span>
        <div className="min-w-0">
          <p className="text-[1.2rem] font-medium leading-tight tracking-[-0.02em]">{t("name")}</p>
          <p className="mt-2 flex flex-col gap-1 font-mono text-[0.66rem] uppercase tracking-[0.14em] text-muted">
            <span className="inline-flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400" aria-hidden />
              {t("stock")}
            </span>
            <span>{t("delivery")}</span>
          </p>
        </div>
      </div>

      {/* variant */}
      <div className="mt-5">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{t("variantLabel")}</p>
        <div className="mt-2 flex gap-2" role="radiogroup" aria-label={t("variantLabel")}>
          {(["1", "2"] as const).map((v) => {
            const active = variant === v;
            return (
              <button
                key={v}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setVariant(v)}
                data-cursor="link"
                className={cn(
                  "relative h-11 rounded-full border px-4 text-[0.85rem] tracking-[-0.01em] transition-colors duration-300",
                  active ? "border-fg text-fg" : "border-line text-muted hover:border-line-2 hover:text-fg",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="variant-pill"
                    className="absolute inset-0 rounded-full bg-fg/8"
                    transition={{ type: "spring", stiffness: 320, damping: 30 }}
                    aria-hidden
                  />
                )}
                <span className="relative">{t(`variants.${v}`)}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* price */}
      <div className="mt-5 flex items-end justify-between gap-4 border-t border-line pt-4">
        <p className="font-mono text-[0.62rem] uppercase tracking-[0.16em] text-muted">{t("priceLabel")}</p>
        <p className="text-[1.35rem] font-medium leading-none tracking-[-0.02em] tabular-nums">{t("price")}</p>
      </div>

      {/* add to cart — neutral on purpose: the amber in this viewport belongs to the page CTA */}
      <button
        type="button"
        onClick={add}
        data-cursor="link"
        className={cn(
          "group relative mt-4 flex h-12 w-full items-center justify-center overflow-hidden rounded-full text-[0.95rem] font-medium tracking-[-0.01em] transition-colors duration-300",
          added ? "bg-fg/12 text-fg" : "bg-fg text-bg hover:bg-fg/90",
        )}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {added ? (
            <motion.span
              key="added"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-center gap-2"
            >
              <motion.svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <motion.path d="M5 12.5l4.5 4.5L19 7.5" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 0.45, ease: EASE, delay: 0.1 }} />
              </motion.svg>
              {t("added")}
            </motion.span>
          ) : (
            <motion.span
              key="add"
              initial={{ y: 18, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -18, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              className="flex items-center gap-2"
            >
              {t("add")}
            </motion.span>
          )}
        </AnimatePresence>
      </button>
    </div>
  );
}
