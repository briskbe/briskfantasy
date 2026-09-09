import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Static, art-directed capture of a live client site in browser chrome.
 *
 * Deliberately *not* MicrolinkShot: this page shows up to nine captures at
 * once, and one live third-party screenshot request per card meant ~17 outbound
 * fetches per view (most of which fail on the free tier). The static webp is
 * served through next/image so `sizes` actually produces a srcset, and every
 * capture carries the same ink tint so bright client sites sit inside the dark
 * section instead of glaring out of it.
 */
export function SiteShot({
  slug,
  domain,
  alt,
  sizes,
  priority = false,
  className,
  tint = "normal",
  hoverZoom = false,
}: {
  /** matches `/public/references/<slug>.webp` */
  slug: string;
  domain: string;
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** How far the capture is pushed back behind the page's own typography. */
  tint?: "normal" | "deep" | "none";
  hoverZoom?: boolean;
}) {
  return (
    <div className={cn("browser-frame relative", className)}>
      <div className="flex items-center gap-2 border-b border-line bg-bg-3/60 px-3 py-2">
        <span className="flex gap-1.5" aria-hidden>
          <i className="size-2 rounded-full bg-fg/15" />
          <i className="size-2 rounded-full bg-fg/15" />
          <i className="size-2 rounded-full bg-fg/15" />
        </span>
        <span className="mx-auto flex h-5 max-w-[70%] items-center rounded-md bg-fg/5 px-3 font-mono text-[0.75rem] leading-none tracking-wide text-muted">
          <span className="truncate">{domain}</span>
        </span>
        <span className="w-[26px]" aria-hidden />
      </div>
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-ink-3">
        <Image
          src={`/references/${slug}.webp`}
          alt={alt}
          fill
          sizes={sizes}
          priority={priority}
          className={cn(
            "object-cover object-top",
            hoverZoom &&
              "transition-transform duration-[900ms] ease-[var(--ease-out-expo)] group-hover:scale-[1.04]",
          )}
        />
        {tint !== "none" && (
          <span
            aria-hidden
            className={cn(
              "absolute inset-0 transition-opacity duration-700 ease-[var(--ease-out-expo)]",
              tint === "deep" ? "bg-ink/45" : "bg-ink/30",
              hoverZoom && "group-hover:opacity-0",
            )}
          />
        )}
      </div>
    </div>
  );
}
