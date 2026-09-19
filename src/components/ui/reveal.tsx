"use client";

import { createElement, useEffect, useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";
import styles from "./reveal.module.css";

type EntryCallback = (entry: IntersectionObserverEntry) => boolean;
type ObserverPool = { observer: IntersectionObserver; callbacks: Map<Element, EntryCallback> };
const observers = new Map<number, ObserverPool>();

/** Share observers across the page; a completed reveal releases its subscription. */
function observe(element: HTMLElement, amount: number, callback: EntryCallback) {
  let pool = observers.get(amount);
  if (!pool) {
    const callbacks = new Map<Element, EntryCallback>();
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (callbacks.get(entry.target)?.(entry)) {
          callbacks.delete(entry.target);
          observer.unobserve(entry.target);
        }
      }
      if (!callbacks.size) {
        observer.disconnect();
        observers.delete(amount);
      }
    }, { threshold: amount === 0 ? [0] : [0, amount] });
    pool = { observer, callbacks };
    observers.set(amount, pool);
  }
  pool.callbacks.set(element, callback);
  pool.observer.observe(element);
  return () => {
    pool.callbacks.delete(element);
    pool.observer.unobserve(element);
    if (!pool.callbacks.size) {
      pool.observer.disconnect();
      if (observers.get(amount) === pool) observers.delete(amount);
    }
  };
}

function useReveal<T extends HTMLElement>({
  once,
  amount,
  delay,
  stagger,
}: { once: boolean; amount: number; delay: number; stagger?: number }) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const element = ref.current;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || reduced.matches || !("IntersectionObserver" in window)) return;
    const threshold = Math.max(0, Math.min(1, amount));
    // A group's own items are staggered. Nested groups control their own items.
    const targets = stagger === undefined ? [element] : Array.from(element.querySelectorAll<HTMLElement>("[data-reveal-item]"))
      .filter((item) => item.closest("[data-reveal-group]") === element);
    let firstEntry = true;
    const setState = (state: "pending" | "visible") => {
      targets.forEach((target, index) => {
        target.style.setProperty("--reveal-delay", `${Math.max(0, delay + index * (stagger ?? 0))}s`);
        target.dataset.revealState = state;
      });
    };
    const stop = observe(element, threshold, (entry) => {
      const bounds = entry.boundingClientRect;
      const root = entry.rootBounds;
      const inViewport = bounds.bottom > (root?.top ?? 0) && bounds.top < (root?.bottom ?? window.innerHeight)
        && bounds.right > (root?.left ?? 0) && bounds.left < (root?.right ?? window.innerWidth);
      if (reduced.matches) {
        setState("visible");
        return true;
      }
      if (firstEntry) {
        firstEntry = false;
        // Never hide content already painted in the viewport. No-JS and SSR
        // content is visible; only genuinely off-screen content is armed.
        if (inViewport) return once;
        setState("pending");
      }
      // Very tall groups cannot reach a ratio larger than the viewport allows.
      const oversized = bounds.height > (root?.height ?? window.innerHeight);
      if (entry.isIntersecting && (entry.intersectionRatio >= threshold || oversized)) {
        setState("visible");
        return once;
      }
      if (!entry.isIntersecting && !once) setState("pending");
      return false;
    });
    return () => {
      stop();
      targets.forEach((target) => {
        delete target.dataset.revealState;
        target.style.removeProperty("--reveal-delay");
      });
    };
  }, [once, amount, delay, stagger]);

  return ref;
}

/** Native fade + rise for off-screen content, with no hydration-time hiding. */
export function Reveal({
  children, delay = 0, className, as = "div", once = true, amount = 0.25,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "section" | "p" | "h1" | "h2" | "h3" | "li" | "span" | "figure";
  once?: boolean;
  amount?: number;
}) {
  const ref = useReveal<HTMLElement>({ once, amount, delay });
  return createElement(as, { ref, className: cn(styles.reveal, className) }, children);
}

/** Container that staggers its own nested RevealItems, excluding nested groups. */
export function RevealGroup({
  children, className, stagger = 0.08, delay = 0, once = true, amount = 0.2,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
  delay?: number;
  once?: boolean;
  amount?: number;
}) {
  const ref = useReveal<HTMLDivElement>({ once, amount, delay, stagger });
  return <div ref={ref} className={className} data-reveal-group="">{children}</div>;
}

export function RevealItem({ children, className, as = "div" }: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "figure" | "article";
}) {
  return createElement(as, { className: cn(styles.reveal, className), "data-reveal-item": "" }, children);
}
