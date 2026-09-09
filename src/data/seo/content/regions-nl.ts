/**
 * Region copy for the twelve Dutch provinces.
 *
 * Brisk is a Belgian agency with Dutch clients, so these pages have one extra
 * job next to ranking: they have to answer the question a Dutch reader asks
 * silently on the first screen — "why would I hire a Belgian bureau?" The
 * answer is the same everywhere (one team for both markets, remote rhythm,
 * travel for the moments that matter) but the reason to care differs per
 * province, and that is what each `localAngle` carries.
 *
 * Keep these paragraphs province-specific. If a paragraph would still be true
 * with another province name pasted in, it is doorway-page filler and it needs
 * to be rewritten, not reused.
 */
import type { RegionContentMap } from "./types";

export const netherlandsRegionContent: RegionContentMap = {
  /* ---------------------------- Noord-Holland ---------------------------- */
  "noord-holland": {
    nl: {
      metaTitle: "Website of webshop laten maken in Noord-Holland",
      metaDescription:
        "Websites, webshops, software en apps op maat voor bedrijven in Amsterdam, Haarlem, Hilversum en Alkmaar. 17+ jaar ervaring, antwoord binnen 24 uur.",
      h1: "Digitaal bureau voor bedrijven in Noord-Holland",
      lead: "Noord-Holland is de provincie waar het tempo hoog ligt: scale-ups in Amsterdam, mediabedrijven in Hilversum en handelsfirma's die al generaties in Zaanstad en Hoorn zitten. Wij bouwen daarvoor websites, webshops, software en mobiele apps op maat, vanuit Belgisch Limburg.",
      localAngle: [
        "Amsterdam is het best bediende publiek van Nederland. Bedrijven daar hebben al een merkgids liggen, al met designers gesproken en al een bureau versleten. Wat meestal ontbreekt is een site die de groei van de afgelopen twee jaar aankan: een structuur die tien landingspagina's later nog klopt, Nederlands en Engels netjes naast elkaar, en een front-end die niet bij elke campagne opnieuw uit elkaar valt. Dat is bouwwerk, geen make-over.",
        "Twintig kilometer verderop ligt het anders. Hilversum draait op beeld en geluid, dus daar telt hoe snel een pagina met video binnenkomt en hoe eenvoudig een redactie zelf publiceert. In Haarlem, Amstelveen, Alkmaar en Hoorn zitten bedrijven met een gezonde zaak en een webshop die er ooit is aangeplakt: voorraad die niet klopt, een kassasysteem dat los staat van de site, bestellingen die iemand met de hand overtikt. Daar zit de winst in koppelingen en in software op maat, niet in een nieuwe kleurstelling.",
        "Wij zitten in Limburg, België, en daar doen we niet geheimzinnig over. We werken op afstand en reizen voor de momenten die ertoe doen: kickoff bij je op kantoor, de grote tussenstappen en de oplevering ook. Daartussen loopt het ritme via videocall — kort, wekelijks, met werkende schermen in plaats van statusrapporten. Amsterdam ligt op een paar uur rijden, dus langskomen is geen expeditie. In 17+ jaar leverden we zo 150+ projecten, voor opdrachtgevers van NMBS en BMW tot Nike en OpenAI.",
      ],
      faq: [
        {
          question: "Werken jullie vanuit België ook voor opdrachtgevers in Amsterdam?",
          answer:
            "Ja. Brisk zit in Limburg in België en werkt voor opdrachtgevers in heel Nederland, van Amsterdam en Amstelveen tot Alkmaar. We werken op afstand met een vast wekelijks videogesprek en reizen naar Noord-Holland voor de kickoff, de belangrijke tussenstappen en de oplevering.",
        },
        {
          question: "Bouwen jullie webshops die iDEAL ondersteunen?",
          answer:
            "Ja. iDEAL is in Nederland de standaard en zit standaard in de webshops die we voor Nederlandse opdrachtgevers bouwen, naast creditcard en de methodes die internationale klanten gebruiken. Verkoop je ook in België, dan zetten we Bancontact in dezelfde afrekenflow.",
        },
        {
          question: "Van wie zijn de code en het ontwerp na oplevering?",
          answer:
            "Van jou. Alles wat we maken is eigendom van de opdrachtgever: de code, het ontwerp en de content. Je zit dus niet aan ons vast om verder te bouwen, uit te breiden of te verhuizen naar een andere partij.",
        },
        {
          question: "Wat kost een eerste gesprek?",
          answer:
            "Niets. Een kennismaking duurt 30 minuten, gaat over wat je wil bereiken en wat dat technisch vraagt, en levert je een eerlijk beeld op van de aanpak. Op elke aanvraag reageren we binnen 24 uur.",
        },
      ],
    },
    en: {
      metaTitle: "Web, ecommerce and software agency in North Holland",
      metaDescription:
        "Custom websites, webshops, software and apps for companies in Amsterdam, Haarlem, Hilversum and Alkmaar. Belgian studio, 17+ years, reply within 24 hours.",
      h1: "A digital studio for companies in North Holland",
      lead: "North Holland moves fast: scale-ups in Amsterdam, broadcast and production in Hilversum, and trading firms that have been in Zaanstad and Hoorn for generations. We build custom websites, webshops, software and mobile apps for all three, from Limburg in Belgium.",
      localAngle: [
        "Amsterdam companies are not short of agencies. They usually have a brand guide, an opinion about type and a previous supplier already behind them. What tends to be missing is a site that survived the last two years of growth: an information architecture that still holds ten landing pages later, Dutch and English sitting side by side, and a front-end that does not break every time marketing ships a campaign. That is construction work, not a facelift.",
        "Twenty kilometres away the brief changes completely. Hilversum runs on picture and sound, so what matters is how quickly a page carrying video becomes usable and how easily an editorial team publishes without a developer. In Haarlem, Amstelveen, Alkmaar and Hoorn you find profitable businesses with a webshop bolted on years ago: stock that disagrees with the shop, a till system living apart from the site, orders retyped by hand. The gain there is in integrations and custom software, not in a new colour palette.",
        "We are based in Limburg, Belgium, and we say so upfront. We work remotely and travel for the moments that deserve a room: kickoff at your office, the decisive milestones, and delivery. In between, the rhythm is a short weekly video call with working screens rather than status reports. Amsterdam is a couple of hours away by road, so visiting is normal, not an expedition. That is how we delivered 150+ projects over 17+ years, for clients including NMBS, BMW, Nike and OpenAI.",
      ],
      faq: [
        {
          question: "Do you work for Amsterdam companies from Belgium?",
          answer:
            "Yes. Brisk is based in Limburg, Belgium, and works for clients across the Netherlands, from Amsterdam and Amstelveen up to Alkmaar. The working rhythm is remote with a fixed weekly video call, and we travel to North Holland for kickoff, the major milestones and delivery.",
        },
        {
          question: "Do your webshops support iDEAL?",
          answer:
            "Yes. iDEAL is the default payment method in the Netherlands, so it is part of every webshop we build for Dutch clients, alongside cards and the methods international buyers expect. If you also sell into Belgium, we add Bancontact to the same checkout.",
        },
        {
          question: "Who owns the code and the design after launch?",
          answer:
            "You do. Everything we produce belongs to the client: the code, the design and the content. You are never locked into us to extend the product, hire another team or move it elsewhere.",
        },
        {
          question: "What does a first conversation cost?",
          answer:
            "Nothing. The intro call takes 30 minutes, covers what you want to achieve and what that asks technically, and gives you an honest read on the approach. We reply to every enquiry within 24 hours.",
        },
      ],
    },
  },

  /* ----------------------------- Zuid-Holland ---------------------------- */
  "zuid-holland": {
    nl: {
      metaTitle: "Webdesign en software in Zuid-Holland",
      metaDescription:
        "Websites, webshops, portalen en apps voor bedrijven en organisaties in Rotterdam, Den Haag, Leiden en Delft. 150+ projecten, antwoord binnen 24 uur.",
      h1: "Websites, webshops en software voor Zuid-Holland",
      lead: "Zuid-Holland is eigenlijk drie economieën in één provincie: de haven van Rotterdam, het bestuurlijke Den Haag en de life sciences rond Leiden en Delft. Wie hier bouwt, bouwt zelden hetzelfde ding twee keer — en dat is precies het soort werk waar wij op zitten.",
      localAngle: [
        "Rotterdam denkt in stromen, niet in pagina's. Expediteurs, terminals, toeleveranciers en verwerkers hebben minder een brochure nodig dan een plek waar een klant zelf zijn zending, order of dossier terugvindt. Dat wordt zelden een standaardpakket: het wordt software op maat die praat met het systeem dat er al staat, met inlog, rechten en een schermontwerp dat ook werkt voor iemand die het de hele dag gebruikt. Rond Dordrecht en Gouda zie je dezelfde behoefte bij maakbedrijven die hun dealers en installateurs willen bedienen.",
        "In Den Haag is het publiek anders: ministeries, koepels, brancheorganisaties en de dienstverleners eromheen. Daar telt zorgvuldigheid — toegankelijkheid, meertaligheid, teksten die door meerdere handen gaan voordat ze live mogen. Wij hebben dat soort trajecten gedaan voor grote publieke organisaties in België, onder meer voor NMBS, De Watergroep en museumPASSmusées, en die manier van werken vertaalt zich rechtstreeks naar Zoetermeer of Den Haag. In Leiden en Delft draait het weer om iets anders: wetenschap uitleggen aan investeerders, partners en talent zonder het plat te slaan.",
        "Wij werken vanuit Limburg in België. Concreet betekent dat: videocall voor het wekelijkse ritme, de trein of de auto voor de kickoff en de oplevering. Voor een organisatie in Rotterdam of Leiden is dat vaak praktischer dan het klinkt, omdat de beslissingen die er echt toe doen op een handvol dagen vallen en de rest gewoon voortgang is. Je krijgt binnen 24 uur antwoord, een gratis kennismaking van 30 minuten, en aan het einde de volledige eigendom van code en ontwerp.",
      ],
      faq: [
        {
          question: "Hebben jullie ervaring met grote, publieke organisaties?",
          answer:
            "Ja. Brisk werkte onder meer voor NMBS, De Watergroep, IDEWE, de Belgische voetbalbond en museumPASSmusées — organisaties met veel interne betrokkenen, strenge eisen en een groot publiek. Dat is dezelfde manier van werken die een opdrachtgever in Den Haag of Zoetermeer nodig heeft.",
        },
        {
          question: "Bouwen jullie ook klantportalen en interne software?",
          answer:
            "Ja. Naast websites en webshops bouwen we software op maat: klantportalen, planningstools, dashboards en koppelingen met bestaande systemen. Voor logistieke en industriële bedrijven rond Rotterdam en Dordrecht is dat vaak het onderdeel dat het meeste tijd bespaart.",
        },
        {
          question: "Hoe verloopt facturatie en btw voor een Nederlandse opdrachtgever?",
          answer:
            "We factureren in euro's vanuit België. Voor Nederlandse bedrijven die btw-plichtig zijn, wordt de btw verlegd naar de afnemer volgens de gebruikelijke Europese regeling voor diensten tussen bedrijven in verschillende EU-landen. Je boekhouder herkent die factuur meteen.",
        },
        {
          question: "Komen jullie langs in Rotterdam of Leiden?",
          answer:
            "Ja. We werken op afstand, maar we reizen naar Zuid-Holland voor de kickoff, de belangrijke ontwerpbeslissingen en de oplevering. De wekelijkse voortgang doen we via videocall, zodat de reisdagen naar de gesprekken gaan die er echt toe doen.",
        },
      ],
    },
    en: {
      metaTitle: "Web and software agency for South Holland",
      metaDescription:
        "Websites, webshops, portals and apps for organisations in Rotterdam, The Hague, Leiden and Delft. 150+ projects delivered, reply within 24 hours.",
      h1: "Websites, webshops and software for South Holland",
      lead: "South Holland is really three economies in one province: the port of Rotterdam, government and institutions in The Hague, and life sciences around Leiden and Delft. Very little of the work here repeats itself, which is exactly the kind of brief we take.",
      localAngle: [
        "Rotterdam thinks in flows rather than pages. Forwarders, terminals, suppliers and processors rarely need a brochure; they need a place where a customer can look up their own shipment, order or file. That seldom becomes an off-the-shelf product. It becomes custom software that talks to the systems already in place, with logins, permissions and screens designed for someone who lives in them all day. Around Dordrecht and Gouda, manufacturers ask for the same thing to serve dealers and installers.",
        "The Hague brings a different audience: ministries, federations, trade bodies and the consultancies orbiting them. Care is the currency there — accessibility, multiple languages, copy that passes several desks before it may go live. We have run that kind of project for large public-facing organisations in Belgium, among them NMBS, De Watergroep and museumPASSmusées, and the working method carries straight over to Zoetermeer or The Hague. Leiden and Delft ask for something else again: explaining science to investors, partners and future hires without flattening it.",
        "We work from Limburg in Belgium. In practice that means video calls for the weekly rhythm and a train or a car for kickoff and delivery. For a client in Rotterdam or Leiden that is usually more workable than it sounds, because the decisions that genuinely need a room happen on a handful of days and the rest is progress. You get a reply within 24 hours, a free 30-minute intro call, and full ownership of the code and design at the end.",
      ],
      faq: [
        {
          question: "Have you worked with large public organisations?",
          answer:
            "Yes. Brisk has delivered work for NMBS, De Watergroep, IDEWE, the Belgian FA and museumPASSmusées — organisations with many internal stakeholders, strict requirements and a large public audience. That is the same discipline a client in The Hague or Zoetermeer needs.",
        },
        {
          question: "Do you build customer portals and internal software as well?",
          answer:
            "Yes. Alongside websites and webshops we build custom software: customer portals, planning tools, dashboards and integrations with the systems a company already runs. For logistics and industrial businesses around Rotterdam and Dordrecht, that is usually the part that saves the most time.",
        },
        {
          question: "How does invoicing and VAT work for a Dutch client?",
          answer:
            "We invoice in euros from Belgium. For VAT-registered Dutch businesses the VAT is reverse-charged to you under the standard EU rules for cross-border business services, so your accountant will recognise the invoice immediately.",
        },
        {
          question: "Will you come to Rotterdam or Leiden in person?",
          answer:
            "Yes. We work remotely, but we travel to South Holland for kickoff, the significant design decisions and delivery. Weekly progress runs over video, which keeps the travel days for the conversations that actually benefit from a room.",
        },
      ],
    },
  },

  /* -------------------------------- Utrecht ------------------------------ */
  utrecht: {
    nl: {
      metaTitle: "Website, webshop en software laten maken in Utrecht",
      metaDescription:
        "Digitaal bureau voor dienstverleners, zorg en ICT in Utrecht, Amersfoort, Veenendaal en Zeist. Maatwerk in websites, webshops, software en apps.",
      h1: "Digitaal maatwerk voor bedrijven in de provincie Utrecht",
      lead: "Utrecht ligt in het midden van het land en dat zie je terug in wie er zit: adviesbureaus, zorgorganisaties, ICT-dienstverleners en een dichte laag mkb en zzp'ers die van hun kennis leven. Wij maken voor die bedrijven websites en webshops, en vaker nog de software of app die het werk erachter overneemt.",
      localAngle: [
        "Bij een dienstverlener is de website zelden het probleem en meestal het symptoom. Wat er echt knelt zit in het werk erachter: offertes die in Word ontstaan, uren die in drie spreadsheets staan, een intakeformulier waarvan de antwoorden per mail binnenkomen en met de hand worden overgetikt. In Utrecht, Amersfoort en Nieuwegein hebben we het daarom vaker over software op maat dan over pagina's: één plek waar aanvraag, dossier en facturatie samenkomen, met een site ervoor die het verhaal helder vertelt.",
        "Zorg vraagt om nog iets anders. Wie met patiënt- of cliëntgegevens werkt, moet kunnen uitleggen waar data staat, wie erbij kan en wat er gelogd wordt — dat hoort in het ontwerp thuis, niet in een bijlage achteraf. We deden dat soort werk in België voor IDEWE, een organisatie in arbeidsgeneeskunde en preventie. In Veenendaal, Zeist en Houten zien we daarnaast veel handelsbedrijven met een B2B-webshop waar prijsafspraken per klant verschillen; dat is precies het punt waarop een standaardpakket ophoudt en maatwerk begint.",
        "Utrecht is het makkelijkste punt van Nederland om af te spreken, en dat gebruiken we ook zo: als er een dag ter plaatse nodig is, plannen we die daar. Verder werken we op afstand vanuit Limburg in België — wekelijks videocall voor de voortgang, ter plaatse voor de kickoff en de oplevering. Je krijgt binnen 24 uur antwoord op je aanvraag en de eerste 30 minuten kosten je niets.",
      ],
      faq: [
        {
          question: "Vervangen jullie ook interne spreadsheets door software op maat?",
          answer:
            "Ja, dat is een groot deel van ons werk. We bouwen software op maat die een proces overneemt dat nu in spreadsheets en mailboxen leeft: aanvragen, dossiers, planning, urenregistratie of rapportage. We beginnen met het proces zoals het echt loopt, niet met een pakket waar je je naar moet plooien.",
        },
        {
          question: "Kunnen jullie rekening houden met privacy en AVG?",
          answer:
            "Ja. Waar data staat, wie erbij kan en wat er wordt gelogd, bepalen we samen met jou aan het begin van het project en niet achteraf. Voor zorg- en dienstverlenende organisaties in Utrecht is dat meestal een van de eerste ontwerpbeslissingen, niet een afsluitende checklist.",
        },
        {
          question: "Kunnen we in Utrecht afspreken in plaats van in België?",
          answer:
            "Ja. Voor de kickoff, de belangrijke ontwerpsessies en de oplevering komen we naar je toe, en Utrecht is voor de meeste teams het eenvoudigste punt om samen te komen. De wekelijkse voortgang loopt via videocall, zodat het project blijft doorlopen tussen die dagen door.",
        },
        {
          question: "Hoe snel krijg ik antwoord als ik contact opneem?",
          answer:
            "Binnen 24 uur. Daarna plannen we een gratis kennismaking van 30 minuten waarin we doornemen wat je wil bereiken, wat er technisch voor nodig is en of wij daar de juiste partij voor zijn.",
        },
      ],
    },
    en: {
      metaTitle: "Website, webshop and software development in Utrecht",
      metaDescription:
        "Digital studio for consultancies, healthcare and IT firms in Utrecht, Amersfoort, Veenendaal and Zeist. Custom websites, webshops, software and apps.",
      h1: "Custom digital work for businesses in Utrecht province",
      lead: "Utrecht sits in the middle of the country, and its business base reflects that: consultancies, healthcare organisations, IT service providers and a dense layer of small firms and freelancers selling expertise. We build custom websites and webshops for them, and just as often the software or app running behind the scenes.",
      localAngle: [
        "For a professional services firm the website is rarely the problem — it is the symptom. The friction lives behind it: proposals assembled in Word, hours tracked across three spreadsheets, an intake form whose answers arrive by email and get retyped by hand. So in Utrecht, Amersfoort and Nieuwegein the conversation is more often about custom software than about pages: one place where the enquiry, the case file and the invoicing meet, with a site in front of it that explains the offer clearly.",
        "Healthcare asks for something else again. Anyone handling patient or client data has to be able to say where it lives, who can reach it and what gets logged — and that belongs in the design, not in an appendix written afterwards. We have done that kind of work in Belgium for IDEWE, an occupational health and prevention organisation. Around Veenendaal, Zeist and Houten we also meet distributors running B2B webshops where pricing differs per customer, which is exactly where an off-the-shelf platform stops and custom work starts.",
        "Utrecht is the easiest place in the country to meet, and we use it that way: when a day in person is needed, we book it there. The rest of the time we work remotely from Limburg in Belgium — a weekly video call for progress, on site for kickoff and delivery. Enquiries get an answer within 24 hours, and the first 30 minutes cost nothing.",
      ],
      faq: [
        {
          question: "Can you replace internal spreadsheets with custom software?",
          answer:
            "Yes, that is a large part of what we do. We build custom software that takes over a process currently living in spreadsheets and inboxes: intake, case files, planning, time tracking or reporting. We start from how the process actually runs rather than from a product you have to bend around.",
        },
        {
          question: "Can you take privacy and GDPR requirements into account?",
          answer:
            "Yes. Where data is stored, who can reach it and what gets logged are decided with you at the start of the project rather than bolted on at the end. For healthcare and professional services clients in Utrecht that is usually one of the first design decisions, not a closing checklist.",
        },
        {
          question: "Can we meet in Utrecht rather than in Belgium?",
          answer:
            "Yes. We travel to you for kickoff, the significant design sessions and delivery, and Utrecht is the simplest meeting point for most teams. Weekly progress runs over video so the project keeps moving between those days.",
        },
        {
          question: "How quickly do you respond to an enquiry?",
          answer:
            "Within 24 hours. After that we schedule a free 30-minute intro call to go through what you want to achieve, what it takes technically, and whether we are the right team for it.",
        },
      ],
    },
  },

  /* ----------------------------- Noord-Brabant --------------------------- */
  "noord-brabant": {
    nl: {
      metaTitle: "Website en software laten bouwen in Noord-Brabant",
      metaDescription:
        "Maatwerk voor hightech en maakindustrie in Eindhoven, Tilburg, Breda en Helmond: websites, B2B-webshops, software en apps. 17+ jaar ervaring.",
      h1: "Voor techbedrijven en makers in Noord-Brabant",
      lead: "In Noord-Brabant zitten je gesprekspartners vaker aan de technische kant van de tafel: hightech rond Eindhoven en Helmond, maakindustrie en logistiek in Tilburg, Breda en Roosendaal, agrofood rond Oss. Wij bouwen daarvoor websites, webshops, software op maat en mobiele apps.",
      localAngle: [
        "Een technisch bedrijf koopt geen presentatie, het beoordeelt een bouwwerk. Dat maakt Brabant een prettige provincie om in te werken: de vragen gaan over datamodellen, over hoe een configurator omgaat met varianten, over wat er gebeurt als de PIM twintigduizend artikelen doorstuurt. Voor machinebouwers en toeleveranciers in Eindhoven en Helmond is de site zelden alleen marketing — hij moet specificaties, documentatie en aanvragen dragen zonder dat iemand elke week handmatig moet bijwerken.",
        "In Tilburg, Breda, Roosendaal en 's-Hertogenbosch is het beeld industrieel en commercieel tegelijk. Distributie en groothandel willen een B2B-webshop waarin klantspecifieke prijzen, staffels, kredietlimieten en bestelgeschiedenis kloppen — met iDEAL voor de kleinere afnemers en factuur voor de vaste. Op de vloer zelf is het vaak een mobiele app die het verschil maakt: orders scannen, storingen melden, een monteur die zijn werkbon afsluit voordat hij in de bus stapt.",
        "Brabant ligt tegen de Belgische grens aan, en dat is voor ons meer dan aardrijkskunde. Veel bedrijven hier verkopen aan beide kanten van die grens, en dan is één bureau dat de Nederlandse én de Belgische conventies kent gewoon minder gedoe: iDEAL naast Bancontact, Nederlands dat als Nederlands leest en niet als vertaald Vlaams. Wij zitten in Limburg, België, werken op afstand en komen naar Eindhoven of Breda voor de kickoff en de oplevering.",
      ],
      faq: [
        {
          question: "Kunnen jullie koppelen met ons ERP of PIM?",
          answer:
            "Ja. Voor productiebedrijven en groothandels in Noord-Brabant is de koppeling meestal het hart van het project: artikelen, voorraad, prijzen en orders komen uit het systeem dat je al gebruikt en de site of webshop is het venster erop. We ontwerpen die koppeling aan het begin, niet als sluitstuk.",
        },
        {
          question: "Bouwen jullie B2B-webshops met klantspecifieke prijzen?",
          answer:
            "Ja. Een B2B-webshop met prijsafspraken per klant, staffels, bestelgeschiedenis en betaling op factuur is maatwerk, en dat is wat we bouwen. iDEAL zit erin voor de afnemers die direct afrekenen, Bancontact als je ook Belgische klanten bedient.",
        },
        {
          question: "Werken jullie ook aan mobiele apps voor gebruik op de werkvloer?",
          answer:
            "Ja. Naast websites en software bouwen we mobiele apps, ook voor intern gebruik: scannen, werkbonnen, meldingen en inspecties op locatie. Die apps ontwerpen we voor mensen met handschoenen en haast, niet voor een demo op een groot scherm.",
        },
        {
          question: "Jullie zitten in België — is dat een probleem voor een Brabants bedrijf?",
          answer:
            "In de praktijk is het vaker een voordeel. Brisk zit in Belgisch Limburg, op rijafstand van Eindhoven en Breda, en veel Brabantse bedrijven verkopen zelf ook in België. Eén team dat beide markten kent scheelt een tweede bureau, en we komen langs voor de kickoff, de belangrijke beslissingen en de oplevering.",
        },
      ],
    },
    en: {
      metaTitle: "Web and software development in North Brabant",
      metaDescription:
        "Custom work for high tech and manufacturing in Eindhoven, Tilburg, Breda and Helmond: websites, B2B webshops, software and apps. 17+ years of it.",
      h1: "For technology companies and manufacturers in North Brabant",
      lead: "In North Brabant the people across the table are usually engineers: high tech around Eindhoven and Helmond, manufacturing and logistics in Tilburg, Breda and Roosendaal, agri-food around Oss. We build websites, webshops, custom software and mobile apps for them.",
      localAngle: [
        "A technical company does not buy a presentation; it inspects a build. That makes Brabant a good province to work in. The questions are about data models, about how a product configurator handles variants, about what happens when the PIM pushes twenty thousand articles at once. For machine builders and suppliers in Eindhoven and Helmond the website is rarely marketing alone — it has to carry specifications, documentation and enquiries without someone updating it by hand every week.",
        "Tilburg, Breda, Roosendaal and 's-Hertogenbosch are industrial and commercial at the same time. Distributors and wholesalers want a B2B webshop where customer-specific pricing, volume breaks, credit limits and order history are all correct — iDEAL for smaller buyers, invoicing for the regulars. On the shop floor it is often a mobile app that changes the day: scanning orders, reporting faults, a technician closing a job sheet before getting back in the van.",
        "Brabant sits against the Belgian border, and for us that is more than geography. Plenty of companies here sell on both sides of it, and one studio that knows Dutch and Belgian conventions is simply less friction: iDEAL next to Bancontact, Dutch copy that reads as Dutch rather than as translated Flemish. We are based in Limburg, Belgium, work remotely, and come to Eindhoven or Breda for kickoff and delivery.",
      ],
      faq: [
        {
          question: "Can you integrate with our ERP or PIM?",
          answer:
            "Yes. For manufacturers and wholesalers in North Brabant the integration is usually the heart of the project: articles, stock, pricing and orders come from the system you already run, and the site or webshop is the window onto it. We design that integration at the start rather than treating it as the last step.",
        },
        {
          question: "Do you build B2B webshops with customer-specific pricing?",
          answer:
            "Yes. A B2B webshop with per-customer agreements, volume breaks, order history and payment on invoice is custom work, and that is what we build. iDEAL is included for buyers who pay immediately, and Bancontact when you also serve Belgian customers.",
        },
        {
          question: "Do you build mobile apps for use on the shop floor?",
          answer:
            "Yes. Alongside websites and software we build mobile apps, including internal ones: scanning, job sheets, fault reports and on-site inspections. We design those for people wearing gloves and in a hurry, not for a demo on a large screen.",
        },
        {
          question: "You are based in Belgium — is that a problem for a Brabant company?",
          answer:
            "In practice it is more often an advantage. Brisk is in Belgian Limburg, a drive from Eindhoven and Breda, and many Brabant companies sell into Belgium themselves. One team that knows both markets saves you a second agency, and we travel over for kickoff, the key decisions and delivery.",
        },
      ],
    },
  },

  /* ------------------------------ Gelderland ----------------------------- */
  gelderland: {
    nl: {
      metaTitle: "Website of software laten maken in Gelderland",
      metaDescription:
        "Websites, webshops, software en apps voor bedrijven in Nijmegen, Arnhem, Apeldoorn, Ede en de Achterhoek. Maatwerk, 150+ projecten, snel antwoord.",
      h1: "Digitaal werk voor ondernemers in Gelderland",
      lead: "Gelderland heeft geen enkel centrum en dat maakt het interessant: zorg en technologie in Nijmegen, energie en creatieve bedrijven in Arnhem, dienstverleners in Apeldoorn, food rond Ede en Wageningen, en een taaie maakindustrie in de Achterhoek. Wij bouwen voor die bedrijven websites, webshops, software en apps op maat.",
      localAngle: [
        "In de Achterhoek — Doetinchem, Zutphen en de dorpen daaromheen — zitten familiebedrijven die al decennia machines, onderdelen en installaties leveren. Hun uitdaging is zelden merkgevoel; het is bereikbaarheid. Dealers en installateurs willen tekeningen, onderdelenlijsten en levertijden zonder te bellen, en dat betekent een besloten omgeving naast de publieke site, met de artikeldata uit het eigen systeem. Dat scheelt meer telefoontjes dan welke campagne ook.",
        "Rond Arnhem en Nijmegen ziet het er anders uit. Energie- en zorgorganisaties werken met projecten die jaren lopen en met publiek dat mee wil kijken; daar helpt een site die uitlegt wat er gebeurt en die zonder ontwikkelaar bij te werken is. In Ede, Wageningen en Harderwijk draait het weer om voedsel en onderzoek: veel kennis, veel cijfers, en de opgave om dat begrijpelijk te maken voor afnemers, partners en toekomstige collega's zonder het te versimpelen.",
        "Omdat Gelderland breed is, plannen we reisdagen bewust. De kickoff en de oplevering doen we ter plaatse — in Apeldoorn, Nijmegen of Doetinchem, waar het team zit. Tussendoor werken we op afstand vanuit Limburg in België, met een kort wekelijks videogesprek waarin je werkende schermen ziet in plaats van een voortgangsdocument. Binnen 24 uur antwoord, een gratis kennismaking van 30 minuten, en na oplevering zijn code en ontwerp van jou.",
      ],
      faq: [
        {
          question: "Kunnen jullie een besloten omgeving voor dealers en installateurs bouwen?",
          answer:
            "Ja. Een besloten portaal naast de publieke website — met inlog, rechten per gebruiker, documentatie, onderdelenlijsten en bestelmogelijkheid — is software op maat, en dat is wat we bouwen. Voor maakbedrijven in de Achterhoek is dat vaak het onderdeel dat de meeste telefoontjes wegneemt.",
        },
        {
          question: "Werken jullie ook voor bedrijven met meerdere vestigingen?",
          answer:
            "Ja. We bouwen sites en software waarin meerdere vestigingen, teams of merken naast elkaar bestaan zonder dat je alles dubbel moet onderhouden, bijvoorbeeld voor organisaties met locaties in Arnhem, Nijmegen en Apeldoorn tegelijk.",
        },
        {
          question: "Reizen jullie naar Gelderland voor overleg?",
          answer:
            "Ja. We werken vanuit Belgisch Limburg op afstand, maar komen naar je toe voor de kickoff, de grote ontwerpbeslissingen en de oplevering, of dat nu in Ede, Zutphen of Doetinchem is. De wekelijkse voortgang loopt via videocall.",
        },
        {
          question: "Wat gebeurt er met het project als we later met iemand anders verder willen?",
          answer:
            "Dan kan dat. De code, het ontwerp en de content zijn eigendom van de opdrachtgever, dus je kunt het werk overdragen aan een intern team of een ander bureau zonder dat je iets moet loskopen.",
        },
      ],
    },
    en: {
      metaTitle: "Website and software development in Gelderland",
      metaDescription:
        "Websites, webshops, software and apps for companies in Nijmegen, Arnhem, Apeldoorn, Ede and the Achterhoek. Custom built, 150+ projects delivered.",
      h1: "Digital work for businesses across Gelderland",
      lead: "Gelderland has no single centre, which is what makes it interesting: healthcare and technology in Nijmegen, energy and creative firms in Arnhem, service businesses in Apeldoorn, food research around Ede, and a stubbornly good manufacturing base in the Achterhoek. We build custom websites, webshops, software and apps for all of it.",
      localAngle: [
        "In the Achterhoek — Doetinchem, Zutphen and the towns around them — you find family firms that have been supplying machines, parts and installations for decades. Their problem is rarely brand feeling; it is availability. Dealers and installers want drawings, parts lists and lead times without picking up the phone, which means a private area alongside the public site, fed with article data from the company's own system. That removes more calls than any campaign.",
        "Arnhem and Nijmegen look different. Energy and healthcare organisations run projects that last years and audiences that want to follow along, so the site has to explain what is happening and stay editable without a developer. Around Ede, Wageningen and Harderwijk it is food and research: a lot of knowledge, a lot of figures, and the job of making that legible to buyers, partners and future colleagues without dumbing it down.",
        "Because Gelderland is spread out, we plan travel days deliberately. Kickoff and delivery happen where your team is — Apeldoorn, Nijmegen, Doetinchem. In between we work remotely from Limburg in Belgium, with a short weekly video call where you see working screens instead of a progress document. A reply within 24 hours, a free 30-minute intro call, and code and design that belong to you once it ships.",
      ],
      faq: [
        {
          question: "Can you build a private area for dealers and installers?",
          answer:
            "Yes. A private portal alongside the public website — logins, per-user permissions, documentation, parts lists and ordering — is custom software, and that is what we build. For manufacturers in the Achterhoek it is often the piece that removes the most phone calls.",
        },
        {
          question: "Do you work with companies that have several locations?",
          answer:
            "Yes. We build sites and software where multiple locations, teams or brands coexist without doubling the maintenance, for example an organisation running sites in Arnhem, Nijmegen and Apeldoorn at once.",
        },
        {
          question: "Do you travel to Gelderland for meetings?",
          answer:
            "Yes. We work remotely from Belgian Limburg but come to you for kickoff, the major design decisions and delivery, whether that is Ede, Zutphen or Doetinchem. Weekly progress runs over video.",
        },
        {
          question: "What happens if we later want to continue with someone else?",
          answer:
            "That is entirely possible. The code, the design and the content belong to the client, so you can hand the work to an in-house team or another agency without buying anything back from us.",
        },
      ],
    },
  },

  /* ------------------------------ Overijssel ----------------------------- */
  overijssel: {
    nl: {
      metaTitle: "Webdesign en software voor Overijssel en Twente",
      metaDescription:
        "Websites, webshops, software en apps voor technische bedrijven in Enschede, Hengelo, Almelo, Zwolle en Deventer. Meertalig, gekoppeld, op maat.",
      h1: "Voor technische bedrijven in Overijssel en Twente",
      lead: "Twente maakt dingen: machines, onderdelen, meetapparatuur, componenten die ergens diep in een groter systeem verdwijnen. Rond Zwolle zit een heel andere economie van zorg, logistiek en dienstverlening. Wij bouwen voor beide websites, webshops, software op maat en mobiele apps.",
      localAngle: [
        "Bedrijven in Enschede, Hengelo en Almelo verkopen zelden alleen in Nederland. Duitsland ligt om de hoek en de rest van Europa volgt kort daarna, dus een site is hier bijna altijd meertalig — en meertalig betekent meer dan een vlaggetje rechtsboven. Het gaat over vertaalde artikelnamen, over documenten per markt, over een structuur waarin je een taal kunt bijzetten zonder dat de hele boel opnieuw moet. Dat is een keuze die je aan het begin maakt of drie jaar later duur betaalt.",
        "De tweede vraag in Twente is bijna altijd techniek achter de schermen: productdata die uit een intern systeem komt, een configurator die alleen geldige combinaties toont, documentatie die per serienummer verschilt. En als er buitendienst is, komt daar een app bij — voor de monteur die op locatie een installatie oplevert. Rond Zwolle, Deventer en Kampen gaat het vaker over volume en planning: zorgorganisaties en logistieke bedrijven die een portaal willen waar klanten en medewerkers zelf hun ding regelen.",
        "Wij werken vanuit Limburg in België. Voor Overijssel betekent dat een echte rit, dus we zijn er eerlijk over hoe we het inrichten: videocall voor het wekelijkse ritme, ter plaatse voor de kickoff en de oplevering, en tussendoor wanneer een beslissing dat verdient. Dat werkt, mits het ritme strak is — daarom is dat wekelijkse gesprek geen formaliteit maar de plek waar je meekijkt naar wat er staat.",
      ],
      faq: [
        {
          question: "Bouwen jullie meertalige sites, ook voor de Duitse markt?",
          answer:
            "Ja. We bouwen sites en webshops waarin meerdere talen naast elkaar bestaan, inclusief vertaalde productdata, documenten en URL's per markt. Voor exporterende bedrijven in Twente zetten we die structuur meteen goed neer, zodat een extra taal later geen verbouwing wordt.",
        },
        {
          question: "Kunnen jullie een app bouwen voor onze buitendienst?",
          answer:
            "Ja. We bouwen mobiele apps, ook voor technici op locatie: werkbonnen, checklists, foto's, handtekeningen en installaties die achteraf terug te vinden zijn. Die app koppelen we aan de systemen die op kantoor al draaien.",
        },
        {
          question: "Hoe houden jullie een project op afstand op koers?",
          answer:
            "Met een vast wekelijks videogesprek waarin we werkende schermen tonen in plaats van een statusrapport, en met korte lijnen daartussen. Voor de kickoff, de belangrijke ontwerpbeslissingen en de oplevering reizen we naar Enschede, Zwolle of waar je team zit.",
        },
        {
          question: "Hoe werkt facturatie tussen een Belgisch bureau en een Nederlands bedrijf?",
          answer:
            "We factureren in euro's vanuit België. Ben je in Nederland btw-plichtig, dan wordt de btw verlegd volgens de standaard Europese regeling voor diensten tussen bedrijven in verschillende EU-landen, zodat er geen Belgische btw op je factuur staat.",
        },
      ],
    },
    en: {
      metaTitle: "Web and software development in Overijssel and Twente",
      metaDescription:
        "Websites, webshops, software and apps for engineering firms in Enschede, Hengelo, Almelo, Zwolle and Deventer. Multilingual, integrated, custom built.",
      h1: "For engineering companies in Overijssel and Twente",
      lead: "Twente makes things: machines, components, measuring equipment, parts that end up buried inside a larger system. Around Zwolle sits a different economy of healthcare, logistics and services. We build custom websites, webshops, software and mobile apps for both.",
      localAngle: [
        "Companies in Enschede, Hengelo and Almelo rarely sell only in the Netherlands. Germany is next door and the rest of Europe follows quickly, so a site here is almost always multilingual — and multilingual means far more than a flag in the corner. It means translated article names, documents that differ per market, and a structure where adding a language does not mean rebuilding. That is a decision you make at the start or pay for three years later.",
        "The second question in Twente is nearly always what happens behind the screen: product data pulled from an internal system, a configurator that only offers valid combinations, documentation that differs per serial number. Where there is a field service team, an app joins the project for the technician commissioning an installation on site. Around Zwolle, Deventer and Kampen the theme shifts to volume and planning: healthcare and logistics organisations wanting a portal where customers and staff arrange things themselves.",
        "We work from Limburg in Belgium. For Overijssel that is a genuine drive, so we are straight about how we handle it: video for the weekly rhythm, on site for kickoff and delivery, and in between whenever a decision earns the journey. It works as long as the rhythm is tight, which is why that weekly call is not a formality but the place where you look at what actually exists.",
      ],
      faq: [
        {
          question: "Do you build multilingual sites, including for the German market?",
          answer:
            "Yes. We build sites and webshops where several languages coexist, including translated product data, per-market documents and URLs. For exporters in Twente we set that structure up correctly from the start, so adding a language later is not a rebuild.",
        },
        {
          question: "Can you build an app for our field service team?",
          answer:
            "Yes. We build mobile apps, including tools for technicians on site: job sheets, checklists, photos, signatures and installation records that stay findable afterwards. We connect that app to the systems already running at the office.",
        },
        {
          question: "How do you keep a remote project on track?",
          answer:
            "With a fixed weekly video call that shows working screens rather than a status report, and short lines in between. For kickoff, the significant design decisions and delivery we travel to Enschede, Zwolle or wherever your team sits.",
        },
        {
          question: "How does invoicing work between a Belgian studio and a Dutch company?",
          answer:
            "We invoice in euros from Belgium. If you are VAT-registered in the Netherlands, the VAT is reverse-charged under the standard EU rules for cross-border business services, so no Belgian VAT appears on your invoice.",
        },
      ],
    },
  },

  /* ------------------------------ Limburg (NL) --------------------------- */
  "limburg-nl": {
    nl: {
      metaTitle: "Website laten maken in Limburg (NL)",
      metaDescription:
        "Websites, webshops, software en apps voor bedrijven in Maastricht, Venlo, Sittard-Geleen, Heerlen en Roermond. Grensoverschrijdend, in NL, BE en DE.",
      h1: "Digitaal bureau voor Nederlands Limburg",
      lead: "Nederlands Limburg is de provincie waar de grens dagelijkse praktijk is: klanten in Duitsland, leveranciers in België, personeel dat uit drie landen komt. Wij zitten in Belgisch Limburg — letterlijk de buurprovincie — en bouwen websites, webshops, software en apps op maat.",
      localAngle: [
        "Van alle Nederlandse provincies is dit de plek waar onze eigen ligging het meest concreet wordt. Genk en Hasselt liggen op een half uur van Maastricht en Sittard-Geleen; naar Venlo, Roermond of Weert is het net zo goed te doen. Dat betekent dat langskomen hier geen planningsoefening is: als een ontwerpsessie beter aan tafel gaat, gaat hij aan tafel. De rest van het ritme loopt via videocall, want dat houdt een project sneller in beweging dan een reisdag per week.",
        "Grensverkeer maakt het werk ook inhoudelijk anders. Een webshop in Roermond of Heerlen verkoopt aan Nederlandse, Belgische en Duitse klanten in dezelfde week, en die verwachten alle drie hun eigen betaalmethode: iDEAL is in Nederland de standaard, Bancontact hoort erbij zodra je Belgische klanten hebt, en de Duitse kant kijkt weer anders. Datzelfde geldt voor taal, levertijden en retourvoorwaarden. Dat zijn geen details, dat is het verschil tussen een afgebroken en een afgeronde bestelling.",
        "Daarnaast is dit een provincie met zwaar spul: logistiek rond Venlo, chemie en materialen op Chemelot bij Sittard-Geleen, zorg en dienstverlening rond Heerlen en Maastricht. Zulke bedrijven hebben zelden genoeg aan een site alleen — er hoort software op maat bij die praat met wat er al draait, of een app voor mensen die niet achter een bureau zitten. Wij doen dat werk al 17+ jaar, voor 150+ projecten, met code en ontwerp die na oplevering van jou zijn.",
      ],
      faq: [
        {
          question: "Hoe dichtbij zitten jullie eigenlijk?",
          answer:
            "Brisk zit in Belgisch Limburg, de buurprovincie. Vanaf onze kant van de grens is Maastricht, Sittard-Geleen of Roermond een korte rit, en Venlo en Weert liggen even gunstig. Van alle Nederlandse provincies is dit degene waar we het snelst aan tafel zitten.",
        },
        {
          question: "Kunnen jullie een webshop bouwen voor klanten in Nederland, België en Duitsland?",
          answer:
            "Ja. We bouwen webshops die meerdere landen tegelijk bedienen, met iDEAL voor Nederlandse klanten, Bancontact voor Belgische, en per land de juiste taal, verzendkosten en voorwaarden. Dat wordt in het ontwerp meegenomen en niet achteraf aangeplakt.",
        },
        {
          question: "Werken jullie in het Nederlands of in het Vlaams?",
          answer:
            "We schrijven Nederlands voor Nederland en Vlaams-Nederlands voor België, en houden die twee bewust uit elkaar. Een Nederlandse lezer hoort een Belgische woordkeuze meteen, dus teksten voor Limburgse opdrachtgevers schrijven we in de taal die daar normaal klinkt.",
        },
        {
          question: "Kunnen jullie tegelijk onze Belgische en Nederlandse markt bedienen?",
          answer:
            "Ja, en dat is precies waarom bedrijven in deze regio bij ons uitkomen. Eén team bouwt dan beide kanten van je verhaal, met dezelfde codebase en dezelfde ontwerptaal, maar met de betaalmethodes, tone of voice en juridische teksten die per land verschillen.",
        },
      ],
    },
    en: {
      metaTitle: "Web, ecommerce and app development in Limburg (NL)",
      metaDescription:
        "Custom websites, webshops, software and apps for companies in Maastricht, Venlo, Sittard-Geleen, Heerlen and Roermond. Built for cross-border trade.",
      h1: "A digital studio for Dutch Limburg",
      lead: "Dutch Limburg is where the border is a daily fact: customers in Germany, suppliers in Belgium, staff commuting from three countries. We are based in Belgian Limburg — the province next door — and build custom websites, webshops, software and apps.",
      localAngle: [
        "Of all twelve Dutch provinces, this is the one where our own location stops being a footnote. Genk and Hasselt are half an hour from Maastricht and Sittard-Geleen, and Venlo, Roermond and Weert are comfortably in range. Visiting is not a logistics exercise here: if a design session goes better around a table, it happens around a table. The rest of the rhythm runs over video, because that keeps a project moving faster than one travel day a week ever does.",
        "Cross-border trade also changes the work itself. A webshop in Roermond or Heerlen sells to Dutch, Belgian and German customers in the same week, and all three expect their own way of paying: iDEAL is the Dutch default, Bancontact belongs there the moment you have Belgian customers, and the German side behaves differently again. The same applies to language, delivery times and returns policy. These are not details — they are the difference between an abandoned basket and a completed order.",
        "This is also a province of heavy industry: logistics around Venlo, chemicals and materials at Chemelot near Sittard-Geleen, healthcare and services around Heerlen and Maastricht. Companies like that rarely need only a website. They need custom software that talks to what already runs, or an app for people who are not sitting at a desk. We have been doing that work for 17+ years across 150+ projects, and the code and design are yours once it ships.",
      ],
      faq: [
        {
          question: "How close are you, exactly?",
          answer:
            "Brisk is based in Belgian Limburg, the neighbouring province. From our side of the border, Maastricht, Sittard-Geleen and Roermond are a short drive, and Venlo and Weert are just as reachable. Of all the Dutch provinces, this is the one where we can be at your table fastest.",
        },
        {
          question: "Can you build a webshop serving the Netherlands, Belgium and Germany?",
          answer:
            "Yes. We build webshops that serve several countries at once, with iDEAL for Dutch customers, Bancontact for Belgian ones, and the right language, shipping rates and terms per market. That is designed in from the start rather than added afterwards.",
        },
        {
          question: "Do you write Dutch for the Netherlands or Flemish Dutch?",
          answer:
            "Both, kept deliberately apart. We write Dutch for the Netherlands and Flemish Dutch for Belgium, because a Dutch reader notices Belgian word choice immediately. Copy for clients in Limburg is written to sound normal there.",
        },
        {
          question: "Can you handle our Belgian and Dutch markets together?",
          answer:
            "Yes, and that is exactly why companies in this region come to us. One team builds both sides from the same codebase and design language, while the payment methods, tone of voice and legal texts follow each country's conventions.",
        },
      ],
    },
  },

  /* ------------------------------- Groningen ----------------------------- */
  groningen: {
    nl: {
      metaTitle: "Website of software laten bouwen in Groningen",
      metaDescription:
        "Voor energiebedrijven, IT en groeiende organisaties in Groningen, Delfzijl, Veendam en Winschoten: websites, webshops, software en apps op maat.",
      h1: "Digitaal bureau voor bedrijven in Groningen",
      lead: "Groningen combineert twee dingen die elders zelden samengaan: een zware energie- en industrieregio langs Delfzijl en de Eemsdelta, en een studentenstad die elk jaar duizenden jonge mensen aanlevert. Wij bouwen hier websites en webshops, en net zo vaak software op maat en mobiele apps.",
      localAngle: [
        "De energietransitie zorgt in deze provincie voor projecten met veel publiek eromheen: omwonenden, overheden, investeerders, toeleveranciers. Dat vraagt om iets anders dan een bedrijfsbrochure. Het vraagt om een site die uitlegt wat er gebeurt, cijfers laat zien zonder ze te verstoppen, en die je eigen mensen kunnen bijwerken op de dag dat het nieuws is. In Delfzijl, Veendam en Hoogezand zie je daarnaast klassieke industrie die vooral behoefte heeft aan koppelingen: orders, voorraad en documentatie op één plek in plaats van in vier.",
        "De stad Groningen is een andere markt. Er is veel jong talent en veel concurrentie om datzelfde talent, dus voor bedrijven en instellingen hier is de site vaak net zo goed een wervingsinstrument als een verkoopkanaal — vacatures die vindbaar zijn, sollicitaties die niet in een mailbox verdwijnen, een verhaal dat klopt met wat mensen op de eerste werkdag aantreffen. De IT-sector die hier gegroeid is, vraagt op zijn beurt om product-achtig werk: applicaties, dashboards en apps in plaats van pagina's.",
        "Eerlijk zijn over de afstand hoort erbij. Groningen ligt het verst van ons vandaan van alle Nederlandse provincies, dus we doen niet alsof we even langswippen. We werken op afstand vanuit Limburg in België, met een vast wekelijks videogesprek waarin je ziet wat er gebouwd is, en we reizen voor de kickoff en de oplevering — de momenten waarop een gedeelde ruimte echt iets toevoegt. Op een aanvraag reageren we binnen 24 uur.",
      ],
      faq: [
        {
          question: "Groningen ligt ver van België — hoe pakken jullie dat aan?",
          answer:
            "We werken op afstand met een vast wekelijks videogesprek waarin we werkende schermen laten zien, en we reizen naar Groningen voor de kickoff en de oplevering. We doen niet alsof we elke week binnenlopen; het ritme is zo opgezet dat het project ook zonder reisdagen vooruitgaat.",
        },
        {
          question: "Kunnen jullie helpen bij het werven van personeel via onze site?",
          answer:
            "Ja. We bouwen wervingssecties waarin vacatures vindbaar zijn, sollicitaties netjes binnenkomen in plaats van in een mailbox verdwijnen, en het verhaal over werken bij jouw organisatie klopt. Voor werkgevers in de stad Groningen is dat vaak net zo belangrijk als de commerciële kant.",
        },
        {
          question: "Bouwen jullie ook dashboards en applicaties, niet alleen websites?",
          answer:
            "Ja. Naast websites en webshops bouwen we software op maat en mobiele apps: dashboards, portalen, planningstools en interne applicaties, gekoppeld aan de systemen die je al gebruikt.",
        },
        {
          question: "Werken jullie voor Nederlandse opdrachtgevers vanuit België?",
          answer:
            "Ja. Brisk zit in Limburg in België en werkt voor opdrachtgevers in heel Nederland. We factureren in euro's, en voor Nederlandse bedrijven die btw-plichtig zijn wordt de btw verlegd volgens de gebruikelijke Europese regeling.",
        },
      ],
    },
    en: {
      metaTitle: "Website and software development in Groningen",
      metaDescription:
        "For energy companies, IT firms and growing organisations in Groningen, Delfzijl, Veendam and Winschoten: custom websites, webshops, software and apps.",
      h1: "A digital studio for companies in Groningen",
      lead: "Groningen puts together two things that rarely sit side by side: a heavy energy and industry region along Delfzijl and the Eems estuary, and a student city that produces thousands of young professionals every year. Both halves need building work: websites, webshops, custom software and mobile apps.",
      localAngle: [
        "The energy transition gives this province projects with a large audience attached: neighbours, authorities, investors, suppliers. That asks for something other than a company brochure. It asks for a site that explains what is happening, shows figures without hiding them, and can be updated by your own people on the day the news breaks. In Delfzijl, Veendam and Hoogezand you also find classic industry whose real need is integration: orders, stock and documentation in one place instead of four.",
        "The city of Groningen is a different market. There is a lot of young talent and a lot of competition for it, so for employers here the website is a recruiting instrument as much as a sales channel — vacancies that are findable, applications that do not disappear into an inbox, and a story that matches what people find on their first day. The IT sector that has grown here asks for product-shaped work instead: applications, dashboards and apps rather than pages.",
        "Being honest about distance is part of the deal. Groningen is the furthest of the twelve provinces from us, so we do not pretend to drop by. We work remotely from Limburg in Belgium, with a fixed weekly video call where you see what has been built, and we travel for kickoff and delivery — the moments where a shared room genuinely adds something. Enquiries get an answer within 24 hours.",
      ],
      faq: [
        {
          question: "Groningen is a long way from Belgium — how do you handle that?",
          answer:
            "We work remotely with a fixed weekly video call showing working screens, and we travel to Groningen for kickoff and delivery. We do not pretend to be around every week; the rhythm is built so the project keeps moving without travel days.",
        },
        {
          question: "Can you help us recruit through our website?",
          answer:
            "Yes. We build careers sections where vacancies are findable, applications arrive properly instead of vanishing into an inbox, and the story about working at your organisation is credible. For employers in the city of Groningen that often matters as much as the commercial side.",
        },
        {
          question: "Do you build dashboards and applications as well as websites?",
          answer:
            "Yes. Alongside websites and webshops we build custom software and mobile apps: dashboards, portals, planning tools and internal applications, connected to the systems you already run.",
        },
        {
          question: "Do you work for Dutch clients from Belgium?",
          answer:
            "Yes. Brisk is based in Limburg, Belgium, and works for clients throughout the Netherlands. We invoice in euros, and for VAT-registered Dutch businesses the VAT is reverse-charged under the usual EU rules.",
        },
      ],
    },
  },

  /* ------------------------------- Friesland ----------------------------- */
  friesland: {
    nl: {
      metaTitle: "Website of webshop laten maken in Friesland",
      metaDescription:
        "Voor agrofood, watertechnologie en maakindustrie in Leeuwarden, Drachten, Sneek, Heerenveen en Harlingen: websites, webshops, software en apps.",
      h1: "Websites, webshops en software voor Friese bedrijven",
      lead: "Friesland leeft van dingen die je kunt aanwijzen: melk en voeding, watertechnologie rond Leeuwarden, precisie-industrie in Drachten en scheepvaart in Harlingen. Bedrijven hier bouwen voor de lange termijn, en dat verwachten ze terecht ook van een digitale partner.",
      localAngle: [
        "Watertechnologie is het duidelijkste voorbeeld. Rond Leeuwarden zit kennis die in het buitenland verkocht wordt, en dat betekent een site die technisch overtuigt zonder onleesbaar te worden: heldere uitleg, documenten die kloppen, cijfers die je durft te tonen. Wij hebben in België gewerkt voor De Watergroep, het drinkwaterbedrijf van Vlaanderen, dus dit soort onderwerpen is ons niet vreemd. In Drachten en Heerenveen ligt de nadruk weer op maakindustrie: productdata, specificaties en een B2B-kanaal dat afnemers zelf laat bestellen.",
        "Agrofood en regionale merken vragen om iets heel anders. Daar telt herkomst, en een webshop die dat draagt zonder folkloristisch te worden. Praktisch betekent dat verzending die klopt voor gekoelde of kwetsbare producten, iDEAL als vanzelfsprekende betaalmethode, en een beheeromgeving die iemand met een volle agenda in twintig minuten per week bijhoudt. In Sneek en Harlingen komt daar het seizoen bij: watersport en toerisme zorgen voor pieken die je site gewoon moet uithouden.",
        "Wij werken vanuit Limburg in België, op afstand, met reisdagen voor de kickoff en de oplevering. Friese bedrijven kiezen zelden voor de snelste partij maar voor de partij die er over drie jaar nog is, en daar zijn we duidelijk over: 17+ jaar, 150+ projecten, en code en ontwerp die na oplevering van jou zijn — ook als je ooit verder wil met iemand anders.",
      ],
      faq: [
        {
          question: "Schrijven jullie ook in het Fries?",
          answer:
            "Wij schrijven zelf in het Nederlands en het Engels. Wil je Friese teksten op je site, dan bouwen we die taal gewoon in en plaatsen we de vertalingen die jij aanlevert, met dezelfde structuur en vindbaarheid als de andere talen.",
        },
        {
          question: "Bouwen jullie webshops voor regionale producenten?",
          answer:
            "Ja. We bouwen webshops op maat, inclusief verzendregels voor gekoelde of kwetsbare producten, abonnementen of pakketten, en iDEAL als standaard betaalmethode voor Nederlandse klanten. Het beheer richten we zo in dat je er weinig tijd aan kwijt bent.",
        },
        {
          question: "Komen jullie naar Friesland voor overleg?",
          answer:
            "Ja. We werken op afstand vanuit Belgisch Limburg met een wekelijks videogesprek, en reizen naar Leeuwarden, Drachten of Heerenveen voor de kickoff, de belangrijke ontwerpbeslissingen en de oplevering.",
        },
        {
          question: "Blijven jullie beschikbaar na de oplevering?",
          answer:
            "Ja. We werken al 17+ jaar met opdrachtgevers die na de lancering doorbouwen, en dat is ook de bedoeling. Tegelijk ben je niet aan ons gebonden: de code en het ontwerp zijn van jou, dus je kunt altijd zelf of met een andere partij verder.",
        },
      ],
    },
    en: {
      metaTitle: "Website and webshop development in Friesland",
      metaDescription:
        "For agri-food, water technology and manufacturing in Leeuwarden, Drachten, Sneek, Heerenveen and Harlingen: custom websites, webshops, software and apps.",
      h1: "Websites, webshops and software for Frisian businesses",
      lead: "Friesland makes things you can point at: dairy and food, water technology around Leeuwarden, precision manufacturing in Drachten and shipping out of Harlingen. Companies here build for the long term, and they are right to expect the same from a digital partner.",
      localAngle: [
        "Water technology is the clearest case. The expertise around Leeuwarden is sold abroad, which means a site that convinces technically without becoming unreadable: clear explanation, documents that are current, numbers you are willing to show. We have worked in Belgium for De Watergroep, the Flemish drinking water utility, so the subject matter is familiar. Drachten and Heerenveen tilt towards manufacturing instead: product data, specifications and a B2B channel that lets buyers order for themselves.",
        "Agri-food and regional brands ask for something quite different. Provenance carries the sale, and the webshop has to support that without turning into folklore. Practically, that means shipping rules that work for chilled or fragile goods, iDEAL as the obvious way to pay, and an admin someone with a full diary can keep up with in twenty minutes a week. In Sneek and Harlingen the season joins in: watersports and tourism create peaks the site simply has to absorb.",
        "We work from Limburg in Belgium, remotely, with travel days for kickoff and delivery. Frisian companies rarely pick the fastest supplier; they pick the one still around in three years. So we are plain about it: 17+ years, 150+ projects delivered, and code and design that belong to you afterwards — including if you ever continue with someone else.",
      ],
      faq: [
        {
          question: "Do you write copy in Frisian?",
          answer:
            "We write in Dutch and English ourselves. If you want Frisian on your site, we build the language in properly and place the translations you supply, with the same structure and findability as the other languages.",
        },
        {
          question: "Do you build webshops for regional producers?",
          answer:
            "Yes. We build custom webshops, including shipping rules for chilled or fragile goods, subscriptions or gift boxes, and iDEAL as the default payment method for Dutch customers. The admin is set up so it costs you very little time.",
        },
        {
          question: "Will you travel to Friesland for meetings?",
          answer:
            "Yes. We work remotely from Belgian Limburg with a weekly video call, and travel to Leeuwarden, Drachten or Heerenveen for kickoff, the significant design decisions and delivery.",
        },
        {
          question: "Are you still available after launch?",
          answer:
            "Yes. We have spent 17+ years working with clients who keep building after launch, and that is the intention here too. At the same time you are not tied to us: the code and design are yours, so you can continue in-house or with another team whenever you want.",
        },
      ],
    },
  },

  /* -------------------------------- Drenthe ------------------------------ */
  drenthe: {
    nl: {
      metaTitle: "Website laten maken in Drenthe",
      metaDescription:
        "Websites, webshops, software en apps voor bedrijven in Assen, Emmen, Hoogeveen, Meppel en Coevorden. Maatwerk dat een klein team zelf kan beheren.",
      h1: "Digitaal werk voor ondernemers in Drenthe",
      lead: "Drenthe draait op maakindustrie rond Emmen, zorg en dienstverlening, een stevige toeristische sector en de sensortechnologie rond Assen. Wat die bedrijven delen is een kleine marketingbezetting, en dat bepaalt hoe wij hier bouwen.",
      localAngle: [
        "Toerisme is in deze provincie geen bijzaak. Vakantieparken, campings, horeca en attracties leven van een paar drukke maanden, en dan moet alles kloppen: beschikbaarheid die klopt, een boeking of aanvraag die in drie stappen rond is, mobiel als uitgangspunt en niet als afgeleide, en iDEAL zodat een Nederlandse gast niet hoeft na te denken over betalen. Een site die in juli traag wordt kost hier direct geld, dus snelheid onder piekbelasting is een ontwerpeis en geen bonus.",
        "In Emmen, Hoogeveen en Coevorden ziet het er industrieel uit: kunststof, machinebouw, logistiek richting de Duitse grens. Daar helpt vooral het wegnemen van handwerk — productdata die niet twee keer wordt ingevoerd, offertes die uit hetzelfde systeem komen als de orders, documentatie die per klant klopt. En rond Assen zit de meet- en sensorkant, waar de opgave is om data begrijpelijk te tonen aan mensen die geen ingenieur zijn.",
        "Bij bedrijven met een marketingteam van één persoon — of van nul — bouwen we anders. Het beheer moet eenvoudig zijn, de structuur moet vergeeflijk zijn en er mag niets stukgaan omdat iemand een pagina verplaatst. Wij werken vanuit Limburg in België, op afstand met een wekelijks videogesprek, en we reizen naar Drenthe voor de kickoff en de oplevering. Binnen 24 uur antwoord, en een kennismaking van 30 minuten kost je niets.",
      ],
      faq: [
        {
          question: "Kunnen jullie een boekings- of aanvraagflow bouwen voor een recreatiebedrijf?",
          answer:
            "Ja. We bouwen boekings- en aanvraagflows op maat, met beschikbaarheid, seizoensprijzen en betaling via iDEAL, gekoppeld aan het reserveringssysteem dat je al gebruikt. Mobiel is daarbij het uitgangspunt, want dat is waar de meeste boekingen vandaan komen.",
        },
        {
          question: "Blijft de site snel als het in het hoogseizoen druk wordt?",
          answer:
            "Dat is een ontwerpeis vanaf het begin. We bouwen sites die pieken aankunnen zonder dat je op de drukste dag van het jaar iets moet aanzetten, en we testen dat voor de oplevering in plaats van erna.",
        },
        {
          question: "Kan ons team de site zelf beheren zonder ontwikkelaar?",
          answer:
            "Ja. We richten het beheer in op de mensen die het echt gaan doen, vaak een team van één. Pagina's, prijzen en teksten pas je zelf aan, en de structuur is zo gebouwd dat er niets breekt als je iets verplaatst of verwijdert.",
        },
        {
          question: "Van wie is het werk als het project klaar is?",
          answer:
            "Van jou. De code, het ontwerp en de content zijn eigendom van de opdrachtgever. Je kunt de site of software later zelf uitbreiden of door een andere partij laten overnemen zonder dat je iets moet afkopen.",
        },
      ],
    },
    en: {
      metaTitle: "Website development in Drenthe",
      metaDescription:
        "Websites, webshops, software and apps for businesses in Assen, Emmen, Hoogeveen, Meppel and Coevorden. Built so a small team can run it themselves.",
      h1: "Digital work for businesses in Drenthe",
      lead: "Drenthe runs on manufacturing around Emmen, healthcare and services, a serious tourism sector and the sensor technology cluster near Assen. What those businesses share is a small marketing bench, and that shapes how we build here.",
      localAngle: [
        "Tourism is not a sideline in this province. Holiday parks, campsites, restaurants and attractions live off a handful of busy months, and everything has to hold: accurate availability, a booking or enquiry finished in three steps, mobile as the starting point rather than an afterthought, and iDEAL so a Dutch guest never has to think about paying. A site that slows down in July costs money that week, so performance under peak load is a design requirement, not a bonus.",
        "Emmen, Hoogeveen and Coevorden look industrial: polymers, machine building, logistics towards the German border. There the win is removing manual work — product data that is not entered twice, quotations drawn from the same system as the orders, documentation that is correct per customer. Around Assen sits the measurement and sensor side, where the challenge is presenting data legibly to people who are not engineers.",
        "When the marketing team is one person — or nobody — we build differently. The admin has to be simple, the structure has to be forgiving, and nothing should break because someone moved a page. We work from Limburg in Belgium, remotely with a weekly video call, and travel to Drenthe for kickoff and delivery. A reply within 24 hours, and a 30-minute intro call that costs nothing.",
      ],
      faq: [
        {
          question: "Can you build a booking or enquiry flow for a leisure business?",
          answer:
            "Yes. We build custom booking and enquiry flows with availability, seasonal pricing and payment through iDEAL, connected to the reservation system you already use. Mobile comes first, because that is where most bookings originate.",
        },
        {
          question: "Will the site stay fast during the high season?",
          answer:
            "That is a design requirement from the start. We build sites that absorb peaks without you switching anything on during the busiest day of the year, and we test it before delivery rather than after.",
        },
        {
          question: "Can our team maintain the site without a developer?",
          answer:
            "Yes. We set up the admin around the people who will actually use it, often a team of one. Pages, prices and copy are yours to change, and the structure is built so nothing breaks when you move or remove something.",
        },
        {
          question: "Who owns the work once the project is finished?",
          answer:
            "You do. The code, the design and the content belong to the client. You can extend the site or software yourself later, or hand it to another team, without buying anything back.",
        },
      ],
    },
  },

  /* ------------------------------- Flevoland ----------------------------- */
  flevoland: {
    nl: {
      metaTitle: "Website of webshop laten bouwen in Flevoland",
      metaDescription:
        "Voor snelgroeiende bedrijven in Almere, Lelystad, Emmeloord, Dronten en Zeewolde: websites, webshops, software op maat en mobiele apps die meegroeien.",
      h1: "Voor groeiende bedrijven in Flevoland",
      lead: "Flevoland is de jongste provincie van Nederland en dat zie je aan de bedrijven: veel organisaties hier bestaan nog geen generatie, groeien snel en zijn hun eerste digitale opzet ontgroeid. Wij bouwen de versie die de volgende fase wel aankan.",
      localAngle: [
        "Het patroon komt in Almere en Lelystad steeds terug. Er is ooit iets gemaakt toen het bedrijf uit vier mensen bestond: een site in een paar avonden, een webshop met een thema, een administratie in spreadsheets. Dat werkte prima — tot er dertig mensen zijn, drie diensten en vijfhonderd orders per week. De vraag is dan niet 'mooier', maar 'houdbaar': een structuur die uitbreiding aankan, een webshop met iDEAL die pieken opvangt, en software op maat die het handwerk overneemt dat nu bij één persoon ligt.",
        "Logistiek is de tweede grote lijn. Rond Lelystad en Almere zitten distributie en dienstverlening die draaien op ritten, voorraad en afspraken, en dat vraagt om koppelingen en portalen in plaats van pagina's: een klant die zijn levering volgt, een chauffeur die met een app werkt, een planner die niet meer hoeft te bellen. In de Noordoostpolder rond Emmeloord, Dronten en Zeewolde is de landbouw intussen behoorlijk technisch geworden — ook daar gaat het over data, en over hoe je die toont aan afnemers en telers.",
        "Het voordeel van jonge bedrijven is dat er weinig legacy is. Er hoeft geen systeem van vijftien jaar oud omheen gebouwd te worden, dus keuzes kunnen meteen goed. Wij zitten in Limburg, België, werken op afstand met een kort wekelijks videogesprek, en komen naar Flevoland voor de kickoff en de oplevering. In 17+ jaar leverden we 150+ projecten, en wat we bouwen wordt eigendom van de opdrachtgever.",
      ],
      faq: [
        {
          question: "Onze huidige site is uit onze eigen beginjaren — kunnen jullie die vervangen?",
          answer:
            "Ja, dat is een van de vaakst gestelde vragen van groeiende bedrijven in Almere en Lelystad. We bekijken wat er blijft werken, wat weg kan en wat opnieuw moet, en bouwen een versie die past bij de omvang die je nu hebt in plaats van bij de omvang van toen.",
        },
        {
          question: "Kunnen jullie een webshop bouwen die snelle groei aankan?",
          answer:
            "Ja. We bouwen webshops op maat met iDEAL als standaard betaalmethode, gekoppeld aan je voorraad- en orderafhandeling, en opgezet zodat meer producten, meer orders of een extra land geen verbouwing vragen.",
        },
        {
          question: "Bouwen jullie ook koppelingen met ons planning- of ordersysteem?",
          answer:
            "Ja. Voor logistieke en distributiebedrijven in Flevoland is dat meestal de kern: een klantportaal of app die rechtstreeks praat met het systeem waarin ritten, voorraad en orders al staan, zodat niemand gegevens dubbel invoert.",
        },
        {
          question: "Hoe begint zo'n traject?",
          answer:
            "Met een gratis kennismaking van 30 minuten waarin we doornemen waar je nu tegenaan loopt en wat dat technisch vraagt. Op elke aanvraag reageren we binnen 24 uur, en daarna weet je snel of wij de juiste partij zijn.",
        },
      ],
    },
    en: {
      metaTitle: "Website and webshop development in Flevoland",
      metaDescription:
        "For fast-growing companies in Almere, Lelystad, Emmeloord, Dronten and Zeewolde: custom websites, webshops, software and mobile apps built to scale.",
      h1: "For growing companies in Flevoland",
      lead: "Flevoland is the youngest province in the country and its businesses show it: many organisations here are not yet a generation old, grow quickly, and have outgrown the first digital setup they ever built. We build the version that survives the next stage.",
      localAngle: [
        "The pattern repeats across Almere and Lelystad. Something was built when the company was four people: a site put together over a few evenings, a webshop on a theme, an administration in spreadsheets. It worked — until there are thirty people, three services and five hundred orders a week. The question then is not 'prettier' but 'sustainable': a structure that tolerates expansion, a webshop with iDEAL that absorbs peaks, and custom software that takes over the manual work currently sitting with one person.",
        "Logistics is the second thread. Around Lelystad and Almere sit distribution and service businesses running on routes, stock and appointments, and that calls for integrations and portals rather than pages: a customer tracking a delivery, a driver working from an app, a planner who no longer has to phone. In the Noordoostpolder around Emmeloord, Dronten and Zeewolde, agriculture has become distinctly technical — that is data work too, and the question is how to show it to buyers and growers.",
        "The advantage of young companies is that there is little legacy. Nothing has to be built around a fifteen-year-old system, so the choices can be right the first time. We are based in Limburg, Belgium, work remotely with a short weekly video call, and travel to Flevoland for kickoff and delivery. Over 17+ years we have delivered 150+ projects, and what we build becomes the client's property.",
      ],
      faq: [
        {
          question: "Our current site dates from our early years — can you replace it?",
          answer:
            "Yes, and it is the most common question from growing companies in Almere and Lelystad. We look at what still works, what can go and what needs rebuilding, then build a version that fits the size you are now rather than the size you were.",
        },
        {
          question: "Can you build a webshop that handles fast growth?",
          answer:
            "Yes. We build custom webshops with iDEAL as the default payment method, connected to your stock and order handling, and set up so that more products, more orders or an extra country do not require a rebuild.",
        },
        {
          question: "Do you build integrations with our planning or order system?",
          answer:
            "Yes. For logistics and distribution businesses in Flevoland that is usually the core of the job: a customer portal or app that talks directly to the system already holding routes, stock and orders, so nobody enters data twice.",
        },
        {
          question: "How does a project start?",
          answer:
            "With a free 30-minute intro call covering what is currently in your way and what it takes technically to fix. We answer every enquiry within 24 hours, and you will know quickly whether we are the right team.",
        },
      ],
    },
  },

  /* -------------------------------- Zeeland ------------------------------ */
  zeeland: {
    nl: {
      metaTitle: "Website of webshop laten maken in Zeeland",
      metaDescription:
        "Voor familiebedrijven, toerisme en industrie in Middelburg, Vlissingen, Goes, Terneuzen en Zierikzee: websites, webshops, software en apps op maat.",
      h1: "Digitaal maatwerk voor Zeeuwse bedrijven",
      lead: "Zeeland is drie dingen tegelijk: haven en industrie rond Terneuzen en Vlissingen, een toeristische economie die op een paar maanden draait, en landbouw en visserij met bedrijven die vaak al generaties in dezelfde familie zitten. Websites, webshops, software op maat en mobiele apps: wij bouwen ze voor alle drie.",
      localAngle: [
        "In Zeeuws-Vlaanderen is België geen buitenland maar de buurt. Terneuzen ligt aan het kanaal naar Gent, personeel en klanten steken dagelijks de grens over, en Belgische gasten zijn in het toeristische seizoen een groot deel van je publiek. Voor een webshop of boekingsflow betekent dat concreet: iDEAL voor je Nederlandse klanten én Bancontact voor je Belgische, in dezelfde afrekenflow, met verzendkosten en voorwaarden die per land kloppen. Dat is precies het soort detail waar wij als Belgisch bureau met Nederlandse opdrachtgevers dagelijks mee werken.",
        "De toeristische kant van Walcheren en Schouwen-Duiveland — Middelburg, Vlissingen, Zierikzee — leeft van een korte, drukke periode. Beschikbaarheid moet kloppen, mobiel moet vanzelfsprekend zijn, en de site moet in augustus net zo snel zijn als in februari. Rond Goes en in de polders zit intussen de agrarische kant: telers, verwerkers en handelsbedrijven die vooral gebaat zijn bij minder handwerk, met orders en productdata uit één systeem in plaats van uit drie.",
        "Zeeuwse bedrijven zijn zelden groot en dat is geen bezwaar. Het betekent wel dat wat we bouwen door een klein team beheerd moet kunnen worden, zonder abonnementen op mensen die je niet nodig hebt. Wij werken vanuit Limburg in België, op afstand met een wekelijks videogesprek, en reizen naar Zeeland voor de kickoff en de oplevering. Antwoord binnen 24 uur, gratis kennismaking van 30 minuten, en code en ontwerp zijn na oplevering van jou.",
      ],
      faq: [
        {
          question: "Kunnen jullie een webshop bouwen voor zowel Nederlandse als Belgische klanten?",
          answer:
            "Ja, en in Zeeland is dat bijna altijd de vraag. We zetten iDEAL en Bancontact naast elkaar in dezelfde afrekenflow, met per land de juiste verzendkosten, levertijden en voorwaarden, zodat een klant uit Goes en een klant uit Gent allebei gewoon kunnen afrekenen.",
        },
        {
          question: "Is een Belgisch bureau handig of juist lastig voor een Zeeuws bedrijf?",
          answer:
            "Voor Zeeuws-Vlaanderen is het vooral handig. Brisk zit in Belgisch Limburg en werkt aan beide kanten van de grens, dus we kennen de Nederlandse en de Belgische conventies allebei — van betaalmethodes tot taalgebruik — en je hebt geen tweede bureau nodig voor je Belgische publiek.",
        },
        {
          question: "Werken jullie ook voor kleinere familiebedrijven?",
          answer:
            "Ja. Veel van ons werk gebeurt voor bedrijven met een klein team, waarbij we het beheer bewust eenvoudig houden. Naast websites en webshops bouwen we ook software op maat en mobiele apps als dat handwerk wegneemt dat nu bij één of twee mensen ligt.",
        },
        {
          question: "Komen jullie langs in Middelburg of Terneuzen?",
          answer:
            "Ja. We werken op afstand met een vast wekelijks videogesprek en reizen naar Zeeland voor de kickoff, de belangrijke ontwerpbeslissingen en de oplevering. Vanuit Belgisch Limburg is Zeeuws-Vlaanderen bovendien goed te doen.",
        },
      ],
    },
    en: {
      metaTitle: "Website and webshop development in Zeeland",
      metaDescription:
        "For family firms, tourism and industry in Middelburg, Vlissingen, Goes, Terneuzen and Zierikzee: custom websites, webshops, software and apps.",
      h1: "Custom digital work for businesses in Zeeland",
      lead: "Zeeland is three economies at once: port and industry around Terneuzen and Vlissingen, a tourism season compressed into a few months, and farming and fishing run by firms that have been in the same family for generations. Websites, webshops, custom software and mobile apps: we build for all three.",
      localAngle: [
        "In Zeeuws-Vlaanderen, Belgium is not abroad — it is the neighbourhood. Terneuzen sits on the canal to Ghent, staff and customers cross the border daily, and Belgian visitors make up a large share of the audience in season. For a webshop or a booking flow that has a concrete consequence: iDEAL for your Dutch customers and Bancontact for your Belgian ones, in the same checkout, with shipping costs and terms that are right per country. That is exactly the detail we deal with daily as a Belgian studio working for Dutch clients.",
        "The tourism side of Walcheren and Schouwen-Duiveland — Middelburg, Vlissingen, Zierikzee — lives off a short, intense period. Availability has to be accurate, mobile has to be obvious, and the site has to be as fast in August as in February. Around Goes and out in the polders sits the agricultural side: growers, processors and traders whose real gain is less manual work, with orders and product data coming from one system instead of three.",
        "Companies in Zeeland are rarely large, and that is not a drawback. It does mean whatever we build has to be maintainable by a small team, without subscriptions to people you do not need. We work from Limburg in Belgium, remotely with a weekly video call, and travel to Zeeland for kickoff and delivery. A reply within 24 hours, a free 30-minute intro call, and code and design that are yours once it ships.",
      ],
      faq: [
        {
          question: "Can you build a webshop for Dutch and Belgian customers at once?",
          answer:
            "Yes, and in Zeeland that is nearly always the brief. We put iDEAL and Bancontact side by side in the same checkout, with the correct shipping costs, delivery times and terms per country, so a customer in Goes and a customer in Ghent can both simply pay.",
        },
        {
          question: "Is a Belgian studio helpful or awkward for a Zeeland company?",
          answer:
            "For Zeeuws-Vlaanderen it is mostly helpful. Brisk is based in Belgian Limburg and works on both sides of the border, so we know Dutch and Belgian conventions alike — from payment methods to word choice — and you do not need a second agency for your Belgian audience.",
        },
        {
          question: "Do you work with smaller family businesses?",
          answer:
            "Yes. A lot of our work is for companies with small teams, and we deliberately keep the admin simple. Beyond websites and webshops we also build custom software and mobile apps when that removes manual work currently resting on one or two people.",
        },
        {
          question: "Will you visit us in Middelburg or Terneuzen?",
          answer:
            "Yes. We work remotely with a fixed weekly video call and travel to Zeeland for kickoff, the significant design decisions and delivery. From Belgian Limburg, Zeeuws-Vlaanderen is a manageable trip as well.",
        },
      ],
    },
  },
};
