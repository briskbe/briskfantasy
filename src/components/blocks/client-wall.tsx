import { getTranslations, getLocale } from "next-intl/server";
import { clients, yearsOfExperience, type Client } from "@/data/clients";
import { siteConfig } from "@/data/site";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal, RevealGroup, RevealItem } from "@/components/ui/reveal";
import { richTags } from "@/components/ui/rich";
import { cn } from "@/lib/utils";

/**
 * The client logo wall.
 *
 * Logos sit on the light (paper) sections so each brand's own mark reads
 * correctly without recolouring it. They rest desaturated at 55% so the wall
 * reads as one texture, and return to full colour on hover — the only
 * treatment applied to a client's mark.
 *
 * `variant="full"`    headline, logo grid and the credibility line (homepage, work, about)
 * `variant="compact"` a single hairline row of logos (service pages)
 */
function LogoMark({ client, locale }: { client: Client; locale: "nl" | "en" }) {
  if (!client.logo) {
    // No usable vector from the brand yet — set the name in our own type so the
    // cell still carries the client, at the same optical weight as a logo.
    return (
      <span className="text-center text-[0.95rem] font-medium leading-tight tracking-[-0.03em] text-fg/60 transition-colors duration-500 group-hover:text-fg sm:text-[1.2rem]">
        {client.name}
      </span>
    );
  }
  // A fixed box plus object-contain sizes every mark to the largest it can be
  // inside it, scaling small SVGs UP as well as capping large ones — `max-h`
  // alone would leave a 24px-tall wordmark at 24px. Wide marks meet the width
  // limit, square marks the height limit, and `scale` balances the two by eye.
  return (
    <span className="flex h-11 w-full max-w-32 items-center justify-center sm:h-14 sm:max-w-44">
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG in /public; the image optimizer rejects SVG by default */}
      <img
        src={client.logo}
        alt={`${client.name} — ${client.sector[locale]}`}
        width={client.width}
        height={client.height}
        loading="lazy"
        decoding="async"
        style={client.scale ? { transform: `scale(${client.scale})` } : undefined}
        className="h-full w-full object-contain opacity-60 grayscale transition-[opacity,filter] duration-500 ease-[var(--ease-out-expo)] group-hover:opacity-100 group-hover:grayscale-0"
      />
    </span>
  );
}

function Cell({ client, locale, showSector }: { client: Client; locale: "nl" | "en"; showSector?: boolean }) {
  return (
    <div className="group flex h-28 flex-col items-center justify-center gap-2 bg-bg px-5 sm:h-36">
      <LogoMark client={client} locale={locale} />
      {showSector && (
        <span className="text-center font-mono text-[0.6rem] uppercase tracking-[0.16em] text-muted opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          {client.sector[locale]}
        </span>
      )}
    </div>
  );
}

export async function ClientWall({
  variant = "full",
  className,
}: {
  variant?: "full" | "compact";
  className?: string;
}) {
  const t = await getTranslations("Common.clients");
  const locale = (await getLocale()) as "nl" | "en";
  const years = yearsOfExperience();
  const total = siteConfig.projectsDelivered;

  if (variant === "compact") {
    return (
      <section className={cn("theme-light bg-bg text-fg", className)}>
        <div className="container-x section-y-sm">
          <Reveal>
            <Eyebrow>{t("compactEyebrow", { years, total })}</Eyebrow>
          </Reveal>
          <RevealGroup className="mt-8 -ml-px -mt-px grid grid-cols-2 overflow-hidden rounded-2xl border border-line sm:grid-cols-4 2xl:grid-cols-8">
            {clients.map((c) => (
              <RevealItem key={c.slug} className="border-l border-t border-line">
                <Cell client={c} locale={locale} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>
    );
  }

  return (
    <section className={cn("theme-light bg-bg text-fg", className)} id="clients">
      <div className="container-x section-y">
        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{t("eyebrow")}</Eyebrow>
            <h2 className="text-h2 mt-5 text-balance">{t.rich("title", richTags)}</h2>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-5 lg:col-start-8">
            <p className="text-body max-w-md text-muted text-pretty">{t("lead", { years, total })}</p>
          </Reveal>
        </div>

        <RevealGroup
          className="mt-12 -ml-px -mt-px grid grid-cols-2 overflow-hidden rounded-2xl border border-line sm:grid-cols-3 lg:mt-16 lg:grid-cols-4"
          stagger={0.05}
        >
          {clients.map((c) => (
            <RevealItem key={c.slug} className="border-l border-t border-line">
              <Cell client={c} locale={locale} showSector />
            </RevealItem>
          ))}
        </RevealGroup>

        <Reveal delay={0.1}>
          <p className="mt-8 max-w-3xl text-[0.95rem] text-muted text-pretty">{t("note", { years, total })}</p>
        </Reveal>
      </div>
    </section>
  );
}
