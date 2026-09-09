import type { ClusterContentMap } from "./types";

/**
 * Landing page copy for the webshop / ecommerce cluster.
 *
 * Every claim here has to be defensible: 150+ projects in 17+ years, replies
 * within 24 hours, a free 30-minute intro call, a fixed price per phase, and
 * the client owns code and design. Two ecommerce references may be named:
 * Roetfilterkopen.com and LegacyCristal. No prices, no percentages, no awards.
 */
export const webshopClusterContent: ClusterContentMap = {
  /* --------------------------------------------------------------------- */
  /* WooCommerce                                                            */
  /* --------------------------------------------------------------------- */
  "woocommerce-webshop-laten-maken": {
    nl: {
      metaTitle: "WooCommerce webshop laten maken op maat",
      metaDescription:
        "WooCommerce webshop laten maken bij een Belgisch team dat het thema zelf schrijft: geen pluginberg, wel koppelingen, snelheid en een checkout die klopt.",
      h1: "Een WooCommerce webshop laten maken die niet vastloopt op plugins",
      lead: "WooCommerce draait op WordPress, en dat is meteen de reden waarom zoveel shops ermee starten: je kent het beheerscherm al en je kan alle kanten op. De keerzijde zie je een jaar later, wanneer twintig plugins elkaar in de weg zitten en niemand nog durft te updaten. Wij schrijven de logica die jij nodig hebt zelf, in code, zodat je shop snel en onderhoudbaar blijft.",
      sections: [
        {
          heading: "Wanneer WooCommerce de juiste keuze is",
          body: [
            "WooCommerce past goed als je verhaal en je verkoop op dezelfde plek staan. Een merk dat blogt, projecten toont of uitleg geeft en daarnaast producten verkoopt, beheert alles in één omgeving. Je redacteur en je magazijn werken in hetzelfde scherm, en dat scheelt een systeem.",
            "Het past ook als je catalogus overzichtelijk blijft: enkele honderden producten met varianten die je in één zin kan uitleggen. Zodra prijzen per klant verschillen of een product uit tien keuzes wordt samengesteld, wordt WooCommerce eerder een fundering dan een kant-en-klare oplossing.",
            "En het past als je de controle wil houden. Je kiest zelf je hosting, je data staat bij jou en er is geen platform dat morgen zijn voorwaarden aanpast. Dat is voor veel bedrijven precies de reden om een WooCommerce webshop laten maken hoger op de lijst te zetten dan een shop huren bij een gesloten platform.",
          ],
        },
        {
          heading: "Waar WooCommerce-shops stukgaan",
          body: [
            "Bijna elke trage WooCommerce-shop heeft hetzelfde probleem: elke functie is een plugin, elke plugin sleept eigen scripts en stijlen mee, en samen laden ze op elke pagina. Een productpagina die vier seconden nodig heeft, verliest bezoekers voor ze iets verkocht heeft.",
            "Het tweede probleem is update-angst. Als niemand nog weet welke plugin je checkout draaiende houdt, stel je updates uit, en dan wordt een snelheidsprobleem een veiligheidsprobleem. Een shop die niemand durft aan te raken, staat stil.",
            "Wij lossen dat op door de kern zelf te schrijven. Een eigen thema in code, geen page builder, en alleen extensies waar we een goede reden voor hebben. Alles wat specifiek is aan jouw bedrijf, van verzendregels tot een zoekfunctie die je klanten begrijpen, bouwen we als eigen code die we kunnen testen.",
          ],
        },
        {
          heading: "Wat we op WooCommerce doen",
          body: [
            "Nieuwe shops bouwen we WooCommerce op maat: eerst het ontwerp, dan het thema in code, dan de logica die je verkoopproces vraagt. Je krijgt geen instellingenscherm vol opties die je nooit aanraakt, maar precies de functies die jouw klanten gebruiken.",
            "Daarnaast nemen we bestaande shops over. Migreren van een ander platform, opruimen wat er door de jaren is bijgeplakt, koppelen aan je boekhouding, je voorraadsysteem en je verzendplatform, of de betalingen fatsoenlijk zetten via Mollie of Stripe, met Bancontact voor je Belgische klanten en iDEAL voor je Nederlandse.",
            "En we doen snelheidswerk. Queries die ontsporen zodra je catalogus groeit, afbeeldingen die te zwaar zijn, caching die verkeerd staat. We meten voor en na, zodat je ziet wat het heeft opgeleverd in plaats van dat je het moet geloven.",
          ],
        },
        {
          heading: "Samenwerken met een Belgisch team",
          body: [
            "Brisk zit in België en werkt voor klanten in België en Nederland. In ruim 17 jaar leverden we meer dan 150 websites, webshops, software- en appprojecten op, voor opdrachtgevers als NMBS, De Watergroep, IDEWE, de Belgische voetbalbond en museumPASSmusées.",
            "Zo begint het: een gratis kennismaking van 30 minuten waarin we je catalogus, je koppelingen en je planning doornemen. Daarna krijg je een voorstel met een vaste prijs per fase. Stuur je liever eerst een mail, dan heb je binnen 24 uur antwoord.",
            "Wat je bij oplevering krijgt, is van jou: code, design en data, met documentatie en toegang tot alles. Wil je later intern verder of met een ander WooCommerce bureau werken, dan kan dat zonder discussie.",
          ],
        },
      ],
      checklist: {
        title: "Wat er in een WooCommerce-traject zit",
        items: [
          "Een eigen thema in code, zonder page builder of gekocht template",
          "Productpagina's, filters en zoekfunctie afgestemd op jouw catalogus",
          "Checkout via Mollie of Stripe: Bancontact, iDEAL, kredietkaart, Apple Pay en betaling op factuur",
          "Koppelingen met boekhouding, voorraad en verzending",
          "Snelheidswerk met een meting voor en na",
          "Gestructureerde data, schone URL's en redirects vanaf je oude shop",
          "Overdracht met documentatie, toegangen en een korte opleiding voor je team",
        ],
      },
      faq: [
        {
          question: "Gebruiken jullie een bestaand WooCommerce-thema?",
          answer:
            "Nee, we schrijven het thema zelf in code en gebruiken geen page builder. Je shop laadt daardoor alleen wat ze echt nodig heeft, en aanpassingen gebeuren in code die we kunnen testen in plaats van in een instellingenscherm dat niemand meer overziet.",
        },
        {
          question: "Kan ik met WooCommerce Bancontact en iDEAL aanbieden?",
          answer:
            "Ja. Via Mollie of Stripe zet je Bancontact, iDEAL, kredietkaart, Apple Pay en overschrijving aan, en voor zakelijke klanten kunnen we betaling op factuur toevoegen. Welke methodes je nodig hebt, hangt af van de landen waarin je verkoopt.",
        },
        {
          question: "Hoeveel producten kan WooCommerce aan?",
          answer:
            "Duizenden producten zijn geen probleem als de hosting, de database en de caching goed staan. Wat een shop traag maakt is zelden het aantal producten, maar het aantal varianten, filters en prijsregels. Daarom testen we altijd met je echte catalogus en niet met voorbeelddata.",
        },
        {
          question: "Kan mijn team zelf producten en pagina's beheren?",
          answer:
            "Ja. Je beheert producten, teksten en pagina's gewoon in WordPress, en we ruimen het beheerscherm op zodat er staat wat je gebruikt. Bij de oplevering krijg je documentatie en een korte opleiding voor de mensen die er dagelijks in werken.",
        },
        {
          question: "Kunnen jullie een bestaande WooCommerce-shop overnemen?",
          answer:
            "Ja. We starten met een audit van je thema, je plugins en je snelheid, en zeggen daarna eerlijk of opschonen volstaat of je beter opnieuw begint. Een WooCommerce webshop laten bouwen op een gezonde basis is vaak goedkoper dan jaren blijven lappen aan een shop die al vastloopt.",
        },
        {
          question: "Wat kost een WooCommerce webshop?",
          answer:
            "Dat hangt af van je catalogus, je koppelingen en of er een bestaande shop gemigreerd moet worden. Na een gratis kennismaking van 30 minuten krijg je een voorstel met een vaste prijs per fase, zodat je weet wat elke stap kost voor we beginnen.",
        },
      ],
    },
    en: {
      metaTitle: "WooCommerce development for growing shops",
      metaDescription:
        "WooCommerce development from a Belgian studio: a theme written in code instead of bought, plus the integrations, checkout and speed work your shop needs.",
      h1: "WooCommerce development without the plugin pile-up",
      lead: "WooCommerce is WordPress with a shop attached, which is both its strength and its trap. The strength is that your content and your catalogue live in one place. The trap is that every new requirement becomes another plugin, until nobody dares press update on a Friday.",
      sections: [
        {
          heading: "Three questions before you commit to WooCommerce",
          body: [
            "First: who edits the site? If the people writing your pages are the same people adding products, WooCommerce saves you an entire second system and a second login. If your catalogue is managed in an ERP and the marketing team never touches it, that advantage disappears.",
            "Second: how complicated is your pricing? Flat prices and a few variants are comfortable territory. Prices per customer, per quantity or per contract are all possible, but at that point you are paying for custom logic anyway and the platform stops being the thing that saves you time.",
            "Third: who is responsible after launch? WooCommerce development makes sense when you want to own the hosting, the data and the roadmap, and when you have someone, in-house or with us, who keeps the stack current instead of letting it drift.",
          ],
        },
        {
          heading: "What we build, and what we refuse to bolt on",
          body: [
            "When we build a WooCommerce store the first thing we write is the theme, not a settings screen. No purchased template, no page builder, no library of blocks you will never open. The markup is ours, so the pages stay light and the design survives contact with real products.",
            "Business rules become code we can read and test. A shipping matrix, a compatibility check, a bundled product, a stock rule that depends on a supplier feed: these are the places where a generic extension quietly does something you did not ask for, and where custom WooCommerce work pays for itself.",
            "We do say no. If a requirement needs three overlapping plugins to half-work, we would rather write forty lines ourselves, or tell you the requirement belongs on a different platform. That conversation happens before the quote, not halfway through the build.",
          ],
        },
        {
          heading: "Existing stores: audit, migration, speed",
          body: [
            "Most of the WooCommerce work that reaches us is rescue work. We start with an audit: what the theme does, which plugins are load-bearing, where the database queries go sideways, and what the checkout drops on mobile. You get the findings whether or not you hire us for the fix.",
            "From there it is usually one of three jobs. Migrating in from another platform with the product data, customer accounts and URL structure intact. Rebuilding the front end on top of the catalogue you already have. Or connecting the shop to accounting, stock and shipping so orders stop being retyped by hand.",
            "Payments get their own pass. Mollie and Stripe both cover the methods this market expects, with Bancontact for Belgian shoppers and iDEAL for Dutch ones, plus cards, Apple Pay and pay-by-invoice for business accounts.",
          ],
        },
        {
          heading: "Working with a WooCommerce agency in Belgium",
          body: [
            "Brisk is based in Belgium and works with clients across Belgium and the Netherlands. Over 17-plus years we have delivered more than 150 websites, webshops, software products and mobile apps, for clients including NMBS, De Watergroep, IDEWE, the Belgian FA, museumPASSmusées, BMW, Nike and OpenAI.",
            "Projects start with a free 30-minute call. We go through your catalogue, your integrations and your deadline, then send a proposal with a fixed price per phase, so you can approve the build in steps rather than signing off a single opaque number. Email works too and you will hear back within 24 hours.",
            "Everything is handed over at the end: code, design, data, documentation and every access credential. You own it, which means continuing in-house or with another WooCommerce agency is a decision, not a hostage negotiation.",
          ],
        },
      ],
      checklist: {
        title: "Every build includes",
        items: [
          "A theme written from scratch, no marketplace template and no page builder",
          "Product pages, filters and search shaped around your actual catalogue",
          "Checkout through Mollie or Stripe with Bancontact, iDEAL, cards, Apple Pay and invoicing",
          "Integrations with accounting, stock and shipping systems",
          "A measured performance pass, before and after numbers included",
          "Structured data, clean URLs and redirects from the old shop",
          "Handover with documentation, credentials and a short training session",
        ],
      },
      faq: [
        {
          question: "Do you work on existing WooCommerce stores or only new builds?",
          answer:
            "Both. We take over existing stores regularly, starting with an audit of the theme, the plugin stack and the speed of the catalogue pages, and we tell you honestly whether cleaning up is enough or a rebuild is the cheaper path over two years.",
        },
        {
          question: "Is WooCommerce fast enough for a large catalogue?",
          answer:
            "Yes, when it is built for it. Speed problems in WooCommerce almost always come from the theme, the plugin stack and unindexed queries rather than the number of products, so we test against your real catalogue and fix the layer that is actually slow.",
        },
        {
          question: "Which payment methods should a Belgian or Dutch WooCommerce store offer?",
          answer:
            "Bancontact is the default for Belgian shoppers and iDEAL is the default in the Netherlands, so a shop selling into both needs both. We add them through Mollie or Stripe alongside cards, Apple Pay, bank transfer and pay-by-invoice for business customers.",
        },
        {
          question: "Can we keep our WordPress content while rebuilding the shop?",
          answer:
            "Yes. Pages, posts and media stay where they are while we replace the theme and the commerce layer, which keeps your existing URLs and the search rankings attached to them intact. Where URLs do have to change, we map redirects before launch.",
        },
        {
          question: "Who owns the code when the project ends?",
          answer:
            "You do. The code, the design files and the data are yours on delivery, together with documentation and administrator access to every service involved, so nothing about the handover depends on us staying in the picture.",
        },
      ],
    },
  },

  /* --------------------------------------------------------------------- */
  /* Shopify                                                                */
  /* --------------------------------------------------------------------- */
  "shopify-webshop-laten-maken": {
    nl: {
      metaTitle: "Shopify webshop laten maken met eigen thema",
      metaDescription:
        "Shopify webshop laten maken met een thema dat wij zelf schrijven in plaats van kopen. Eerlijk advies over wanneer Shopify past en wanneer maatwerk beter is.",
      h1: "Shopify webshop laten maken met een thema dat van jou is",
      lead: "Shopify neemt hosting, beveiliging en betalingen van je over, en dat is de tijdwinst waar het platform zijn reputatie aan dankt. Wat het niet doet, is jouw merk bedenken of jouw verkooplogica begrijpen. Daar begint ons werk: een thema dat we zelf schrijven, met de flows die bij jouw producten horen.",
      sections: [
        {
          heading: "Waar Shopify je echt tijd bespaart",
          body: [
            "Je hoeft niet na te denken over servers, updates of piekverkeer tijdens een campagne. Het platform blijft draaien, ook op de dag dat je nieuwsbrief goed werkt. Voor een merk zonder technisch team is dat een reëel voordeel dat je in geld noch in stress moet onderschatten.",
            "Betalingen en verzending zijn er ingebouwd. Bancontact voor je Belgische klanten en iDEAL voor je Nederlandse zet je aan via Shopify Payments of via een provider als Mollie of Stripe, en de rest van de wereld betaalt met kaart of Apple Pay.",
            "En het beheer is eenvoudig genoeg om aan je team te geven. Producten, kortingen, voorraad en bestellingen staan in één scherm, zonder dat iemand een handleiding nodig heeft. Wie snel wil starten met een afgebakend aanbod, doet er verstandig aan een Shopify webshop laten maken serieus te overwegen.",
          ],
        },
        {
          heading: "Waar Shopify je begrenst",
          body: [
            "De checkout is het domein van het platform. Je kan er veel aan tonen en meten, maar niet elke stap herschrijven zoals je zelf wil. Verkoop je iets dat een berekening, een keuring of een offerte nodig heeft voor er betaald wordt, dan bots je daar vroeg of laat tegenaan.",
            "De tweede grens is de app-stapel. Elke extra functie is een app met een eigen abonnement en een eigen stuk JavaScript op je pagina. Tien apps later betaal je elke maand voor functies die je één keer nodig had en laadt je shop merkbaar trager.",
            "De derde is B2B-logica. Klantspecifieke prijzen, staffels en bestellimieten kunnen, maar hoe fijnmaziger je afspraken, hoe meer je tegen het platform aan het duwen bent. Op dat punt zeggen we het gewoon: een shop op maat is dan goedkoper en rustiger dan Shopify blijven oprekken.",
          ],
        },
        {
          heading: "Een Shopify thema op maat, of headless",
          body: [
            "We kopen geen thema in de Theme Store. We ontwerpen je shop en schrijven daarna het Shopify thema op maat in Liquid, met alleen de secties die je redactie echt gebruikt. Dat houdt de shop licht en zorgt dat je merk niet lijkt op de tien andere shops die hetzelfde template kochten.",
            "Is je front-end ambitieuzer, dan gaan we headless: Shopify blijft de motor voor producten, orders en betalingen, terwijl de winkel zelf een aparte applicatie is. Dat kost meer werk en het is niet voor iedereen, dus we stellen het alleen voor als je er iets aan hebt.",
            "Verder doen we het minder zichtbare werk: koppelingen met je boekhouding, voorraad en verzendlabels, productdata die uit een ERP komt, en snelheidswerk op shops die door de jaren te veel apps hebben verzameld.",
          ],
        },
        {
          heading: "Zo verloopt een traject",
          body: [
            "Het begint met een gratis kennismaking van 30 minuten. Daarin kijken we naar je aanbod, je markten en je koppelingen, en zeggen we of Shopify voor jou de juiste keuze is. Soms is het antwoord nee, en dan hoor je dat voor er een offerte ligt.",
            "Daarna krijg je een voorstel met een vaste prijs per fase: ontwerp, thema, koppelingen, migratie, lancering. Je ziet elke week wat er gebouwd is, en mail je tussendoor een vraag, dan heb je binnen 24 uur antwoord. Als Shopify bureau blijven we ook na de lancering aanspreekbaar voor wijzigingen en groei.",
            "Het thema, het ontwerp en alle code die wij schrijven zijn van jou. Je Shopify-account staat op jouw naam, en wil je later een Shopify webshop laten bouwen door iemand anders of intern verder, dan neem je alles mee.",
          ],
        },
      ],
      faq: [
        {
          question: "Kopen jullie een thema uit de Shopify Theme Store?",
          answer:
            "Nee. We ontwerpen je shop en schrijven het thema daarna zelf in Liquid, zodat je alleen de functies en de code hebt die bij jouw producten horen. Een gekocht thema sleept altijd instellingen en scripts mee voor winkels die niet de jouwe zijn.",
        },
        {
          question: "Wanneer raden jullie Shopify af?",
          answer:
            "Als je verkoopproces vraagt om een checkout die je zelf wil herschrijven, om klantspecifieke prijsafspraken tot op productniveau, of om een configurator die de prijs berekent voor er betaald wordt. In die gevallen is een shop op maat meestal eenvoudiger en op termijn goedkoper.",
        },
        {
          question: "Kan ik met Shopify Bancontact en iDEAL aanbieden?",
          answer:
            "Ja. Bancontact voor de Belgische markt en iDEAL voor de Nederlandse zet je aan via Shopify Payments of via een externe provider zoals Mollie of Stripe, naast kredietkaart, Apple Pay en overschrijving.",
        },
        {
          question: "Kunnen jullie onze bestaande Shopify-shop overnemen?",
          answer:
            "Ja. We starten met een doorlichting van je thema, je apps en je paginasnelheid, en pakken daarna aan wat het meeste oplevert. Dat kan een nieuw thema zijn, maar even goed het schrappen van apps die je dubbel betaalt.",
        },
        {
          question: "Wat gebeurt er met mijn shop als ik van Shopify weg wil?",
          answer:
            "Je producten, klanten en bestellingen exporteer je, en het thema dat wij schreven is jouw eigendom. Wat je niet meeneemt zijn de apps en de checkout van het platform zelf, dus een vertrek is altijd deels een herbouw. Dat weeg je best mee voor je start.",
        },
      ],
    },
    en: {
      metaTitle: "Shopify development for Belgian and Dutch brands",
      metaDescription:
        "Shopify development that starts with an empty theme file: custom Liquid, headless when it earns its keep, plus migrations, integrations and speed work.",
      h1: "Shopify development that starts with a blank theme",
      lead: "Shopify is rented infrastructure, and renting is often the right call. What you cannot rent is a storefront that looks like your brand and a flow that matches how your product is actually chosen. That part we write.",
      sections: [
        {
          heading: "The trade you are making",
          body: [
            "You give up control of the infrastructure and you get uptime, PCI compliance and a payment stack that works on day one. For a small team that trade is almost always worth it, because none of those things sell anything but all of them can sink you.",
            "You also accept a monthly cost that grows with your app list. Each app is a subscription and a script on the page, so the shop that felt fast in month one can feel sluggish in month twelve without anyone changing the design.",
            "And you accept the platform's checkout. You can style and measure it, you cannot rebuild it from scratch. If your product needs a quote, an eligibility check or a configurator before payment, that limit shows up early and it decides the project.",
          ],
        },
        {
          heading: "How we approach a build",
          body: [
            "Design first, then Liquid. We write a custom Shopify theme from an empty file, with only the sections your editors will actually use, which keeps the admin honest and the pages light. Nothing arrives from a marketplace and nothing ships that we cannot explain line by line.",
            "Then the parts that are invisible until they break: product data coming out of an ERP or a supplier feed, accounting and stock integrations, shipping labels, and structured data so product pages present properly in search results.",
            "Going headless is a real option, not a default. Shopify keeps handling products, orders and payments while the storefront becomes its own application. It buys you freedom in the front end and costs you complexity everywhere else, so we recommend it only when the storefront is the thing that differentiates you.",
          ],
        },
        {
          heading: "Moving on and off the platform",
          body: [
            "Migrating in usually means mapping products, variants, customers and order history, then mapping every old URL to a new one so the traffic you already earned arrives at the right page instead of a 404.",
            "Migrating out is the harder direction, and we say so plainly. Your catalogue and customers export cleanly, the theme code is yours, but apps and the hosted checkout do not travel. Anyone who tells you the move is a copy-paste has not done one.",
            "We also do maintenance work on stores we did not build: pruning the app stack, fixing the cumulative layout shift that arrived with a badge widget, or rewriting collection pages that got slow as the catalogue grew.",
          ],
        },
        {
          heading: "What working with us looks like",
          body: [
            "Every project opens with a free 30-minute call in which we ask what you sell, where you sell it and what has to talk to what. If Shopify is the wrong fit we say so there, before anyone writes a proposal. That is the least expensive moment to change your mind.",
            "After that you get a fixed price per phase and a weekly look at what has been built. Questions in between get an answer within 24 hours. As a Shopify agency based in Belgium we work across Belgium and the Netherlands, which means the payment and shipping expectations of both markets are already in the plan.",
            "When you decide to build a Shopify store with us, the theme and every line we write are yours at handover. The account stays in your name and the documentation goes with it.",
          ],
        },
      ],
      faq: [
        {
          question: "Do you use themes from the Shopify Theme Store?",
          answer:
            "No. We design the store and then write the theme ourselves in Liquid, so the code contains only what your shop uses. Bought themes carry settings, scripts and layout options built for other people's catalogues, and that weight never fully goes away.",
        },
        {
          question: "Should we go headless on Shopify?",
          answer:
            "Only if the storefront experience is a genuine differentiator for your brand, because headless adds a second codebase to build and maintain. For most catalogues a well-written Liquid theme is faster to ship, cheaper to run and just as quick for the shopper.",
        },
        {
          question: "Can Shopify handle B2B pricing?",
          answer:
            "It handles customer groups, quantity breaks and separate wholesale storefronts reasonably well. Once you need contract prices negotiated per customer per product, approval flows or credit limits, you are working against the platform and a custom build is usually the calmer answer.",
        },
        {
          question: "How do apps affect the speed of a Shopify store?",
          answer:
            "Each app injects its own scripts and styles into your pages, so a long app list shows up directly in load time and in Core Web Vitals. Part of our maintenance work is auditing that list and replacing the ones we can cover in the theme itself.",
        },
        {
          question: "Can you take over a Shopify store built by someone else?",
          answer:
            "Yes. We start with a review of the theme, the app stack and the page speed, then propose the smallest set of changes that moves the needle. Sometimes that is a new theme and sometimes it is removing three apps and rewriting a collection template.",
        },
      ],
    },
  },

  /* --------------------------------------------------------------------- */
  /* Magento / Shopware                                                     */
  /* --------------------------------------------------------------------- */
  "magento-shopware-webshop-laten-maken": {
    nl: {
      metaTitle: "Magento of Shopware webshop laten maken",
      metaDescription:
        "Magento of Shopware webshop laten maken? We leggen uit wanneer een enterprise platform je geld waard is, wanneer maatwerk lichter uitvalt, en wat wij doen.",
      h1: "Magento of Shopware webshop laten maken: wanneer dat de juiste keuze is",
      lead: "Magento en Shopware zijn zware platformen, en dat is geen verwijt. Ze bestaan voor catalogi met duizenden artikelen, meerdere winkels in meerdere landen en een ERP die de waarheid bevat. De vraag is niet welk platform het beste is, maar of je bedrijf er vandaag genoeg van gebruikt om de kost te verantwoorden.",
      sections: [
        {
          heading: "Twee platformen, twee karakters",
          body: [
            "Magento bestaat in twee smaken: de open source-versie en Adobe Commerce, de commerciële uitvoering met extra functies en ondersteuning. Het is sterk in complexe productstructuren, meerdere winkels onder één beheer en fijnmazige rechten. Het vraagt in ruil serieuze hosting en mensen die het platform echt kennen.",
            "Shopware komt uit Duitsland en is in de Benelux en de DACH-regio breed ingeburgerd. Shopware 6 is API-first opgebouwd, wat koppelen met een ERP of PIM aangenamer maakt, en de beheeromgeving is voor een marketingteam makkelijker te leren dan die van Magento.",
            "In de praktijk verschilt de keuze minder door de featurelijst dan door je omgeving: welke systemen je al draait, wie de shop na de lancering beheert, en welke partij je op lange termijn naast je wil. Wie een Shopware webshop laten maken overweegt, kiest meestal ook voor die lichtere leercurve.",
          ],
        },
        {
          heading: "De eerlijke test: heb je zoveel platform nodig",
          body: [
            "Vier signalen wijzen richting enterprise: meerdere storefronts of landen met eigen prijzen en btw-regels, duizenden artikelen met rijke attributen, prijsafspraken per klant, en een ERP of PIM die het echte beheer doet. Herken je er drie van de vier, dan is een Magento webshop laten maken of Shopware inzetten een verdedigbare keuze.",
            "Herken je er één, dan koop je vooral overhead. Enterprise platformen brengen upgrades, hosting, specialisten en licenties mee, en die kosten lopen door in de jaren waarin je niets nieuws bouwt. Dat is de rekening die bedrijven het vaakst onderschatten.",
            "Wij bouwen zelf het liefst op maat, en toch zeggen we regelmatig dat een standaardplatform de betere keuze is. Andersom ook: soms is een enterprise webshop laten bouwen precies waar je bent, en dan is een maatwerkproject een omweg. Wat we niet doen, is een platform aanraden omdat het toevallig ons antwoord is.",
          ],
        },
        {
          heading: "Wat wij op Magento en Shopware doen",
          body: [
            "Nieuwe implementaties: ontwerp, front-end, catalogusstructuur, prijs- en klantgroepenlogica, en de koppelingen die de shop met je administratie verbinden. Geen gekochte templates, wel een front-end die wij schrijven op de motor die je koos.",
            "Migraties in beide richtingen. Van een verouderde Magento-installatie naar een actuele versie of naar Shopware, of net van een enterprise platform naar een lichtere maatwerkshop wanneer blijkt dat je maar een kwart van de functionaliteit gebruikt. Productdata, klanten, bestelhistoriek en URL's gaan mee.",
            "En doorlopend werk: koppelingen met ERP, PIM en verzendplatformen, betalingen via Mollie of Stripe met Bancontact en iDEAL, en performance. Op grote catalogi zit de winst in indexering, caching en zoekopdrachten, niet in het comprimeren van nog een afbeelding.",
          ],
        },
        {
          heading: "Waar deze projecten misgaan",
          body: [
            "Meestal niet in de code, maar in de data. Productattributen die per leverancier anders heten, prijzen die in drie systemen bestaan, voorraad die alleen in het hoofd van de magazijnier klopt. Wij beginnen daarom met de datastructuur, voor er ook maar één scherm ontworpen wordt.",
            "De tweede valkuil is de scope in één blok gieten. Wij knippen zulke trajecten in fases met een vaste prijs per fase, zodat je na elke fase iets werkends hebt en zelf beslist wat er daarna komt. Als Adobe Commerce bureau of Shopware-partner verandert dat principe niet.",
            "Start doe je met een gratis kennismaking van 30 minuten waarin we je catalogus, je systemen en je team doornemen. Mail je liever eerst je vraag, dan krijg je binnen 24 uur antwoord van iemand die het project ook effectief zou doen.",
          ],
        },
      ],
      faq: [
        {
          question: "Is Magento hetzelfde als Adobe Commerce?",
          answer:
            "Ze delen dezelfde basis. Magento Open Source is de gratis versie die je zelf host en onderhoudt, Adobe Commerce is de commerciële uitvoering met extra functionaliteit en ondersteuning van Adobe. De keuze hangt af van je schaal, je budget en hoeveel je zelf in beheer wil nemen.",
        },
        {
          question: "Magento of Shopware, wat kiezen we?",
          answer:
            "Kijk eerst naar je omgeving in plaats van naar de featurelijsten. Draait je catalogus in een PIM of ERP en wil je vlot koppelen, dan is Shopware 6 vaak aangenamer. Heb je meerdere winkels met complexe rechten en zit die kennis al in je team, dan blijft Magento verdedigbaar.",
        },
        {
          question: "We draaien nog op een oude Magento-versie. Wat nu?",
          answer:
            "Een niet-ondersteunde versie krijgt geen beveiligingsupdates meer, dus stilstaan is geen optie. We brengen in kaart wat je vandaag echt gebruikt en zetten daar een migratieplan tegenover: upgraden, overstappen naar Shopware, of terugvallen op een lichtere shop op maat.",
        },
        {
          question: "Kunnen jullie koppelen met ons ERP?",
          answer:
            "Ja. Producten, prijzen, voorraad, klanten en bestellingen synchroniseren we via de API van je ERP of PIM, met duidelijke afspraken over welk systeem de waarheid bevat. Bestaat er geen bruikbare API, dan bouwen we een tussenlaag die de gegevens betrouwbaar doorgeeft.",
        },
        {
          question: "Doen jullie ook onderhoud na de lancering?",
          answer:
            "Ja. Updates, koppelingen die veranderen, nieuwe landen, seizoenspieken en performance zijn doorlopend werk. We spreken vooraf af hoeveel begeleiding je wil, zodat je niet betaalt voor een contract dat je niet gebruikt.",
        },
      ],
    },
    en: {
      metaTitle: "Magento and Shopware development for big catalogues",
      metaDescription:
        "Magento and Shopware development for large catalogues, multiple storefronts and ERP-driven data — plus an honest read on whether you need that much platform.",
      h1: "Magento and Shopware development, without the platform religion",
      lead: "Enterprise ecommerce platforms solve enterprise problems: thousands of SKUs, several storefronts, per-customer pricing and an ERP that owns the truth. They also charge rent for that power every month you are not using it. This page is about telling those two situations apart.",
      sections: [
        {
          heading: "What each platform is actually good at",
          body: [
            "Magento development suits catalogues with deep attribute structures and businesses running several storefronts, currencies and tax regimes from one back office. Adobe Commerce adds commercial features and vendor support on top of the open source edition. The price of that reach is heavier hosting and specialists who know the platform well.",
            "Shopware development suits teams who want an API-first core and an admin their marketers can learn. Shopware 6 was built for integration, which shows the moment product data comes from a PIM or an ERP rather than being typed into the shop.",
            "Neither choice is really about features. It is about which systems already run your business, who maintains the shop after launch, and whether you can hire for the platform in your market a year from now.",
          ],
        },
        {
          heading: "A test before you spend anything",
          body: [
            "Count how many of these are true today: multiple country storefronts, thousands of SKUs with rich attributes, prices negotiated per customer, and a central system that already owns product data. Three or four means an enterprise ecommerce build is defensible. One means you are about to buy maintenance you will never use.",
            "The number that decides these projects is rarely the build. It is the running cost: hosting, upgrades, extension licences and the specialists who apply them, spread over the quiet years when nothing new ships.",
            "We prefer to build custom, and we still recommend a standard platform when it fits. The reverse happens just as often: a company on an enterprise stack using a quarter of it is usually happier, faster and cheaper on a purpose-built shop.",
          ],
        },
        {
          heading: "What we do on these platforms",
          body: [
            "New implementations: information architecture for the catalogue, front end written by us rather than bought, pricing and customer-group logic, and the integrations that connect the shop to the systems around it.",
            "Migrations in both directions. Old Magento installations to a supported version or across to Shopware, and enterprise stacks down to a lighter custom shop. Product data, customers, order history and the entire URL map travel with the move.",
            "Ongoing work: ERP and PIM integrations, Mollie or Stripe with Bancontact and iDEAL for the Benelux, and performance work that lives in indexing, caching and search rather than in image compression, because that is where large catalogues actually lose their seconds.",
          ],
        },
        {
          heading: "How we run the project",
          body: [
            "Data comes before design. Attribute names that differ per supplier, prices that exist in three systems, stock that is only correct in the warehouse manager's head: unpicking that is the real work, and doing it late is what turns a schedule into a rescue.",
            "We cut the work into phases with a fixed price for each, so something usable exists at the end of every one and you decide what gets built next. Working with us as your Adobe Commerce agency does not change that structure, and neither does the size of the catalogue.",
            "Brisk is Belgian, works across Belgium and the Netherlands, and has delivered more than 150 projects over 17-plus years. Start with a free 30-minute call, or send an email and get an answer within 24 hours.",
          ],
        },
      ],
      faq: [
        {
          question: "Is Adobe Commerce the same product as Magento?",
          answer:
            "They share a codebase. Magento Open Source is the free edition you host and maintain yourself, while Adobe Commerce is the commercial edition with additional features and vendor support. Which one fits depends on your scale, your budget and how much operational work you want to keep in-house.",
        },
        {
          question: "How do we choose between Magento and Shopware?",
          answer:
            "Start from your surroundings rather than the feature comparison. If product data lives in a PIM or ERP and integration is the main job, Shopware 6 is usually the smoother path. If you already run several storefronts with complex permissions and your team knows Magento, staying is reasonable.",
        },
        {
          question: "Can you rescue a project someone else started?",
          answer:
            "Yes, and it is a large part of what we do on these platforms. We audit the current build, document what works, and propose the shortest route to a shop you can safely launch, which sometimes means finishing the existing work and sometimes means replacing part of it.",
        },
        {
          question: "How do you handle upgrades on an enterprise platform?",
          answer:
            "By keeping customisations out of the core and behind clear interfaces, so an upgrade touches our code in known places instead of everywhere at once. We also plan upgrades as their own phase with their own budget, because pretending they are free is how shops end up years behind.",
        },
        {
          question: "Do you build the front end or only the back end?",
          answer:
            "Both. Design, front end, catalogue logic and integrations are one team here, which matters on these platforms because a beautiful storefront on a badly modelled catalogue still performs badly and nobody can tell you why.",
        },
      ],
    },
  },

  /* --------------------------------------------------------------------- */
  /* B2B                                                                    */
  /* --------------------------------------------------------------------- */
  "b2b-webshop-laten-maken": {
    nl: {
      metaTitle: "B2B webshop laten maken met eigen prijsregels",
      metaDescription:
        "B2B webshop laten maken met klantspecifieke prijzen, staffels, een klantportaal en een koppeling met je ERP. Gebouwd op maat, in België en Nederland.",
      h1: "Een B2B webshop laten maken waar je klanten in vijf minuten bestellen",
      lead: "Je zakelijke klant hoeft niet overtuigd te worden. Die weet welk artikel hij nodig heeft, welke prijs jullie afspraken en wanneer het geleverd moet zijn. Een B2B webshop is daarom geen etalage, maar een besteltool: hoe sneller een vaste klant zijn order rond heeft, hoe vaker hij terugkomt.",
      sections: [
        {
          heading: "B2B verkoopt anders dan B2C",
          body: [
            "In B2C draait alles om de eerste aankoop: sfeerbeelden, reviews, twijfel wegnemen. In B2B gaat het om de tweeëntwintigste bestelling van dezelfde klant. Zoeken op artikelnummer, een vorige order herhalen, een bestellijst uploaden en afronden zonder één overbodige vraag.",
            "Dat verandert de hele interface. Grote productfoto's maken plaats voor specificaties, verpakkingseenheden, voorraadstatus per magazijn en levertermijnen. Een goede B2B webshop laten maken betekent dus vooral: overbodige stappen schrappen die in een B2C-shop juist helpen.",
            "Het betekent niet dat design er niet toe doet. Ook een inkoper werkt liever in een scherm dat rustig en duidelijk is. Wil je daarnaast rechtstreeks aan consumenten verkopen, dan kan je een B2C webshop laten maken op dezelfde catalogus, met een eigen prijsweergave en een eigen checkout.",
          ],
        },
        {
          heading: "Prijzen zijn het moeilijkste deel",
          body: [
            "Een webshop met staffelprijzen is de eenvoudigste vorm: vanaf tien stuks een andere prijs, vanaf honderd nog een. Daarna wordt het interessanter, met kortingspercentages per productgroep, contractprijzen per klant en acties die daar bovenop of net niet bovenop komen.",
            "Wie welke prijs ziet, is een rechtenvraag. Prijzen tonen we pas na inloggen als jij dat wil, met btw-nummers die gevalideerd worden en bedragen die standaard exclusief btw staan. Zolang deze regels in Excel of in iemands hoofd zitten, kan je shop ze niet uitvoeren.",
            "Wij zetten die logica daarom eerst op papier en pas daarna in code, met jouw ERP of boekhoudpakket als bron van waarheid. Verandert een prijsafspraak daar, dan verandert ze in de shop, zonder dat iemand ergens iets moet naspelen.",
          ],
        },
        {
          heading: "Het klantportaal doet het echte werk",
          body: [
            "Een webshop met klantportaal laten maken is meestal de kern van de opdracht. Achter de login staat de bestelgeschiedenis, de openstaande facturen, de leveringen die onderweg zijn, de offertes die nog getekend moeten worden en de bestellijsten die je klant zelf samenstelt.",
            "Grotere klanten hebben er meerdere gebruikers per account, elk met eigen rechten: wie mag bestellen, wie mag goedkeuren, wie mag alleen kijken. Bestellimieten en goedkeuringsstappen zijn geen luxe maar de reden waarom een inkoopafdeling überhaupt online durft te bestellen.",
            "Voor herhaalleveringen bouwen we abonnementen in. Een webshop met abonnementen laten maken is ook in B2B logisch: vaste hoeveelheden op een vast ritme, met een pauzeknop en een duidelijk overzicht van wat er wanneer vertrekt.",
          ],
        },
        {
          heading: "Koppelingen bepalen of het werkt",
          body: [
            "Een webshop voor groothandel laten maken zonder koppeling met je voorraad is vragen om beloftes die je niet kan waarmaken. Producten, prijzen, voorraad en klanten komen uit je ERP, bestellingen gaan de andere kant op, en niemand typt nog iets over.",
            "Betalen gebeurt in B2B vaak op factuur, met een kredietlimiet en betaaltermijn per klant. Daarnaast bieden we de gewone methodes aan via Mollie of Stripe: Bancontact in België, iDEAL in Nederland, kredietkaart en overschrijving.",
            "We werken vanuit België voor klanten in België en Nederland, en leverden in ruim 17 jaar meer dan 150 projecten op. Begin met een gratis kennismaking van 30 minuten; daarna krijg je een voorstel met een vaste prijs per fase, en op mails antwoorden we binnen 24 uur.",
          ],
        },
      ],
      checklist: {
        title: "Wat een B2B-shop bij ons kan",
        items: [
          "Klantspecifieke prijzen, staffels en contractafspraken uit je ERP",
          "Prijzen exclusief btw, met validatie van btw-nummers",
          "Klantportaal met bestelhistoriek, facturen, offertes en bestellijsten",
          "Meerdere gebruikers per klant met rollen, bestellimieten en goedkeuring",
          "Snel bestellen op artikelnummer en via een geüploade bestellijst",
          "Betaling op factuur naast Bancontact, iDEAL, kaart en overschrijving",
          "Koppeling met ERP, voorraad, boekhouding en verzendplatform",
        ],
      },
      faq: [
        {
          question: "Moeten klanten inloggen om prijzen te zien?",
          answer:
            "Dat beslis jij. We kunnen prijzen volledig verbergen tot na de login, een adviesprijs tonen aan bezoekers en de afgesproken prijs pas na het aanmelden, of alles openbaar laten. De catalogus zelf blijft in de meeste gevallen zichtbaar, want die moet gevonden worden in Google.",
        },
        {
          question: "Kan één webshop B2B en B2C tegelijk bedienen?",
          answer:
            "Ja, met één catalogus en twee gezichten: consumenten zien prijzen inclusief btw en een klassieke checkout, zakelijke klanten zien hun eigen prijzen, staffels en betaling op factuur. Dat scheelt dubbel productbeheer en is meestal goedkoper dan twee aparte shops.",
        },
        {
          question: "Hoe koppelen jullie aan ons ERP?",
          answer:
            "Via de API van je ERP synchroniseren we producten, prijzen, voorraad, klanten en bestellingen, met heldere afspraken over welk systeem in welk geval de waarheid bevat. Heeft je ERP geen bruikbare API, dan bouwen we een tussenlaag die exports en imports betrouwbaar afhandelt.",
        },
        {
          question: "Kunnen klanten op factuur betalen?",
          answer:
            "Ja. Betaling op factuur zetten we aan per klant of per klantgroep, eventueel met een kredietlimiet en een betaaltermijn die uit je boekhouding komt. Nieuwe klanten kunnen intussen vooruitbetalen tot hun dossier goedgekeurd is.",
        },
        {
          question: "Kunnen we starten met een deel en later uitbreiden?",
          answer:
            "Ja, en dat raden we vaak aan. Fase één is meestal bestellen met correcte prijzen en een koppeling met je voorraad. Goedkeuringsstappen, abonnementen en uitgebreide rapportering komen daarna, wanneer je klanten het portaal echt gebruiken.",
        },
      ],
    },
    en: {
      metaTitle: "B2B ecommerce development for wholesalers",
      metaDescription:
        "B2B ecommerce development with contract pricing, tiered pricing, a customer portal and ERP integration. Custom-built by a Belgian team for Benelux traders.",
      h1: "B2B ecommerce development for buyers who already know what they want",
      lead: "Your business customer is not browsing. They have a part number, an agreed price and a delivery date to hit. B2B ecommerce development is therefore an exercise in removing steps, not adding persuasion, and the shops that win are the ones where a repeat order takes under a minute.",
      sections: [
        {
          heading: "Design for the twenty-second order, not the first",
          body: [
            "Consumer shops are built around a stranger's first purchase. A wholesale webshop is built around a regular's next one: search by article code, reorder from history, upload an order list, done. Every element that exists to reassure a first-time buyer is friction for someone placing their weekly order.",
            "That changes the layout. Specifications, pack sizes, stock per warehouse and lead times outrank photography. Dense tables beat generous cards. The customer wants to compare four variants without scrolling past a lifestyle image of a warehouse.",
            "It does not mean design stops mattering. A buyer working through forty lines deserves a screen that stays calm at line thirty-nine, and clarity there is worth more than any visual flourish.",
          ],
        },
        {
          heading: "Pricing is a permission system",
          body: [
            "Tiered pricing is the easy layer: one price from ten units, another from a hundred. Underneath sit discount percentages per product group, contract prices per customer, promotions that may or may not stack, and prices that expire on a date somebody agreed by phone two years ago.",
            "Who sees which number is an access question. Prices can be hidden until login, split into list price and your price, or shown net of VAT with VAT numbers validated at registration. All of that has to be modelled before it can be built.",
            "We put those rules in writing first and in code second, with your ERP as the source of truth. When a contract price changes there, it changes in the shop, and nobody maintains a second version of reality in a spreadsheet.",
          ],
        },
        {
          heading: "The portal is the product",
          body: [
            "Ecommerce with a customer portal is what most B2B clients are really buying. Behind the login: order history, open invoices, shipments in transit, quotes awaiting approval and saved order lists the customer builds themselves.",
            "Larger accounts need several users with different rights, because the person who chooses the goods is rarely the person allowed to commit the money. Roles, spending limits and an approval step are what make a procurement department comfortable ordering online at all.",
            "Subscription commerce belongs here too. Recurring deliveries on a fixed rhythm, with a pause button, a clear schedule and an invoice that matches what actually shipped, remove a standing item from someone's to-do list every month.",
          ],
        },
        {
          heading: "Where B2B projects go wrong",
          body: [
            "Almost always in the data. Stock that is accurate in the ERP but not on the shelf, article descriptions written for a printed catalogue, three overlapping discount schemes nobody has reconciled since 2019. We start there, because a shop cannot enforce rules that have never been written down.",
            "The second failure is scope in one lump. We split the work into phases with a fixed price per phase, so the first release does the thing that matters most, usually ordering at the right price against live stock, and later phases add approvals, subscriptions and reporting.",
            "A B2C webshop can share the same catalogue, with consumer pricing and a lighter checkout on a separate front end. That is often cheaper than running two shops, and it keeps product management in one place.",
          ],
        },
      ],
      checklist: {
        title: "Standard in a B2B build with us",
        items: [
          "Customer-specific and contract pricing synced from your ERP",
          "Quantity breaks, product-group discounts and net pricing with VAT validation",
          "Customer portal: orders, invoices, quotes, shipments and saved lists",
          "Multiple users per account with roles, limits and approval steps",
          "Fast reordering by article code and by uploaded order list",
          "Pay by invoice alongside Bancontact, iDEAL, cards and bank transfer",
          "Integrations with ERP, stock, accounting and shipping",
        ],
      },
      faq: [
        {
          question: "Should prices be hidden behind a login?",
          answer:
            "It depends on your market, and both options are straightforward to build. Hiding prices protects negotiated agreements, while showing a list price keeps your product pages useful in search results. Many of our clients show a public list price and reveal the customer's own price after login.",
        },
        {
          question: "Can one shop serve both business and consumer customers?",
          answer:
            "Yes. One catalogue can drive two experiences: consumers see gross prices and a standard checkout, business accounts see their agreed prices, quantity breaks and invoice payment. That is usually cheaper to run than two separate shops with duplicated product data.",
        },
        {
          question: "How does the shop stay in sync with our ERP?",
          answer:
            "Products, prices, stock, customers and orders synchronise through your ERP's API, with explicit rules about which system wins in a conflict. Where no usable API exists we build a middle layer that handles scheduled exports and imports reliably instead of hoping a nightly file arrives.",
        },
        {
          question: "Can customers pay on invoice?",
          answer:
            "Yes. Invoice payment is enabled per customer or customer group, optionally with a credit limit and payment terms taken from your accounting system, while new accounts pay upfront until their file is approved.",
        },
        {
          question: "How long before the first version is usable?",
          answer:
            "That depends on how clean your product and pricing data is, which is why we look at it in the first call. After that call you get a phased plan with fixed prices, and the first phase is scoped to be genuinely useful on its own rather than a demo.",
        },
      ],
    },
  },

  /* --------------------------------------------------------------------- */
  /* Migration                                                              */
  /* --------------------------------------------------------------------- */
  "webshop-laten-migreren": {
    nl: {
      metaTitle: "Webshop laten migreren zonder SEO-verlies",
      metaDescription:
        "Webshop laten migreren naar een ander platform, zonder je Google-posities of je bestelhistoriek kwijt te spelen. Redirects, data en een geplande switch.",
      h1: "Je webshop laten migreren zonder je posities te verliezen",
      lead: "Een migratie is geen kopieerwerk. Je verhuist producten, klanten, bestellingen, URL's en jaren opgebouwde vindbaarheid tegelijk, en de fouten worden pas zichtbaar wanneer je verkeer al weg is. Daarom bouwen we eerst het volledige nieuwe geheel, en zetten we pas om wanneer alles klopt.",
      sections: [
        {
          heading: "Wanneer migreren de moeite waard is",
          body: [
            "Het duidelijkste signaal is stilstand: elke wijziging duurt weken, je kan geen betaalmethode toevoegen zonder een extensie die je platform niet ondersteunt, of je draait op een versie die geen updates meer krijgt. Dan is een webshop laten migreren geen luxe maar achterstallig onderhoud.",
            "Een tweede reden is kost. Licenties, apps en hosting stapelen zich op tot je maandelijks betaalt voor een systeem dat je maar half gebruikt. Op zo'n moment is overstappen naar een lichter platform binnen een jaar of twee terugverdiend.",
            "En soms is het gewoon groei. Je begon met vijftig producten en verkoopt er nu drieduizend, in twee talen en drie landen. Wat toen volstond, houdt je vandaag tegen, en dan is een webshop laten vernieuwen het punt waarop je ook meteen je structuur rechtzet.",
          ],
        },
        {
          heading: "Wat er kan breken",
          body: [
            "URL's zijn het gevoeligst. Elke productpagina, categoriepagina, blogartikel en filtercombinatie die vandaag verkeer krijgt, moet morgen op een bestaande pagina uitkomen. Een webshop migratie zonder SEO-verlies is in de eerste plaats een oefening in volledigheid: één vergeten sectie is meteen zichtbaar in je cijfers.",
            "Data is de tweede. Varianten die anders gemodelleerd zijn, attributen die niet bestaan op het nieuwe platform, klantadressen in vrije tekstvelden, bestellingen met btw-regels van drie jaar geleden. Wij mappen dat veld per veld en tonen je het resultaat op een testomgeving voor er iets definitief is.",
            "De derde is alles daarbuiten: betaalprovider, verzendlabels, boekhoudkoppeling, e-mailflows, tracking en de reviewwidget die niemand nog beheert. Die lijst maken we vooraf, want dat is precies wat op de dag van de switch stilvalt als je het vergeet.",
          ],
        },
        {
          heading: "Zo pakken we het aan",
          body: [
            "We beginnen met een inventaris: een volledige crawl van je huidige shop, je best presterende pagina's uit Search Console, je verkoopcijfers per categorie en de lijst van alle systemen die aan je shop hangen. Dat document stuurt de rest van het project.",
            "Daarna bouwen we het nieuwe geheel naast het bestaande, met een eerste import van echte data zodat je met je eigen producten kan testen in plaats van met voorbeelden. Ondertussen groeit de redirectmap mee, regel per regel, van oude naar nieuwe URL.",
            "De omschakeling zelf plannen we op een rustig moment: laatste import van bestellingen en klanten, DNS om, redirects live, betalingen en mails testen met echte transacties. Wie een webshop overzetten naar ander platform als een avondje werk voorstelt, heeft er nog geen gedaan.",
          ],
        },
        {
          heading: "De eerste weken na de switch",
          body: [
            "Een replatforming webshop-traject is niet klaar bij de lancering. We volgen de indexering in Search Console, kijken elke dag naar de 404-logs en vullen redirects aan voor URL's die in geen enkele crawl zaten maar toch bestonden.",
            "Daarnaast controleren we de dingen die geld kosten als ze stil vallen: bevestigingsmails, facturen, voorraadupdates, verzendlabels en de betaalmethodes per land. Bancontact en iDEAL testen we met echte bedragen, want een testomgeving vertelt niet alles.",
            "Wil je erover praten voor je beslist, dan kan dat in een gratis kennismaking van 30 minuten. We werken vanuit België voor klanten in België en Nederland, en op mails antwoorden we binnen 24 uur.",
          ],
        },
      ],
      checklist: {
        title: "Wat we altijd meenemen",
        items: [
          "Volledige crawl van de oude shop en een redirect voor elke bestaande URL",
          "Producten, varianten, attributen en afbeeldingen, veld per veld gemapt",
          "Klantaccounts, adressen en bestelhistoriek",
          "Meta-titels, beschrijvingen, gestructureerde data en sitemap",
          "Betaalmethodes, verzendregels en boekhoudkoppeling opnieuw getest",
          "E-mailflows, facturen en tracking gecontroleerd met echte bestellingen",
          "Monitoring van indexering en 404's in de weken na de switch",
        ],
      },
      faq: [
        {
          question: "Verlies ik mijn posities in Google bij een migratie?",
          answer:
            "Niet als de URL-structuur en de redirects kloppen. Rankings horen bij pagina's, dus zolang elke oude URL naar het juiste nieuwe adres wijst en de inhoud vergelijkbaar blijft, verhuist de waarde mee. Kleine schommelingen in de eerste weken zijn normaal terwijl Google alles opnieuw indexeert.",
        },
        {
          question: "Behouden klanten hun account en bestelgeschiedenis?",
          answer:
            "Ja, accounts, adressen en bestellingen migreren we mee. Wachtwoorden zijn de uitzondering: die staan versleuteld en zijn zelden overdraagbaar tussen platformen, dus dan zetten we een vriendelijke herstelflow op waarmee klanten in één klik een nieuw wachtwoord kiezen.",
        },
        {
          question: "Moet mijn shop offline tijdens de migratie?",
          answer:
            "Nee. De nieuwe shop wordt naast de bestaande gebouwd en getest, en op het moment van de switch is er hooguit een korte periode waarin je bestellingen pauzeert. Die plannen we op je rustigste moment van de week.",
        },
        {
          question: "Kunnen jullie enkel de migratie doen, zonder nieuw design?",
          answer:
            "Ja. Soms is de shop prima en is alleen het platform het probleem, en dan verhuizen we de data en de URL's zonder aan het ontwerp te komen. We zeggen het wel als we vinden dat je met dezelfde inspanning meer zou kunnen halen.",
        },
        {
          question: "Hoelang duurt een migratie?",
          answer:
            "Dat hangt af van de grootte van je catalogus, hoe schoon je data is en hoeveel systemen aan je shop hangen. Na de gratis kennismaking van 30 minuten krijg je een planning met mijlpalen en een vaste prijs per fase, zodat de datum van de switch geen gok is.",
        },
      ],
    },
    en: {
      metaTitle: "Ecommerce migration without losing rankings",
      metaDescription:
        "Ecommerce migration handled properly: a redirect for every URL, product and order data mapped field by field, and a switch planned around your quietest hours.",
      h1: "Ecommerce migration, planned backwards from the switch",
      lead: "Replatforming moves your catalogue, your customers, your order history and years of accumulated search equity in one weekend. The mistakes are invisible until the traffic drops. So we build the whole new shop alongside the old one and only flip when the boring parts are proven.",
      sections: [
        {
          heading: "Reasons worth moving for",
          body: [
            "The most common one is friction. Small changes take weeks, a payment method cannot be added without an extension nobody maintains, or the version you run no longer receives security updates. At that point the platform is charging you in lost opportunities rather than in euros.",
            "The second is cost creep. Licences, apps, hosting and specialist hours accumulate until you pay every month for capability you never use. Deciding to migrate a webshop is often a straightforward budget decision once someone adds that column up.",
            "The third is growth you already have. Fifty products became three thousand, one country became three, and the structure that fitted the launch is now the thing capping you. Replatforming is the moment to fix the catalogue model too, because you are touching every record anyway.",
          ],
        },
        {
          heading: "The three things that actually break",
          body: [
            "URLs. Every product, category, article and filter combination that earns traffic today has to resolve tomorrow. A migration without losing rankings is mostly an exercise in completeness, because the one section nobody remembered is the one that shows up in the numbers a fortnight later.",
            "Data shape. Variants modelled differently, attributes with no equivalent, addresses stored as free text, historical orders carrying old tax rules. We map this field by field and show you the result in a staging environment with your own products in it, not with sample data.",
            "Everything attached to the shop. Payment provider, shipping labels, accounting sync, email flows, analytics, the review widget nobody owns. That inventory is made up front, because those are the systems that quietly stop working on switch day.",
          ],
        },
        {
          heading: "Our sequence",
          body: [
            "Audit first: a full crawl of the current shop, top pages from Search Console, revenue per category, and the list of every system connected to the store. That document drives every decision that follows, including which pages get attention first.",
            "Then a parallel build with real imported data, so your team tests against the catalogue they know. The redirect map grows through the whole project rather than being assembled the night before, and it is reviewed against the crawl until nothing is unmapped.",
            "Then the switch, scheduled during your quietest hours: final data import, DNS change, redirects live, and real transactions run through the checkout to confirm payments, invoices and confirmation emails all fire. A move to another ecommerce platform is a rehearsed procedure, not an improvisation.",
          ],
        },
        {
          heading: "The weeks after go-live",
          body: [
            "We watch indexing in Search Console, read the 404 logs daily and add redirects for URLs that existed in the wild but appeared in no crawl. Expect some ranking movement in the first weeks while search engines re-crawl; expect it to settle.",
            "We also re-test the money paths on the live shop: Bancontact and iDEAL with real amounts, invoices, stock updates, shipping labels and the accounting sync. Staging tells you the code works, production tells you the integrations do.",
            "Brisk is Belgian and works with clients in Belgium and the Netherlands, with more than 150 projects delivered over 17-plus years. Start with a free 30-minute call, or email us and get a reply within 24 hours.",
          ],
        },
      ],
      checklist: {
        title: "Included in every migration",
        items: [
          "Full crawl of the existing shop and a redirect for every live URL",
          "Products, variants, attributes and images mapped field by field",
          "Customer accounts, addresses and complete order history",
          "Meta titles, descriptions, structured data and a rebuilt sitemap",
          "Payments, shipping rules and accounting sync re-tested on production",
          "Email flows, invoices and analytics verified with real orders",
          "Indexing and 404 monitoring for the weeks after the switch",
        ],
      },
      faq: [
        {
          question: "Will we lose search rankings when we replatform?",
          answer:
            "Not if the URL mapping is complete. Rankings belong to pages, so when every old URL redirects to the equivalent new one and the content stays comparable, the value transfers. Some movement in the first weeks is normal while search engines re-crawl the new structure.",
        },
        {
          question: "Can customers keep their accounts and order history?",
          answer:
            "Yes for accounts, addresses and orders. Passwords are the exception, because they are stored as hashes that rarely transfer between platforms, so we set up a one-click reset flow and tell customers about it in the launch email.",
        },
        {
          question: "Does the shop need downtime?",
          answer:
            "Only a short pause on new orders around the final data import and DNS change, scheduled at your quietest hour. The new shop is built and tested in parallel, so the switch itself is a handful of steps rather than a rebuild in production.",
        },
        {
          question: "Can you migrate without redesigning the shop?",
          answer:
            "Yes. When the design still works and only the platform is holding you back, we move the data, the URLs and the integrations and leave the interface alone. We will tell you if we think the same budget would go further with a redesign attached.",
        },
        {
          question: "What happens to our old shop after the switch?",
          answer:
            "We keep it available privately for a while as a reference for data questions and for anything that turns out to be missing, then decommission it once the new shop has run through a full billing and reporting cycle without surprises.",
        },
      ],
    },
  },

  /* --------------------------------------------------------------------- */
  /* Ecommerce agency                                                       */
  /* --------------------------------------------------------------------- */
  "e-commerce-bureau": {
    nl: {
      metaTitle: "E-commerce bureau voor webshops op maat",
      metaDescription:
        "E-commerce bureau uit België: webshops op maat, van productconfigurator tot voorraadbeheer, met Bancontact en iDEAL. 150+ projecten in 17+ jaar.",
      h1: "Een e-commerce bureau dat de shop bouwt en er daarna bij blijft",
      lead: "Brisk ontwerpt en bouwt webshops, websites, software en mobiele apps op maat. Geen thema's, geen page-builderpakketten: we schrijven de shop die bij jouw producten en je administratie past. Vanuit België, voor klanten in België en Nederland.",
      sections: [
        {
          heading: "Wat je van ons mag verwachten",
          body: [
            "Ontwerp en ontwikkeling zitten bij ons in hetzelfde team. Dat scheelt de vertaalslag waar projecten meestal tijd verliezen: wie het scherm tekent, weet wat het kost om het te bouwen, en wie het bouwt, heeft meegedacht over hoe het werkt.",
            "In ruim 17 jaar leverden we meer dan 150 projecten op, voor opdrachtgevers als NMBS, De Watergroep, IDEWE, de Belgische voetbalbond, museumPASSmusées, BMW, Nike en OpenAI. Een selectie van 17 live referenties staat op deze site, met een link naar de sites zelf.",
            "En we zijn eerlijk over platformkeuze. Meestal bouwen we op maat, maar verkoop je een beperkt aanbod zonder bijzondere logica, dan zeggen we dat een standaardplatform volstaat. Dat hoor je in het eerste gesprek, niet nadat de offerte getekend is.",
          ],
        },
        {
          heading: "Twee shops die tonen wat we bedoelen",
          body: [
            "Roetfilterkopen.com is de grootste roetfilterwebshop van de Benelux: meer dan 500 filters uit eigen voorraad, doorzoekbaar op kenteken. Een bezoeker die zijn nummerplaat intikt, ziet meteen wat op zijn wagen past, en dat scheelt zowel de klant als de klantendienst een hoop twijfel.",
            "LegacyCristal doet het omgekeerde: één foto wordt een 3D-lasergravure in massief kristal. Een emotioneel product met een bestelflow die geen vragen open laat, van het uploaden van de foto tot de bevestiging.",
            "Twee totaal verschillende catalogi, dezelfde aanpak: eerst begrijpen hoe iemand kiest, dan pas ontwerpen wat hij ziet.",
          ],
        },
        {
          heading: "De systemen achter de winkel",
          body: [
            "Een webshop met voorraadbeheer laten maken betekent dat je voorraad op één plek klopt en overal hetzelfde zegt: op de productpagina, in de checkout, in je magazijn en in je boekhouding. Wij koppelen die systemen zodat niemand nog een bestelling overtypt.",
            "Verkoop je iets dat samengesteld wordt, dan kan je bij ons een webshop met productconfigurator laten maken: keuzes die elkaar uitsluiten, prijzen die live meerekenen en een samenvatting die de klant begrijpt voor hij betaalt.",
            "Betalingen regelen we via Mollie of Stripe. Wie een webshop met iDEAL laten maken vraagt, denkt aan de Nederlandse markt, en wie een webshop met Bancontact laten maken vraagt, aan de Belgische. In de praktijk zet je ze allebei aan, samen met kredietkaart, Apple Pay en betaling op factuur.",
          ],
        },
        {
          heading: "Hoe een samenwerking loopt",
          body: [
            "Het begint met een gratis kennismaking van 30 minuten. Daarin bespreken we je catalogus, je koppelingen en je planning, en zeggen we ook wat we niet zouden doen. Mail je liever eerst, dan heb je binnen 24 uur antwoord.",
            "Daarna knippen we het werk in fases met een vaste prijs per fase. Je weet dus wat elke stap kost voor die begint, en je ziet elke week wat er gebouwd is. Wie webshop ontwikkeling uitbesteden overweegt, wil vooral geen open einde, en dat is precies wat deze werkwijze uitsluit.",
            "Bij oplevering is alles van jou: code, design, data, documentatie en toegangen. Als e-commerce bureau werken we liever verder omdat je dat wil, niet omdat je niet weg kan.",
          ],
        },
      ],
      checklist: {
        title: "Waarmee je bij ons terecht kan",
        items: [
          "Webshops op maat, ontworpen en gebouwd door één team",
          "Productconfiguratoren, filters en zoekfuncties voor grote catalogi",
          "Koppelingen met boekhouding, voorraad, ERP en verzendplatformen",
          "Betalingen via Mollie of Stripe: Bancontact, iDEAL, kaart, Apple Pay, factuur",
          "Migraties tussen platformen, met redirects en behoud van data",
          "Snelheid, gestructureerde data en technische SEO",
          "Onderhoud en doorontwikkeling na de lancering",
        ],
      },
      faq: [
        {
          question: "Werken jullie ook voor Nederlandse klanten?",
          answer:
            "Ja. We zitten in België en werken voor opdrachtgevers in België en Nederland. In de praktijk verloopt het meeste overleg online, met een bezoek op de momenten waarop dat echt iets toevoegt, zoals bij de start of vlak voor een lancering.",
        },
        {
          question: "Bouwen jullie op maat of op een bestaand platform?",
          answer:
            "Standaard bouwen we op maat, zonder gekochte thema's of page-builderpakketten. Past jouw aanbod perfect binnen een standaardplatform, dan zeggen we dat en helpen we je daar goed op weg. Die keuze maken we samen in het eerste gesprek.",
        },
        {
          question: "Kunnen jullie samenwerken met ons interne team?",
          answer:
            "Ja. We werken regelmatig naast interne developers, marketeers of een bureau dat de campagnes doet. We spreken vooraf af wie welk deel bezit, zodat er geen twee mensen aan dezelfde code werken zonder het van elkaar te weten.",
        },
        {
          question: "Doen jullie ook onderhoud na de lancering?",
          answer:
            "Ja. Updates, nieuwe functies, extra koppelingen en optimalisaties zijn doorlopend werk. Hoeveel begeleiding je wil, spreken we vooraf af, en je zit nooit vast aan een contract om je eigen shop te kunnen aanpassen.",
        },
        {
          question: "Van wie is de webshop na oplevering?",
          answer:
            "Van jou. Code, design en data worden opgeleverd als jouw eigendom, met documentatie en toegang tot alle accounts. Wil je later intern verder of met een ander bureau, dan neem je alles mee zonder discussie.",
        },
      ],
    },
    en: {
      metaTitle: "Ecommerce agency in Belgium for custom webshops",
      metaDescription:
        "A Belgian ecommerce agency building custom webshops: configurators, stock management, ERP integrations and Bancontact and iDEAL payments. 150+ projects.",
      h1: "An ecommerce agency that writes the shop, not the theme settings",
      lead: "Brisk designs and builds custom websites, webshops, software and mobile apps from Belgium, for clients in Belgium and the Netherlands. More than 150 projects in over 17 years, and not one of them started by choosing a template.",
      sections: [
        {
          heading: "One team, design through deployment",
          body: [
            "Design and engineering sit together here, which removes the handover where most projects lose weeks. The person drawing the screen knows what it costs to build; the person building it had a say in how it works. Nothing gets thrown over a wall with a note attached.",
            "Our client list includes NMBS, De Watergroep, IDEWE, the Belgian FA, museumPASSmusées, BMW, Nike and OpenAI. The 17 live sites on this site are a selection, not the full body of work, and every one of them links straight through to the real thing.",
            "We are also willing to talk you out of custom. If your range is small and your rules are simple, a standard platform will serve you better and we will say so in the first conversation rather than after a proposal is signed.",
          ],
        },
        {
          heading: "Two shops, two completely different problems",
          body: [
            "Roetfilterkopen.com is the Benelux's largest diesel particulate filter webshop: more than 500 filters held in its own stock, searchable by licence plate. Type in a plate and you see only what fits your car, which turns a technical purchase most people dread into two clicks.",
            "LegacyCristal sells the opposite kind of product: a photograph turned into a 3D laser engraving inside solid crystal. Emotional, personal, and unforgiving of a confusing checkout, so the ordering flow carries the customer from upload to confirmation without a single unanswered question.",
            "Different catalogues, same method. Understand how the decision is actually made, then design what the buyer sees.",
          ],
        },
        {
          heading: "The systems behind the storefront",
          body: [
            "Stock management is where trust is won or lost. One source of truth, reflected identically on the product page, in the cart, in the warehouse and in your accounts, so nobody sells something that left the building yesterday and nobody retypes an order into a second system.",
            "For built-to-order products we develop a product configurator: options that exclude one another, prices that recalculate live, and a summary the customer can read back before paying. It is more work than a dropdown and it is the difference between orders and support tickets.",
            "Payments run through Mollie or Stripe. iDEAL payments are what Dutch shoppers expect, Bancontact payments are the Belgian default, and a shop selling into both markets simply offers both, alongside cards, Apple Pay, bank transfer and invoicing for business accounts.",
          ],
        },
        {
          heading: "How a project runs",
          body: [
            "It opens with a free 30-minute call about your catalogue, your integrations and your deadline. If you email instead, you get a reply within 24 hours, from someone who would actually work on the project.",
            "After that the work is split into phases with a fixed price for each, so you approve the build in steps and know what the next one costs before it starts. Teams who outsource ecommerce development mostly fear an open-ended bill, and phasing is the structural answer to that.",
            "At handover, everything is yours: code, design, data, documentation and every credential. We would rather keep working with you because the shop keeps growing than because leaving would be expensive.",
          ],
        },
      ],
      checklist: {
        title: "What we take on",
        items: [
          "Custom webshops designed and built by one team",
          "Configurators, faceted search and filters for large catalogues",
          "Integrations with accounting, stock, ERP and shipping platforms",
          "Mollie or Stripe with Bancontact, iDEAL, cards, Apple Pay and invoicing",
          "Platform migrations with full redirect maps and data transfer",
          "Performance, structured data and technical SEO",
          "Maintenance and continued development after launch",
        ],
      },
      faq: [
        {
          question: "Do you work with clients outside Belgium?",
          answer:
            "Yes. We are based in Belgium and work with clients across Belgium and the Netherlands. Most collaboration happens online, with in-person sessions at the moments where they genuinely help, such as the kickoff or the week before a launch.",
        },
        {
          question: "Do you build custom or on an existing platform?",
          answer:
            "Custom by default, with no purchased themes and no page-builder kits. When a standard platform genuinely fits your range and your rules, we say so and help you set it up well instead of selling you a build you do not need.",
        },
        {
          question: "Can you work alongside our in-house developers?",
          answer:
            "Yes, and we do it regularly. We agree up front who owns which part of the codebase and how work is reviewed, so two people never rewrite the same module in parallel without knowing about each other.",
        },
        {
          question: "What happens after launch?",
          answer:
            "Launch day is the start of the useful part. We handle updates, new features, extra integrations and performance work, at whatever level of involvement you want, and you are never locked into a contract just to change your own shop.",
        },
        {
          question: "Who owns the shop when it is delivered?",
          answer:
            "You do. Code, design and data are handed over as your property, with documentation and administrator access to every account, so continuing in-house or with another agency remains an open option.",
        },
      ],
    },
  },

  /* --------------------------------------------------------------------- */
  /* Pricing                                                                */
  /* --------------------------------------------------------------------- */
  "webshop-laten-maken-kosten": {
    nl: {
      metaTitle: "Webshop laten maken kosten: wat bepaalt de prijs",
      metaDescription:
        "Webshop laten maken kosten uitgelegd: welke keuzes de prijs bepalen, wat er in een offerte hoort te staan en waar je zelf op het budget kan drukken.",
      h1: "Webshop laten maken kosten: waar je geld naartoe gaat",
      lead: "Op deze pagina staat geen prijs, en dat is geen verkooptruc. Een webshop is geen product met een prijskaartje maar een optelsom van keuzes, en wie zonder je catalogus te kennen een bedrag noemt, gokt. Wat we wel kunnen doen: precies uitleggen welke keuzes je factuur bepalen, zodat je elke offerte kan lezen.",
      sections: [
        {
          heading: "Je catalogus is de eerste rekensom",
          body: [
            "Honderd producten met één variant is een ander project dan vijfduizend artikelen met maten, kleuren, verpakkingseenheden en compatibiliteit. Niet omdat het invoeren langer duurt, maar omdat filters, zoekfunctie en productpagina's dan echt ontworpen moeten worden in plaats van ingevuld.",
            "Configuratoren zijn de duurste categorie. Een product dat de klant zelf samenstelt, met keuzes die elkaar uitsluiten en een prijs die live meerekent, is in feite een kleine applicatie in je shop. Dat kan enorm veel opleveren, maar het is werk dat je bewust kiest.",
            "Ook de kwaliteit van je productdata telt mee. Nette exports met consistente attributen besparen weken; drie leveranciersbestanden die elkaar tegenspreken kosten die weken juist. Dit is het onderdeel waar je zelf het meeste invloed op hebt, nog voor er iemand begint te bouwen.",
          ],
        },
        {
          heading: "Prijsregels, koppelingen en betalingen",
          body: [
            "B2B-logica verhoogt de kost het snelst: klantspecifieke prijzen, staffels, contractafspraken, bestellimieten en goedkeuringsstappen. Elke regel moet uitgeschreven, gebouwd en getest worden, en precies daarom is dat de vraag die wij als eerste stellen.",
            "Koppelingen zijn de tweede grote post. Boekhouding, voorraad of ERP, verzendplatform, e-mailtool en analytics. Een pakket met een goede API kost een fractie van een systeem waarvoor we een tussenlaag moeten bouwen omdat het alleen nachtelijke exports kent.",
            "Betaalmethodes zijn op zich beperkt werk: Mollie of Stripe aansluiten met Bancontact, iDEAL, kredietkaart en Apple Pay is een afgebakende taak. Betaling op factuur met kredietlimieten is dat niet, want die hangt vast aan je boekhouding en je risicobeleid.",
          ],
        },
        {
          heading: "Migratie, talen en landen",
          body: [
            "Heb je al een shop, dan komt daar migratie bij: producten, klanten, bestelhistoriek en een redirect voor elke bestaande URL. Dat laatste is geen detail, want je zoekverkeer hangt eraan vast, en het is meestal meer werk dan mensen verwachten.",
            "Meertaligheid verdubbelt niet alleen je teksten. Ook je URL-structuur, je e-mails, je facturen, je filters en je productattributen komen er in elke taal bij, plus het beheer daarvan. Twee talen is prima te doen, vijf is een structurele beslissing.",
            "Verkoop je in meerdere landen, dan komen btw-regels, verzendtarieven, retourvoorwaarden en lokale betaalmethodes erbij. Wie een betaalbare webshop laten maken als uitgangspunt neemt, start het best in één land en één taal, en breidt uit wanneer de omzet het draagt.",
          ],
        },
        {
          heading: "Hoe wij offreren",
          body: [
            "Het begint met een gratis kennismaking van 30 minuten. Wij stellen daarin de vragen van hierboven, jij hoort meteen welke onderdelen zwaar wegen. Vaak weet je na dat halfuur al waar je project ongeveer landt, en soms adviseren we een standaardplatform in plaats van maatwerk.",
            "Daarna knippen we het traject in fases, met een vaste prijs per fase: ontwerp, bouw, koppelingen, migratie, lancering. Zo betaal je niet vooruit voor werk waarvan de scope nog kan schuiven, en kan je een fase uitstellen zonder dat de rest stilvalt. Een webshop laten maken offerte hoort ook te vermelden wat er niet in zit, zoals hosting, licenties en fotografie.",
            "Wat een webshop op maat prijs uiteindelijk redelijk maakt, is dat je weet waarvoor je betaalt. Wat kost een webshop laten maken kan niemand eerlijk beantwoorden zonder je catalogus, je koppelingen en je markten te kennen, en dat gesprek duurt een halfuur.",
          ],
        },
      ],
      checklist: {
        title: "Wat in onze offerte staat",
        items: [
          "De scope per fase, in gewone taal beschreven",
          "Een vaste prijs per fase en de volgorde waarin we ze doen",
          "Een planning met mijlpalen en wat wij van jou nodig hebben",
          "Alle koppelingen expliciet opgesomd, inclusief de systemen aan de andere kant",
          "Welke betaalmethodes en welke talen in scope zitten",
          "Wat er niet in zit: hosting, licenties, transactiekosten, content en fotografie",
          "Wat er na de lancering gebeurt en wat dat betekent",
        ],
      },
      faq: [
        {
          question: "Wat kost een webshop laten maken?",
          answer:
            "Dat hangt af van de grootte en de complexiteit van je catalogus, van je prijsregels, van het aantal koppelingen met bestaande systemen, van een eventuele migratie en van het aantal talen en landen. Na een gratis kennismaking van 30 minuten krijg je een voorstel met een vaste prijs per fase.",
        },
        {
          question: "Waarom staat er geen richtprijs op deze pagina?",
          answer:
            "Omdat een richtprijs zonder context altijd verkeerd is: te laag voor wie een configurator en drie koppelingen nodig heeft, te hoog voor wie honderd producten en één betaalmethode verkoopt. Wij noemen liever een bedrag dat klopt na een halfuur vragen dan een bedrag dat mooi staat op een pagina.",
        },
        {
          question: "Wat is het verschil in kost tussen een standaardplatform en maatwerk?",
          answer:
            "Bij een standaardplatform betaal je minder bij de start en daarna maandelijks voor het platform, de apps en de licenties. Bij maatwerk investeer je vooraf en heb je daarna geen abonnementen op functies. Welke van de twee goedkoper uitvalt, hangt af van hoeveel jaren je vooruitkijkt en hoe bijzonder je logica is.",
        },
        {
          question: "Zitten hosting en onderhoud in de prijs?",
          answer:
            "Hosting, domeinnamen, eventuele licenties en de transactiekosten van je betaalprovider staan los en betaal je rechtstreeks aan die partijen. Onderhoud spreken we apart af, zodat je kiest hoeveel begeleiding je wil in plaats van een vast pakket te kopen dat je misschien niet gebruikt.",
        },
        {
          question: "Betaal ik alles vooraf?",
          answer:
            "Nee. We werken per fase, en elke fase heeft een eigen scope en een eigen vaste prijs. Je beslist na elke fase of de volgende meteen start, wat betekent dat je nooit vooruitbetaalt voor werk dat nog kan veranderen.",
        },
        {
          question: "Wat maakt een webshopproject duurder dan verwacht?",
          answer:
            "Meestal drie dingen: productdata die minder schoon is dan gedacht, koppelingen die pas halverwege opduiken, en wensen die tijdens de bouw worden toegevoegd. De eerste twee vangen we op in de kennismaking, de derde vangen we op door per fase te werken.",
        },
      ],
    },
    en: {
      metaTitle: "Webshop development cost: what drives the price",
      metaDescription:
        "Webshop development cost explained: the decisions that move the number, what belongs in a proper quote, and the levers that keep a build affordable.",
      h1: "Webshop development cost, decision by decision",
      lead: "There is no price on this page. A webshop is not a product with a sticker on it, and anyone quoting a figure before seeing your catalogue is guessing in public. What we can do is show you exactly which decisions move the number, so you can read any quote you receive, including ours.",
      sections: [
        {
          heading: "Start with the catalogue",
          body: [
            "Two hundred simple products and five thousand SKUs with sizes, pack quantities and compatibility rules are different projects, and not because of data entry. Once a catalogue is large, search, filtering and product templates have to be designed rather than configured, and that design work is the cost.",
            "Configurators are the expensive end. A product assembled by the customer, with options that rule each other out and a price that recalculates as they choose, is a small application living inside your shop. Worth it for the right product, never accidental.",
            "The state of your product data is the third factor and the one you control. Consistent exports with clean attributes save weeks. Three supplier spreadsheets that disagree about what a field means will spend those weeks instead, before a single page is designed.",
          ],
        },
        {
          heading: "Rules, systems and payments",
          body: [
            "B2B logic raises the number faster than anything else: prices per customer, quantity breaks, contract terms, order limits and approval flows. Each rule has to be written down, built and tested, which is why it is the first thing we ask about.",
            "Integrations come next. Accounting, stock or ERP, shipping, email, analytics. A system with a documented API is a fraction of the work of one that only produces a nightly file and needs a middle layer built around it, and that difference is often thousands of euros of engineering either way.",
            "Payment methods themselves are contained work: connecting Mollie or Stripe with Bancontact, iDEAL, cards and Apple Pay is a defined task. Invoice payment with credit limits is not, because it reaches into your accounting system and your risk policy.",
          ],
        },
        {
          heading: "Migration, languages and markets",
          body: [
            "If a shop already exists, migration joins the scope: products, customers, order history and a redirect for every URL that currently earns traffic. That last item protects revenue you have already paid for, and it is consistently underestimated.",
            "Languages multiply more than text. URLs, emails, invoices, filters, attribute values and the editorial workload all scale with each locale you add. Two languages is routine in Belgium; five is a structural decision about how you will run the shop.",
            "Selling into several countries adds VAT rules, shipping tariffs, returns policies and local payment expectations. Wanting an affordable webshop is a perfectly good starting position, and the way to get there is to launch in one market and expand when the revenue justifies it.",
          ],
        },
        {
          heading: "How our quotes work",
          body: [
            "Every project starts with a free 30-minute call. We ask the questions above, you hear immediately which parts are heavy and which are trivial. Sometimes the honest outcome of that call is that a standard platform fits you better than anything we would build.",
            "Then the work is split into phases: design, build, integrations, migration, launch. Each phase carries a fixed price, so nothing is billed by the hour and you can pause between phases without stranding the project. A useful webshop quote also states what is excluded, such as hosting, licences, transaction fees and photography.",
            "That structure is what makes a custom ecommerce price defensible: you always know what the next step costs before it starts. If you want to know what a webshop costs for your specific catalogue, that answer takes half an hour, and email gets a reply within 24 hours.",
          ],
        },
      ],
      checklist: {
        title: "What a quote from us contains",
        items: [
          "Scope per phase, described in plain language",
          "A fixed price per phase and the order we tackle them in",
          "A schedule with milestones and what we need from you, when",
          "Every integration listed by name, including the system on the other side",
          "Which payment methods and which languages are in scope",
          "Explicit exclusions: hosting, licences, transaction fees, content and photography",
          "What happens after launch and what that involves",
        ],
      },
      faq: [
        {
          question: "What does a webshop cost?",
          answer:
            "It depends on the size and complexity of your catalogue, your pricing rules, the number of integrations with existing systems, whether an existing shop has to be migrated, and how many languages and countries you sell in. After a free 30-minute call you receive a proposal with a fixed price per phase.",
        },
        {
          question: "Why won't you publish a starting price?",
          answer:
            "Because a number without context is wrong in both directions: too high for a hundred products with one payment method, too low for a configurator with three integrations behind it. We would rather give you an accurate figure after thirty minutes of questions than a decorative one on a web page.",
        },
        {
          question: "Is custom more expensive than a standard platform?",
          answer:
            "Custom costs more up front and nothing per month for features, while a platform costs less to start and then charges continuously for subscriptions, apps and licences. Which one wins depends on how many years you are planning for and how unusual your business rules are.",
        },
        {
          question: "How do you handle changes once the build has started?",
          answer:
            "Small refinements inside an agreed phase are simply part of the work. Anything that changes the shape of the project is quoted as its own phase with its own fixed price, so a new idea never turns into an invoice you did not see coming.",
        },
        {
          question: "Are hosting and maintenance included?",
          answer:
            "No. Hosting, domains, any platform licences and your payment provider's transaction fees are paid directly to those providers, and maintenance is agreed separately so you choose the level of support you actually want.",
        },
        {
          question: "What is the cheapest responsible way to start?",
          answer:
            "One market, one language, clean product data, the integrations you genuinely cannot operate without, and no configurator in version one. That gets a real shop selling, and the money you did not spend on phase one is still available when the traffic tells you where to invest it.",
        },
      ],
    },
  },
};
