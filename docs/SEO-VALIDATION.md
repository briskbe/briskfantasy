# SEO-validatie — 19 september 2026

Getest op de lokale productiebuild via `http://localhost:3000`. De canonieke productiehost is `https://www.brisk.be`. Deze resultaten bevestigen geen live publicatie of Google-indexatie.

| Controle | Resultaat |
| --- | --- |
| Productiebuild + TypeScript | Geslaagd |
| ESLint | Geslaagd |
| Git whitespacecontrole | Geslaagd |
| Gegenereerde taal-slugregistratie | 37 vertaalparen gecontroleerd |
| Sitemap / HTML SEO-crawl | 180 pagina's, 0 fouten, 0 waarschuwingen |
| Unieke titels | 180 |
| Unieke beschrijvingen | 180 |
| Zoekwoordverdeling | 500 aangeleverde zoekwoorden; 45 doelpagina's; alle doelen staan in de sitemap |
| Browsercontroles | 21 route-, render- en navigatiecontroles geslaagd |
| FAQ zonder JavaScript | Werkt op de geteste Franse dienstpagina |
| Responsieve weergave | Getest op 390 en 1440 pixels; geen horizontale overflow in de geteste pagina's |
| Runtimefouten in browserproef | Geen |

De crawl controleert iedere sitemap-URL op HTTP-status, canonical, één H1, robots, OG-tags, structured data, server-gerenderde FAQ-tekst, wederzijdse hreflang, overeenstemming tussen HTML en sitemap en bereikbaarheid vanaf de homepage. De browserproef test daarnaast ongeldige routes, permanente redirects, NL/EN-taalwissels in beide richtingen en een selectie van alle marktversies, kennisbank en cases. Formulieren zijn niet verzonden tijdens deze controle.

## Definitieve Lighthouse-metingen

Alle vier de definitieve metingen scoren 100 op SEO, toegankelijkheid en best practices. Performance: homepage 89 mobiel / 99 desktop; Websites-pagina 90 mobiel / 100 desktop. De gevraagde 100 performance op alle apparaten is niet bereikt. Zie [PERFORMANCE.md](./PERFORMANCE.md) voor LCP/TBT/CLS, testomstandigheden, verbeteringen en resterende beperkingen.

Aanvullend zijn 24 NL/EN-routes gecontroleerd op vertalingen en hydrationfouten. Mobiele navigatie, responsieve weergave, uitgestelde media, zichtbaarheid zonder JavaScript en de native scrollanimaties slagen. De Analytics-test controleert toestemming, weigering, intrekking, meerdere tabbladen en geblokkeerde browseropslag; alle Google-verzoeken worden lokaal onderschept. De productiebuild controleert de syntaxis van alle 36 browserchunks.

## Lokale bewijsbestanden

- `.context/seo-build.log`
- `.context/seo-audit.json`
- `.context/seo-smoke.json`
- `.context/lighthouse-website.report.html`
- `.context/lighthouse-website.report.json`
- `.context/seo-fr-desktop.png`, `.context/seo-fr-mobile.png`
- `.context/seo-guide-desktop.png`, `.context/seo-guide-mobile.png`
- `.context/seo-belgium-desktop.png`

Deze tijdelijke bestanden zijn werkruimte-artifacts en worden niet meegecommit. De uitvoerbare controles staan in `scripts/seo-audit.mjs`, `scripts/seo-smoke.mjs` en `scripts/generate-language-slugs.mjs`.

Zie [SEO.md](./SEO.md) voor publicatie, Search Console, Bedrijfsprofiel en doorlopende optimalisatie, en [seo-keyword-map.csv](./seo-keyword-map.csv) voor de zoekwoordverdeling.
