import type { AppLocale } from "@/i18n/routing";

export interface GuideSource {
  label: string;
  url: string;
}

export interface GuideSection {
  id: string;
  heading: string;
  paragraphs: string[];
  checklist?: string[];
  table?: { caption: string; headers: string[]; rows: string[][] };
  sources?: GuideSource[];
}

export interface GuideCopy {
  title: string;
  metaTitle: string;
  description: string;
  category: string;
  introduction: string;
  takeaway: string;
  sections: GuideSection[];
}

export interface Guide {
  id: string;
  slug: Record<AppLocale, string>;
  /** Existing commercial pages this editorial guide supports. */
  serviceSlugs: string[];
  copy: Record<AppLocale, GuideCopy>;
}

/** Editorial articles have no fabricated publication dates, prices or results. */
export const guides: Guide[] = [
  {
    id: "website-planning",
    slug: { nl: "website-planning-en-briefing", en: "website-project-timeline-and-brief" },
    serviceSlugs: ["website-laten-maken-kosten", "meertalige-website-laten-maken"],
    copy: {
      nl: {
        title: "Hoe lang duurt een website bouwen? Begin met een goede briefing.",
        metaTitle: "Website planning en briefing: van idee tot lancering",
        description: "Plan je nieuwe website met een praktische briefing, heldere projectfasen en een checklist voor content, feedback en lancering.",
        category: "Voorbereiding",
        introduction: "De doorlooptijd van een website hangt af van de inhoud, functionaliteit en beslissingen die onderweg nodig zijn. Een planning wordt pas bruikbaar als duidelijk is wie wat oplevert en wanneer. Deze gids helpt je een project afbakenen voordat je een offerte of lanceringsdatum vastlegt.",
        takeaway: "Plan op basis van concrete opleveringen en afhankelijkheden. Een beloofde datum zonder afspraken over content, feedback en koppelingen is geen volledige projectplanning.",
        sections: [
          {
            id: "doel",
            heading: "1. Beschrijf de beslissing die je bezoeker moet nemen",
            paragraphs: [
              "Begin je briefing bij de bedrijfsdoelstelling. Wil je aanvragen voor een dienst, online verkopen, sollicitaties ontvangen of bestaande klanten ondersteunen? Kies een hoofddoel en beschrijf welke bezoeker daarbij hoort. Een website die een complexe B2B-dienst uitlegt, heeft andere pagina’s en bewijsvoering nodig dan een lokale zaak met een eenvoudig afsprakenformulier.",
              "Maak het doel meetbaar zonder meteen een omzetbelofte te formuleren. Leg bijvoorbeeld vast dat iedere dienst een duidelijke uitleg, relevante referentie en werkende aanvraagroute krijgt. Noteer ook welke bestaande problemen verdwijnen, zoals onduidelijke navigatie of moeilijk aanpasbare teksten. Dit geeft ontwerp en ontwikkeling een gezamenlijk vertrekpunt.",
            ],
          },
          {
            id: "briefing",
            heading: "2. Verzamel deze informatie voor je briefing",
            paragraphs: [
              "Een bruikbare briefing hoeft geen technisch bestek te zijn. Beschrijf de gewenste werking in gewone taal en voeg echte voorbeelden toe. Geef bij voorbeeldwebsites aan welk onderdeel je goed vindt: de navigatie, manier van uitleggen of contactflow. Zo voorkom je dat een visuele voorkeur ten onrechte als complete functionele eis wordt geïnterpreteerd.",
            ],
            checklist: [
              "Doelgroep, belangrijkste diensten en gewenste acties per pagina.",
              "Talen, landen en eventuele verschillen in aanbod per markt.",
              "Gewenste pagina’s, formulieren, downloads en externe koppelingen.",
              "Beschikbare teksten, fotografie, huisstijl en rechten op beeldmateriaal.",
              "Wie beslist, wie feedback bundelt en wie content goedkeurt.",
              "Budgetkader, gewenste lancering en harde externe afhankelijkheden.",
            ],
          },
          {
            id: "fasen",
            heading: "3. Maak iedere projectfase controleerbaar",
            paragraphs: [
              "Vraag om een planning waarin iedere fase eindigt met iets dat je kunt beoordelen. Een ontwerpbespreking is pas afgerond als de belangrijkste paginatypes en mobiele weergave zijn goedgekeurd. Ontwikkeling begint vervolgens met een stabiele basis, terwijl ontbrekende content een eigen eigenaar en deadline krijgt. Onderstaande volgorde is een planningsmodel, geen vaste doorlooptijdbelofte.",
            ],
            table: {
              caption: "Van briefing naar een controleerbare oplevering",
              headers: ["Fase", "Wat je samen vastlegt"],
              rows: [
                ["Strategie", "Doelgroep, paginastructuur, scope en succescriteria."],
                ["Content en ontwerp", "Teksten, beelden, paginatypes en mobiele interacties."],
                ["Ontwikkeling", "Werkende pagina’s, CMS, formulieren en koppelingen."],
                ["Acceptatie", "Controle op apparaten, inhoud, toegankelijkheid en vindbaarheid."],
                ["Lancering", "Domein, redirects, beheerrechten en opvolging."],
              ],
            },
          },
          {
            id: "afhankelijkheden",
            heading: "4. Zoek de onderdelen die je planning kunnen blokkeren",
            paragraphs: [
              "Een vertaling, fotoshoot of koppeling met een extern systeem kan meer invloed op de einddatum hebben dan het aantal pagina’s. Vraag daarom vroeg toegang tot documentatie, testaccounts en de persoon die over het externe systeem beslist. Bewaar wachtwoorden in een geschikte gedeelde wachtwoordomgeving, niet in een briefingdocument dat breed wordt doorgestuurd.",
              "Plan feedbackmomenten voordat het project start. Laat één contactpersoon tegenstrijdige opmerkingen oplossen en onderscheid noodzakelijke correcties van nieuwe wensen. Als een nieuwe functie wordt toegevoegd, laat dan ook de gevolgen voor budget en planning vastleggen. Een wijziging is beter te beoordelen wanneer zichtbaar is welk eerder besluit daardoor verandert.",
            ],
          },
          {
            id: "livegang",
            heading: "5. Spreek af wat ‘klaar voor lancering’ betekent",
            paragraphs: [
              "Een website is niet klaar omdat de homepage er goed uitziet. Test echte taken: een aanvraag versturen, een document downloaden, een tekst aanpassen en op mobiel door het menu navigeren. Controleer ook wie de aanvraag ontvangt en of de bevestiging begrijpelijk is. Neem deze acceptatiepunten in de offerte of projectafspraken op.",
              "Voor een bestaande website horen de oude URL’s en redirects bij de voorbereiding. Reserveer na de lancering ruimte om technische meldingen, aanvragen en contentfouten op te volgen. Maak apart duidelijk welk onderhoud is inbegrepen en welke uitbreidingen later worden begroot. Zo wordt de lanceringsdatum een overdrachtsmoment met verantwoordelijkheden, in plaats van het moment waarop het project uit beeld verdwijnt.",
            ],
          },
        ],
      },
      en: {
        title: "How long does a website take to build? Start with the project brief.",
        metaTitle: "Website project timeline and briefing checklist",
        description: "Plan a website project with a practical brief, clear delivery stages and a checklist for content, feedback, integrations and launch.",
        category: "Planning",
        introduction: "A website timeline depends on the content, functionality and decisions the project requires. A schedule becomes useful when everyone knows what they must deliver and when. This guide helps you define the work before agreeing a quote or committing to a launch date.",
        takeaway: "Plan around deliverables and dependencies. A launch date without agreements on content, approvals and integrations is only part of a project schedule.",
        sections: [
          {
            id: "goal",
            heading: "1. Define the decision your visitor needs to make",
            paragraphs: [
              "Start the brief with your business objective. Do you need service enquiries, online purchases, applications or support for existing customers? Choose a primary objective and describe the audience involved. A website explaining a complex B2B service needs different pages and supporting evidence from a local business with a straightforward appointment form.",
              "Make the objective assessable without turning it into a revenue promise. You could require every service to have a clear explanation, relevant project example and working enquiry route. List the current problems the project should solve, such as confusing navigation or content your team cannot update. This creates a shared reference point for design and development decisions.",
            ],
          },
          {
            id: "brief",
            heading: "2. Gather the information your brief needs",
            paragraphs: [
              "Your brief does not need to be a technical specification. Describe the expected behaviour in plain language and include real examples. For inspiration websites, explain whether you like the navigation, the way a service is explained or the contact journey. This prevents a visual preference from being mistaken for a requirement to recreate an entire website.",
            ],
            checklist: [
              "Audience, main services and the action visitors should take on each page.",
              "Languages, target countries and differences in the offer between markets.",
              "Required pages, forms, downloads and connections to other systems.",
              "Available copy, photography, brand assets and image usage rights.",
              "Who makes decisions, consolidates feedback and approves content.",
              "Budget parameters, desired launch date and external dependencies.",
            ],
          },
          {
            id: "stages",
            heading: "3. Give every project stage a reviewable output",
            paragraphs: [
              "Ask for a schedule in which each stage ends with something you can evaluate. A design review is complete when the main page types and their mobile behaviour have been agreed. Development then has a stable foundation, while missing content has a named owner and deadline. The following sequence is a planning framework, rather than a promise of a fixed delivery time.",
            ],
            table: {
              caption: "From an initial brief to an assessable handover",
              headers: ["Stage", "What to agree"],
              rows: [
                ["Strategy", "Audience, page structure, scope and acceptance criteria."],
                ["Content and design", "Copy, imagery, page templates and mobile interactions."],
                ["Development", "Working pages, CMS, forms and integrations."],
                ["Acceptance", "Device, content, accessibility and search checks."],
                ["Launch", "Domain, redirects, account ownership and follow-up."],
              ],
            },
          },
          {
            id: "dependencies",
            heading: "4. Identify what could hold up the schedule",
            paragraphs: [
              "A translation, photography session or external integration can affect the launch date more than the page count. Request documentation, test accounts and contact with the person responsible for an external system early. Use an appropriate shared password manager for credentials, instead of adding them to a briefing document that may be forwarded to a wider group.",
              "Schedule review sessions before the project begins. Assign one person to resolve conflicting feedback and distinguish corrections from additional requirements. When a new feature is requested, record its effect on budget and timing. A change becomes easier to evaluate when everyone can see which earlier decision it replaces and which deliverables it affects.",
            ],
          },
          {
            id: "launch",
            heading: "5. Agree what ‘ready to launch’ actually means",
            paragraphs: [
              "A website is not finished just because the homepage looks good. Test real tasks: sending an enquiry, downloading a document, editing a page and navigating the menu on a phone. Confirm who receives each enquiry and whether the visitor sees a useful confirmation. Include these acceptance checks in the proposal or written project agreement.",
              "For an existing website, prepare the old URL inventory and redirects before launch. Leave room afterwards to investigate technical alerts, enquiry delivery and content corrections. State separately what maintenance includes and how future improvements will be estimated. The launch date then becomes a managed handover with clear responsibilities, followed by a period in which the team can check how the actual website behaves.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "agency-selection",
    slug: { nl: "webdesign-bureau-kiezen", en: "how-to-choose-a-web-design-agency" },
    serviceSlugs: ["webdesign-bureau", "website-laten-maken-kosten"],
    copy: {
      nl: {
        title: "Hoe kies je een webdesign bureau dat bij je project past?",
        metaTitle: "Webdesign bureau kiezen: vragen en vergelijkingskader",
        description: "Vergelijk webdesign bureaus op aanpak, relevante projecten, eigenaarschap, SEO en onderhoud. Met concrete vragen voor je kennismakingsgesprek.",
        category: "Een partner kiezen",
        introduction: "Een mooi portfolio helpt je een eerste selectie maken. Voor een goede keuze wil je ook begrijpen hoe een bureau beslissingen neemt, samenwerkt en de website overdraagt. Gebruik deze vragen om voorstellen op dezelfde inhoud te vergelijken, of je nu een Belgische KMO, Nederlandse onderneming of internationaal bedrijf bent.",
        takeaway: "Kies op aantoonbare aansluiting bij je vraag, een duidelijke scope en werkbare afspraken na oplevering. Een aantrekkelijke presentatie is het begin van de beoordeling.",
        sections: [
          {
            id: "opdracht",
            heading: "1. Geef ieder bureau dezelfde uitgangspunten",
            paragraphs: [
              "Een offerte voor vijf pagina’s zonder teksten is niet rechtstreeks vergelijkbaar met een voorstel waarin strategie, fotografie en twee talen zijn inbegrepen. Deel daarom dezelfde briefing en vraag om aannames expliciet te maken. Benoem het probleem dat je wilt oplossen, de doelgroep, verplichte functies, beschikbare content en wie intern tijd heeft om mee te werken.",
              "Vraag daarna welk onderdeel het bureau eerst zou onderzoeken. Een bruikbaar antwoord maakt duidelijk welke informatie ontbreekt en welke keuze daarvan afhangt. Als er bijvoorbeeld meerdere doelgroepen zijn, wil je weten hoe die elk hun weg naar de juiste dienst vinden. Dit vertelt meer over de aanpak dan een lange lijst technische termen.",
            ],
          },
          {
            id: "portfolio",
            heading: "2. Bekijk relevante projecten als bezoeker én beheerder",
            paragraphs: [
              "Open enkele websites uit het portfolio op je telefoon. Begrijp je het aanbod, kun je een relevante pagina vinden en werkt de contactroute? Vraag welke onderdelen het bureau zelf uitvoerde en welke randvoorwaarden het project had. Een project uit dezelfde sector kan relevant zijn, maar een vergelijkbaar probleem of een passende integratie kan minstens zo waardevol zijn.",
              "Laat ook zien hoe je later een tekst, referentie of afbeelding aanpast. Een website die alleen door een developer kan worden bijgewerkt, kan passen bij sommige organisaties en onhandig zijn voor andere. Vraag bij resultaatclaims naar de meetmethode, periode en context. Verkeer of conversie verandert door meerdere factoren; een los percentage zegt weinig zonder die toelichting.",
            ],
          },
          {
            id: "vergelijking",
            heading: "3. Vergelijk de inhoud van de samenwerking",
            paragraphs: [
              "Maak een eenvoudige vergelijking waarin je per onderwerp de afspraak en open vraag noteert. Geef onderdelen die kritisch zijn voor jouw organisatie meer gewicht. Een uitgebreid CMS is bijvoorbeeld weinig waard als niemand content gaat beheren, terwijl een betrouwbare productkoppeling essentieel kan zijn voor een webshop. Gebruik onderstaande vragen als begin van je gesprek.",
            ],
            table: {
              caption: "Vragen waarmee je voorstellen inhoudelijk vergelijkt",
              headers: ["Onderwerp", "Vraag aan het bureau"],
              rows: [
                ["Strategie", "Hoe bepaal je paginastructuur en prioriteit van inhoud?"],
                ["Ontwerp", "Welke paginatypes en mobiele situaties worden uitgewerkt?"],
                ["SEO", "Wie beheert redirects, metadata en zoekintentie per pagina?"],
                ["Content", "Wie schrijft, vertaalt, controleert en plaatst de inhoud?"],
                ["Beheer", "Welke taken kan ons team zelf uitvoeren?"],
                ["Nazorg", "Wat valt onder herstel, onderhoud en doorontwikkeling?"],
              ],
            },
          },
          {
            id: "afspraken",
            heading: "4. Maak eigenaarschap en kosten bespreekbaar",
            paragraphs: [
              "Leg vast wie toegang krijgt tot het domein, hosting, CMS, broncode en meetaccounts. Vraag hoe een overdracht aan een andere partner verloopt en welke onderdelen afhankelijk zijn van licenties. Dit is een normale beheervraag: je bedrijf moet kunnen blijven werken als een contactpersoon of leverancier verandert.",
              "Splits eenmalige projectkosten, terugkerende abonnementen en optioneel werk. Vraag of contentinvoer, vertalingen, formulieren en koppelingen zijn inbegrepen en wat een extra feedbackronde betekent. Een laag startbedrag kan bij een kleine scope passen. De relevante vergelijking is wat je organisatie over de afgesproken periode krijgt en welke werkzaamheden nog apart moeten worden betaald.",
            ],
          },
          {
            id: "beslissing",
            heading: "5. Vraag een concreet vervolgvoorstel",
            paragraphs: [
              "Sluit de selectie af met een voorstel dat scope, opleveringen, verantwoordelijkheden en acceptatie bevat. Vraag om een planning die rekening houdt met jouw beschikbaarheid. Bij complexe projecten kan een afgebakende analysefase helpen om technische onzekerheden te onderzoeken voordat de volledige bouw wordt begroot.",
              "Beoordeel ook de communicatie tijdens de selectie. Worden vragen beantwoord, aannames benoemd en keuzes begrijpelijk uitgelegd? Kies een partner met wie je twijfels en wijzigingen kunt bespreken. Je zoekt een samenwerking die ook blijft functioneren wanneer content later komt, een koppeling tegenvalt of een prioriteit verandert.",
            ],
          },
        ],
      },
      en: {
        title: "How to choose a web design agency that fits your project",
        metaTitle: "How to choose a web design agency: practical questions",
        description: "Compare web design agencies on process, relevant work, ownership, SEO and maintenance. Practical questions to ask before choosing a partner.",
        category: "Choosing a partner",
        introduction: "A strong portfolio helps you create a shortlist. To choose well, you also need to understand how an agency makes decisions, collaborates and hands over a website. Use these questions to compare the substance of proposals, whether you are a small business or an international team.",
        takeaway: "Choose evidence of a good fit, a defined scope and workable arrangements after delivery. An attractive presentation starts the assessment; the project details complete it.",
        sections: [
          {
            id: "brief",
            heading: "1. Give every agency the same starting point",
            paragraphs: [
              "A quote for five pages without copy cannot be compared directly with a proposal that includes strategy, photography and two languages. Share the same brief and ask agencies to state their assumptions. Describe the problem you want to solve, the audience, required features, available content and how much time your internal team can contribute.",
              "Ask what the agency would investigate first. A useful answer identifies missing information and the decisions it affects. If you serve several audiences, for example, ask how each would find the relevant service. This reveals more about the working approach than a long list of technologies, particularly when the team can explain the tradeoffs in language you understand.",
            ],
          },
          {
            id: "portfolio",
            heading: "2. Review projects as a visitor and as an editor",
            paragraphs: [
              "Open several portfolio websites on your phone. Can you understand the offer, find a useful page and complete the contact journey? Ask which parts the agency delivered and what constraints shaped the project. Experience in your sector can help, but solving a similar customer problem or implementing a relevant integration can be just as useful.",
              "Ask for a demonstration of editing a paragraph, project example or image. A website that requires developer support for every change may suit some organisations and frustrate others. If results are presented, ask about the measurement method, reporting period and context. Traffic and conversions change for several reasons, so an isolated percentage does not explain what the website work actually contributed.",
            ],
          },
          {
            id: "comparison",
            heading: "3. Compare what the collaboration includes",
            paragraphs: [
              "Create a simple comparison recording the agreement and open question for each topic. Give more weight to what matters to your organisation. An elaborate CMS has limited value if nobody will maintain the content, while dependable product synchronisation may be essential for an online store. Use the questions below as a starting point and ask for concrete examples where an answer is vague.",
            ],
            table: {
              caption: "Questions for comparing agency proposals",
              headers: ["Topic", "Question to ask"],
              rows: [
                ["Strategy", "How will you decide the page structure and content priorities?"],
                ["Design", "Which page types and mobile situations will be designed?"],
                ["SEO", "Who owns redirects, metadata and the purpose of each page?"],
                ["Content", "Who writes, translates, checks and uploads the content?"],
                ["Editing", "Which tasks can our team perform independently?"],
                ["Support", "How are fixes, maintenance and new features distinguished?"],
              ],
            },
          },
          {
            id: "ownership",
            heading: "4. Discuss account ownership and ongoing costs",
            paragraphs: [
              "Record who controls the domain, hosting, CMS, source code and measurement accounts. Ask how a future handover would work and which features depend on licensed products. This is an ordinary operational question: your business needs to remain functional when an individual contact or service provider changes.",
              "Separate the initial project fee, recurring subscriptions and optional work. Confirm whether content entry, translations, forms and integrations are included, and how additional review rounds are handled. A low initial fee may be appropriate for a small scope. Compare what your organisation receives over the agreed period and identify the work that would still have to be paid for separately.",
            ],
          },
          {
            id: "decision",
            heading: "5. Request a concrete next-step proposal",
            paragraphs: [
              "Finish the selection with a proposal covering scope, deliverables, responsibilities and acceptance. Ask for a schedule that considers your availability. For complex work, a defined discovery phase can help investigate integration and content uncertainties before the full build is estimated. Its output should make later decisions easier to assess.",
              "Evaluate communication during the selection itself. Are questions answered, assumptions disclosed and recommendations explained? Choose a partner with whom you can discuss uncertainty and changes. The relationship needs to remain useful when content is delayed, an integration is harder than expected or a business priority changes during the project.",
            ],
          },
        ],
      },
    },
  },
  {
    id: "seo-launch",
    slug: { nl: "website-seo-checklist", en: "website-seo-launch-checklist" },
    serviceSlugs: ["meertalige-website-laten-maken", "webdesign-bureau"],
    copy: {
      nl: {
        title: "Website SEO checklist: wat controleer je voor en na de lancering?",
        metaTitle: "Website SEO checklist voor een goede lancering",
        description: "Controleer inhoud, indexering, canonicals, interne links, mobiele prestaties en metingen voordat je website live gaat. Inclusief opvolging na lancering.",
        category: "Vindbaarheid",
        introduction: "SEO begint bij een nuttige website die zoekmachines kunnen begrijpen en bezoekers kunnen gebruiken. Deze checklist helpt een nieuwe website zorgvuldig lanceren. Werk per controle met een eigenaar en een zichtbaar resultaat, zodat ‘SEO inbegrepen’ een concrete afspraak wordt.",
        takeaway: "Controleer de echte productie-URL’s, de inhoud en de belangrijkste bezoekerstaken. Een geslaagde technische controle maakt je pagina geschikt om gevonden te worden; inhoud en concurrentie blijven meespelen.",
        sections: [
          {
            id: "inhoud",
            heading: "1. Geef iedere belangrijke pagina een eigen taak",
            paragraphs: [
              "Maak een overzicht van diensten en vragen die jouw klanten hebben. Koppel ieder onderwerp aan de pagina die het volledig kan beantwoorden. Woorden als ‘website laten bouwen’ en ‘website laten maken’ kunnen op dezelfde pagina passen. Een aparte pagina is zinvol wanneer de bezoeker een wezenlijk andere vraag heeft, bijvoorbeeld over planning of een webshopkoppeling.",
              "Lees iedere commerciële pagina als iemand die je bedrijf nog niet kent. Is duidelijk wat je levert, voor wie het past en wat de volgende stap is? Voeg eigen projectvoorbeelden en controleerbare informatie toe. Controleer titels, beschrijvingen en koppen op duidelijkheid en onderscheid. Een unieke titel helpt weinig als de onderliggende inhoud grotendeels wordt herhaald.",
            ],
          },
          {
            id: "indexering",
            heading: "2. Controleer toegang en indexering afzonderlijk",
            paragraphs: [
              "Test de openbare website na het verwijderen van de afscherming van de ontwikkelomgeving. Belangrijke pagina’s moeten succesvol laden en mogen geen onbedoelde noindex-instructie bevatten. Robots.txt regelt crawltoegang; een blokkade daar is geen betrouwbare manier om een URL uit zoekresultaten te houden. Zoekmachines moeten een pagina kunnen ophalen om een noindex-instructie te lezen.",
              "Controleer ook een niet-bestaand adres. Dat hoort een echte foutstatus te geven, met een nuttige route terug voor bezoekers. Maak een XML-sitemap met de definitieve, indexeerbare URL’s en controleer hem op ontbrekende hoofdpagina’s. Houd testpagina’s, interne zoekresultaten en verouderde varianten buiten die selectie.",
            ],
            sources: [{ label: "Google: robots.txt en indexering", url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro" }],
          },
          {
            id: "urls",
            heading: "3. Laat URL’s en interne links dezelfde versie aanwijzen",
            paragraphs: [
              "Kies een consistente openbare URL voor iedere pagina. Laat de canonical de voorkeursversie aanwijzen en gebruik diezelfde URL in navigatie en sitemap. Bij vertalingen moet iedere taalvariant bereikbaar zijn en moeten de taalverwijzingen naar de bijbehorende vertaling leiden. Een Engelse slug onder een Nederlandse route kan anders een foutpagina opleveren.",
            ],
            checklist: [
              "Klik vanaf de homepage door naar iedere belangrijke dienst.",
              "Controleer links in menu, footer, referenties en artikelen.",
              "Test taalwissels op detailpagina’s, niet alleen op de homepage.",
              "Laat oude adressen bij een vervanging naar de passende nieuwe pagina leiden.",
              "Gebruik beschrijvende linkteksten die de bestemming duidelijk maken.",
            ],
            sources: [{ label: "Google: canonieke URL’s", url: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls" }],
          },
          {
            id: "ervaring",
            heading: "4. Test prestaties en werking op echte paginatypes",
            paragraphs: [
              "Controleer behalve de homepage ook een dienst, artikel, formulier en eventuele productpagina. Kijk naar laden, reageren op invoer en verspringende onderdelen. Dit sluit aan op de Core Web Vitals: LCP, INP en CLS. Laboratoriumtests helpen problemen opsporen; gegevens van echte bezoekers laten zien hoe de ervaring in de praktijk uitpakt.",
              "Test menu’s en formulieren met toetsenbord en telefoon. Controleer labels, foutmeldingen, zichtbare focus en voldoende leesbare tekst. Beoordeel grote afbeeldingen en video’s op hun waarde voor de bezoeker. Een perfecte testscore is geen voorwaarde voor bruikbare content en geen garantie op de hoogste positie; los eerst problemen op die belangrijke taken hinderen.",
            ],
            sources: [{ label: "Google: Core Web Vitals en zoeken", url: "https://developers.google.com/search/docs/appearance/core-web-vitals" }],
          },
          {
            id: "meten",
            heading: "5. Valideer beschrijvende gegevens en organiseer opvolging",
            paragraphs: [
              "Structured data moet passen bij wat bezoekers werkelijk zien. Beschrijf je organisatie, een dienst of artikel alleen met informatie die klopt. Voeg geen beoordelingen, locaties of resultaten toe die je niet kunt onderbouwen. Controleer de uitvoer met geschikte validatietools; correcte markup betekent niet automatisch dat Google een uitgebreid zoekresultaat toont.",
              "Verifieer het domein in Search Console, dien de sitemap in en inspecteer de belangrijkste pagina’s. Spreek af wie indexeringsmeldingen, zoekopdrachten en ontvangen aanvragen opvolgt. Leg bevindingen vast per URL, met een actie en verantwoordelijke. Vergelijk ontwikkelingen over een passende periode en houd rekening met wijzigingen aan campagnes, aanbod en seizoen. Zo leidt meten tot concrete verbeteringen aan de pagina’s die klanten werkelijk nodig hebben.",
            ],
            sources: [{ label: "Google: richtlijnen voor structured data", url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies" }],
          },
        ],
      },
      en: {
        title: "Website SEO checklist: what to check before and after launch",
        metaTitle: "Website SEO launch checklist: content and technical checks",
        description: "Check content, indexing, canonicals, internal links, mobile performance and measurement before launching a website, then organise the follow-up.",
        category: "Search visibility",
        introduction: "SEO starts with a useful website that search engines can understand and visitors can use. This checklist helps you launch carefully. Assign an owner and an observable result to each check, so that ‘SEO included’ becomes an agreement the project team can actually review.",
        takeaway: "Check the real production URLs, the content and the main visitor tasks. Technical checks help pages become eligible for discovery; useful content and competition still influence results.",
        sections: [
          {
            id: "content",
            heading: "1. Give each important page a distinct purpose",
            paragraphs: [
              "Map your services and the questions customers ask to pages that can answer them fully. Phrases such as ‘custom website design’ and ‘bespoke business website’ may belong on the same page. A separate page becomes useful when the visitor has a materially different question, such as planning a project or connecting an online store to a stock system.",
              "Read each commercial page as someone unfamiliar with your company. Is it clear what you deliver, who it suits and what the next step involves? Include your own project examples and information that can be checked. Review titles, descriptions and headings for clarity and differentiation. A unique title does little to improve a page whose main content simply repeats another.",
            ],
          },
          {
            id: "indexing",
            heading: "2. Check crawl access and indexing separately",
            paragraphs: [
              "Test the public website after removing development access restrictions. Important pages should load successfully and contain no unintended noindex instruction. Robots.txt controls crawling; blocking a URL there does not reliably remove it from search results. Search engines need to fetch a page to read its noindex instruction.",
              "Also request an address that does not exist. It should return a genuine error status and give visitors a useful way back. Create an XML sitemap containing the final, indexable URLs and check that important pages are present. Keep test pages, internal search results and obsolete variants out of that selection. Record the production result, not just a screenshot from the staging environment.",
            ],
            sources: [{ label: "Google: robots.txt and indexing", url: "https://developers.google.com/search/docs/crawling-indexing/robots/intro" }],
          },
          {
            id: "urls",
            heading: "3. Align URLs with the links pointing to them",
            paragraphs: [
              "Choose a consistent public URL for each page. The canonical should identify the preferred version, and navigation and sitemaps should use that same address. For translations, each language version needs to be reachable and language references should point to the matching translation. An English slug placed under a Dutch route may otherwise lead to an error.",
            ],
            checklist: [
              "Navigate from the homepage to every main service.",
              "Check links in menus, footers, project examples and articles.",
              "Test language switching on detail pages as well as the homepage.",
              "When replacing a site, send old addresses to the relevant new pages.",
              "Use descriptive link text that explains the destination.",
            ],
            sources: [{ label: "Google: canonical URLs", url: "https://developers.google.com/search/docs/crawling-indexing/consolidate-duplicate-urls" }],
          },
          {
            id: "experience",
            heading: "4. Test performance and real tasks across page types",
            paragraphs: [
              "Test a service page, article, form and any product pages alongside the homepage. Look at loading, responsiveness to input and unexpected layout movement. These correspond to the Core Web Vitals: LCP, INP and CLS. Laboratory tests help diagnose problems; real visitor data shows how the experience behaves in actual conditions.",
              "Try menus and forms with a keyboard and on a phone. Check labels, error messages, visible focus and readable text. Evaluate large images and videos against their usefulness to visitors. A perfect test score is neither a substitute for useful content nor a promise of a top ranking. Prioritise faults that interfere with the tasks visitors need to complete.",
            ],
            sources: [{ label: "Google: Core Web Vitals and search", url: "https://developers.google.com/search/docs/appearance/core-web-vitals" }],
          },
          {
            id: "measurement",
            heading: "5. Validate descriptive data and plan the follow-up",
            paragraphs: [
              "Structured data should describe what visitors actually see. Describe your organisation, a service or an article using accurate information. Do not add ratings, locations or results you cannot substantiate. Check the output using appropriate validation tools; valid markup does not automatically mean that Google will display an enhanced search result.",
              "Verify the domain in Search Console, submit the sitemap and inspect important pages. Assign responsibility for indexing alerts, search queries and enquiry delivery. Record findings by URL, with an action and an owner. Compare developments over an appropriate period and account for changes in campaigns, the offer and seasonality. This turns measurement into specific improvements to the pages your customers actually need.",
            ],
            sources: [{ label: "Google: structured data policies", url: "https://developers.google.com/search/docs/appearance/structured-data/sd-policies" }],
          },
        ],
      },
    },
  },
  {
    id: "redesign-migration",
    slug: { nl: "website-redesign-migratie-checklist", en: "website-redesign-migration-checklist" },
    serviceSlugs: ["website-laten-vernieuwen", "meertalige-website-laten-maken"],
    copy: {
      nl: {
        title: "Website redesign checklist: vernieuwen met een zorgvuldig migratieplan",
        metaTitle: "Website redesign en SEO-migratie: praktische checklist",
        description: "Bereid je website redesign voor met een URL-inventaris, redirectplan, contentcontrole en meetbare opvolging van de migratie.",
        category: "Vernieuwen",
        introduction: "Een redesign verandert meer dan de vormgeving. Pagina’s verhuizen, teksten worden herschreven en soms wisselt ook het CMS of domein. Maak daarom naast het ontwerp een migratieplan dat vastlegt wat blijft, wat verandert en hoe je de overstap controleert.",
        takeaway: "Bewaar een overzicht van oude URL’s en hun nieuwe bestemming. Controleer de migratie per pagina en volg zowel zoekverkeer als werkende aanvragen na de lancering op.",
        sections: [
          {
            id: "inventaris",
            heading: "1. Breng eerst in kaart wat je huidige website doet",
            paragraphs: [
              "Maak een inventaris voordat pagina’s verdwijnen of toegang tot het oude CMS wordt ingetrokken. Verzamel URL’s, titels, belangrijke downloads en formulieren. Noteer daarnaast welke pagina’s aanvragen ondersteunen en welke inhoud je team nog regelmatig gebruikt. Een pagina met weinig verkeer kan voor bestaande klanten toch een belangrijke handleiding of contactroute bevatten.",
              "Combineer cijfers met gesprekken binnen je organisatie. Vraag sales welke uitleg klanten missen en vraag support welke documenten vaak worden doorgestuurd. Bewaar exports en screenshots van de huidige werking. Zo kun je later onderscheiden of een verschil door het redesign, een inhoudelijke keuze of een meetfout ontstaat. Geef ieder belangrijk onderdeel een eigenaar die de nieuwe versie kan beoordelen.",
            ],
          },
          {
            id: "beslissingen",
            heading: "2. Geef iedere oude pagina een bewuste bestemming",
            paragraphs: [
              "Beslis per pagina of deze blijft, wordt verbeterd, samengaat met andere inhoud of verdwijnt. Behoud bruikbare URL’s waar dat past. Bij een permanente verhuizing gebruik je een permanente serverredirect, bijvoorbeeld 301 of 308, naar een relevante opvolger. Een redirect naar de homepage is geen zinvolle vervanging voor een verdwenen dienstpagina.",
            ],
            table: {
              caption: "Beslismodel voor je migratielijst",
              headers: ["Situatie", "Afspraak voor de nieuwe website"],
              rows: [
                ["Inhoud blijft", "Behoud de URL waar mogelijk en test de nieuwe pagina."],
                ["Pagina verhuist", "Leg oude en nieuwe URL vast en test de redirect."],
                ["Inhoud wordt samengevoegd", "Controleer dat de nieuwe pagina de oude vraag nog beantwoordt."],
                ["Inhoud vervalt zonder opvolger", "Kies bewust een 404 of 410 en verwijder interne verwijzingen."],
                ["Download of afbeelding verhuist", "Neem het bestand en gebruikte verwijzingen mee in de inventaris."],
              ],
            },
            sources: [{ label: "Google: permanente en tijdelijke redirects", url: "https://developers.google.com/search/docs/crawling-indexing/301-redirects" }],
          },
          {
            id: "inhoud",
            heading: "3. Bewaar belangrijke inhoud tijdens het herontwerp",
            paragraphs: [
              "Een compactere vormgeving kan nuttig zijn, maar controleer wat je inhoudelijk weglaat. Een nieuwe korte dienstpagina moet nog steeds antwoord geven op de vragen waarvoor de oude pagina werd bezocht. Koppel de nieuwe pagina aan relevante projecten, uitleg en contactmogelijkheden. Verhuis ook onderschriften, bestandsnamen en toegankelijke beschrijvingen waar die bezoekers helpen.",
              "Neem vertalingen als afzonderlijke controlepunten op. Laat iemand per taal nakijken of navigatie, formulieren en de bestemming van taalwissels kloppen. Controleer bovendien of een tekstuele wijziging gevolgen heeft voor voorwaarden, productinformatie of interne werkprocessen. Het ontwerpteam kan niet zelfstandig bepalen welke bedrijfsinformatie inhoudelijk actueel is.",
            ],
          },
          {
            id: "controle",
            heading: "4. Maak een controlelijst voor de lanceringsdag",
            paragraphs: [
              "Spreek af wie de technische omzetting uitvoert en wie het besluit tot lancering neemt. Controleer vooraf of er een bruikbare back-up en terugvalprocedure is. Bij een webshop of actieve applicatie vraagt de overdracht van nieuwe bestellingen of gegevens een apart plan. Voorkom dat een testomgeving ongemerkt de enige actuele kopie wordt.",
            ],
            checklist: [
              "Test een representatieve selectie én alle bedrijfskritische oude URL’s.",
              "Controleer canonicals, sitemap en taalverwijzingen op nieuwe adressen.",
              "Verwijder ontwikkelblokkades alleen van de openbare productieomgeving.",
              "Test formulieren, notificaties, downloads en benodigde koppelingen.",
              "Controleer domeininstellingen zonder bestaande e-mailrecords te verliezen.",
              "Leg vast wie incidenten ontvangt en wanneer een terugval nodig is.",
            ],
          },
          {
            id: "opvolging",
            heading: "5. Volg de overstap op met een vast overzicht",
            paragraphs: [
              "Bekijk na lancering foutmeldingen, belangrijke URL’s en ontvangen aanvragen. Vergelijk per paginagroep in plaats van alleen naar het totale bezoekersaantal te kijken. Een meetinstelling die ontbreekt kan op verkeersverlies lijken; een kapot formulier is juist onzichtbaar in een rapport dat uitsluitend paginabezoeken telt. Controleer daarom ook de volledige route van bezoek tot ontvangst.",
              "Google adviseert redirects doorgaans minstens een jaar te behouden; voor bezoekers kan langer zinvol zijn. Tijdelijke schommelingen in zoekzichtbaarheid zijn mogelijk tijdens verwerking van een verhuizing. Bewaar het migratieoverzicht en registreer aanpassingen, zodat problemen herleidbaar blijven. Plan verbeteringen op basis van de waarnemingen en houd grote aanvullende wijzigingen herkenbaar gescheiden in je wijzigingslog.",
            ],
            sources: [{ label: "Google: websites verhuizen met URL-wijzigingen", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" }],
          },
        ],
      },
      en: {
        title: "Website redesign checklist: plan the migration as carefully as the design",
        metaTitle: "Website redesign and SEO migration checklist",
        description: "Prepare a website redesign with a URL inventory, redirect plan, content checks and a practical process for monitoring the migration.",
        category: "Redesign",
        introduction: "A redesign changes more than appearance. Pages move, copy is rewritten and sometimes the CMS or domain changes too. Alongside the design work, create a migration plan that records what stays, what changes and how you will verify the transition.",
        takeaway: "Keep an inventory of old URLs and their intended destinations. Check the migration page by page and monitor both search traffic and working enquiries after launch.",
        sections: [
          {
            id: "inventory",
            heading: "1. Understand what the existing website does",
            paragraphs: [
              "Build an inventory before pages disappear or access to the old CMS is removed. Collect URLs, titles, important downloads and forms. Note which pages support enquiries and which information your team still uses regularly. A low-traffic page may contain a manual or contact route that remains important for existing customers.",
              "Combine measurements with conversations inside your organisation. Ask sales which explanations customers need and support which documents they send out frequently. Save exports and screenshots of the current behaviour. This helps distinguish a change caused by the redesign from a deliberate content decision or a measurement fault. Assign an owner to each important area so somebody can evaluate whether its replacement works.",
            ],
          },
          {
            id: "destinations",
            heading: "2. Give every old page a deliberate destination",
            paragraphs: [
              "Decide whether each page stays, improves, merges with other content or disappears. Keep useful URLs when practical. For a permanent move, use a permanent server redirect, such as 301 or 308, to a relevant replacement. Sending an old service page to the homepage does not provide visitors with an equivalent answer.",
            ],
            table: {
              caption: "A decision framework for your migration inventory",
              headers: ["Situation", "Agreement for the new website"],
              rows: [
                ["Content stays", "Retain the URL where practical and test the rebuilt page."],
                ["Page moves", "Record the old and new URL and verify the redirect."],
                ["Content is combined", "Check that the new page still answers the old question."],
                ["Content ends without a replacement", "Choose an appropriate 404 or 410 and remove internal references."],
                ["Download or image moves", "Include the file and its incoming references in the inventory."],
              ],
            },
            sources: [{ label: "Google: permanent and temporary redirects", url: "https://developers.google.com/search/docs/crawling-indexing/301-redirects" }],
          },
          {
            id: "content",
            heading: "3. Preserve important information during the redesign",
            paragraphs: [
              "A more compact design can be useful, but check which information is being removed. A shorter service page should still answer the questions that brought visitors to its predecessor. Connect the new page to relevant project examples, explanations and contact options. Carry across captions, file references and accessible descriptions where they help people understand or use the content.",
              "Treat translations as separate review items. Ask someone to check navigation, forms and the destinations of language switches in each language. Also establish whether a text change affects product information, terms or internal workflows. The design team cannot independently determine whether all business information is current. Named content owners make this part of acceptance much easier to manage.",
            ],
          },
          {
            id: "launch-checks",
            heading: "4. Create a launch-day checklist",
            paragraphs: [
              "Agree who performs the technical transition and who makes the launch decision. Confirm there is a usable backup and a recovery procedure before the switch. An active store or application needs a separate plan for new orders and data created during the transition. Avoid a situation in which a test environment accidentally becomes the only up-to-date copy.",
            ],
            checklist: [
              "Test a representative sample and every business-critical old URL.",
              "Check that canonicals, sitemaps and language references use new addresses.",
              "Remove development restrictions only from the public production site.",
              "Test forms, notifications, downloads and required integrations.",
              "Check domain configuration without losing existing email records.",
              "Record who receives incident reports and when recovery is required.",
            ],
          },
          {
            id: "monitoring",
            heading: "5. Monitor the transition with a consistent record",
            paragraphs: [
              "After launch, review errors, important URLs and received enquiries. Compare groups of pages rather than only the overall visitor count. A missing tracking setting can look like a traffic loss, while a broken form may be invisible in a report counting page views alone. Check the full journey from arriving on the website to receiving the message.",
              "Google generally recommends keeping redirects for at least a year; retaining them longer may help visitors. Search visibility can fluctuate while a move is processed. Keep the migration inventory and record changes so that faults remain traceable. Plan improvements around what you observe, and make substantial additional changes easy to identify in the change log when reviewing later results.",
            ],
            sources: [{ label: "Google: site moves with URL changes", url: "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes" }],
          },
        ],
      },
    },
  },
  {
    id: "maintenance",
    slug: { nl: "website-onderhoud-kosten-en-afspraken", en: "website-maintenance-costs-and-scope" },
    serviceSlugs: ["wordpress-website-laten-maken", "website-laten-maken-kosten"],
    copy: {
      nl: {
        title: "Wat kost website onderhoud? Begin bij de werkzaamheden en afspraken.",
        metaTitle: "Website onderhoud: kosten, taken en duidelijke afspraken",
        description: "Ontdek welke taken onder website onderhoud vallen, wat kosten bepaalt en welke afspraken je nodig hebt over updates, back-ups, support en eigenaarschap.",
        category: "Beheer na lancering",
        introduction: "De kosten van website onderhoud hangen af van wat je laat onderhouden en welke ondersteuning je verwacht. Alleen hosting, technisch onderhoud en doorontwikkeling zijn verschillende diensten. Deze gids helpt je een onderhoudsvoorstel beoordelen zonder onvergelijkbare maandbedragen naast elkaar te zetten.",
        takeaway: "Vraag wat wordt gecontroleerd, wie reageert als iets misgaat en welke werkzaamheden apart worden berekend. Het bedrag krijgt pas betekenis wanneer de scope en verantwoordelijkheden duidelijk zijn.",
        sections: [
          {
            id: "scope",
            heading: "1. Scheid infrastructuur, onderhoud en verbeteringen",
            paragraphs: [
              "Hosting zorgt voor de omgeving waarop je website draait. Onderhoud gaat over de afgesproken controles en werkzaamheden om de bestaande website bruikbaar te houden. Doorontwikkeling voegt iets toe of verandert de werking. Die onderdelen kunnen in één overeenkomst staan, maar horen afzonderlijk herkenbaar te zijn. Anders kan een kleine tekstwijziging dezelfde onduidelijkheid veroorzaken als een grote technische storing.",
              "Beschrijf eerst welke systemen onderdeel zijn van de website. Denk aan het CMS, formulieren, zoekfunctie, externe scripts en koppelingen met planning of voorraad. Leg vast welke leverancier ieder onderdeel beheert. Een storing in een externe dienst kan je website beïnvloeden, terwijl de onderhoudspartner niet zelfstandig toegang heeft om die dienst aan te passen.",
            ],
          },
          {
            id: "kosten",
            heading: "2. Dit bepaalt de omvang van het onderhoud",
            paragraphs: [
              "Een informatieve website met weinig wijzigingen vraagt andere controles dan een webshop die continu bestellingen verwerkt. De gebruikte techniek, hoeveelheid koppelingen en gevolgen van uitval bepalen hoeveel aandacht nodig is. Ook de gewenste bereikbaarheid van ondersteuning telt mee: een antwoord tijdens kantooruren is een andere afspraak dan beschikbaarheid buiten die uren.",
              "Vraag een uitsplitsing van vaste kosten, licenties, inbegrepen werkzaamheden en optionele uren. Controleer of licenties rechtstreeks op jouw naam staan en wat er gebeurt als een abonnement stopt. Bespreek bij een voorstel voor een bestaande website ook of een eerste inventarisatie of herstelronde nodig is. Achterstallig onderhoud kan het startwerk veranderen zonder dat het een normaal terugkerend onderdeel wordt.",
            ],
          },
          {
            id: "werkzaamheden",
            heading: "3. Maak de taken concreet genoeg om te controleren",
            paragraphs: [
              "De formulering ‘updates inbegrepen’ vertelt nog niet hoe updates worden getest of wat er gebeurt bij een fout. Vraag naar een werkbare procedure en naar de manier waarop je het uitgevoerde werk terugziet. Onderstaande onderwerpen vormen een gespreksbasis; de uiteindelijke frequentie en dekking hangen af van jouw website en worden samen afgesproken.",
            ],
            table: {
              caption: "Onderhoudsonderwerpen en de afspraak die daarbij hoort",
              headers: ["Onderdeel", "Wat je wilt vastleggen"],
              rows: [
                ["Updates", "Welke onderdelen worden bijgewerkt en hoe wordt werking gecontroleerd?"],
                ["Back-ups", "Wat wordt bewaard, hoelang en hoe wordt herstel getest?"],
                ["Monitoring", "Wat wordt gemeten en wie ontvangt een melding?"],
                ["Formulieren", "Worden verzending, ontvangst en bevestigingen gecontroleerd?"],
                ["Content", "Welke wijzigingen kan je team zelf doen en welke zijn inbegrepen?"],
                ["Rapportage", "Welke uitgevoerde taken, incidenten en adviezen ontvang je?"],
              ],
            },
          },
          {
            id: "support",
            heading: "4. Maak onderscheid tussen reageren en oplossen",
            paragraphs: [
              "Een responstijd vertelt wanneer iemand je melding behandelt; dat is niet automatisch het moment waarop het probleem is verholpen. Laat de overeenkomst uitleggen welke kanalen je gebruikt, welke uren gelden en hoe de ernst van een incident wordt bepaald. Een niet-werkende betaalstap vraagt een andere behandeling dan een afbeelding die verkeerd uitsnijdt.",
              "Spreek af wie beslissingen mag nemen bij onverwacht herstelwerk en wanneer aanvullende toestemming nodig is. Zorg dat het contactpunt ook bereikbaar is als de website zelf uitvalt. Geef de onderhoudspartner voldoende context: de getroffen URL, het verwachte gedrag, het tijdstip en stappen waarmee het probleem opnieuw optreedt. Zo gaat minder tijd verloren aan het reconstrueren van de melding.",
            ],
          },
          {
            id: "overdracht",
            heading: "5. Houd toegang en een eventuele overdracht overzichtelijk",
            paragraphs: [
              "Bewaar een actueel overzicht van domein, hosting, broncode, CMS en benodigde externe accounts. Gebruik persoonlijke toegangen waar mogelijk en beperk rechten tot wat iemand nodig heeft. Controleer bij personeels- of leverancierswissels welke toegang moet worden aangepast. Een onderhoudsovereenkomst is eenvoudiger uit te voeren wanneer afhankelijkheden en verantwoordelijken bekend zijn.",
              "Vraag tot slot hoe opzegging en overdracht verlopen: welke documentatie, exports en toegangen krijg je mee, en welke ondersteuning valt buiten de lopende afspraak? Plan periodiek een inhoudelijke evaluatie. Als de website meer talen, formulieren of koppelingen krijgt, moet de onderhoudsscope kunnen meegroeien. Zo sluit het onderhoud aan op de website die je werkelijk gebruikt.",
            ],
          },
        ],
      },
      en: {
        title: "What does website maintenance cost? Start with the scope of work.",
        metaTitle: "Website maintenance costs, tasks and support agreements",
        description: "Understand website maintenance scope and cost drivers, with practical questions about updates, backups, support, account ownership and handover.",
        category: "After launch",
        introduction: "Website maintenance costs depend on what is maintained and the support you expect. Hosting, technical maintenance and ongoing development are different services. This guide helps you assess a maintenance proposal without treating unrelated monthly fees as directly comparable offers.",
        takeaway: "Ask what is checked, who responds when something fails and which tasks are charged separately. A fee becomes meaningful when scope and responsibilities are clear.",
        sections: [
          {
            id: "scope",
            heading: "1. Separate infrastructure, maintenance and improvements",
            paragraphs: [
              "Hosting provides the environment in which the website runs. Maintenance covers the agreed checks and work that keep the existing website usable. Ongoing development adds features or changes behaviour. These services may share one contract, but each should be identifiable. Otherwise, a small copy change can create the same uncertainty about responsibility as a major technical failure.",
              "Start by describing the systems involved in the website. Include the CMS, forms, search, external scripts and connections to scheduling or inventory tools. Record which supplier manages each component. A problem in an external service may affect the site while the website maintenance provider has no independent access to change that service. Knowing this in advance improves coordination when something fails.",
            ],
          },
          {
            id: "cost-drivers",
            heading: "2. Understand what determines the amount of work",
            paragraphs: [
              "An informational website with infrequent changes needs different checks from an online store processing orders throughout the day. The technology, number of integrations and consequences of downtime influence the work involved. Support availability matters as well: a response during office hours is a different commitment from availability outside those hours.",
              "Request a breakdown of recurring fees, licences, included tasks and optional hours. Check whether licences are registered to your business and what happens when a subscription ends. For an existing website, ask whether an initial review or repair phase is required. A backlog of unresolved problems can change the initial workload without becoming an ordinary recurring part of the agreement.",
            ],
          },
          {
            id: "tasks",
            heading: "3. Define tasks clearly enough to review them",
            paragraphs: [
              "The phrase ‘updates included’ does not explain how changes are tested or what happens if an update breaks something. Ask about the procedure and how completed work is reported. The topics below provide a basis for discussion; the appropriate frequency and coverage depend on your actual website and should be agreed together rather than assumed from a package name.",
            ],
            table: {
              caption: "Maintenance topics and the agreement each one needs",
              headers: ["Area", "What to record"],
              rows: [
                ["Updates", "Which components are updated and how is their behaviour checked?"],
                ["Backups", "What is retained, for how long and how is recovery tested?"],
                ["Monitoring", "What is measured and who receives an alert?"],
                ["Forms", "Are submission, delivery and confirmations checked?"],
                ["Content", "What can your team change and which edits are included?"],
                ["Reporting", "What record of completed work, incidents and recommendations do you receive?"],
              ],
            },
          },
          {
            id: "support",
            heading: "4. Distinguish responding from resolving",
            paragraphs: [
              "A response time tells you when someone will address a report; it is not automatically a deadline for solving the problem. The agreement should explain which contact channels and service hours apply, and how incident severity is assessed. A broken payment step needs different treatment from an image that is cropped incorrectly.",
              "Agree who can make decisions about unplanned recovery work and when additional authorisation is required. Ensure the support contact remains available when the website itself is down. Provide useful context with a report: the affected URL, expected behaviour, time of the incident and steps that reproduce it. This reduces time spent reconstructing the issue before somebody can investigate its cause.",
            ],
          },
          {
            id: "handover",
            heading: "5. Keep account access and handover manageable",
            paragraphs: [
              "Maintain an up-to-date inventory of the domain, hosting, source code, CMS and required external accounts. Use individual access where practical and limit permissions to what each person needs. Review access when staff or suppliers change. A maintenance agreement is easier to deliver when dependencies and responsible contacts are known instead of discovered during an incident.",
              "Finally, ask how cancellation and transfer work: which documentation, exports and accounts are handed over, and what support falls outside the existing arrangement? Schedule a periodic scope review. As the website gains languages, forms or integrations, the maintenance agreement should be able to change with it. That keeps the service aligned with the website your business actually operates.",
            ],
          },
        ],
      },
    },
  },
];

export const guideSlugFor = (guide: Guide, locale: AppLocale): string => guide.slug[locale];

/** A translated slug is valid only inside its matching locale. */
export const guideBySlug = (slug: string, locale: AppLocale): Guide | undefined =>
  guides.find((guide) => guide.slug[locale] === slug);

/** Locale-aware route resolver shared by metadata, sitemap and links. */
export const guideHrefFor = (guide: Guide) => (locale: AppLocale) => ({
  pathname: "/kennisbank/[slug]" as const,
  params: { slug: guideSlugFor(guide, locale) },
});

export function guideWordCount(copy: GuideCopy): number {
  const text = [
    copy.introduction,
    copy.takeaway,
    ...copy.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.checklist ?? []),
      ...(section.table ? [section.table.caption, ...section.table.headers, ...section.table.rows.flat()] : []),
    ]),
  ].join(" ");
  return text.trim().split(/\s+/u).length;
}

export const guideReadingMinutes = (copy: GuideCopy): number => Math.max(1, Math.ceil(guideWordCount(copy) / 200));
