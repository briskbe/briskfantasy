# SEO voor Brisk

## Wat is geïmplementeerd

België is de primaire markt. De bestaande Nederlandse URL's blijven behouden, met `nl-BE` en de Belgische homepage als standaard. Nieuwe secties bedienen Nederland (`/nl-nl`), Frankrijk (`/fr`), Duitsland (`/de`), het Verenigd Koninkrijk (`/en-gb`) en de Verenigde Staten (`/en-us`). `/en` blijft de algemene Engelse site.

Elke nieuwe markt bevat zes inhoudelijk verschillende pagina's: bureau, websites, e-commerce, kosten, redesign en platformkeuze. De platformvergelijking legt WordPress, Shopify, WooCommerce en maatwerk uit zonder onbevestigde diensten of certificeringen te claimen. Synoniemen krijgen dezelfde bestemming. Landen- en stedennamen zijn geen aanleiding voor honderden kopieën van dezelfde pagina.

- Elke indexeerbare taalversie heeft een eigen sitemapvermelding, self-canonical en wederzijdse hreflang-verwijzingen naar inhoudelijk equivalente pagina's.
- Metadata en XML gebruiken dezelfde bron. Automatische next-intl HTTP-hreflangheaders zijn uitgeschakeld om conflicterende sets te voorkomen.
- Geen gefingeerde `lastmod`-datums, locatiekantoren, prijzen, klantresultaten of beoordelingsschema's.
- De sitemap bevat alleen geschreven pagina's. Onbekende slugs geven 404.
- Belangrijke URL-aliases krijgen een permanente 308-redirect naar de bestaande canonieke pagina.
- Website- en webshophoofdpagina's hebben zoekgerichte titels, beschrijvingen, H1, kostenafwegingen, projectlinks en service/breadcrumbschema.
- De FAQ-antwoorden staan in de server-HTML en zijn via native accordions toegankelijk. Schema gebruikt exact dezelfde tekst.
- De kennisbank bevat vijf praktische gidsen, elk in Nederlands en Engels, met links naar relevante diensten.
- Drie projectbeschrijvingen, elk in Nederlands en Engels, gebruiken bestaande referenties en screenshots. Prestatie- en omzetresultaten worden niet verzonnen.
- Footer, commerciële pagina's en overzichtspagina's verbinden de nieuwe inhoud met de bestaande site.
- Het verplichte laadscherm is verwijderd. Nieuwe markt- en kennispagina's hebben geen zware video- of animatiebibliotheek nodig voor de hoofdinhoud.
- Google/Bing-verificatie kan via omgevingsvariabelen. Vercel-previewdeployments krijgen een `X-Robots-Tag: noindex, nofollow`-header; productie blijft indexeerbaar.

## Bedrijfsgegevens

Door de eigenaar bevestigd: **Herenstraat 15, 3600 Genk, België** en [Google Bedrijfsprofiel](https://share.google/Tkmzs3bYo20H0FaJP). De gedeelde bron is `src/data/site.ts`; die voedt contactinformatie, footer en ProfessionalService-schema. Het profiel is gelinkt. De bestaande reviewscore is niet opnieuw geverifieerd; er wordt geen zelfbeoordelingsschema gepubliceerd.

## Zoekwoordverdeling

`docs/seo-keyword-map.csv` koppelt alle aangeleverde zoekwoorden aan een bestaande of nieuwe doelpagina en benoemt de intentie. Dit is een redactionele verdeling, geen claim dat de pagina al rankt, dat alle woorden letterlijk in de tekst staan, of dat zoekvolume/concurrentie is gemeten.

De Britse pagina's gebruiken relevante Britse termen (web design agency, bespoke websites, SMEs) en Britse spelling; er was geen aparte Britse zoekwoordenbijlage. `near me` kan alleen eerlijk aansluiten op de echte vestiging in Genk. Amerikaanse stedelijke zoekopdrachten worden bediend als remote samenwerking, zonder lokale vestigingen te suggereren. Goedkoop/betaalbaar-zoekwoorden leiden naar kosten en afbakening, niet naar verzonnen bodemprijzen.

Nieuwe pagina's moeten een eigen probleem oplossen. Maak geen extra pagina voor bijvoorbeeld “website laten bouwen” als “website laten maken” dezelfde vraag al beantwoordt. Breid een stadspagina pas uit wanneer er echte lokale inhoud is, zoals een project, teamlocatie of specifieke dienstverlening.

## Controle vóór publicatie

```sh
pnpm lint
pnpm build
pnpm start --port 3000
pnpm seo:audit --base http://localhost:3000 --output .context/seo-audit.json
pnpm seo:smoke --base http://localhost:3000
```

De audit controleert de serverrespons van alle sitemap-URL's: HTTP 200 zonder redirect, één H1, unieke titels en beschrijvingen, exact één self-canonical, HTML-taal, robots, OG URL/afbeelding, JSON-LD, aanwezige FAQ-tekst, gelijke sitemap/HTML-alternates, wederkerigheid en bereikbaarheid via gewone links vanaf de homepage. Dit valideert de implementatie, niet de ranking of indexatie bij Google.

De build controleert ook de lichte slugregistratie voor taalwissels. Na het toevoegen van een nieuwe dienst of gids: `node scripts/generate-language-slugs.mjs --write`. Browsercontroles testen 404/308-responses, taalwissels in beide richtingen, mobiele breedte, JavaScript-fouten en FAQ-gebruik zonder JavaScript.

Gebruik na publicatie ook Google's [Rich Results Test](https://search.google.com/test/rich-results) en URL-inspectie in Search Console. Een geldige FAQPage betekent voor een webbureau geen recht op een uitgebreid FAQ-resultaat.

## Acties waarvoor het live domein of een account nodig is

1. Publiceer de wijzigingen op `https://www.brisk.be`. Controleer in hosting/DNS dat http en het niet-www-domein permanent naar de www-versie gaan. Dit kan niet betrouwbaar met alleen een repositorywijziging worden vastgesteld.
2. Verifieer de domeinproperty in [Search Console](https://search.google.com/search-console). DNS-verificatie heeft de voorkeur; voor URL-prefix-verificatie kan `GOOGLE_SITE_VERIFICATION` de contentwaarde van de Google-metatag bevatten. Voor Bing bestaat `BING_SITE_VERIFICATION`.
3. Dien `https://www.brisk.be/sitemap.xml` in en inspecteer de homepage plus één kernpagina per markt. De websitecode dient de sitemap niet automatisch in bij je Google-account.
4. Controleer Google Bedrijfsprofiel: bedrijfsnaam, het bevestigde adres, passende hoofdcategorie, website, bereikbare contactgegevens, werkelijke openingsuren, foto's en diensten. Een link op de site wijzigt het profiel zelf niet.
5. Verzamel echte, vrijwillige klantreviews. Vraag geen kunstmatige of beloonde beoordelingen. Houd bestaande reviewcijfers op de site actueel.
6. Google Analytics is toegevoegd met het door de eigenaar opgegeven ID `G-4TBZ9KYGCS`. De tag laadt uitsluitend na toestemming; cookie-instellingen zijn in iedere footer bereikbaar. Controleer na publicatie de ontvangst van paginaweergaven en de instelling voor browsergeschiedenis in GA4. Zie [ANALYTICS.md](./ANALYTICS.md). Eventuele aanvullende conversiemeting voor contactaanvragen moet nog in het account worden afgestemd.
7. Controleer mobiele Core Web Vitals via echte velddata in Search Console/PageSpeed Insights. Een lokale Lighthouse-test is een laboratoriummeting en geen bewijs van bezoekersprestaties.
8. Vul projecten aan met door klanten goedgekeurde resultaten: oorspronkelijke situatie, doelen, meetperiode, bron van statistieken, gebruikte technologie en vergelijking vóór/na. Laat native reviewers de FR/DE teksten controleren op commerciële nuance.

## Werk na lancering

- **Eerste week:** indexeerbaarheid, redirects, formulieren, mobiel gebruik, sitemap en belangrijkste URL-inspecties controleren.
- **Wekelijks tijdens de eerste maand:** indexatiestatus en fouten volgen. Geen dagelijkse sitemapdatums verversen of massaal dezelfde URL's opnieuw indienen.
- **Maandelijks:** Search Console uitsplitsen per land, zoekopdracht en landingspagina. Meet vertoningen, klikken, CTR en gekwalificeerde aanvragen. Kijk naar positionering in samenhang met de zoekintentie.
- **Daarna:** verbeter pagina's die vertoningen krijgen maar onvoldoende doorklikken of converteren; voeg echte cases toe; verdien relevante vermeldingen via klanten, partners, vakorganisaties en publicaties. Koop geen spamlinks.

Een `.be`-domein geeft een duidelijk Belgisch landsignaal. Dat past bij de primaire markt, maar betekent dat internationale concurrentie extra sterke inhoud en reputatie vraagt. De huidige opzet benut het bestaande domein; een toekomstige domeinstrategie vergt een apart migratieplan.

## Bronnen

- [Google: internationale en meertalige websites](https://developers.google.com/search/docs/specialty/international/managing-multi-regional-sites)
- [Google: hreflang en wederzijdse verwijzingen](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google: sitemaps en echte wijzigingsdatums](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
- [Google: spambeleid, doorway pages en scaled content](https://developers.google.com/search/docs/essentials/spam-policies)
- [Google: bedrijfsgegevens in structured data](https://developers.google.com/search/docs/appearance/structured-data/local-business)
- [Google: beperkingen van FAQ rich results](https://developers.google.com/search/blog/2023/08/howto-faq-changes)

Zoekposities, indexatie en rich results kunnen niet worden gegarandeerd. De implementatie is het fundament; reputatie, concurrentie, bruikbaarheid en aanhoudende inhoudelijke verbeteringen bepalen mede het resultaat.
