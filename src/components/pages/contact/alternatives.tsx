import { getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { MicrolinkShot } from "@/components/ui/microlink-shot";
import { siteConfig } from "@/data/site";
import { featuredReferences } from "@/data/references";
import { AltCard } from "./alt-card";

const linkClass =
  "group/link mt-6 inline-flex h-11 items-center gap-1.5 self-start text-[0.95rem] font-medium tracking-[-0.01em] text-fg";

function LinkLabel({ children }: { children: string }) {
  return (
    <>
      <span className="relative">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-amber transition-transform duration-500 ease-[var(--ease-out-expo)] group-hover/link:scale-x-100" />
      </span>
      <ArrowUpRight className="size-4 text-muted transition-all duration-500 ease-[var(--ease-out-expo)] group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5 group-hover/link:text-amber" />
    </>
  );
}

/** Three small cards: email, briefing, not sure yet. Light section. */
export async function Alternatives() {
  const t = await getTranslations("Contact.alternatives");
  const shot = featuredReferences[0];

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>{t("eyebrow")}</Eyebrow>
          <h2 className="text-h2 mt-5 max-w-md text-balance">{t("title")}</h2>
        </Reveal>
      </div>

      <RevealGroup className="mt-12 grid gap-4 md:grid-cols-3 lg:mt-16" stagger={0.1}>
        <RevealItem className="h-full">
          <AltCard>
            <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">01</span>
            <h3 className="text-h4 mt-8">{t("cards.mail.title")}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">{t("cards.mail.body")}</p>
            <a href={`mailto:${siteConfig.email}`} className={linkClass} data-cursor="link">
              <LinkLabel>{t("cards.mail.link")}</LinkLabel>
            </a>
          </AltCard>
        </RevealItem>

        <RevealItem className="h-full">
          <AltCard>
            <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">02</span>
            <h3 className="text-h4 mt-8">{t("cards.briefing.title")}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">{t("cards.briefing.body")}</p>
            <a href="#formulier" className={linkClass} data-cursor="link">
              <LinkLabel>{t("cards.briefing.link")}</LinkLabel>
            </a>
          </AltCard>
        </RevealItem>

        <RevealItem className="h-full">
          <AltCard className="pb-0">
            <span className="font-mono text-[0.7rem] tracking-[0.18em] text-muted">03</span>
            <h3 className="text-h4 mt-8">{t("cards.unsure.title")}</h3>
            <p className="mt-3 text-[0.95rem] leading-relaxed text-muted text-pretty">{t("cards.unsure.body")}</p>
            <Link href="/referenties" className={linkClass} data-cursor="link">
              <LinkLabel>{t("cards.unsure.link")}</LinkLabel>
            </Link>
            {/* A real reference peeks in at the bottom of the card */}
            <div className="relative mt-auto -mx-1 h-[8.5rem] overflow-hidden">
              <MicrolinkShot
                url={shot.url}
                slug={shot.slug}
                alt={shot.name}
                className="absolute inset-x-0 top-6 rounded-b-none"
                sizes="(min-width: 768px) 30vw, 90vw"
              />
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-bg-2 to-transparent" />
            </div>
          </AltCard>
        </RevealItem>
      </RevealGroup>
    </>
  );
}
