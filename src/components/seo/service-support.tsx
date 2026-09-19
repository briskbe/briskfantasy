import { Link } from "@/i18n/navigation";
import { clusterBySlug, clusterSlugFor } from "@/data/seo/clusters";
import type { AppLocale } from "@/i18n/routing";
import { JsonLd } from "./json-ld";
import { absoluteUrl, breadcrumbSchema, jsonLdGraph, serviceSchema } from "@/lib/seo";

export function ServiceSupport({ locale, kind }: { locale: AppLocale; kind: "websites" | "webshops" }) {
  const nl = locale === "nl";
  const website = kind === "websites";
  const href = website ? "/website-op-maat" : "/webshop-op-maat";
  const title = website ? (nl ? "Website laten maken op maat" : "Custom website design and development") : (nl ? "Webshop laten maken op maat" : "Custom ecommerce website development");
  const description = website
    ? nl ? "Brisk ontwerpt en bouwt websites voor Belgische KMO’s en zelfstandigen vanuit Genk. Strategie, webdesign en ontwikkeling in één traject." : "Brisk designs and develops business websites from Genk, Belgium, bringing strategy, web design and development into one project."
    : nl ? "Een maatwerk webshop met aandacht voor productinformatie, checkout, betaalmethoden en koppelingen. Ontworpen en gebouwd door Brisk in Genk." : "Custom ecommerce websites with clear product information, checkout flows, payment methods and integrations, designed and built by Brisk in Genk.";
  const slugs = website
    ? ["website-laten-maken-kosten", "website-laten-vernieuwen", "wordpress-website-laten-maken", "meertalige-website-laten-maken", "webdesign-bureau", "landingspagina-laten-maken"]
    : ["webshop-laten-maken-kosten", "shopify-webshop-laten-maken", "woocommerce-webshop-laten-maken", "webshop-laten-migreren", "b2b-webshop-laten-maken", "e-commerce-bureau"];
  const linkedClusters = slugs.flatMap((slug) => { const c = clusterBySlug(slug); return c ? [c] : []; });
  const rows = website ? [
    [nl ? "Structuur" : "Structure", nl ? "Aantal paginatypes, talen en doelgroepen. Tien pagina’s met dezelfde opbouw vragen iets anders dan tien unieke ontwerpen." : "Page types, languages and audiences. Ten pages sharing one layout need a different scope from ten original designs."],
    [nl ? "Inhoud" : "Content", nl ? "Wie levert teksten, foto’s en vertalingen? Plan het verzamelen en goedkeuren van inhoud mee in het project." : "Who supplies copy, photography and translations? Include content collection and approval in the project plan."],
    [nl ? "Functionaliteit" : "Functionality", nl ? "Een contactformulier, boekingsflow, CMS of CRM-koppeling heeft telkens een eigen ontwerp-, bouw- en testbehoefte." : "Contact forms, booking flows, a CMS and CRM integrations each need their own design, build and testing scope."],
    [nl ? "Na lancering" : "After launch", nl ? "Leg hosting, onderhoud, monitoring, beheerrechten en toekomstige wijzigingen vast in de offerte." : "Specify hosting, maintenance, monitoring, access rights and future changes in the proposal."],
  ] : [
    [nl ? "Catalogus" : "Catalogue", nl ? "Producten, varianten, filters en import uit je bestaande systeem bepalen de basis van de webshop." : "Products, variants, filters and importing existing data define the store’s foundation."],
    [nl ? "Betalen & leveren" : "Payments & delivery", nl ? "Stem Bancontact, iDEAL of andere betaalmethoden af op je klanten en gekozen betaalprovider. Test ook mislukte betalingen, terugbetalingen en verzendopties." : "Choose payment methods for your customers and payment provider. Test failed payments, refunds and delivery options as well as successful orders."],
    [nl ? "Koppelingen" : "Integrations", nl ? "Voorraad, boekhouding en orderverwerking vragen duidelijke afspraken over welk systeem leidend is en wat er gebeurt bij een fout." : "Inventory, accounting and order processing need clear decisions about the source of truth and how errors are handled."],
    [nl ? "Beheer" : "Operations", nl ? "Neem productbeheer, klantenservice, updates en monitoring op in je totale kostenplaatje, naast het bouwen van de webshop." : "Include merchandising, customer service, updates and monitoring in the total cost alongside the initial build."],
  ];
  return <>
    <JsonLd data={jsonLdGraph([serviceSchema({ name: title, description, url: absoluteUrl(href, locale) }), breadcrumbSchema([{ name: "Home", url: absoluteUrl("/", locale) }, { name: title, url: absoluteUrl(href, locale) }])])} />
    <section className="theme-light bg-bg text-fg section-y">
      <div className="container-x grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4"><p className="eyebrow text-muted">{nl ? "Een goede beslissing begint hier" : "Plan a better project"}</p><h2 className="text-h2 mt-5 text-balance">{website ? (nl ? "Wat kost een website laten maken?" : "What does a custom website cost?") : (nl ? "Wat kost een webshop laten maken?" : "What does an ecommerce website cost?")}</h2></div>
        <div className="lg:col-span-7 lg:col-start-6">
          <p className="text-body text-fg-2">{nl ? "Een bruikbare prijs begint met een duidelijke opdracht. We bekijken je doel, inhoud en functionaliteit voordat we een offerte opstellen. Vergelijk voorstellen op wat je krijgt bij oplevering én wat je nodig hebt om de site daarna te beheren." : "A useful price starts with a clear brief. We review your goals, content and functionality before preparing a proposal. Compare both the launch deliverables and what you need to run the site afterwards."}</p>
          <div className="mt-8 overflow-x-auto"><table className="w-full min-w-[280px] text-left text-sm"><caption className="sr-only">{nl ? "Wat bepaalt de investering?" : "What determines the investment?"}</caption><thead><tr className="border-b border-line"><th scope="col" className="py-4 pr-4">{nl ? "Onderdeel" : "Area"}</th><th scope="col" className="py-4">{nl ? "Wat we samen bepalen" : "What we define together"}</th></tr></thead><tbody>{rows.map(([label, body]) => <tr key={label} className="border-b border-line"><th scope="row" className="py-5 pr-5 align-top font-medium">{label}</th><td className="py-5 leading-relaxed text-fg-2">{body}</td></tr>)}</tbody></table></div>
          <h3 className="text-h4 mt-10">{nl ? "Voor KMO’s en zelfstandigen in België" : "A Belgian agency for businesses at home and abroad"}</h3>
          <p className="text-body mt-4 text-fg-2">{nl ? "Brisk is gevestigd aan de Herenstraat 15 in Genk. Voor een dienstverlener draait een site vaak om gerichte aanvragen; voor een hotel om kamers en reserveringen; voor een winkel om producten en bestellingen. Die klantreis bepaalt de opbouw. Bekijk bijvoorbeeld City Housing Genk, Landelijk Glas en LegacyCristal bij onze referenties." : "Brisk is based at Herenstraat 15 in Genk. A service business needs qualified enquiries, a hotel needs clear room and booking information, and a retailer needs product discovery and ordering. Those customer journeys shape the website. Explore City Housing Genk, Landelijk Glas and LegacyCristal in our portfolio."}</p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm"><Link href="/referenties" className="underline underline-offset-4">{nl ? "Bekijk onze website- en webshopprojecten" : "Explore our website and ecommerce projects"}</Link><Link href={{ pathname: "/regio/[slug]", params: { slug: "limburg" } }} className="underline underline-offset-4">{nl ? "Webdesign in Genk, Hasselt en Limburg" : "Web design in Genk, Hasselt and Limburg"}</Link><Link href="/gesprek-inplannen" className="underline underline-offset-4">{nl ? "Vraag een offerte op maat aan" : "Request a tailored proposal"}</Link></div>
        </div>
      </div>
      <div className="container-x mt-16"><h2 className="text-h3">{nl ? "Verdiep je in de juiste oplossing" : "Find the right approach"}</h2><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{linkedClusters.map((cluster) => <Link key={cluster.slug} href={{ pathname: "/diensten/[slug]", params: { slug: clusterSlugFor(cluster, locale) } }} className="rounded-xl border border-line p-6 font-medium hover:border-accent">{cluster.keyword[locale]}</Link>)}<Link href="/kennisbank" className="rounded-xl border border-line p-6 font-medium hover:border-accent">{nl ? "Praktische gidsen voor je websiteproject" : "Practical guides for your website project"}</Link></div></div>
    </section>
  </>;
}
