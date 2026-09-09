/**
 * Copy for the app and portal landing pages (`parent: "apps"` in clusters.ts).
 *
 * Each page has to say something the other five do not. The iOS and Android
 * pages in particular are only worth publishing if they differ where the
 * platforms differ — App Store review and TestFlight on one side, device
 * fragmentation and Google Play release tracks on the other. The pricing page
 * names no price, because a number without a scope is worthless to the reader
 * and to us; it explains what actually moves the number instead.
 */
import type { ClusterContentMap } from "./types";

export const appClusterContent: ClusterContentMap = {
  "ios-app-laten-maken": {
    nl: {
      metaTitle: "iOS app laten maken voor iPhone en iPad",
      metaDescription:
        "iOS app laten maken met een team dat de App Store kent: React Native, TestFlight en een vaste prijs per fase. 150+ projecten, antwoord binnen 24 uur.",
      h1: "iOS app laten maken voor iPhone en iPad",
      lead: "Een iOS app laten maken betekent bouwen binnen de regels van één bedrijf. Apple bepaalt hoe je betalingen verlopen, welke rechten je mag vragen en wanneer een update live gaat. Wij bouwen al 17 jaar digitale producten en kennen die route van de eerste build tot een goedgekeurde release.",
      sections: [
        {
          heading: "Ontwerpen voor de duim, niet voor een presentatie",
          body: [
            "iPhone-gebruikers verwachten een app die aanvoelt als de rest van hun toestel. Dat zit in gebaren die met je vinger meebewegen, in lijsten die vloeiend blijven terwijl je scrollt en in tekst die meeschaalt als iemand Dynamic Type groter zet. Een app die die conventies negeert, voelt meteen als een website in een schil.",
            "We ontwerpen elk scherm eerst voor de duim. De belangrijkste actie staat onderaan, binnen bereik van één hand, en niet in een hoek waar je je greep voor moet verleggen. VoiceOver-labels schrijven we samen met de teksten, donkere modus zit in het ontwerpsysteem en de veilige zones rond de notch of het camerabalkje horen bij het ontwerp in plaats van bij de oplevering.",
            "Wil je daarnaast een iPad app laten maken, dan behandelen we die als een eigen scherm en niet als een uitgerekte iPhone: bredere lijsten, split view en een navigatie die past bij een groter canvas.",
          ],
        },
        {
          heading: "React Native, en wanneer volledig native beter is",
          body: [
            "We bouwen iOS-apps met React Native en Expo in TypeScript. Onder de motorkap draaien echte native componenten, dus je krijgt het gedrag van een iOS-app uit één codebase die meteen ook de Android-versie oplevert. Voor de grote meerderheid van zakelijke apps is dat de eerlijkste keuze: je betaalt één keer voor logica die anders twee keer gebouwd en elk jaar twee keer onderhouden wordt.",
            "Er zijn gevallen waarin dat niet klopt. Zware graphics en 3D, diepe integratie met hardware of met het besturingssysteem, en apps die constant een zeer hoge framerate moeten vasthouden, zijn beter af volledig native in Swift. Dan zeggen we dat, ook als het ons een kleiner project oplevert.",
            "Die afweging hoort aan het begin. Een app voor de App Store laten bouwen begint bij de vraag wat je app echt moet doen, niet bij de technologie die wij het liefst gebruiken.",
          ],
        },
        {
          heading: "Van TestFlight naar de App Store",
          body: [
            "Elke sprint eindigt bij ons met een build in TestFlight. Jij en je testers hebben de app op je eigen toestel terwijl we bouwen, dus feedback komt binnen op het scherm waar hij hoort in plaats van als screenshot in een document.",
            "Voor de release regelen we App Store Connect: screenshots per schermformaat, de privacygegevens die Apple per app opvraagt, de leeftijdsclassificatie en de teksten in de store. Bied je in de app een login met Google of Facebook aan, dan vraagt Apple ook Sign in with Apple. Verkoop je digitale content, dan moet dat via de in-app aankopen van Apple lopen, terwijl fysieke producten en diensten gewoon via Stripe kunnen afrekenen.",
            "De review zelf is een wachtrij bij Apple en geen deadline die wij kunnen zetten. Daarom plannen we minstens één reviewronde in plaats van erop te hopen dat het in één keer lukt. Je kunt een iPhone app laten ontwikkelen die technisch perfect is en toch struikelt over een richtlijn, dus we houden die richtlijnen aan vanaf het eerste scherm.",
          ],
        },
        {
          heading: "Wat er na de lancering gebeurt",
          body: [
            "Apple brengt elk najaar een nieuwe iOS-versie uit, en daar komen nieuwe eisen mee: aangepaste rechten, nieuwe schermformaten, bibliotheken die bijgewerkt moeten worden. Een app die je een jaar laat staan, valt niet stil, maar begint wel af te wijken van wat gebruikers gewoon zijn.",
            "We spreken daarom een onderhoudsritme af dat past bij hoe belangrijk de app voor je is: crashes en cijfers opvolgen, updates indienen en de volgende versie plannen. Je zit nergens aan vast, want de code, het ontwerp en het developer-account staan op naam van je eigen bedrijf.",
          ],
        },
      ],
      checklist: {
        title: "Wat er in een iOS-project zit",
        items: [
          "Ontwerp per scherm, eerst als klikbaar prototype op je eigen iPhone",
          "React Native en Expo in TypeScript, iOS en Android uit één codebase",
          "Een TestFlight-build voor je testers aan het eind van elke sprint",
          "App Store Connect: screenshots, privacygegevens, teksten en indiening",
          "Login met Apple, Google, e-mail of magic link",
          "Koppeling met je bestaande software via een eigen API",
          "Code, ontwerp en developer-account op jouw naam",
        ],
      },
      faq: [
        {
          question: "Kan één codebase genoeg zijn voor een goede iPhone-app?",
          answer:
            "Voor de grote meerderheid van zakelijke apps wel, want React Native tekent echte native componenten, waardoor gebaren, animaties en navigatie aanvoelen zoals iOS-gebruikers verwachten. Bij zware graphics, diepe hardware-integratie of een zeer hoge framerate raden we volledig native aan, en dat zeggen we voor het project start.",
        },
        {
          question: "Heb ik een eigen Apple Developer-account nodig?",
          answer:
            "Ja, en dat account staat het best op naam van je eigen bedrijf, met een betalend Apple Developer Program-lidmaatschap dat je jaarlijks verlengt. Wij helpen je bij het opzetten en werken als team binnen jouw account, zodat de app en alle reviews van jou blijven.",
        },
        {
          question: "Hoelang duurt de review in de App Store?",
          answer:
            "Die wachtrij bepaalt Apple en niet wij, dus we beloven geen doorlooptijd. We plannen wel altijd ruimte voor minstens één reviewronde en volgen de richtlijnen vanaf het eerste scherm, zodat een afkeuring zelden over de fundamenten gaat.",
        },
        {
          question: "Wat gebeurt er als Apple de app afkeurt?",
          answer:
            "Apple stuurt een concrete reden mee, wij passen aan en dienen opnieuw in. Storebegeleiding zit in elk project, dus je staat niet alleen tegenover App Store Connect.",
        },
        {
          question: "Bouwen jullie meteen ook de Android-versie?",
          answer:
            "Ja, en dat is precies waarom we React Native gebruiken: dezelfde codebase levert een iOS- en een Android-app op. Wil je met één platform starten om de eerste release klein te houden, dan kan dat en blijft de tweede store later binnen bereik.",
        },
        {
          question: "Van wie zijn de code en het ontwerp na oplevering?",
          answer:
            "Van jou. Je krijgt de volledige repository en de ontwerpbestanden, en je kunt er op elk moment met een ander team mee verder.",
        },
      ],
    },
    en: {
      metaTitle: "iOS app development for iPhone and iPad",
      metaDescription:
        "iOS app development by a Belgian team that knows the App Store: React Native, TestFlight, a fixed price per phase. 150+ projects, a reply within 24 hours.",
      h1: "iOS app development for iPhone and iPad",
      lead: "Building for iOS means building inside one company's rules. Apple decides how you take payments, which permissions you may ask for and when an update goes live. We have been shipping digital products for 17 years, and we know that route from the first build to an approved release.",
      sections: [
        {
          heading: "What an iPhone user notices in the first ten seconds",
          body: [
            "An iOS user can tell almost immediately whether an app was made for the platform. It shows in gestures that track your finger, in lists that hold their frame rate while you flick through them, and in text that grows when someone turns up Dynamic Type. Miss those and the app reads as a website in a shell, however good the branding is.",
            "So we design for the thumb first. The primary action sits low on the screen where one hand can reach it, VoiceOver labels are written alongside the copy rather than bolted on at the end, and dark mode is part of the design system instead of an inverted afterthought.",
            "An iPad app is a separate design problem, not a stretched phone screen. Wider lists, split view, a navigation pattern that suits a large canvas — if tablets matter to your users, that layout gets designed on its own terms.",
          ],
        },
        {
          heading: "One codebase, and the cases where it is the wrong answer",
          body: [
            "We build with React Native and Expo in TypeScript. Real native components run underneath, so you get iOS behaviour from a single codebase that also produces the Android build. For the large majority of business apps that is the honest choice: you pay once for logic that would otherwise be written twice and maintained twice every year after.",
            "It is not always right. Heavy graphics and 3D, deep hardware or operating-system integration, and anything that has to hold a very high frame rate are better off fully native in Swift. We say so in the first call, even when it means a smaller project for us.",
            "That decision belongs at the start. iPhone app development goes wrong far more often through a scope chosen for the wrong reason than through the framework underneath it.",
          ],
        },
        {
          heading: "TestFlight, App Store Connect and the review queue",
          body: [
            "Every sprint ends in a TestFlight build. You and your testers have the app on your own devices while it is being built, so feedback arrives against the screen it belongs to instead of a screenshot pasted into a document.",
            "Before release we handle App Store Connect: screenshots per device size, the privacy details Apple asks for, the age rating and the store copy. If you offer a Google or Facebook login, Apple also requires Sign in with Apple. Digital content has to go through Apple's in-app purchases, while physical goods and services can settle through Stripe.",
            "Review is a queue at Apple, not a date we control. We plan for at least one review round rather than hoping to skip it, which is the difference between shipping an App Store app on the agreed date and explaining a delay to your team.",
          ],
        },
        {
          heading: "The year after launch",
          body: [
            "A new iOS version lands every autumn and brings new permission prompts, new screen sizes and libraries that need updating. An app left alone for a year keeps working, but it starts to drift away from what people expect their phone to do.",
            "So we agree a maintenance rhythm that matches how much the app matters: watching crashes and numbers, submitting updates, planning the next release. The code, the design and the developer account stay in your name, which makes switching teams a choice rather than a fight.",
          ],
        },
      ],
      checklist: {
        title: "What an iOS project includes",
        items: [
          "Screen-by-screen design, first as a tappable prototype on your own iPhone",
          "React Native and Expo in TypeScript, iOS and Android from one codebase",
          "A TestFlight build for your testers at the end of every sprint",
          "App Store Connect setup: screenshots, privacy details, copy and submission",
          "Sign in with Apple, Google, email or a magic link",
          "Integration with the software you already run, through your own API",
          "Code, design and developer account in your name",
        ],
      },
      faq: [
        {
          question: "Is one codebase really enough for a good iPhone app?",
          answer:
            "For the large majority of business apps it is, because React Native renders real native components, so gestures, animation and navigation behave the way iOS users expect. Heavy graphics, deep hardware integration or a very high frame rate are the cases where we recommend a fully native build, and we say that before the project starts.",
        },
        {
          question: "Do I need my own Apple Developer account?",
          answer:
            "Yes, and it should sit in your company's name with a paid Apple Developer Program membership that you renew each year. We help you set it up and work inside your account as a team, so the app and its review history always belong to you.",
        },
        {
          question: "How long does App Store review take?",
          answer:
            "Apple controls that queue, so we never promise a turnaround. We do plan for at least one review round and follow the guidelines from the first screen, which is what keeps a rejection from being about the fundamentals.",
        },
        {
          question: "What happens if Apple rejects the app?",
          answer:
            "Apple sends a specific reason, we fix it and resubmit. Store guidance is part of every project, so you are never the one arguing with App Store Connect on your own.",
        },
        {
          question: "Can you build the Android version at the same time?",
          answer:
            "Yes, and that is why we use React Native: the same codebase produces both apps. If you would rather start with one platform to keep the first release small, that works too and the second store stays within reach.",
        },
        {
          question: "Who owns the code and the design?",
          answer:
            "You do. You receive the full repository and the design files, and you can continue with any other team whenever you choose.",
        },
      ],
    },
  },

  "android-app-laten-maken": {
    nl: {
      metaTitle: "Android app laten maken voor Google Play",
      metaDescription:
        "Android app laten maken die op elk toestel werkt: React Native, testtracks in Google Play en een vaste prijs per fase. 150+ projecten, antwoord binnen 24 uur.",
      h1: "Android app laten maken die op elk toestel werkt",
      lead: "Een Android app laten maken is iets anders dan bouwen voor één telefoon. Je app draait op toestellen van tientallen fabrikanten, op schermen van klein tot opvouwbaar, op Android-versies die jaren uit elkaar liggen en op batterij-instellingen die per merk anders werken. Precies dat bereik is het werk.",
      sections: [
        {
          heading: "Fragmentatie is het echte werk",
          body: [
            "Op iOS test je een handvol schermformaten. Op Android test je een spreiding: budgettoestellen met weinig geheugen, grote toestellen met een eigen schil van de fabrikant over Android heen, opvouwbare schermen en tablets. Wat op het ene merk vloeiend loopt, kan op het andere haperen omdat de fabrikant achtergrondprocessen hard afknijpt om batterij te sparen.",
            "De eerste beslissing is daarom scope: welke Android-versies en welke toestelklassen je gebruikers echt in hun broekzak hebben. Elke extra generatie die je meeneemt, is echte testtijd, en doen alsof dat niet zo is, is precies hoe Android-projecten uitlopen.",
            "Achtergrondgedrag verdient aparte aandacht. Moet je app op een vast moment synchroniseren of een melding tonen, dan moet hij bestand zijn tegen een batterijoptimalisatie die nooit met jouw app in gedachten is ontworpen.",
          ],
        },
        {
          heading: "Eén codebase, twee stores",
          body: [
            "We bouwen met React Native en Expo in TypeScript. Wil je een app voor iOS en Android tegelijk, dan schrijven we de logica één keer en leveren we twee apps op. De verschillen die er wel toe doen, krijgen per platform hun eigen afhandeling: de systeemterugknop, het deelmenu en de manier waarop Android om toestemming voor meldingen vraagt.",
            "Voor de meeste zakelijke apps zit daar de winst, twee keer zelfs: één keer in de bouw en daarna in elk jaar onderhoud. Waar het stopt te kloppen, is bij zware graphics, diepe integratie met hardware of het besturingssysteem en apps die een zeer hoge framerate moeten vasthouden. Daar is volledig native in Kotlin de betere keuze, en dat zeggen we liever aan het begin dan halverwege.",
            "Het minst zichtbare deel van een Android app laten ontwikkelen is meestal de koppeling met wat je al draait. Je CRM, ERP of boekhouding sluiten we aan via een eigen API op Node.js en PostgreSQL, met Supabase waar dat sneller tot een werkende versie leidt.",
          ],
        },
        {
          heading: "Google Play: tracks, gefaseerde uitrol en het jaarlijkse API-niveau",
          body: [
            "Een app voor Google Play laten bouwen verloopt anders dan bij Apple. Je publiceert via tracks: intern voor je eigen team, gesloten voor een testgroep, open voor iedereen die wil meedoen, en pas daarna productie. Testers installeren de app gewoon uit de Play Store, zonder losse bestanden of omwegen.",
            "Een release kun je gefaseerd uitrollen: eerst een deel van je gebruikers, dan de rest, met de mogelijkheid om te stoppen als de crashcijfers de verkeerde kant op gaan. Google vraagt daarnaast een ingevuld dataveiligheidsformulier, een privacybeleid en een app bundle die via Play ondertekend wordt.",
            "Elk jaar verhoogt Google het minimale API-niveau waarop je app moet richten. Doe je daar niets mee, dan wordt de app op termijn niet meer aan nieuwe gebruikers getoond. Onderhoud is bij Android dus geen extra service, maar de voorwaarde om in de store te blijven staan.",
          ],
        },
        {
          heading: "Testen op toestellen die mensen echt gebruiken",
          body: [
            "Emulators tonen je een lay-out, geen werkelijkheid. We testen op echte toestellen van de merken en versies die je gebruikers hebben, en we kijken mee terwijl mensen de app gebruiken in plaats van pas na de lancering te horen wat er schuurt.",
            "Crashrapportage staat aan vanaf de eerste build, met toestel, Android-versie en scherm erbij. Loopt er iets mis voor een deel van je gebruikers, dan weet je meteen voor welk deel.",
          ],
        },
      ],
      checklist: {
        title: "Wat we vastleggen voor de bouw",
        items: [
          "Welke Android-versies en toestelklassen je gebruikers echt hebben",
          "Wat de app offline moet kunnen en wanneer hij synchroniseert",
          "Welke meldingen je stuurt en waarom iemand ze aan laat staan",
          "Welke systemen de app uitleest en bijwerkt",
          "Wie de Google Play Console beheert en op wiens naam die staat",
          "De uitrol: interne track, gesloten test, dan productie",
        ],
      },
      faq: [
        {
          question: "Kunnen we met alleen Android starten?",
          answer:
            "Ja, en soms is dat de verstandigste eerste stap. Omdat we in React Native bouwen, zit de iOS-versie al in dezelfde codebase en kan die later volgen zonder dat het werk opnieuw begint.",
        },
        {
          question: "Op welke Android-versies draait de app?",
          answer:
            "Dat spreken we vooraf af op basis van wie je gebruikers zijn, want elke oudere versie die je meeneemt, kost extra ontwikkel- en testtijd. Het doel is een ondergrens die je publiek dekt zonder dat een handvol oude toestellen de rest van de bouw bepaalt.",
        },
        {
          question: "Hoe krijgen mijn testers de app te pakken?",
          answer:
            "Via de testtracks van Google Play: je eigen team op de interne track en een bredere groep op een gesloten test. Ze installeren de app dan uit de Play Store zoals elke andere app, zonder losse bestanden.",
        },
        {
          question: "Werkt de app zonder internetverbinding?",
          answer:
            "Als je gebruikers dat nodig hebben, bouwen we hem offline-first: gegevens staan lokaal op het toestel en synchroniseren zodra er weer netwerk is. Voor buitendienst, magazijnen en kelders is dat meestal de kern van de app en geen extraatje.",
        },
        {
          question: "Moeten we de app echt elk jaar updaten?",
          answer:
            "In de praktijk wel. Google verhoogt jaarlijks het API-niveau waarop apps moeten richten en apps die achterblijven, worden niet meer aan nieuwe gebruikers getoond, dus we spreken een onderhoudsritme af zodra de app live staat.",
        },
        {
          question: "Wat kost een Android-app?",
          answer:
            "Dat hangt af van het aantal schermen, de koppelingen en hoe breed het toestellenbereik moet zijn dat je ondersteunt. Na een gratis kennismaking van 30 minuten krijg je een vaste prijs per fase met een scope die op papier staat, geen open einde.",
        },
      ],
    },
    en: {
      metaTitle: "Android app development for Google Play",
      metaDescription:
        "Android app development that survives real devices: React Native, Google Play test tracks and a fixed price per phase. 150+ projects, a reply within 24 hours.",
      h1: "Android app development that holds up on real devices",
      lead: "Android app development is not one phone, it is a range. Your app runs on hardware from dozens of manufacturers, on screens from small handsets to foldables, on OS versions several years apart, and on battery settings that behave differently per brand. That range is most of the job.",
      sections: [
        {
          heading: "Fragmentation is most of the job",
          body: [
            "On iOS you test a handful of screen sizes. On Android you test a spread: low-memory devices, large handsets running a manufacturer skin over Android, foldables and tablets. Something that scrolls smoothly on one brand can stutter on another because that manufacturer aggressively kills background work to save battery.",
            "So the first decision is scope: which OS versions and which classes of device your users actually carry. Every extra generation you support is real testing time, and pretending otherwise is how Android projects overrun.",
            "Background behaviour deserves its own attention. If your app has to sync on a schedule or deliver a notification at a specific moment, it has to survive a battery optimiser that was never designed with your app in mind.",
          ],
        },
        {
          heading: "One codebase, two stores",
          body: [
            "We build with React Native and Expo in TypeScript, which gives you iOS and Android from one codebase. Shared logic is written once, while the platform differences that matter get handled properly on each side: the system back gesture, the share sheet, and the way Android asks for notification permission.",
            "For most business apps that is where the money is saved, twice: once in the build and again in every year of maintenance. Where it stops making sense is heavy graphics, deep hardware or OS integration, and work that has to hold a very high frame rate — there a fully native Kotlin build is the better answer, and we would rather say so at the start than halfway.",
            "The unglamorous half of the project is usually the connection to what you already run. We build that as your own API on Node.js and PostgreSQL, with Supabase where it reaches a working version faster, so the app reads and writes real data instead of a demo set.",
          ],
        },
        {
          heading: "Google Play: tracks, staged rollout and the yearly API bump",
          body: [
            "Publishing a Google Play app runs on tracks rather than a single submission: an internal track for your own team, a closed track for a test group, an open track for anyone who wants in, and then production. Testers install from the Play Store like any other app, which removes a whole category of excuses.",
            "Releases can go out in stages — a share of your users first, then the rest, with the option to halt if crash numbers move the wrong way. Google also asks for a completed data safety form, a privacy policy and an app bundle signed through Play.",
            "Every year Google raises the minimum API level an app has to target. Ignore it and the app eventually stops being offered to new users. Maintenance on Android is not an upsell, it is the condition for staying listed.",
          ],
        },
        {
          heading: "Testing on hardware people actually own",
          body: [
            "Emulators show you a layout, not reality. We test on physical devices from the brands and OS versions your users carry, and we watch real people use the app before launch rather than hearing about the friction afterwards.",
            "Crash reporting is on from the first build and records device, OS version and screen. When something breaks for a slice of your users, you know exactly which slice.",
          ],
        },
      ],
      checklist: {
        title: "What we pin down before the build",
        items: [
          "The OS versions and device classes your users actually carry",
          "What has to work offline, and when it syncs",
          "Which notifications you send, and why someone would leave them on",
          "The systems the app reads from and writes to",
          "Who owns the Google Play Console account",
          "The release path: internal track, closed test, then production",
        ],
      },
      faq: [
        {
          question: "Can we launch on Android only?",
          answer:
            "Yes, and sometimes that is the sensible first step. Because we build in React Native, the iOS version already lives in the same codebase and can follow whenever you are ready, without starting the work again.",
        },
        {
          question: "Which Android versions will the app support?",
          answer:
            "We agree that up front based on who your users are, because every older version you keep costs extra development and testing time. The aim is a floor that covers your audience without letting a handful of old devices dictate the whole build.",
        },
        {
          question: "How do my testers get the app?",
          answer:
            "Through Google Play's test tracks: your own team on the internal track and a wider group on a closed test. They install it from the Play Store like any other app, with no files to sideload.",
        },
        {
          question: "Does the app work without a connection?",
          answer:
            "If your users need that, we build it offline-first, keeping data on the device and syncing as soon as the network returns. For field staff, warehouses and basements that is usually the point of the app rather than a nice extra.",
        },
        {
          question: "Do we really have to update the app every year?",
          answer:
            "In practice, yes. Google raises the target API level annually and apps that fall behind stop being served to new users, so we agree a maintenance rhythm as soon as the app is live.",
        },
        {
          question: "What does an Android app cost?",
          answer:
            "It depends on the number of screens, the integrations and how wide a device range you need to support. After a free 30-minute intro call you get a fixed price per phase with the scope written down, not an open-ended estimate.",
        },
      ],
    },
  },

  "klantenportaal-laten-maken": {
    nl: {
      metaTitle: "Klantenportaal laten maken op maat",
      metaDescription:
        "Klantenportaal laten maken waar klanten hun dossiers, facturen en aanvragen zelf regelen, gekoppeld aan je eigen systemen. Antwoord binnen 24 uur.",
      h1: "Een klantenportaal laten maken dat werk uit je inbox haalt",
      lead: "De meeste bedrijven willen een klantenportaal laten maken om dezelfde reden: elke week komen dezelfde vragen binnen via mail en telefoon, en het antwoord staat al ergens in een systeem. Een portaal geeft je klanten rechtstreeks toegang tot dat antwoord, met de juiste rechten en zonder dat iemand iets moet doorsturen.",
      sections: [
        {
          heading: "Begin bij rollen, niet bij schermen",
          body: [
            "Een portaal valt of staat bij de vraag wie wat mag zien. Achter één klant zitten vaak meerdere gebruikers met verschillende rechten: een zaakvoerder die alle facturen ziet, een medewerker die alleen zijn eigen dossiers opent en een boekhouder die enkel de financiële kant nodig heeft.",
            "Die rollenstructuur bepaalt het datamodel, en een datamodel is het enige dat je later niet goedkoop omgooit. Wil je een medewerkersportaal laten bouwen in plaats van een klantomgeving, dan verschuift dezelfde vraag naar binnen: teams, afdelingen en wie iets mag goedkeuren. Een leveranciersportaal laten ontwikkelen draait dan weer om orders, leveringen en documenten die van twee kanten komen.",
            "We leggen die rollen vast voor er één scherm ontworpen wordt en bouwen de rechten daarna af op databaseniveau in PostgreSQL. Een gebruiker kan de gegevens van een ander dus niet opvragen door aan de URL te sleutelen, omdat de regel onder het scherm zit en niet erin.",
          ],
        },
        {
          heading: "Een portaal is zo goed als de koppeling eronder",
          body: [
            "Een portaal dat zijn gegevens niet uit je bestaande systemen haalt, wordt een tweede administratie. Dan typt iemand facturen over, en binnen een maand zijn er twee lijsten die het oneens zijn over de waarheid.",
            "We koppelen daarom rechtstreeks aan wat je al draait: je ERP, je CRM, je boekhoudpakket of een eigen database, via een API op Node.js en PostgreSQL. Supabase zetten we in waar dat sneller tot een werkende versie leidt, met authenticatie en rechten die er al in zitten.",
            "Wat het portaal toont, komt dus uit de bron. Wat een klant indient, landt in het systeem waar je collega's toch al werken, en niet in een apart postvak vol formuliermeldingen.",
          ],
        },
        {
          heading: "Wat mensen er echt in doen",
          body: [
            "De inhoud verschilt per sector, het patroon zelden: documenten en facturen ophalen, de status van een dossier of levering bekijken, een aanvraag indienen en de opvolging ervan volgen, en de eigen gegevens aanpassen. Elk van die vier haalt een terugkerende mail weg bij iemand van je team.",
            "Sommige klanten willen geen los systeem, maar een website met ledenomgeving laten maken: de publieke pagina's blijven wat ze zijn en alles daarachter zit achter een login. Je kunt ook eerst een besloten omgeving laten bouwen voor één doelgroep en pas uitbreiden zodra die groep hem effectief gebruikt.",
            "Op mobiel werkt een portaal meestal prima als website. Wil je pushnotificaties, offline toegang of een plek op het startscherm, dan bouwen we er met React Native een app bovenop die op dezelfde API draait.",
          ],
        },
        {
          heading: "Veiligheid en dagelijks beheer",
          body: [
            "Inloggen met e-mail, magic link of een bestaand account, tweestapsverificatie waar dat hoort, en een logboek van wie wat wanneer opende. Bij persoonsgegevens is dat de basislijn van de GDPR en geen duurdere variant.",
            "Het beheer doe je zelf: gebruikers uitnodigen, rechten aanpassen, iemand blokkeren. Dat beheerscherm bouwen we mee, want een portaal waarvoor je ons moet mailen om een gebruiker toe te voegen, is een portaal dat stilaan niemand meer gebruikt. We bouwen dat soort omgevingen voor organisaties als NMBS, De Watergroep en IDEWE, en evengoed voor kmo's met tien mensen.",
          ],
        },
      ],
      checklist: {
        title: "Wat we in het eerste gesprek uitzoeken",
        items: [
          "Welke rollen er zijn en wat elke rol precies mag zien",
          "Uit welke systemen de gegevens komen",
          "Wat een klant zelf moet kunnen indienen of wijzigen",
          "Hoe mensen inloggen en wie de accounts beheert",
          "Wat er gebeurt als iemand vertrekt of van rol verandert",
          "Of er een mobiele app bovenop moet komen",
        ],
      },
      faq: [
        {
          question: "Hoelang duurt het om een klantenportaal te bouwen?",
          answer:
            "Het aantal rollen en koppelingen bepaalt de doorlooptijd veel sterker dan het aantal schermen. We werken in fases met een vaste prijs per fase, zodat je na de eerste fase een werkende versie ziet in plaats van een planning.",
        },
        {
          question: "Kan het portaal gekoppeld worden aan ons ERP of CRM?",
          answer:
            "Ja, en dat is meestal net het punt van een portaal. Heeft je systeem een API, dan sluiten we daar rechtstreeks op aan; heeft het die niet, dan kiezen we samen een aanpak die over drie jaar nog houdbaar is.",
        },
        {
          question: "Wie beheert de gebruikers?",
          answer:
            "Dat doe je zelf, via een beheerscherm dat we als onderdeel van het portaal bouwen. Je nodigt mensen uit, past rechten aan en blokkeert accounts zonder ons daarvoor nodig te hebben.",
        },
        {
          question: "Is een portaal veilig genoeg voor gevoelige gegevens?",
          answer:
            "Rechten leggen we vast op databaseniveau, het verkeer is versleuteld, tweestapsverificatie wordt ondersteund en toegang wordt gelogd. Welke gegevens je bewaart en hoelang, beslissen we samen binnen wat de GDPR toelaat.",
        },
        {
          question: "Kan het portaal ook als app op de telefoon?",
          answer:
            "Dat kan. Het portaal zelf werkt als website op mobiel, en waar pushnotificaties of offline toegang nodig zijn, bouwen we met React Native een app op dezelfde API.",
        },
        {
          question: "Wat als we later van partner veranderen?",
          answer:
            "De code, het ontwerp en de database zijn jouw eigendom en je krijgt de volledige repository. We bouwen op standaardtechnologie zoals TypeScript, Node.js en PostgreSQL, precies zodat een ander team ermee verder kan.",
        },
      ],
    },
    en: {
      metaTitle: "Customer portal development",
      metaDescription:
        "Customer portal development that takes work out of your inbox: invoices, documents and requests, connected to the systems you already run. Reply in 24 hours.",
      h1: "Customer portal development that takes work out of your inbox",
      lead: "Most customer portal development starts from the same complaint: the same questions arrive by email every week, and the answer is already sitting in a system somewhere. A portal hands that answer to the customer directly, with the right permissions and without anyone forwarding anything.",
      sections: [
        {
          heading: "Roles first, screens second",
          body: [
            "Who may see what is the decision the whole build rests on. One customer account usually means several people with different rights: an owner who sees every invoice, a staff member who only opens their own cases, an accountant who needs the financial side and nothing else.",
            "That structure shapes the data model, and the data model is the one thing you cannot cheaply change later. An employee portal turns the same question inward — teams, departments, who is allowed to approve — while a supplier portal runs on orders, deliveries and documents moving in both directions.",
            "We enforce those permissions in PostgreSQL itself rather than only in the interface. A user cannot pull another account's data by editing a URL, because the rule lives underneath the screen instead of inside it.",
          ],
        },
        {
          heading: "A portal is only as good as what it connects to",
          body: [
            "A portal that does not read from your existing systems quietly becomes a second administration. Someone starts retyping invoices, and within a month two lists disagree about the truth.",
            "So we connect to what you already run — ERP, CRM, accounting, or your own database — through an API on Node.js and PostgreSQL, using Supabase where it gets to a working version faster.",
            "What the portal shows comes from the source. What a customer submits lands in the system your colleagues already work in, not in a separate inbox filling up with form notifications.",
          ],
        },
        {
          heading: "What people actually do in there",
          body: [
            "The content changes by sector, the pattern rarely does: pull documents and invoices, check the status of a case or a delivery, submit a request and follow it, update their own details. Each of those four removes a recurring email from someone's day.",
            "Sometimes what you want is not a separate system but a members area behind the site you already have, with the public pages unchanged and everything else behind a login. Starting with a private client area for one group and widening it once that group actually uses it is often the cheaper route.",
            "On mobile, a portal is usually fine as a website. When you need push notifications, offline access or a place on the home screen, we add a React Native app on top of the same API.",
          ],
        },
        {
          heading: "Security and day-to-day admin",
          body: [
            "Email, magic link or an existing account for sign-in, two-factor where it belongs, and a log of who opened what and when. With personal data that is the GDPR baseline rather than a premium tier.",
            "You run the admin yourself: invite users, change permissions, block an account. We build that screen as part of the portal, because a portal where adding a user means emailing your agency is a portal people quietly stop using. We build these environments for organisations such as NMBS, De Watergroep and IDEWE, and just as often for a company of ten people.",
          ],
        },
      ],
      checklist: {
        title: "What we work out in the first call",
        items: [
          "Every role, and exactly what each one may see",
          "Which systems the data comes from",
          "What a customer must be able to submit or change themselves",
          "How people sign in, and who manages the accounts",
          "What happens when someone leaves or changes role",
          "Whether a mobile app belongs on top of it",
        ],
      },
      faq: [
        {
          question: "How long does a customer portal take to build?",
          answer:
            "The number of roles and integrations drives the timeline far more than the number of screens. We work in phases with a fixed price per phase, so you see a working version after the first one instead of a plan.",
        },
        {
          question: "Can the portal connect to our ERP or CRM?",
          answer:
            "Yes, and that is usually the entire point of building one. If your system has an API we connect to it directly, and if it does not, we agree on an approach that will still hold up in three years.",
        },
        {
          question: "Who manages the users?",
          answer:
            "You do, through an admin screen we build as part of the portal. You invite people, change their permissions and block accounts without involving us.",
        },
        {
          question: "Is a portal safe enough for sensitive data?",
          answer:
            "Permissions are enforced in the database, traffic is encrypted, two-factor authentication is supported and access is logged. Which data you store and for how long is a decision we make together, within what the GDPR allows.",
        },
        {
          question: "Can the portal also be a mobile app?",
          answer:
            "It can. The portal itself works as a website on a phone, and where push notifications or offline access matter we build a React Native app on the same API.",
        },
        {
          question: "What happens if we change agency later?",
          answer:
            "You own the code, the design and the database, and you receive the full repository. We build on standard technology such as TypeScript, Node.js and PostgreSQL precisely so another team can pick it up.",
        },
      ],
    },
  },

  "e-learning-platform-laten-maken": {
    nl: {
      metaTitle: "E-learning platform laten maken op maat",
      metaDescription:
        "E-learning platform laten maken met je eigen cursusstructuur, voortgang, certificaten en betalingen via Stripe. 150+ projecten, antwoord binnen 24 uur.",
      h1: "Een e-learning platform laten maken dat cursisten afmaken",
      lead: "Een e-learning platform laten maken is voor een groot deel een contentprobleem in een technisch jasje. Hoe je materiaal is opgebouwd, wie het beheert en wat iemand moet doorlopen voor je hem laat slagen: als dat vastligt, is de bouw de makkelijke helft.",
      sections: [
        {
          heading: "Het contentmodel bepaalt alles wat erna komt",
          body: [
            "Een leerplatform op maat begint bij de vorm van je materiaal: opleidingen, modules, lessen, oefeningen, en de vraag of iemand vrij mag rondspringen of stap voor stap moet doorlopen. Die ene keuze stuurt de navigatie, de voortgangsmeting en de rapportage die je een jaar later wil.",
            "Daarna komt de vraag wie content maakt. Beheer je alles zelf, dan volstaat een strak beheerscherm. Werk je met externe lesgevers, dan heb je rollen, een revisiestap en een publicatiemoment nodig, en dat is een wezenlijk grotere bouw.",
            "We leggen dat model vast voor er een scherm ontworpen wordt, want een cursusstructuur omgooien als er al duizend onderdelen in staan, is de duurste correctie die er in dit soort projecten bestaat.",
          ],
        },
        {
          heading: "Voortgang, toetsing en certificaten",
          body: [
            "Voortgang is meer dan een percentage. Waar iemand gestopt is, wat afgewerkt is, wat blijft openstaan, en wat die persoon ziet als hij twee maanden later terugkomt op een tablet in plaats van een laptop. Dat per cursist en per toestel bijhouden, is een van de eerste dingen die we bouwen.",
            "Toetsing kan van meerkeuzevragen tot ingediend werk gaan, met een slagingsdrempel die jij bepaalt. Certificaten genereren we automatisch bij het behalen ervan, met een verwijzing die achteraf controleerbaar blijft.",
            "Bedrijven die een opleidingsplatform laten ontwikkelen voor hun eigen mensen, willen daar bijna altijd een tweede blik op: rapportage per team, wie nog moet starten, en wanneer een verplichte opleiding vervalt.",
          ],
        },
        {
          heading: "Verkopen of intern uitrollen",
          body: [
            "Je kunt een online cursusplatform laten bouwen dat je aan je publiek verkoopt, met losse cursussen, bundels of een abonnement. Betalingen lopen dan via Stripe, inclusief terugkerende facturatie en toegang die automatisch start en stopt.",
            "Rol je intern uit, dan verdwijnt de kassa en komt er iets moeilijkers voor in de plaats: koppelen aan je personeelsbestand, mensen automatisch in de juiste opleiding zetten en herinneren wie nog niet begonnen is. Dezelfde codebase, een andere voordeur.",
            "Video is in beide gevallen de zwaarste post. We zetten video niet op de applicatieserver zelf, maar bij een dienst die adaptief streamt, zodat een les niet hapert op een matige verbinding.",
          ],
        },
        {
          heading: "Leren gebeurt op een telefoon",
          body: [
            "Mensen leren in de gaten van hun dag, op een toestel dat wij niet kiezen. Het platform is daarom vanaf het eerste scherm responsief, met een speler en oefeningen die op telefoonbreedte werken en niet alleen in een demo op een groot scherm.",
            "Is offline leren echt belangrijk, bijvoorbeeld voor mensen onderweg of op locaties zonder bereik, dan zetten we er met React Native een app bovenop die op dezelfde API draait. Lessen worden dan gedownload en de voortgang synchroniseert zodra er weer verbinding is.",
            "Toegankelijkheid hoort in hetzelfde gesprek: voldoende contrast, ondertitels bij video en oefeningen die je met een toetsenbord of met een schermlezer kunt doorlopen. Voor een opleiding die verplicht is voor je hele personeelsbestand, is dat geen luxe maar de voorwaarde om iedereen te bereiken. We nemen die eisen mee in het ontwerp in plaats van er achteraf een controleronde op te plakken, want dan wordt het duur.",
          ],
        },
      ],
      checklist: {
        title: "Wat we vastleggen voor de bouw",
        items: [
          "Hoe je materiaal gestructureerd is: opleiding, module, les",
          "Wie content schrijft en wie publiceert",
          "Hoe je voortgang meet en wanneer iemand geslaagd is",
          "Of je verkoopt, intern uitrolt, of allebei",
          "Waar de video staat en hoe hij afspeelt",
          "Welke rapportage je nodig hebt en wie ze leest",
        ],
      },
      faq: [
        {
          question: "Waarom een eigen platform en geen bestaand cursusplatform?",
          answer:
            "Een bestaand platform wint als je materiaal in hun structuur past en je met hun betaalregels en hun merk kunt leven. Zodra je eigen leerpaden nodig hebt, een koppeling met je HR- of ledenadministratie, of een product dat er als het jouwe uitziet, wordt maatwerk goedkoper dan een tool eindeloos oprekken.",
        },
        {
          question: "Kunnen cursisten offline verder leren?",
          answer:
            "In de webversie niet volledig, in een mobiele app wel. Die bouwen we met React Native op dezelfde API, zodat lessen naar het toestel gedownload worden en de voortgang synchroniseert zodra er weer netwerk is.",
        },
        {
          question: "Kan ik cursussen verkopen via het platform?",
          answer:
            "Ja, als losse aankoop, als bundel of als abonnement, met betalingen via Stripe. Toegang wordt automatisch toegekend bij betaling en stopt netjes als een abonnement afloopt.",
        },
        {
          question: "Kunnen externe lesgevers zelf materiaal plaatsen?",
          answer:
            "Dat kan, en het is een bewuste scopekeuze. Je krijgt dan rollen, een revisiestap en een publicatiemoment, wat het platform merkbaar groter maakt dan wanneer jij het beheer volledig zelf doet.",
        },
        {
          question: "Kan het platform gekoppeld worden aan onze bestaande systemen?",
          answer:
            "Ja, via een API op Node.js en PostgreSQL sluiten we aan op je HR-systeem, je ledenadministratie of je CRM. Cursisten hoeven dan niet twee keer aangemaakt te worden en je rapportage klopt met de rest van je administratie.",
        },
        {
          question: "Wat gebeurt er met ons bestaande cursusmateriaal?",
          answer:
            "Bestaande teksten, video's en oefeningen nemen we mee in het contentmodel in plaats van opnieuw te beginnen. In het eerste gesprek bekijken we in welke vorm je materiaal nu staat en wat er nodig is om het over te zetten.",
        },
      ],
    },
    en: {
      metaTitle: "E-learning platform development",
      metaDescription:
        "E-learning platform development with your own course structure, progress tracking, certificates and Stripe payments. 150+ projects, a reply within 24 hours.",
      h1: "E-learning platform development that people finish",
      lead: "Most e-learning platform development is a content problem wearing a technical costume. How your material is structured, who maintains it, and what someone has to complete before you call them qualified — settle those and the build becomes the straightforward half.",
      sections: [
        {
          heading: "The content model decides everything downstream",
          body: [
            "A custom learning platform starts with the shape of your material: programmes, modules, lessons, exercises, and whether someone can move freely or has to go in order. That single choice drives the navigation, the progress tracking and the reports you will want a year from now.",
            "Then: who creates the content. If you maintain everything yourself, a clean admin screen is enough. Bring in external trainers and you need roles, a review step and a publish moment, which is a materially bigger build.",
            "We settle that model before any screen is designed, because restructuring a course tree with a thousand items already in it is the most expensive correction in this kind of project.",
          ],
        },
        {
          heading: "Progress, assessment and certificates",
          body: [
            "Progress is more than a percentage bar. Where someone stopped, what is complete, what is still open, and what they see when they come back two months later on a tablet instead of a laptop. Tracking that per learner and per device is one of the first things we build.",
            "Assessment ranges from multiple choice to submitted work, with a pass threshold you set. Certificates are generated on completion and stay verifiable afterwards.",
            "A training platform run for your own staff almost always needs a second view on all of it: reporting per team, who has not started, and when a mandatory course expires.",
          ],
        },
        {
          heading: "Selling courses or rolling out internally",
          body: [
            "An online course platform aimed at the public needs a checkout: single courses, bundles or a subscription, with payments through Stripe, recurring billing and access that starts and stops on its own.",
            "Roll out internally and the checkout disappears, replaced by something harder: connecting to your staff records, enrolling people automatically and reminding the ones who never started. Same codebase, different front door.",
            "Video is the heaviest part either way. We do not serve it from the application server but through a service that streams adaptively, so a lesson does not stall on a mediocre connection.",
          ],
        },
        {
          heading: "Learning happens on a phone",
          body: [
            "People learn in the gaps in their day, on a device you do not get to choose. The platform is responsive from the first screen, with a player and exercises that work at phone width rather than only in a demo on a large monitor.",
            "When offline learning genuinely matters — people travelling, sites without coverage — we put a React Native app on the same API, so lessons download to the device and progress syncs once the connection comes back.",
            "Accessibility belongs in the same conversation: enough contrast, captions on video, and exercises you can complete with a keyboard or a screen reader. When a course is mandatory for everyone on the payroll, that is not a nice-to-have, it is the condition for reaching all of them. We design for it from the first screen rather than running an audit at the end, which is both cheaper and less painful.",
          ],
        },
      ],
      checklist: {
        title: "What we settle before building",
        items: [
          "How your material is structured: programme, module, lesson",
          "Who writes the content and who publishes it",
          "How progress is measured and what counts as passing",
          "Whether you sell, roll out internally, or both",
          "Where the video lives and how it plays",
          "The reporting you need, and who reads it",
        ],
      },
      faq: [
        {
          question: "Why build our own platform instead of using an existing one?",
          answer:
            "An off-the-shelf platform wins when your material fits their structure and you can live with their payment rules and their branding. Once you need your own learning paths, a connection to your HR or membership system, or a product that looks like yours, building it costs less than stretching a tool that was never meant to bend that far.",
        },
        {
          question: "Can learners study offline?",
          answer:
            "Not fully in the browser, but yes in a mobile app. We build it with React Native on the same API, so lessons download to the device and progress syncs once the connection returns.",
        },
        {
          question: "Can we sell courses through the platform?",
          answer:
            "Yes, as single purchases, bundles or subscriptions through Stripe. Access is granted automatically on payment and ends cleanly when a subscription lapses.",
        },
        {
          question: "Can external trainers publish their own material?",
          answer:
            "They can, and it is a deliberate scope decision. It adds roles, a review step and a publishing flow, which makes the platform noticeably larger than one you maintain yourself.",
        },
        {
          question: "Can the platform connect to the systems we already use?",
          answer:
            "Yes. Through an API on Node.js and PostgreSQL we connect to your HR system, membership database or CRM, so learners are not created twice and your reporting matches the rest of your administration.",
        },
        {
          question: "What happens to the course material we already have?",
          answer:
            "We take your existing text, video and exercises into the content model rather than starting over. In the first call we look at the form your material is in now and what moving it across actually involves.",
        },
      ],
    },
  },

  "bedrijfsapp-laten-ontwikkelen": {
    nl: {
      metaTitle: "Bedrijfsapp laten ontwikkelen voor je team",
      metaDescription:
        "Bedrijfsapp laten ontwikkelen die offline werkt, koppelt aan je systemen en je team tijd wint. React Native voor iOS en Android. Antwoord binnen 24 uur.",
      h1: "Een bedrijfsapp laten ontwikkelen die je team ook echt gebruikt",
      lead: "Een bedrijfsapp laten ontwikkelen heeft één eerlijke test: opent er in week drie nog iemand de app. Interne apps mislukken zelden op techniek en bijna altijd op wrijving, zoals te veel schermen, een login die te vaak opnieuw vraagt of een formulier dat op de laptop sneller ging.",
      sections: [
        {
          heading: "Bouw voor de omstandigheden, niet voor het kantoor",
          body: [
            "Een mobiele app voor medewerkers wordt gebruikt met één hand, met handschoenen aan, in een bestelwagen, in fel zonlicht of in een kelder zonder bereik. Dat is een ander ontwerpprobleem dan een dashboard op een scherm van 27 inch, en je ziet meteen wanneer iemand die stap heeft overgeslagen.",
            "Wil je een app laten maken voor buitendienst, dan is offline werken geen extraatje maar het uitgangspunt. Gegevens staan lokaal op het toestel, werkbonnen en foto's worden vastgelegd zonder netwerk en synchroniseren zodra er weer verbinding is. Wat er gebeurt als twee mensen hetzelfde item hebben aangepast, spreken we vooraf af in plaats van het op het bord van de gebruiker te leggen.",
            "Grote knoppen, weinig velden per scherm en scannen in plaats van typen. Een barcode scannen duurt een seconde, hetzelfde nummer intypen op een telefoon duurt twintig en levert fouten op.",
          ],
        },
        {
          heading: "De app is het venster, je systemen zijn de bron",
          body: [
            "Een interne app heeft zelden een eigen waarheid. Hij toont opdrachten uit je planning, werkt je ERP bij, hangt foto's aan een dossier in je CRM of stuurt uren door naar je boekhouding.",
            "Die laag bouwen we als een eigen API op Node.js en PostgreSQL, met Supabase waar dat sneller tot een werkende versie leidt. De app blijft daardoor dun en je bedrijfslogica staat op één plek, wat een webversie of een tweede app later goedkoop maakt.",
            "Als app ontwikkelbureau zien we net dat deel het vaakst onderschat worden in een begroting. Het komt op geen enkele screenshot voor en er gaat het meeste denkwerk in.",
          ],
        },
        {
          heading: "Uitrollen zonder publieke storelisting",
          body: [
            "Een interne app hoeft niet publiek te staan. Je kunt een interne app laten maken die je verdeelt via de interne of gesloten testtracks van Google Play, of via TestFlight bij Apple, zodat alleen je eigen mensen hem installeren.",
            "Wil je meer controle, dan ondersteunt Apple Business Manager privédistributie en kan een beheeroplossing de app rechtstreeks op bedrijfstoestellen zetten. Welke route past, hangt af van hoeveel toestellen je beheert en of het bedrijfstoestellen of eigen telefoons zijn.",
            "Die keuze maken we vroeg, want ze bepaalt hoe updates bij je mensen raken en hoe snel een fix op de baan staat.",
          ],
        },
        {
          heading: "Wat het oplevert",
          body: [
            "De winst zit in dubbel werk dat verdwijnt: één keer registreren in plaats van eerst op papier en daarna in een systeem, een status die de collega aan de telefoon meteen ziet, en een planning die klopt omdat iedereen ze uit dezelfde bron leest.",
            "We bouwen in fases met een vaste prijs per fase, zodat de eerste fase eindigt met een werkende app op je toestel en niet met een planning. We werken voor organisaties als NMBS, De Watergroep en IDEWE, en evengoed voor bedrijven met tien mensen op de baan.",
            "Wil je het resultaat meten, meet dan iets eenvoudigs: hoeveel opdrachten er per dag in de app afgerond worden, hoeveel telefoontjes met de vraag naar een status wegvallen, en hoeveel mensen de app na een maand nog dagelijks openen. Dat zijn cijfers die je zelf kunt lezen, zonder dat wij ze voor je moeten uitleggen.",
          ],
        },
      ],
      checklist: {
        title: "Waar we mee beginnen",
        items: [
          "De drie taken die je mensen het vaakst doen",
          "Wat de app offline moet kunnen en wanneer hij synchroniseert",
          "Welke systemen de app uitleest en bijwerkt",
          "Hoe mensen inloggen, en hoe vaak opnieuw",
          "Bedrijfstoestellen of eigen telefoons",
          "Hoe je de app verdeelt en updates uitrolt",
        ],
      },
      faq: [
        {
          question: "Moet zo'n app in de App Store en Google Play staan?",
          answer:
            "Niet noodzakelijk. Interne apps verdelen we vaak via TestFlight, de interne tracks van Google Play of privédistributie met Apple Business Manager, zodat alleen je eigen mensen de app kunnen installeren.",
        },
        {
          question: "Werkt de app zonder bereik?",
          answer:
            "Als je werk dat vraagt, bouwen we hem offline-first: gegevens en formulieren blijven op het toestel en synchroniseren zodra er weer netwerk is. We spreken ook vooraf af wat er gebeurt als twee mensen hetzelfde item hebben aangepast.",
        },
        {
          question: "Kan de app koppelen aan ons ERP of planningssysteem?",
          answer:
            "Ja, via een eigen API op Node.js en PostgreSQL sluiten we aan op de systemen die je al draait. De app blijft daardoor dun en je bedrijfslogica staat op één plek in plaats van dubbel per platform.",
        },
        {
          question: "Krijgen we iOS en Android allebei?",
          answer:
            "Standaard wel, omdat React Native en Expo beide platformen uit één codebase leveren. Draait je team volledig op één merk toestellen, dan kun je daar starten en het andere platform later toevoegen zonder opnieuw te bouwen.",
        },
        {
          question: "Hoe zorgen jullie dat mensen de app ook echt gebruiken?",
          answer:
            "We bouwen rond de twee of drie taken die je mensen het vaakst doen en laten de rest weg, en we testen voor de uitrol met echte gebruikers op hun eigen toestel. Wrijving die je in een demo niet ziet, zie je binnen tien minuten meekijken wel.",
        },
        {
          question: "Wat als we later willen uitbreiden?",
          answer:
            "Dat is de normale gang van zaken, want we bouwen in fases die elk eindigen met iets dat werkt. Omdat de logica in je eigen API zit, kost een webversie of een tweede app later een fractie van opnieuw beginnen.",
        },
      ],
    },
    en: {
      metaTitle: "Business app development for your team",
      metaDescription:
        "Business app development that works offline, connects to your systems and saves your team time. React Native for iOS and Android. A reply within 24 hours.",
      h1: "Business app development your team keeps using",
      lead: "Business app development has one honest test: is anyone still opening it in week three. Internal apps rarely fail on technology and almost always on friction — too many screens, a login that asks again too often, a form that was quicker on the laptop.",
      sections: [
        {
          heading: "Design for the conditions, not for the office",
          body: [
            "A mobile app for employees gets used one-handed, with gloves on, in a van, in direct sunlight or in a basement with no signal. That is a different design problem from a dashboard on a 27-inch monitor, and it shows within minutes when someone has skipped it.",
            "For an app for field staff, offline is not a feature, it is the premise. Data lives on the device, job sheets and photos are captured without a connection and sync when one returns, and what happens when two people edited the same record is decided up front instead of dropped on the user.",
            "Large targets, few fields per screen, scanning instead of typing. A barcode scan takes a second; typing the same number on a phone takes twenty and introduces mistakes.",
          ],
        },
        {
          heading: "The app is the window, your systems are the source",
          body: [
            "An internal app rarely owns its own truth. It shows jobs from your planning, updates your ERP, attaches photos to a record in your CRM, or pushes hours into your accounting.",
            "We build that layer as your own API on Node.js and PostgreSQL, with Supabase where it reaches a working version faster. The app stays thin and the business logic stays in one place, which is what makes a web version or a second app cheap later on.",
            "As an app development agency, this is the part we most often see underestimated in a budget. It never appears in a screenshot and it takes the most thinking.",
          ],
        },
        {
          heading: "Getting it onto phones without a public listing",
          body: [
            "A tool built for your own staff does not need a public listing at all. It can go out through Google Play's internal and closed test tracks, or through TestFlight on the Apple side, so only your own people can install it.",
            "Where you need more control, Apple Business Manager supports private distribution and a device management setup can push the app straight onto company hardware. Which route fits depends on how many devices you manage and whether they are company phones or personal ones.",
            "We settle that early, because it determines how updates reach people and how fast a fix lands with someone standing on a site.",
          ],
        },
        {
          heading: "What you get back",
          body: [
            "The return is duplicated work disappearing: recorded once instead of on paper and again in a system, a status your colleague on the phone can see immediately, a schedule that holds because everyone reads it from the same source.",
            "We build in phases with a fixed price per phase, so the first phase ends with a working app on your device rather than a plan. We work for organisations such as NMBS, De Watergroep and IDEWE, and just as often for companies with ten people out on the road.",
            "If you want to measure the result, measure something simple: how many jobs get finished in the app each day, how many status phone calls stop coming in, and how many people still open it daily after a month. Those are numbers you can read yourself, without anyone having to interpret them for you.",
          ],
        },
      ],
      checklist: {
        title: "Where we start",
        items: [
          "The three tasks your people do most often",
          "What has to work offline, and when it syncs",
          "The systems the app reads from and writes to",
          "How people sign in, and how often they have to again",
          "Company devices or personal phones",
          "How the app is distributed and updated",
        ],
      },
      faq: [
        {
          question: "Does an internal app have to be in the App Store and Google Play?",
          answer:
            "Not necessarily. Internal apps often go out through TestFlight, Google Play's internal tracks or private distribution via Apple Business Manager, so only your own staff can install them.",
        },
        {
          question: "Will it work without a signal?",
          answer:
            "If your work needs it, we build offline-first: data and forms stay on the device and sync as soon as the network returns. We also agree in advance what happens when two people have edited the same record.",
        },
        {
          question: "Can it connect to our ERP or planning system?",
          answer:
            "Yes. We connect through your own API on Node.js and PostgreSQL, so the app stays thin and the business logic stays in one place instead of being duplicated per platform.",
        },
        {
          question: "Do we get both iOS and Android?",
          answer:
            "By default, yes, because React Native and Expo produce both from one codebase. If your team is entirely on one platform you can start there and add the other later without rebuilding.",
        },
        {
          question: "How do you make sure people actually use it?",
          answer:
            "We build around the two or three tasks your people do most and leave the rest out, then test with real users on their own devices before rollout. Friction a demo hides shows up in ten minutes of watching someone work.",
        },
        {
          question: "What if we want to extend it later?",
          answer:
            "That is the normal path. We build in phases that each end in something working, and because the logic sits in your own API, a web version or a second app costs a fraction of starting again.",
        },
      ],
    },
  },

  "app-laten-maken-kosten": {
    nl: {
      metaTitle: "App laten maken kosten: wat de prijs bepaalt",
      metaDescription:
        "App laten maken kosten: wat de prijs echt bepaalt, van schermen en koppelingen tot storeonderhoud. Vaste prijs per fase na een gratis gesprek van 30 minuten.",
      h1: "App laten maken kosten: waar het geld naartoe gaat",
      lead: "Er staat geen prijs op deze pagina, en dat is geen verkooptruc. Wat een app kost, hangt zo sterk af van wat hij moet doen dat elk bedrag zonder scope niets waard is. Wat we wel kunnen doen, is precies laten zien welke keuzes de rekening bepalen.",
      sections: [
        {
          heading: "Wat de prijs echt beweegt",
          body: [
            "Schermen en rollen. Tien schermen voor één type gebruiker is een ander project dan dezelfde tien schermen voor drie rollen die elk iets anders zien, want elke rol brengt eigen rechten, eigen tests en eigen randgevallen mee.",
            "Offline gedrag en synchronisatie. Een app die altijd online is, haalt gegevens op en toont ze. Een app die offline moet werken, moet gegevens lokaal bewaren, conflicten oplossen en beslissen wat er gebeurt als twee mensen hetzelfde item aanpasten terwijl ze geen verbinding hadden. Die ene eis verschuift een begroting harder dan bijna alles wat hier verder staat.",
            "Pushnotificaties, betalingen en abonnementen. Meldingen vragen een server, segmentatie en per platform de juiste toestemming. Betalingen vragen een keuze tussen Stripe en de in-app aankopen van de stores, en abonnementen brengen verlengingen, opzeggingen en het herstellen van aankopen mee.",
          ],
        },
        {
          heading: "De backend, de stores en de jaren erna",
          body: [
            "Het grootste onzichtbare verschil is of er al een backend ligt. Praat je app met een bestaand systeem met een deftige API, dan bouwen we daarop. Is er niets, dan bouwen we die laag mee op Node.js en PostgreSQL, en dat is een substantieel deel van het project in plaats van een voetnoot.",
            "Dan de stores. Accounts, screenshots, privacygegevens, de reviewrondes bij Apple en de releasetracks bij Google kosten tijd, ook als er niets misgaat. Een offerte die dat weglaat, is niet goedkoper, alleen minder volledig.",
            "En dan het jaar erna. iOS en Android krijgen elk jaar een nieuwe versie, Google verhoogt het API-niveau waarop apps moeten richten en bibliotheken lopen achter. Een app die je niet onderhoudt, werkt nog een tijd en zakt daarna stil weg uit de stores. Reken onderhoud dus mee vanaf het begin.",
          ],
        },
        {
          heading: "Hoe wij prijzen",
          body: [
            "Na een gratis kennismaking van 30 minuten krijg je een vaste prijs per fase, met een scope die op papier staat. Geen uurtje-factuurtje zonder plafond, en geen totaalbedrag voor iets dat we samen nog moeten uitvinden. Je betaalt per fase, telkens na iets dat je kunt openen en testen.",
            "Er bestaat geen vaste mobiele app prijs, en een bureau dat er in het eerste gesprek meteen een noemt, gokt. Zoektermen als app laten maken prijsindicatie leveren daarom zelden een bruikbaar getal op: het antwoord hangt af van jouw schermen, jouw koppelingen en jouw gebruikers.",
            "Vaak is ons eerlijke advies om kleiner te beginnen: één platform in plaats van twee, of een eerste versie rond de drie dingen die je gebruikers echt doen. Een app die live staat, leert je in een maand meer dan een functielijst in een kwartaal.",
          ],
        },
        {
          heading: "Waar je op kunt besparen, en waar niet",
          body: [
            "Besparen werkt op scope: minder schermen, minder rollen, geen offline modus als je gebruikers altijd bereik hebben, één platform bij de start. Dat zijn beslissingen die je later kunt terugdraaien.",
            "De koppeling met je bestaande systemen, testen met echte gebruikers en onderhoud na de lancering zijn dat niet. Het zijn de posten die als eerste sneuvelen om een offerte kleiner te laten lijken, en precies de posten die daarna het duurst blijken.",
          ],
        },
      ],
      checklist: {
        title: "Wat we nodig hebben voor een vaste prijs",
        items: [
          "Wat de app moet doen, in drie zinnen",
          "Wie hem gebruikt en op welke toestellen",
          "Welke systemen hij uitleest of bijwerkt",
          "Of hij offline moet werken",
          "Of er betalingen of abonnementen in zitten",
          "Wanneer de eerste versie live moet staan",
        ],
      },
      faq: [
        {
          question: "Wat kost een app laten maken?",
          answer:
            "Dat hangt af van het aantal schermen en rollen, of de app offline moet werken, of er betalingen in zitten en of er al een backend ligt. Na een gratis gesprek van 30 minuten krijg je een vaste prijs per fase met een scope die op papier staat.",
        },
        {
          question: "Waarom staat er geen richtprijs op deze pagina?",
          answer:
            "Omdat een bedrag zonder scope niets zegt en je er ook bureaus niet mee kunt vergelijken. Een half uur gesprek levert een getal op dat wel over jouw project gaat.",
        },
        {
          question: "Wat moet er in een app laten ontwikkelen offerte staan?",
          answer:
            "Minstens de schermen en rollen, de koppelingen, wat er offline moet werken, wie de storeaccounts beheert en wat er uitdrukkelijk niet in zit. Bij ons staat daar een vaste prijs per fase bij, zodat je weet waar elke fase eindigt.",
        },
        {
          question: "Is één app voor iOS en Android goedkoper dan twee aparte apps?",
          answer:
            "Voor de grote meerderheid van zakelijke apps wel, omdat we met React Native één codebase bouwen die op beide platformen draait. Bij zware graphics, diepe hardware-integratie of een zeer hoge framerate is volledig native de betere keuze, en dan zeggen we dat voor je iets tekent.",
        },
        {
          question: "Kunnen we in fases betalen?",
          answer:
            "Ja, dat is onze standaardmanier van werken. Elke fase heeft een vaste prijs en eindigt met iets dat je kunt zien en testen, zodat je met bewijs in handen beslist of we doorgaan.",
        },
        {
          question: "Wat kost het onderhoud na de lancering?",
          answer:
            "Onderhoud spreken we apart af, op basis van hoe kritisch de app voor je bedrijf is. Reken erop dat een app elk jaar aandacht vraagt voor nieuwe iOS- en Android-versies, storevereisten en bibliotheken, ook als er niets aan de functies verandert.",
        },
      ],
    },
    en: {
      metaTitle: "App development cost: what drives the number",
      metaDescription:
        "App development cost explained: screens and roles, offline sync, payments, the backend and store upkeep. Fixed price per phase after a free 30-minute call.",
      h1: "App development cost: where the money actually goes",
      lead: "There is no price on this page, and that is not a sales tactic. App development cost depends so heavily on what the app has to do that any figure quoted without a scope is noise. What we can do is show you exactly which decisions move the number.",
      sections: [
        {
          heading: "What moves the number",
          body: [
            "Screens and roles. Ten screens for one kind of user is a different project from the same ten screens for three roles that each see something different, because every role brings its own permissions, its own tests and its own edge cases.",
            "Offline behaviour and sync. An always-online app fetches data and shows it. An offline-capable app has to store data on the device, resolve conflicts and decide what happens when two people changed the same record while disconnected. That one requirement moves a budget more than almost anything else on this list.",
            "Push notifications, payments and subscriptions. Notifications need a server, segmentation and the right permission on each platform. Payments need a decision between Stripe and the stores' own in-app purchases, and subscriptions bring renewals, cancellations and purchase restoration with them.",
          ],
        },
        {
          heading: "The backend, the stores and the years after launch",
          body: [
            "The biggest invisible variable is whether a backend already exists. If your app talks to a system with a decent API, we build on it. If there is nothing, we build that layer too, on Node.js and PostgreSQL, and it is a substantial share of the project rather than a footnote.",
            "Then the stores. Accounts, screenshots, privacy declarations, Apple's review rounds and Google's release tracks all cost time even when nothing goes wrong. An app development quote that leaves them out is not cheaper, only less complete.",
            "And then the year after. iOS and Android each ship a major version annually, Google raises the API level apps must target, and libraries drift. An unmaintained app keeps working for a while and then quietly stops being offered to new users, so budget for that from the start.",
          ],
        },
        {
          heading: "How we quote",
          body: [
            "After a free 30-minute intro call you get a fixed price per phase with the scope written down. Not an hourly rate with no ceiling, and not one number for something neither of us has defined yet. You pay per phase, each one ending in something you can open and test.",
            "There is no standard mobile app price, and an agency that names one in the first conversation is guessing. That is why searching for a figure returns ranges wide enough to be useless: the answer depends on your screens, your integrations and your users.",
            "Often the honest advice is to start smaller: one platform instead of two, or a first release built around the three things your users genuinely do. A live app teaches you more in a month than a feature list does in a quarter.",
          ],
        },
        {
          heading: "Where to save, and where not to",
          body: [
            "Scope is where saving works: fewer screens, fewer roles, no offline mode if your users always have signal, one platform at launch. Those are reversible decisions.",
            "The integration with your existing systems, testing with real users and maintenance after launch are not. They are the first items cut to make a quote look smaller, and the most expensive ones to add back afterwards.",
          ],
        },
      ],
      checklist: {
        title: "What we need to quote a fixed price",
        items: [
          "What the app has to do, in three sentences",
          "Who uses it, and on what devices",
          "Which systems it reads from or writes to",
          "Whether it has to work offline",
          "Whether payments or subscriptions are involved",
          "When the first version has to be live",
        ],
      },
      faq: [
        {
          question: "What does an app cost?",
          answer:
            "It depends on the number of screens and roles, whether it has to work offline, whether payments are involved and whether a backend already exists. After a free 30-minute call you get a fixed price per phase with the scope written down.",
        },
        {
          question: "Why is there no indicative price on this page?",
          answer:
            "Because a number without a scope tells you nothing and lets you compare nothing. Half an hour of conversation produces a figure that is actually about your project.",
        },
        {
          question: "What should an app development quote contain?",
          answer:
            "At minimum the screens and roles, the integrations, what has to work offline, who owns the store accounts and what is explicitly out of scope. Ours adds a fixed price per phase, so you know where each phase ends.",
        },
        {
          question: "Is one app for iOS and Android cheaper than two native apps?",
          answer:
            "For the large majority of business apps, yes, because React Native gives us one codebase that ships to both platforms. Heavy graphics, deep hardware integration or a very high frame rate are the exceptions where fully native is worth the extra cost, and we say so before you commit.",
        },
        {
          question: "Can we pay in phases?",
          answer:
            "Yes, that is how we work by default. Each phase carries a fixed price and ends with something you can see and test, so you decide whether to continue with evidence in hand.",
        },
        {
          question: "What does maintenance cost after launch?",
          answer:
            "Maintenance is agreed separately, based on how critical the app is to your business. Expect an app to need attention every year for new iOS and Android releases, store requirements and library updates, even when none of its features change.",
        },
      ],
    },
  },
};
