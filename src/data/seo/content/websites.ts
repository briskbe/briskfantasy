import type { ClusterContentMap } from "./types";

/**
 * Copy for the website cluster pages (`parent: "websites"` in `clusters.ts`).
 *
 * Every page is written for one search intent and one reader. The NL and EN
 * versions are written separately: same facts, different sentences, different
 * examples. Nothing here states a price, a percentage or a result — those are
 * the claims we cannot back up, and a landing page that invents them is worth
 * less than one that says plainly what it does not know.
 */
export const websiteClusterContent: ClusterContentMap = {
  /* ------------------------------------------------------------------ *
   * WordPress
   * ------------------------------------------------------------------ */
  "wordpress-website-laten-maken": {
    nl: {
      metaTitle: "WordPress website laten maken",
      metaDescription:
        "Een WordPress site zonder gekocht thema of pagebuilder: Brisk ontwerpt eerst en bouwt dat ontwerp als een eigen thema. Ook overname van bestaande sites.",
      h1: "Een WordPress website laten maken die niet uit een thema komt",
      lead: "Je wil een WordPress website laten maken die je team zelf kan beheren, zonder dat ze eruitziet als drie andere bedrijven in je sector. Wij ontwerpen eerst en bouwen dat ontwerp daarna als een eigen thema, met blokken die alleen jouw huisstijl kunnen maken. Geen marktplaatsthema, geen bouwpakket.",
      sections: [
        {
          heading: "Wanneer WordPress de juiste keuze is, en wanneer niet",
          body: [
            "WordPress is sterk als jouw team zelf publiceert: nieuws, vacatures, cases, landingspagina's voor een campagne. Het CMS is bekend, veel mensen kunnen ermee werken en je zit niet vast aan één leverancier. Dat laatste weegt bij ons zwaar mee, want een site die alleen wij kunnen onderhouden is een slechte deal voor jou.",
            "Het is de verkeerde keuze wanneer de site vooral een schil rond zware logica is: een rekenmodule, een portaal met rollen en rechten, of koppelingen die de hele dag data heen en weer duwen. Dan bouwen we liever een applicatie en houden we WordPress hooguit voor het redactionele deel. Dat zeggen we tijdens het eerste gesprek, niet halverwege de bouw.",
            "In de meeste projecten valt die beslissing in de eerste week. Wat de site moet doen bepaalt het platform, nooit omgekeerd. Brisk bouwt websites, webshops, software en mobiele apps, dus we hebben geen reden om alles naar hetzelfde systeem te duwen.",
          ],
        },
        {
          heading: "Wat een WordPress website op maat bij ons betekent",
          body: [
            "We beginnen bij structuur en teksten, dan het ontwerp, dan pas de code. Dat ontwerp bouwen we na als een eigen thema met eigen blokken, zodat de editor alleen de bouwstenen toont die in jouw ontwerp bestaan. Je kan geen pagina samenstellen die er verkeerd uitziet, want die combinatie zit er niet in.",
            "Dat scheelt ook gewicht. Een gekocht thema sleept functies mee voor duizend andere bedrijven, en die code laadt bij elke bezoeker mee. Wat wij bouwen bevat wat jouw site nodig heeft en verder niets. Snelheid, toegankelijkheid en Core Web Vitals testen we tijdens de bouw, niet met een plug-in achteraf.",
            "Een WordPress site laten bouwen betekent bij ons ook dat je eigenaar bent. Ontwerp, code en content zijn bij oplevering van jou, inclusief toegang tot hosting en repository. Wil je over twee jaar met een ander team verder, dan kan dat zonder discussie.",
          ],
        },
        {
          heading: "Je hebt al een WordPress site",
          body: [
            "Veel projecten beginnen niet bij nul. Een site die vijf jaar geleden goed werkte, is intussen een stapel plug-ins geworden, laadt traag op mobiel en heeft een beheerscherm waar niemand nog durft te klikken. We kijken dan eerst wat blijft: de content, de posities in Google, de koppelingen die hun werk doen.",
            "Daarna kiezen we tussen opknappen en herbouwen. Opknappen gaat verder dan je denkt: de zwaarste plug-ins vervangen door eigen code, templates herschrijven, beelden en lettertypes aanpakken. Herbouwen wordt de betere keuze zodra het onderhoud van de oude basis meer tijd kost dan een nieuwe.",
            "Zoek je een WordPress webdesign bureau dat een site van iemand anders durft over te nemen, dan doen we dat. We vragen wel eerst toegang tot hosting, DNS en het beheerdersaccount, want zonder die drie is elke belofte over planning giswerk.",
          ],
        },
        {
          heading: "Na de lancering: updates die niet blijven liggen",
          body: [
            "WordPress onderhoud is geen extraatje. Core, thema en plug-ins krijgen updates, en een site die een jaar niet is aangeraakt, vind je op een ochtend terug met vreemde links erin. Wij nemen dat over met een vaste formule, of we leren je team hoe het zelf hoort te gebeuren.",
            "Concreet: updates eerst in een testomgeving, back-ups die we ook echt terugzetten om te controleren of ze werken, monitoring op downtime en per kwartaal een blik op snelheid en formulieren. Je krijgt een kort verslag in mensentaal, geen dashboard waar je zelf conclusies uit moet trekken.",
          ],
        },
      ],
      checklist: {
        title: "Wat er in een WordPress project van Brisk zit",
        items: [
          "Een eigen thema op basis van jouw ontwerp, geen gekocht sjabloon",
          "Blokken in de editor die alleen binnen je huisstijl kunnen kleuren",
          "Snelheid, toegankelijkheid en formulieren getest voor de lancering",
          "Meertalig waar nodig, met een eigen URL per taal",
          "Analytics, sitemap en gestructureerde data ingesteld bij oplevering",
          "Overdracht van code, ontwerp, hosting en toegangen",
        ],
      },
      faq: [
        {
          question: "Werken jullie met bestaande WordPress thema's?",
          answer:
            "Nee. Brisk ontwerpt elke site van nul en bouwt dat ontwerp daarna als een eigen WordPress thema, zonder gekocht sjabloon of pagebuilder-pakket. Daardoor draait je site alleen op code die ze echt gebruikt, en kan je in de editor geen pagina's maken die buiten je huisstijl vallen.",
        },
        {
          question: "Kan ik zelf pagina's, teksten en beelden aanpassen?",
          answer:
            "Ja. Je beheert teksten, beelden, pagina's en menu's zelf in WordPress, met blokken die we voor jouw ontwerp hebben gebouwd. Bij de oplevering lopen we het samen door met de mensen die ermee gaan werken, en daarna kan je altijd bij ons terecht met een vraag.",
        },
        {
          question: "Kunnen jullie onze bestaande WordPress website overnemen?",
          answer:
            "Dat kan. We beginnen met een doorlichting van de plug-ins, de snelheid, de beveiliging en de hosting, en zeggen daarna eerlijk of opknappen volstaat of dat herbouwen goedkoper uitkomt op termijn. Voor we een planning geven, hebben we toegang nodig tot hosting, DNS en het beheerdersaccount.",
        },
        {
          question: "Hoe lang duurt het om een WordPress website te laten maken?",
          answer:
            "De doorlooptijd hangt af van het aantal unieke paginatypes, het aantal talen en hoe snel de teksten en beelden klaar zijn. Na de gratis kennismaking van 30 minuten krijg je een voorstel met een planning per fase, en tijdens het project krijg je binnen 24 uur antwoord op je vragen.",
        },
        {
          question: "Wat kost WordPress onderhoud bij Brisk?",
          answer:
            "Dat hangt af van hoeveel we overnemen: alleen updates en back-ups, of ook monitoring, hosting en een vast aantal uren voor kleine aanpassingen. Je krijgt daarvoor een vaste maandprijs in het voorstel, zodat er achteraf geen losse uren op je factuur verschijnen.",
        },
        {
          question: "Van wie is de website na oplevering?",
          answer:
            "Van jou. Het ontwerp, de code van het thema en de content worden bij oplevering jouw eigendom, samen met de toegangen tot hosting en domein. Je kan op elk moment met een ander team verder zonder iets terug te moeten kopen.",
        },
      ],
    },
    en: {
      metaTitle: "WordPress website development",
      metaDescription:
        "Custom WordPress builds that start from a real design, never a marketplace theme. Brisk also takes over and rebuilds sites other agencies left behind.",
      h1: "WordPress website development without a bought theme",
      lead: "Most agencies that offer WordPress website development start from a theme they have used twenty times before. We start from your content and your brand, then build that design as a bespoke theme so the editor only ever offers blocks that belong to you.",
      sections: [
        {
          heading: "Where WordPress earns its place",
          body: [
            "WordPress makes sense when your own people publish: press releases, job openings, case studies, seasonal pages. Editors know it, the talent pool is enormous, and you are never locked to a single supplier. That last point matters to us. A site only its builder can maintain is a bad deal for the client, however elegant the build.",
            "It is the wrong pick when the website is really a thin shell around heavy logic. Role-based portals, pricing engines, integrations moving records all day: those belong in an application, and we will say so before you have signed anything. Brisk builds websites, webshops, software and mobile apps, so nothing pushes us to force one platform onto every brief.",
          ],
        },
        {
          heading: "What custom means on a platform this popular",
          body: [
            "Sequence first: sitemap and copy, then screens, then code. When we build a custom WordPress website, each screen becomes a block with rules attached, so an editor can rearrange a page without breaking the typography, the spacing or the contrast. Freedom where it helps, guard rails where it does not.",
            "The performance argument follows from that. Bought themes ship features for a thousand other companies, and every visitor downloads them anyway. A bespoke theme carries what your pages actually render. We measure Core Web Vitals, keyboard navigation and colour contrast while we build, then again before launch.",
            "Ownership is part of the deal. When you hire us to build a WordPress site, the design, the theme code and the content are yours at handover, along with the hosting and repository credentials. Moving to another team later costs you a conversation, not a licence fee.",
          ],
        },
        {
          heading: "Taking over a site somebody else built",
          body: [
            "Plenty of the work that reaches a WordPress agency is inherited: forty plug-ins, an unrecognisable admin, a homepage that takes several seconds to appear on a phone. We audit before we advise. Plug-in count, page weight, PHP version, security exposure, hosting setup and where the traffic currently lands.",
            "The audit ends in one of two recommendations. Repair, when the foundation is sound and a handful of heavy components are doing the damage. Rebuild, when keeping the old structure alive costs more every quarter than replacing it once. We show the reasoning, including the cheaper option, and you decide.",
            "Either way the existing rankings come with us: URLs mapped, redirects written before launch, structured data preserved. A redesign that quietly loses your best-performing pages is not a redesign, it is a setback with a new colour palette.",
          ],
        },
        {
          heading: "Life after launch",
          body: [
            "WordPress maintenance is the least glamorous part of this page and the part that saves the most money. Core, theme and plug-in updates land constantly, and an untouched site is the one that greets you with injected links one Monday morning.",
            "We run updates on a staging copy first, restore backups periodically to prove they actually work, watch uptime, and review speed and form submissions every quarter. You get a short written summary. If you would rather your own team handled it, we document the routine and train them instead.",
          ],
        },
      ],
      checklist: {
        title: "Included in a WordPress build",
        items: [
          "A bespoke theme built from your design, no marketplace template",
          "Editor blocks that cannot break your brand",
          "Speed, accessibility and forms tested before go-live",
          "Multilingual setup with its own URL per language where needed",
          "Analytics, sitemap and structured data configured at handover",
          "Full transfer of code, design, hosting and credentials",
        ],
      },
      faq: [
        {
          question: "Do you use off-the-shelf WordPress themes?",
          answer:
            "No. Brisk designs every site from scratch and then builds that design as a bespoke WordPress theme, without a marketplace template or a page-builder kit. Your site therefore loads only the code it uses, and editors cannot assemble a page that falls outside the brand.",
        },
        {
          question: "Can our marketing team publish without a developer?",
          answer:
            "Yes. Pages, copy, images, menus and SEO fields are all editable in WordPress through blocks we build for your design. We walk the people who will use it through the admin at handover, and questions afterwards get an answer within 24 hours.",
        },
        {
          question: "Can you take over a WordPress site another agency built?",
          answer:
            "We can, and it is a large share of our WordPress work. We start with an audit of plug-ins, speed, security and hosting, then tell you honestly whether repairing the current site or rebuilding it is the better investment. We need hosting, DNS and admin access before committing to a timeline.",
        },
        {
          question: "How long does a WordPress project take?",
          answer:
            "Timelines follow scope: the number of distinct page templates, the number of languages, the integrations, and how quickly copy and photography are ready. After a free 30-minute intro call you receive a proposal with a phase-by-phase schedule, so the delivery date is agreed before the work starts.",
        },
        {
          question: "What does WordPress maintenance cover?",
          answer:
            "It covers core, theme and plug-in updates on a staging environment first, verified backups, uptime monitoring, security patching and a quarterly review of performance and forms. The scope and a fixed monthly fee are agreed in writing, so nothing appears on your invoice as an unexplained hour.",
        },
        {
          question: "Who owns the website when it is finished?",
          answer:
            "You do. Design files, theme code and content transfer to you at handover, together with hosting and domain access. Continuing with a different team later requires no permission and no buy-out from us.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ *
   * Webflow
   * ------------------------------------------------------------------ */
  "webflow-website-laten-maken": {
    nl: {
      metaTitle: "Webflow website laten maken",
      metaDescription:
        "Een Webflow website vanuit een eigen ontwerp, niet vanuit een cloneable template. Brisk bouwt, migreert en onderhoudt Webflow sites in België en Nederland.",
      h1: "Een Webflow website laten maken die van jou is",
      lead: "Webflow is snel live en fijn in beheer, en precies daarom eindigen er zoveel projecten in hetzelfde uitziende sjabloon. Wij ontwerpen eerst in Figma en bouwen dat daarna pixel voor pixel in Webflow, met een CMS dat is opgezet rond jouw content en niet rond een demo.",
      sections: [
        {
          heading: "Waar Webflow echt sterk in is",
          body: [
            "Webflow is op zijn best voor een merksite met veel visueel karakter: een marketingsite, een portfolio, een productlancering, een site met veel beweging waar je snel wil kunnen bijsturen. Het CMS is eenvoudig genoeg dat een marketeer er zelf een case of een vacature bij zet, en de hosting zit erin.",
            "Voor een team zonder ontwikkelaar in huis is dat een reëel voordeel. Kleine tekstwijzigingen, een nieuw teamlid, een extra klantverhaal: dat gebeurt bij jou, niet in een wachtrij bij ons. Wij komen pas terug in beeld voor iets structureels.",
          ],
        },
        {
          heading: "Hoe wij in Webflow bouwen",
          body: [
            "We starten niet vanaf een cloneable die iemand anders online zette. Het ontwerp komt eerst, met echte teksten en echte beelden, en pas daarna bouwen we in Webflow: een eigen classestructuur, herbruikbare componenten en CMS-collecties die passen bij hoe jouw content in elkaar zit.",
            "Die structuur is het verschil tussen een site die twee jaar meegaat en een site die na drie aanpassingen scheeftrekt. We houden de naamgeving consistent, beperken het aantal uitzonderingen per schermformaat en documenteren wat waar zit, zodat je een Webflow site laten bouwen niet hoeft te herhalen bij de volgende campagne.",
            "Animatie doen we met de hand, in kleine doses. Interacties die iets verduidelijken blijven, interacties die alleen een demo halen laten we vallen. Elke pagina wordt op toetsenbord, contrast en laadtijd getest voor ze live gaat.",
          ],
        },
        {
          heading: "Wanneer we je afraden om Webflow te kiezen",
          body: [
            "Webflow heeft grenzen, en die verzwijgen zou je later geld kosten. Zware koppelingen met een ERP of een boekingssysteem, complexe rollen en rechten, of een catalogus met duizenden producten en filters: dat wordt in Webflow een aaneenschakeling van omwegen. Dan stellen we Next.js met een headless CMS voor.",
            "Ook meertaligheid vraagt een bewuste keuze. Webflow Localization werkt, maar het bepaalt wel hoe je URL's, vertalingen en workflow eruitzien. Als je site in vier talen moet draaien met vier redacties, leggen we beide routes naast elkaar voor je iets tekent.",
            "En het abonnement van Webflow zelf staat los van onze factuur: die betaal je rechtstreeks aan Webflow, per site en per taal die je activeert. Wij zeggen vooraf welk plan je nodig hebt, zodat je niet na de lancering ontdekt dat je een niveau hoger moet.",
          ],
        },
        {
          heading: "Met of zonder ons verder",
          body: [
            "Sommige klanten willen een Webflow developer inhuren voor een paar weken, hun site laten opzetten en het daarna zelf doen. Dat is een prima plan, op voorwaarde dat de basis klopt. We leveren dan op met een korte handleiding en een sessie waarin je team zelf de eerste pagina's maakt terwijl wij meekijken.",
            "Zoek je eerder een Webflow bureau dat blijft: ook goed. Dan doen we de doorontwikkeling per kwartaal, met een lijst die we samen prioriteren. In beide gevallen staat het project op jouw Webflow-account, op jouw naam. Wij worden hoogstens uitgenodigd als medewerker.",
          ],
        },
      ],
      faq: [
        {
          question: "Gebruiken jullie kant-en-klare Webflow templates?",
          answer:
            "Nee. Brisk ontwerpt eerst in Figma en bouwt dat ontwerp daarna in Webflow met een eigen classestructuur en eigen componenten. Je krijgt dus geen site die je elders herkent, en de opbouw is gedocumenteerd zodat je er zelf verder aan kan werken.",
        },
        {
          question: "Kan ik mijn Webflow site zelf beheren na de oplevering?",
          answer:
            "Ja, dat is meestal net de reden om voor Webflow te kiezen. Je beheert pagina's, blogitems, cases en vacatures in de Webflow Editor of het CMS, en bij de oplevering nemen we dat samen door met de mensen die ermee gaan werken.",
        },
        {
          question: "Kunnen jullie een bestaande WordPress site naar Webflow migreren?",
          answer:
            "Dat doen we regelmatig. We zetten de content over, hertekenen waar nodig de structuur en schrijven de redirects zodat je bestaande posities in Google mee verhuizen. Voor sites met zware koppelingen of duizenden producten bespreken we eerst of Webflow wel het juiste eindpunt is.",
        },
        {
          question: "Wat kost een Webflow website?",
          answer:
            "De prijs volgt uit de scope: het aantal unieke paginatypes, de complexiteit van het CMS, het aantal talen en of wij ook de teksten en beelden maken. Na een gratis kennismaking van 30 minuten krijg je een voorstel met een vaste prijs per fase. Het abonnement van Webflow zelf betaal je rechtstreeks aan Webflow.",
        },
        {
          question: "Werken jullie ook aan een Webflow site die al bestaat?",
          answer:
            "Ja. We nemen bestaande projecten over voor een restyling, een snelheidsronde, extra CMS-collecties of een opruiming van de classestructuur. We beginnen dan met een halve dag doorlichten, zodat we weten wat we erven voor we aan iets beginnen.",
        },
      ],
    },
    en: {
      metaTitle: "Webflow website development",
      metaDescription:
        "Webflow sites that start in Figma, not in a cloneable template. Brisk designs, builds and migrates Webflow projects across Belgium and the Netherlands.",
      h1: "Webflow website development, designed before it is built",
      lead: "Webflow rewards teams that want to run their own site. It also makes it very easy to end up with something that looks like every other cloneable on the marketplace. We design the thing first, then rebuild it in Webflow with a class structure and CMS collections shaped around your content.",
      sections: [
        {
          heading: "The kind of project Webflow suits",
          body: [
            "Brand sites, product launches, portfolios, anything where the marketing team wants to move without filing a ticket. Webflow gives editors a safe surface for daily changes and gives designers room for motion that would otherwise need a front-end sprint. Hosting is part of the platform, which removes a whole category of admin.",
            "If nobody in your company writes code, that independence is worth a lot. Adding a case study, swapping a photo, publishing a role: your side. We come back for the structural work, not for a typo on the careers page.",
          ],
        },
        {
          heading: "How we build it",
          body: [
            "No cloneable, no starter kit. Design comes first with real copy and real photography, and only then do we build a Webflow site with a deliberate class naming system, reusable components and collections that mirror how your content is actually organised.",
            "That discipline is what separates a site that survives two years of edits from one that drifts after three campaigns. We keep breakpoint exceptions rare, name things predictably and write down where everything lives, so the next person to open the project is not reverse-engineering somebody's afternoon.",
            "Interactions are hand-built and rationed. Motion that clarifies stays; motion that only impresses in a screen recording does not. Before launch every page gets checked on keyboard navigation, colour contrast and load time.",
          ],
        },
        {
          heading: "The honest limits",
          body: [
            "Webflow stops being the smart answer at a fairly clear line. Deep ERP or booking integrations, permission-based portals, a catalogue with thousands of filtered products: past that point you are paying for workarounds. In those briefs we propose Next.js with a headless CMS and explain the trade-off in plain terms.",
            "Localization is the other decision to make early. Webflow can run several languages, but the way it handles URLs, translation workflow and editor roles is a commitment. With four languages and four editorial teams, we put both routes side by side before anyone starts designing.",
            "Webflow bills you directly for its own plans, per site and per additional locale. That is separate from our invoice, and we tell you which plan the build needs beforehand rather than after you have gone live on the wrong one.",
          ],
        },
        {
          heading: "Working with us, or on your own",
          body: [
            "Some clients want to hire a Webflow developer for a few focused weeks, get the foundation right and then run it themselves. That works. We hand over documentation and spend a session watching your team build the first pages, correcting habits before they set.",
            "Others prefer a Webflow agency that stays. Then we work in quarterly cycles from a shared, prioritised list of improvements. Either way the project lives in your Webflow account under your name; we are a collaborator you can remove, not a landlord.",
          ],
        },
      ],
      faq: [
        {
          question: "Do you start from a Webflow template?",
          answer:
            "No. Every project is designed in Figma first and then built in Webflow with its own class structure and components. The result is not recognisable from another company's site, and the build is documented so your team or another agency can pick it up.",
        },
        {
          question: "Will our team be able to update the site ourselves?",
          answer:
            "Yes, and for most clients that is the reason to choose Webflow. Pages, blog posts, case studies and vacancies are editable in the Webflow Editor and CMS, and we run a hands-on handover session with the people who will actually do the publishing.",
        },
        {
          question: "Can you move our existing site to Webflow?",
          answer:
            "We migrate sites to Webflow regularly, including from WordPress. Content is transferred, the structure is revisited where it needs to be, and redirects are written before launch so existing search rankings follow the move. For catalogue-heavy or integration-heavy sites we first check that Webflow is the right destination at all.",
        },
        {
          question: "What does a Webflow project cost?",
          answer:
            "The number depends on the scope: how many distinct page templates, how complex the CMS needs to be, how many languages, and whether we also produce copy and imagery. After a free 30-minute intro call you receive a proposal with a fixed price per phase. Webflow's own subscription is paid directly to Webflow and sits outside our quote.",
        },
        {
          question: "Do you work on Webflow sites you did not build?",
          answer:
            "Yes. We take over existing projects for restyling, performance work, new CMS collections or a cleanup of a class structure that has grown unmanageable. That always starts with a short audit, so we know what we are inheriting before we promise anything.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ *
   * Redesign
   * ------------------------------------------------------------------ */
  "website-laten-vernieuwen": {
    nl: {
      metaTitle: "Website laten vernieuwen",
      metaDescription:
        "Je website laten vernieuwen zonder posities in Google te verliezen. Brisk meet eerst wat werkt, herontwerpt de structuur en verhuist je content met redirects.",
      h1: "Je website laten vernieuwen zonder opnieuw te beginnen",
      lead: "Een website laten vernieuwen is zelden een kwestie van smaak. Meestal is er iets concreets: mobiel loopt stroef, je aanbod is veranderd, je team kan niets zelf aanpassen, of de site haalt geen bezoekers meer binnen. We beginnen dus niet bij het ontwerp, maar bij de vraag wat er precies stuk is.",
      sections: [
        {
          heading: "Eerst meten, dan tekenen",
          body: [
            "We kijken naar je analytics, je zoekverkeer en je bestaande pagina's voor we ook maar iets hertekenen. Welke pagina's brengen aanvragen op, welke worden nooit bekeken, waar haken mensen af, en welke zoektermen brengen vandaag verkeer binnen. Dat zijn de dingen die je niet ongemerkt mag weggooien.",
            "Die inventaris levert bijna altijd verrassingen op. Een pagina die intern niemand belangrijk vindt, blijkt de helft van het organische verkeer te trekken. Een blogartikel uit 2019 staat bovenaan voor een term die je nu commercieel wil inzetten. Zonder die oefening is een redesign een gok met je beste pagina's als inzet.",
            "Pas daarna praten we over structuur en vorm. Een bestaande website laten verbeteren begint bij navigatie en teksten; kleur en typografie komen erna, niet ervoor.",
          ],
        },
        {
          heading: "Opknappen, herbouwen of ergens tussenin",
          body: [
            "Niet elke site moet naar de schroothoop. Soms is de structuur gezond en zit het probleem in snelheid, in mobiel gedrag of in een CMS waar niemand mee overweg kan. Dan is een website restylen op dezelfde basis sneller en goedkoper, en zit je binnen enkele weken met iets dat weer klopt.",
            "Herbouwen wordt logisch zodra het onderhoud meer tijd kost dan een nieuwe basis, of zodra je iets wil dat er structureel niet in past: meertaligheid, een klantenzone, een koppeling met je backoffice. Een verouderde website vervangen is dan geen luxe maar een besparing die je over twee jaar terugziet.",
            "We zeggen welke van de twee we zouden doen, inclusief de goedkopere optie, en waarom. Je hoeft ons niet te geloven op ons woord: de argumenten staan zwart op wit in het voorstel.",
          ],
        },
        {
          heading: "Je posities in Google verhuizen mee",
          body: [
            "Het grootste risico bij vernieuwen is niet het ontwerp, maar de verhuis. Een website redesign laten uitvoeren zonder plan voor URL's is de snelste manier om jaren opgebouwde vindbaarheid kwijt te spelen op de dag van de lancering.",
            "Daarom maken we voor de lancering een lijst van elke bestaande URL, koppelen die aan zijn nieuwe adres en zetten permanente redirects klaar. Titels, beschrijvingen en gestructureerde data gaan mee. Na de livegang volgen we een aantal weken de indexering en de foutmeldingen op, zodat we een probleem zien voor jij het merkt.",
            "Content die goed presteert, herschrijven we liever dan dat we ze schrappen. Wat we wel schrappen, verdwijnt bewust en met een redirect naar het dichtstbijzijnde alternatief.",
          ],
        },
        {
          heading: "Wat er verandert voor je eigen team",
          body: [
            "Een vernieuwde site die je opnieuw niet zelf kan aanpassen, is een gemiste kans. We bouwen met een CMS waarin je pagina's, teksten, beelden en nieuwsberichten zelf beheert, met blokken die binnen je huisstijl blijven.",
            "Bij de oplevering doen we een sessie met de mensen die het echt gaan gebruiken, niet alleen met de opdrachtgever. Daarna blijven we bereikbaar: je krijgt binnen 24 uur antwoord, ook als de vraag klein is.",
          ],
        },
      ],
      checklist: {
        title: "Wat we nakijken voor we iets weggooien",
        items: [
          "Welke pagina's vandaag verkeer en aanvragen opleveren",
          "Welke zoektermen je site nu al binnenhalen",
          "Welke URL's een redirect nodig hebben en waarheen",
          "Welke koppelingen en formulieren moeten blijven werken",
          "Welke beelden, teksten en documenten mee verhuizen",
          "Welke snelheids- en toegankelijkheidsproblemen we meteen oplossen",
        ],
      },
      faq: [
        {
          question: "Verlies ik mijn plaats in Google als ik mijn website laat vernieuwen?",
          answer:
            "Niet als de verhuis goed wordt voorbereid. Brisk maakt voor de lancering een overzicht van alle bestaande URL's, koppelt elke oude pagina aan haar nieuwe adres met een permanente redirect en behoudt titels, beschrijvingen en gestructureerde data. Na de livegang volgen we de indexering enkele weken op.",
        },
        {
          question: "Kunnen jullie alleen het ontwerp vernieuwen en de rest laten staan?",
          answer:
            "Dat kan, zolang de bestaande basis gezond is. We bekijken eerst hoe de site technisch in elkaar zit en of een restyling op die basis houdbaar blijft. Is dat niet zo, dan zeggen we dat, want een nieuw jasje op een systeem dat kraakt, kost je twee keer geld.",
        },
        {
          question: "Hoe lang duurt het vernieuwen van een website?",
          answer:
            "Dat hangt vooral af van de hoeveelheid bestaande content en het aantal unieke paginatypes. Een compacte site met bestaande teksten is sneller klaar dan een site met honderden pagina's die stuk voor stuk nagekeken moeten worden. Je krijgt een planning per fase in het voorstel.",
        },
        {
          question: "Moet ik nieuwe teksten schrijven voor mijn nieuwe website?",
          answer:
            "Niet noodzakelijk allemaal. We hergebruiken wat aantoonbaar werkt en herschrijven wat verwarrend, verouderd of onvindbaar is. Schrijf je zelf, dan krijg je van ons een overzicht per pagina met de vragen die de tekst moet beantwoorden en de lengte die past in het ontwerp.",
        },
        {
          question: "Werken jullie ook aan sites die iemand anders gebouwd heeft?",
          answer:
            "Ja, dat is een groot deel van dit werk. We beginnen met een doorlichting van de code, de hosting en het CMS, zodat we weten wat we overnemen. Daarna krijg je een eerlijk advies over herstellen of herbouwen, met de kosten en de risico's van beide erbij.",
        },
        {
          question: "Blijft mijn website online tijdens het project?",
          answer:
            "Ja. We bouwen op een aparte omgeving die alleen jij en wij kunnen zien, en je huidige site blijft gewoon draaien tot de nieuwe klaar is. De overschakeling plannen we op een rustig moment, met de redirects en de back-up al klaar.",
        },
      ],
    },
    en: {
      metaTitle: "Website redesign",
      metaDescription:
        "A website redesign that keeps the rankings you already have. Brisk audits what works, rebuilds the structure and maps every URL before launch day.",
      h1: "A website redesign that keeps what already works",
      lead: "Nobody commissions a website redesign because they are bored. Something specific has gone wrong: the site is slow on a phone, the offer has changed, nobody internally can edit a page, or enquiries have quietly dried up. So the first week is spent diagnosing, not decorating.",
      sections: [
        {
          heading: "The audit that comes before any design",
          body: [
            "We read your analytics and search data before we open a design tool. Which pages generate enquiries, which have never been visited, where people drop out of a journey, and which queries currently bring people in. Those pages are assets, and assets do not get deleted because a new layout has no room for them.",
            "This exercise almost always produces a surprise. Some page nobody internally rates turns out to carry a third of your organic traffic. A four-year-old article ranks for a term your sales team now cares about. Skipping this step is how a redesign quietly costs a company its best-performing content.",
          ],
        },
        {
          heading: "Repair or rebuild",
          body: [
            "Not every site needs replacing. If the structure is sound and the trouble is speed, mobile behaviour or an unusable admin, we improve an existing website on its current foundation. That is faster, cheaper and often enough for another two years.",
            "A rebuild becomes the sensible option when maintaining the old codebase costs more each quarter than a new one would, or when you need something the current setup cannot hold: extra languages, a customer area, a link to your back office. We put both options in the proposal, including the one that earns us less.",
          ],
        },
        {
          heading: "Launch day without a traffic cliff",
          body: [
            "The riskiest part of a redesign is the move, not the design. Change every URL without a plan and you can lose years of accumulated visibility in an afternoon, which is a strange price to pay for a nicer typeface.",
            "Before launch we inventory every existing URL, map each one to its new address and prepare permanent redirects. Page titles, meta descriptions and structured data travel with them. For the first weeks after go-live we watch indexing and crawl errors, so problems surface on our side rather than in your sales figures.",
            "Content that performs gets rewritten rather than removed. Anything we do retire disappears deliberately, with a redirect to the closest useful page instead of a dead end.",
          ],
        },
        {
          heading: "What changes for the people who use it daily",
          body: [
            "A website refresh that leaves your team dependent on an agency for every comma has solved half the problem. The new site comes with a CMS where pages, copy, images and news are yours to manage, inside blocks that keep the design intact whatever you type.",
            "Handover is a working session with the people who will publish, not a slide deck for the person who signed. After that you keep a direct line to us, with a reply within 24 hours however small the question.",
          ],
        },
      ],
      checklist: {
        title: "Checked before anything is thrown away",
        items: [
          "Which pages currently earn traffic and enquiries",
          "Which search queries the site already ranks for",
          "Which URLs need a redirect, and to where",
          "Which forms and integrations must keep working",
          "Which images, documents and downloads move across",
          "Which speed and accessibility problems get fixed on the way",
        ],
      },
      faq: [
        {
          question: "Will a redesign hurt our search rankings?",
          answer:
            "Not when the migration is planned properly. Brisk inventories every existing URL, maps each to its new address with a permanent redirect and carries over titles, descriptions and structured data. Indexing and crawl errors are monitored for several weeks after launch so anything unexpected is caught early.",
        },
        {
          question: "Can you redesign an existing website without rebuilding it?",
          answer:
            "Often, yes. If the underlying structure is healthy, restyling on the current foundation is quicker and cheaper than starting over. We check the code, hosting and CMS first and tell you plainly if a fresh coat of paint on a failing system would waste your budget.",
        },
        {
          question: "How long does a redesign take?",
          answer:
            "Mostly it depends on how much existing content there is and how many distinct page templates the new site needs. A compact site with usable copy moves fast; several hundred pages that each need review takes longer. The proposal sets out a schedule per phase before we start.",
        },
        {
          question: "Do we need entirely new copy?",
          answer:
            "Rarely all of it. We keep what demonstrably works and rewrite what is outdated, confusing or invisible in search. If you write it yourselves, you get a brief per page listing the questions that page must answer and the length that fits the design.",
        },
        {
          question: "Do you work on sites built by another agency?",
          answer:
            "Yes, most redesigns are exactly that. We begin with an audit of the code, hosting and CMS so we know what we are inheriting, then give you a straight recommendation on repairing versus rebuilding, with the cost and risk of each.",
        },
        {
          question: "Does our current site stay online during the project?",
          answer:
            "It does. The new site is built on a separate environment only you and we can see, while the live site keeps running. The switch is scheduled for a quiet moment with redirects and a full backup already in place.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ *
   * Landing page
   * ------------------------------------------------------------------ */
  "landingspagina-laten-maken": {
    nl: {
      metaTitle: "Landingspagina laten maken",
      metaDescription:
        "Een landingspagina laten maken die één ding vraagt en dat ook goed doet. Brisk ontwerpt en bouwt campagnepagina's die snel laden en meetbaar zijn.",
      h1: "Een landingspagina laten maken die één ding vraagt",
      lead: "Een landingspagina is geen kleine website. Ze bestaat om één beslissing makkelijk te maken: een demo aanvragen, inschrijven, bellen, een offerte opvragen. Alles wat die beslissing niet dient, hoort er niet op. Daarom ontwerpen we een campagnepagina anders dan een homepage.",
      sections: [
        {
          heading: "Eén doel, of het is geen landingspagina",
          body: [
            "De meest voorkomende fout is een pagina die drie dingen tegelijk wil: informeren, overtuigen en ook nog even de rest van het bedrijf tonen. Bezoekers die vanuit een advertentie of een mail binnenkomen, hebben één vraag in hun hoofd. Wij bouwen de pagina rond die vraag en halen de rest eruit, inclusief de volledige navigatie als dat helpt.",
            "Voor we iets tekenen, spreken we af wat de pagina moet opleveren en hoe we dat gaan tellen. Aanvragen, inschrijvingen, gesprekken. Zonder die afspraak is achteraf niet te zeggen of de pagina werkt, en dan wordt het gesprek een smaakdiscussie.",
          ],
        },
        {
          heading: "De opbouw die we gebruiken",
          body: [
            "Bovenaan staat wat je aanbiedt, voor wie het is en wat de volgende stap is, in taal die aansluit bij de advertentie of de mail waar de bezoeker vandaan komt. Klikt iemand op een belofte en leest hij bovenaan iets anders, dan is hij weg voor de rest van de pagina geladen is.",
            "Daaronder werken we in blokken: het concrete aanbod, het bewijs (referenties, cijfers die kloppen, echte namen), de bezwaren die je verkopers elke week horen, en dan pas het formulier. Elk blok mag maar één ding doen. De knop met de actie komt een paar keer terug, want mensen beslissen op verschillende hoogtes van de pagina.",
            "Het formulier houden we kort. Elke extra verplichte vraag is een reden om af te haken; wat je toch achteraf in een gesprek vraagt, hoeft niet in het formulier. Een conversiepagina laten maken is voor de helft schrapwerk.",
          ],
        },
        {
          heading: "Snel geladen en netjes gemeten",
          body: [
            "Campagneverkeer komt bijna altijd van mobiel, vaak op een matige verbinding. Een pagina die traag laadt, verliest bezoekers waarvoor je per klik betaald hebt. Wij bouwen de pagina licht, met beelden in moderne formaten, en testen laadtijd en interactie voor ze live gaat.",
            "Meten regelen we mee: doelen in je analytics, events op de knoppen en het formulier, en waar nodig een koppeling naar je CRM of mailtool zodat een aanvraag meteen op de juiste plek terechtkomt. Cookies en toestemming zetten we correct op, ook als dat betekent dat sommige scripts pas na een klik laden.",
            "Wat we niet doen, is beloven hoeveel meer je gaat verkopen. Dat weet niemand vooraf. Wat we wel kunnen, is de pagina zo bouwen dat je na twee weken weet wat er gebeurt en waar het misloopt.",
          ],
        },
        {
          heading: "Snel live, en daarna bijsturen",
          body: [
            "Een campagnepagina laten maken gaat sneller dan een volledige site bouwen: de scope is kleiner en de beslissingen zijn scherper. Een landingspagina laten bouwen duurt daardoor meestal weken, geen maanden. Vaak leveren we een eerste versie op terwijl de campagne al in voorbereiding is, en verfijnen we daarna op basis van wat de cijfers tonen.",
            "Draai je meerdere campagnes, dan bouwen we de pagina als een sjabloon in je CMS: dezelfde structuur, andere kop, ander beeld, andere doelgroep. Zo kan je zelf een nieuwe versie maken voor de volgende actie zonder ons erbij te halen.",
          ],
        },
      ],
      checklist: {
        title: "Wat er in een campagnepagina zit",
        items: [
          "Eén duidelijk doel en een afspraak over hoe we het tellen",
          "Een kop die aansluit op de advertentie of mail erachter",
          "Bewijs met echte namen en cijfers die kloppen",
          "Een kort formulier, gekoppeld aan je CRM of mailtool",
          "Snelheidstest op mobiel voor de lancering",
          "Events en doelen in analytics, met correcte toestemming",
        ],
      },
      faq: [
        {
          question: "Wat is het verschil tussen een landingspagina en een gewone webpagina?",
          answer:
            "Een landingspagina bestaat voor één actie en is gebouwd rond het verkeer van één campagne, waardoor afleiding zoals volledige navigatie er bewust af blijft. Een gewone webpagina hoort thuis in de structuur van je site en moet meerdere soorten bezoekers bedienen. Ze vragen dus een andere opbouw en een andere tekst.",
        },
        {
          question: "Kan een landingspagina los van mijn bestaande website staan?",
          answer:
            "Ja. We kunnen de pagina toevoegen aan je huidige site of ze apart plaatsen op een eigen adres of subdomein. Wat het beste werkt hangt af van je CMS, je campagne en of je de pagina later zelf wil kunnen dupliceren.",
        },
        {
          question: "Schrijven jullie ook de teksten voor de pagina?",
          answer:
            "Dat kan. We schrijven de pagina samen met jou op basis van wat je verkopers dagelijks horen, of we leveren een structuur met per blok de vraag die de tekst moet beantwoorden zodat je zelf kan schrijven. Beide staan als aparte posten in het voorstel.",
        },
        {
          question: "Hoe snel kan een landingspagina live staan?",
          answer:
            "Een campagnepagina is een kleiner project dan een volledige website, dus de doorlooptijd is korter. De planning hangt vooral af van hoe snel de teksten, beelden en toegangen klaar zijn. Na de gratis kennismaking van 30 minuten krijg je een concrete datum in het voorstel.",
        },
        {
          question: "Kunnen jullie meerdere varianten van dezelfde pagina maken?",
          answer:
            "Ja. We bouwen de pagina als sjabloon in je CMS, zodat je per doelgroep of per campagne een variant kan maken met een andere kop, een ander beeld en een ander aanbod. Als je varianten tegen elkaar wil testen, zetten we de meting daarvoor mee op.",
        },
      ],
    },
    en: {
      metaTitle: "Landing page development",
      metaDescription:
        "Landing page development built around one action: fast, measurable and matched to the campaign that feeds it. Brisk designs, builds and measures it.",
      h1: "Landing page development for one decision at a time",
      lead: "A landing page is not a small website. It exists so that one decision becomes easy to make, and everything that does not serve that decision is a distraction you paid for. That constraint changes how the page is written, designed and measured.",
      sections: [
        {
          heading: "Decide what the page is for before anyone designs it",
          body: [
            "The usual failure is a page trying to inform, persuade and give a company tour at once. Someone arriving from an ad or an email holds a single question. We build around that question and cut the rest, often including the site navigation, because every extra route off the page is a route away from it.",
            "We also agree, before design starts, what counts as success and how it will be counted: booked calls, sign-ups, quote requests, downloads. Without that agreement, the review meeting after launch turns into a debate about taste rather than about numbers.",
          ],
        },
        {
          heading: "The shape of the page",
          body: [
            "The top of the page states the offer, who it is for and what happens next, using the same language as the ad or email that sent the visitor. A promise in the ad and a different message on arrival is the fastest way to lose someone who was already interested.",
            "Below that, blocks with one job each: the offer in concrete terms, proof with real names and honest numbers, the objections your sales team hears every week, then the form. The call to action repeats a few times, because people commit at different depths of a page.",
            "Forms stay short. Every extra required field is another reason to leave, and anything you will ask in the follow-up call does not need asking twice. Building a conversion page is as much deleting as it is designing.",
          ],
        },
        {
          heading: "Fast on a phone, and properly instrumented",
          body: [
            "Campaign traffic arrives on mobile, often on an unreliable connection, and a slow page burns budget you have already spent per click. We keep the build light, serve images in modern formats and test load time and interaction before the campaign goes live.",
            "Measurement ships with the page: goals in your analytics, events on the buttons and form, and an integration into your CRM or mailing tool where one is needed so a lead lands somewhere a human will see it. Consent is handled correctly, even when that means some scripts only load after a click.",
            "What we will not do is promise a conversion figure. Nobody can know that in advance. What we can promise is that two weeks in you will know exactly where people are leaving and what to change.",
          ],
        },
        {
          heading: "Launch quickly, then adjust",
          body: [
            "Because the scope is deliberately narrow, it takes far less time to build a landing page than to build a full site. Often a first version is live while the campaign is still being set up, and refinements follow once real traffic shows which section people stop reading.",
            "If you run campaigns regularly, we build the page as a reusable template in your CMS. Same structure, new headline, new imagery, new audience. Your team can spin up the next campaign page without booking us at all.",
          ],
        },
      ],
      checklist: {
        title: "What a campaign page includes",
        items: [
          "One defined goal and an agreed way of counting it",
          "A headline that matches the ad or email behind it",
          "Proof with real names and numbers we can stand behind",
          "A short form wired into your CRM or mailing tool",
          "A mobile speed check before the campaign starts",
          "Analytics events and goals, with consent handled correctly",
        ],
      },
      faq: [
        {
          question: "How is a landing page different from a normal web page?",
          answer:
            "A landing page serves the traffic of one campaign and is built around a single action, which is why distractions such as full navigation are deliberately left off. A normal web page belongs to the site structure and has to serve several kinds of visitor at once. The writing, the layout and the measurement all differ as a result.",
        },
        {
          question: "Can the page live separately from our main website?",
          answer:
            "Yes. We can add it to your existing site or publish it on its own address or subdomain. The right choice depends on your CMS, on how the campaign is tracked and on whether you want to duplicate the page yourself later.",
        },
        {
          question: "Do you write the copy as well?",
          answer:
            "We can. Either we write the page with you, based on what your sales team hears from real prospects, or we deliver the structure with a brief per block stating the question that block must answer so your own writer can fill it in. Both options appear as separate lines in the proposal.",
        },
        {
          question: "How quickly can a landing page go live?",
          answer:
            "It is a much smaller project than a full website, so the timeline is short. The pace usually depends on how fast copy, imagery and access to your analytics and CRM are available. You get a concrete date in the proposal after the free 30-minute intro call.",
        },
        {
          question: "Can you build several versions of the same page?",
          answer:
            "Yes. The page is built as a template in your CMS so you can create a variant per audience or per campaign with a different headline, image and offer. If you want to test variants against each other, we set up the measurement for that at the same time.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ *
   * Multilingual
   * ------------------------------------------------------------------ */
  "meertalige-website-laten-maken": {
    nl: {
      metaTitle: "Meertalige website laten maken",
      metaDescription:
        "Een meertalige website laten maken met eigen URL's per taal, correcte hreflang en een CMS waarin vertalen werkbaar blijft. Brisk bouwt voor België en Nederland.",
      h1: "Een meertalige website laten maken die in elke taal klopt",
      lead: "In België is meertaligheid geen extraatje. Nederlands, Frans en Engels naast elkaar, soms Duits erbij, en elke taal heeft haar eigen publiek en haar eigen toon. Een vertaalknop bovenaan lost dat niet op. Wat wel werkt: één structuur, eigen adressen per taal en een redactieproces dat je volhoudt.",
      sections: [
        {
          heading: "Vertalen is niet hetzelfde als kopiëren",
          body: [
            "Een website in meerdere talen is meer dan dezelfde teksten in een andere taal. Zoekgedrag verschilt per taal: je Franstalige klanten typen andere woorden dan je Nederlandstalige, en die woorden bepalen je koppen, je paginanamen en je URL's. Letterlijk vertalen levert pagina's op die nergens op scoren.",
            "Ook de lengte verschilt. Frans en Duits lopen doorgaans langer dan Nederlands, Engels korter. Wij ontwerpen daarom met de langste taal in het achterhoofd, zodat een knop of een menu-item niet breekt zodra de vertaling binnenkomt.",
            "En dan is er toon. Een tweetalige website laten maken voor een publiek in Vlaanderen en Wallonië betekent soms twee keer schrijven in plaats van één keer vertalen. We zeggen vooraf welke pagina's dat verdienen en welke perfect kunnen met een goede vertaling.",
          ],
        },
        {
          heading: "De techniek die je niet mag verknoeien",
          body: [
            "Elke taal krijgt een eigen, leesbaar adres. Geen parameters achter een vraagteken en geen automatische omleiding op basis van het land van je bezoeker, want daarmee sluit je zoekmachines en tweetalige gebruikers buiten. Iemand die in Brussel de Nederlandstalige versie wil, moet die kunnen bereiken en kunnen delen.",
            "Hreflang correct instellen kost een halve dag denkwerk en bespaart je maanden van pagina's die elkaar in de weg zitten. Elke pagina verwijst naar haar tegenhangers in de andere talen, inclusief zichzelf, en de taalcodes kloppen ook voor regionale varianten. In het CMS hangen we dat aan de pagina, zodat er niets vergeten wordt bij de volgende publicatie.",
            "Verder: sitemaps per taal, vertaalde meta-informatie, formulieren en foutmeldingen in de juiste taal, en datums, valuta en adressen in het formaat dat de lezer verwacht. Dat laatste is precies het soort detail dat vertrouwen kost als het misgaat.",
          ],
        },
        {
          heading: "Vertalingen beheren zonder dat het vastloopt",
          body: [
            "Het CMS is waar meertalige projecten in de praktijk sneuvelen. We zetten het zo op dat elke pagina haar vertalingen naast zich heeft: je ziet wat vertaald is, wat achterloopt en wat nog niet bestaat. Een taal toevoegen betekent later geen herbouw, alleen extra content.",
            "Je kiest zelf wie vertaalt. Je eigen mensen, een vertaalbureau, of een eerste versie via een vertaalmachine die daarna wordt nagelezen. Wij zorgen dat de export en import van teksten werkt, zodat je vertaler niet in een beheerscherm moet werken waar hij nooit thuis is.",
            "Niet alles hoeft in elke taal te bestaan. Een internationale website laten bouwen betekent vaak: alles in het Engels, je kernpagina's in het Nederlands en het Frans, en je nieuws alleen in de taal waarin het geschreven is. Dat is een keuze, en het CMS moet die keuze aankunnen.",
          ],
        },
      ],
      checklist: {
        title: "Wat we opzetten bij een meertalig project",
        items: [
          "Een eigen URL per taal, met vertaalde paginanamen",
          "Correcte hreflang-verwijzingen, ook naar de eigen taal",
          "Een taalkiezer die de bezoeker zelf bedient",
          "Sitemaps, titels en beschrijvingen per taal",
          "Formulieren, foutmeldingen en bevestigingsmails in de juiste taal",
          "Een CMS-overzicht van wat vertaald is en wat nog niet",
        ],
      },
      faq: [
        {
          question: "Hoeveel talen kan een website aan?",
          answer:
            "Technisch is er geen grens: de structuur die we opzetten werkt voor twee talen even goed als voor zes. De echte beperking is redactioneel, want elke taal moet onderhouden worden door iemand die ze schrijft en nakijkt. Daarom starten veel klanten met twee of drie talen en breiden ze later uit.",
        },
        {
          question: "Kan ik later een taal toevoegen zonder de site te herbouwen?",
          answer:
            "Ja, als het CMS vanaf het begin meertalig is opgezet. Dan is een taal toevoegen een kwestie van content aanleveren en de taalkiezer uitbreiden, zonder aan het ontwerp of de code te raken. Daarom vragen we bij de start altijd welke talen je binnen twee jaar verwacht.",
        },
        {
          question: "Wat is hreflang en heb ik het nodig?",
          answer:
            "Hreflang is een verwijzing in de code waarmee je zoekmachines vertelt welke pagina's elkaars vertaling zijn. Zonder die verwijzing kunnen je Nederlandstalige en Franstalige pagina's elkaar beconcurreren of aan de verkeerde bezoeker getoond worden. Bij elke meertalige site die Brisk bouwt, zit dat standaard in de opzet.",
        },
        {
          question: "Moeten jullie de vertalingen leveren?",
          answer:
            "Dat hoeft niet. Veel klanten vertalen intern of via hun vaste vertaalbureau, en wij zorgen dat teksten netjes in en uit het CMS kunnen zonder opmaak te verliezen. Wil je dat wij de vertalingen coördineren, dan zetten we dat als een aparte post in het voorstel.",
        },
        {
          question: "Wordt mijn bezoeker automatisch naar zijn taal gestuurd?",
          answer:
            "We raden een harde automatische omleiding af, omdat ze zoekmachines hindert en tweetalige bezoekers frustreert. In plaats daarvan tonen we een duidelijke taalkiezer en onthouden we de keuze van de bezoeker, zodat iedereen elke taalversie kan bereiken en delen.",
        },
      ],
    },
    en: {
      metaTitle: "Multilingual website development",
      metaDescription:
        "Multilingual website development with a URL per language, correct hreflang and a CMS translators can live with. Brisk builds for Belgian and Dutch audiences.",
      h1: "Multilingual website development that holds up in every language",
      lead: "Working from Belgium, we treat several languages as the normal case rather than an add-on. Dutch, French and English side by side, sometimes German too, each with its own audience and its own search behaviour. A translate button at the top of the page does not solve any of that.",
      sections: [
        {
          heading: "Translation is the smallest part of the job",
          body: [
            "Running a website in multiple languages means accepting that people search differently in each of them. Your French-speaking customers type words with no direct Dutch equivalent, and those words shape your headings, your page names and your URLs. A word-for-word translation produces pages that read fine and rank nowhere.",
            "Layout gets tested by language too. French and German usually run longer than English, Dutch sits somewhere in between, and a button designed around the shortest option breaks the moment the translation arrives. We design against the longest language and check every screen once real translations are in.",
            "Tone is the third variable. A bilingual website aimed at Flanders and Wallonia sometimes needs writing twice rather than translating once. We say up front which pages deserve that treatment and which are perfectly served by a good translator.",
          ],
        },
        {
          heading: "The technical parts that are easy to get wrong",
          body: [
            "Every language gets a clean, readable URL of its own. No query parameters, and no forced redirect based on the visitor's country, which locks out search engines and irritates anyone who lives between two languages. Someone in Brussels who wants the Dutch page should be able to reach it and send the link to a colleague.",
            "A correct hreflang setup takes an afternoon to reason through and saves months of pages competing with each other. Each page points at its counterparts, including itself, with language codes that are also right for regional variants. We attach it to the page in the CMS so nobody has to remember it at publishing time.",
            "Then the quieter details: a sitemap per language, translated meta information, forms and error messages in the right language, and dates, currencies and addresses formatted the way the reader expects. Getting those wrong is not fatal, but it does tell a visitor the site was not really built for them.",
          ],
        },
        {
          heading: "Keeping translation manageable",
          body: [
            "Most multilingual projects fail in the editing interface rather than the code. We set the CMS up so every page shows its translations beside it: what exists, what is out of date and what has never been written. Adding a language later is content work, not a rebuild.",
            "You choose who translates. Internal staff, an agency you already trust, or machine translation with a human editing pass. Our job is making sure copy moves in and out cleanly, so a translator never has to work inside an admin panel they have never seen.",
            "Not everything needs to exist everywhere. For an international website, plenty of clients run everything in English, keep core commercial pages in Dutch and French, and publish news only in the language it was written in. That is a legitimate strategy, and the CMS has to support it without complaint.",
          ],
        },
      ],
      checklist: {
        title: "Set up on every multilingual build",
        items: [
          "A dedicated URL per language, with translated page names",
          "Correct hreflang references, self-referencing included",
          "A language switcher the visitor controls",
          "Sitemaps, titles and descriptions per language",
          "Forms, error messages and confirmation emails in the right language",
          "A CMS view of what is translated and what is still missing",
        ],
      },
      faq: [
        {
          question: "How many languages can the site handle?",
          answer:
            "There is no technical ceiling: the structure we build works the same for two languages as for six. The real limit is editorial, since each language needs someone to write and review it. Many clients start with two or three and expand once the routine is proven.",
        },
        {
          question: "Can we add a language later without rebuilding?",
          answer:
            "Yes, provided the CMS is multilingual from day one. Adding a language then means supplying content and extending the language switcher, with no changes to the design or the code. That is why we always ask at the start which languages you expect to need within a couple of years.",
        },
        {
          question: "What is hreflang and does our site need it?",
          answer:
            "Hreflang is markup that tells search engines which pages are translations of one another. Without it, your Dutch and French pages can compete with each other or be shown to the wrong audience. Every multilingual site Brisk builds includes it as standard, maintained from the CMS rather than by hand.",
        },
        {
          question: "Do you supply the translations?",
          answer:
            "Not necessarily. Many clients translate in house or through the agency they already use, and we make sure text moves in and out of the CMS without losing formatting. If you would rather we coordinate translation, it goes into the proposal as a separate line item.",
        },
        {
          question: "Are visitors redirected to their own language automatically?",
          answer:
            "We advise against a hard automatic redirect, because it blocks search engines and frustrates bilingual visitors. Instead the site shows a clear language switcher and remembers the choice, so every version stays reachable and shareable by anyone.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ *
   * Web design agency
   * ------------------------------------------------------------------ */
  "webdesign-bureau": {
    nl: {
      metaTitle: "Webdesign bureau in België",
      metaDescription:
        "Ontwerp en development onder één dak, vanuit België: 150+ projecten in 17+ jaar. Je website laten ontwerpen begint bij een gesprek van 30 minuten.",
      h1: "Een webdesign bureau dat ook zelf bouwt",
      lead: "Brisk is een webdesign bureau uit België dat websites, webshops, software en mobiele apps ontwerpt en bouwt. In 17+ jaar leverden we meer dan 150 projecten op, voor eenmanszaken en voor organisaties als NMBS, De Watergroep, IDEWE en museumPASSmusées. Ontwerp en development zitten bij ons in hetzelfde team.",
      sections: [
        {
          heading: "Ontwerp en bouw horen bij elkaar",
          body: [
            "Als het ontwerp bij het ene bureau ligt en de bouw bij het andere, gaat de rekening naar de klant. Details sneuvelen in de overdracht, en niemand voelt zich verantwoordelijk voor het resultaat op een echte telefoon. Bij ons tekent en bouwt hetzelfde team, dus wat op scherm staat is wat we ook kunnen waarmaken in code.",
            "Dat merk je in kleine dingen: animaties die niet stotteren, contrast dat ook op een laptop in de zon werkt, formulieren die bruikbaar zijn met een toetsenbord. Professioneel webdesign is voor het grootste deel een optelsom van dat soort beslissingen, niet één spectaculair beeld.",
            "Ons werk staat live: een selectie van 17 klantsites en meer dan 50 productschermen op deze site. Dat is een greep uit het werk, niet het volledige archief, maar het geeft je een eerlijk beeld van wat je krijgt.",
          ],
        },
        {
          heading: "Hoe een ontwerp bij ons ontstaat",
          body: [
            "We beginnen bij structuur en tekst. Wie komt er op deze pagina, wat wil die persoon weten, en wat moet er daarna gebeuren. Pas als die volgorde klopt, zetten we er vorm op. Een site laten ontwerpen op basis van mooie schermen zonder inhoud levert altijd hetzelfde probleem op: teksten die achteraf niet passen.",
            "Daarna krijg je een klikbaar prototype in plaats van een reeks afbeeldingen. Je klikt door je eigen site, op je eigen telefoon, voor er één regel code geschreven is. Dat is het moment om structuur en toon bij te sturen, en dat is veel goedkoper dan het achteraf doen.",
            "In de bouw houden we ons aan wat er getekend is. We werken met Next.js en een headless CMS of, waar dat beter past, met WordPress of Webflow. Het platform kiezen we op basis van wie de site gaat beheren en wat ze moet kunnen, niet op basis van gewoonte.",
          ],
        },
        {
          heading: "Bureau, freelancer of intern team",
          body: [
            "Een webdesigner inhuren voor een korte opdracht kan een prima keuze zijn: een campagnebeeld, een reeks schermen, een tweede paar handen naast je eigen team. Voor een volledige website heb je meestal meer nodig dan één discipline, want ontwerp, techniek, teksten en SEO grijpen constant in elkaar.",
            "Wij zijn interessant wanneer je één aanspreekpunt wil voor het geheel en iemand die na de lancering nog bereikbaar is. Je krijgt binnen 24 uur antwoord en je kan altijd starten met een gratis kennismaking van 30 minuten, ook als je nog niet zeker weet of je een nieuw project wil beginnen.",
            "Heb je al een intern team, dan werken we daar gewoon naast. Soms nemen we alleen het ontwerp, soms alleen de bouw, soms een deel dat blijft liggen omdat niemand er tijd voor vindt.",
          ],
        },
        {
          heading: "Wat je overhoudt na het project",
          body: [
            "Een website laten maken met CMS betekent dat je eigen mensen pagina's, teksten en beelden beheren zonder ons. We bouwen de beheeromgeving rond jouw manier van werken en geven bij de oplevering een sessie aan wie ermee gaat werken.",
            "Ontwerp en code zijn van jou. Geen licentie op je eigen site, geen constructie waarbij je bij ons moet blijven om online te blijven. Dat is niet genereus bedoeld, het is gewoon de enige manier waarop een klant vrij kan kiezen om te blijven.",
          ],
        },
      ],
      faq: [
        {
          question: "Wat doet een webdesign bureau precies?",
          answer:
            "Een webdesign bureau ontwerpt de structuur, de teksten en het visuele uitzicht van een website en zorgt dat het resultaat werkt op elk scherm. Bij Brisk hoort daar ook de bouw, de SEO-opzet en de oplevering met een CMS bij, zodat er geen overdracht tussen twee partijen nodig is.",
        },
        {
          question: "Werken jullie alleen voor grote organisaties?",
          answer:
            "Nee. Onze klantenlijst loopt van eenmanszaken en kmo's tot organisaties als NMBS, De Watergroep en IDEWE, en internationale merken als BMW, Nike en OpenAI. De aanpak is dezelfde, alleen de omvang van het project verschilt.",
        },
        {
          question: "Kan ik mijn website laten ontwerpen zonder ze door jullie te laten bouwen?",
          answer:
            "Dat kan. Je krijgt dan het volledige ontwerp met een klikbaar prototype en de bestanden, klaar om door je eigen team of een andere partij gebouwd te worden. We spreken vooraf af hoe gedetailleerd de overdracht moet zijn, zodat de bouwer niets hoeft te raden.",
        },
        {
          question: "Met welke technologie bouwen jullie?",
          answer:
            "Standaard bouwen we met Next.js en een headless CMS, omdat dat snel, veilig en makkelijk uit te breiden is. Waar het CMS belangrijker is dan de techniek, bouwen we op WordPress of Webflow. Welk platform het wordt, beslissen we samen in de eerste week op basis van wie de site gaat beheren.",
        },
        {
          question: "Waar werken jullie?",
          answer:
            "Brisk zit in België en werkt voor klanten in heel België en Nederland. Het meeste overleg gebeurt online, en voor projecten waarin het helpt, komen we langs. Je eerste gesprek van 30 minuten is gratis en verplicht je tot niets.",
        },
        {
          question: "Hoe snel krijg ik antwoord op een aanvraag?",
          answer:
            "Je krijgt binnen 24 uur antwoord op je bericht, ook als het antwoord is dat we eerst iets moeten uitzoeken. Na een gesprek van 30 minuten volgt een voorstel met scope, planning en een vaste prijs per fase.",
        },
      ],
    },
    en: {
      metaTitle: "Web design agency in Belgium",
      metaDescription:
        "Brisk is a Belgian web design agency that designs and builds in one team: 150+ projects in 17+ years, for one-person firms and for NMBS, IDEWE, BMW and Nike.",
      h1: "A web design agency that writes the code too",
      lead: "Brisk designs and builds websites, webshops, software and mobile apps from Belgium. Over 17+ years that has added up to more than 150 delivered projects, for local businesses and for organisations including NMBS, De Watergroep, IDEWE, the Belgian FA, museumPASSmusées, BMW, Nike and OpenAI.",
      sections: [
        {
          heading: "One team from sketch to launch",
          body: [
            "Split design and development across two suppliers and the client pays for the seam. Detail gets lost in handover, and when something feels wrong on an actual phone, each side can point at the other. Here the people drawing the screens sit with the people building them, so what gets approved is what gets shipped.",
            "You notice it in unglamorous places: animation that does not stutter on a mid-range Android, contrast that survives a sunny terrace, forms that work with a keyboard and a screen reader. Professional web design is mostly the accumulation of those decisions rather than one striking image.",
            "The proof is public. A selection of 17 client sites is live on this site, alongside more than 50 product design screens. It is a sample rather than the full archive, but it shows the standard rather than describing it.",
          ],
        },
        {
          heading: "How a design happens here",
          body: [
            "Structure and words first. Who arrives on this page, what do they need to know, what should happen next. Only when that sequence holds up do we give it a visual form. Designing beautiful screens around placeholder text guarantees the same outcome every time: real copy that no longer fits.",
            "Then you get a clickable prototype rather than a stack of images. You navigate your own site on your own phone before a line of production code exists, which is the cheapest possible moment to change your mind about structure or tone.",
            "Build follows the drawing. Our default is Next.js with a headless CMS; where the editing experience matters more than the stack, we build on WordPress or Webflow instead. The platform is chosen around who will run the site, not around what we feel like using.",
          ],
        },
        {
          heading: "Agency, freelancer or in-house",
          body: [
            "It is often right to hire a web designer for one bounded piece of work: a campaign visual, a set of screens, extra capacity beside your own team. A full website usually needs more than one discipline, because design, engineering, copy and search visibility keep colliding with each other.",
            "We are the better fit when you want one accountable party for the whole thing and someone still reachable a year after launch. Every message gets a reply within 24 hours, and the first 30-minute call is free even if you are only weighing up whether to start at all.",
            "If you already have an internal team, we work alongside it. Sometimes we only design, sometimes we only build, sometimes we take the piece that has been sitting on the backlog because nobody has the hours.",
          ],
        },
        {
          heading: "What you keep afterwards",
          body: [
            "A website with a CMS should mean your own people publish without booking an agency. We shape the editing environment around how your team actually works, then run a hands-on session at handover with the people who will use it every week.",
            "The design files and the code are yours. No licence on your own website, no arrangement where leaving us means starting over. That is not generosity; it is the only version of the relationship where staying is a choice.",
          ],
        },
      ],
      faq: [
        {
          question: "What does a web design agency actually do?",
          answer:
            "A web design agency shapes the structure, the copy and the visual design of a website and makes sure the result works on every screen. At Brisk that also includes the build, the technical SEO setup and a CMS handover, so no work is lost between two separate suppliers.",
        },
        {
          question: "Do you only take on large organisations?",
          answer:
            "No. The client list runs from one-person companies and small businesses through to NMBS, De Watergroep, IDEWE and international brands such as BMW, Nike and OpenAI. The method is the same in every case; only the scope of the project differs.",
        },
        {
          question: "Can you design a site that someone else will build?",
          answer:
            "Yes. You receive the full design with a clickable prototype and the source files, ready for your own developers or another supplier. We agree in advance how detailed the handover documentation needs to be so the team building it never has to guess.",
        },
        {
          question: "Which technology do you build on?",
          answer:
            "By default Next.js with a headless CMS, because it is fast, secure and straightforward to extend. Where the editing experience matters more than the architecture, we build on WordPress or Webflow. The decision is made together in the first week, based on who will maintain the site.",
        },
        {
          question: "Where are you based and who do you work with?",
          answer:
            "Brisk is based in Belgium and works with clients across Belgium and the Netherlands. Most collaboration happens online, and we travel for the moments when being in the room helps. The first 30-minute conversation is free and commits you to nothing.",
        },
        {
          question: "How quickly do you respond to an enquiry?",
          answer:
            "You get a reply within 24 hours, even when the reply is that we need to look into something first. After a 30-minute call you receive a proposal covering scope, schedule and a fixed price per phase.",
        },
      ],
    },
  },

  /* ------------------------------------------------------------------ *
   * Pricing
   * ------------------------------------------------------------------ */
  "website-laten-maken-kosten": {
    nl: {
      metaTitle: "Website laten maken: kosten en offerte",
      metaDescription:
        "Wat bepaalt de prijs van een website? Scope, paginatypes, CMS, koppelingen, migratie en talen. Zo bouwt Brisk een offerte op, met een vaste prijs per fase.",
      h1: "Website laten maken: kosten, scope en offerte",
      lead: "Op deze pagina staat geen vanafprijs, en dat is een keuze. Elk bedrag dat we hier zouden zetten, klopt voor de helft van de mensen die het leest niet. Wat er wel staat: welke keuzes de prijs bepalen, hoe onze offertes zijn opgebouwd en welke knoppen je zelf in handen hebt.",
      sections: [
        {
          heading: "Waarom je hier geen prijslijst vindt",
          body: [
            "Een site van vijf pagina's voor een zelfstandige en een meertalige site met een productcatalogus en een koppeling naar het ERP heten allebei een website. Het werk erachter scheelt een veelvoud. Een gemiddelde publiceren zou betekenen dat de ene klant te veel betaalt en de andere een offerte krijgt die niet klopt met wat er op de pagina stond.",
            "Bureaus die wel een vanafprijs tonen, kunnen dat om twee redenen. Ofwel werken ze met thema's die ze bij elke klant hergebruiken, ofwel geldt dat bedrag voor een scope die zelden overeenkomt met wat jij nodig hebt. Wij ontwerpen en bouwen op maat, dus het eerlijke antwoord is dat een echt cijfer een gesprek van 30 minuten kost.",
            "Wie zoekt op website laten maken kosten of op website laten maken offerte, wil eigenlijk hetzelfde weten: waar komt dat bedrag vandaan, en waarom verschilt het zo sterk van bureau tot bureau. Daarom staat hieronder precies wat wij tellen wanneer we een prijs opstellen.",
          ],
        },
        {
          heading: "De zes dingen die het bedrag bepalen",
          body: [
            "Het aantal unieke paginatypes weegt zwaarder dan het aantal pagina's. Dertig nieuwsberichten die hetzelfde sjabloon delen kosten bijna niets extra; vijf pagina's die er alle vijf anders uitzien zijn vijf ontwerpen en vijf keer bouwen. Bij het opstellen van de sitemap tellen we daarom sjablonen, geen URL's.",
            "Daarna: hoeveel het CMS moet kunnen. Een site waarin je teksten en beelden aanpast is eenvoudiger dan een site waarin je zelf pagina's samenstelt uit twintig blokken met eigen regels. Koppelingen zijn de derde factor. Een contactformulier naar een mailbox is een halve dag werk; een koppeling met een CRM, een boekingssysteem of een voorraadbestand vraagt afspraken over velden, foutafhandeling en wat er gebeurt als het andere systeem offline is.",
            "De laatste drie: contentmigratie, het aantal talen en wie de teksten en beelden maakt. Honderd bestaande pagina's overzetten met redirects is werk, ook als er niets aan de inhoud verandert. Elke extra taal raakt het ontwerp, het CMS, de URL's en het nalezen. En als wij schrijven en fotograferen in plaats van jij, staat dat als aparte post in de offerte.",
            "Dat verklaart ook waarom vergelijkbare bedrijven verschillende offertes krijgen. Een website laten maken voor zzp of een eenmanszaak start meestal bij één taal, één sjabloon voor de diensten en eigen teksten. Een website laten maken voor mkb met meerdere vestigingen telt daar locatiepagina's, vacatures en vaak een tweede taal bij. Dezelfde bouwstenen, een ander gewicht.",
          ],
        },
        {
          heading: "Hoe onze offerte in elkaar zit",
          body: [
            "Na de gratis kennismaking van 30 minuten krijg je een voorstel met een vaste prijs per fase: ontwerp, bouw, lancering. Geen open uurtarief waarbij je pas op het einde weet waar je staat. Per fase lees je wat je krijgt, wat wij van jou nodig hebben en wanneer het klaar is.",
            "Fases mag je los bestellen. Sommige klanten kopen eerst het ontwerp, laten het bezinken en beslissen daarna over de bouw. Dat is prima: na de eerste fase zit je nergens aan vast, en het ontwerp is hoe dan ook van jou.",
            "Verandert de scope onderweg, dan schrijven we dat op als een aparte lijn met een eigen prijs, voordat we eraan beginnen. Zo blijft de oorspronkelijke prijs staan en zie je zwart op wit waar meerwerk vandaan komt. Je krijgt binnen 24 uur antwoord op je vragen, ook tijdens het project.",
          ],
        },
        {
          heading: "Wat er na de lancering blijft lopen",
          body: [
            "Een website laten maken inclusief onderhoud is een keuze die je vooraf maakt, niet iets wat je later ontdekt. Terugkerende kosten zijn er sowieso: je domeinnaam, je hosting en soms licenties van derden, zoals een zoekdienst of een boekingsmodule. Die betaal je rechtstreeks aan de leverancier, niet aan ons.",
            "Daarnaast kan je onderhoud bij ons afnemen: updates, back-ups, monitoring en een vast aantal uren per maand voor kleine aanpassingen. Wil je dat liever zelf doen, ook goed. Je bent eigenaar van code en ontwerp, dus je kan op elk moment met een ander team verder.",
            "Een betaalbare website laten maken begint bij scope, niet bij korting op uren. Minder sjablonen, één taal bij de start, eigen teksten, koppelingen in een tweede fase: dat zijn de knoppen die echt iets doen. Een website laten maken voor starters ziet er daarom anders uit dan hetzelfde project bij een bedrijf dat al tien jaar draait. Klein beginnen, snel live gaan en uitbreiden zodra de site iets oplevert, is zelden de verkeerde volgorde.",
          ],
        },
      ],
      checklist: {
        title: "Wat een offerte omhoog of omlaag duwt",
        items: [
          "Omhoog: elk extra uniek paginatype, want dat is ontwerp én bouw",
          "Omhoog: elke koppeling met een systeem dat wij niet beheren",
          "Omhoog: honderden bestaande pagina's die met redirects mee moeten",
          "Omhoog: teksten, fotografie of video die wij maken in plaats van jij",
          "Omlaag: starten in één taal en de tweede na de lancering toevoegen",
          "Omlaag: teksten en beelden klaar hebben voor de bouw begint",
          "Omlaag: een kleinere eerste versie, met een lijst voor fase twee",
        ],
      },
      faq: [
        {
          question: "Wat kost een website laten maken bij Brisk?",
          answer:
            "Er bestaat geen eerlijk vast bedrag, omdat de prijs volgt uit de scope: het aantal unieke paginatypes, hoeveel je zelf wil kunnen beheren, het aantal talen, de koppelingen en of wij de teksten en beelden maken. Na een gratis kennismaking van 30 minuten krijg je een voorstel met een vaste prijs per fase, zodat je weet wat elk deel kost voor er iets gebouwd wordt.",
        },
        {
          question: "Werken jullie met een uurtarief of met een vaste prijs?",
          answer:
            "Met een vaste prijs per fase. Ontwerp, bouw en lancering worden apart geprijsd op basis van een scope die we samen vastleggen, zodat je nooit een factuur krijgt voor uren die je niet zag aankomen. Meerwerk wordt vooraf apart geoffreerd en pas uitgevoerd nadat je akkoord gaat.",
        },
        {
          question: "Kunnen jullie binnen een vast budget werken?",
          answer:
            "Ja, op voorwaarde dat we het budget vooraf kennen. Dan bepalen we samen wat er in de eerste versie hoort en wat naar een tweede fase gaat, in plaats van overal iets af te knabbelen. Een kleinere site die af is, werkt beter dan een grote site die half gebouwd blijft staan.",
        },
        {
          question: "Wat gebeurt er als de scope tijdens het project verandert?",
          answer:
            "Dan schrijven we het extra werk op als een aparte lijn met een eigen prijs en een eigen impact op de planning, en beslis jij of het doorgaat. De oorspronkelijke prijs voor de afgesproken scope blijft daarbij ongewijzigd, dus je ziet altijd waar een verhoging vandaan komt.",
        },
        {
          question: "Zit hosting en onderhoud in de prijs van de website?",
          answer:
            "Niet automatisch. Hosting, domeinnaam en eventuele licenties van derden zijn terugkerende kosten die je bij de leverancier betaalt, en onderhoud bij Brisk is een aparte formule met een vaste maandprijs. In het voorstel staat allebei apart vermeld, zodat je de eenmalige en de vaste kosten uit elkaar kan houden.",
        },
        {
          question: "Hoe snel weet ik wat mijn project ongeveer kost?",
          answer:
            "Je krijgt binnen 24 uur antwoord op je aanvraag en daarna plannen we een gratis gesprek van 30 minuten over je doelen, je content en de systemen waar de site aan moet hangen. Op basis van dat gesprek volgt het voorstel met de scope, de planning en de prijs per fase.",
        },
      ],
    },
    en: {
      metaTitle: "Website development cost: what drives the price",
      metaDescription:
        "What a website costs depends on templates, CMS depth, integrations, migration and languages. Here is how Brisk quotes: a fixed price per phase.",
      h1: "Website development cost: what actually moves the number",
      lead: "There is no starting price on this page, deliberately. Any figure we printed here would be wrong for most of the people reading it. What follows instead is the list of decisions that set the price, how our quotes are structured, and which of those decisions are yours to make.",
      sections: [
        {
          heading: "Why there is no price list here",
          body: [
            "A five-page site for a consultant and a three-language site with a product catalogue and an ERP integration are both called a website. The work behind them differs by a multiple, not a margin. Publishing an average would mean overcharging one client and quoting the other a number that collapses the moment we understand the brief.",
            "Agencies that do advertise a starting price can do so for one of two reasons: they reuse the same theme for everyone, or the figure applies to a scope that rarely matches what a real business needs. We design and build from scratch, so the honest answer to what does a website cost is that a useful number takes a 30-minute conversation.",
            "What we can do in writing is show the arithmetic. Everything below is what we count when we put a website quote together.",
          ],
        },
        {
          heading: "Six things that set the price",
          body: [
            "Distinct page templates matter far more than page count. Thirty news articles sharing one template add almost nothing; five pages that each look different are five designs and five builds. When we draft the sitemap, we count templates rather than URLs, and that is usually the first place a budget can be brought down.",
            "Second, how much the CMS has to do. Editing text and images is one level. Composing pages from twenty configurable blocks, each with rules about what may sit next to what, is another, and it is design work as much as development. Third, integrations. A contact form into a mailbox is trivial; a live link to a CRM, a booking engine or a stock file needs agreements about fields, error handling and what the site shows when the other system is down.",
            "The last three are migration, languages and content production. Moving several hundred existing pages with mapped redirects is real work even when the words stay the same. Every additional language touches design, CMS, URLs and proofreading. And if we write the copy and shoot the photography rather than you, that is a separate line in the quote.",
            "This is why similar-looking companies get different numbers. A website for freelancers typically starts with one language, one service template and copy the owner writes. A website for small business owners running several branches adds location pages, job listings and often a second language on top of the same foundation.",
          ],
        },
        {
          heading: "How our quotes are built",
          body: [
            "After the free 30-minute intro call you receive a proposal with a fixed price per phase: design, build, launch. No open-ended hourly rate that only resolves at the end. Each phase states what you get, what we need from you, and when it lands.",
            "Phases can be bought separately. Plenty of clients commission the design, live with it for a week, and only then decide about the build. That is fine by us. Nothing is locked after the first phase, and the design is yours regardless of who builds it.",
            "When the scope changes mid-project, the extra work is written up as its own line with its own price and its own effect on the schedule, and it waits for your approval. The original price for the agreed scope stays where it is, so an increase is always traceable to a decision somebody made on purpose.",
          ],
        },
        {
          heading: "The costs that continue after launch",
          body: [
            "Some costs recur whatever you decide: the domain, hosting, and occasionally third-party licences such as a search service or a booking module. Those are paid to the supplier rather than to us, and we name them in the proposal so they do not arrive as a surprise in month two.",
            "Maintenance with us is optional and priced as a monthly fee: updates, backups, monitoring and a set number of hours for small changes. If your own team would rather handle it, that works too. You own the code and the design, so continuing with anyone else is a decision, not a negotiation.",
            "An affordable website comes from a smaller scope, not from a discounted rate. Fewer templates, one language at launch, your own copy, integrations deferred to a second phase: those are the levers that genuinely move the number. Starting small, launching early and extending once the site is earning its keep is rarely the wrong order.",
          ],
        },
      ],
      checklist: {
        title: "What pushes a quote up or down",
        items: [
          "Up: every additional distinct page template, since it is design plus build",
          "Up: every integration with a system we do not control",
          "Up: hundreds of existing pages that need mapping and redirects",
          "Up: copywriting, photography or video produced by us instead of you",
          "Down: launching in one language and adding the second afterwards",
          "Down: having copy and images ready before the build starts",
          "Down: a deliberately smaller first version with a phase-two list",
        ],
      },
      faq: [
        {
          question: "What does a website cost at Brisk?",
          answer:
            "There is no honest fixed figure, because the price follows the scope: the number of distinct page templates, how much you want to manage yourself, how many languages, which systems it connects to, and whether we produce the copy and imagery. After a free 30-minute intro call you receive a proposal with a fixed price per phase, so every part is priced before anything is built.",
        },
        {
          question: "Do you charge by the hour or by the project?",
          answer:
            "By the project, with a fixed price for each phase. Design, build and launch are quoted separately against a scope we agree together, so no invoice ever arrives for hours you did not see coming. Additional work is quoted in advance and only starts once you approve it.",
        },
        {
          question: "Can you work to a fixed budget?",
          answer:
            "Yes, as long as we know the budget before we start designing. We then decide together what belongs in the first version and what moves to a later phase, rather than thinning out every part of the site. A smaller site that is genuinely finished outperforms a large one that stalls halfway.",
        },
        {
          question: "What happens if the scope changes during the project?",
          answer:
            "The extra work is written up as a separate line with its own price and its own effect on the timeline, and it only proceeds once you agree. The original price for the agreed scope does not move, which keeps every increase traceable to a specific decision.",
        },
        {
          question: "Are hosting and maintenance included in the price?",
          answer:
            "Not automatically. Hosting, the domain name and any third-party licences are recurring costs paid to those suppliers, while maintenance with Brisk is an optional monthly plan. The proposal lists one-off and recurring costs separately so you can see the real annual picture, not just the build.",
        },
        {
          question: "How soon will I know what my project costs?",
          answer:
            "Your enquiry gets a reply within 24 hours, and we schedule a free 30-minute call about your goals, your content and the systems the site has to connect to. The written proposal with scope, schedule and a price per phase follows that conversation.",
        },
      ],
    },
  },
};
