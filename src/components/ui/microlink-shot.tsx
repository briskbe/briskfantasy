"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Live website screenshot powered by Microlink (https://microlink.io).
 * Renders the pre-captured static screenshot instantly and fades the fresh
 * Microlink capture on top once it arrives. Falls back silently on error.
 */
export function microlinkUrl(url: string, opts?: { width?: number; height?: number; fullPage?: boolean; dark?: boolean }) {
  const p = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    "viewport.width": String(opts?.width ?? 1440),
    "viewport.height": String(opts?.height ?? 900),
    waitForTimeout: "2500",
  });
  // Note: `ttl` (cache control) is a Microlink paid-plan parameter. Sending it
  // on the free tier fails the request with HTTP 400, so the live layer would
  // never load. Add it back only together with an API key.
  if (opts?.fullPage) p.set("screenshot.fullPage", "true");
  if (opts?.dark) p.set("colorScheme", "dark");
  return `https://api.microlink.io/?${p.toString()}`;
}

export function MicrolinkShot({
  url,
  slug,
  alt,
  className,
  imgClassName,
  live = true,
  frame = true,
  priority = false,
  sizes,
}: {
  url: string;
  /** matches `/public/references/<slug>.webp` */
  slug: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  live?: boolean;
  frame?: boolean;
  priority?: boolean;
  sizes?: string;
}) {
  const [liveLoaded, setLiveLoaded] = useState(false);
  const [liveFailed, setLiveFailed] = useState(false);
  const staticSrc = `/references/${slug}.webp`;
  const host = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  const image = (
    <div className={cn("relative aspect-[16/10] w-full overflow-hidden bg-ink-3", imgClassName)}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={staticSrc}
        alt={alt}
        className="absolute inset-0 h-full w-full object-cover object-top"
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        sizes={sizes}
      />
      {live && !liveFailed && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={microlinkUrl(url)}
          alt=""
          aria-hidden
          className={cn(
            "absolute inset-0 h-full w-full object-cover object-top transition-opacity duration-700",
            liveLoaded ? "opacity-100" : "opacity-0",
          )}
          loading="lazy"
          decoding="async"
          onLoad={() => setLiveLoaded(true)}
          onError={() => setLiveFailed(true)}
        />
      )}
    </div>
  );

  if (!frame) return <div className={className}>{image}</div>;

  return (
    <div className={cn("browser-frame", className)}>
      <div className="flex items-center gap-2 border-b border-line px-3 py-2">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-fg/15" />
          <i className="size-2 rounded-full bg-fg/15" />
          <i className="size-2 rounded-full bg-fg/15" />
        </span>
        <span className="mx-auto flex h-5 max-w-[60%] items-center gap-2 rounded-md bg-fg/5 px-3 font-mono text-[0.62rem] tracking-wide text-muted">
          <span className={cn("size-1.5 rounded-full", liveLoaded ? "bg-emerald-400" : "bg-fg/25")} />
          <span className="truncate">{host}</span>
        </span>
      </div>
      {image}
    </div>
  );
}
