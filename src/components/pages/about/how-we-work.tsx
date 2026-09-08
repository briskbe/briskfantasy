"use client";

import { useTranslations } from "next-intl";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";

const ITEMS = ["contact", "price", "custom"] as const;

const TOOLS = [
  "Figma",
  "TypeScript",
  "React",
  "Next.js",
  "React Native",
  "Node.js",
  "PostgreSQL",
  "Supabase",
  "Stripe",
  "Vercel",
  "Remotion",
  "Tailwind CSS",
];

/** Three columns on how a project runs, plus a marquee of the tools we build with. */
export function HowWeWork() {
  const t = useTranslations("About.how");

  return (
    <div>
      <Reveal className="max-w-4xl">
        <Eyebrow>{t("eyebrow")}</Eyebrow>
        <h2 className="text-h1 mt-5 text-balance">{t("title")}</h2>
      </Reveal>

      <RevealGroup className="mt-14 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3 lg:mt-20" stagger={0.1}>
        {ITEMS.map((k, i) => (
          <RevealItem key={k} as="article" className="flex flex-col justify-between bg-bg p-7 sm:p-9 md:min-h-[21rem]">
            <span className="font-mono text-[clamp(3.5rem,6vw,5.5rem)] leading-none tracking-[-0.04em] text-fg/10" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="mt-8 md:mt-12">
              <h3 className="text-h3 text-balance">{t(`items.${k}.title`)}</h3>
              <p className="text-body mt-4 text-muted text-pretty">{t(`items.${k}.body`)}</p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-16 lg:mt-24" amount={0.3}>
        <p className="eyebrow text-muted mb-6">{t("toolsLabel")}</p>
        <div className="border-y border-line py-6">
          <MarqueeBand speed={48} gap="gap-14">
            {TOOLS.map((tool) => (
              <span key={tool} className="inline-flex items-center gap-14 whitespace-nowrap text-h3 font-medium text-fg/80">
                {tool}
                <span className="size-1.5 rounded-full bg-amber" aria-hidden />
              </span>
            ))}
          </MarqueeBand>
        </div>
      </Reveal>
    </div>
  );
}
