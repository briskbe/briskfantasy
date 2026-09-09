"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { richTags } from "@/components/ui/rich";
import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { ContactForm } from "./contact-form";

const EASE = [0.16, 1, 0.3, 1] as const;

/** One headline line: clipped wrapper, the line rises into view. */
function Line({ children, delay, ready, reduced }: { children: ReactNode; delay: number; ready: boolean; reduced: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.12em] -mb-[0.12em]">
      <motion.span
        className="block will-change-transform"
        initial={reduced ? false : { y: "110%" }}
        animate={reduced ? { y: "0%" } : ready ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: reduced ? 0 : 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/**
 * Contact hero. Desktop: 5/6 split — the promise sticks on the left, the form
 * scrolls on the right. Mobile: the form sits directly under the lead (the
 * reason people came), with the promise and the direct details below it.
 * The wrapper uses `display: contents` below `lg` so its two blocks can be
 * ordered around the form without duplicating markup.
 */
export function ContactHero() {
  const t = useTranslations("Contact.hero");
  const locale = useLocale() as "nl" | "en";
  const reduced = usePrefersReducedMotion();
  const ref = useRef<HTMLElement>(null);
  const [intro, setIntro] = useState<{ ready: boolean; delay: number }>({ ready: false, delay: 0.2 });
  const { ready, delay } = intro;

  // Wait for the preloader curtain on a first visit; start right away afterwards.
  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem("brisk:intro-seen") === "1";
    } catch {
      seen = false;
    }
    const id = requestAnimationFrame(() => setIntro({ ready: true, delay: seen ? 0.15 : 1.35 }));
    return () => cancelAnimationFrame(id);
  }, []);

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 140]);

  const steps = ["1", "2", "3"] as const;
  const fade = (i: number) => ({
    initial: reduced ? false : { opacity: 0, y: 16 },
    animate: ready ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: reduced ? 0 : 0.9, ease: EASE, delay: reduced ? 0 : delay + i },
  });

  return (
    <section ref={ref} className="theme-dark relative isolate overflow-hidden bg-ink text-paper" aria-labelledby="contact-title">
      {/* Backdrop: one warm glow behind the form, grain */}
      <motion.div
        className="pointer-events-none absolute inset-0 -z-10"
        aria-hidden
        style={reduced ? undefined : { y: glowY }}
      >
        <div className="absolute -right-[14%] top-[-8%] h-[78vh] w-[78vh] glow-amber opacity-30 blur-3xl" />
      </motion.div>
      <div className="pointer-events-none absolute inset-0 -z-10 grain" aria-hidden />

      <div className="container-x relative pb-20 pt-32 sm:pt-40 lg:pb-28">
        <div className="grid gap-x-8 gap-y-12 lg:grid-cols-12 lg:items-start">
          <div className="contents lg:sticky lg:top-28 lg:col-span-5 lg:block">
            {/* Promise */}
            <div className="order-1">
              <motion.p
                className="eyebrow inline-flex items-center gap-3 text-muted"
                initial={{ opacity: 0, y: 12 }}
                animate={ready ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.8, ease: EASE, delay }}
              >
                <span className="size-1.5 rounded-full bg-current" aria-hidden />
                {t("eyebrow")}
              </motion.p>

              <h1 id="contact-title" className="text-h1 mt-6 text-balance">
                <Line delay={delay + 0.1} ready={ready} reduced={reduced}>
                  {t("titleLine1")}
                </Line>
                <Line delay={delay + 0.22} ready={ready} reduced={reduced}>
                  {t.rich("titleLine2", richTags)}
                </Line>
              </h1>

              <motion.p className="text-lead mt-7 max-w-md text-paper/80 text-pretty" {...fade(0.45)}>
                {t("lead")}
              </motion.p>

              {/* The one amber moment of this viewport: the promise of an answer */}
              <motion.p
                className="mt-8 inline-flex items-center gap-2.5 rounded-full border border-line py-2 pl-3.5 pr-4.5 font-mono text-[0.68rem] uppercase tracking-[0.16em] text-fg-2"
                {...fade(0.55)}
              >
                <span className="relative flex size-1.5" aria-hidden>
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber opacity-70 motion-reduce:hidden" />
                  <span className="relative inline-flex size-1.5 rounded-full bg-amber" />
                </span>
                {t("responseBadge")}
              </motion.p>
            </div>

            {/* What to expect + direct details */}
            <motion.div className="order-3 lg:mt-14" {...fade(0.62)}>
              <p className="eyebrow text-muted">{t("expectTitle")}</p>
              <ol className="mt-5 divide-y divide-line border-y border-line">
                {steps.map((s) => (
                  <li key={s} className="grid grid-cols-[2.5rem_1fr] gap-4 py-5 sm:grid-cols-[3rem_1fr]">
                    <span className="font-mono text-[0.72rem] leading-6 tracking-[0.18em] text-muted">0{s}</span>
                    <div>
                      <p className="text-[1.05rem] font-medium leading-6 tracking-[-0.01em] text-fg">{t(`steps.${s}.title`)}</p>
                      <p className="mt-1.5 max-w-sm text-[0.95rem] leading-relaxed text-muted text-pretty">{t(`steps.${s}.body`)}</p>
                    </div>
                  </li>
                ))}
              </ol>

              <dl className="mt-10 grid gap-6 sm:grid-cols-2">
                <div>
                  <dt className="eyebrow text-muted">{t("emailLabel")}</dt>
                  <dd className="mt-3">
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="group inline-flex items-center gap-1.5 text-[1.05rem] tracking-[-0.01em] text-fg underline-offset-6 hover:underline"
                      data-cursor="link"
                    >
                      {siteConfig.email}
                      <ArrowUpRight className="size-4 text-muted transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="eyebrow text-muted">{t("locationLabel")}</dt>
                  <dd className="mt-3 text-[1.05rem] tracking-[-0.01em] text-fg">{siteConfig.location[locale]}</dd>
                </div>
              </dl>
            </motion.div>
          </div>

          {/* Form */}
          <motion.div
            id="formulier"
            className="relative order-2 scroll-mt-28 lg:col-span-6 lg:col-start-7"
            initial={{ opacity: 0, y: 40, filter: "blur(12px)" }}
            animate={ready ? { opacity: 1, y: 0, filter: "blur(0px)" } : undefined}
            transition={{ duration: 1.2, ease: EASE, delay: delay + 0.35 }}
          >
            <div className="relative overflow-hidden rounded-3xl border border-line-2 bg-ink-2/70 p-6 shadow-[0_60px_120px_-50px_rgba(0,0,0,0.9)] backdrop-blur sm:p-8 lg:p-10">
              <ContactForm />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
