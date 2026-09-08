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
| Product-design portfolio | `src/data/portfolio.ts` + `/public/portfolio` |
| Site config (email, hero video, socials) | `src/data/site.ts` |
| Contact form endpoint | `src/app/api/contact/route.ts` (Resend optional, see `.env.example`) |

## Before going live

1. Fill in the real social profile URLs and phone number in `src/data/site.ts`.
2. Set `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM` (see `.env.example`) so
   "Gesprek inplannen" submissions arrive by email.
3. Update `siteConfig.url` if the production domain differs from `https://www.brisk.be`.
4. Microlink's free tier allows ~25 screenshot requests per minute per visitor; the
   References page loads them lazily and falls back to the bundled static captures.

## Visual QA

```bash
pnpm dev &
node scripts/shot.mjs / ./qa/home          # NL + EN, desktop + mobile, full page
```
