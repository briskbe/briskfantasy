import { getLocale, getTranslations } from "next-intl/server";
import { Reveal } from "@/components/ui/reveal";
import { siteConfig } from "@/data/site";
import { Toc } from "./toc";

export const PRIVACY_SECTIONS = ["who", "collect", "use", "retain", "third", "rights", "contact"] as const;
export type PrivacySection = (typeof PRIVACY_SECTIONS)[number];

/** Replaces {email} / {location} in plain paragraphs read via t.raw(). */
function fill(text: string, vars: Record<string, string>) {
  return text.replace(/\{(\w+)\}/g, (_, k: string) => vars[k] ?? `{${k}}`);
}

/** Legal body: sticky table of contents on the left, readable column on the right. */
export async function PrivacyBody() {
  const t = await getTranslations("Privacy");
  const locale = (await getLocale()) as "nl" | "en";
  const vars = { email: siteConfig.email, location: siteConfig.location[locale] };

  const sections = PRIVACY_SECTIONS.map((key, i) => ({
    key,
    index: String(i + 1).padStart(2, "0"),
    title: t(`sections.${key}.title`),
    body: t.raw(`sections.${key}.body`) as string[],
    list: t.raw(`sections.${key}.list`) as string[],
  }));

  return (
    <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
      <Toc
        label={t("toc")}
        items={sections.map((s) => ({ id: s.key, index: s.index, title: s.title }))}
        className="self-start lg:sticky lg:top-32 lg:col-span-3"
      />

      <div className="max-w-3xl lg:col-span-8 lg:col-start-5">
        {sections.map((s, i) => (
          <Reveal key={s.key} as="section" className={i === 0 ? "" : "mt-16 border-t border-line pt-14 lg:mt-20 lg:pt-16"} amount={0.15}>
            <div id={s.key} className="scroll-mt-32">
              <p className="font-mono text-[0.72rem] tracking-[0.18em] text-muted">{s.index}</p>
              <h2 className="text-h3 mt-3 text-balance">{s.title}</h2>
              <div className="mt-6 space-y-5">
                {s.body.map((p, j) => (
                  <p key={j} className="text-body text-fg-2 text-pretty">
                    {renderWithEmail(fill(p, vars), siteConfig.email)}
                  </p>
                ))}
              </div>
              {s.list.length > 0 ? (
                <ul className="mt-6 space-y-4">
                  {s.list.map((item, j) => (
                    <li key={j} className="grid grid-cols-[1rem_1fr] gap-4 text-body text-fg-2 text-pretty">
                      <span className="mt-[0.72em] size-1.5 rounded-full bg-fg/30" aria-hidden />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/** Turns the plain email address inside a paragraph into a mailto link. */
function renderWithEmail(text: string, email: string) {
  const parts = text.split(email);
  if (parts.length === 1) return text;
  return parts.flatMap((part, i) =>
    i === 0
      ? [part]
      : [
          <a key={i} href={`mailto:${email}`} className="text-fg underline underline-offset-4 hover:text-accent">
            {email}
          </a>,
          part,
        ],
  );
}
