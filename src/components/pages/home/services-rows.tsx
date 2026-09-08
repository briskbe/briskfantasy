"use client";

import { useRef, useState, type PointerEvent } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react";
import { useTranslations } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { AppPathname } from "@/i18n/routing";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { RevealGroup, RevealItem } from "@/components/ui/reveal";
import { useFinePointer, usePrefersReducedMotion } from "@/hooks/use-media-query";
import { references } from "@/data/references";
import { portfolio } from "@/data/portfolio";
import { cn } from "@/lib/utils";

type ServiceKey = "websites" | "webshops" | "software" | "apps";

type Preview =
  | { kind: "site"; url: string; slug: string }
  | { kind: "image"; src: string; width: number; height: number };

const byId = (id: string) => portfolio.find((p) => p.id === id)!;
const bySlug = (slug: string) => references.find((r) => r.slug === slug)!;

const SERVICES: { key: ServiceKey; href: AppPathname; preview: Preview }[] = [
  { key: "websites", href: "/website-op-maat", preview: { kind: "site", url: bySlug("landelijkglas-be").url, slug: "landelijkglas-be" } },
  { key: "webshops", href: "/webshop-op-maat", preview: { kind: "site", url: bySlug("legacycristal-com").url, slug: "legacycristal-com" } },
  { key: "software", href: "/software-op-maat", preview: { kind: "image", ...byId("043-w037") } },
  { key: "apps", href: "/mobiele-apps", preview: { kind: "image", ...byId("039-w033") } },
];

function PreviewMedia({ preview, alt, priority = false }: { preview: Preview; alt: string; priority?: boolean }) {
  if (preview.kind === "site") {
    return <MicrolinkShot url={preview.url} slug={preview.slug} alt={alt} frame={false} live={false} imgClassName="aspect-[16/11]" priority={priority} />;
  }
  return (
    <div className="relative aspect-[16/11] w-full overflow-hidden bg-bg-2">
      <Image src={preview.src} alt={alt} width={preview.width} height={preview.height} className="h-full w-full object-cover object-top" sizes="(min-width: 1024px) 26rem, 40vw" />
    </div>
  );
}

export function ServicesRows() {
  const t = useTranslations("Home.services");
  const fine = useFinePointer();
  const reduced = usePrefersReducedMotion();
  const floating = fine && !reduced;

  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 30, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 260, damping: 30, mass: 0.6 });

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!floating) return;
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    x.set(e.clientX - r.left);
    y.set(e.clientY - r.top);
  };

  return (
    <div ref={wrapRef} className="relative" onPointerMove={onMove} onPointerLeave={() => setActive(null)}>
      <RevealGroup className="border-t border-line" stagger={0.06} amount={0.1}>
        {SERVICES.map((s, i) => {
          const title = t(`items.${s.key}.title`);
          const dimmed = active !== null && active !== i;
          return (
            <RevealItem key={s.key}>
              <Link
                href={s.href}
                data-cursor-label="→"
                onPointerEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                className={cn(
                  "group grid grid-cols-[auto_1fr_auto] items-center gap-x-5 border-b border-line py-7 transition-opacity duration-500 sm:gap-x-8 lg:grid-cols-[6rem_1fr_minmax(0,22rem)_auto] lg:py-9",
                  dimmed && "opacity-35",
                )}
              >
                <span className="font-mono text-[0.72rem] tracking-[0.18em] text-muted lg:text-[0.8rem]">0{i + 1}</span>
                <span className="min-w-0">
                  <span className="text-h2 block text-fg transition-transform duration-700 ease-[var(--ease-out-expo)] group-hover:translate-x-2">{title}</span>
                  <span className="text-body mt-2 block max-w-md text-muted lg:hidden">{t(`items.${s.key}.description`)}</span>
                </span>
                <span className="text-body hidden text-muted lg:block">{t(`items.${s.key}.description`)}</span>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full border border-line-2 text-fg transition-[background-color,color,border-color,transform] duration-500 ease-[var(--ease-out-expo)] group-hover:border-amber group-hover:bg-amber group-hover:text-ink lg:size-14">
                  <ArrowUpRight className="size-5 transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
                {/* Static thumbnail for touch devices */}
                {!floating && (
                  <span className="col-span-3 mt-5 block w-full max-w-sm overflow-hidden rounded-xl border border-line bg-bg-2">
                    <PreviewMedia preview={s.preview} alt={t("previewAlt", { service: title })} />
                  </span>
                )}
              </Link>
            </RevealItem>
          );
        })}
      </RevealGroup>

      {/* Floating preview that follows the pointer */}
      {floating && (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 z-20 w-[22rem] xl:w-[26rem]"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
        >
          <AnimatePresence mode="popLayout">
            {active !== null && (
              <motion.div
                key={SERVICES[active].key}
                initial={{ opacity: 0, scale: 0.85, rotate: -3, filter: "blur(8px)" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.9, rotate: 2, filter: "blur(6px)" }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className="overflow-hidden rounded-2xl border border-line bg-bg-2 shadow-[0_40px_90px_-30px_rgba(7,8,12,0.55)]"
              >
                <PreviewMedia preview={SERVICES[active].preview} alt="" priority />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}
