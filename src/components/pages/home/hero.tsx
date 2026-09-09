"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { richTags } from "@/components/ui/rich";
import { siteConfig } from "@/data/site";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { SocialProof } from "@/components/ui/google-rating";

const EASE = [0.16, 1, 0.3, 1] as const;

const SERVICE_LINKS: { key: "websites" | "webshops" | "software" | "apps"; href: StaticAppPathname }[] = [
  { key: "websites", href: "/website-op-maat" },
  { key: "webshops", href: "/webshop-op-maat" },
  { key: "software", href: "/software-op-maat" },
  { key: "apps", href: "/mobiele-apps" },
];

/** One headline line: clipped wrapper, the line rises into view. */
function Line({ children, delay, ready }: { children: ReactNode; delay: number; ready: boolean }) {
  return (
    <span className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
      <motion.span
        className="block will-change-transform"
        initial={{ y: "110%" }}
        animate={ready ? { y: "0%" } : { y: "110%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export function HomeHero() {
  const t = useTranslations("Home.hero");
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
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const videoDim = useTransform(scrollYProgress, [0, 0.9], [0, 0.75]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const scrollLine = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  return (
    <section ref={ref} className="theme-dark relative isolate min-h-[100svh] overflow-hidden bg-ink text-paper" aria-labelledby="hero-title">
      {/* Film */}
      <motion.div className="absolute inset-0 -z-10 will-change-transform" style={reduced ? undefined : { scale: videoScale }} aria-hidden>
        {reduced ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={siteConfig.heroPoster}
            alt=""
            className="h-full w-full object-cover object-[68%_center] brightness-95 saturate-[0.42] sm:object-center"
          />
        ) : (
          <video
            className="h-full w-full object-cover object-[68%_center] brightness-95 saturate-[0.42] sm:object-center"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            poster={siteConfig.heroPoster}
          >
            <source src={siteConfig.heroVideo} type="video/mp4" />
          </video>
        )}
      </motion.div>
      <p className="sr-only">{t("videoLabel")}</p>
      {/* Overlays: legibility for the header, melt into the next section, dim on scroll */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[34%] bg-gradient-to-b from-ink/80 via-ink/30 to-transparent" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[55%] bg-gradient-to-t from-ink via-ink/60 to-transparent" aria-hidden />
      <motion.div className="pointer-events-none absolute inset-0 -z-10 bg-ink" style={{ opacity: reduced ? 0 : videoDim }} aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 bg-ink-2/30 mix-blend-color" aria-hidden />
      <div className="pointer-events-none absolute inset-0 -z-10 grain" aria-hidden />

      {/* Content */}
      <motion.div
        className="container-x relative flex min-h-[100svh] flex-col justify-end pb-12 pt-40 sm:pb-14"
        style={reduced ? undefined : { y: contentY, opacity: contentOpacity }}
      >
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-9">
            <motion.p
              className="eyebrow inline-flex items-center gap-3 text-paper/70"
              initial={{ opacity: 0, y: 12 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.8, ease: EASE, delay }}
            >
              <span className="size-1.5 rounded-full bg-paper/40" aria-hidden />
              {t("eyebrow")}
            </motion.p>
            <h1 id="hero-title" className="text-display mt-6 max-w-[11ch] text-balance">
              <Line delay={delay + 0.1} ready={ready}>
                {t("titleLine1")}
              </Line>{" "}
              <Line delay={delay + 0.22} ready={ready}>
                {t.rich("titleLine2", richTags)}
              </Line>
            </h1>
            <motion.p
              className="text-lead mt-8 max-w-xl text-paper/80 text-pretty"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: delay + 0.45 }}
            >
              {t("lead")}
            </motion.p>
            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3 sm:gap-4"
              initial={{ opacity: 0, y: 16 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: delay + 0.58 }}
            >
              <Button href="/gesprek-inplannen" size="lg" className="min-w-[13.5rem] sm:min-w-0">
                {t("ctaPrimary")}
              </Button>
              <Button href="/referenties" variant="secondary" size="lg" icon="up-right" className="min-w-[13.5rem] sm:min-w-0">
                {t("ctaSecondary")}
              </Button>
            </motion.div>

            {/* Proof, directly under the CTA where the decision is made */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={ready ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.9, ease: EASE, delay: delay + 0.72 }}
            >
              <SocialProof className="mt-8" />
            </motion.div>
          </div>

          {/* Bottom-right: service index + scroll indicator (desktop only) */}
          <motion.div
            className="hidden lg:col-span-3 lg:flex lg:flex-col lg:items-end"
            initial={{ opacity: 0 }}
            animate={ready ? { opacity: 1 } : undefined}
            transition={{ duration: 1, delay: delay + 0.8 }}
          >
            <nav aria-label={t("navLabel")}>
              <ul className="flex flex-col items-end">
                {SERVICE_LINKS.map((s) => (
                  <li key={s.key}>
                    <Link
                      href={s.href}
                      className="group inline-flex min-h-10 items-center font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper/70 transition-colors hover:text-paper"
                    >
                      <span className="relative">
                        {t(`links.${s.key}`)}
                        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-paper transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:scale-x-100" />
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="mt-6 flex items-center gap-3" aria-hidden>
              <span className="font-mono text-[0.72rem] uppercase tracking-[0.18em] text-paper/50">{t("scroll")}</span>
              <span className="relative block h-12 w-px overflow-hidden bg-paper/15">
                <motion.span
                  className="absolute inset-x-0 top-0 h-1/2 bg-paper/70"
                  animate={reduced ? undefined : { y: ["-100%", "200%"] }}
                  transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1], repeat: Infinity, repeatDelay: 0.4 }}
                  style={{ opacity: scrollLine }}
                />
              </span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
