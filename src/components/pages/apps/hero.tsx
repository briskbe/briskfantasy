"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown } from "lucide-react";
import { useLenis } from "lenis/react";
import { Button } from "@/components/ui/button";
import { Eyebrow } from "@/components/ui/eyebrow";
import { richTags } from "@/components/ui/rich";
import { PhoneFrame, PhoneScreen } from "./phone-frame";
import { HERO_BACK_INDEX, HERO_FRONT_INDEXES, SCREEN_CROPS, screenRect } from "./screen-crops";

const EASE = [0.16, 1, 0.3, 1] as const;
const WIPE = [0.76, 0, 0.24, 1] as const;
const FACTS = ["platforms", "screens", "reply"] as const;

const FRONT = HERO_FRONT_INDEXES.map((i) => screenRect(SCREEN_CROPS[i]));
const BACK = screenRect(SCREEN_CROPS[HERO_BACK_INDEX]);
const SIZES = "(min-width: 1024px) 960px, 200vw";

/**
 * The rotating screen inside the hero device. Layers are stacked and the
 * incoming one wipes down over the outgoing one, so two screens are never
 * blended into a ghosted frame (a crossfade did exactly that).
 */
function ScreenReel({ alt }: { alt: string }) {
  const reduced = useReducedMotion();
  const [{ index, prev }, setStep] = useState({ index: 0, prev: 0 });

  useEffect(() => {
    if (reduced || FRONT.length < 2) return;
    const id = window.setInterval(() => setStep((s) => ({ index: (s.index + 1) % FRONT.length, prev: s.index })), 3800);
    return () => window.clearInterval(id);
  }, [reduced]);

  return (
    <>
      {FRONT.map((rect, i) => (
        <motion.div
          key={rect.src + i}
          className="absolute inset-0"
          style={{ zIndex: i === index ? 2 : i === prev ? 1 : 0 }}
          initial={{ clipPath: i === 0 ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
          animate={{ clipPath: i === index || i === prev ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)" }}
          transition={{ duration: 0.8, ease: WIPE }}
        >
          <PhoneScreen rect={rect} alt={i === 0 ? alt : ""} sizes={SIZES} priority={i === 0} />
        </motion.div>
      ))}
    </>
  );
}

/**
 * Editorial hero: a display headline over seven columns, the lead, the call to
 * action and the facts row stacked underneath it, and two phones standing in
 * the right-hand columns over an amber glow — no card, no hairline box.
 */
export function AppsHero() {
  const t = useTranslations("Apps");
  const reduced = useReducedMotion();
  const lenis = useLenis();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const rise = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 60]);
  const deviceY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -90]);
  const deviceRotate = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -3]);

  return (
    <section ref={ref} className="theme-dark relative overflow-hidden bg-ink text-paper grain" aria-labelledby="apps-hero-title">
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="glow-sky absolute -left-[20%] top-[-30%] h-[60vh] w-[60vw] opacity-20" />
        <div className="glow-amber absolute right-[-6%] top-[16%] h-[70vh] w-[52vw] opacity-45" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-ink to-transparent" />
      </div>

      <div className="container-x relative flex min-h-[100svh] flex-col pt-28 pb-10 sm:pt-30 lg:pb-12">
        <div className="grid flex-1 items-end gap-10 lg:grid-cols-12 lg:gap-10">
          {/* copy */}
          <motion.div style={{ opacity: fade, y: rise }} className="lg:col-span-7 lg:pr-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}>
              <Eyebrow tone="muted">{t("hero.eyebrow")}</Eyebrow>
            </motion.div>

            <h1 id="apps-hero-title" className="text-display mt-5 max-w-[13ch] text-[clamp(2.75rem,min(9vw,12.5vh),9.5rem)]">
              <span className="block overflow-hidden pb-[0.08em]">
                <motion.span className="block" initial={{ y: "104%" }} animate={{ y: 0 }} transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}>
                  {t.rich("hero.title", richTags)}
                </motion.span>
              </span>
            </h1>

            <motion.p
              className="text-lead mt-6 max-w-lg text-muted text-pretty"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE, delay: 0.7 }}
            >
              {t("hero.lead")}
            </motion.p>

            <motion.div
              className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 1 }}
            >
              <Button href="/gesprek-inplannen" size="lg">
                {t("hero.primary")}
              </Button>
              <a
                href="#screens"
                data-cursor="link"
                onClick={(e) => {
                  const el = document.getElementById("screens");
                  if (!el) return;
                  e.preventDefault();
                  if (lenis) lenis.scrollTo(el);
                  else el.scrollIntoView({ behavior: "smooth", block: "start" });
                }}
                className="group inline-flex min-h-11 items-center gap-2.5 text-base font-medium tracking-[-0.01em] text-fg"
              >
                <span className="bg-[linear-gradient(currentColor,currentColor)] bg-[length:0%_1px] bg-left-bottom bg-no-repeat pb-1 transition-[background-size] duration-500 ease-[var(--ease-out-expo)] group-hover:bg-[length:100%_1px]">
                  {t("hero.secondary")}
                </span>
                <ArrowDown className="size-4 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:translate-y-1" />
              </a>
            </motion.div>

            {/* facts */}
            <motion.dl
              className="mt-10 grid gap-x-8 gap-y-3 border-t border-line pt-6 sm:gap-y-6 sm:grid-cols-3 lg:mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.25 }}
            >
              {FACTS.map((k) => (
                <div key={k} className="flex items-baseline justify-between gap-4 sm:block">
                  <dt className="text-h4 text-fg">{t(`hero.facts.${k}.value`)}</dt>
                  <dd className="text-right font-mono text-[0.66rem] uppercase leading-relaxed tracking-[0.16em] text-muted sm:mt-1.5 sm:text-left sm:text-[0.7rem]">
                    {t(`hero.facts.${k}.label`)}
                  </dd>
                </div>
              ))}
            </motion.dl>
          </motion.div>

          {/* devices */}
          <div className="relative flex justify-center lg:col-span-5 lg:justify-end lg:self-end lg:pb-2">
            <motion.div
              style={{ y: deviceY, rotate: deviceRotate }}
              className="relative"
              initial={{ opacity: 0, y: 60, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.3, ease: EASE, delay: 0.5 }}
            >
              {/* the phone standing behind */}
              <div
                aria-hidden
                className="absolute bottom-[9%] right-[62%] w-[66%] -rotate-[9deg] opacity-80 [mask-image:linear-gradient(90deg,transparent,#000_28%)]"
              >
                <PhoneFrame>
                  <PhoneScreen rect={BACK} alt="" sizes={SIZES} />
                </PhoneFrame>
              </div>

              <motion.figure
                role="img"
                aria-label={t("hero.reelLabel")}
                className="relative w-[58vw] max-w-[268px] sm:w-[248px] lg:w-[min(22vw,320px)]"
              >
                <PhoneFrame className="w-full">
                  <ScreenReel alt={t("hero.reelLabel")} />
                </PhoneFrame>
              </motion.figure>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
