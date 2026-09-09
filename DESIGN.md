# Brisk — Design system & build brief

This document is the single source of truth for everyone (human or agent) building
pages for brisk.be. Read it fully before writing a component. Consistency across
pages matters more than any individual flourish.

## 1. Brand in one breath

**Brisk** is a Belgian digital agency that designs and builds *websites op maat,
webshops op maat, software op maat* and *mobiele apps*. The feeling: calm
confidence, craft, speed. Think of the hero film: a lone builder on a cliff above
sunlit clouds, laptop glowing. Big sky, warm light, focus.

Primary CTA everywhere: **"Gesprek inplannen"** (EN: "Book a call") → route `/gesprek-inplannen`.

Tone of voice
- NL: informeel-professioneel ("je/jij", nooit "u"), kort, concreet, zelfverzekerd. Geen buzzwords, geen uitroeptekens.
- EN: confident, concise, human. No hype, no exclamation marks, no "leverage/unlock/elevate".
- Headlines are statements, not questions (except the closing CTA band). One idea per sentence.
- Use specifics over adjectives: "geleverd in 15 minuten" beats "supersnel".
- Never use emoji. Never use lorem ipsum. Never leave English strings in the NL locale or vice versa.

## 2. Reference bar

Industry benchmarks the client named: designme.agency (restraint, hierarchy, numbered
services, social proof), borndigital.be (whitespace, card-based work grid, NL/EN toggle,
understated CTAs), inthepocket.com (cinematic imagery, deep backgrounds with warm/cool
gradients, quantified credibility, three-service structure). We aim above them: same
restraint, more motion craft.

## 3. Tokens (see `src/app/globals.css`)

Colors (Tailwind classes)
- `ink` #07080C page black · `ink-2` #0D0F15 raised · `ink-3` #141721 card · `ink-4` #1D2130
- `paper` #F4F1EA warm off-white · `paper-2` #E9E4D9 · `paper-3` #D9D3C5
- `amber` #FF9F4D **the** accent (CTAs, the logo period, one highlight per screen) · `amber-2` #FFC98A · `ember` #D9662B
- `sky` #8BB4FF cool secondary glow, use sparingly (max one glow per section)
- Runtime-themed: `bg-bg`, `bg-bg-2`, `bg-bg-3`, `text-fg`, `text-fg-2`, `text-muted`, `border-line`, `border-line-2`.
  These follow the nearest `.theme-dark` / `.theme-light` wrapper. **Prefer these** inside
  sections so a block can be dropped into a dark or light section unchanged.

Typography
- Sans: Geist (`font-sans`, default). Mono: Geist Mono (`font-mono`). Serif accent: Instrument Serif italic (`font-serif` / `.serif` / `<em>` inside headline classes).
- Scale classes: `.text-display` (hero only, 1 per page), `.text-h1`, `.text-h2`, `.text-h3`, `.text-h4`, `.text-lead`, `.text-body`, `.eyebrow`.
- **Stepped hierarchy is binding.** `.text-display` belongs to the hero and nowhere else. Section headings are `.text-h2`; the shared `CtaBand` closes at `.text-h1`. Setting every section headline near hero scale flattens the page into a stack of repeated heroes — the most common failure the reviewers found. Give a section weight with space and a lead paragraph in the opposite column, not with a bigger headline.
- **Amber budget: one accent moment per viewport.** Amber belongs to the primary CTA, the logo period, and one deliberate highlight per screen. When amber lands on eyebrow dots, caption dots, stat labels, marquee separators and arrows at once, the accent stops meaning anything. Everything else is `text-muted` / `text-fg`.
- Headlines: weight 500, tight tracking (already in the classes). Max ~12 words. Use `text-balance`.
- Serif italic accent: one emphasized word per headline, via `<em>` in the message string and `t.rich(key, richTags)`. Example NL: `"Websites die <em>bewegen</em>."` Don't overuse: max one `<em>` per headline, not on every headline.
- Body: `text-body text-muted` on dark, `text-fg-2` for emphasized paragraphs. Max width ~60ch (`max-w-xl`/`max-w-2xl`).
- Eyebrows: `<Eyebrow index={1}>Strategie</Eyebrow>` mono, uppercase, amber dot or number.

Spacing & layout
- Horizontal container: `container-x` (fluid gutter, max 112rem). Vertical rhythm: `section-y` (5–11rem), `section-y-sm`.
- 12-column grid at `lg:` for editorial layouts: `grid lg:grid-cols-12 gap-8`. Asymmetry is encouraged (5/7, 4/8, offset columns), centered layouts only for the hero and the CTA band.
- Radii: cards `rounded-2xl`/`rounded-3xl`, pills `rounded-full`, images `rounded-xl`. Borders are hairlines (`border-line`), never heavy.
- Section rhythm: every page starts with a **dark hero**, then alternates dark/light (`<Section theme="light">`) at least once, and ends with `<OtherServices />` (service pages) + `<CtaBand />` (every page).
- **Never more than two consecutive dark sections.** `CtaBand` and the footer are both dark, so the last section *before* them should be light on every page — otherwise the page ends in a 2,000px dark slab.
- **No dead columns or vertical voids.** Every grid column earns its place. If a column would be empty, collapse the grid instead of leaving a hairline around emptiness, and never fill a void with filler copy.

Texture
- `.grain` (adds a subtle noise overlay to a `relative` parent), `.glow-amber`, `.glow-sky` (radial glows, absolutely positioned, `opacity-30..60`), `.glass` (blurred surface), `.browser-frame` (screenshot chrome), `.stroke-text` (outlined giant text), `.mask-fade-x/-b`.

## 4. Motion principles

- Easing: `--ease-out-expo` [0.16,1,0.3,1] for entrances; `--ease-in-out-quart` [0.76,0,0.24,1] for curtains/clip-path; springs (stiffness 200–400, damping 20–34) for pointer-driven things.
- Durations: micro 0.2–0.35s, reveal 0.7–1s, curtain 0.7–0.9s. Stagger 0.05–0.1s.
- Entrances: `<Reveal>` / `<RevealGroup>+<RevealItem>` (fade + rise + un-blur). Headline lines: Spell `SlideUpText`/`BlurReveal`/`WordsStagger`. Never animate more than ~8 things in one viewport.
- Scroll: Lenis smooth scroll is global. Use `useScroll` + `useTransform` from `motion/react` for parallax (small ranges: ±40–120px), pinned/sticky storytelling (`sticky top-0 h-screen` stacks), horizontal scroll sections, progress lines.
- Hover: images scale 1.03–1.06 over 0.8s; arrows nudge; underlines grow from the left; cards lift 2–4px. Use `data-cursor-label="Bekijk"` on cards for the custom cursor.
- Always respect `prefers-reduced-motion` (global CSS already collapses animations; JS effects should check `window.matchMedia`).
- Performance: `will-change` only on animating elements; videos `muted playsInline autoPlay loop preload="metadata"`; heavy WebGL (Spell Rays / AnimatedGradient) only via `dynamic(..., {ssr:false})` and never more than one per viewport.

## 5. Component catalogue

Layout (already wired in `src/app/[locale]/layout.tsx`): `Header` (glass pill nav, hides on scroll down, fullscreen menu), `Footer`, `Preloader`, `Cursor`, `SmoothScroll`, `LanguageSwitcher`.

UI (`src/components/ui`)
- `Button` — `variant` primary (amber) | secondary (outline) | inverse | ghost; `size` sm|md|lg; `href` (internal localized route) or `external`; `icon` arrow|up-right|none. Magnetic by default.
- `Section` — `theme="dark|light"`, `padded`, wraps children in `container-x`. `Container`.
- `Eyebrow` — mono label; `index` for numbered sections.
- `Reveal`, `RevealGroup`, `RevealItem` — in-view entrances.
- `Counter` — counting numbers (`value`, `suffix`, `prefix`).
- `MarqueeBand` — CSS marquee, pass children (logos, words); `reverse`, `speed`.
- `MicrolinkShot` — live website screenshot (Microlink) over the static capture, with browser chrome. Props: `url`, `slug`, `alt`, `frame`, `live`, `priority`.
- `Magnetic` — pointer attraction wrapper.
- `richTags` (`src/components/ui/rich.tsx`) — pass to `t.rich()`: `<em>`, `<amber>`, `<strong>`, `<nowrap>`, `<br>`.

Blocks (`src/components/blocks`)
- `CtaBand` — closing CTA (every page ends with it).
- `OtherServices current="websites"` — cross-links to the other service pages (service pages only, before CtaBand).
- `RaysBackdrop` — Spell light rays as a section backdrop.

Spell UI (`src/components/spell`, from spell.sh via shadcn registry `@spell/*`)
- Text: `BlurReveal`, `SlideUpText`, `WordsStagger`, `ShimmerText`, `HighlightedText`, `SpecialText` (scramble), `GradientWaveText`.
- Surfaces: `TiltCard` (3D tilt + spotlight; great for portfolio cards), `Marquee`, `LogosCarousel`.
- Buttons: `FlowButton`, `PopButton`, `RichButton` (use `Button` for CTAs; these are for playful secondary moments).
- Backgrounds: `Rays` (light-rays), `AnimatedGradient` (WebGL) — dynamic import only, one per viewport max.
- Read the component file for props before use. They accept `className`.

Remotion (`src/components/remotion`)
- `RemotionPlayer` wraps `@remotion/player` (plays only when in view, muted, looped, license acknowledged). Compositions live in `src/components/remotion/compositions/` and must be pure React using `useCurrentFrame`, `useVideoConfig`, `interpolate`, `spring`, `Sequence`, `AbsoluteFill`, `Img` from `remotion`. Design them at 1600×1000 (16:10) or 1080×1350 (4:5) and `fps=30`.

Data (`src/data`)
- `references.ts` — the 17 live client sites (`references`, `featuredReferences`, `referencesByType`). Each has `slug` (static shot at `/references/<slug>.webp`), `url`, `type` website|webshop|platform, `industry`, `blurb` per locale, `services`, `accent`.
- `portfolio.ts` — 53 product-design images (`/portfolio/*.webp`, 16:12) + 3 videos (`portfolioVideos`) with curated `tags` and `tone`. Use `portfolioByTag("mobile")` etc. Product-design images always sit in a frame (`rounded-2xl border border-line bg-bg-2`) or a device mock, never stretched, `object-cover` only when the crop is intentional.
- `site.ts` — name, email, hero video URL, poster, socials.

## 6. i18n rules

- Routing: `nl` default at `/`, `en` at `/en/...` with localized slugs (see `src/i18n/routing.ts`). Always link with `Link`/`Button href` from `@/i18n/navigation` using the *internal* key (e.g. `href="/website-op-maat"`), never a raw `<a href="/en/...">`.
- Every string lives in `messages/<locale>/<namespace>.json`. Pages own their namespace (`Home`, `Websites`, `Webshops`, `Software`, `Apps`, `References`, `About`, `Contact`, `Privacy`). Shared strings are in `Common`, `Nav`, `Footer`. **Do not edit another page's namespace.** Both locales must have identical key structures.
- Server components: `const t = await getTranslations("Websites")`. Client components: `useTranslations("Websites")`. Rich strings: `t.rich("hero.title", richTags)`. Arrays: model as objects with numbered keys or use `t.raw("list")` for arrays of plain items.
- Page metadata: export `generateMetadata` reading `meta.title` / `meta.description` from the page namespace, and call `setRequestLocale(locale)` first thing in the page component.
- Locale-dependent data (references/portfolio blurbs) is picked with `const locale = await getLocale()` (server) / `useLocale()` (client) and indexed `blurb[locale]`.

## 7. Page skeleton (copy this shape)

```tsx
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";
import { OtherServices } from "@/components/blocks/other-services";

export async function generateMetadata({ params }: PageProps<"/[locale]/website-op-maat">): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Websites" });
  return { title: t("meta.title"), description: t("meta.description") };
}

export default async function Page({ params }: PageProps<"/[locale]/website-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Websites");
  return (
    <>
      {/* dark hero: pt-40 to clear the fixed header, min-h-[90vh] */}
      {/* 4–7 sections alternating theme, at least one light */}
      <OtherServices current="websites" />
      <CtaBand />
    </>
  );
}
```

Client-only pieces (scroll effects, players, tilt cards) go in `src/components/pages/<page>/*.tsx` with `"use client"` and receive translated strings/data as props or use `useTranslations`.

## 8. Do / Don't

Do: big editorial type, generous whitespace, numbered sections, real numbers (17 live sites, 50+ product screens), asymmetric grids, one accent, dark/light rhythm, device & browser frames, live Microlink screenshots, Remotion motion pieces, sticky storytelling, a11y (alt text, focus states, landmarks, reduced motion).

Don't: purple/blue "AI" gradients, glassmorphism everywhere, icon grids of 6 generic features, centered-everything, stock photos, emoji, gradient text on body copy, more than one WebGL canvas per viewport, unlabelled buttons, English in NL or Dutch in EN, raw `<a>` for internal links, inline hex colors when a token exists.
