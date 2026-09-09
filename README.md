# Brisk — agency website

Bilingual (NL default, EN) marketing site for Brisk, a Belgian digital agency.
Built with Next.js 16 (App Router, Turbopack), Tailwind CSS v4, `motion`,
Lenis smooth scroll, Remotion Player, Microlink live screenshots and Spell UI.

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:3000  (NL)  ·  http://localhost:3000/en  (EN)
pnpm build && pnpm start
pnpm lint
```

## Where things live

| What | Where |
| --- | --- |
| Design system & build brief | `DESIGN.md` |
| Tokens (colors, type scale, textures) | `src/app/globals.css` |
| Routes (localized slugs) | `src/i18n/routing.ts` |
| Copy per language | `messages/nl/*.json`, `messages/en/*.json` |
| Pages | `src/app/[locale]/**/page.tsx` |
| Page-specific components | `src/components/pages/<page>/` |
| Shared UI / blocks | `src/components/ui`, `src/components/blocks` |
| Spell UI components (spell.sh) | `src/components/spell` — add more with `pnpm dlx shadcn@latest add @spell/<name>` |
| Remotion compositions | `src/components/remotion/compositions` |
| Client references (17 live sites) | `src/data/references.ts` + `/public/references` |
| Client logo wall (NMBS, BMW, Nike, …) | `src/data/clients.ts` + `/public/logos` |
| Refresh client logos | `BRANDFETCH_API_KEY=... node scripts/fetch-client-logos.mjs` |
| Refresh reference screenshots | `node scripts/capture-references.mjs` (see `--all`) |
| Product-design portfolio | `src/data/portfolio.ts` + `/public/portfolio` |
| Site config (email, hero video, socials) | `src/data/site.ts` |
| Contact form endpoint | `src/app/api/contact/route.ts` |
| Email templates (confirmation + notification) | `src/emails/` |
| Preview the emails in a browser | `pnpm preview:emails` (writes `.preview/`) |
| SEO helpers (canonical, hreflang, JSON-LD) | `src/lib/seo.ts` |
| Keyword landing pages | `src/data/seo/clusters.ts` + `src/data/seo/content/` |
| Regional landing pages | `src/data/seo/regions.ts` + `src/data/seo/content/regions-*.ts` |
| SEO audit against a build | `node scripts/seo-audit.mjs` |

## Transactional email

One form submission sends two emails: the lead to `CONTACT_TO`, and a branded
confirmation to the person who filled in the form, in their own language. The
lead is the one that matters — if it fails the endpoint returns 502 and the form
shows its error state, while a failed confirmation is only logged, because the
lead is already safe and telling the visitor otherwise would be a lie.

`src/emails/` is email HTML, not web HTML: tables for layout, styles inline on
every element, no custom properties, no web fonts and no external images. Most
clients block remote images by default, so the wordmark is type. Run
`pnpm preview:emails` after changing a template and open the files it writes.

## Before going live

1. Fill in the real social profile URLs and phone number in `src/data/site.ts`.
2. Set `RESEND_API_KEY`, `CONTACT_TO` and `CONTACT_FROM` (see `.env.example`).
   `CONTACT_FROM` has to sit on a domain verified in Resend or every send is
   rejected; brisk.be is verified. Without the key the form still submits and
   the lead is written to the server log, so a local checkout needs no setup.
3. Update `siteConfig.url` if the production domain differs from `https://www.brisk.be`.
4. Two clients have no logo in Brandfetch and currently render as a wordmark:
   the Belgian Football Association and museumPASSmusées. Ask them for a
   transparent SVG, save it as `public/logos/rbfa.svg` / `public/logos/museumpass.svg`
   and set `logo` on that entry in `src/data/clients.ts`.
5. Confirm you may display each client logo. Showing them is normal agency
   practice, but some contracts restrict it.
6. Microlink's free tier allows ~25 screenshot requests per minute and a daily
   quota. Reference cards render the bundled static capture instantly and fade
   the live capture on top when it arrives, so hitting the limit is invisible to
   visitors. Set `MICROLINK_API_KEY` for a paid plan (that also unlocks the
   `ttl` cache parameter, which the free tier rejects).
7. Three bundled captures are flagged `captureQuality: "weak"` in
   `src/data/references.ts` because they fired before the site finished painting
   or a promo layer covered the hero. Re-run `node scripts/capture-references.mjs`
   (it defaults to exactly those) and clear the flag when they look right.

## Visual QA

```bash
pnpm dev &
node scripts/shot.mjs / ./qa/home          # NL + EN, desktop + mobile, full page
```


## SEO

### How the pages are organised

- **Four service pages** (`/website-op-maat` and friends) carry the head terms.
- **Keyword landing pages** at `/diensten/[slug]` cover one distinct search
  intent each. Synonyms do not get their own page: "website laten maken",
  "website laten bouwen" and "professionele website laten maken" are one intent,
  so they share a page and the synonyms live in its body copy. See the `related`
  field in `src/data/seo/clusters.ts`.
- **Regional pages** at `/regio/[slug]`, one per province in Belgium and the
  Netherlands, each covering all four services for that region.
- **Two hubs**, `/diensten` and `/regio`, linked from the footer, so every
  landing page is two clicks from the homepage and none is orphaned.

### Why not a page per keyword per city

That would be several thousand near-identical pages, which is what Google's spam
policy calls a doorway page. They get demoted and they drag the rest of the
domain's trust down with them. A province page that says something true about
doing business there ranks; the same paragraph with the city name swapped does
not. If you add regions or clusters, hold that line — `src/data/seo/regions.ts`
explains it at the top of the file.

### What every page emits

- A self-referencing `canonical`.
- `hreflang` for `nl`, `en` and `x-default` (Dutch is the default).
- JSON-LD: `ProfessionalService` and `WebSite` site-wide, plus `Service`,
  `BreadcrumbList` and `FAQPage` per landing page.
- Visible breadcrumbs matching the `BreadcrumbList` data.
- An FAQ built on `<details>`, so answers are in the HTML without JavaScript and
  match the structured data exactly.

Deliberately **not** emitted: `AggregateRating` for the Google review badge.
Google disallows self-serving review markup about your own organisation, and it
risks a manual action. The badge is visual proof only.

### Auditing

```bash
pnpm build && pnpm start &
node scripts/seo-audit.mjs
```

It walks every URL in the sitemap and fails on a missing canonical or hreflang,
a duplicate title or description, a missing `h1`, invalid JSON-LD, or an FAQ
question that is in the structured data but not visible on the page.

### Adding a landing page

1. Add an entry to `src/data/seo/clusters.ts` (or `regions.ts`).
2. Add its copy to the matching file in `src/data/seo/content/`.
3. That is all — the route, sitemap entry, hreflang and structured data follow
   from the data.
