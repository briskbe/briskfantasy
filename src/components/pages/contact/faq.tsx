"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const ITEMS = ["1", "2", "3", "4"] as const;

/** Four questions about the intro call. Accessible disclosure list. */
export function Faq() {
  const t = useTranslations("Contact.faq");
  const uid = useId();
  const [open, setOpen] = useState<string | null>("1");

  return (
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
      <Reveal className="self-start lg:sticky lg:top-32 lg:col-span-4">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-h2 mt-5 max-w-sm text-balance">{t("title")}</h2>
      </Reveal>

      <RevealGroup className="lg:col-span-7 lg:col-start-6" stagger={0.08}>
        <ul className="border-t border-line">
          {ITEMS.map((k) => {
            const isOpen = open === k;
            const btnId = `${uid}-q-${k}`;
            const panelId = `${uid}-a-${k}`;
            return (
              <RevealItem key={k} as="li" className="border-b border-line">
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : k)}
                    className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8 sm:py-7"
                  >
                    <span className="mt-1.5 w-6 shrink-0 font-mono text-[0.72rem] tracking-[0.18em] text-muted transition-colors group-hover:text-amber">
                      0{k}
                    </span>
                    <span className="text-h4 flex-1 text-balance transition-colors duration-300 group-hover:text-amber-2">
                      {t(`items.${k}.q`)}
                    </span>
                    <span
                      className="relative mt-1 flex size-8 shrink-0 items-center justify-center rounded-full border border-line-2 transition-colors duration-300 group-hover:border-amber"
                      aria-hidden
                    >
                      <span className="absolute h-px w-3.5 bg-current" />
                      <span
                        className={cn(
                          "absolute h-3.5 w-px bg-current transition-transform duration-500 ease-[var(--ease-out-expo)]",
                          isOpen && "rotate-90 scale-y-0",
                        )}
                      />
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      key="panel"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.6, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-xl pb-7 pl-11 text-body text-muted text-pretty sm:pb-8 sm:pl-14">
                        {t(`items.${k}.a`)}
                      </p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </RevealItem>
            );
          })}
        </ul>
      </RevealGroup>
    </div>
  );
}
