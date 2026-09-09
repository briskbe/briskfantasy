"use client";

import { useId, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Plus } from "lucide-react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Reveal, RevealGroup, RevealItem } from "./reveal";

const ITEMS = ["1", "2", "3", "4", "5"] as const;
const EASE = [0.16, 1, 0.3, 1] as const;

function Item({
  q,
  a,
  open,
  onToggle,
  baseId,
  reduced,
}: {
  q: string;
  a: string;
  open: boolean;
  onToggle: () => void;
  baseId: string;
  reduced: boolean;
}) {
  const btnId = `${baseId}-btn`;
  const panelId = `${baseId}-panel`;
  return (
    <div className="border-b border-line">
      <h3>
        <button
          type="button"
          id={btnId}
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
          data-cursor="link"
          className="group flex w-full items-start justify-between gap-6 py-6 text-left lg:py-7"
        >
          <span className={cn("text-h4 transition-colors duration-300", open ? "text-fg" : "text-fg/80 group-hover:text-fg")}>{q}</span>
          <span
            className={cn(
              "mt-0.5 flex size-9 shrink-0 items-center justify-center rounded-full border transition-[transform,border-color,background-color,color] duration-500 ease-[var(--ease-out-expo)]",
              open ? "rotate-45 border-accent bg-brand text-ink" : "border-line text-muted group-hover:border-fg/40 group-hover:text-fg",
            )}
            aria-hidden
          >
            <Plus className="size-4" />
          </span>
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            id={panelId}
            role="region"
            aria-labelledby={btnId}
            key="panel"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={
              reduced
                ? { duration: 0 }
                : { height: { duration: 0.6, ease: EASE }, opacity: { duration: 0.35 } }
            }
            className="overflow-hidden"
          >
            <p className="text-body max-w-2xl pb-7 text-fg-2 text-pretty">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * Light section: accessible accordion (button + aria-expanded, animated
 * height). Light on purpose — the process, the cross-links, the CTA band and
 * the footer are all dark, and the page should not end in one long dark slab.
 */
export function AppsFaq() {
  const t = useTranslations("Apps");
  const reduced = useReducedMotion() ?? false;
  const [open, setOpen] = useState<string | null>("1");
  const id = useId();

  return (
    <section className="theme-light relative bg-bg text-fg section-y" aria-labelledby="apps-faq-title">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-32">
            <Reveal>
              <Eyebrow index={5}>{t("faq.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="apps-faq-title" className="text-h2 mt-5 text-balance">
                {t("faq.title")}
              </h2>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="text-body mt-6 max-w-sm text-muted text-pretty">{t("faq.aside")}</p>
              <a href={`mailto:${siteConfig.email}`} className="mt-2 inline-flex min-h-11 items-center text-fg underline-offset-6 hover:underline">
                {siteConfig.email}
              </a>
            </Reveal>
          </div>
        </div>
        <RevealGroup className="border-t border-line lg:col-span-7 lg:col-start-6" stagger={0.06}>
          {ITEMS.map((k) => (
            <RevealItem key={k}>
              <Item
                baseId={`${id}-${k}`}
                q={t(`faq.items.${k}.q`)}
                a={t(`faq.items.${k}.a`)}
                open={open === k}
                onToggle={() => setOpen((v) => (v === k ? null : k))}
                reduced={reduced}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
