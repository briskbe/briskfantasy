# Performance en visuele controle — 19 september 2026

De onderstaande metingen zijn uitgevoerd op de lokale productiebuild met Lighthouse 13.4.1 en Chrome headless. Mobiel gebruikt de standaard Lighthouse-simulatie; desktop gebruikt `--preset=desktop`. De vier metingen zijn na elkaar uitgevoerd zonder andere browsertests. Dit zijn geen live PageSpeed- of Core Web Vitals-veldmetingen.

| Pagina | Profiel | Performance | Toegankelijkheid | Best practices | SEO | LCP | TBT | CLS |
| --- | --- | ---: | ---: | ---: | ---: | --- | --- | --- |
| Homepage `/` | Mobiel | 89 | 100 | 100 | 100 | 3,8 s | 40 ms | 0 |
| Homepage `/` | Desktop | 99 | 100 | 100 | 100 | 0,8 s | 0 ms | 0 |
| `/website-op-maat` | Mobiel | 90 | 100 | 100 | 100 | 3,6 s | 50 ms | 0 |
| `/website-op-maat` | Desktop | 100 | 100 | 100 | 100 | 0,8 s | 0 ms | 0 |

**100 performance op beide apparaten is niet bereikt.** De mobiele hoofdtekst blijft de grootste resterende LCP-factor in de gesimuleerde meting. De aangeleverde live PageSpeed-meting toonde 56 desktop en 77 mobiel, maar door de andere omgeving zijn die cijfers geen gecontroleerde vergelijking met deze lokale resultaten. Na publicatie is een nieuwe live meting nodig.

## Uitgevoerde verbeteringen

- De homepagehero en de route-inhoud zijn vanaf de eerste serverrespons zichtbaar. De oude introvertraging en verborgen beginstanden van de overige hoofdhero's zijn verwijderd.
- De hero gebruikt een responsieve afbeelding met hoge laadprioriteit. Mobiele bezoekers en bezoekers met minder beweging of databesparing downloaden geen decoratieve film. Desktop laadt die pas na de afbeelding en tijdens browserrust, en pauzeert buiten beeld.
- De volledige hero-film is verkleind van 14.370.403 naar 1.917.382 bytes: 86,66% kleiner, met behoud van 1924×1076, 24 fps en 10,04 seconden. MP4-faststart is gecontroleerd.
- Zowel speler als compositie van de showreels laden pas nabij het scherm. Een server-gerenderde afbeelding reserveert de ruimte; minder-beweging gebruikt de statische versie.
- Alleen de benodigde vertaalteksten worden naar de browser gestuurd: circa 82% minder op de homepage en 91% minder op de privacy- en SEO-pagina's.
- Gedeelde scrollanimaties gebruiken lichte native observers en CSS, zonder Motion-component per tekstblok, blur-filter of permanente `will-change`-lagen. Inhoud blijft zonder JavaScript zichtbaar.
- Portfolio-afbeeldingen gebruiken responsieve optimalisatie. Een ongebruikte letterstijl is verwijderd; kleine monospaced labels hoeven de hoofdlettertypes niet op te houden.
- De WhatsApp-knop verschijnt direct, met nummer `+31645045527`. Decoratieve nummering en pulserende statusbadges zijn verwijderd; functionele processtappen en galerijtellers blijven behouden.
- Google Analytics laadt pas na toestemming. Zie [ANALYTICS.md](./ANALYTICS.md).

## Pixel Ink

De Websites-hero bevat de opgegeven Pixel Ink-compositie en instellingen via `shaders@3.2.470`. De Shaders MCP was niet geautoriseerd in deze werkruimte; de door de gebruiker aangeleverde code is rechtstreeks geïntegreerd met het officiële pakket.

De GPU-code wordt na een echte aanwijzerbeweging op een geschikt desktopapparaat geladen. Mobiel, databesparing, minder-beweging en ontbrekende WebGPU behouden een statische achtergrond. De productie-import en alle fallbackpaden zijn gecontroleerd zonder browserfouten. De daadwerkelijke animatie moet nog op hardware met werkende WebGPU worden bekeken; de cloudbrowser kon alleen de fallback betrouwbaar bevestigen.

`patches/typegpu@0.12.3.patch` omzeilt een fout in Next 16.3.4's minifier met vijf gelijkwaardige helperaanroepen. De berekeningen zijn tegen het origineel gecontroleerd; gewone minificatie blijft actief. De build parseert nu alle geproduceerde browserchunks en faalt bij ongeldige JavaScript. De laatste build valideerde 36 chunks.

Voor commerciële publicatie moet de gebruikte versie/preset onder een passende [Shaders-licentie](https://shaders.com/license) vallen. In deze werkruimte is geen aankoop of accountwijziging uitgevoerd.

## Bewijs en herhaling

- `.context/lighthouse-home-mobile-final.json`, `.context/lighthouse-home-desktop-final.json`
- `.context/lighthouse-websites-mobile-final.json`, `.context/lighthouse-websites-desktop-final.json`
- `.context/home-ui-checks.json`, `.context/media-progressive-checks.json`
- `.context/analytics-smoke.log`, `.context/reveal-browser-smoke.log`
- `.context/pixel-ink-desktop-final.png`, `.context/pixel-ink-mobile-final.png`
- `.context/mobile-menu-cleanup.png`, `.context/desktop-home-performance.png`

Een voorbeeld van de meting:

```sh
CHROME_PATH=/usr/bin/google-chrome pnpm dlx lighthouse http://localhost:3000/ \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags='--headless --no-sandbox --disable-dev-shm-usage' \
  --output=json --output-path=.context/lighthouse-home-mobile-final.json
```

Voeg `--preset=desktop` toe voor desktop. Meet een productiebuild, geen ontwikkelserver. Testen sturen geen echte contactaanvragen of analyticsgebeurtenissen.
