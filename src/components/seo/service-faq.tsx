import { getTranslations } from "next-intl/server";
import { JsonLd } from "./json-ld";
import { faqSchema, jsonLdGraph } from "@/lib/seo";

/** Native disclosure keeps every answer in the HTML and works without JS. */
export async function ServiceFaq({ namespace }: { namespace: "Websites" | "Webshops" }) {
  const t = await getTranslations(namespace);
  const items = ["1", "2", "3", "4", "5"].map((key) => ({ question: t(`faq.items.${key}.q`), answer: t(`faq.items.${key}.a`) }));
  return <section className="theme-light bg-bg-2 text-fg section-y" aria-labelledby={`${namespace}-faq`}>
    <JsonLd data={jsonLdGraph([faqSchema(items)])} />
    <div className="container-x grid gap-12 lg:grid-cols-12">
      <div className="lg:col-span-4"><p className="eyebrow text-muted">{t("faq.eyebrow")}</p><h2 id={`${namespace}-faq`} className="text-h2 mt-5 text-balance">{t("faq.title")}</h2><p className="text-body mt-6 text-muted">{t("faq.aside")}</p></div>
      <div className="border-t border-line lg:col-span-7 lg:col-start-6">{items.map(({ question, answer }, i) => <details key={question} open={i === 0} className="border-b border-line py-6"><summary className="cursor-pointer text-h4">{question}</summary><p className="mt-5 text-body text-fg-2">{answer}</p></details>)}</div>
    </div>
  </section>;
}
