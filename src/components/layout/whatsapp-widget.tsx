"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUp, X } from "lucide-react";
import { usePrefersReducedMotion } from "@/hooks/use-media-query";
import { siteConfig } from "@/data/site";
import { Mark } from "./logo";

const EASE = [0.16, 1, 0.3, 1] as const;

/** WhatsApp's own green. Kept literal: it is a brand colour, not a theme token. */
const WA_GREEN = "#25D366";

/**
 * The WhatsApp glyph. Inline rather than an icon package because lucide has no
 * brand marks, and because the button is only recognisable at a glance if it
 * carries the real logo.
 */
function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden focusable="false" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

/**
 * Floating WhatsApp chat.
 *
 * Whatever the visitor types becomes the first WhatsApp message. Two details
 * that are easy to get wrong:
 *
 * - The URL is built with encodeURIComponent rather than by submitting a
 *   native GET form. Form serialisation encodes a space as `+`, and wa.me is a
 *   redirect service that need not read `+` back as a space; `%20` is
 *   unambiguous everywhere.
 * - Sending is a real <a target="_blank">, not window.open. With `noopener`,
 *   window.open returns null by specification even when it succeeded, so there
 *   is no way to tell a blocked popup from a working one — any fallback on the
 *   return value fires on every send and navigates the site away.
 *
 * The panel carries `theme-dark` because it floats over both dark and paper
 * sections and has to look deliberate on either.
 */
export function WhatsAppWidget() {
  const t = useTranslations("Common");
  const reduced = usePrefersReducedMotion();
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const rootRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const sendRef = useRef<HTMLAnchorElement>(null);

  // Held back until the intro curtain has lifted, so it does not slide in over it.
  useEffect(() => {
    const id = window.setTimeout(() => setReady(true), 1400);
    return () => window.clearTimeout(id);
  }, []);

  // Escape closes and hands focus back to the button; a click anywhere else
  // just closes. This is a popover, not a modal, so focus is never trapped.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      toggleRef.current?.focus();
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    document.addEventListener("pointerdown", onPointerDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.removeEventListener("pointerdown", onPointerDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  const { number, display } = siteConfig.whatsapp;
  if (!number) return null;

  const text = message.trim();
  const href = `https://wa.me/${number}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

  return (
    <div
      ref={rootRef}
      className="fixed bottom-5 right-5 z-[90] sm:bottom-7 sm:right-7"
      data-testid="whatsapp-widget"
    >
      <AnimatePresence>
        {open && (
          <motion.div
            key="panel"
            id="whatsapp-panel"
            initial={{ opacity: 0, y: 12, scale: reduced ? 1 : 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: reduced ? 1 : 0.96 }}
            transition={{ duration: reduced ? 0.15 : 0.45, ease: EASE }}
            className="theme-dark absolute bottom-[4.75rem] right-0 w-[min(21.5rem,calc(100vw-2.5rem))] origin-bottom-right overflow-hidden rounded-2xl border border-line bg-bg-2/95 text-fg shadow-[0_40px_90px_-30px_rgba(0,0,0,0.9)] backdrop-blur-xl"
          >
            <div className="flex items-center gap-3 border-b border-line px-5 py-4">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-ink-3">
                <Mark className="h-[1.05rem]" />
              </span>
              <div className="min-w-0">
                <p id="whatsapp-title" className="text-[0.95rem] font-medium leading-tight">
                  {t("whatsapp.title")}
                </p>
                <p className="mt-1 flex items-center gap-2 font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                  <span className="size-1.5 rounded-full" style={{ backgroundColor: WA_GREEN }} aria-hidden />
                  {t("whatsapp.reply")}
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  setOpen(false);
                  toggleRef.current?.focus();
                }}
                aria-label={t("whatsapp.close")}
                data-cursor="link"
                className="ml-auto -mr-1 flex size-8 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-fg/10 hover:text-fg"
              >
                <X className="size-4" />
              </button>
            </div>

            <div className="px-5 pt-5">
              {/* A received-message bubble: tail on the left, so it reads as
                  theirs and the visitor's own reply is the input below. */}
              <p className="max-w-[92%] rounded-2xl rounded-tl-md bg-bg-3 px-4 py-3 text-[0.88rem] leading-relaxed text-fg-2">
                {t("whatsapp.greeting")}
              </p>
            </div>

            {/* The form exists for Enter-to-send (and the "Go" key on mobile
                keyboards); the anchor is what actually opens WhatsApp. */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendRef.current?.click();
              }}
              className="p-5 pt-4"
            >
              <label htmlFor="whatsapp-message" className="sr-only">
                {t("whatsapp.placeholder")}
              </label>
              <div className="flex items-center gap-2 rounded-full border border-line bg-bg px-2 py-1.5 pl-4 transition-colors focus-within:border-line-2">
                <input
                  ref={inputRef}
                  id="whatsapp-message"
                  type="text"
                  autoComplete="off"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={t("whatsapp.placeholder")}
                  className="min-w-0 flex-1 bg-transparent py-1.5 text-[0.88rem] text-fg placeholder:text-muted focus:outline-none"
                />
                <a
                  ref={sendRef}
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={t("whatsapp.send")}
                  data-cursor="link"
                  className="flex size-9 shrink-0 items-center justify-center rounded-full text-ink transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-105 active:scale-95"
                  style={{ backgroundColor: WA_GREEN }}
                >
                  <ArrowUp className="size-4" strokeWidth={2.5} />
                </a>
              </div>
              <p className="mt-3.5 text-center font-mono text-[0.62rem] uppercase tracking-[0.14em] text-muted">
                {display}
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deliberately no data-cursor-label: the custom cursor's label ring is
          88px and would swallow this 56px button exactly while it is aimed at. */}
      <motion.button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="whatsapp-panel"
        aria-label={open ? t("whatsapp.close") : t("whatsapp.open")}
        data-cursor="link"
        initial={{ opacity: 0, scale: 0.6 }}
        animate={ready ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
        transition={{ duration: reduced ? 0.15 : 0.6, ease: EASE }}
        className="group relative flex size-14 items-center justify-center rounded-full text-white shadow-[0_16px_40px_-12px_rgba(37,211,102,0.75)] transition-transform duration-500 ease-[var(--ease-out-expo)] hover:scale-105 active:scale-95"
        style={{ backgroundColor: WA_GREEN }}
      >
        {/* Soft halo so the button sits in the page instead of on top of it. */}
        <span
          aria-hidden
          className="pointer-events-none absolute -inset-2 -z-10 rounded-full opacity-40 blur-xl transition-opacity duration-500 group-hover:opacity-70"
          style={{ backgroundColor: WA_GREEN }}
        />
        <AnimatePresence mode="wait" initial={false}>
          {open ? (
            <motion.span
              key="close"
              initial={{ opacity: 0, rotate: reduced ? 0 : -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: reduced ? 0 : 90 }}
              transition={{ duration: reduced ? 0.1 : 0.25, ease: EASE }}
              className="flex"
            >
              <X className="size-6" />
            </motion.span>
          ) : (
            <motion.span
              key="open"
              initial={{ opacity: 0, rotate: reduced ? 0 : 90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: reduced ? 0 : -90 }}
              transition={{ duration: reduced ? 0.1 : 0.25, ease: EASE }}
              className="flex"
            >
              <WhatsAppGlyph className="size-7" />
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
}
