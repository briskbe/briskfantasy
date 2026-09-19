import type { AppLocale } from "@/i18n/routing";

export interface CaseStudyCopy {
  title: string;
  metaTitle: string;
  description: string;
  introduction: string;
  screenshotAlt: string;
  screenshotCaption: string;
  sections: { heading: string; paragraphs: string[] }[];
  measurementNote: string;
}

export interface CaseStudy {
  slug: string;
  referenceSlug: string;
  serviceHref: "/website-op-maat" | "/webshop-op-maat";
  copy: Record<AppLocale, CaseStudyCopy>;
}

/**
 * Project descriptions use the verified portfolio scope and the bundled
 * screenshots. Observations describe the captured interface, not client
 * analytics, unpublished process details or measured business results.
 */
export const caseStudies: CaseStudy[] = [
  {
    slug: "city-housing-genk",
    referenceSlug: "city-housing-be",
    serviceHref: "/website-op-maat",
    copy: {
      nl: {
        title: "City Housing Genk: een hotelwebsite met ruimte voor de plek",
        metaTitle: "City Housing Genk: hotelwebsite en online boeken",
        description: "Bekijk de hotelwebsite van City Housing Genk: fotografie, herkenbare navigatie en een zichtbare reserveringsroute. Een webdesignproject van Brisk.",
        introduction: "City Housing Genk is een designhotel in Genk. Brisk vermeldt het project in zijn portfolio voor design, ontwikkeling en boeken. De website brengt de accommodatie en de route naar een reservering samen. De getoonde schermafbeelding laat zien hoe het gebouw en de navigatie de eerste indruk bepalen.",
        screenshotAlt: "City Housing Genk: foto van het hotelgebouw met navigatie voor kamers, omgeving, zakelijk, galerij, contact en reserveren",
        screenshotCaption: "Vastgelegde desktopweergave van City Housing Genk. De live website kan inmiddels gewijzigd zijn.",
        sections: [
          {
            heading: "De accommodatie staat vooraan",
            paragraphs: [
              "Het openingsbeeld toont het gebouw en het pad tussen de twee vleugels. De foto vult vrijwel het volledige scherm. Daardoor maakt de bezoeker meteen kennis met de plek zelf. Het compacte logo linksboven en de navigatie bovenaan laten veel ruimte aan de architectuur en het groen rond het verblijf.",
              "De donkere laag over de fotografie maakt de lichte navigatietekst zichtbaar. De groene reserveringsknop heeft een eigen vlak. Dit zijn waarneembare keuzes in de vastgelegde weergave; ze vertellen hoe de startpagina is opgebouwd, zonder iets te bewijzen over boekingsaantallen.",
            ],
          },
          {
            heading: "Verschillende vragen krijgen een eigen ingang",
            paragraphs: [
              "De navigatie benoemt kamers, omgeving, zakelijk, galerij en contact. Die indeling geeft bezoekers meerdere manieren om hun verblijf te verkennen. Wie eerst wil weten wat voor kamers er zijn, vindt een andere ingang dan iemand die de omgeving of een zakelijk verblijf bekijkt.",
              "Daarnaast staat reserveren als afzonderlijke actie rechtsboven. De zichtbare structuur combineert dus oriënteren met een directe vervolgstap. De schermafbeelding toont het begin van die route; ze laat niet alle stappen van het boekingsproces zien.",
            ],
          },
          {
            heading: "De bijdrage van Brisk",
            paragraphs: [
              "De vastgelegde projectscope bestaat uit design, ontwikkeling en boekingsfunctionaliteit. Het portfolio beschrijft een Nederlandstalige website in de hospitalitysector. De relevante combinatie is hier een herkenbare presentatie van het hotel met informatie en een route naar boeken binnen dezelfde website-ervaring.",
            ],
          },
          {
            heading: "Wat je hiervan kunt meenemen voor een hotelwebsite",
            paragraphs: [
              "Begin bij de vragen die iemand vóór een reservering heeft: hoe ziet het verblijf eruit, welke kamers zijn er en waar ligt het? Geef die onderwerpen begrijpelijke namen. Zorg vervolgens dat bezoekers die al willen boeken hun volgende stap kunnen vinden. Beeld en navigatie hebben daarbij elk een eigen taak.",
            ],
          },
        ],
        measurementNote: "Voor deze projectbeschrijving zijn geen gecontroleerde cijfers over boekingen, omzet, bezoekers of prestaties beschikbaar. De toelichting is gebaseerd op de portfolioscope en de getoonde schermafbeelding.",
      },
      en: {
        title: "City Housing Genk: a hotel website that gives the setting room",
        metaTitle: "City Housing Genk: hotel website and booking",
        description: "Explore the City Housing Genk hotel website: property photography, clear navigation and a visible reservation route. A Brisk web design project.",
        introduction: "City Housing Genk is a design hotel in Genk, Belgium. Brisk lists the project in its portfolio for design, development and booking. The website brings the property and a route towards making a reservation together. The screenshot shows how the building and the navigation establish the opening view.",
        screenshotAlt: "City Housing Genk website showing the hotel building and navigation for rooms, surroundings, business stays, gallery, contact and reservations",
        screenshotCaption: "Captured desktop view of City Housing Genk. The live website may have changed since this capture.",
        sections: [
          {
            heading: "The property takes the lead",
            paragraphs: [
              "The opening photograph shows the building and the path between its two wings. It occupies almost the entire screen, introducing the accommodation through its physical setting. A compact logo in the upper left and navigation across the top leave most of the view to the architecture and surrounding greenery.",
              "A dark layer over the photograph makes the light navigation text visible. The green reservation button has a distinct background. These are observable features of the captured interface. They explain its composition without implying that a particular booking result has been measured.",
            ],
          },
          {
            heading: "Different questions have different starting points",
            paragraphs: [
              "The menu names rooms, surroundings, business stays, a gallery and contact. Those categories offer several ways to explore a potential stay. Someone comparing rooms has a different starting point from someone researching the surrounding area or considering the property for a business trip.",
              "Reservations also have a separate action in the upper right. The visible structure therefore combines exploration with a direct next step. The screenshot documents the beginning of that journey; it does not show or verify every screen in the booking process.",
            ],
          },
          {
            heading: "Brisk’s documented contribution",
            paragraphs: [
              "The recorded project scope includes design, development and booking functionality. The portfolio identifies a Dutch-language website in the hospitality sector. The relevant combination is a recognisable presentation of the property, practical information and a route towards booking within the same website experience.",
            ],
          },
          {
            heading: "A useful lesson for hospitality websites",
            paragraphs: [
              "Start with the questions visitors ask before making a reservation: what does the accommodation look like, which rooms are available to explore and where is it located? Give those topics understandable navigation labels. Then make the next step visible to visitors who are ready to book. Photography and navigation each have a specific job.",
            ],
          },
        ],
        measurementNote: "Verified booking, revenue, traffic and performance figures are not available for this project description. The commentary is based on the portfolio scope and the screenshot shown here.",
      },
    },
  },
  {
    slug: "landelijk-glas",
    referenceSlug: "landelijkglas-be",
    serviceHref: "/website-op-maat",
    copy: {
      nl: {
        title: "Landelijk Glas: maatwerk zichtbaar maken in een interieurwebsite",
        metaTitle: "Landelijk Glas: website voor deuren en interieur",
        description: "Ontdek de website van Landelijk Glas: interieurfotografie, een heldere productintroductie en routes naar collectie en offerte. Design en ontwikkeling door Brisk.",
        introduction: "Landelijk Glas presenteert stalen deuren, steellook en pivotdeuren op maat. In het Brisk-portfolio valt het project onder design, ontwikkeling en SEO. De website laat het product zien in zijn context: een interieur waarin de deur en de ruimte samen het beeld bepalen.",
        screenshotAlt: "Landelijk Glas website met een grote interieurfoto van stalen deuren, de productintroductie en knoppen voor collectie en offerte",
        screenshotCaption: "Vastgelegde desktopweergave van Landelijk Glas. Actuele inhoud en aanbod staan op de website van het bedrijf.",
        sections: [
          {
            heading: "Een product in zijn gebruiksomgeving",
            paragraphs: [
              "De schermafbeelding toont een grote interieurfoto met zwarte deurprofielen centraal in het beeld. De hoofdtekst benoemt de productgroepen. Zo staan de toepassing en de uitleg naast elkaar: bezoekers kunnen zowel zien wat het product met een ruimte doet als lezen welk aanbod wordt gepresenteerd.",
              "De grote letters, rustige foto en beperkte accentkleur geven de onderdelen een duidelijke onderlinge rangorde. De gele kleur komt terug in een deel van de titel en in de offerteknop. Deze beschrijving gaat over de zichtbare compositie; ze schrijft geen meetbaar resultaat toe aan een kleur of lettertype.",
            ],
          },
          {
            heading: "Verkennen en een offerte aanvragen",
            paragraphs: [
              "Onder de introductie staan afzonderlijke knoppen voor de collectie en een vrijblijvende offerte. Dat maakt twee verschillende vervolgstappen zichtbaar: eerst het aanbod bekijken of een vraag over een eigen project stellen. De bovenste navigatie biedt daarnaast ingangen naar realisaties, werkwijze en veelgestelde vragen.",
              "Bovenaan zijn contactmogelijkheden zichtbaar, waaronder e-mail, telefoon en WhatsApp. De interface geeft daarmee meerdere contactroutes. Welke route bezoekers daadwerkelijk kiezen, kan niet uit een schermafbeelding worden afgeleid; daarvoor zouden afzonderlijke gebruiksgegevens nodig zijn.",
            ],
          },
          {
            heading: "Wat binnen de portfolioscope valt",
            paragraphs: [
              "Brisk vermeldt design, ontwikkeling en SEO voor deze Nederlandstalige website. Het project combineert productpresentatie met informatie voor een mogelijke aanvraag. De navigatie bevat ook een webshoplink, maar de vastgelegde referentie is geclassificeerd als website. Deze beschrijving voegt daarom geen onbevestigde e-commercediensten aan de projectscope toe.",
            ],
          },
          {
            heading: "Een bruikbare les voor bedrijven met maatwerkproducten",
            paragraphs: [
              "Laat niet alleen een productnaam zien, maar ook de context waarin iemand het gaat gebruiken. Combineer die eerste indruk met informatie over het aanbod en een volgende stap die past bij de oriëntatiefase. Voor een maatwerkproduct kunnen voorbeelden en een aanvraagroute naast elkaar belangrijk zijn: niet iedere bezoeker heeft al een uitgewerkt plan.",
            ],
          },
        ],
        measurementNote: "Er zijn voor deze beschrijving geen gecontroleerde aanvraagcijfers, zoekposities of performance-metingen beschikbaar. De pagina licht de vastgelegde dienstverlening en zichtbare website toe, zonder een resultaatclaim.",
      },
      en: {
        title: "Landelijk Glas: showing made-to-measure products in context",
        metaTitle: "Landelijk Glas: doors and interiors website",
        description: "Explore the Landelijk Glas website: interior photography, a clear product introduction and routes to the collection and a quote. Design and development by Brisk.",
        introduction: "Landelijk Glas presents made-to-measure steel doors, steel-look doors and pivot doors. The Brisk portfolio records design, development and SEO for this project. The website places the product in context: an interior in which the doors and the surrounding room contribute to the same image.",
        screenshotAlt: "Landelijk Glas website with a large photograph of steel doors in an interior, a product introduction and collection and quote buttons",
        screenshotCaption: "Captured desktop view of Landelijk Glas. Visit the company website for its current content and offer.",
        sections: [
          {
            heading: "The product appears where it will be used",
            paragraphs: [
              "The screenshot features an interior photograph with black door frames at its centre. The main heading names the product categories. Presentation and explanation work alongside each other: visitors can see how the product sits within a room and read which types of doors the company offers.",
              "Large typography, the spacious photograph and a restrained accent colour establish a visible hierarchy. Yellow appears in part of the heading and in the quote button. This describes the captured composition; it does not attribute a measured commercial outcome to a colour or typeface.",
            ],
          },
          {
            heading: "Exploring the collection or starting an enquiry",
            paragraphs: [
              "Separate buttons beneath the introduction lead towards the collection and a quote enquiry. This presents two next steps: explore the range or ask about a particular project. The main navigation also includes completed work, the company’s approach and frequently asked questions.",
              "Email, telephone and WhatsApp contact options are visible across the top of the page. The interface therefore provides several routes to contact. A screenshot cannot establish which route visitors actually prefer; that would require separate usage information rather than an interpretation of the design.",
            ],
          },
          {
            heading: "The scope recorded in the portfolio",
            paragraphs: [
              "Brisk lists design, development and SEO for this Dutch-language website. The project combines product presentation with information relevant to an enquiry. Although the navigation includes a webshop link, the recorded reference is categorised as a website. This description therefore does not add unverified e-commerce work to the project scope.",
            ],
          },
          {
            heading: "A lesson for businesses selling bespoke products",
            paragraphs: [
              "Show the context in which a product will be used, as well as its name. Connect that first impression to an explanation of the offer and a next step suited to the visitor’s stage of research. For a bespoke product, examples and an enquiry route can both matter: not every visitor arrives with a fully defined brief.",
            ],
          },
        ],
        measurementNote: "Verified enquiry figures, search rankings and performance measurements are not available for this description. This page explains the recorded services and visible website without claiming a measured result.",
      },
    },
  },
  {
    slug: "legacycristal",
    referenceSlug: "legacycristal-com",
    serviceHref: "/webshop-op-maat",
    copy: {
      nl: {
        title: "LegacyCristal: van persoonlijke foto naar een kristallen herinnering",
        metaTitle: "LegacyCristal: webshop voor gepersonaliseerd kristal",
        description: "Bekijk de LegacyCristal-webshop: productfotografie, uitleg over personalisatie en een duidelijke ontwerpactie. Een e-commerceproject uit het Brisk-portfolio.",
        introduction: "LegacyCristal maakt van een foto een 3D-lasergravure in kristal. Brisk vermeldt deze webshop voor design, ontwikkeling en e-commerce. Het openingsscherm verbindt het tastbare product met de persoonlijke betekenis ervan en biedt een zichtbare ingang om een eigen kristal te ontwerpen.",
        screenshotAlt: "LegacyCristal webshop met een kristallen portret, cadeauverpakking en de knop Ontwerp je kristal",
        screenshotCaption: "Vastgelegde desktopweergave van LegacyCristal. Prijzen, betaalmogelijkheden en andere winkelinformatie kunnen veranderen.",
        sections: [
          {
            heading: "Uitleg en productbeeld vullen elkaar aan",
            paragraphs: [
              "In de schermafbeelding staat links een grote titel over een herinnering in kristal. De begeleidende tekst legt uit dat een foto het vertrekpunt is. Rechts staan beelden van een cadeau en een kristallen portret. Daardoor zijn zowel de persoonlijke aanleiding als het uiteindelijke product in dezelfde eerste weergave aanwezig.",
              "De donkere achtergrond, lichte tekst en goudkleurige accenten maken verschillende onderdelen herkenbaar. Het productbeeld laat zien wat een gravure in kristal inhoudt. Dat is relevant bij een aanbod dat moeilijker te begrijpen zou zijn met alleen een productnaam of een technische omschrijving.",
            ],
          },
          {
            heading: "Een duidelijke eerste stap voor personalisatie",
            paragraphs: [
              "De belangrijkste knop nodigt uit om een eigen kristal te ontwerpen. Dezelfde actie komt terug in de navigatie. Daarnaast is er een route om eerst de collecties te bekijken. De zichtbare startpagina biedt zo een keuze tussen verder oriënteren en beginnen met het persoonlijke product.",
              "Onder de hoofdactie staan aanvullende winkelgegevens en herkenbare betaalmerken. Die elementen zijn zichtbaar op het vastgelegde beeld. De screenshot toont niet het volledige configuratie- of betaalproces; deze projectbeschrijving doet daarom geen uitspraken over afzonderlijke stappen die hier niet zijn vastgelegd.",
            ],
          },
          {
            heading: "De vastgelegde bijdrage van Brisk",
            paragraphs: [
              "De portfolioscope omvat design, ontwikkeling en e-commerce voor een Nederlandstalige webshop in geschenken en herinneringen. Het specifieke kenmerk van dit project is het gepersonaliseerde aanbod: de bezoeker kiest geen volledig identiek standaardproduct, maar brengt een eigen foto als uitgangspunt mee.",
            ],
          },
          {
            heading: "Wat dit voorbeeld leert over een webshop op maat",
            paragraphs: [
              "Bij een persoonlijk product moet de website niet alleen laten zien wat iemand koopt, maar ook welke eigen inbreng nodig is. Een concreet eindbeeld en een begrijpelijke eerste actie helpen om dat verschil uit te leggen. Beschrijf bij het plannen van je eigen webshop daarom het product én de keuzes die een klant moet maken, voordat je de schermen bepaalt.",
            ],
          },
        ],
        measurementNote: "Er zijn voor deze projectbeschrijving geen gecontroleerde verkoop-, conversie- of snelheidsmetingen beschikbaar. De toelichting gebruikt de portfolioscope en de getoonde schermafbeelding als bewijs.",
      },
      en: {
        title: "LegacyCristal: turning a personal photograph into a crystal keepsake",
        metaTitle: "LegacyCristal: personalised crystal e-commerce website",
        description: "Explore the LegacyCristal store: product imagery, an explanation of personalisation and a clear design action. An e-commerce project from the Brisk portfolio.",
        introduction: "LegacyCristal turns a photograph into a 3D laser engraving in crystal. Brisk records design, development and e-commerce for this online store. The opening screen connects the physical product with its personal meaning and gives visitors a visible starting point for designing their own crystal.",
        screenshotAlt: "LegacyCristal online store showing an engraved crystal portrait, gift packaging and a design-your-crystal button",
        screenshotCaption: "Captured desktop view of LegacyCristal. Prices, payment options and other store information may change.",
        sections: [
          {
            heading: "The explanation and product imagery work together",
            paragraphs: [
              "The screenshot places a large heading about a memory preserved in crystal on the left. Supporting text explains that a photograph is the starting point. On the right, images show a gift and a crystal portrait. The personal occasion and the finished product therefore appear together in the opening view.",
              "A dark background, light text and gold-coloured accents distinguish different elements. The product image demonstrates what an engraving in crystal looks like. That is useful for an offer that would be harder to understand through a product name or a technical description alone.",
            ],
          },
          {
            heading: "A visible first step towards personalisation",
            paragraphs: [
              "The main button invites visitors to design their own crystal, and the same action appears in the navigation. A separate route allows them to explore collections first. The visible homepage therefore presents a choice between learning more about the range and starting a personal product.",
              "Additional store information and recognisable payment logos appear beneath the main action. These elements are visible in the captured image. The screenshot does not document the complete configuration or payment journey, so this description makes no claims about individual screens that are not shown here.",
            ],
          },
          {
            heading: "Brisk’s documented role",
            paragraphs: [
              "The portfolio scope covers design, development and e-commerce for a Dutch-language store selling gifts and keepsakes. The distinctive characteristic of this project is its personalised offer: customers bring their own photograph as a starting point rather than choosing an entirely identical standard product.",
            ],
          },
          {
            heading: "A practical lesson for custom e-commerce",
            paragraphs: [
              "For a personal product, a website must explain both what the customer will receive and what they need to contribute. A concrete image of the result and an understandable first action help make that relationship clear. When planning your own store, describe the product and the choices customers must make before deciding how the screens should be arranged.",
            ],
          },
        ],
        measurementNote: "Verified sales, conversion and speed measurements are not available for this project description. The explanation uses the portfolio scope and the screenshot shown here as its evidence.",
      },
    },
  },
];

export function caseHrefFor(caseStudy: Pick<CaseStudy, "slug">) {
  return { pathname: "/referenties/[slug]" as const, params: { slug: caseStudy.slug } };
}

export function caseForSlug(slug: string) {
  return caseStudies.find((caseStudy) => caseStudy.slug === slug);
}
