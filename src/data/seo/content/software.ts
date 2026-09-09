import type { ClusterContentMap } from "./types";

/**
 * Copy for the software cluster pages (`parent: "software"` in clusters.ts).
 *
 * The audience here is technical or semi-technical: a CTO, an operations lead,
 * a founder who has already tried the off-the-shelf tool. Vague copy loses them,
 * so every page names the thing that is actually hard about the work.
 */
export const softwareClusterContent: ClusterContentMap = {
  "saas-platform-laten-bouwen": {
    nl: {
      metaTitle: "SaaS platform laten bouwen",
      metaDescription:
        "Multi-tenant SaaS met rollen, abonnementen en betalingen. Brisk bouwt platformen in TypeScript en PostgreSQL, met code en data op jouw naam.",
      h1: "Een SaaS platform laten bouwen dat klanten zelf gebruiken",
      lead: "Een SaaS-product is geen website met een login erop. Elke klant krijgt eigen data, beheert eigen gebruikers en betaalt via een abonnement dat doorloopt zonder dat er iemand een factuur maakt. Dat verandert hoe je bouwt, vanaf de eerste dag.",
      sections: [
        {
          heading: "Het datamodel bepaalt hoe ver je komt",
          body: [
            "Wil je een SaaS platform laten bouwen, dan begint het werk bij het datamodel en niet bij het eerste scherm. Wie is de tenant: een bedrijf, een vestiging, een team? Hangt elke rij aan die tenant, en kan één gebruiker bij meerdere tenants horen? Die vragen beantwoord je één keer goed, of je betaalt er drie jaar later voor.",
            "Wij leggen de scheiding tussen klanten in de database zelf, met row level security in PostgreSQL, zodat een fout in de applicatiecode nooit de data van de ene klant bij de andere kan tonen. Rollen zoals eigenaar, beheerder, gebruiker en alleen-lezen horen in datzelfde model, samen met uitnodigingen en het intrekken van toegang.",
            "Tenancy achteraf inbouwen raakt elke query, elke index en elke rapportage. SaaS laten ontwikkelen betekent daarom dat de saaie beslissingen vooraan in het project zitten, niet in sprint negen.",
          ],
        },
        {
          heading: "Abonnementen zijn een proces, geen knop",
          body: [
            "Een abonnementsplatform laten maken betekent vooral nadenken over wat er gebeurt als een betaling mislukt. Wij gebruiken Stripe als bron van waarheid voor abonnementen en verwerken de webhooks: een geslaagde verlenging, een mislukte incasso, een upgrade halverwege de maand, een opzegging die pas op het einde van de periode ingaat.",
            "Daar hoort een toestand in je eigen database bij die altijd klopt met wat Stripe zegt, ook als een webhook twee keer binnenkomt of een dag te laat. Proefperiodes die aflopen, prijzen die veranderen voor bestaande klanten en btw die per land anders werkt zijn geen randgevallen. Dat is het gewone werk van een abonnementsmodel.",
            "Een marktplaats platform laten maken is nog een stap verder: er komt een tweede kant bij, met aanbieders, uitbetalingen en de vraag wie verantwoordelijk is als een transactie strandt. Die regels horen expliciet in het systeem te staan, niet in het hoofd van iemand op kantoor.",
          ],
        },
        {
          heading: "Twee platformen die elke dag draaien",
          body: [
            "Voor HP Chiptuningfiles en Fileservice Chiptuning bouwden we telkens een platform waar werkplaatsen wereldwijd bestanden bestellen. Klantportaal, bestelflow, betaling en levering zitten in één systeem, en de bestanden zijn er in minder dan vijftien minuten.",
            "Wat zulke platformen technisch interessant maakt, zit onder het scherm: bestellingen die een duidelijke status doorlopen, leveringen die pas starten als de betaling bevestigd is, en een portaal waar klanten hun eigen historiek terugvinden zonder dat iemand moet antwoorden.",
            "Wil je een online platform laten bouwen waarop meerdere organisaties samenwerken, dan is dit het patroon: zelfbediening voor de klant, overzicht voor jou, en zo weinig mogelijk handwerk ertussen.",
          ],
        },
        {
          heading: "Klein starten, dan pas breed",
          body: [
            "We bouwen liever één werkflow volledig af dan tien half. De eerste release maakt de kernbelofte van je product waar voor één type gebruiker, en alles wat daar niet aan bijdraagt schuift naar een volgende fase.",
            "Elke fase krijgt vooraf een scope en een vaste prijs. Na elke sprint staat er een werkende versie in een testomgeving, geen presentatie, zodat je op basis van draaiende software beslist of de volgende fase doorgaat.",
          ],
        },
      ],
      checklist: {
        title: "Wat er standaard in de eerste release zit",
        items: [
          "Tenantmodel met rollen, uitnodigingen en het intrekken van toegang",
          "Abonnementen en betalingen via Stripe, inclusief het verwerken van webhooks",
          "Een auditlog van wie wat wanneer heeft gewijzigd",
          "Transactionele e-mails: uitnodiging, wachtwoordherstel, factuur",
          "Een aparte testomgeving naast productie",
          "Back-ups met een herstel dat we effectief eens uitvoeren",
        ],
      },
      faq: [
        {
          question: "Hoelang duurt het voor een eerste versie van ons platform live staat?",
          answer:
            "Dat hangt af van de scope: het aantal gebruikersrollen, de integraties en de betaallogica bepalen samen de doorlooptijd. We knippen het werk in fasen met elk een eigen scope en prijs, zodat er na elke fase iets bruikbaars klaarstaat. In een gratis intakegesprek van 30 minuten schetsen we welke fasen jouw platform nodig heeft.",
        },
        {
          question: "Van wie is de code van het platform?",
          answer:
            "Van jou. De code, de database en de hostingaccounts staan op naam van je bedrijf, ook tijdens het project. Er zitten geen licenties op het maatwerk, dus een ander team kan er later mee verder als je dat wil.",
        },
        {
          question: "Op welke techniek bouwen jullie SaaS-platformen?",
          answer:
            "TypeScript met React en Next.js aan de voorkant, Node.js en PostgreSQL aan de achterkant, Supabase of Prisma voor de datalaag, Stripe voor betalingen en Vercel voor hosting. Het is een stack die we door en door kennen en die breed onderhouden wordt.",
        },
        {
          question: "Kunnen jullie een bestaand SaaS-product overnemen?",
          answer:
            "Ja. We starten dan met een doorlichting van de code, de database en de hosting, en zetten op papier wat er eerst moet gebeuren. Pas daarna spreken we af of we verder bouwen op wat er staat of bepaalde onderdelen herbouwen.",
        },
        {
          question: "Wie beheert het platform na de livegang?",
          answer:
            "Meestal wij, op infrastructuur die op jouw naam staat, met monitoring en updates in een afgesproken onderhoudsformule. Wil je later zelf hosten of naar een andere partij, dan kan dat: het draait op standaard PostgreSQL en Node.js, zonder constructies die alleen wij begrijpen.",
        },
      ],
    },
    en: {
      metaTitle: "SaaS Platform Development",
      metaDescription:
        "SaaS platform development from Belgium: multi-tenant data, roles, Stripe subscriptions and a stack any team can pick up. You own the code and the data.",
      h1: "SaaS platform development, from first release to running product",
      lead: "A SaaS product is not a website with a login bolted on. Every customer gets their own data, manages their own users and pays through a subscription that renews without anyone raising an invoice. That shapes the build from day one.",
      sections: [
        {
          heading: "Tenancy is a database decision",
          body: [
            "Deciding to build a SaaS product means deciding what a tenant is before you design a single screen. A company, a branch, a team? Does every row hang off that tenant, and can one person belong to several tenants at once? Get it right once, or pay for it in every query you write afterwards.",
            "We enforce separation in PostgreSQL itself, using row level security, so a mistake in application code can never surface one customer's data inside another's account. Roles, invitations and revoking access live in the same model rather than in scattered permission checks.",
            "Retrofitting multi-tenancy touches every index, every report and every background job. It is the least visible part of SaaS platform development and the part that decides how far the product can go.",
          ],
        },
        {
          heading: "Billing is a state machine",
          body: [
            "A subscription platform lives or dies on what happens when a card is declined. We treat Stripe as the source of truth for subscriptions and process its webhooks properly: renewals, failed charges, mid-cycle upgrades, cancellations that only take effect at the end of the period.",
            "Your own database then holds a state that always agrees with Stripe, even when a webhook arrives twice or a day late. Trials that expire, price changes for existing customers and VAT that differs per country are not edge cases; they are the everyday behaviour of a paid product.",
            "A marketplace platform adds a second side to all of it: sellers, payouts and a clear answer to who carries the risk when a transaction fails halfway. Those rules belong in the system, written down as code, not in someone's memory.",
          ],
        },
        {
          heading: "What we ship first",
          body: [
            "One workflow finished beats ten workflows half done. The first release has to prove the core promise of the product for a single type of user, and anything that does not serve that moves to a later phase.",
            "Each phase gets a scope and a fixed price before it starts. After every sprint there is a working version on a test environment, so the decision to continue is based on software you can click through rather than on a plan.",
          ],
        },
        {
          heading: "Two platforms already doing this",
          body: [
            "HP Chiptuningfiles and Fileservice Chiptuning are both platforms we built for workshops around the world: a customer portal, an ordering flow, payments and file delivery in under fifteen minutes.",
            "The interesting engineering sits underneath: orders that move through explicit states, delivery that only starts once payment is confirmed, and a portal where customers find their own history without anyone answering an email.",
            "If online platform development means several organisations working in the same system, that is the shape of it: self-service for the customer, oversight for you, and as little manual work in between as possible.",
          ],
        },
      ],
      checklist: {
        title: "In every first release",
        items: [
          "A tenant model with roles, invitations and revocable access",
          "Subscriptions and payments through Stripe, webhooks included",
          "An audit log of who changed what and when",
          "Transactional email: invitation, password reset, invoice",
          "A test environment separate from production",
          "Backups, plus a restore we actually run once",
        ],
      },
      faq: [
        {
          question: "How long before a first version of our platform is live?",
          answer:
            "It depends on the scope: the number of user roles, the integrations and the billing logic together set the timeline. We split the work into phases, each with its own scope and price, so something usable exists at the end of every phase. In a free 30-minute intro call we can sketch which phases your platform needs.",
        },
        {
          question: "Who owns the code?",
          answer:
            "You do. The code, the database and the hosting accounts are in your company's name from the start of the project. There are no licences on the custom work, so another team can take it over whenever you want.",
        },
        {
          question: "Which technology do you use for SaaS platforms?",
          answer:
            "TypeScript with React and Next.js on the front end, Node.js and PostgreSQL behind it, Supabase or Prisma for the data layer, Stripe for payments and Vercel for hosting. It is a stack we know inside out and one that is widely maintained.",
        },
        {
          question: "Can you take over an existing SaaS product?",
          answer:
            "Yes. We start with a review of the code, the database and the hosting, and write down what needs attention first. Only then do we agree whether to extend what exists or rebuild specific parts of it.",
        },
        {
          question: "Who runs the platform after launch?",
          answer:
            "Usually we do, on infrastructure registered in your name, with monitoring and updates under an agreed maintenance plan. Moving it in-house or to another provider later is straightforward, because it runs on standard PostgreSQL and Node.js.",
        },
      ],
    },
  },

  "mvp-laten-ontwikkelen": {
    nl: {
      metaTitle: "MVP laten ontwikkelen",
      metaDescription:
        "Een MVP laten ontwikkelen die één probleem volledig oplost, in fasen met vaste prijs. Brisk bouwt eerste versies die je na de lancering kan uitbreiden.",
      h1: "Een MVP laten ontwikkelen die na de lancering nog bruikbaar is",
      lead: "Een MVP is geen half product. Het is het kleinste systeem dat één probleem volledig oplost voor één type gebruiker, gebouwd op een fundament waarop je verder kan. Het verschil zit vooral in wat je bewust weglaat.",
      sections: [
        {
          heading: "Weglaten is de moeilijkste beslissing",
          body: [
            "In een eerste versie hoort geen rollenmodel met acht niveaus, geen instellingenscherm voor elk detail, geen eigen rapportagebouwer, geen tweede taal en geen integratie die maar één klant nodig heeft. Dat zijn stuk voor stuk dingen die je later toevoegt met kennis die je vandaag nog niet hebt.",
            "Een deel van dat werk mag je gerust met de hand doen. Als er per week drie aanvragen binnenkomen, mag iemand die eerst manueel goedkeuren in plaats van dat je er een goedkeuringsflow voor bouwt. Zodra het er dertig per dag zijn, weet je precies hoe die flow eruit moet zien.",
            "Soms is een prototype laten maken zelfs de goedkoopste stap: klikbare schermen zonder database, om te toetsen of het idee klopt voordat er één regel productiecode geschreven wordt.",
          ],
        },
        {
          heading: "Wat wel meteen goed moet staan",
          body: [
            "Alles wat je later moeilijk terugdraait, doen we vanaf het begin degelijk: het datamodel, de authenticatie, de scheiding tussen test en productie, en back-ups waarvan we het herstel één keer echt uitproberen. Dat kost dagen, geen maanden, en het bepaalt of versie twee een uitbreiding of een herbouw wordt.",
            "Betaalt de eerste gebruiker meteen, dan hoort ook de betaallogica erbij, meestal via Stripe. En hoe klein de release ook is: foutmeldingen en gebruiksstatistieken moeten ergens binnenkomen waar iemand ze leest.",
            "Een MVP laten bouwen zonder die terugkoppeling is een gemiste kans. De eerste tien gebruikers leren je meer over je product dan tien vergaderingen erover.",
          ],
        },
        {
          heading: "Hoe we van idee naar gebruikers gaan",
          body: [
            "Een MVP laten ontwikkelen begint bij ons niet met schermen maar met een gratis gesprek van 30 minuten waarin we het probleem scherp krijgen: wie het vandaag oplost, hoe, en wat er misgaat. Daarna volgt een voorstel per fase, elk met een eigen scope en prijs, zodat je nooit een blanco cheque tekent voor een idee dat nog kan draaien.",
            "Startup software laten ontwikkelen draait om leersnelheid: hoe snel staat er iets voor echte gebruikers, en hoe snel zie je wat ze ermee doen. Daarom leveren we per sprint een werkende versie in een testomgeving in plaats van een demo aan het eind.",
            "De eerste versie van een product bouwen is ook een oefening in nee zeggen. Wij hebben geen belang bij extra schermen, dus we zullen eerder voorstellen iets te schrappen dan het erbij te nemen.",
          ],
        },
        {
          heading: "Na de lancering begint het echte werk",
          body: [
            "Spreek voor de livegang af waar je naar kijkt: hoeveel mensen de kernactie afmaken, waar ze afhaken, welke vragen bij support terechtkomen. Zonder die cijfers wordt fase twee een discussie over meningen.",
            "Noteer ook de schulden die je bewust hebt genomen, met de reden erbij. Een hardgecodeerde lijst, een ontbrekend rechtenmodel, een export die nog manueel loopt: die dingen mogen bestaan zolang ze op papier staan en iemand ze op de planning zet.",
            "Plan meteen een moment in, een maand of twee na de lancering, om die lijst er weer bij te nemen. Tegen dan vertelt het gebruik je welke schuld je moet aflossen en welke gerust mag blijven staan.",
          ],
        },
      ],
      checklist: {
        title: "Handig om mee te brengen naar het eerste gesprek",
        items: [
          "Het probleem in één zin, en wie er vandaag last van heeft",
          "Hoe het nu opgelost wordt, ook als dat een Excel is",
          "De systemen waar de nieuwe software mee moet praten",
          "Wat de eerste versie moet bewijzen om geslaagd te zijn",
          "Wanneer je iets live wil hebben, en waarom net dan",
        ],
      },
      faq: [
        {
          question: "Wat is het verschil tussen een prototype en een MVP?",
          answer:
            "Een prototype toont hoe iets zou werken en gaat meestal niet naar echte gebruikers; het is er om een idee of een interface te toetsen. Een MVP is werkende software die in productie draait, data bewaart en waar echte gebruikers hun werk mee doen. Een prototype kost minder, maar bewijst ook minder.",
        },
        {
          question: "Hoeveel functies horen er in een MVP?",
          answer:
            "Zo weinig mogelijk, zolang de kernbelofte helemaal waargemaakt wordt. In de praktijk is dat één werkflow van begin tot eind, plus de accounts en rechten die daarvoor nodig zijn. Alles wat je kan uitstellen zonder dat de gebruiker vastloopt, stel je uit.",
        },
        {
          question: "Kunnen we later op dezelfde code verder bouwen?",
          answer:
            "Ja, dat is precies de bedoeling. We bouwen de eerste versie op dezelfde stack en met dezelfde afspraken als een groot project: TypeScript, PostgreSQL, versiebeheer, een testomgeving en documentatie. De besparing zit in de scope, niet in de kwaliteit.",
        },
        {
          question: "Wat kost een MVP?",
          answer:
            "Dat hangt volledig af van wat er in de eerste versie moet zitten en met welke systemen ze moet praten. We werken met een vaste prijs per fase, zodat je vooraf weet waar je aan toe bent en na elke fase kan beslissen. Een concreet cijfer volgt uit een gesprek van 30 minuten over jouw scope.",
        },
        {
          question: "Werken jullie ook samen met een intern team?",
          answer:
            "Ja. Soms bouwen wij de eerste versie en neemt jouw team het daarna over, soms werken we van bij de start samen in dezelfde repository. In beide gevallen leveren we documentatie en een overdrachtssessie op, zodat niemand afhankelijk is van ons.",
        },
      ],
    },
    en: {
      metaTitle: "MVP Development",
      metaDescription:
        "MVP development that solves one problem completely, in phases with a fixed price per phase, built on foundations that version two can actually grow on.",
      h1: "MVP development for a first version you can build on",
      lead: "An MVP is not half a product. It is the smallest system that solves one problem completely for one kind of user, built on foundations that survive contact with version two. Most of the craft is in what you leave out.",
      sections: [
        {
          heading: "The parts you deliberately skip",
          body: [
            "A first version does not need eight permission levels, a settings screen for every preference, a report builder, a second language, or an integration that only one customer has asked for. Each of those is best added later, with knowledge you do not have yet.",
            "Plenty of it can stay manual on purpose. If three requests arrive a week, someone can approve them by hand instead of you paying for an approval workflow. By the time it is thirty a day, you will know exactly what that workflow should do.",
            "Sometimes prototype development is the cheaper first step: clickable screens with no database behind them, used to test whether the idea holds up before a line of production code exists.",
          ],
        },
        {
          heading: "The parts that have to be right immediately",
          body: [
            "Anything expensive to reverse gets done properly from the start: the data model, authentication, the split between staging and production, and backups with a restore we actually rehearse once. That is days of work, not months, and it decides whether version two is an extension or a rewrite.",
            "If the first users pay, billing belongs in scope too, usually through Stripe. And however small the release is, error reports and basic usage numbers have to land somewhere a human reads them.",
            "Choosing to build an MVP without that feedback loop wastes the whole point of it. Ten real users will teach you more than ten meetings about the roadmap.",
          ],
        },
        {
          heading: "From idea to first users",
          body: [
            "MVP development here starts with a free 30-minute call to get the problem sharp: who deals with it today, how, and where it breaks. After that you get a proposal per phase, each with its own scope and price, so you never sign a blank cheque for an idea that is still moving.",
            "Startup software is judged on learning speed: how fast something is in front of real users, and how fast you can see what they do with it. That is why every sprint ends with a working version on a test environment instead of a demo at the end of the project.",
            "Shipping the first version of a product is largely an exercise in saying no. We have no interest in adding screens, so we are more likely to argue for cutting one.",
          ],
        },
        {
          heading: "Launch is the start, not the finish",
          body: [
            "Agree before launch on what you will watch: how many people finish the core action, where they drop out, which questions reach support. Without those numbers, phase two turns into a debate about opinions.",
            "Write down the shortcuts you took on purpose, with the reason attached. A hardcoded list, a missing permission layer, an export that is still manual: all fine, as long as they are on a list someone owns.",
            "Put a date in the calendar a month or two after launch to read that list again. By then usage tells you which shortcut has to be paid off and which one can quietly stay where it is.",
          ],
        },
      ],
      checklist: {
        title: "Worth bringing to the first call",
        items: [
          "The problem in one sentence, and who has it today",
          "How it gets solved right now, spreadsheet included",
          "The systems the new software has to talk to",
          "What the first version must prove to count as a success",
          "When you want it live, and why that date",
        ],
      },
      faq: [
        {
          question: "What is the difference between a prototype and an MVP?",
          answer:
            "A prototype shows how something would work and usually never reaches real users; it exists to test an idea or an interface. An MVP is working software in production that stores real data and that people use to get their job done. A prototype costs less, but it also proves less.",
        },
        {
          question: "How many features belong in an MVP?",
          answer:
            "As few as possible, as long as the core promise is delivered completely. In practice that is one workflow from start to finish, plus the accounts and permissions it needs. Anything you can postpone without leaving the user stuck should be postponed.",
        },
        {
          question: "Can we keep building on the same codebase later?",
          answer:
            "Yes, that is the point. The first version uses the same stack and the same discipline as a large project: TypeScript, PostgreSQL, version control, a test environment and documentation. The saving comes from a smaller scope, not from lower quality.",
        },
        {
          question: "What does an MVP cost?",
          answer:
            "It depends entirely on what has to be in the first version and which systems it needs to talk to. We work with a fixed price per phase, so you know where you stand before each phase starts and can decide after it. A real number comes out of a 30-minute conversation about your scope.",
        },
        {
          question: "Can you work alongside our own developers?",
          answer:
            "Yes. Sometimes we build the first version and your team takes it over, sometimes we work in the same repository from day one. Either way the project ends with documentation and a handover session, so nobody depends on us to continue.",
        },
      ],
    },
  },

  "webapplicatie-laten-maken": {
    nl: {
      metaTitle: "Webapplicatie laten maken",
      metaDescription:
        "Een webapplicatie laten maken op maat van je proces: rollen, rechten, koppelingen en snelheid bij echte datavolumes. Gebouwd in TypeScript en PostgreSQL.",
      h1: "Een webapplicatie laten maken die je team elke dag opent",
      lead: "Een webapplicatie is software die in de browser draait en waar mensen echt in werken: aanvragen opvolgen, dossiers beheren, planningen maken, gegevens delen met klanten. Geen brochure, maar het gereedschap zelf.",
      sections: [
        {
          heading: "Het moment waarop een spreadsheet stopt met werken",
          body: [
            "Bijna elk project start op dezelfde plek: een Excel die te ver is doorgegroeid. Twee mensen werken tegelijk in hetzelfde bestand, er staan drie versies in omloop, niemand ziet wie wat gewijzigd heeft en de formules zijn heilig verklaard omdat niemand ze nog durft aan te raken.",
            "Op dat moment is een webapplicatie laten bouwen goedkoper dan nog een jaar doorworstelen: één plek voor de data, gelijktijdig gebruik zonder conflicten, en een historiek van elke wijziging. Standaardsoftware kan dat vaak ook, dus we kijken altijd eerst of een bestaand pakket volstaat.",
            "Een webapplicatie laten maken is pas de juiste keuze wanneer er na die oefening nog een stuk overblijft dat echt eigen is aan hoe jij werkt. Meestal is dat precies het stuk waarmee je je van je concurrenten onderscheidt, en dat bouwen we dan als een web app op maat.",
          ],
        },
        {
          heading: "Rollen en rechten zijn geen bijzaak",
          body: [
            "De eerste vraag is niet welke schermen er komen, maar wie wat mag zien en doen. Een dossierbeheerder ziet zijn eigen klanten, een teamleider die van het hele team, een externe partner enkel de opdracht waarvoor hij is uitgenodigd. Die logica hoort centraal in de datalaag, niet verspreid over honderd controles in de interface.",
            "Daarnaast horen er in vrijwel elke toepassing dezelfde fundamenten: zoeken en filteren dat ook bij honderdduizend rijen snel blijft, exports die kloppen, notificaties die niet spammen, en een auditlog waarmee je achteraf kan reconstrueren wie iets gewijzigd heeft.",
            "Wat we bewust niet doen, is een scherm bouwen voor elke uitzondering. Uitzonderingen hoor je te modelleren, niet te vermenigvuldigen.",
          ],
        },
        {
          heading: "Techniek die je over vijf jaar nog kan onderhouden",
          body: [
            "We bouwen in TypeScript met React en Next.js, met Node.js en PostgreSQL erachter, en Prisma of Supabase als datalaag. Hosting draait meestal op Vercel, op accounts die op jouw naam staan. Dat is geen exotische keuze, en dat is precies de bedoeling: er zijn genoeg ontwikkelaars die ermee overweg kunnen.",
            "Snelheid ontstaat door details: paginering in plaats van veertigduizend rijen in één keer ophalen, indexen op de kolommen waar je echt op filtert, zware berekeningen die achtergrondtaken worden. Een toepassing die vlot voelt bij tien testrecords en vastloopt bij het echte volume, is niet af.",
            "Browsergebaseerde software laten ontwikkelen betekent ook dat je niets moet installeren: een update is live voor iedereen tegelijk, en dezelfde applicatie werkt op een laptop op kantoor en op een tablet in het magazijn.",
          ],
        },
        {
          heading: "Koppelen aan wat er al draait",
          body: [
            "Een webapplicatie staat zelden alleen. Ze haalt klanten uit je CRM, duwt facturen naar je boekhouding, leest voorraad uit je ERP of stuurt bestellingen door naar een webshop. Die koppelingen bepalen vaak meer werk dan de schermen zelf, dus brengen we ze in de analysefase al in kaart.",
            "Waar geen API bestaat, zoeken we een andere weg: een geplande import, een bestandsuitwisseling, of een tussenlaag die de vertaalslag maakt. Wat we niet doen, is doen alsof een koppeling gratis is omdat er ergens het woord API valt.",
          ],
        },
      ],
      faq: [
        {
          question: "Wanneer kies je voor een webapplicatie in plaats van standaardsoftware?",
          answer:
            "Wanneer je proces echt anders loopt dan wat een pakket veronderstelt, of wanneer je met plugins en tussenoplossingen meer tijd kwijt bent dan de software je oplevert. Standaardsoftware is goedkoper zolang je je aan haar logica aanpast. Zodra dat aanpassen zelf geld kost, wordt maatwerk de rustigere keuze.",
        },
        {
          question: "Werkt een webapplicatie ook op tablet en telefoon?",
          answer:
            "Ja. We bouwen responsief, zodat dezelfde toepassing werkt op een laptop, een tablet in het magazijn en een telefoon onderweg. Heb je functies nodig die de browser niet kan, zoals offline werken of pushmeldingen, dan is een mobiele app in React Native de betere keuze.",
        },
        {
          question: "Kunnen jullie een bestaande webapplicatie overnemen?",
          answer:
            "Dat doen we regelmatig. We beginnen met een doorlichting van de code, de database en de hosting, en leveren een overzicht van wat er dringend is en wat kan wachten. Daarna spreken we per fase af wat we oplossen, uitbreiden of herbouwen.",
        },
        {
          question: "Hoe testen jullie of alles blijft werken?",
          answer:
            "We werken met een aparte testomgeving en geautomatiseerde tests op de kritieke flows, zodat een wijziging op één plek niet ongemerkt iets anders breekt. Voor elke release test je zelf mee in de testomgeving, met echte data en echte gevallen.",
        },
        {
          question: "Wie is eigenaar van de applicatie en de data?",
          answer:
            "Jij. De code, de database en de accounts staan op naam van je bedrijf, en je krijgt bij de oplevering documentatie en toegang tot alles. Er is geen licentie op het maatwerk en geen enkele reden waarom je bij ons zou moeten blijven.",
        },
      ],
    },
    en: {
      metaTitle: "Web Application Development",
      metaDescription:
        "Custom web application development: roles and permissions, integrations, and speed at real data volumes. Built in TypeScript, React and PostgreSQL.",
      h1: "Web application development for the tool your team lives in",
      lead: "A web application is software people actually work in: tracking requests, managing cases, planning work, sharing data with clients. Not a brochure about the business, but the machinery of it.",
      sections: [
        {
          heading: "Start with permissions, not screens",
          body: [
            "The first question in web application development is never which pages to draw. It is who may see and do what. A case handler sees their own clients, a team lead sees the whole team, an external partner sees exactly the one job they were invited to, and nothing else.",
            "That logic belongs in the data layer, close to the tables, rather than scattered across a hundred checks in the interface. Put it in the UI and the first API endpoint someone adds in a hurry will quietly expose everything.",
            "Around it sit the same foundations in almost every project: search and filtering that stays fast at a hundred thousand rows, exports that reconcile, notifications that do not become noise, and an audit log that lets you reconstruct who changed what.",
          ],
        },
        {
          heading: "Where the spreadsheet gave up",
          body: [
            "Most of these projects begin with an overgrown spreadsheet. Two people edit it at once, three versions circulate, nobody can see who changed a number, and the formulas have become sacred because no one dares touch them.",
            "That is the point where it costs less to build a web application than to struggle through another year: one source of data, concurrent use without conflicts, and a history of every change. Off-the-shelf tools often cover it, so we always check that first.",
            "What remains after that check is usually the part that is genuinely specific to how you work, and often the part you compete on. That is the piece worth building as a custom web app.",
          ],
        },
        {
          heading: "A stack you can still maintain in five years",
          body: [
            "We build in TypeScript with React and Next.js, Node.js and PostgreSQL behind them, Prisma or Supabase as the data layer, hosted on Vercel under accounts in your name. Deliberately unexotic: plenty of developers can pick it up if we are ever out of the picture.",
            "Speed comes from unglamorous details. Pagination instead of pulling forty thousand rows into the browser, indexes on the columns you really filter by, heavy calculations moved into background jobs. Software that feels quick with ten test records and stalls on real volume is not finished.",
            "Because it is browser-based software, nothing has to be installed or rolled out. One deploy updates everyone, and the same application runs on a laptop at a desk and a tablet on a warehouse floor.",
          ],
        },
        {
          heading: "Connecting to what already runs",
          body: [
            "A web application is rarely alone. It reads customers from a CRM, pushes invoices into accounting, checks stock in an ERP or sends orders to a webshop. Those connections often carry more work than the screens, so we map them during analysis rather than discovering them in week six.",
            "Where no API exists we find another route: a scheduled import, a file exchange, a thin layer that translates between formats. What we do not do is assume a connection is free because the word API appears in a brochure.",
          ],
        },
      ],
      faq: [
        {
          question: "When is a web application better than off-the-shelf software?",
          answer:
            "When your process genuinely differs from what a package assumes, or when the plugins and workarounds cost more time than the software saves. Off-the-shelf is cheaper as long as you adapt to its logic. The moment that adaptation becomes the expensive part, custom is the calmer option.",
        },
        {
          question: "Does a web application work on tablets and phones?",
          answer:
            "Yes. We build responsively, so the same application works on a laptop, a tablet on the shop floor and a phone on the road. If you need things the browser cannot do well, such as offline use or push notifications, a mobile app in React Native is the better answer.",
        },
        {
          question: "Can you take over an application someone else built?",
          answer:
            "We do that regularly. We start with a review of the code, the database and the hosting, and hand you a list of what is urgent and what can wait. After that we agree phase by phase what gets fixed, extended or rebuilt.",
        },
        {
          question: "How do you make sure changes do not break something else?",
          answer:
            "We use a separate test environment and automated tests on the critical flows, so a change in one place does not silently break another. Before each release you test along in that environment with real data and real cases.",
        },
        {
          question: "Who owns the application and the data?",
          answer:
            "You do. The code, the database and the accounts are in your company's name, and delivery includes documentation and access to everything. There is no licence on the custom work and no reason you would have to stay with us.",
        },
      ],
    },
  },

  "crm-op-maat-laten-maken": {
    nl: {
      metaTitle: "CRM op maat laten maken",
      metaDescription:
        "Een CRM systeem op maat laten maken wanneer een standaardpakket niet past bij je verkoopproces. Met koppelingen naar je bestaande software en eigen data.",
      h1: "Een CRM op maat, of toch beter een koppeling op wat je hebt",
      lead: "De meeste bedrijven hebben geen nieuw CRM nodig maar een CRM dat klopt met hoe ze verkopen. Soms is dat maatwerk, vaak is het een laag bovenop een bestaand pakket. Wij zeggen eerlijk welk van de twee bij jou past.",
      sections: [
        {
          heading: "Eerst de vraag of het echt maatwerk moet zijn",
          body: [
            "Een standaardpakket als HubSpot, Pipedrive of Teamleader dekt een klassiek verkoopproces prima: contacten, deals, opvolging, offertes. Loopt jouw proces zo, dan is een eigen CRM zelden de goedkoopste weg.",
            "Het wordt anders zodra je verkoop verweven zit met iets specifieks: dossiers met wettelijke termijnen, prijzen die van tientallen parameters afhangen, projecten die maanden lopen met tussentijdse leveringen, of een netwerk van verdelers dat elk hun eigen klanten beheert. In zo'n geval vecht je continu tegen de veronderstellingen van het pakket.",
            "Een CRM systeem op maat laten maken is dan geen luxe maar een besparing op alle knip- en plakwerk eromheen. Wij beginnen die discussie altijd met je huidige proces, niet met een lijst functies.",
          ],
        },
        {
          heading: "Het datamodel is het echte product",
          body: [
            "Wat is een klant precies: een bedrijf, een vestiging, een contactpersoon, of alle drie met een relatie ertussen? Kan één contact bij meerdere bedrijven horen? Wat gebeurt er met de historiek als twee bedrijven fuseren? Dat soort vragen bepaalt of je systeem over drie jaar nog klopt.",
            "Daarna komt de pijplijn: welke fasen bestaan er echt, welke velden zijn verplicht per fase, en wat mag een verkoper wel en niet wijzigen. Een CRM laten bouwen dat te veel verplicht maakt, wordt niet ingevuld; een CRM dat niets verplicht, levert data op waar niemand op kan sturen.",
            "Onze vuistregel: verplicht enkel wat je later echt gebruikt in een rapport of een automatisering. De rest is optioneel en verdwijnt uit beeld tot iemand ernaar zoekt.",
          ],
        },
        {
          heading: "Wie de baas is over welk veld",
          body: [
            "Klantgegevens leven zelden op één plek. Ze zitten in je boekhouding, je webshop, je mailbox en je facturatiepakket. Een CRM koppeling laten maken betekent kiezen welk systeem eigenaar is van welk veld, want twee systemen die allebei het adres mogen wijzigen, geven vroeg of laat ruzie.",
            "Wij leggen die richting expliciet vast: het boekhoudpakket bepaalt het facturatieadres, het CRM bepaalt de contactpersoon, de webshop levert bestellingen aan. Daarna volgt de techniek: webhooks waar ze bestaan, geplande synchronisatie waar dat niet kan, en een logboek waarin je ziet wat wanneer is doorgestuurd.",
            "Zo wordt salesopvolging automatiseren concreet: een offerte die verstuurd is, herinnert zichzelf na een week, een klant die iets bestelt, verschijnt automatisch in de opvolging, en niemand hoeft nog iets over te typen.",
          ],
        },
        {
          heading: "Het systeem moet ook echt gebruikt worden",
          body: [
            "Een klantbeheersysteem op maat mislukt bijna nooit op techniek en bijna altijd op gebruik. Verkopers vullen niets in als het invullen meer tijd kost dan het oplevert, dus bouwen we schermen die eerst iets teruggeven: de volledige historiek van een klant, de volgende actie, de openstaande facturen.",
            "We betrekken daarom vanaf de analyse iemand die het systeem elke dag zal gebruiken, niet enkel wie het budget goedkeurt. Dat verschil merk je aan het aantal velden dat sneuvelt voor de bouw begint.",
          ],
        },
      ],
      faq: [
        {
          question: "Is een eigen CRM niet duurder dan een abonnement op een standaardpakket?",
          answer:
            "Op korte termijn bijna altijd, ja. Maatwerk wordt pas interessant wanneer een standaardpakket je proces niet dekt en je die kloof elke maand overbrugt met handwerk, plugins of dubbele invoer. In een gesprek van 30 minuten kunnen we meestal snel inschatten aan welke kant van die grens je zit.",
        },
        {
          question: "Kunnen jullie onze bestaande klantgegevens overzetten?",
          answer:
            "Ja. Een migratie begint met een analyse van de kwaliteit van je huidige data: dubbele contacten, ontbrekende velden, adressen in vrije tekst. We doen altijd eerst een testmigratie op de echte data, zodat je ziet wat er overkomt voor we overschakelen.",
        },
        {
          question: "Kunnen we het CRM koppelen aan onze boekhouding en webshop?",
          answer:
            "Dat is meestal de kern van het project. We spreken per veld af welk systeem de baas is, bouwen de koppelingen met webhooks of geplande synchronisatie, en voorzien een logboek waarin je fouten ziet en opnieuw kan versturen. Zonder die logging is een koppeling een zwarte doos.",
        },
        {
          question: "Wat als we later toch naar een standaardpakket willen?",
          answer:
            "Dan neem je je data gewoon mee. Alles staat in een PostgreSQL-database op accounts die op jouw naam staan, en we voorzien exports in open formaten. Je zit nergens vast, want de code en de data zijn van jou.",
        },
        {
          question: "Hoe lang duurt zo'n project?",
          answer:
            "Dat hangt af van het aantal rollen, de koppelingen en de hoeveelheid data die mee moet. We werken in fasen met een vaste prijs per fase, zodat je na elke fase werkende software ziet en zelf beslist wanneer de volgende start.",
        },
      ],
    },
    en: {
      metaTitle: "Custom CRM Development",
      metaDescription:
        "Custom CRM development for sales processes an off-the-shelf tool cannot model, plus integrations with the systems you already run. Your data stays yours.",
      h1: "Custom CRM development, or a smarter layer on the CRM you have",
      lead: "Most companies do not need a new CRM. They need a CRM that matches how they actually sell. Sometimes that means building one, more often it means a layer on top of the tool already in place, and we will tell you which.",
      sections: [
        {
          heading: "The honest question first",
          body: [
            "HubSpot, Pipedrive and similar tools cover a classic sales motion perfectly well: contacts, deals, follow-ups, quotes. If that is your motion, deciding to build a CRM from scratch is rarely the cheapest route to anything.",
            "It changes when selling is tangled up with something specific: cases with legal deadlines, prices that depend on dozens of parameters, projects that run for months with staged deliveries, or a dealer network where every partner manages their own customers. Then you spend your days fighting the assumptions of the package.",
            "That is the point where a customer management system built around your process saves more than it costs, because it removes the spreadsheets and copy-paste steps that grew around the tool.",
          ],
        },
        {
          heading: "The data model is the product",
          body: [
            "What exactly is a customer: a company, a site, a person, or all three with relationships between them? Can one contact belong to several companies? What happens to the history when two clients merge? Those answers decide whether the system still makes sense in three years.",
            "Then the pipeline. Which stages genuinely exist, which fields are mandatory in each, and what a sales rep may change after the fact. Make too much mandatory and nobody fills it in; make nothing mandatory and you get data nobody can steer on.",
            "Our rule of thumb: a field is only required if it feeds a report or an automation later. Everything else stays optional and out of sight until someone searches for it.",
          ],
        },
        {
          heading: "Connecting the systems around it",
          body: [
            "Customer data never lives in one place. It sits in accounting, in the webshop, in inboxes and in the invoicing tool. Any CRM integration starts with deciding which system owns which field, because two systems that may both edit an address will eventually disagree.",
            "We write that direction down: accounting owns the billing address, the CRM owns the contact person, the webshop supplies orders. Then comes the plumbing, webhooks where they exist, scheduled synchronisation where they do not, and a log that shows what was sent, when, and what failed.",
            "That is what makes sales pipeline automation concrete rather than aspirational: a quote that chases itself after a week, an order that lands in follow-up on its own, and nothing retyped between systems.",
          ],
        },
        {
          heading: "Adoption decides the outcome",
          body: [
            "Custom CRM development rarely fails on engineering. They fail because nobody uses them. Sales people stop entering data the moment entering it costs more than it returns, so the screens have to give something back first: the full history of an account, the next action, the outstanding invoices.",
            "So we involve someone who will use the system daily from the analysis onwards, not only whoever signs off the budget. You can measure the difference in how many fields get cut before development starts.",
          ],
        },
      ],
      faq: [
        {
          question: "Is a custom CRM not more expensive than a subscription?",
          answer:
            "In the short term, almost always yes. Custom only becomes the rational choice when a package does not cover your process and you bridge that gap every month with manual work, plugins or double entry. A 30-minute call is usually enough to work out which side of that line you are on.",
        },
        {
          question: "Can you migrate our existing customer data?",
          answer:
            "Yes. A migration starts with assessing the quality of what you have: duplicate contacts, missing fields, addresses stored as free text. We always run a test migration on real data first so you can see exactly what comes across before anyone switches over.",
        },
        {
          question: "Can the CRM connect to our accounting and webshop?",
          answer:
            "That is usually the heart of the project. We agree per field which system is authoritative, build the connections with webhooks or scheduled synchronisation, and add a log where you can see failures and retry them. Without that logging, an integration is a black box.",
        },
        {
          question: "What if we want to move to a standard package later?",
          answer:
            "Then you take your data with you. Everything sits in a PostgreSQL database on accounts in your name, and we provide exports in open formats. You own the code and the data, so nothing holds you in place.",
        },
        {
          question: "How long does a project like this take?",
          answer:
            "It depends on the number of roles, the integrations and the volume of data that has to move. We work in phases with a fixed price per phase, so you see working software at the end of each one and decide yourself when the next begins.",
        },
      ],
    },
  },

  "erp-op-maat-laten-maken": {
    nl: {
      metaTitle: "ERP op maat laten maken",
      metaDescription:
        "Voorraad, orders en productie in één systeem. Brisk bouwt ERP-maatwerk en koppelingen rond je bestaande pakket, met aandacht voor datakwaliteit.",
      h1: "ERP op maat: zelden alles vervangen, meestal de gaten dichten",
      lead: "Een volledig ERP vervangen is een van de duurste beslissingen die een bedrijf kan nemen. Meestal zit het probleem in een handvol processen die het pakket niet dekt, en daar valt met maatwerk veel meer te winnen dan met een migratie.",
      sections: [
        {
          heading: "Bouwen rond het pakket, niet erover",
          body: [
            "Draait je boekhouding, je facturatie en je stamdata al in een ERP, dan is dat systeem meestal niet het probleem. Het probleem zit in wat eromheen gebeurt: de planning in Excel, de kwaliteitscontrole op papier, het magazijn dat met een eigen lijst werkt, de verkoop die prijzen manueel narekent.",
            "Voor die stukken bouwen we software die aansluit op het ERP in plaats van het te vervangen. Dat verkleint het risico enorm: gaat er iets mis in de nieuwe module, dan blijven je facturatie en je boekhouding gewoon draaien.",
            "Een ERP systeem op maat laten maken is dus meestal geen big bang, maar een reeks modules die één voor één een proces overnemen, elk met een eigen scope en prijs.",
          ],
        },
        {
          heading: "Integraties stranden op datakwaliteit, niet op techniek",
          body: [
            "De techniek van een ERP koppeling laten maken is zelden het moeilijkste. Het echte werk begint bij de data: hetzelfde artikel dat onder drie nummers bestaat, eenheden die in het ene systeem in stuks en in het andere in dozen staan, klanten die twee keer bestaan met een spatie verschil, en velden die ooit als vrije tekst zijn opgezet en nu alles bevatten behalve wat er hoort te staan.",
            "Daarom start elk integratieproject bij ons met een steekproef op de echte data. We tellen dubbels, meten hoeveel records de verplichte velden missen en zoeken uit of er een stabiele sleutel bestaat waarop je twee systemen kan matchen. Zonder zo'n sleutel bouw je een koppeling op drijfzand.",
            "Daarna leggen we per veld vast welke kant de data op stroomt en wat er gebeurt als een record wordt geweigerd. Fouten mogen nooit stil verdwijnen: ze horen in een wachtrij te staan waar iemand ze ziet en opnieuw kan aanbieden.",
          ],
        },
        {
          heading: "Voorraad en orders zijn een kwestie van timing",
          body: [
            "Een voorraadbeheersysteem laten maken lijkt eenvoudig tot je de vragen stelt die ertoe doen. Is voorraad die gereserveerd is voor een order nog beschikbaar? Wat gebeurt er met een levering die deels geannuleerd wordt? Hoe verwerk je een telling die afwijkt van wat het systeem denkt?",
            "Hetzelfde geldt voor een ordermanagementsysteem laten bouwen: een order doorloopt statussen, en elke status heeft regels over wat nog mag veranderen. Wij modelleren dat expliciet, met een historiek per wijziging, zodat je achteraf altijd kan reconstrueren wat er gebeurd is en waarom.",
            "Dat is ook waarom we voorraadmutaties liever als gebeurtenissen bewaren dan als één getal dat overschreven wordt. Een getal vertelt je wat er nu staat, een reeks gebeurtenissen vertelt je hoe je daar gekomen bent.",
          ],
        },
        {
          heading: "Overschakelen zonder de winkel te sluiten",
          body: [
            "Bedrijfssoftware laten ontwikkelen betekent bijna altijd dat er iets live vervangen wordt terwijl het werk doorloopt. Dat vraagt een plan: een periode waarin oud en nieuw naast elkaar draaien, een testmigratie op productiedata, en een duidelijk moment waarop de nieuwe module de waarheid wordt.",
            "We spreken vooraf ook af hoe we terugvallen als het misloopt. Een migratie zonder terugweg is geen migratie maar een gok, en die nemen we niet met jouw orderstroom.",
          ],
        },
      ],
      checklist: {
        title: "Wat we nakijken voor we een ERP-koppeling bouwen",
        items: [
          "Bestaat er een stabiele sleutel per artikel, klant en order",
          "Hoeveel dubbele records staan er vandaag in beide systemen",
          "Welke velden zijn vrije tekst die eigenlijk een keuzelijst moeten zijn",
          "Welke eenheden en valuta gebruiken de systemen onderling",
          "Wie mag welk veld wijzigen, en in welk systeem",
          "Wat gebeurt er met records die geweigerd worden",
        ],
      },
      faq: [
        {
          question: "Vervangen jullie een volledig ERP-pakket?",
          answer:
            "Alleen als daar een goede reden voor is. In de meeste gevallen is het slimmer om je boekhouding en facturatie te laten staan en de processen eromheen op maat te bouwen. Zo houd je het risico klein en zie je sneller resultaat.",
        },
        {
          question: "Onze data zit vol fouten. Kunnen we dan wel koppelen?",
          answer:
            "Ja, maar niet zonder eerst op te ruimen. We meten hoe erg het is met een steekproef op de echte data en leveren een lijst met wat opgekuist moet worden en wat de software kan opvangen. Een koppeling bouwen op vervuilde data verplaatst het probleem alleen maar sneller.",
        },
        {
          question: "Werken jullie met bestaande ERP-leveranciers samen?",
          answer:
            "Regelmatig. We werken met de API of de exportmogelijkheden die het pakket biedt en stemmen af met de partij die het beheert. Waar geen API bestaat, zoeken we een andere weg, bijvoorbeeld een geplande bestandsuitwisseling.",
        },
        {
          question: "Hoe voorkomen jullie dat twee systemen elkaar overschrijven?",
          answer:
            "Door per veld één eigenaar aan te duiden en de synchronisatie in die richting te laten lopen. Waar toch twee systemen mogen schrijven, gebruiken we tijdstempels en een expliciete regel voor conflicten, en houden we een logboek bij van elke wijziging.",
        },
        {
          question: "Kunnen we in fasen overschakelen?",
          answer:
            "Dat is precies onze aanpak. We nemen één proces per keer over, laten oud en nieuw een tijdje naast elkaar draaien en schakelen pas volledig om als de nieuwe module in productie bewezen heeft dat ze klopt.",
        },
      ],
    },
    en: {
      metaTitle: "Custom ERP Development",
      metaDescription:
        "Custom ERP development and integrations around the package you already run: stock, orders and production, with data quality checked before we build.",
      h1: "Custom ERP development that fills gaps instead of replacing everything",
      lead: "Replacing a full ERP is one of the most expensive decisions a company can make. In most cases the pain sits in a handful of processes the package never covered, and that is where custom work pays back fastest.",
      sections: [
        {
          heading: "Integrations fail on data, not on code",
          body: [
            "The technical side of an ERP integration is rarely the hard part. The data is. The same article existing under three codes, units counted in pieces on one side and boxes on the other, customers duplicated by a single trailing space, and free-text fields that by now contain everything except what they were meant for.",
            "So every integration project here starts with a sample of the real data. We count duplicates, measure how many records are missing supposedly mandatory fields, and look for a stable key to match two systems on. Without such a key, you are building on sand.",
            "Then we write down, field by field, which way data flows and what happens when a record is rejected. Failures must never disappear quietly; they belong in a queue a human can see and replay.",
          ],
        },
        {
          heading: "Build around the package, not over it",
          body: [
            "Custom ERP development is mostly an exercise in restraint. If accounting, invoicing and master data already run in an ERP, that system is usually not the problem. The problem is what happens around it: planning in a spreadsheet, quality control on paper, a warehouse working from its own list, sales recalculating prices by hand.",
            "For those pieces we build software that plugs into the ERP instead of replacing it. That keeps the risk contained: if something goes wrong in the new module, your invoicing and bookkeeping keep running.",
            "It also means business software development becomes a series of modules, each taking over one process, each with its own scope and price, rather than a single high-stakes migration.",
          ],
        },
        {
          heading: "Stock and orders are questions about time",
          body: [
            "An inventory management system looks simple until you ask the questions that matter. Is stock reserved for an order still available? What happens to a delivery that is partly cancelled? How do you handle a physical count that disagrees with the system?",
            "The same goes for an order management system: an order moves through states, and each state carries rules about what may still change. We model that explicitly, with a history per change, so anyone can reconstruct afterwards what happened and why.",
            "It is also why we prefer to store stock movements as events rather than overwrite a single number. A number tells you where you are; a series of events tells you how you got there.",
          ],
        },
        {
          heading: "Switching over without closing the shop",
          body: [
            "This kind of work almost always means replacing something live while the business keeps trading. That needs a plan: a period where old and new run side by side, a rehearsed migration on production data, and a defined moment when the new module becomes the truth.",
            "We also agree up front how to roll back. A migration without a way back is a gamble, and your order flow is not the place for one.",
            "Pick the date with the business rather than with the calendar. Nobody should be migrating an order flow in the week before a trade fair or through the busiest fortnight of the year.",
          ],
        },
      ],
      checklist: {
        title: "What we check before building an ERP connection",
        items: [
          "Is there a stable key per article, customer and order",
          "How many duplicate records exist on each side today",
          "Which free-text fields should really be a fixed list",
          "Which units and currencies each system uses",
          "Who may change which field, and in which system",
          "What happens to records the target system rejects",
        ],
      },
      faq: [
        {
          question: "Do you replace an entire ERP package?",
          answer:
            "Only when there is a strong reason to. In most cases it is smarter to leave accounting and invoicing where they are and build the surrounding processes to measure. That keeps the risk small and shows results far sooner.",
        },
        {
          question: "Our data is messy. Can we still integrate?",
          answer:
            "Yes, but not before cleaning up. We measure the damage with a sample of real data and hand you a list of what has to be fixed at the source and what the software can absorb. Building on dirty data only makes the problem travel faster.",
        },
        {
          question: "Do you work with our existing ERP supplier?",
          answer:
            "Often. We use the API or export options the package offers and coordinate with whoever maintains it. Where no API exists we find another route, such as a scheduled file exchange on an agreed format.",
        },
        {
          question: "How do you stop two systems from overwriting each other?",
          answer:
            "By giving every field a single owner and letting synchronisation run in that direction. Where both sides genuinely need to write, we use timestamps plus an explicit conflict rule, and keep a log of every change so disputes can be settled with evidence.",
        },
        {
          question: "Can we switch over in stages?",
          answer:
            "That is exactly the approach. We take over one process at a time, let old and new run in parallel for a while, and only cut across fully once the new module has proven itself in production.",
        },
      ],
    },
  },

  "boekingssysteem-laten-ontwikkelen": {
    nl: {
      metaTitle: "Boekingssysteem laten ontwikkelen",
      metaDescription:
        "Een boekingssysteem laten ontwikkelen dat dubbele boekingen echt uitsluit: beschikbaarheid, tijdslots, betalingen en annulaties op maat van je zaak.",
      h1: "Een boekingssysteem laten ontwikkelen zonder dubbele boekingen",
      lead: "Het formulier is het makkelijkste deel van een boekingssysteem. Het moeilijke deel is beschikbaarheid: wat is er nog vrij, voor wie, hoelang blijft dat waar, en wat gebeurt er als twee mensen tegelijk op bevestigen klikken.",
      sections: [
        {
          heading: "Beschikbaarheid is een berekening, geen lijst",
          body: [
            "Een boekingssysteem laten ontwikkelen begint bij één inzicht: vrije plekken staan nergens klaar, je berekent ze. Openingsuren min bestaande boekingen, min blokkades, min sluitingsdagen, min de tijd die je nodig hebt tussen twee afspraken, rekening houdend met hoelang de gekozen dienst duurt en welke medewerker of ruimte ze kan uitvoeren.",
            "Zodra er meerdere resources meespelen, wordt dat een puzzel: een behandeling die twee medewerkers vraagt, een zaal die maar één groep tegelijk aankan, materiaal dat tussen twee reservaties gereinigd moet worden. Een reserveringssysteem laten maken betekent die regels expliciet opschrijven voor er iemand aan schermen begint.",
            "En dan is er nog tijd zelf. Zomeruur en winteruur maken uren dubbel of laten ze verdwijnen, en klanten in een andere tijdzone zien iets anders dan jij. Wij bewaren alles in UTC en tonen het in de tijdzone van de kijker, met de openingsuren in de lokale tijd van de vestiging.",
          ],
        },
        {
          heading: "Dubbele boekingen sluit je uit in de database",
          body: [
            "Twee mensen die om 14u02 dezelfde laatste plek nemen, is geen zeldzaamheid maar de normale gang van zaken bij een campagne. Controleren in de applicatiecode of een slot nog vrij is en daarna boeken, is precies de fout die dubbele boekingen veroorzaakt: tussen de controle en het wegschrijven zit ruimte.",
            "Daarom leggen we de garantie in PostgreSQL zelf, met een constraint die overlappende reservaties voor dezelfde resource simpelweg weigert. De database is dan de scheidsrechter, en de applicatie hoeft die fout alleen nog netjes te tonen.",
            "Daar hoort ook een tijdelijke reservering bij tijdens het afrekenen: het slot wordt vastgehouden zolang de betaling loopt en komt automatisch vrij als er niets gebeurt. Zonder die vervaltijd houd je plekken bezet voor mensen die nooit terugkomen.",
          ],
        },
        {
          heading: "Betalen, annuleren en niet komen opdagen",
          body: [
            "Vraag je een voorschot of het volledige bedrag? Wij koppelen Stripe en laten de bevestiging pas volgen op een geslaagde betaling, verwerkt via webhooks zodat een trage of afgebroken sessie geen spookboekingen achterlaat.",
            "Annuleringsregels horen in het systeem, niet in een e-mail: tot wanneer mag een klant kosteloos annuleren, wat gebeurt er daarna, en mag iemand zelf verplaatsen. Herinneringen per e-mail verlagen het aantal no-shows, en wie toch niet komt opdagen, hoor je terug te vinden in je cijfers.",
            "Wie zoekt op website met boekingssysteem laten maken, denkt meestal aan een externe tool in een pop-up. De boeking hoort beter op je site zelf, in je eigen ontwerp, zodat klanten niet halverwege ergens anders belanden.",
          ],
        },
        {
          heading: "De kant van je eigen team",
          body: [
            "Het klantscherm is de helft. Je team heeft een agenda nodig waarin ze slepen, blokkeren, verplaatsen en telefonisch boeken, met de juiste rechten per rol. Planningssoftware laten ontwikkelen die alleen aan de klantkant klopt, verplaatst het werk gewoon naar achteren.",
            "Daar hoort ook synchronisatie bij met de agenda's die je team al gebruikt, zodat een privé-afspraak in Google Calendar automatisch een blokkade wordt. Een afsprakensysteem op maat wint het van een standaardtool op precies deze punten: jouw regels, jouw rollen, jouw uitzonderingen.",
          ],
        },
      ],
      checklist: {
        title: "Vragen die we in de analyse altijd stellen",
        items: [
          "Wat is de resource: een medewerker, een ruimte, een toestel of een combinatie",
          "Hoelang duurt elke dienst, en hoeveel tijd zit er tussen twee afspraken",
          "Mag een klant zelf verplaatsen of annuleren, en tot wanneer",
          "Betaal je vooraf, met voorschot, of achteraf",
          "Welke uitzonderingen bestaan er op de openingsuren",
          "Wie mag boekingen aanpassen, en moet dat traceerbaar zijn",
        ],
      },
      faq: [
        {
          question: "Hoe voorkomen jullie dubbele boekingen precies?",
          answer:
            "Door de regel in de database te leggen in plaats van in de applicatiecode. PostgreSQL weigert een reservatie die overlapt met een bestaande voor dezelfde resource, ook als twee aanvragen op dezelfde milliseconde binnenkomen. De applicatie vangt die weigering op en toont de klant meteen de eerstvolgende vrije plek.",
        },
        {
          question: "Kunnen klanten online betalen bij het boeken?",
          answer:
            "Ja. We koppelen Stripe voor kaartbetalingen en de lokale betaalmethodes die je klanten gebruiken, en houden het tijdslot vast zolang de betaling loopt. De boeking wordt pas definitief bevestigd wanneer de betaling via een webhook bevestigd is.",
        },
        {
          question: "Kan het systeem koppelen met Google Calendar of Outlook?",
          answer:
            "Dat kan. Afspraken kunnen als agenda-items naar je team gepusht worden, en privé-afspraken in hun agenda kunnen omgekeerd een blokkade worden in het boekingssysteem. Zo hoeft niemand twee agenda's bij te houden.",
        },
        {
          question: "Werkt zo'n systeem ook met meerdere vestigingen?",
          answer:
            "Ja. Elke vestiging krijgt eigen openingsuren, eigen resources en eigen medewerkers, en je klant kiest eerst de locatie. In de rapportage kan je daarna per vestiging of over het geheel kijken.",
        },
        {
          question: "Waarom niet gewoon een bestaande boekingstool gebruiken?",
          answer:
            "Als je aanbod eenvoudig is, is dat vaak de betere keuze en zullen we dat ook zeggen. Maatwerk wordt interessant zodra je regels niet in een standaardtool passen, bijvoorbeeld bij gecombineerde resources, prijzen die afhangen van het moment, of een boekingsflow die in je eigen site en huisstijl moet leven.",
        },
      ],
    },
    en: {
      metaTitle: "Booking System Development",
      metaDescription:
        "Booking system development where availability is calculated correctly and double bookings are impossible by design. Payments, cancellations and staff views.",
      h1: "Booking system development where double bookings cannot happen",
      lead: "The form is the easy half of a booking system. The hard half is availability: what is still free, for whom, how long that stays true, and what happens when two people press confirm at the same second.",
      sections: [
        {
          heading: "Two people, one slot, one millisecond apart",
          body: [
            "Checking in application code whether a slot is free and then writing the booking is exactly how double bookings happen. Between the check and the write there is a gap, and under a campaign that gap gets hit several times a day.",
            "So we put the guarantee in PostgreSQL itself, with a constraint that refuses any reservation overlapping an existing one for the same resource. The database becomes the referee; the application only has to present the refusal politely and offer the next free slot.",
            "The same logic covers checkout. A slot is held while payment runs and released automatically if nothing happens, because a reservation system without an expiry quietly fills up with people who never came back.",
          ],
        },
        {
          heading: "Availability is calculated, never stored as a list",
          body: [
            "Booking system development starts with one realisation: free slots sit nowhere ready to be read, you compute them. Opening hours minus existing bookings, minus blocks, minus closing days, minus the turnaround time between appointments, adjusted for how long the chosen service takes and which staff member or room can deliver it.",
            "Add several resources and it becomes a genuine puzzle. A treatment needing two people, a room that holds one group at a time, equipment that must be cleaned between uses. Those rules belong on paper before anyone designs a screen.",
            "Then there is time itself. Daylight saving makes hours repeat or vanish, and a customer in another country sees something different from you. We store everything in UTC and render it in the viewer's timezone, with opening hours expressed in the local time of the location.",
          ],
        },
        {
          heading: "Payment, cancellation and no-shows",
          body: [
            "Deposit or full amount up front? We connect Stripe and only confirm once payment succeeds, processed through webhooks so an abandoned checkout never leaves a ghost booking behind.",
            "Cancellation rules belong in the system rather than in an email signature: until when a customer can cancel for free, what happens after that, and whether they may reschedule themselves. Reminders reduce no-shows, and the ones that still happen should show up in your numbers.",
            "If you are considering a website with booking built in, the booking should happen on your own site rather than in a third-party pop-up that breaks the design and sends customers elsewhere.",
          ],
        },
        {
          heading: "The side your own team uses",
          body: [
            "The customer screen is half the job. Your team needs a calendar they can drag, block, move and phone-book in, with permissions per role. Scheduling software that only works on the customer side just relocates the work.",
            "That includes syncing with the calendars they already use, so a personal appointment in Google Calendar becomes a block automatically. A custom appointment system earns its keep on exactly these points: your rules, your roles, your exceptions.",
            "Reporting closes the loop: which slots stay empty, which services get cancelled most, how far ahead people book. Those numbers turn your opening hours from a habit into a decision.",
          ],
        },
      ],
      checklist: {
        title: "Questions we always ask during analysis",
        items: [
          "What is the resource: a person, a room, a machine, or a combination",
          "How long does each service take, and what gap sits between two of them",
          "May customers reschedule or cancel themselves, and until when",
          "Do you charge up front, take a deposit, or invoice afterwards",
          "Which exceptions apply to the standard opening hours",
          "Who may edit a booking, and does that need an audit trail",
        ],
      },
      faq: [
        {
          question: "How exactly do you prevent double bookings?",
          answer:
            "By enforcing the rule in the database rather than in application code. PostgreSQL rejects any reservation that overlaps an existing one for the same resource, even when two requests arrive in the same millisecond. The application catches that rejection and immediately offers the customer the next available slot.",
        },
        {
          question: "Can customers pay while booking?",
          answer:
            "Yes. We connect Stripe for card payments and the local methods your customers expect, and hold the slot while the payment is in progress. The booking is only confirmed once the payment has been confirmed through a webhook.",
        },
        {
          question: "Can it sync with Google Calendar or Outlook?",
          answer:
            "It can. Appointments can be pushed to your team's calendars as events, and personal entries in those calendars can become blocks in the booking system. That way nobody has to maintain two agendas.",
        },
        {
          question: "Does this work for several locations?",
          answer:
            "Yes. Each location gets its own opening hours, resources and staff, and the customer picks a location first. Reporting can then be viewed per location or across the whole business.",
        },
        {
          question: "Why not just use an existing booking tool?",
          answer:
            "If your offer is simple, an existing tool is often the better choice and we will say so. Custom becomes worthwhile once your rules do not fit a standard product, for example combined resources, prices that depend on timing, or a booking flow that has to live inside your own site and brand.",
        },
      ],
    },
  },

  "api-koppelingen-laten-maken": {
    nl: {
      metaTitle: "API koppeling laten maken",
      metaDescription:
        "Een API koppeling laten maken die blijft draaien: authenticatie, veldmapping, herhaalpogingen en logging. Brisk koppelt webshop, boekhouding, CRM en ERP.",
      h1: "Een API koppeling laten maken die ook blijft werken",
      lead: "Twee systemen praten pas echt met elkaar als iemand heeft beslist welke velden bij elkaar horen, welke kant de data op gaat en wat er gebeurt als er iets misloopt. Dat laatste stuk is waar de meeste koppelingen sneuvelen.",
      sections: [
        {
          heading: "Wat er allemaal in zo'n koppeling zit",
          body: [
            "Een API koppeling laten maken is zelden een kwestie van één verzoek. Er is authenticatie die verloopt en vernieuwd moet worden, een veldmapping tussen twee datamodellen die nooit helemaal overeenkomen, een keuze tussen realtime en gepland, en een limiet op het aantal verzoeken per minuut die je moet respecteren.",
            "Daarnaast heb je idempotentie nodig: als hetzelfde bericht twee keer binnenkomt, mag er niet twee keer een factuur ontstaan. Dat los je op met een unieke sleutel per bericht, zodat een herhaling gewoon genegeerd wordt in plaats van dubbel verwerkt.",
            "Software koppelingen laten bouwen zonder herhaalpogingen met oplopende wachttijd, een wachtrij voor mislukte berichten en een logboek dat je kan doorzoeken, levert een systeem op dat werkt tot de eerste storing en daarna stil kapot is.",
          ],
        },
        {
          heading: "Webhooks waar het kan, polling waar het moet",
          body: [
            "Stuurt het andere systeem webhooks, dan is dat de beste optie: je hoort meteen wanneer er iets verandert. Wel moet je die webhooks verifiëren, snel bevestigen en het echte werk naar de achtergrond duwen, anders lopen ze in een time-out en gaat de andere kant opnieuw proberen.",
            "Bestaat er geen webhook, dan blijft polling over: elk kwartier vragen wat er gewijzigd is sinds de vorige keer. Dat werkt prima zolang je op een gewijzigd-sinds-veld kan filteren en niet elke keer de volledige catalogus binnenhaalt.",
            "Systemen aan elkaar koppelen betekent ook accepteren dat de andere kant soms plat ligt. Een goede koppeling wacht dan gewoon en werkt bij zodra de verbinding er weer is, zonder dat iemand iets manueel moet herstellen.",
          ],
        },
        {
          heading: "De koppelingen die we het vaakst bouwen",
          body: [
            "Een webshop koppelen aan boekhouding is de klassieker: bestellingen worden facturen, betalingen worden afgepunt, en creditnota's lopen dezelfde weg terug. De valkuil zit in btw-tarieven, kortingen en verzendkosten die in beide systemen op een andere manier geboekt worden.",
            "Even vaak gevraagd: een webshop koppelen aan voorraadbeheer, waarbij de vraag vooral is wie de waarheid bepaalt en hoe snel. Verkoop je hetzelfde artikel ook in een winkel, dan is een voorraadstand van een uur oud al te traag en heb je een reservering nodig op het moment van bestellen.",
            "Verder koppelen we CRM's, ERP's, planningstools, betaalproviders en verzendpartners. Bestaat er geen API, dan werken we met geplande bestandsuitwisseling in een afgesproken formaat, en dat werkt vaak beter dan een half API'tje dat elk kwartaal verandert.",
          ],
        },
        {
          heading: "Onderhoud hoort erbij",
          body: [
            "API's veranderen. Een leverancier zet een versie stop, voegt een verplicht veld toe of scherpt zijn limieten aan. Wij bouwen daarom monitoring op elke koppeling: als er een uur niets is doorgestuurd terwijl dat wel hoorde, krijgt iemand een melding voor je klant het merkt.",
            "Bij de oplevering krijg je documentatie van de mapping, de logins en de logging, plus toegang tot alles. De koppeling is van jou, en een ander team kan ze overnemen zonder eerst te moeten raden wat er gebeurt.",
          ],
        },
      ],
      checklist: {
        title: "Wat er standaard in elke koppeling zit",
        items: [
          "Een veldmapping op papier, met richting per veld",
          "Herhaalpogingen met oplopende wachttijd bij tijdelijke fouten",
          "Idempotentie, zodat een dubbel bericht geen dubbele verwerking geeft",
          "Een wachtrij voor berichten die blijven falen, met knop om opnieuw te sturen",
          "Doorzoekbare logging van wat er wanneer verstuurd en ontvangen is",
          "Monitoring die alarm slaat als de stroom stilvalt",
        ],
      },
      faq: [
        {
          question: "Wat als het andere systeem geen API heeft?",
          answer:
            "Dan zoeken we een andere weg. Vaak biedt zo'n pakket een export of een importmap, en bouwen we een geplande uitwisseling in een afgesproken formaat. Dat is minder elegant dan een API, maar het is stabiel en goed te monitoren.",
        },
        {
          question: "Hoe weten we of een koppeling correct loopt?",
          answer:
            "Elke koppeling krijgt een logboek waarin je per bericht ziet wat er verstuurd is, wat er terugkwam en wat er eventueel misging. Daarnaast staat er monitoring op die alarm slaat wanneer de stroom stilvalt, zodat je het weet voor een klant belt.",
        },
        {
          question: "Kunnen jullie een bestaande koppeling overnemen?",
          answer:
            "Ja. We beginnen met uitzoeken wat ze precies doet en waar ze faalt, en zetten dat op papier. Daarna herstellen we wat kapot is of bouwen we ze opnieuw, afhankelijk van hoe de bestaande code eraan toe is.",
        },
        {
          question: "Wat kost een koppeling ongeveer?",
          answer:
            "Dat hangt af van het aantal velden, de richting van de synchronisatie en de kwaliteit van de API aan de andere kant. We geven een vaste prijs per koppeling nadat we de documentatie hebben doorgenomen, zodat je vooraf weet waar je aan toe bent.",
        },
        {
          question: "Blijven jullie de koppeling onderhouden?",
          answer:
            "Dat kan, en het is bij koppelingen sterk aan te raden omdat externe API's blijven veranderen. In een onderhoudsformule volgen we versiewijzigingen op, houden we de monitoring in de gaten en passen we aan wanneer de andere kant iets wijzigt.",
        },
      ],
    },
    en: {
      metaTitle: "API Integration Development",
      metaDescription:
        "API integration development that survives contact with reality: field mapping, retries, idempotency, logging and monitoring. Webshop, accounting, CRM, ERP.",
      h1: "API integration development that keeps working after launch",
      lead: "Two systems only really talk once someone has decided which fields match, which way data flows, and what happens when something fails. That last part is where most integrations quietly die.",
      sections: [
        {
          heading: "What an integration actually contains",
          body: [
            "API integration development is rarely a matter of one request. There is authentication that expires and has to be refreshed, a mapping between two data models that never quite agree, a choice between real time and scheduled, and a rate limit you have to respect without dropping data.",
            "Then there is idempotency. If the same message arrives twice, you must not create two invoices. A unique key per message solves it: a repeat is recognised and ignored rather than processed again.",
            "Anyone who sets out to build software integrations without retries with exponential backoff, a queue for failed messages and searchable logging ends up with something that works until the first outage and is silently broken after it.",
          ],
        },
        {
          heading: "Webhooks where possible, polling where necessary",
          body: [
            "If the other system sends webhooks, take them: you hear about changes the moment they happen. But verify the signature, acknowledge fast and push the real work to a background job, or the call times out and the sender starts retrying.",
            "Where no webhook exists, polling remains. Ask every fifteen minutes what changed since last time. That works fine as long as there is a modified-since filter and you are not pulling the entire catalogue on every run.",
            "Serious systems integration also means accepting that the other side goes down sometimes. A good connection simply waits and catches up once it returns, without anyone repairing anything by hand.",
          ],
        },
        {
          heading: "The connections we build most often",
          body: [
            "To connect a webshop to accounting is the classic: orders become invoices, payments get matched, credit notes travel the same road back. The traps are VAT rates, discounts and shipping costs, which the two systems almost never book the same way.",
            "Just as common is the request to connect a webshop to inventory, where the real question is who owns the truth and how fast. If you also sell the same article in a shop, an hour-old stock level is already too slow and you need a reservation at the moment of ordering.",
            "Beyond that we connect CRMs, ERPs, planning tools, payment providers and carriers. Where there is no API, a scheduled file exchange in an agreed format often beats a half-finished API that changes every quarter.",
          ],
        },
        {
          heading: "Maintenance is part of the deal",
          body: [
            "APIs change. A supplier retires a version, adds a required field or tightens its limits. So every integration we build gets monitoring: if nothing has moved for an hour when it should have, someone hears about it before your customer does.",
            "At handover you receive documentation of the mapping, the credentials and the logging, plus access to all of it. The integration is yours, and another team can take it over without reverse-engineering what it does.",
            "Version changes are also easier to survive when the mapping lives in one place instead of being scattered through the codebase. A supplier renaming a field then costs one edit and one deploy, not an afternoon of searching.",
          ],
        },
      ],
      checklist: {
        title: "In every integration we ship",
        items: [
          "A written field mapping, with the direction noted per field",
          "Retries with exponential backoff on temporary failures",
          "Idempotency, so a duplicate message cannot be processed twice",
          "A dead-letter queue with a button to replay failed messages",
          "Searchable logs of what was sent and received, and when",
          "Monitoring that raises an alarm when the flow stops",
        ],
      },
      faq: [
        {
          question: "What if the other system has no API?",
          answer:
            "Then we find another route. Such packages usually offer an export or an import folder, and we build a scheduled exchange in an agreed format. It is less elegant than an API, but it is stable and easy to monitor.",
        },
        {
          question: "How do we know an integration is running correctly?",
          answer:
            "Every integration gets a log showing per message what was sent, what came back and what failed. On top of that sits monitoring that raises an alarm when the flow stops, so you find out before a customer calls you.",
        },
        {
          question: "Can you take over an integration someone else built?",
          answer:
            "Yes. We start by working out what it actually does and where it fails, and write that down. After that we either repair it or rebuild it, depending on the state of the existing code.",
        },
        {
          question: "What does an integration cost?",
          answer:
            "It depends on the number of fields, the direction of synchronisation and the quality of the API on the other side. We give a fixed price per integration after reading the documentation, so you know what you are committing to before we start.",
        },
        {
          question: "Do you keep maintaining it?",
          answer:
            "We can, and for integrations it is strongly recommended because third-party APIs keep changing. Under a maintenance plan we track version changes, watch the monitoring and adjust the connection when the other side moves.",
        },
      ],
    },
  },

  "bedrijfsprocessen-automatiseren": {
    nl: {
      metaTitle: "Bedrijfsprocessen automatiseren",
      metaDescription:
        "Bedrijfsprocessen laten automatiseren begint bij het proces dat het meeste handwerk kost. Offertes, uren, facturatie en goedkeuringen in software gegoten.",
      h1: "Bedrijfsprocessen automatiseren begint bij tellen, niet bij tools",
      lead: "Automatisering die werkt, start altijd op dezelfde manier: je telt hoe vaak iets gebeurt, hoeveel handen eraan komen en waar het blijft liggen. Pas daarna weet je welk proces de moeite loont en welk je beter met rust laat.",
      sections: [
        {
          heading: "Tel eerst, bouw daarna",
          body: [
            "Zet een proces uit op papier van eerste aanleiding tot laatste handeling: wie doet wat, in welk systeem, en hoeveel keer per week. Meestal komen daar een paar plaatsen bovendrijven waar iemand gegevens van het ene scherm naar het andere overtypt, of waar een dossier drie dagen wacht op een goedkeuring van één persoon.",
            "Bedrijfsprocessen laten automatiseren levert het meeste op waar volume en handwerk elkaar kruisen. Vijf minuten die zestig keer per week terugkeren zijn een beter startpunt dan een taak van twee uur die twee keer per jaar voorvalt, hoe vervelend die ook is.",
            "Soms is de conclusie dat je niets moet bouwen maar iets moet schrappen. Een goedkeuring die nog nooit iets heeft tegengehouden, is geen kandidaat voor automatisering maar voor afschaffing.",
          ],
        },
        {
          heading: "Die Excel is geen vijand maar een specificatie",
          body: [
            "In bijna elk bedrijf draait een cruciaal proces op een spreadsheet die door één persoon wordt onderhouden. Dat bestand is waardevol: het bevat de echte regels, inclusief de uitzonderingen die in geen enkel handboek staan.",
            "Excel processen laten automatiseren begint dus met dat bestand te lezen in plaats van het weg te gooien. Wij halen de formules uit elkaar, zetten de regels om in code en bewaren de data in een database waar meerdere mensen tegelijk in kunnen werken, met een historiek van elke wijziging.",
            "Wat de gebruiker terugkrijgt, moet minstens even snel voelen als de oude werkwijze. Kan iemand vandaag een rij dupliceren en tien velden aanpassen, dan mag jouw nieuwe systeem daar geen formulier van vijf stappen van maken.",
          ],
        },
        {
          heading: "De processen die we het vaakst overnemen",
          body: [
            "Een offertesysteem laten maken is populair omdat het direct geld raakt: prijzen die uit een prijslijst komen in plaats van uit een oud document, een goedkeuring bij korting boven een drempel, een versie-historiek per offerte en een status die zichzelf opvolgt.",
            "Daarnaast staat een urenregistratiesysteem laten maken bij veel bedrijven op de lijst, maar het loont pas wanneer het tot het einde van de ketting gaat: prestaties per project en taak, een goedkeuring door de teamleider en een export die precies aansluit op wat facturatie nodig heeft. Stop je voor die laatste stap, dan heb je het dubbele werk enkel verplaatst.",
            "Een derde klassieker is facturatiesoftware laten ontwikkelen voor bedrijven met een eigen manier van factureren: abonnementen met verbruik, deelfacturen per fase, of doorrekening naar meerdere partijen. Administratieve processen laten automatiseren betekent meestal deze drie aan elkaar knopen, zodat een goedgekeurde offerte vanzelf de basis van een factuur wordt.",
          ],
        },
        {
          heading: "De uitzondering bepaalt of het lukt",
          body: [
            "Elk proces heeft gevallen die buiten de lijnen vallen: een klant met een afwijkende prijsafspraak, een order die halverwege verandert, een goedkeuring terwijl de bevoegde persoon met verlof is. Software die die gevallen niet toelaat, wordt omzeild, en dan ben je slechter af dan voordien.",
            "Wij bouwen daarom altijd een expliciete uitzonderingsweg: iemand met de juiste rol mag afwijken, het systeem vraagt een reden en legt de afwijking vast. Zo blijft het proces bruikbaar en zie je na een paar maanden precies welke uitzondering zo vaak voorkomt dat ze eigenlijk een regel is.",
          ],
        },
      ],
      faq: [
        {
          question: "Waar beginnen we het best?",
          answer:
            "Bij het proces met het meeste handwerk per week, niet bij het proces dat het meest irriteert. We brengen samen in kaart hoe vaak iets gebeurt en hoeveel stappen er manueel zijn, en kiezen daaruit de eerste module. Die kan meestal apart gebouwd en opgeleverd worden.",
        },
        {
          question: "Moeten we alles in één keer omgooien?",
          answer:
            "Nee, en dat raden we ook af. We nemen één proces per keer over en laten het naast de bestaande manier van werken lopen tot iedereen vertrouwen heeft. Zo blijft het risico klein en zie je na een paar weken al resultaat.",
        },
        {
          question: "Kunnen we bestaande tools zoals Zapier of Make gebruiken?",
          answer:
            "Voor eenvoudige koppelingen tussen twee tools werken die prima en zullen we ze ook voorstellen. Zodra er logica, rollen, goedkeuringen of veel data bij komen kijken, wordt zo'n opzet fragiel en onbetaalbaar, en is het beter om de logica in eigen software te zetten.",
        },
        {
          question: "Wat gebeurt er met de gegevens uit onze huidige spreadsheets?",
          answer:
            "Die migreren mee. We doen eerst een testmigratie op de echte data, tonen wat er overkomt en wat er niet klopt, en pas daarna schakelen we om. De oude bestanden blijven bewaard als naslag.",
        },
        {
          question: "Hoe meten we of de automatisering echt iets oplevert?",
          answer:
            "Door voor de start te noteren hoeveel keer het proces per week draait en hoeveel manuele stappen het bevat, en dat na oplevering opnieuw te meten. Zonder die nulmeting blijft het gevoel, en gevoel is een slechte basis voor de volgende investering.",
        },
      ],
    },
    en: {
      metaTitle: "Business Process Automation",
      metaDescription:
        "Business process automation that starts by counting the manual steps, not by picking tools. Quotes, timesheets, invoicing and approvals turned into software.",
      h1: "Business process automation starts with counting, not with tools",
      lead: "Automation that works always begins the same way: count how often something happens, how many hands touch it and where it sits waiting. Only then can you tell which process is worth building and which is best left alone.",
      sections: [
        {
          heading: "Excel is the specification, not the enemy",
          body: [
            "In nearly every company one critical process runs on a spreadsheet maintained by a single person. That file is valuable: it holds the real rules, including the exceptions that appear in no procedure document anywhere.",
            "So the plan to replace Excel processes starts by reading that file rather than binning it. We take the formulas apart, turn the rules into code, and move the data into a database where several people can work at once with a history of every change.",
            "Whatever the user gets back has to feel at least as fast as the old way. If they can duplicate a row and edit ten fields today, a new system that turns this into a five-step wizard will lose to the spreadsheet every time.",
          ],
        },
        {
          heading: "Count first, then build",
          body: [
            "Business process automation starts by mapping one process from first trigger to last action: who does what, in which system, and how many times a week. A couple of places usually surface where someone retypes data from one screen into another, or where a file waits three days for one person's approval.",
            "The return is highest where volume and manual work intersect. Five minutes repeated sixty times a week beats a two-hour task that happens twice a year, however annoying that task is.",
            "Sometimes the honest answer is not to build anything but to remove a step. An approval that has never once stopped anything is a candidate for deletion, not for software.",
          ],
        },
        {
          heading: "The processes we take over most often",
          body: [
            "A quotation system is a common first module because it touches revenue directly: prices pulled from a price list instead of last year's document, an approval when a discount crosses a threshold, a version history per quote, and a status that chases itself.",
            "Next to it sits the time tracking system, which only pays off if it reaches the end of the chain: hours per project and task, approval by a team lead, and an export that matches exactly what invoicing needs. Stop before that step and you have simply moved the double entry.",
            "Then invoicing software for companies that bill in their own particular way: subscriptions with usage, part-invoices per phase, or costs split across several parties. To automate admin processes properly usually means joining these three together, so an approved quote becomes the basis of an invoice on its own.",
          ],
        },
        {
          heading: "The exception decides whether it works",
          body: [
            "Every process has cases outside the lines: a customer on a negotiated price, an order that changes halfway, an approval needed while the authorised person is on leave. Software that refuses those cases gets worked around, and then you are worse off than before.",
            "So we always build an explicit exception path: someone with the right role may deviate, the system asks for a reason and records it. The process stays usable, and after a few months you can see precisely which exception occurs so often that it is really a rule.",
          ],
        },
      ],
      faq: [
        {
          question: "Where should we start?",
          answer:
            "With the process that carries the most manual work per week, not the one that annoys people most. We map together how often something happens and how many steps are manual, and pick the first module from that. It can usually be built and delivered on its own.",
        },
        {
          question: "Do we have to change everything at once?",
          answer:
            "No, and we would advise against it. We take over one process at a time and let it run alongside the existing way of working until everyone trusts it. The risk stays small and you see results within weeks rather than quarters.",
        },
        {
          question: "Can we use tools like Zapier or Make instead?",
          answer:
            "For simple links between two tools they work well and we will happily suggest them. Once logic, roles, approvals or serious data volumes are involved, that kind of setup becomes fragile and expensive, and the logic belongs in software you own.",
        },
        {
          question: "What happens to the data in our current spreadsheets?",
          answer:
            "It migrates with you. We run a test migration on the real data first, show what comes across and what does not reconcile, and only then switch over. The old files stay available for reference.",
        },
        {
          question: "How do we know the automation actually paid off?",
          answer:
            "By writing down before we start how often the process runs each week and how many manual steps it has, then measuring the same thing after delivery. Without that baseline it stays a feeling, and feelings are a poor basis for the next investment.",
        },
      ],
    },
  },

  "ai-chatbot-laten-bouwen": {
    nl: {
      metaTitle: "AI chatbot laten bouwen",
      metaDescription:
        "Een AI chatbot laten bouwen op je eigen documenten en data, met bronvermelding, grenzen en een vlotte overdracht naar een mens. Meetbaar, niet magisch.",
      h1: "Een AI chatbot laten bouwen op je eigen documenten",
      lead: "Een nuttige chatbot verzint niets. Hij zoekt het antwoord in jouw documenten en data, geeft de bron erbij, en geeft door aan een mens zodra hij het niet zeker weet. Dat is minder spectaculair dan de demo's, en het is wel wat werkt.",
      sections: [
        {
          heading: "Zoeken in je eigen bronnen, niet in het geheugen van een model",
          body: [
            "Een AI chatbot laten bouwen die iets waard is, begint bij retrieval. Bij elke vraag zoekt het systeem eerst de relevante stukken in jouw handleidingen, productfiches, tarieven of ticketgeschiedenis, en pas daarna formuleert het model een antwoord op basis van die stukken. Een chatbot op eigen data is dus precies zo goed als die bronnen.",
            "Technisch komt daar wat werk bij kijken: documenten opdelen in stukken die groot genoeg zijn om betekenis te houden, ze doorzoekbaar maken op betekenis én op exacte termen zoals artikelnummers, en de index bijwerken zodra een document verandert. Een bot die verwijst naar het tarief van vorig jaar, is erger dan geen bot.",
            "Wij tonen bij elk antwoord de bron. Dat is geen detail: het laat de gebruiker zelf nakijken en het maakt duidelijk waar je documentatie tekortschiet. Vaak is het opkuisen van die documenten de grootste verbetering van het hele project.",
          ],
        },
        {
          heading: "Grenzen zijn belangrijker dan slimheid",
          body: [
            "Wij spreken vooraf af waarover de assistent mag antwoorden en waarover niet. Geen prijzen die niet in een bron staan, geen beloftes over levertermijnen, geen juridisch of medisch advies, en geen antwoorden over dossiers waar de gebruiker geen toegang toe heeft.",
            "Die laatste is technisch de belangrijkste: als de bot in klantdata kijkt, hoort hij dezelfde rechten te volgen als de rest van je software. Een AI integratie in bestaande software die de rechtencontrole overslaat, is een datalek met een vriendelijke toon.",
            "Vindt de assistent geen bron, dan zegt hij dat. Dat voelt minder indrukwekkend, maar het is precies waarom mensen hem blijven gebruiken.",
          ],
        },
        {
          heading: "Overdracht aan een mens hoort erbij",
          body: [
            "Elke assistent heeft een uitgang nodig. Wij bouwen een overdracht die het gesprek meeneemt, zodat je medewerker niet opnieuw begint: de vraag, wat de bot al geprobeerd heeft, en de klantgegevens als die bekend zijn.",
            "Wanneer die overdracht gebeurt, spreken we expliciet af: na twee onbeantwoorde pogingen, bij bepaalde onderwerpen, of wanneer de klant erom vraagt. Buiten de kantooruren wordt het een ticket met een verwachte antwoordtijd in plaats van een doodlopend gesprek.",
            "Een AI assistent laten ontwikkelen zonder die uitgang levert een muur op voor je supportproces in plaats van een uitbreiding ervan.",
          ],
        },
        {
          heading: "Meten of het echt werk wegneemt",
          body: [
            "Voor de start noteren we hoeveel vragen je team per week krijgt en welke onderwerpen het vaakst terugkomen. Daarna loggen we elk gesprek en labelen we of het zelfstandig is afgerond, is doorgegeven of is doodgelopen.",
            "Na een paar weken zie je waar de bot echt vragen afvangt en waar hij vooral tijd kost. Blijkt dat een onderwerp structureel misloopt, dan sluiten we het af of vullen we de bron aan. Werkt hij nergens, dan zeggen we dat ook, want een assistent die niets afvangt, is een abonnement zonder opbrengst.",
            "Die cijfers zetten we in een klein dashboard zodat je ze maandelijks kan bekijken zonder iemand te moeten vragen. Zonder die terugkoppeling blijft het bij een gevoel, en op een gevoel bouw je geen tweede fase.",
          ],
        },
      ],
      faq: [
        {
          question: "Blijven onze documenten en gesprekken privé?",
          answer:
            "Ja. We werken met zakelijke API's waarbij je data niet gebruikt wordt om modellen te trainen, en we bewaren de documenten en gesprekken in een database op accounts die op jouw naam staan. Je bepaalt zelf hoe lang gesprekken bewaard blijven.",
        },
        {
          question: "Kan de chatbot ook in onze bestaande software werken?",
          answer:
            "Dat kan. We bouwen hem in je klantportaal, je webshop of je interne applicatie, met dezelfde login en dezelfde rechten als de rest van het systeem. Zo ziet een gebruiker enkel antwoorden over dossiers waar hij effectief toegang toe heeft.",
        },
        {
          question: "Wat als de bot iets fout zegt?",
          answer:
            "Daarom tonen we bij elk antwoord de bron en houden we de assistent binnen een afgebakend onderwerp. Vindt hij geen bron, dan zegt hij dat hij het niet weet en geeft hij door aan een medewerker. Elk gesprek wordt gelogd, zodat je fouten kan terugvinden en de onderliggende bron kan corrigeren.",
        },
        {
          question: "Hebben we genoeg documentatie voor een chatbot?",
          answer:
            "Vaak meer dan je denkt: handleidingen, veelgestelde vragen, offertes, e-mails en de antwoorden die je supportteam al jaren typt. In de eerste fase kijken we welke bronnen bruikbaar zijn en welke eerst opgekuist moeten worden, want de kwaliteit van de bron bepaalt de kwaliteit van het antwoord.",
        },
        {
          question: "Kunnen we klein starten?",
          answer:
            "Dat is de aanpak die we aanraden. We beginnen met één afgebakend onderwerp waar veel herhaalde vragen over binnenkomen, meten wat de assistent daar afvangt en breiden pas daarna uit naar andere onderwerpen.",
        },
      ],
    },
    en: {
      metaTitle: "AI Chatbot Development",
      metaDescription:
        "AI chatbot development grounded in your own documents and data, with sources, guardrails, hand-off to a human and honest measurement of what it deflects.",
      h1: "AI chatbot development grounded in your own documents",
      lead: "A useful chatbot invents nothing. It retrieves the answer from your documents and data, shows the source, and hands over to a person the moment it is unsure. Less spectacular than the demos, and considerably more useful.",
      sections: [
        {
          heading: "Retrieval beats recall",
          body: [
            "AI chatbot development that is worth the money starts with retrieval. For every question the system first finds the relevant passages in your manuals, product sheets, price lists or past tickets, and only then does the model write an answer grounded in them. A chatbot on your own data is therefore exactly as good as those sources.",
            "That takes real engineering. Documents get split into chunks large enough to keep their meaning, indexed both by meaning and by exact terms such as article numbers, and re-indexed the moment a document changes. A bot quoting last year's prices is worse than no bot at all.",
            "Every answer shows its source. That is not a nicety: it lets the reader verify, and it exposes where your documentation is thin. Cleaning up those documents is frequently the most valuable outcome of the whole project.",
          ],
        },
        {
          heading: "Guardrails matter more than cleverness",
          body: [
            "We agree in advance what the assistant may answer and what it must not: no prices that are not in a source, no promises about delivery dates, no legal or medical advice, and nothing about records the user is not allowed to see.",
            "That last one is the important one technically. If the assistant reads customer data, it has to obey the same permissions as the rest of your system. AI in existing software that skips the permission check is a data leak with a friendly tone of voice.",
            "When it finds no source, it says so. Less impressive in a demo, and exactly why people keep using it.",
          ],
        },
        {
          heading: "Hand-off is part of the product",
          body: [
            "Every assistant needs an exit. We build a hand-off that carries the conversation with it, so your colleague does not start from zero: the question, what the assistant already tried, and the customer details if they are known.",
            "When that hand-off triggers is a decision, not an accident: after two failed attempts, on specific topics, or whenever the customer asks for a person. Outside office hours it becomes a ticket with a stated response time instead of a dead end.",
            "That is what turns a plan to build an AI assistant into an extension of your support process rather than a wall in front of it.",
          ],
        },
        {
          heading: "Measure whether it removes work",
          body: [
            "Before launch we note how many questions your team handles per week and which topics keep coming back. After launch every conversation is logged and labelled: resolved on its own, handed over, or abandoned.",
            "A few weeks in you can see where the assistant genuinely deflects work and where it mostly adds a step. If a topic consistently goes wrong, we either close it off or improve the source behind it. And if it deflects nothing anywhere, we will say so, because an assistant that catches nothing is a subscription with no return.",
            "We put those numbers on a small dashboard so you can read them monthly without asking anyone. Without that loop the assistant stays a feeling, and a feeling is a poor basis for a second phase.",
          ],
        },
      ],
      faq: [
        {
          question: "Do our documents and conversations stay private?",
          answer:
            "Yes. We use business API terms under which your data is not used to train models, and we store documents and conversations in a database on accounts registered in your name. You decide how long conversations are kept.",
        },
        {
          question: "Can the assistant live inside our existing software?",
          answer:
            "It can. We build it into your client portal, webshop or internal application, using the same login and the same permissions as the rest of the system, so a user only ever gets answers about records they are allowed to see.",
        },
        {
          question: "What happens when it gets something wrong?",
          answer:
            "That is why every answer carries its source and why the assistant stays inside a defined topic. When it finds no source it says it does not know and hands over to a colleague. Every conversation is logged, so you can find the mistake and fix the document behind it.",
        },
        {
          question: "Do we have enough documentation for this?",
          answer:
            "Usually more than you think: manuals, FAQs, quotes, emails and the answers your support team has been typing for years. In the first phase we review which sources are usable and which need cleaning first, because the quality of the source sets the quality of the answer.",
        },
        {
          question: "Can we start small?",
          answer:
            "That is the approach we recommend. We start with one well-defined topic that generates a lot of repeat questions, measure what the assistant deflects there, and only then extend it to other topics.",
        },
      ],
    },
  },

  "dashboard-laten-bouwen": {
    nl: {
      metaTitle: "Dashboard laten bouwen",
      metaDescription:
        "Een dashboard laten bouwen dat cijfers uit al je systemen samenbrengt, met één definitie per cijfer en een scherm per rol. Live data, geen losse rapporten.",
      h1: "Een dashboard laten bouwen waar ook echt naar gekeken wordt",
      lead: "De meeste dashboards worden na twee weken niet meer geopend. Niet omdat de grafieken lelijk zijn, maar omdat niemand had afgesproken welke beslissing ze moesten ondersteunen. Daar begint dit werk.",
      sections: [
        {
          heading: "Eerst de beslissing, dan het cijfer",
          body: [
            "Een dashboard laten bouwen begint bij een vraag die zelden gesteld wordt: wat ga je met dat cijfer doen? Als de marge op een project onder een drempel zakt, wie grijpt dan in en hoe? Kan niemand die vraag beantwoorden, dan is dat cijfer misschien interessant, maar hoort het niet op het scherm dat je elke ochtend opent.",
            "Zo blijft er per rol een korte lijst over. Een zaakvoerder kijkt naar omzet, marge en openstaande facturen, een teamleider naar bezetting en achterstand, een supportverantwoordelijke naar wachttijd en heropende tickets. Een managementdashboard laten maken voor iedereen tegelijk levert een scherm op dat niemand van zichzelf vindt.",
            "Wij bouwen daarom liever drie kleine schermen dan één groot. Elk scherm heeft een eigenaar en een vraag die het beantwoordt.",
          ],
        },
        {
          heading: "Eén definitie per cijfer, of de discussie begint opnieuw",
          body: [
            "Zodra twee afdelingen een ander getal voor omzet noemen, is het dashboard dood. Daarom leggen we per cijfer expliciet vast wat erin zit: met of zonder btw, geboekt op factuurdatum of leverdatum, inclusief creditnota's, en welke bron de waarheid is.",
            "Die definities horen zichtbaar te zijn in de interface zelf, bijvoorbeeld achter een informatie-icoon bij de titel. Zo hoeft niemand op zoek naar een document dat toch niet bijgewerkt is, en discussies gaan over de conclusie in plaats van over de berekening.",
            "Een data dashboard op maat is dus voor de helft een technische en voor de helft een organisatorische oefening. De moeilijkste vergadering van het project gaat meestal over de betekenis van één woord.",
          ],
        },
        {
          heading: "Data uit meerdere systemen, snel genoeg",
          body: [
            "Cijfers komen zelden uit één plek: je boekhouding, je webshop, je CRM, je urenregistratie en soms nog een spreadsheet. Wij halen die data op via API's of geplande synchronisatie en brengen ze samen in PostgreSQL, waar we de berekeningen doen.",
            "Voor zware berekeningen gebruiken we vooraf berekende aggregaties die op een vast ritme bijwerken, in plaats van elke query live op de brondata los te laten. Zo blijft een scherm snel, ook wanneer er jaren historiek achter zit, en belast je productiesysteem niet met rapportagevragen.",
            "Belangrijk daarbij: toon wanneer de cijfers voor het laatst zijn bijgewerkt. Rapportagesoftware laten ontwikkelen zonder die tijdsaanduiding zorgt gegarandeerd voor iemand die op maandagochtend beslissingen neemt op basis van vrijdagavond.",
          ],
        },
        {
          heading: "Een melding werkt beter dan een scherm",
          body: [
            "Een dashboard vraagt dat iemand gaat kijken. Voor de cijfers die er echt toe doen, draai je dat om: een bericht wanneer een waarde een drempel passeert, een wekelijkse samenvatting per e-mail, een melding wanneer een order langer dan afgesproken blijft liggen.",
            "In de praktijk bouwen we die twee samen. Het scherm is er om te onderzoeken wanneer je iets wil begrijpen, de meldingen zorgen dat je niets mist wanneer je even niet kijkt.",
            "Houd het aantal meldingen laag, anders leert iedereen ze wegklikken. Een drempel die elke dag afgaat, is geen drempel maar een gewoonte, en dan zit je terug bij het punt waarop niemand nog kijkt.",
          ],
        },
      ],
      faq: [
        {
          question: "Kunnen jullie data uit verschillende systemen combineren?",
          answer:
            "Ja, dat is meestal net de reden voor het project. We koppelen je boekhouding, webshop, CRM en andere bronnen via hun API of een geplande synchronisatie, en brengen alles samen in één database waar de berekeningen gebeuren.",
        },
        {
          question: "Hoe actueel zijn de cijfers?",
          answer:
            "Dat spreken we per cijfer af. Sommige waarden zijn live, andere worden elk uur of elke nacht bijgewerkt omdat de berekening zwaar is of de bron maar één keer per dag ververst. Bij elk cijfer staat zichtbaar wanneer het voor het laatst is bijgewerkt.",
        },
        {
          question: "Waarom geen kant-en-klare tool zoals Power BI of Looker Studio?",
          answer:
            "Voor klassieke rapportage op één databron zijn die tools uitstekend en zullen we ze ook aanraden. Maatwerk wordt interessant wanneer je berekeningen bedrijfsspecifiek zijn, wanneer het dashboard in je eigen applicatie moet leven met dezelfde logins en rechten, of wanneer je vanuit het scherm meteen een actie wil starten.",
        },
        {
          question: "Kunnen we het dashboard aan onze klanten tonen?",
          answer:
            "Dat kan, en het is een veelgevraagde uitbreiding. Elke klant ziet dan enkel zijn eigen cijfers, afgeschermd op basis van rechten in de database. Vaak wordt zo'n klantendashboard een argument in je verkoop in plaats van alleen een interne tool.",
        },
        {
          question: "Wat hebben jullie van ons nodig om te starten?",
          answer:
            "Toegang tot de bronsystemen of hun API-documentatie, en een gesprek met de mensen die de cijfers vandaag manueel samenstellen. Die twee samen leveren meestal binnen één analysefase een duidelijk beeld van wat er gebouwd moet worden.",
        },
      ],
    },
    en: {
      metaTitle: "Dashboard Development",
      metaDescription:
        "Dashboard development that pulls numbers from every system into one place, with a single definition per metric and a screen per role. Live data, real decisions.",
      h1: "Dashboard development for screens people actually keep open",
      lead: "Most dashboards stop being opened after a fortnight. Not because the charts were ugly, but because nobody agreed which decision they were supposed to support. That is where this work starts.",
      sections: [
        {
          heading: "One definition per number, or the argument restarts",
          body: [
            "The moment two departments quote a different figure for revenue, the dashboard is finished. So we write down per metric exactly what it contains: with or without VAT, booked on invoice date or delivery date, credit notes included or not, and which system is authoritative.",
            "Those definitions belong in the interface itself, behind an information icon next to the title. Nobody has to hunt for a document that was never updated, and meetings can argue about the conclusion instead of the calculation.",
            "A custom data dashboard is therefore half an engineering exercise and half an organisational one. The hardest meeting of the project is usually about the meaning of a single word.",
          ],
        },
        {
          heading: "Decide the decision first",
          body: [
            "Dashboard development should open with a question that rarely gets asked: what will you do with this number? If margin on a project drops below a threshold, who acts and how? If nobody can answer that, the metric may be interesting, but it does not belong on the screen you open every morning.",
            "What survives is a short list per role. An owner watches revenue, margin and outstanding invoices; a team lead watches utilisation and backlog; a support lead watches waiting time and reopened tickets. One management dashboard for everyone at once produces a screen nobody recognises as theirs.",
            "Three small screens beat one enormous one. Each screen gets an owner and one question it answers.",
          ],
        },
        {
          heading: "Several sources, still fast",
          body: [
            "The numbers rarely live in one place: accounting, the webshop, the CRM, time tracking, and often a spreadsheet nobody admits to. We pull that data in through APIs or scheduled synchronisation and bring it together in PostgreSQL, where the calculations happen.",
            "Heavy calculations run as pre-computed aggregates on a fixed schedule instead of hitting the source data live on every page load. Screens stay quick even with years of history behind them, and your production system is not slowed down by reporting queries.",
            "Agree as well on how far back the history goes and what happens to figures from systems you have since replaced, because a chart that silently changes shape three years ago costs more trust than the storage it saves. And always show when the figures were last refreshed: reporting software without that timestamp guarantees someone makes a Monday morning decision on Friday evening data.",
          ],
        },
        {
          heading: "An alert beats a screen",
          body: [
            "A dashboard requires someone to go and look. For the numbers that genuinely matter, invert it: a message when a value crosses a threshold, a weekly summary by email, a notice when an order has been sitting longer than agreed.",
            "In practice we build both. The screen is for exploring when you want to understand something; the alerts make sure you miss nothing while you are not looking.",
            "Keep the number of alerts small, or people learn to dismiss them. A threshold that fires every day is not a threshold, it is a habit, and you are back where nobody looks.",
          ],
        },
      ],
      faq: [
        {
          question: "Can you combine data from different systems?",
          answer:
            "Yes, and it is usually the reason for the project. We connect accounting, the webshop, the CRM and other sources through their API or a scheduled synchronisation, and bring everything into one database where the calculations run.",
        },
        {
          question: "How current are the figures?",
          answer:
            "We agree that per metric. Some values are live, others refresh hourly or overnight because the calculation is heavy or the source only updates once a day. Every figure shows visibly when it was last refreshed.",
        },
        {
          question: "Why not use Power BI or Looker Studio?",
          answer:
            "For classic reporting on a single data source those tools are excellent and we will recommend them. Custom becomes worthwhile when the calculations are specific to your business, when the dashboard has to live inside your own application with the same logins and permissions, or when you want to trigger an action straight from the screen.",
        },
        {
          question: "Can we show a dashboard to our own customers?",
          answer:
            "Yes, and it is a frequent extension. Each customer sees only their own figures, enforced by permissions in the database. A client-facing dashboard often becomes a selling point rather than just an internal tool.",
        },
        {
          question: "What do you need from us to start?",
          answer:
            "Access to the source systems or their API documentation, and a conversation with the people who assemble these numbers by hand today. Those two together usually produce a clear picture within a single analysis phase.",
        },
      ],
    },
  },

  "software-laten-moderniseren": {
    nl: {
      metaTitle: "Bestaande software laten moderniseren",
      metaDescription:
        "Bestaande software laten moderniseren zonder alles tegelijk om te gooien: stap voor stap vervangen, met de database als startpunt. 17+ jaar ervaring.",
      h1: "Bestaande software laten moderniseren zonder een grote knal",
      lead: "Software die tien jaar meegaat, draagt tien jaar aan beslissingen mee. Vervangen kan, maar zelden in één keer: de winst zit in stukken vervangen terwijl het bedrijf gewoon doorwerkt.",
      sections: [
        {
          heading: "Waarom een volledige herbouw zo vaak mislukt",
          body: [
            "Bij een herbouw van nul begin je op nul procent functionaliteit en moet je maanden overbruggen voor je gelijk staat met wat er al draaide. Ondertussen blijft het oude systeem veranderen, want de wereld wacht niet, en groeit het doel weg van het team.",
            "Bovendien is er nooit een volledige specificatie. De regels zitten in de code, in een handvol stored procedures en in het hoofd van iemand die er al twaalf jaar werkt. Een verouderd systeem herbouwen op basis van een functionele analyse alleen, betekent dat je gegarandeerd regels mist die pas na livegang opduiken.",
            "Bestaande software laten moderniseren doen we daarom liever stap voor stap: we zetten het nieuwe systeem naast het oude en leiden er één functie per keer naartoe. Elke stap is klein genoeg om terug te draaien, en na elke stap is er iets af.",
          ],
        },
        {
          heading: "Begin bij de database, niet bij het scherm",
          body: [
            "De database vertelt de waarheid over een oud systeem: welke tabellen echt gebruikt worden, welke velden al jaren leeg staan, waar de sleutels ontbreken en welke regels er stilzwijgend in staan. Wij beginnen elke doorlichting daar, samen met de logs van wat er dagelijks aangesproken wordt.",
            "Vaak blijkt dan dat een derde van de schermen bijna nooit gebruikt wordt. Dat is meteen de goedkoopste besparing van het hele project: wat niemand gebruikt, hoeft niet mee. Legacy software vervangen is voor een groot stuk beslissen wat je niet meeneemt.",
            "Wat wel mee moet, zetten we om in een nieuw datamodel met een migratie die we meerdere keren droog uittesten op echte data, zodat de echte overschakeling geen ontdekkingsreis wordt.",
          ],
        },
        {
          heading: "Een nieuwe laag rond een oud hart",
          body: [
            "Soms is de kern gezond en is enkel de buitenkant versleten: een applicatie die alleen op een oude browser draait, geen mobiel gebruik toelaat of geen koppelingen kan maken. Dan bouwen we een moderne laag met een API rond de bestaande database, en vervangen we schermen stap voor stap.",
            "Soms is de kern het probleem en gaan de gegevens over naar een nieuw systeem terwijl het oude alleen nog leest. In beide gevallen loopt er een periode waarin de twee samen draaien, met duidelijke afspraken over wie welk gegeven mag wijzigen.",
            "Zoek je op softwareontwikkeling uitbesteden voor zo'n traject, kies dan een partij die eerst een doorlichting doet en pas daarna een plan schrijft. Bij ons is die doorlichting een aparte fase met een eigen scope en prijs, en na afloop mag je er ook mee weglopen.",
          ],
        },
        {
          heading: "Wat je erbij wint",
          body: [
            "Een moderne stack betekent vooral dat je weer mensen vindt die eraan kunnen werken, dat beveiligingsupdates gewoon beschikbaar zijn en dat je koppelingen kan maken met tools die vandaag bestaan. Brisk werkt al 17+ jaar met bedrijven in België en Nederland, en dat is meestal de reden waarom ze bellen.",
            "Een software ontwikkelbedrijf kiezen voor zo'n traject is vooral een kwestie van afspraken: code en data op jouw naam, documentatie bij elke fase, en een overdracht waarmee een ander team verder kan. Dat laatste is geen bedreiging maar een gezondheidstest.",
          ],
        },
      ],
      checklist: {
        title: "Wat een doorlichting oplevert",
        items: [
          "Een overzicht van de gebruikte en ongebruikte functionaliteit",
          "De staat van de database: sleutels, dubbels, ontbrekende velden",
          "Beveiligingsrisico's en verouderde afhankelijkheden",
          "Wat er redelijkerwijs kan blijven en wat vervangen moet worden",
          "Een plan in fasen, elk met een eigen scope en prijs",
        ],
      },
      faq: [
        {
          question: "Kunnen jullie verder op software die iemand anders geschreven heeft?",
          answer:
            "Ja, dat doen we regelmatig. We beginnen met een doorlichting van de code, de database en de hosting en leveren een overzicht van wat dringend is en wat kan wachten. Pas daarna spreken we af wat we herstellen, uitbreiden of vervangen.",
        },
        {
          question: "Moeten we alles in één keer vervangen?",
          answer:
            "Bijna nooit. In de meeste projecten zetten we het nieuwe systeem naast het oude en leiden we één functie per keer om, met een periode waarin beide draaien. Zo blijft elke stap klein genoeg om terug te draaien als iets tegenvalt.",
        },
        {
          question: "Wat gebeurt er met onze bestaande data?",
          answer:
            "Die migreert mee. We bouwen een migratiescript dat we meerdere keren droog uitvoeren op een kopie van de echte data, met controles op aantallen en totalen. Pas als die controles kloppen, plannen we de echte overschakeling.",
        },
        {
          question: "Hoe weten we of moderniseren de moeite loont?",
          answer:
            "Door te kijken naar wat het oude systeem vandaag kost: uren handwerk eromheen, storingen, koppelingen die niet kunnen, en het risico dat er nog maar één iemand is die het begrijpt. De doorlichting zet die kosten naast de kostprijs van vervangen, zodat de beslissing op cijfers rust.",
        },
        {
          question: "Kan ons eigen team meewerken?",
          answer:
            "Graag zelfs. We werken in dezelfde repository, doen code review op elkaars werk en dragen kennis over tijdens het project. In veel trajecten bouwen wij de eerste fasen en neemt het interne team het daarna geleidelijk over.",
        },
      ],
    },
    en: {
      metaTitle: "Legacy Software Modernisation",
      metaDescription:
        "Legacy software modernisation one piece at a time, starting from the database rather than the screens. Replace what is used, drop what is not.",
      h1: "Legacy software modernisation without a big bang",
      lead: "Software that has run for a decade carries a decade of decisions with it. Replacing it is possible, but rarely all at once. The value is in swapping out pieces while the business keeps trading.",
      sections: [
        {
          heading: "Start at the database, not at the screens",
          body: [
            "The database tells the truth about an old system: which tables are really used, which fields have been empty for years, where keys are missing, and which business rules are hiding in constraints and stored procedures. Every review we do starts there, alongside logs of what is actually called each day.",
            "It regularly turns out that a third of the screens are almost never opened. That is the cheapest saving in the entire project, because what nobody uses does not need rebuilding. Deciding to replace legacy software is largely deciding what not to take with you.",
            "Whatever does come across moves into a new data model through a migration we rehearse several times on real data, so the actual switch is not a voyage of discovery.",
          ],
        },
        {
          heading: "Why full rewrites fail so often",
          body: [
            "A rewrite from zero starts at zero percent of the functionality and needs months before it matches what already ran. Meanwhile the old system keeps changing, because the business does not pause, and the target moves away from the team.",
            "There is also never a complete specification. The rules live in the code, in a handful of procedures and in the head of someone who has been there twelve years. Attempting to rebuild an outdated system from a functional analysis alone guarantees you miss rules that surface only after go-live.",
            "So we prefer to route one function at a time to the new system while the old one keeps serving the rest. Every step is small enough to reverse, and after every step something is genuinely finished.",
          ],
        },
        {
          heading: "A new layer around an old core",
          body: [
            "Sometimes the core is healthy and only the surface has worn out: an application that runs on one ancient browser, cannot be used on a phone, or refuses to integrate with anything. Then we build a modern layer with an API around the existing database and replace screens gradually.",
            "Sometimes the core is the problem, and data moves into a new system while the old one becomes read-only. Either way there is a period where both run, with explicit agreements about which system may change which field.",
            "If you are weighing whether to outsource software development for this kind of work, pick a partner who does a review before writing a plan. Here that review is a separate phase with its own scope and price, and you are free to walk away with it afterwards.",
          ],
        },
        {
          heading: "What you get back",
          body: [
            "A current stack mostly means you can hire people who know it, security updates simply exist, and you can integrate with tools that were invented this decade. Brisk has been building for companies in Belgium and the Netherlands for 17+ years, and that combination is usually why the phone rings.",
            "Choosing a software development company for legacy software modernisation is mainly about the agreements around it: code and data in your name, documentation at every phase, and a handover another team could act on. That last point is not a threat, it is a health check.",
          ],
        },
      ],
      checklist: {
        title: "What a review delivers",
        items: [
          "An overview of which functionality is used and which is not",
          "The state of the database: keys, duplicates, missing fields",
          "Security risks and outdated dependencies",
          "What can reasonably stay and what has to be replaced",
          "A phased plan, each phase with its own scope and price",
        ],
      },
      faq: [
        {
          question: "Can you work on software someone else wrote?",
          answer:
            "Yes, we do it regularly. We start with a review of the code, the database and the hosting, and hand you an overview of what is urgent and what can wait. Only after that do we agree what gets repaired, extended or replaced.",
        },
        {
          question: "Do we have to replace everything at once?",
          answer:
            "Almost never. In most projects the new system runs beside the old one and we route one function at a time across, with a period where both are live. That keeps every step small enough to reverse if something disappoints.",
        },
        {
          question: "What happens to our existing data?",
          answer:
            "It migrates with you. We build a migration script and run it several times against a copy of the real data, with checks on record counts and totals. Only when those checks reconcile do we schedule the real switch.",
        },
        {
          question: "How do we know modernisation is worth it?",
          answer:
            "By costing what the old system charges you today: the manual work around it, the outages, the integrations you cannot build, and the risk of only one person understanding it. The review puts those costs next to the cost of replacement so the decision rests on numbers.",
        },
        {
          question: "Can our own developers take part?",
          answer:
            "We prefer it. We work in the same repository, review each other's code and transfer knowledge during the project. In many engagements we build the first phases and the internal team gradually takes it over.",
        },
      ],
    },
  },

  "software-laten-ontwikkelen-kosten": {
    nl: {
      metaTitle: "Maatwerk software kosten",
      metaDescription:
        "Wat bepaalt de kosten van maatwerk software: scope, rollen, koppelingen, datamigratie en onderhoud. Hoe wij offreren, en waarom dagtarieven misleiden.",
      h1: "Wat maatwerk software kost, en wat die prijs bepaalt",
      lead: "Er staat op deze pagina geen bedrag, en elke pagina die er wel een noemt zonder je scope te kennen, verkoopt je een gok. Wat we wel kunnen doen: precies uitleggen welke keuzes de prijs maken, zodat je zelf ziet aan welke knoppen je kan draaien.",
      sections: [
        {
          heading: "De zes dingen die de prijs echt bepalen",
          body: [
            "Ten eerste de scope: het aantal processen dat de software overneemt en het aantal gebruikersrollen. Elke extra rol betekent andere schermen, andere rechten en extra testwerk, dus twee rollen erbij is nooit alleen wat extra code.",
            "Ten tweede de koppelingen. Software die alleen op zichzelf staat, is goedkoop; software die met je boekhouding, je ERP en je webshop praat, kost meer omdat elke koppeling authenticatie, veldmapping, foutafhandeling en monitoring nodig heeft. Ten derde de datamigratie: bestaande gegevens overzetten kost tijd in verhouding tot hoe rommelig ze zijn, niet tot hoeveel het er zijn.",
            "Verder wegen compliance en gevoeligheid mee: persoonsgegevens, medische of financiële data vragen strengere rechten, logging en bewaartermijnen. Vervangt de software een systeem dat vandaag live is, dan komt daar een periode van dubbel draaien bij. En ten slotte is er onderhoud, dat blijft doorlopen zolang de software draait.",
          ],
        },
        {
          heading: "Waarom een vergelijking op dagtarief je op het verkeerde been zet",
          body: [
            "Een dagtarief zegt niets over wat er op een dag af raakt. Een team dat een derde meer per dag kost maar half zoveel dagen nodig heeft, is goedkoper, en dat verschil is groter dan het tarief zelf. Vraag daarom nooit alleen naar het tarief, maar naar de prijs van een afgebakende fase met een duidelijk resultaat.",
            "Let ook op wat er niet in een offerte staat. Testen, koppelingen, datamigratie, een testomgeving, documentatie en overdracht zijn geen extra's maar onderdelen van het werk. Een offerte die enkel de schermen telt, is bijna altijd de duurste, want de rest komt later terug als meerwerk.",
            "Wie zoekt op softwareontwikkeling uitbesteden kosten, vergelijkt bijna altijd appels met peren, want offertes zijn pas vergelijkbaar wanneer iedereen dezelfde scope prijst. Zet daarom voor je aanvraag op papier welke processen, rollen en koppelingen erin zitten, en vraag iedereen op die lijst te antwoorden.",
          ],
        },
        {
          heading: "Hoe wij offreren",
          body: [
            "We starten met een gratis gesprek van 30 minuten waarin we het probleem, de betrokken systemen en de gewenste timing overlopen. Daarna volgt een voorstel dat het werk in fasen knipt, met per fase een vaste prijs en een duidelijk resultaat.",
            "Je beslist telkens per fase of we doorgaan. De eerste fase is meestal een analyse die een datamodel, een functionele scope en een prijs per volgende fase oplevert; daarna komt een MVP die één werkflow volledig afdekt. Klein starten is geen bezuiniging maar risicobeheer: je leert van draaiende software voor je de rest bestelt.",
            "Op de vraag wat kost software op maat volgt bij ons dus altijd een wedervraag over de scope. Dat is geen ontwijken: het is het verschil tussen een cijfer dat standhoudt en een cijfer dat drie maanden later wordt bijgesteld.",
          ],
        },
        {
          heading: "Wat er na de lancering nog kost",
          body: [
            "Reken op hosting, monitoring, updates van afhankelijkheden en een budget voor kleine verbeteringen. Externe API's veranderen, browsers veranderen, en je bedrijf verandert ook: software die niemand aanraakt, wordt vanzelf duurder om aan te raken.",
            "We spreken daarom een onderhoudsformule af die past bij hoe kritisch de software is. Draait je facturatie erop, dan hoort daar snellere opvolging bij dan bij een intern hulpmiddel dat een dag kan wachten.",
          ],
        },
      ],
      checklist: {
        title: "Neem dit mee naar het gesprek, dan wordt de prijs sneller concreet",
        items: [
          "Welk proces de software moet overnemen, en hoe het vandaag loopt",
          "Hoeveel mensen ermee werken, en in welke rollen",
          "Met welke systemen ze moet praten, en of daar een API voor bestaat",
          "Welke bestaande data mee moet, en in welke staat die is",
          "Of er een live systeem vervangen wordt",
          "Wanneer je het nodig hebt, en waarom net dan",
        ],
      },
      faq: [
        {
          question: "Waarom staat er geen richtprijs op deze pagina?",
          answer:
            "Omdat maatwerk software kosten volledig afhangen van de scope, het aantal rollen, de koppelingen en de data die mee moet. Een bedrag zonder die context is een gok die je later duur kan komen te staan. Een gesprek van 30 minuten volstaat meestal om er een onderbouwd cijfer aan te hangen.",
        },
        {
          question: "Werken jullie met een vaste prijs of met nacalculatie?",
          answer:
            "Met een vaste prijs per fase. Elke fase heeft een afgebakende scope en een prijs die vooraf vastligt, en je beslist na elke fase of we verder gaan. Zo is er nooit een open eind, maar wel ruimte om bij te sturen op basis van wat je in de vorige fase hebt geleerd.",
        },
        {
          question: "Hoe vraag ik een offerte aan?",
          answer:
            "Plan een gratis gesprek van 30 minuten of stuur ons je vraag per mail; je krijgt binnen 24 uur antwoord. Wie zoekt op software laten ontwikkelen offerte, denkt vaak dat er eerst een functionele analyse op papier moet staan; bij ons volstaan je proces, je rollen en je bestaande systemen.",
        },
        {
          question: "Kunnen we starten met een kleiner budget?",
          answer:
            "Ja. We knippen het werk zo dat de eerste fase op zichzelf al nuttig is, meestal een MVP die één werkflow volledig afdekt. Die kan live, en de volgende fasen plan je wanneer het past.",
        },
        {
          question: "Wat kost een webapplicatie ongeveer in vergelijking met een website?",
          answer:
            "Wie zoekt op webapplicatie laten bouwen kosten, komt doorgaans hoger uit dan bij een website, omdat er accounts, rollen, rechten, koppelingen en testwerk bij komen kijken waar een marketingsite niets van nodig heeft. Hoeveel hoger hangt af van het aantal rollen en integraties, en dat bespreken we het best op basis van jouw concrete geval.",
        },
        {
          question: "Met wie werken jullie zoal?",
          answer:
            "Brisk leverde meer dan 150 projecten in 17+ jaar, voor opdrachtgevers in België en Nederland, waaronder NMBS, De Watergroep, IDEWE en museumPASSmusées. De code en de data van elk project zijn eigendom van de klant.",
        },
      ],
    },
    en: {
      metaTitle: "Custom Software Cost",
      metaDescription:
        "What drives custom software cost: scope, user roles, integrations, data migration, compliance and maintenance. How we quote, and why day rates mislead.",
      h1: "What custom software costs, and what actually sets that price",
      lead: "There is no number on this page, and any page that gives you one without knowing your scope is selling you a guess. What we can do is explain exactly which choices set the price, so you can see which levers you control.",
      sections: [
        {
          heading: "The six things that really set the price",
          body: [
            "First, scope: how many processes the software takes over and how many user roles it serves. Each extra role means different screens, different permissions and more testing, so two more roles is never just a little more code.",
            "Second, integrations. Software that stands alone is cheap; software that talks to your accounting, your ERP and your webshop costs more, because every connection needs authentication, field mapping, error handling and monitoring. Third, data migration, where the effort scales with how messy the existing data is rather than how much of it there is.",
            "Then compliance and sensitivity: personal, medical or financial data demand stricter permissions, logging and retention rules. If the software replaces a system that is live today, add a period of running both in parallel. And finally maintenance, which continues for as long as the software does.",
          ],
        },
        {
          heading: "Why comparing day rates misleads you",
          body: [
            "A day rate tells you nothing about what gets finished in a day. A team charging a third more but needing half the days is cheaper, and that gap is wider than the rate difference will ever be. So never ask only for a rate; ask for the price of a defined phase with a defined result.",
            "Watch what a quote leaves out, too. Testing, integrations, data migration, a staging environment, documentation and handover are not extras, they are the work. A quote that only counts screens is usually the most expensive one, because the rest returns later as change requests.",
            "Comparing a software development quote across agencies only works when everyone prices the same scope. Write down the processes, roles and integrations before you ask, and have each party answer against that list.",
          ],
        },
        {
          heading: "How we quote",
          body: [
            "It starts with a free 30-minute call covering the problem, the systems involved and the timing you need. After that you get a proposal that splits the work into phases, each with a fixed price and a defined result.",
            "You decide phase by phase whether to continue. The first phase is usually an analysis that produces a data model, a functional scope and a price for the next phase; after that comes an MVP covering one workflow end to end. Starting small is risk management rather than penny-pinching: you learn from running software before ordering the rest.",
            "So when people ask what does custom software cost, the honest answer starts with a question about scope. That is not evasion. It is the difference between a number that holds and a number that gets revised three months in.",
          ],
        },
        {
          heading: "What it costs after launch",
          body: [
            "Budget for hosting, monitoring, dependency updates and a line for small improvements. Third-party APIs change, browsers change, and your business changes too. Software nobody touches only becomes more expensive to touch.",
            "So we agree a maintenance plan matched to how critical the system is. If your invoicing runs on it, response times should be shorter than for an internal tool that can wait a day.",
          ],
        },
      ],
      checklist: {
        title: "Bring this to the call and the number gets real faster",
        items: [
          "Which process the software should take over, and how it runs today",
          "How many people will use it, and in which roles",
          "Which systems it has to talk to, and whether they have an API",
          "Which existing data has to come across, and what state it is in",
          "Whether it replaces a system that is currently live",
          "When you need it, and why that date",
        ],
      },
      faq: [
        {
          question: "Why is there no indicative price on this page?",
          answer:
            "Because the cost depends entirely on scope, the number of roles, the integrations and the data that has to migrate. A figure without that context is a guess that can get expensive later. A 30-minute conversation is normally enough to attach a defensible number to your case.",
        },
        {
          question: "Do you work on fixed price or time and materials?",
          answer:
            "Fixed price per phase. Each phase has a defined scope and a price agreed in advance, and you decide after each one whether we continue. There is no open-ended commitment, but there is room to adjust based on what the previous phase taught you.",
        },
        {
          question: "How do I get a quote?",
          answer:
            "Book a free 30-minute call or email us your question; you will have a reply within 24 hours. To quote we mainly need your process, your roles and your existing systems, not a finished functional specification.",
        },
        {
          question: "Can we start with a smaller budget?",
          answer:
            "Yes. We split the work so the first phase is useful on its own, usually an MVP that covers one workflow completely. That can go live, and the later phases get planned when it suits you.",
        },
        {
          question: "How does a web application compare to a website in price?",
          answer:
            "Web app development cost is generally higher than a website, because accounts, roles, permissions, integrations and testing all enter the picture where a marketing site needs none of them. How much higher depends on the number of roles and integrations, which is best discussed against your actual case.",
        },
        {
          question: "Who do you work for?",
          answer:
            "Brisk has delivered more than 150 projects over 17+ years for clients in Belgium and the Netherlands, including NMBS, De Watergroep, IDEWE and museumPASSmusées. On every project the client owns the code and the data.",
        },
      ],
    },
  },
};
