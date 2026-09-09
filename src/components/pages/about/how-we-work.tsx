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

/**
 * Three editorial columns on how a project runs — one rule across the top,
 * hairlines between the columns, no cards and no ghost numerals — closed by a
 * band of the tools we build with.
 */
export function HowWeWork() {
  const t = useTranslations("About.how");

  return (
    <div>
      <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
        <Reveal className="lg:col-span-6">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-h2 mt-5 text-balance">{t("title")}</h2>
        </Reveal>
        <Reveal delay={0.1} className="lg:col-span-4 lg:col-start-8">
          <p className="text-body max-w-md text-muted text-pretty">{t("lead")}</p>
        </Reveal>
      </div>

      <RevealGroup className="mt-16 grid border-t border-line lg:mt-24 lg:grid-cols-3" stagger={0.1}>
        {ITEMS.map((k, i) => (
          <RevealItem
            key={k}
            as="article"
            className="border-b border-line py-10 lg:border-b-0 lg:border-r lg:px-10 lg:py-14 lg:first:pl-0 lg:last:border-r-0 lg:last:pr-0"
          >
            <span className="font-mono text-[0.8rem] tracking-[0.18em] text-muted" aria-hidden>
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-h3 mt-7 text-balance">{t(`items.${k}.title`)}</h3>
            <p className="text-body mt-4 max-w-xs text-muted text-pretty">{t(`items.${k}.body`)}</p>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-16 lg:mt-24" amount={0.3}>
        <p className="eyebrow mb-6 text-muted">{t("toolsLabel")}</p>
        <div className="border-y border-line py-7">
          <MarqueeBand speed={54} gap="gap-12">
            {TOOLS.map((tool) => (
              <span
                key={tool}
                className="inline-flex items-center gap-12 whitespace-nowrap text-[clamp(1.15rem,1.8vw,1.65rem)] font-medium tracking-[-0.02em] text-fg-2"
              >
                {tool}
                <span className="size-1 rounded-full bg-line-2" aria-hidden />
              </span>
            ))}
          </MarqueeBand>
        </div>
      </Reveal>
    </div>
  );
}
