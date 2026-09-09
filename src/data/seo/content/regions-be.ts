import type { RegionContentMap } from "./types";

/**
 * Copy for the eleven Belgian province pages.
 *
 * Every province gets its own argument, not the same paragraph with a place
 * name swapped: Antwerp is written around the port and the Kempen supply base,
 * Brussels around building genuinely bilingual sites, Limburg around the work
 * actually delivered here, and the five French-speaking provinces around what
 * it really means to publish in French (and, in Liège, in German too).
 *
 * Facts are limited to what Brisk can stand behind: based in Limburg, working
 * remotely across Belgium and the Netherlands, 150+ projects in 17+ years, a
 * reply within 24 hours, a free 30-minute intro call, and the client owning the
 * code and the design. No local offices, no local phone numbers, no prices.
 */
export const belgiumRegionContent: RegionContentMap = {
  antwerpen: {
    nl: {
      metaTitle: "Website laten maken in Antwerpen",
      metaDescription:
        "Van de haven tot de Kempen: websites, webshops, software en apps voor bedrijven in Antwerpen, Mechelen en Turnhout. 17+ jaar ervaring, antwoord binnen 24 uur.",
      h1: "Websites en software voor bedrijven in Antwerpen",
      lead: "Antwerpen draait op ladingen, planningen en deadlines. Wij bouwen de websites, webshops, software en apps voor de bedrijven eromheen: expediteurs en dienstverleners rond de haven, merken en winkels in de stad, en technische familiebedrijven in Turnhout, Geel, Mol en Herentals waar de site het vakmanschap nog niet laat zien.",
      localAngle: [
        "Rond de haven is een website zelden het hele verhaal. Expediteurs, transporteurs en toeleveranciers hebben iets nodig dat werkt terwijl er gewerkt wordt: een klantenportaal waar iemand zijn zending terugvindt, een aanvraag die meteen in het juiste systeem belandt, een app voor mensen die de hele dag niet achter een bureau zitten. Dat is maatwerksoftware, en die bouwen we rond de systemen die je al gebruikt in plaats van omgekeerd.",
        "In de stad zelf is het drukker dan waar ook in Vlaanderen. Mode, retail, horeca, bureaus en een dichte laag kmo's mikken op dezelfde zoekwoorden, dus snel laden, scherp schrijven en technisch in orde zijn is er geen luxe maar het verschil tussen pagina één en pagina drie. Voor merken die verkopen bouwen we webshops die aansluiten op de voorraad en de logistiek die er al staan, en die evengoed in het Engels werken, want een deel van je klanten leest de Nederlandse versie nooit.",
        "En dan is er de Kempen. Turnhout, Geel, Mol, Herentals en Lier zitten vol bedrijven die aan andere bedrijven verkopen: machines, onderdelen, installatie, onderhoud. Daar is een site geen etalage maar een dossier, met productgegevens die kloppen, referenties die iets bewijzen en een aanvraag die bij de juiste persoon terechtkomt. Wij zitten in Limburg, dus Antwerpen en de Kempen liggen dichtbij: het meeste werk gebeurt online, en we komen langs wanneer een gesprek aan tafel het project vooruit helpt.",
      ],
      faq: [
        {
          question: "Werken jullie voor bedrijven in en rond de haven van Antwerpen?",
          answer:
            "Ja. Voor bedrijven rond de haven van Antwerpen bouwen we vooral klantenportalen, aanvraagflows en maatwerksoftware die aansluit op de systemen die er al draaien, plus mobiele apps voor medewerkers die hun werk niet achter een bureau doen.",
        },
        {
          question: "Komen jullie langs in Antwerpen, Mechelen of de Kempen?",
          answer:
            "Brisk werkt vanuit Limburg en het grootste deel van een project loopt online, maar we komen naar Antwerpen, Mechelen, Turnhout of Geel wanneer een gesprek ter plaatse het project sneller vooruit helpt.",
        },
        {
          question: "Kunnen jullie een webshop bouwen die ook Engelstalige klanten bedient?",
          answer:
            "Ja. We bouwen webshops meertalig op, met een eigen URL en eigen teksten per taal, zodat een Antwerps merk Nederlandstalige en Engelstalige klanten bedient zonder een tweede website te onderhouden.",
        },
        {
          question: "Wat kost een eerste gesprek?",
          answer:
            "Niets. Een eerste kennismaking van 30 minuten is gratis en vrijblijvend, en op je bericht krijg je binnen 24 uur antwoord.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in Antwerp",
      metaDescription:
        "From the port to the Kempen: websites, webshops, software and apps for businesses in Antwerp, Mechelen and Turnhout. 17+ years in, a reply within 24 hours.",
      h1: "Websites and software for businesses in Antwerp",
      lead: "Antwerp runs on cargo, schedules and deadlines. We build the websites, webshops, software and mobile apps for the companies around all of that: forwarders and service firms near the port, brands and shops in the city, and the technical family businesses in Turnhout, Geel, Mol and Herentals whose craft never quite made it onto their website.",
      localAngle: [
        "Near the port, a website is rarely the whole job. Forwarders, hauliers and suppliers need something that keeps working while everyone else is working: a client portal where a shipment can be traced, a request form that lands in the right system instead of a shared inbox, an app for people who spend the day away from a desk. That is custom software, and we build it around the systems you already run rather than asking you to replace them.",
        "The city itself is the most crowded market in Flanders. Fashion, retail, hospitality, agencies and a dense layer of small firms chase the same search terms, so load speed, sharp copy and a clean technical build decide whether you sit on page one or page three. For brands that sell, we build webshops that fit the stock and shipping setup already in place, and that work in English as well as Dutch, because plenty of your customers will never open the Dutch version.",
        "Then there is the Kempen. Turnhout, Geel, Mol, Herentals and Lier are full of companies selling to other companies: machines, parts, installation, maintenance. Their site is less a shop window than a file, with product data that holds up, references that prove something and an enquiry that reaches the person who can answer it. We are based in Limburg, so Antwerp and the Kempen are close: most of the work happens online, and we drive over when a conversation at your table moves things faster.",
      ],
      faq: [
        {
          question: "Do you work with companies around the Port of Antwerp?",
          answer:
            "Yes. For companies around the Port of Antwerp we mostly build client portals, request flows and custom software that connects to the systems already in use, plus mobile apps for staff who work away from a desk.",
        },
        {
          question: "Will you come to Antwerp or Mechelen for a meeting?",
          answer:
            "Brisk works from Limburg and most of a project runs online, but we travel to Antwerp, Mechelen, Turnhout or Geel whenever meeting in person moves the project forward faster.",
        },
        {
          question: "Can you build a webshop that also serves English-speaking customers?",
          answer:
            "Yes. We build webshops multilingual from the start, with a separate URL and separate copy for each language, so an Antwerp brand can serve Dutch and English customers without maintaining a second website.",
        },
        {
          question: "How does a first conversation work?",
          answer:
            "You tell us what you have in mind, you get a reply within 24 hours, and the first 30-minute call is free with nothing attached to it.",
        },
      ],
    },
  },

  "oost-vlaanderen": {
    nl: {
      metaTitle: "Website laten maken in Oost-Vlaanderen",
      metaDescription:
        "Websites, webshops en software voor bedrijven in Gent, Aalst, Sint-Niklaas en Dendermonde. Van technische catalogus tot Engelstalige site. 150+ projecten.",
      h1: "Websites, webshops en software in Oost-Vlaanderen",
      lead: "Oost-Vlaanderen loopt op twee snelheden. Rond Gent zitten biotech- en cleantechbedrijven die iets moeten uitleggen wat de meeste mensen nog nooit gezien hebben; in Aalst, Sint-Niklaas, Dendermonde, Lokeren en Oudenaarde zitten textiel-, voedings- en maakbedrijven die al decennia leveren. Allebei hebben ze hetzelfde nodig: iets ingewikkelds dat in dertig seconden klopt.",
      localAngle: [
        "Een technologiebedrijf uit Gent verkoopt zelden aan een consument. Je lezer is een onderzoeker, een inkoper, een investeerder of een partner in het buitenland, en die leest Engels. Dat vraagt een site die de techniek serieus neemt zonder erin te verdrinken: bovenaan in één zin wat je doet, daaronder de onderbouwing, documentatie en publicaties waar ze horen, en een Engelse versie die apart geschreven is in plaats van vertaald. Vaak is het echte product trouwens geen website maar een platform of dashboard, en dat bouwen we net zo goed.",
        "De rest van de provincie speelt een ander spel. Textiel rond Oudenaarde en Deinze, voeding en logistiek rond Lokeren en Sint-Niklaas, maakindustrie en toelevering rond Aalst en Dendermonde: bedrijven die aan andere bedrijven verkopen en waarvan de site in de praktijk een catalogus is. Producten met echte specificaties, filters die werken, een offerteaanvraag die niet in een algemene mailbox verdwijnt. Loopt het bestellen vandaag via telefoon en een rekenblad, dan is een bestelportaal voor vaste klanten meestal de snelste winst.",
        "Wat we niet doen is een kant-en-klaar thema kopen en er jouw logo op zetten. Ontwerp en code zijn na oplevering van jou, je kan er later mee naar iemand anders, en precies daarom besteden we er zorg aan. We werken vanuit Limburg, dus het grootste deel van een project loopt op afstand, met een verplaatsing naar Gent, Aalst of Sint-Niklaas op de momenten waarop dat echt iets oplevert.",
      ],
      faq: [
        {
          question: "Werken jullie voor technologiebedrijven en spin-offs rond Gent?",
          answer:
            "Ja. Voor technologiebedrijven rond Gent bouwen we vooral Engelstalige sites die een moeilijk product begrijpelijk maken, en waar nodig ook het platform, dashboard of de app die erachter zit.",
        },
        {
          question: "Kunnen jullie onze productcatalogus online zetten?",
          answer:
            "Ja. We zetten productcatalogi online met echte specificaties, werkende filters en een offerteaanvraag die bij de juiste persoon terechtkomt, en we sluiten die aan op de productgegevens die je vandaag al bijhoudt.",
        },
        {
          question: "Bouwen jullie een Engelstalige versie naast de Nederlandse site?",
          answer:
            "Ja. We bouwen sites meertalig op en schrijven de Engelse teksten apart, zodat de Engelse versie niet leest als een vertaling van de Nederlandse.",
        },
        {
          question: "Komen jullie naar Gent voor een gesprek?",
          answer:
            "Brisk zit in Limburg en werkt grotendeels op afstand, maar we komen naar Gent, Aalst of Sint-Niklaas wanneer een gesprek ter plaatse nuttig is; de eerste kennismaking van 30 minuten is gratis en kan gewoon online.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in East Flanders",
      metaDescription:
        "Websites, webshops and software for companies in Ghent, Aalst, Sint-Niklaas and Dendermonde, from technical catalogues to English-first sites. 150+ projects.",
      h1: "Websites, webshops and software in East Flanders",
      lead: "East Flanders moves at two speeds. Around Ghent, biotech and cleantech companies have to explain something most people have never seen; in Aalst, Sint-Niklaas, Dendermonde, Lokeren and Oudenaarde, textile, food and manufacturing firms have been shipping for decades. Both want the same thing from a website: something complicated made clear in thirty seconds.",
      localAngle: [
        "A Ghent technology company rarely sells to a consumer. Your reader is a researcher, a buyer, an investor or a partner abroad, and they read English. That calls for a site that takes the technology seriously without drowning in it: one sentence at the top saying what you do, the evidence underneath, documentation and publications where people expect to find them, and an English version written from scratch rather than run through a translator. Often the real product is not a website at all but a platform or a dashboard, and we build those too.",
        "The rest of the province plays a different game. Textiles around Oudenaarde and Deinze, food and logistics around Lokeren and Sint-Niklaas, manufacturing and supply around Aalst and Dendermonde: companies selling to other companies, whose website is in practice a catalogue. Real specifications, filters that work, a quote request that does not vanish into a general mailbox. If orders still arrive by phone and spreadsheet, an ordering portal for regular customers is usually the fastest win.",
        "What we will not do is buy a template and drop your logo on it. The design and the code are yours once the project ships, you can take them to someone else later, and that is exactly why we treat them with care. We work from Limburg, so most of a project runs remotely, with a trip to Ghent, Aalst or Sint-Niklaas for the moments where being in the room actually changes the outcome.",
      ],
      faq: [
        {
          question: "Do you work with technology companies and spin-offs around Ghent?",
          answer:
            "Yes. For technology companies around Ghent we mostly build English-language sites that make a difficult product understandable, and where needed the platform, dashboard or app sitting behind it.",
        },
        {
          question: "Can you put our product catalogue online?",
          answer:
            "Yes. We publish product catalogues with real specifications, filters that work and a quote request that reaches the right person, connected to the product data you already maintain.",
        },
        {
          question: "Will you build an English version alongside the Dutch site?",
          answer:
            "Yes. We build sites multilingual and write the English copy separately, so the English version does not read like a translation of the Dutch one.",
        },
        {
          question: "Do you travel to Ghent for meetings?",
          answer:
            "Brisk is based in Limburg and works largely remotely, but we travel to Ghent, Aalst or Sint-Niklaas when meeting in person is useful; the first 30-minute call is free and can simply happen online.",
        },
      ],
    },
  },

  "west-vlaanderen": {
    nl: {
      metaTitle: "Website laten maken in West-Vlaanderen",
      metaDescription:
        "Meertalige sites voor machinebouwers in Kortrijk en Roeselare, boekingssites voor Brugge en de kust. Ook webshops, software en apps. Gratis kennismaking.",
      h1: "Websites en software voor West-Vlaamse bedrijven",
      lead: "Een machinebouwer in Roeselare verkoopt aan klanten die hij nooit ziet; een hotel in Knokke-Heist verkoopt aan wie volgende week komt. West-Vlaanderen vraagt daardoor twee compleet verschillende websites, en wij bouwen ze allebei, samen met de webshops, software en apps die eronder hangen.",
      localAngle: [
        "Rond Kortrijk, Waregem en Roeselare zit de machinebouw en de toelevering waar deze provincie om bekendstaat. Die bedrijven exporteren, en dat zie je terug in wat hun site moet kunnen: drie of vier talen in plaats van één, technische fiches die kloppen, een keuzehulp of configurator in plaats van dertig pagina's productlijst, en een onderdelenshop waar een klant of dealer zelf bestelt zonder te bellen. Voor de servicedienst bouwen we apps waarmee een technieker zijn interventie ter plaatse afsluit in plaats van 's avonds op papier.",
        "Aan de kust en in Brugge is het spel omgekeerd. Een zomer, een lang weekend of een schoolvakantie moet de rest van het jaar dragen, het verkeer komt binnen op een telefoon en de bezoeker beslist in twee minuten. Dan tellen laadtijd, foto's die kloppen met de werkelijkheid en een boekingsflow zonder omweg, en telt Frans, Engels en Duits naast het Nederlands, want dat is letterlijk wie er in Oostende, Brugge en Knokke-Heist over de vloer komt.",
        "Ieper en de Westhoek leven dan weer van bezoekers die van ver komen en zich vooraf inlezen: daar begint het bezoek maanden eerder op je website. En dan het praktische. Wij zitten in Limburg, wat de andere kant van het land is, en dat verzwijgen we niet. Het grootste deel van een project loopt online en dat werkt prima; voor een kick-off, een workshop of een oplevering rijden we naar Kortrijk, Brugge of Roeselare.",
      ],
      faq: [
        {
          question: "Bouwen jullie meertalige sites voor machinebouwers en toeleveranciers?",
          answer:
            "Ja. We bouwen sites in het Nederlands, Frans, Engels en Duits, met per taal een eigen URL en eigen teksten, zodat een West-Vlaamse machinebouwer al zijn exportmarkten met één site bedient.",
        },
        {
          question: "Kunnen jullie een boekingssysteem bouwen voor een hotel of vakantieverblijf aan de kust?",
          answer:
            "Ja. We bouwen sites met een boekingsflow die op een telefoon werkt en die aansluit op het reservatiesysteem dat je al gebruikt, zodat een bezoeker in een paar stappen boekt.",
        },
        {
          question: "Werken jullie vanuit Limburg ook voor bedrijven in Brugge of Kortrijk?",
          answer:
            "Ja. Brisk zit in Limburg en werkt voor klanten in heel België en Nederland; het grootste deel van een project loopt online en we rijden naar West-Vlaanderen voor de momenten waarop dat verschil maakt.",
        },
        {
          question: "Kunnen jullie onderdelen of accessoires online verkopen naast de gewone site?",
          answer:
            "Ja. We bouwen webshops voor onderdelen en accessoires, met eigen prijzen of kortingen per klantgroep als je met dealers en installateurs werkt.",
        },
      ],
    },
    en: {
      metaTitle: "Web design and software in West Flanders",
      metaDescription:
        "Multilingual sites for machine builders in Kortrijk and Roeselare, booking sites for Bruges and the coast, plus webshops, software and apps. Free first call.",
      h1: "Websites and software for West Flanders",
      lead: "A machine builder in Roeselare sells to customers it will never meet; a hotel in Knokke-Heist sells to whoever arrives next week. West Flanders therefore needs two completely different kinds of website, and we build both, along with the webshops, software and apps underneath them.",
      localAngle: [
        "Around Kortrijk, Waregem and Roeselare sits the machine building and supply work this province is known for. These companies export, and it shows in what their site has to do: three or four languages instead of one, technical sheets that hold up, a configurator or guided selector instead of thirty pages of product list, and a parts shop where a customer or dealer orders without picking up the phone. For the service side we build apps that let a technician close a job on site instead of writing it up in the evening.",
        "On the coast and in Bruges the logic reverses. One summer, one long weekend or one school holiday has to carry the rest of the year, the traffic arrives on a phone and the visitor decides inside two minutes. So load time counts, photography that matches reality counts, and a booking flow with no detours counts, as does French, English and German alongside Dutch, because that is literally who walks through the door in Ostend, Bruges and Knokke-Heist.",
        "Ypres and the Westhoek live off visitors who travel a long way and read up beforehand, which means the visit really starts on your website months earlier. And then the practical part. We are based in Limburg, which is the other side of the country, and we would rather say so. Most of a project runs online and works well that way; for a kick-off, a workshop or a launch we drive to Kortrijk, Bruges or Roeselare.",
      ],
      faq: [
        {
          question: "Do you build multilingual sites for machine builders and suppliers?",
          answer:
            "Yes. We build sites in Dutch, French, English and German, each language with its own URL and its own copy, so a West Flemish machine builder can serve every export market from one site.",
        },
        {
          question: "Can you build a booking system for a hotel or holiday rental on the coast?",
          answer:
            "Yes. We build sites with a booking flow that works on a phone and connects to the reservation system you already use, so a visitor books in a handful of steps.",
        },
        {
          question: "Do you work with companies in Bruges or Kortrijk from Limburg?",
          answer:
            "Yes. Brisk is based in Limburg and works for clients across Belgium and the Netherlands; most of a project runs online and we travel to West Flanders for the moments where being there matters.",
        },
        {
          question: "Can you sell spare parts online next to the main website?",
          answer:
            "Yes. We build webshops for parts and accessories, including separate pricing or discounts per customer group if you work with dealers and installers.",
        },
      ],
    },
  },

  limburg: {
    nl: {
      metaTitle: "Website laten maken in Limburg",
      metaDescription:
        "Brisk bouwt websites, webshops, software en apps vanuit Limburg. Werk in Genk, Hasselt, Sint-Truiden en Tongeren, 150+ projecten in ruim 17 jaar.",
      h1: "Websites, webshops en software uit Limburg",
      lead: "Brisk zit in Limburg. Hasselt, Genk, Sint-Truiden, Tongeren, Beringen, Lommel en Maasmechelen zijn voor ons geen lijstje zoekwoorden maar de streek waar we werken en waar een groot deel van onze klanten om de hoek zit.",
      localAngle: [
        "Je kan ons werk hier gewoon gaan bekijken. Designhotel City Housing in Genk verkoopt zijn kamers via een site die wij gebouwd hebben. ECU Performance, chiptuning in Genk, haalt er zijn afspraken mee binnen. TCKO stuurt bezoekers naar zijn tegelshowroom en Comfort Solutions laat mensen hun badkamer-, verwarmings- of ventilatiewerk aanvragen. Vier Limburgse bedrijven, vier verschillende doelen, vier sites die niets van elkaar weg hebben.",
        "De Limburgse economie is er een van bedrijven met een naam op de gevel. Rond Genk zitten automotive en logistiek, in de hele provincie bouw- en installatiebedrijven, zorg, en rond Sint-Truiden en Tongeren de fruit- en agrosector. Wat die gemeen hebben: de eigenaar beslist zelf en wil weten wat hij krijgt voor hij tekent. Daarom werken we in korte stappen met iets zichtbaars aan het einde van elke stap, en zijn ontwerp en code na oplevering van jou.",
        "Dichtbij zitten heeft één praktisch voordeel: aan tafel gaan kost hier geen halve dag. We bouwen in Limburg websites, webshops, maatwerksoftware en mobiele apps, van een site voor een installatiebedrijf tot een platform dat een stuk administratie overneemt. In ruim 17 jaar zijn dat meer dan 150 projecten geworden, en bijna allemaal begonnen ze op dezelfde manier: een half uur bellen om te horen of het klikt.",
      ],
      faq: [
        {
          question: "Waar zit Brisk precies?",
          answer:
            "Brisk is gevestigd in Limburg, België, en werkt van daaruit voor klanten in heel België en Nederland.",
        },
        {
          question: "Welke Limburgse bedrijven hebben jullie al geholpen?",
          answer:
            "In Limburg bouwden we onder meer de sites van designhotel City Housing in Genk, chiptuningspecialist ECU Performance, tegelspecialist TCKO en sanitair- en verwarmingsbedrijf Comfort Solutions.",
        },
        {
          question: "Kunnen we langskomen of komen jullie naar ons?",
          answer:
            "Allebei kan. Voor een Limburgs project zitten we snel samen aan tafel, en de eerste kennismaking van 30 minuten is gratis en vrijblijvend.",
        },
        {
          question: "Werken jullie alleen voor Limburgse bedrijven?",
          answer:
            "Nee. Limburg is onze thuisbasis, maar we werken voor klanten in heel België en Nederland, en het grootste deel van een project loopt online.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in Limburg, Belgium",
      metaDescription:
        "Brisk builds websites, webshops, software and apps from Limburg. Work delivered in Genk, Hasselt, Sint-Truiden and Tongeren: 150+ projects in 17+ years.",
      h1: "Websites, webshops and software from Limburg",
      lead: "Brisk is based in Limburg. Hasselt, Genk, Sint-Truiden, Tongeren, Beringen, Lommel and Maasmechelen are not a keyword list to us but the area we work in, where a good share of our clients are a short drive away.",
      localAngle: [
        "You can go and look at the work in person. City Housing, a design hotel in Genk, sells its rooms through a site we built. ECU Performance, a chiptuning specialist in Genk, books its appointments through theirs. TCKO sends visitors to its tile showroom, and Comfort Solutions takes requests for bathroom, heating and ventilation work. Four Limburg companies, four different goals, four sites that look nothing like each other.",
        "Limburg's economy is largely made of companies with a family name on the front. Automotive and logistics around Genk, construction and installation firms across the province, care, and the fruit and agri sector around Sint-Truiden and Tongeren. What they share is that the owner decides, and wants to know exactly what they are getting before signing. So we work in short steps with something visible at the end of each one, and the design and code belong to you once the project ships.",
        "Being nearby has one practical advantage: sitting down together does not cost half a day. In Limburg we build websites, webshops, custom software and mobile apps, from a site for an installation company to a platform that takes over a chunk of the back office. Over 17-plus years that has added up to more than 150 projects, and almost all of them started the same way: half an hour on a call to see whether it fits.",
      ],
      faq: [
        {
          question: "Where is Brisk based?",
          answer:
            "Brisk is based in Limburg, Belgium, and works from there for clients across Belgium and the Netherlands.",
        },
        {
          question: "Which Limburg companies have you worked with?",
          answer:
            "In Limburg we built the sites for City Housing, a design hotel in Genk, for chiptuning specialist ECU Performance, for tile specialist TCKO and for plumbing and heating company Comfort Solutions.",
        },
        {
          question: "Can we visit you, or will you come to us?",
          answer:
            "Either works. For a project in Limburg we can sit down together quickly, and the first 30-minute conversation is free with no strings attached.",
        },
        {
          question: "Do you only work for companies in Limburg?",
          answer:
            "No. Limburg is our home base, but we work for clients throughout Belgium and the Netherlands, and most of a project runs online.",
        },
      ],
    },
  },

  "vlaams-brabant": {
    nl: {
      metaTitle: "Website laten maken in Vlaams-Brabant",
      metaDescription:
        "Websites, webshops, software en apps voor bedrijven in Leuven, Zaventem, Vilvoorde en Halle. Engelstalig waar het moet, Nederlands waar het telt.",
      h1: "Websites en maatwerksoftware voor bedrijven in Vlaams-Brabant",
      lead: "In Leuven wordt onderzoek een bedrijf, en rond Zaventem en Vilvoorde wordt een pakket een levering. Vlaams-Brabant ligt tussen die twee werelden in, en wij bouwen er websites, webshops, software en apps voor bedrijven die klanten hebben in Vlaanderen én in Brussel.",
      localAngle: [
        "Leuven levert bedrijven af die iets doen wat je niet in één zin uitlegt. Je site moet dan twee lezers tegelijk bedienen: de specialist die de details wil en de beslisser die na tien seconden weet of dit voor hem is. Dat lost een mooie homepage niet op, dat lost structuur op. Een claim die klopt, bewijs eronder, documentatie voor wie doorleest, en meestal Engels als eerste taal in plaats van als bijlage. Regelmatig is het echte werk trouwens geen website maar een platform, een dashboard of een app waar het product zelf in zit.",
        "Aan de andere kant van de provincie, rond Zaventem, Vilvoorde en Machelen, bewegen goederen en diensten. Klanten daar spreken evengoed Frans of Engels, dus een site in één taal laat werk liggen. En omdat de arbeidsmarkt rond de luchthaven krap is, is de vacaturepagina er vaak een van de best bezochte pagina's van de hele site. Die verdient dezelfde aandacht als de homepage, inclusief een sollicitatie die op een telefoon lukt.",
        "Halle, Tienen, Diest en Aarschot spelen weer iets anders: klanten uit de eigen streek, concurrenten die je bij naam kent, en zoekopdrachten waar de gemeente in staat. Daar wint de site die snel laadt, in gewone taal zegt wat je doet en makkelijk contact maakt, niet de site met de meeste effecten. Wij werken vanuit Limburg, Leuven en de Brusselse rand liggen op rijafstand, en we komen langs wanneer een gesprek aan tafel het project vooruit helpt.",
      ],
      faq: [
        {
          question: "Bouwen jullie Engelstalige sites voor technologiebedrijven in Leuven?",
          answer:
            "Ja. Voor onderzoeks- en technologiebedrijven rond Leuven bouwen we sites met Engels als eerste taal, met een Nederlandse versie ernaast wanneer je ook een lokaal publiek bedient.",
        },
        {
          question: "Kunnen jullie ook interne software of een dashboard bouwen?",
          answer:
            "Ja. Naast websites en webshops bouwen we maatwerksoftware en mobiele apps, van klantenportalen en planningstools tot dashboards die aansluiten op de systemen die je vandaag al gebruikt.",
        },
        {
          question: "Komen jullie naar Leuven of Zaventem voor een gesprek?",
          answer:
            "Brisk werkt vanuit Limburg en doet het meeste online, maar Leuven, Zaventem en Vilvoorde liggen op rijafstand en we komen langs voor een kick-off of een presentatie.",
        },
        {
          question: "Werken jullie ook voor bedrijven buiten Vlaams-Brabant?",
          answer:
            "Ja. Brisk werkt voor klanten in heel België en Nederland, dus of je nu in Tienen, Antwerpen of Eindhoven zit maakt voor de samenwerking weinig uit.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in Flemish Brabant",
      metaDescription:
        "Websites, webshops, software and apps for companies in Leuven, Zaventem, Vilvoorde and Halle. English where it matters, Dutch where it counts.",
      h1: "Websites and custom software for Flemish Brabant",
      lead: "In Leuven, research turns into a company; around Zaventem and Vilvoorde, a parcel turns into a delivery. Flemish Brabant sits between those two worlds, and we build the websites, webshops, software and apps for companies with customers in Flanders and in Brussels at the same time.",
      localAngle: [
        "Leuven produces companies doing things that take more than one sentence to explain. Your site then has to serve two readers at once: the specialist who wants the detail and the decision-maker who needs ten seconds to know whether this is for them. A pretty homepage does not solve that; structure does. A claim that holds, evidence beneath it, documentation for whoever keeps reading, and usually English as the first language rather than an afterthought. Quite often the real work is not a website at all but a platform, a dashboard or an app that is the product itself.",
        "At the other end of the province, around Zaventem, Vilvoorde and Machelen, goods and services move. Customers there are just as likely to speak French or English, so a single-language site leaves business on the table. And because the labour market near the airport is tight, the careers page is frequently one of the most visited pages on the whole site. It deserves the same attention as the homepage, including an application that can be completed on a phone.",
        "Halle, Tienen, Diest and Aarschot play yet another game: customers from the area, competitors you know by name, and searches with the town name in them. There the winner is the site that loads fast, says what you do in plain language and makes contact easy, not the one with the most effects. We work from Limburg; Leuven and the Brussels periphery are a short drive, and we come over when a conversation at your table moves things along.",
      ],
      faq: [
        {
          question: "Do you build English-language sites for technology companies in Leuven?",
          answer:
            "Yes. For research and technology companies around Leuven we build sites with English as the primary language, and add a Dutch version when you also serve a local audience.",
        },
        {
          question: "Can you build internal software or a dashboard as well?",
          answer:
            "Yes. Alongside websites and webshops we build custom software and mobile apps, from client portals and planning tools to dashboards that connect to the systems you already run.",
        },
        {
          question: "Will you travel to Leuven or Zaventem for a meeting?",
          answer:
            "Brisk works from Limburg and handles most of a project online, but Leuven, Zaventem and Vilvoorde are a short drive away and we come over for a kick-off or a presentation.",
        },
        {
          question: "Do you work with companies outside Flemish Brabant?",
          answer:
            "Yes. Brisk works for clients across Belgium and the Netherlands, so whether you are in Tienen, Antwerp or Eindhoven makes little difference to how we collaborate.",
        },
      ],
    },
  },

  brussel: {
    nl: {
      metaTitle: "Tweetalige website laten maken in Brussel",
      metaDescription:
        "Nederlands, Frans en Engels op één site, van bij de start correct opgebouwd. Websites, webshops en software voor Brusselse bedrijven en organisaties.",
      h1: "Tweetalige websites en software voor Brussel",
      lead: "In Brussel is taal geen detail dat je op het einde regelt. Een site die hier werkt, doet Nederlands en Frans even goed en meestal Engels erbij, en dat bepaalt hoe je hem bouwt, niet hoe je hem achteraf laat vertalen. Wij bouwen die sites, plus de webshops, software en apps eromheen.",
      localAngle: [
        "Een tweetalige site is geen knop bovenaan. Elke taal heeft een eigen URL nodig, een eigen titel en beschrijving, eigen teksten en een redacteur die er iets aan kan veranderen zonder ons te bellen. Formulieren, foutmeldingen, bevestigingsmails en de checkout horen daar allemaal bij, en dat is precies waar automatisch vertaalde sites in Brussel door de mand vallen. Wij zetten die structuur vanaf dag één klaar, zodat er later een derde taal bij kan zonder de site opnieuw te bouwen.",
        "Brussel is ook de stad van hoofdkantoren, federaties, instellingen en organisaties die het hele land bedienen. Zulke sites moeten jaren mee, door veel handen kunnen en bruikbaar zijn voor iedereen die ze opent, ook met een screenreader of op een oud toestel. Onder onze klanten zitten NMBS, De Watergroep, IDEWE, museumPASSmusées en de Belgische voetbalbond, dus dat soort werk kennen we: meerdere redacteuren, twee talen, en een structuur die niet omvalt als er volgend jaar een afdeling bij komt. Code en ontwerp zijn van jou, dus je zit nooit aan ons vast.",
        "En dan de dagelijkse Brusselse economie: dienstverleners, praktijken, horeca en winkels in Elsene, Sint-Gillis, Schaarbeek, Anderlecht, Ukkel en Evere, waar de klant uit de ene straat Nederlands spreekt en die uit de volgende Frans. Verkoop je online, dan is een tweetalige checkout geen extraatje maar een voorwaarde. Wij werken vanuit Limburg en Brussel is een treinrit: het meeste doen we op afstand, en we komen langs wanneer het gesprek daarom vraagt.",
      ],
      faq: [
        {
          question: "Bouwen jullie sites in het Nederlands én het Frans?",
          answer:
            "Ja. We bouwen de site meertalig op met een aparte URL en aparte teksten per taal; het Nederlands en het Engels schrijven we zelf, en de Franse teksten maken we samen met jou of met een moedertaalvertaler.",
        },
        {
          question: "Kunnen jullie er ook Engels bij zetten voor een internationaal publiek?",
          answer:
            "Ja. Een derde taal is in Brussel eerder regel dan uitzondering, en omdat we de site vanaf het begin meertalig opbouwen kost die extra taal geen nieuwe website.",
        },
        {
          question: "Werken jullie voor organisaties met een tweetalige redactie?",
          answer:
            "Ja. We leveren een systeem waarin een Nederlandstalige en een Franstalige redacteur elk hun eigen versie beheren zonder elkaars werk te overschrijven.",
        },
        {
          question: "Komen jullie naar Brussel voor een gesprek?",
          answer:
            "Brisk werkt vanuit Limburg, maar Brussel is een treinrit: we komen langs voor een kick-off of een presentatie, en de gratis kennismaking van 30 minuten kan gewoon online.",
        },
      ],
    },
    en: {
      metaTitle: "Multilingual website development in Brussels",
      metaDescription:
        "Dutch, French and English on one site, built properly from the start. Websites, webshops and software for Brussels businesses, head offices and institutions.",
      h1: "Bilingual websites and software for Brussels",
      lead: "In Brussels, language is not a detail you settle at the end. A site that works here has to do Dutch and French equally well, usually with English on top, and that shapes how it is built rather than how it is translated afterwards. We build those sites, and the webshops, software and apps around them.",
      localAngle: [
        "A bilingual site is not a toggle in the corner. Each language needs its own URL, its own title and description, its own copy and an editor who can change it without calling us. Forms, error messages, confirmation emails and the checkout all belong to that, and that is exactly where machine-translated sites fall apart in Brussels. We put that structure in place on day one, so a third language can be added later without rebuilding the site.",
        "Brussels is also the city of head offices, federations, institutions and organisations serving the whole country. Those sites have to last years, survive many hands and stay usable for everyone who opens them, including on a screen reader or an old device. Our clients include NMBS, De Watergroep, IDEWE, museumPASSmusées and the Belgian FA, so we know the shape of that work: several editors, two languages, and a structure that does not collapse when a new department appears next year. The code and design are yours, so you are never locked in to us.",
        "Then there is the everyday Brussels economy: service firms, practices, hospitality and shops in Ixelles, Saint-Gilles, Schaerbeek, Anderlecht, Uccle and Evere, where the customer from one street speaks Dutch and the one from the next speaks French. If you sell online, a bilingual checkout is a requirement rather than a nice extra. We work from Limburg and Brussels is a train ride away: most of it happens remotely, and we come over when the conversation calls for it.",
      ],
      faq: [
        {
          question: "Do you build sites in both Dutch and French?",
          answer:
            "Yes. We build the site multilingual with a separate URL and separate copy per language; we write the Dutch and English ourselves, and the French copy is produced together with you or with a native translator.",
        },
        {
          question: "Can you add English for an international audience?",
          answer:
            "Yes. A third language is the rule rather than the exception in Brussels, and because we build the site multilingual from the start, adding it does not mean a new website.",
        },
        {
          question: "Do you work with organisations that have a bilingual editorial team?",
          answer:
            "Yes. We deliver a system where a Dutch-speaking and a French-speaking editor each manage their own version without overwriting each other's work.",
        },
        {
          question: "Will you come to Brussels for a meeting?",
          answer:
            "Brisk works from Limburg, but Brussels is a train ride away: we travel over for a kick-off or a presentation, and the free 30-minute intro call can simply happen online.",
        },
      ],
    },
  },

  "waals-brabant": {
    nl: {
      metaTitle: "Website laten maken in Waals-Brabant",
      metaDescription:
        "Franstalige websites, webshops en software voor bedrijven in Waver, Nijvel, Eigenbrakel en Louvain-la-Neuve. Frans, Engels en Nederlands naast elkaar.",
      h1: "Franstalige websites en software voor Waals-Brabant",
      lead: "Waals-Brabant werkt in het Frans, kijkt naar Brussel en verkoopt vaak in het Engels. Van de farma- en biotechbedrijven rond Waver en Eigenbrakel tot de onderzoeksbedrijven op de science parks van Ottignies-Louvain-la-Neuve: een website is hier zelden een puur lokaal verhaal.",
      localAngle: [
        "Laten we bij de eerste vraag beginnen, want die gaat over taal. Wij ontwerpen, bouwen en schrijven in het Nederlands en het Engels. Franstalige teksten maken we samen met jou of met een moedertaalvertaler, en er komt niets in het Frans online dat een Franstalige lezer niet heeft nagelezen. De site zelf zetten we vanaf de eerste dag meertalig op, met een aparte URL en aparte teksten per taal, zodat Frans, Engels en desnoods Nederlands naast elkaar bestaan in plaats van door elkaar.",
        "In farma en biotech is niet alles wat je wil zeggen ook wat je mag zeggen. Teksten passeren meerdere handen voor ze online gaan, en een site mag daar niet tegenin werken: een systeem waarin een aanpassing tien minuten kost, wijzigingen die iemand kan nakijken voor ze live staan, en studies, dossiers en documenten die vindbaar zijn in plaats van weggestopt in een map op een server. Voor bedrijven rond Waver, Eigenbrakel en Nijvel is dat vaak belangrijker dan het uitzicht van de homepage.",
        "Rond Ottignies-Louvain-la-Neuve zie je hetzelfde patroon als in Leuven: onderzoek dat een bedrijf wordt en meteen internationaal moet verkopen, waarbij het echte product soms een platform of een app is en niet de site ervoor. Daarnaast is Waals-Brabant een provincie van dienstverleners, praktijken, bouw en installatie in Nijvel, Geldenaken en Eigenbrakel, met klanten uit de eigen streek en uit Brussel. Wij werken vanuit Limburg, doen het meeste op afstand en rijden naar Waver of Louvain-la-Neuve wanneer een gesprek aan tafel telt.",
      ],
      faq: [
        {
          question: "Werken jullie in het Frans?",
          answer:
            "We ontwerpen en bouwen vanuit het Nederlands en het Engels, en Franstalige teksten maken we samen met jou of met een moedertaalvertaler, zodat alles wat online komt door een Franstalige lezer is nagelezen.",
        },
        {
          question: "Kunnen jullie een site in het Frans, Engels en Nederlands tegelijk bouwen?",
          answer:
            "Ja. We bouwen meertalige sites met een eigen URL en eigen teksten per taal, zodat je klanten in Waals-Brabant, partners in Brussel en kopers in het buitenland op dezelfde site bedient.",
        },
        {
          question: "Hoe gaan jullie om met teksten die eerst intern goedgekeurd moeten worden?",
          answer:
            "We richten de site zo in dat een aanpassing eerst als voorstel klaarstaat en pas online komt als de juiste persoon ze heeft nagekeken, wat scheelt wanneer je in een gereguleerde sector werkt.",
        },
        {
          question: "Komen jullie naar Waals-Brabant voor een gesprek?",
          answer:
            "Brisk zit in Limburg en werkt grotendeels op afstand, maar we rijden naar Waver, Nijvel of Louvain-la-Neuve voor een kick-off of een presentatie; de eerste kennismaking van 30 minuten is gratis.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in Walloon Brabant",
      metaDescription:
        "French-language websites, webshops and software for companies in Wavre, Nivelles, Braine-l'Alleud and Louvain-la-Neuve. French, English and Dutch side by side.",
      h1: "French-language websites and software for Walloon Brabant",
      lead: "Walloon Brabant works in French, looks towards Brussels and often sells in English. From the pharma and biotech companies around Wavre and Braine-l'Alleud to the research firms on the science parks at Ottignies-Louvain-la-Neuve, a website here is rarely a purely local affair.",
      localAngle: [
        "Start with the language question, because it is always the first one. We design, build and write in Dutch and English. French copy is produced together with you or with a native translator, and nothing goes live in French without a native speaker having read it. The site itself is multilingual from day one, with a separate URL and separate copy per language, so French, English and Dutch where needed sit side by side instead of on top of each other.",
        "In pharma and biotech, not everything you want to say is something you are allowed to say. Copy passes through several hands before it is published, and the site should not fight that: a system where an edit takes ten minutes, changes someone can review before they go live, and studies, dossiers and documents that are findable rather than buried in a folder on a server. For companies around Wavre, Braine-l'Alleud and Nivelles, that usually matters more than how the homepage looks.",
        "Around Ottignies-Louvain-la-Neuve you see the same pattern as in Leuven: research becoming a company that has to sell internationally straight away, where the real product is sometimes a platform or an app rather than the site in front of it. Beyond that, Walloon Brabant is a province of service firms, practices, construction and installation businesses in Nivelles, Jodoigne and Braine-l'Alleud, serving both the local area and Brussels. We work from Limburg, run most of it remotely, and drive to Wavre or Louvain-la-Neuve when sitting at the table counts.",
      ],
      faq: [
        {
          question: "Do you work in French?",
          answer:
            "We design and build from Dutch and English, and French copy is produced together with you or with a native translator, so everything published in French has been checked by a native speaker.",
        },
        {
          question: "Can you build one site in French, English and Dutch at the same time?",
          answer:
            "Yes. We build multilingual sites with a separate URL and separate copy per language, so you can serve customers in Walloon Brabant, partners in Brussels and buyers abroad from the same site.",
        },
        {
          question: "How do you handle copy that needs internal approval first?",
          answer:
            "We set the site up so an edit is staged as a proposal and only goes live once the right person has reviewed it, which helps a lot if you work in a regulated sector.",
        },
        {
          question: "Will you travel to Walloon Brabant for a meeting?",
          answer:
            "Brisk is based in Limburg and works largely remotely, but we drive to Wavre, Nivelles or Louvain-la-Neuve for a kick-off or a presentation, and the first 30-minute conversation is free.",
        },
      ],
    },
  },

  henegouwen: {
    nl: {
      metaTitle: "Website laten maken in Henegouwen",
      metaDescription:
        "Websites, webshops en maatwerksoftware die papierwerk vervangt, voor bedrijven in Charleroi, Bergen, Doornik en Moeskroen. Franstalig opgeleverd.",
      h1: "Websites, webshops en software voor Henegouwen",
      lead: "Henegouwen is de provincie waar de digitale winst nog het dikst voor het rapen ligt. Van Charleroi en La Louvière tot Bergen, Doornik, Moeskroen en Aat draaien er bedrijven prima met een site uit een vorig decennium en met bestellingen die per telefoon en e-mail binnenkomen.",
      localAngle: [
        "De eerste winst zit daar meestal niet in een mooier ontwerp maar in werk dat verdwijnt. Een offerte die zichzelf opmaakt uit de gegevens die de klant al invulde, een planning die niet langer op een whiteboard staat, een klantenportaal waar mensen hun documenten en bestellingen zelf terugvinden, een app waarmee een ploeg op de werf uren en foto's meteen doorgeeft. Dat is maatwerksoftware, en ze levert vaak sneller iets op dan een nieuwe homepage.",
        "Verkopen doe je hier zelden alleen aan Henegouwen. Moeskroen en Doornik liggen tegen Rijsel aan, Bergen kijkt richting Valenciennes, en Charleroi haalt met zijn luchthaven publiek van veel verder. Verkoop je over de grens, dan is je site niet alleen Franstalig maar ook gericht op een Frans publiek: andere zoekwoorden, andere verwachtingen over levering en garantie, soms een aparte prijslijst. Heb je daarnaast Vlaamse klanten, dan hoort daar een volwaardige Nederlandstalige versie bij en geen doorverwijsknop.",
        "Over taal zijn we duidelijk. Wij ontwerpen en bouwen vanuit het Nederlands en het Engels, en de Franse teksten schrijven we samen met jou of met een moedertaalvertaler. De structuur, de zoekwoorden en de techniek doen wij; de laatste Franse pennentrek doet iemand voor wie het de moedertaal is. Wij zitten in Limburg, werken grotendeels op afstand en komen naar Charleroi, Bergen of Doornik wanneer een gesprek ter plaatse het project vooruit helpt.",
      ],
      faq: [
        {
          question: "Werken jullie in het Frans voor bedrijven in Henegouwen?",
          answer:
            "Ja. We bouwen en ontwerpen vanuit het Nederlands en het Engels en maken de Franse teksten samen met jou of met een moedertaalvertaler, zodat de Franstalige site leest alsof ze in Henegouwen geschreven is.",
        },
        {
          question: "Kunnen jullie ons papierwerk vervangen door software?",
          answer:
            "Ja. We bouwen maatwerksoftware die offertes, planningen, werkbonnen of klantendossiers overneemt en die aansluit op de systemen en bestanden waarmee je vandaag werkt.",
        },
        {
          question: "Kunnen jullie een webshop bouwen die ook in Noord-Frankrijk verkoopt?",
          answer:
            "Ja. We bouwen webshops met eigen teksten en zoekwoorden per markt en met leverings- en prijsregels die per land kunnen verschillen, zodat een klant uit Rijsel hetzelfde gemak krijgt als een klant uit Doornik.",
        },
        {
          question: "Komen jullie langs in Charleroi of Bergen?",
          answer:
            "Brisk werkt vanuit Limburg en het meeste loopt online, maar we komen naar Charleroi, Bergen, La Louvière of Doornik wanneer een gesprek ter plaatse het project vooruit helpt.",
        },
      ],
    },
    en: {
      metaTitle: "Websites and software in Hainaut",
      metaDescription:
        "Websites, webshops and custom software that replaces paperwork, for companies in Charleroi, Mons, Tournai and Mouscron. Delivered in French.",
      h1: "Websites, webshops and software for Hainaut",
      lead: "Hainaut is the province where the digital gains are still lying on the table. From Charleroi and La Louvière to Mons, Tournai, Mouscron and Ath, plenty of companies run perfectly well on a website from a previous decade, with orders still arriving by phone and email.",
      localAngle: [
        "The first gain there is usually not a better-looking design but work that disappears. A quote that builds itself from what the customer already filled in, a schedule that no longer lives on a whiteboard, a client portal where people find their own documents and orders, an app that lets a crew on site log hours and photos on the spot. That is custom software, and it often pays back faster than a new homepage.",
        "Selling here rarely stops at the provincial border. Mouscron and Tournai sit right against Lille, Mons looks towards Valenciennes, and Charleroi pulls an audience from much further away through its airport. If you sell across the border, your site is not just in French but aimed at a French audience: different search terms, different expectations around delivery and warranty, sometimes a separate price list. And if you also serve Flemish customers, that means a full Dutch version, not a link that sends them elsewhere.",
        "About language we are straightforward. We design and build from Dutch and English, and the French copy is written together with you or with a native translator. The structure, the search terms and the engineering are ours; the final French wording belongs to someone who grew up with it. We are based in Limburg, work largely remotely, and travel to Charleroi, Mons or Tournai when meeting in person moves the project along.",
      ],
      faq: [
        {
          question: "Do you work in French for companies in Hainaut?",
          answer:
            "Yes. We design and build from Dutch and English and produce the French copy together with you or with a native translator, so the French site reads as if it was written in Hainaut.",
        },
        {
          question: "Can you replace our paperwork with software?",
          answer:
            "Yes. We build custom software that takes over quotes, planning, work orders or customer files, and that connects to the systems and files you work with today.",
        },
        {
          question: "Can you build a webshop that also sells into northern France?",
          answer:
            "Yes. We build webshops with separate copy and search terms per market and with delivery and pricing rules that can differ per country, so a customer in Lille gets the same experience as one in Tournai.",
        },
        {
          question: "Will you come to Charleroi or Mons?",
          answer:
            "Brisk works from Limburg and most of a project runs online, but we travel to Charleroi, Mons, La Louvière or Tournai when meeting in person helps the project along.",
        },
      ],
    },
  },

  luik: {
    nl: {
      metaTitle: "Website laten maken in Luik",
      metaDescription:
        "Frans, Duits en Engels op één site. Websites, webshops, software en apps voor bedrijven in Luik, Herstal, Verviers en Eupen. Antwoord binnen 24 uur.",
      h1: "Websites en software voor bedrijven in de provincie Luik",
      lead: "Luik is de enige provincie waar je in één project drie talen kan tegenkomen: Frans in Luik, Seraing, Herstal en Hoei, Duits in Eupen en de Oostkantons, en Engels zodra er vracht op de luchthaven staat. Welke talen je site spreekt is hier de eerste beslissing, niet de laatste.",
      localAngle: [
        "Rond de luchthaven draait alles op doorlooptijd. Voor bedrijven in expeditie, opslag en fulfilment is de publieke website vaak het minst interessante deel van het werk: de winst zit in een portaal waar een klant zijn zendingen volgt, in koppelingen met de systemen die er al draaien, en in een app voor de mensen op de vloer. Dat bouwen wij als maatwerksoftware, met de website ervoor als visitekaartje in plaats van als hoofdzaak.",
        "Techniek is de andere pijler. Rond Seraing en Herstal zitten staal, machinebouw, toelevering en ruimtevaart, en die verkopen aan inkopers en ingenieurs die eerst je documentatie lezen en pas daarna bellen. Zo'n site is minder marketing en meer dossier: producten met echte specificaties, certificaten en tekeningen die te vinden zijn, en een volwaardige Engelse versie, want je klant zit even vaak in Toulouse of Hamburg als in Wallonië.",
        "En dan Eupen. De Oostkantons zijn Duitstalig, en dat los je niet op met een vertaalknop op een Franstalige site: het is een eigen taalversie, met eigen teksten en eigen zoekwoorden. Wij ontwerpen en bouwen vanuit het Nederlands en het Engels en zetten de site meertalig op; Franse en Duitse teksten maken we samen met jou of met een moedertaalvertaler, zodat elke versie leest alsof ze daar geschreven is. Vanuit Limburg is Luik trouwens dichtbij, dus langskomen is hier geen expeditie.",
      ],
      faq: [
        {
          question: "Kunnen jullie een site in het Frans en het Duits bouwen voor Eupen en de Oostkantons?",
          answer:
            "Ja. We bouwen het Duits als een volwaardige taalversie met eigen URL, eigen teksten en eigen zoekwoorden, naast het Frans en waar nodig het Nederlands en het Engels.",
        },
        {
          question: "Bouwen jullie klantenportalen voor logistiek en fulfilment?",
          answer:
            "Ja. Voor bedrijven rond de luchthaven van Luik bouwen we portalen waarin klanten hun zendingen en documenten volgen, plus apps voor medewerkers die op de vloer of onderweg werken.",
        },
        {
          question: "Werken jullie ook in het Engels voor internationale klanten?",
          answer:
            "Ja. Engelse teksten schrijven we zelf, en voor technische bedrijven bouwen we een Engelse versie die volwaardig is in plaats van een verkorte samenvatting van de Franse site.",
        },
        {
          question: "Komen jullie naar Luik voor een gesprek?",
          answer:
            "Brisk werkt vanuit Limburg en Luik ligt dichtbij, dus we rijden er langs voor een kick-off of een presentatie; het eerste gesprek van 30 minuten is gratis en kan ook online.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in Liège",
      metaDescription:
        "French, German and English on one site. Websites, webshops, software and apps for companies in Liège, Herstal, Verviers and Eupen. Reply within 24 hours.",
      h1: "Websites and software for the province of Liège",
      lead: "Liège is the one province where a single project can involve three languages: French in Liège, Seraing, Herstal and Huy, German in Eupen and the East Cantons, and English the moment freight is on the tarmac. Which languages your site speaks is the first decision here, not the last.",
      localAngle: [
        "Around the airport, everything runs on turnaround time. For freight forwarding, warehousing and fulfilment companies, the public website is often the least interesting part of the job: the value sits in a portal where a client tracks shipments, in connections to the systems already running, and in an app for the people on the floor. We build that as custom software, with the website in front of it as a calling card rather than the main event.",
        "Engineering is the other pillar. Around Seraing and Herstal you find steel, machine building, supply work and aerospace, selling to buyers and engineers who read your documentation first and call afterwards. That kind of site is less marketing and more dossier: products with real specifications, certificates and drawings that can actually be found, and a full English version, because your customer is as likely to sit in Toulouse or Hamburg as in Wallonia.",
        "And then Eupen. The East Cantons are German-speaking, and that is not solved with a translate button on a French site: it is its own language version, with its own copy and its own search terms. We design and build from Dutch and English and set the site up multilingual; French and German copy is produced together with you or with a native translator, so each version reads as if it was written there. Liège is also close to Limburg, so coming over is no expedition.",
      ],
      faq: [
        {
          question: "Can you build a site in French and German for Eupen and the East Cantons?",
          answer:
            "Yes. We build German as a full language version with its own URL, its own copy and its own search terms, alongside French and, where needed, Dutch and English.",
        },
        {
          question: "Do you build client portals for logistics and fulfilment companies?",
          answer:
            "Yes. For companies around Liège Airport we build portals where clients track shipments and documents, along with apps for staff working on the floor or on the road.",
        },
        {
          question: "Do you also work in English for international customers?",
          answer:
            "Yes. We write the English copy ourselves, and for technical companies we build an English version that is complete rather than a shortened summary of the French site.",
        },
        {
          question: "Will you come to Liège for a meeting?",
          answer:
            "Brisk works from Limburg and Liège is nearby, so we drive over for a kick-off or a presentation; the first 30-minute conversation is free and can also happen online.",
        },
      ],
    },
  },

  namen: {
    nl: {
      metaTitle: "Website laten maken in Namen",
      metaDescription:
        "Toegankelijke, meertalige websites, webshops en software voor organisaties en bedrijven in Namen, Dinant, Ciney en Gembloers. Gratis eerste gesprek.",
      h1: "Websites en software voor bedrijven en organisaties in Namen",
      lead: "Namen is bestuursstad en Maasvallei tegelijk. In de stad zitten diensten, dienstverleners en organisaties met een publiek dat iets moet terugvinden; in Dinant, Andenne, Ciney en Gembloers zitten toerisme, agrovoeding en bedrijven die van een seizoen leven.",
      localAngle: [
        "Een site voor een organisatie met een publieke opdracht wordt op iets anders afgerekend dan een verkoopsite. De vragen zijn: vindt iemand wat hij zoekt, klopt het over drie jaar nog, en werkt het ook voor wie met een screenreader leest of met één hand op een telefoon scrolt. Toegankelijkheid, een heldere structuur en teksten die een medewerker zelf kan bijwerken bouwen we daarom vanaf de eerste schets in, niet als controle achteraf.",
        "Langs de Maas is de kalender de baas. Een hotel in Dinant, een kajakverhuur, een gîte of een attractie verkoopt in een paar maanden wat het hele jaar moet dragen, en dat gebeurt op een telefoon, vaak onderweg. Dan telt een boekingsflow met zo weinig mogelijk stappen, een site die licht genoeg is om buiten te laden, en Nederlands naast Frans en Engels, want een flink deel van je bezoekers komt uit Vlaanderen en Nederland.",
        "Rond Gembloers en Ciney zit de agrovoeding, van onderzoek tot producenten die rechtstreeks aan de eindklant verkopen. Doe je dat laatste, dan is een webshop met afhaalpunten, seizoensvoorraad en eventueel abonnementen meestal de stap die het meeste oplevert. Wij ontwerpen en bouwen vanuit het Nederlands en het Engels; de Franse teksten maken we samen met jou of met een moedertaalvertaler, en er gaat niets in het Frans online zonder dat een Franstalige lezer het heeft nagelezen.",
      ],
      faq: [
        {
          question: "Bouwen jullie sites die ook Nederlandstalige bezoekers bedienen?",
          answer:
            "Ja. Voor toeristische bedrijven in Namen en Dinant zetten we naast het Frans een volwaardige Nederlandse en Engelse versie op, omdat een groot deel van de bezoekers uit Vlaanderen en Nederland komt.",
        },
        {
          question: "Houden jullie rekening met toegankelijkheid?",
          answer:
            "Ja. We bouwen sites die werken met een toetsenbord en een screenreader, met voldoende contrast en met een structuur die logisch voorgelezen wordt, en voor organisaties met een publiek bereik is dat het uitgangspunt.",
        },
        {
          question: "Kunnen jullie een boekings- of reservatiesysteem bouwen?",
          answer:
            "Ja. We bouwen boekingsflows voor hotels, gîtes en attracties die op een telefoon werken en die aansluiten op het reservatiesysteem dat je al gebruikt.",
        },
        {
          question: "Komen jullie naar Namen voor een gesprek?",
          answer:
            "Brisk werkt vanuit Limburg en doet het grootste deel van een project op afstand, maar we rijden naar Namen of Dinant voor een kick-off of een oplevering; het eerste gesprek van 30 minuten is gratis.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in Namur",
      metaDescription:
        "Accessible, multilingual websites, webshops and software for organisations and businesses in Namur, Dinant, Ciney and Gembloux. Free first conversation.",
      h1: "Websites and software for organisations in Namur",
      lead: "Namur is an administrative capital and a river valley at the same time. The city holds public services, professional firms and organisations whose audience needs to find something; Dinant, Andenne, Ciney and Gembloux hold tourism, agri-food and businesses that live off a season.",
      localAngle: [
        "A site for an organisation with a public role is judged on different things than a sales site. The questions are whether someone finds what they came for, whether it still holds up in three years, and whether it works for a visitor using a screen reader or scrolling one-handed on a phone. So accessibility, a clear structure and copy that a staff member can update themselves go in from the first sketch, not as a check at the end.",
        "Along the Meuse, the calendar is in charge. A hotel in Dinant, a kayak rental, a gîte or an attraction sells in a few months what has to carry the whole year, and it happens on a phone, often while people are already travelling. That puts the weight on a booking flow with as few steps as possible, a site light enough to load outdoors, and Dutch alongside French and English, because a large share of your visitors come from Flanders and the Netherlands.",
        "Around Gembloux and Ciney sits agri-food, from research through to producers selling straight to the end customer. If that is you, a webshop with pickup points, seasonal stock and possibly subscriptions is usually the step that returns the most. We design and build from Dutch and English; the French copy is produced together with you or with a native translator, and nothing is published in French without a native speaker having read it.",
      ],
      faq: [
        {
          question: "Can you build sites that also serve Dutch-speaking visitors?",
          answer:
            "Yes. For tourism businesses in Namur and Dinant we add a full Dutch and English version next to the French one, because a large share of visitors come from Flanders and the Netherlands.",
        },
        {
          question: "Do you take accessibility into account?",
          answer:
            "Yes. We build sites that work with a keyboard and a screen reader, with sufficient contrast and a structure that reads out logically, and for organisations with a public audience that is the starting point.",
        },
        {
          question: "Can you build a booking or reservation system?",
          answer:
            "Yes. We build booking flows for hotels, gîtes and attractions that work on a phone and connect to the reservation system you already use.",
        },
        {
          question: "Will you travel to Namur for a meeting?",
          answer:
            "Brisk works from Limburg and runs most of a project remotely, but we drive to Namur or Dinant for a kick-off or a launch, and the first 30-minute conversation is free.",
        },
      ],
    },
  },

  luxemburg: {
    nl: {
      metaTitle: "Website laten maken in provincie Luxemburg",
      metaDescription:
        "Snelle, meertalige sites, webshops en apps voor bedrijven in Aarlen, Bastenaken en Marche-en-Famenne. Boeken op de telefoon, apps voor op de werf.",
      h1: "Websites en software voor de provincie Luxemburg",
      lead: "In de provincie Luxemburg zitten je klanten verder uit elkaar dan waar ook in België. Een aannemer in Marche-en-Famenne, een hotel in Bastenaken, een dienstverlener in Aarlen die evengoed in het Groothertogdom werkt: ze hebben allemaal een site nodig die het werk doet dat elders een winkelraam doet.",
      localAngle: [
        "In de Ardennen komt een groot deel van je bezoekers van buiten de provincie en vaak van buiten het land: Vlamingen en Nederlanders, Fransen, Duitsers, en in Bastenaken een publiek dat er speciaal voor de geschiedenis naartoe rijdt. Voor gîtes, hotels en campings betekent dat een boekingsflow die op een telefoon werkt, foto's die kloppen met de werkelijkheid, en een site die licht genoeg blijft om ook op een matige verbinding te laden. Meertalig, en dan met echte taalversies in plaats van een vertaalknop.",
        "Hout en bouw zijn hier geen bijzaak. Rond Neufchâteau en Marche-en-Famenne verkopen aannemers, houtbedrijven en installateurs op vakmanschap, en dat toon je met werk: projecten met echte foto's, duidelijk in welke gemeenten je komt, en een offerteaanvraag die de juiste vragen stelt. Werkt je ploeg buiten, dan zit de grootste winst vaak niet in de website maar in een app: werkbonnen, uren en foto's die ter plaatse ingevuld worden in plaats van 's avonds op papier.",
        "Aarlen leeft met het Groothertogdom als buur, en dat heeft twee gevolgen voor je site. Je verkoopt mogelijk aan klanten aan de andere kant van de grens, dus Frans, Engels en soms Duits moeten naast elkaar kunnen staan. En je concurreert om personeel met werkgevers daar, waardoor je vacature- en over-onspagina's minstens even hard werken als je dienstenpagina's. Wij zitten in Limburg, en dit is de verste rit van het land: we doen het meeste online en komen voor de momenten waarop het telt.",
      ],
      faq: [
        {
          question: "Werken jullie ook voor bedrijven zo ver van Limburg?",
          answer:
            "Ja. Brisk werkt vanuit Limburg voor klanten in heel België en Nederland; het grootste deel van een project loopt online met videogesprekken en previews, en we rijden naar de provincie Luxemburg voor de momenten waarop dat verschil maakt.",
        },
        {
          question: "Kunnen jullie een boekingssysteem bouwen voor een gîte, hotel of camping?",
          answer:
            "Ja. We bouwen boekingsflows die op een telefoon werken, ook wanneer een bezoeker onderweg is, en die aansluiten op het reservatiesysteem dat je al gebruikt.",
        },
        {
          question: "Bouwen jullie apps voor ploegen die op de werf werken?",
          answer:
            "Ja. We bouwen mobiele apps waarmee een ploeg werkbonnen, uren en foto's ter plaatse invult, zodat het kantoor niet meer wacht op papier dat 's avonds binnenkomt.",
        },
        {
          question: "In welke talen kunnen jullie de site opleveren?",
          answer:
            "We bouwen meertalige sites met echte taalversies in het Frans, Nederlands, Engels en Duits; het Nederlands en het Engels schrijven we zelf, en de Franse en Duitse teksten maken we samen met jou of met een moedertaalvertaler.",
        },
      ],
    },
    en: {
      metaTitle: "Websites and apps in Luxembourg province",
      metaDescription:
        "Fast, multilingual sites, webshops and apps for companies in Arlon, Bastogne and Marche-en-Famenne. Booking on a phone, apps for crews on site.",
      h1: "Websites and software for Luxembourg province",
      lead: "In Luxembourg province your customers are spread further apart than anywhere else in Belgium. A contractor in Marche-en-Famenne, a hotel in Bastogne, a service firm in Arlon that also works in the Grand Duchy: all of them need a website to do the job a shop window does elsewhere.",
      localAngle: [
        "In the Ardennes a large share of your visitors come from outside the province and often from outside the country: Flemish and Dutch travellers, French, German, and in Bastogne an audience that drives there for the history. For gîtes, hotels and campsites that means a booking flow that works on a phone, photography that matches what people will actually find, and a site light enough to load on a mediocre connection. Multilingual, and with real language versions rather than a translate button.",
        "Timber and construction are not a footnote here. Around Neufchâteau and Marche-en-Famenne, contractors, timber companies and installers sell on craftsmanship, and you show that with work: projects with real photographs, a clear statement of which municipalities you cover, and a quote request that asks the right questions. If your crews work outdoors, the biggest gain is often not the website but an app: work orders, hours and photos filled in on site instead of written up on paper in the evening.",
        "Arlon lives with the Grand Duchy next door, and that has two consequences for your site. You may be selling to customers on the other side of the border, so French, English and sometimes German have to sit side by side. And you compete for staff with employers over there, which makes your careers and about pages work at least as hard as your service pages. We are based in Limburg, and this is the longest drive in the country: we handle most of it online and come down for the moments that count.",
      ],
      faq: [
        {
          question: "Do you work with companies this far from Limburg?",
          answer:
            "Yes. Brisk works from Limburg for clients across Belgium and the Netherlands; most of a project runs online through video calls and shared previews, and we drive to Luxembourg province for the moments where being there makes a difference.",
        },
        {
          question: "Can you build a booking system for a gîte, hotel or campsite?",
          answer:
            "Yes. We build booking flows that work on a phone, including for visitors who are already travelling, and that connect to the reservation system you already use.",
        },
        {
          question: "Do you build apps for crews working on site?",
          answer:
            "Yes. We build mobile apps that let a crew complete work orders, hours and photos on location, so the office no longer waits for paperwork that arrives in the evening.",
        },
        {
          question: "Which languages can you deliver the site in?",
          answer:
            "We build multilingual sites with real language versions in French, Dutch, English and German; we write the Dutch and English ourselves, and the French and German copy is produced together with you or with a native translator.",
        },
      ],
    },
  },
};
