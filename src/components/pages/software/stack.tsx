import { getTranslations } from "next-intl/server";
import { Eyebrow } from "@/components/ui/eyebrow";
import { MarqueeBand } from "@/components/ui/marquee-band";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";

const TECH = ["TypeScript", "React", "Next.js", "Node.js", "PostgreSQL", "Supabase", "Prisma", "Stripe", "Vercel", "React Native", "Expo", "Tailwind CSS", "Remotion"];
const PRINCIPLES = ["1", "2", "3"] as const;

/** Dark section: two mono technology marquees, then three principles on hairlines. */
export async function StackPrinciples() {
  const t = await getTranslations("Software");
  const half = Math.ceil(TECH.length / 2);
  const rows = [TECH.slice(0, half), TECH.slice(half)];

  return (
    <section className="theme-dark relative overflow-hidden bg-ink text-paper section-y" aria-labelledby="software-stack-title">
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

      <Reveal className="mt-16 lg:mt-24" amount={0.2}>
        <div className="border-y border-line py-3" aria-label={t("stack.marqueeLabel")} role="group">
          {rows.map((row, ri) => (
            <MarqueeBand key={ri} reverse={ri === 1} speed={ri === 0 ? 55 : 68} gap="gap-0" className={ri === 1 ? "mt-2" : undefined}>
              {row.map((name) => (
                <span key={name} className="flex items-center font-mono text-[clamp(1.5rem,3.4vw,3rem)] font-medium uppercase tracking-[-0.02em] text-fg/85">
                  <span className="px-6 sm:px-8">{name}</span>
                  <span className="size-2 rounded-full bg-amber" aria-hidden />
                </span>
              ))}
            </MarqueeBand>
          ))}
        </div>
      </Reveal>

      <div className="container-x">
        <RevealGroup className="mt-16 grid gap-10 lg:mt-24 lg:grid-cols-3 lg:gap-8" stagger={0.1}>
          {PRINCIPLES.map((k, i) => (
            <RevealItem key={k} as="article" className="border-t border-line pt-6">
              <span className="font-mono text-[0.78rem] tracking-[0.18em] text-amber">0{i + 1}</span>
              <h3 className="text-h3 mt-8 text-balance lg:mt-10">{t(`stack.principles.${k}.title`)}</h3>
              <p className="text-body mt-4 max-w-sm text-muted text-pretty">{t(`stack.principles.${k}.body`)}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
