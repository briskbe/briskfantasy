"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Connection = EventTarget & { saveData?: boolean; effectiveType?: string };
type ConnectedNavigator = Navigator & { connection?: Connection };

/**
 * The responsive poster is always present. Decorative film is an enhancement
 * for visible desktop heroes after the image is decoded and critical loading
 * has finished; neither mobile nor reduced-data visitors download the movie.
 */
export function HomeHeroMedia({ src, children }: { src: string; children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const video = videoRef.current;
    const poster = container?.querySelector("img");
    if (!container || !video || !poster) return;

    const desktop = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const connection = (navigator as ConnectedNavigator).connection;
    let disposed = false;
    let visible = false;
    let posterReady = false;
    let failed = false;
    let idle: number | undefined;
    let frame: number | undefined;
    let userInteracted = false;

    const suitableConnection = () => !connection?.saveData && !["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? "");
    const canPlay = () => !disposed && !failed && desktop.matches && !reducedMotion.matches && suitableConnection()
      && navigator.onLine && visible && document.visibilityState === "visible" && posterReady && document.readyState === "complete";

    function cancelPending() {
      if (idle !== undefined) window.cancelIdleCallback(idle);
      if (frame !== undefined) cancelAnimationFrame(frame);
      idle = undefined;
      frame = undefined;
    }

    function showPoster() {
      video!.pause();
      video!.style.opacity = "0";
    }

    function play() {
      idle = undefined;
      frame = undefined;
      if (!canPlay()) return;
      if (!video!.getAttribute("src")) video!.src = src;
      void video!.play().catch(() => {
        // Autoplay can be disabled independently of motion/data preferences.
        // Keep the already-loaded poster as the complete visual fallback.
        if (!disposed) showPoster();
      });
    }

    function reconcile() {
      cancelPending();
      if (!canPlay()) {
        showPoster();
        if ((!desktop.matches || reducedMotion.matches || !suitableConnection()) && video!.hasAttribute("src")) {
          video!.removeAttribute("src");
          video!.load();
        }
        return;
      }

      // No timeout: a busy browser may keep its static poster. Browsers without
      // idle callbacks enhance after interaction, with a frame for input work.
      if ("requestIdleCallback" in window) {
        idle = window.requestIdleCallback(play);
      } else if (userInteracted) {
        frame = requestAnimationFrame(play);
      }
    }

    function onInteraction() {
      userInteracted = true;
      reconcile();
    }

    function onPlaying() {
      if (canPlay()) video!.style.opacity = "1";
      else showPoster();
    }

    function onError() {
      failed = true;
      showPoster();
    }

    async function preparePoster() {
      if (!poster!.complete || !poster!.naturalWidth) return;
      try { await poster!.decode(); } catch { /* A successfully loaded image can still be displayed. */ }
      if (disposed) return;
      posterReady = true;
      // The next idle callback happens after the decoded poster can be painted.
      reconcile();
    }

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      reconcile();
    });
    observer.observe(container);
    poster.addEventListener("load", preparePoster);
    video.addEventListener("playing", onPlaying);
    video.addEventListener("error", onError);
    window.addEventListener("load", reconcile);
    window.addEventListener("online", reconcile);
    window.addEventListener("offline", reconcile);
    window.addEventListener("pointerdown", onInteraction, { passive: true });
    window.addEventListener("keydown", onInteraction);
    document.addEventListener("visibilitychange", reconcile);
    desktop.addEventListener("change", reconcile);
    reducedMotion.addEventListener("change", reconcile);
    connection?.addEventListener("change", reconcile);
    void preparePoster();

    return () => {
      disposed = true;
      cancelPending();
      observer.disconnect();
      poster.removeEventListener("load", preparePoster);
      video.removeEventListener("playing", onPlaying);
      video.removeEventListener("error", onError);
      window.removeEventListener("load", reconcile);
      window.removeEventListener("online", reconcile);
      window.removeEventListener("offline", reconcile);
      window.removeEventListener("pointerdown", onInteraction);
      window.removeEventListener("keydown", onInteraction);
      document.removeEventListener("visibilitychange", reconcile);
      desktop.removeEventListener("change", reconcile);
      reducedMotion.removeEventListener("change", reconcile);
      connection?.removeEventListener("change", reconcile);
      video.pause();
      video.removeAttribute("src");
      video.load();
    };
  }, [src]);

  return (
    <div ref={containerRef} className="pointer-events-none absolute inset-0 -z-10" aria-hidden="true">
      {children}
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover object-[68%_center] opacity-0 brightness-95 saturate-[0.42] transition-opacity duration-700 sm:object-center"
        muted
        loop
        playsInline
        preload="none"
        tabIndex={-1}
        disablePictureInPicture
      />
    </div>
  );
}
