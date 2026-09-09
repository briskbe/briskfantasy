import { useLocale, useTranslations } from "next-intl";
import { siteConfig } from "@/data/site";
import { yearsOfExperience } from "@/data/clients";
import { cn } from "@/lib/utils";

/** Google's own star yellow, so the badge reads as a Google rating and not as site chrome. */
const STAR = "#FBBC04";

/**
 * One star, filled proportionally. The whole set is drawn from `score`, so a
 * 4.7 shows as four and two-thirds stars rather than being rounded up.
 */
function Star({ fill, id }: { fill: number; id: string }) {
  const clamped = Math.max(0, Math.min(1, fill));
  const gradientId = `star-${id}`;
  return (
    <svg viewBox="0 0 20 19" className="h-[1.05em] w-[1.05em] shrink-0" aria-hidden focusable="false">
      <defs>
        <linearGradient id={gradientId} x1="0" x2="1" y1="0" y2="0">
          <stop offset={clamped} stopColor={STAR} />
          <stop offset={clamped} stopColor={STAR} stopOpacity="0.22" />
        </linearGradient>
      </defs>
      <path
        d="M10 0l2.9 6.06 6.6.88-4.83 4.62 1.22 6.6L10 15l-5.89 3.16 1.22-6.6L.5 6.94l6.6-.88L10 0z"
        fill={`url(#${gradientId})`}
      />
    </svg>
  );
}

/**
 * Google review badge for the hero: the Google mark, the stars, the score and
 * the review count. Numbers come from `siteConfig.googleRating` so there is one
 * place to update when the profile changes.
 *
 * The stars keep Google's yellow rather than the site accent — a review badge
 * that is recoloured to match the page reads as decoration instead of proof.
 * It is contained in its own surface so it stays a distinct third-party object.
 */
export function GoogleRating({ className }: { className?: string }) {
  const t = useTranslations("Common.social");
  const locale = useLocale();
  const { score, reviews, url } = siteConfig.googleRating;
  // Always one decimal, in the locale's own notation ("5,0" in Dutch): it reads
  // unmistakably as a rating and never runs together with the review count.
  const scoreLabel = score.toLocaleString(locale, { minimumFractionDigits: 1, maximumFractionDigits: 1 });
  const label = t("ratingAria", { score: scoreLabel, reviews });

  const inner = (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- static SVG in /public; the optimizer rejects SVG */}
      <img src="/logos/google.svg" alt="" width={268} height={274} className="h-5 w-5 shrink-0" aria-hidden />
      <span className="flex items-center gap-0.5 text-[1rem] leading-none" aria-hidden>
        {[0, 1, 2, 3, 4].map((i) => (
          <Star key={i} id={String(i)} fill={score - i} />
        ))}
      </span>
      <span className="flex items-center gap-2 whitespace-nowrap leading-none">
        <span className="text-[1.05rem] font-medium tracking-[-0.01em] text-fg">{scoreLabel}</span>
        <span className="h-3 w-px bg-current opacity-20" aria-hidden />
        <span className="text-[0.82rem] text-fg/60">{t("reviews", { count: reviews })}</span>
      </span>
    </>
  );

  const classes = cn(
    "inline-flex items-center gap-3 rounded-full border border-line-2 bg-fg/[0.06] px-4 py-2.5 backdrop-blur-md",
    url && "transition-colors duration-300 hover:border-line-2 hover:bg-fg/[0.1]",
    className,
  );

  if (url) {
    return (
      <a href={url} target="_blank" rel="noreferrer noopener" aria-label={label} data-cursor="link" className={classes}>
        {inner}
      </a>
    );
  }
  return (
    <span className={classes} role="img" aria-label={label}>
      {inner}
    </span>
  );
}

/**
 * The proof strip under the hero call to action: the Google rating plus a few
 * plain facts. Every badge here has to be something we can stand behind — the
 * numbers come from site config, never from copy that could drift.
 */
export function SocialProof({ className }: { className?: string }) {
  const t = useTranslations("Common.social");
  return (
    <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-3", className)}>
      <GoogleRating />
      <ul className="flex flex-wrap items-center gap-x-3 gap-y-2">
        {[
          t("badges.projects", { total: siteConfig.projectsDelivered }),
          t("badges.years", { years: yearsOfExperience() }),
          t("badges.reply"),
        ].map((badge) => (
          <li
            key={badge}
            className="inline-flex items-center gap-2 rounded-full border border-line px-3.5 py-2 text-[0.8rem] text-fg/70"
          >
            <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
            {badge}
          </li>
        ))}
      </ul>
    </div>
  );
}
