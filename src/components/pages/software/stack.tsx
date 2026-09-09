import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { cn } from "@/lib/utils";

const TECH = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Supabase", "Prisma", "Stripe", "Vercel", "React Native", "Expo", "Tailwind CSS", "Remotion"];
const PRINCIPLES = ["1", "2", "3"] as const;

/**
 * Light section: two quiet technology bands read as a texture strip (not as a
 * second headline), then three principles on hairlines whose titles and bodies
 * share a baseline via subgrid.
 */
export async function StackPrinciples() {
  const t = await getTranslations("Software");
  const half = Math.ceil(TECH.length / 2);
  const rows = [TECH.slice(0, half), TECH.slice(half)];

  return (
    <section className="theme-light relative overflow-hidden bg-bg text-fg section-y" aria-labelledby="software-stack-title">
      <div className="container-x">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <Reveal>
              <Eyebrow index={5}>{t("stack.eyebrow")}</Eyebrow>
            </Reveal>
            <Reveal delay={0.08}>
              <h2 id="software-stack-title" className="text-h2 mt-5 max-w-[16ch] text-balance">
                {t.rich("stack.title", richTags)}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.16} className="lg:col-span-4 lg:col-start-9">
            <p className="text-body max-w-md text-muted text-pretty lg:pb-2">{t("stack.intro")}</p>
          </Reveal>
        </div>
      </div>

      <Reveal className="mt-14 lg:mt-20" amount={0.2}>
        <div className="border-y border-line py-4" aria-label={t("stack.marqueeLabel")} role="group">
          {rows.map((row, ri) => (
            <MarqueeBand key={ri} reverse={ri === 1} speed={ri === 0 ? 58 : 74} gap="gap-0" className={ri === 1 ? "mt-1" : undefined}>
              {row.map((name) => (
                <span
                  key={name}
                  className={cn(
                    "flex items-center font-mono text-[clamp(1rem,2vw,1.75rem)] font-medium uppercase tracking-[-0.01em]",
                    ri === 0 ? "text-fg/55" : "text-fg/32",
                  )}
                >
                  <span className="px-5 sm:px-7">{name}</span>
                  <span className="size-1.5 rounded-full bg-fg/20" aria-hidden />
                </span>
              ))}
            </MarqueeBand>
          ))}
        </div>
      </Reveal>

      <div className="container-x">
        <RevealGroup className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-3 lg:gap-x-8" stagger={0.1}>
          {PRINCIPLES.map((k, i) => (
            <RevealItem key={k} as="article" className="border-t border-line pt-6">
              <span className="font-mono text-[0.78rem] tracking-[0.18em] text-muted">0{i + 1}</span>
              {/* Two-line box so all three bodies start on the same baseline. */}
              <h3 className="text-h3 mt-8 text-pretty lg:mt-10 lg:min-h-[2.2em]">{t(`stack.principles.${k}.title`)}</h3>
              <p className="text-body mt-4 max-w-sm text-muted text-pretty">{t(`stack.principles.${k}.body`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
