"use client";

import { useId, useState, type FormEvent, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

const EASE = [0.16, 1, 0.3, 1] as const;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const SERVICES = ["website", "webshop", "software", "app", "other"] as const;
const BUDGETS = ["a", "b", "c", "d", "e"] as const;

type Status = "idle" | "submitting" | "success" | "error";
type Field = "name" | "email" | "message";
type Errors = Partial<Record<Field, string>>;

const inputClass =
  "h-12 w-full rounded-xl border border-line-2 bg-fg/[0.045] px-4 text-[1rem] text-fg outline-none transition-[border-color,box-shadow,background-color] duration-300 placeholder:text-muted/60 hover:border-fg/25 hover:bg-fg/[0.06] focus:border-accent focus:bg-fg/[0.07] focus:shadow-[0_0_0_3px_rgba(255,159,77,0.18)] focus-visible:outline-none aria-[invalid=true]:border-ember";

const hintClass = "text-[0.8rem] tracking-[-0.005em] text-muted";
const legendClass = "mb-3 flex w-full flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3";
const labelClass = "text-[0.9rem] font-medium tracking-[-0.01em] text-fg";

function FieldWrap({
  id,
  label,
  hint,
  error,
  children,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <div className="mb-2.5 flex items-baseline justify-between gap-3">
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
        {hint ? <span className={hintClass}>{hint}</span> : null}
      </div>
      {children}
      <AnimatePresence initial={false}>
        {error ? (
          <motion.p
            id={`${id}-error`}
            className="mt-2 text-[0.85rem] text-brand-2"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.25 }}
          >
            {error}
          </motion.p>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function Pill({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={cn(
        "h-11 rounded-full border px-4 text-[0.92rem] tracking-[-0.01em] transition-[background-color,border-color,color,transform] duration-300 ease-[var(--ease-out-expo)] active:scale-[0.97]",
        selected
          ? "border-fg bg-fg text-ink"
          : "border-line-2 bg-transparent text-fg/85 hover:border-fg/50 hover:text-fg",
      )}
    >
      {children}
    </button>
  );
}

function Spinner() {
  return (
    <span
      className="size-4 shrink-0 animate-spin rounded-full border-2 border-ink/30 border-t-ink"
      aria-hidden
    />
  );
}

/** Drawn check mark: circle sweeps, then the tick. */
function CheckMark() {
  return (
    <svg viewBox="0 0 96 96" className="size-24 sm:size-28" aria-hidden>
      <motion.circle
        cx="48"
        cy="48"
        r="44"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="2"
        initial={{ pathLength: 0, rotate: -90 }}
        animate={{ pathLength: 1, rotate: -90 }}
        transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
        style={{ transformOrigin: "50% 50%" }}
      />
      <motion.path
        d="M30 49.5 L42.5 62 L67 36"
        fill="none"
        stroke="var(--color-brand)"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.75 }}
      />
    </svg>
  );
}

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const locale = useLocale();
  const uid = useId();
  const id = (f: string) => `${uid}-${f}`;

  const [values, setValues] = useState({ name: "", email: "", company: "", message: "", website: "" });
  const [services, setServices] = useState<string[]>([]);
  const [budget, setBudget] = useState<string | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>("idle");

  const set = (k: keyof typeof values) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const v = e.target.value;
    setValues((s) => ({ ...s, [k]: v }));
    if (k in errors) setErrors((s) => ({ ...s, [k]: undefined }));
  };

  const validateField = (f: Field, v: string): string | undefined => {
    if (f === "name" && !v.trim()) return t("errors.name");
    if (f === "email" && !EMAIL_RE.test(v.trim())) return t("errors.email");
    if (f === "message" && v.trim().length < 10) return t("errors.message");
    return undefined;
  };
  const onBlur = (f: Field) => () => setErrors((s) => ({ ...s, [f]: validateField(f, values[f]) }));

  const toggleService = (s: string) =>
    setServices((list) => (list.includes(s) ? list.filter((x) => x !== s) : [...list, s]));

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next: Errors = {
      name: validateField("name", values.name),
      email: validateField("email", values.email),
      message: validateField("message", values.message),
    };
    setErrors(next);
    const firstBad = (["name", "email", "message"] as Field[]).find((f) => next[f]);
    if (firstBad) {
      document.getElementById(id(firstBad))?.focus();
      return;
    }
    setStatus("submitting");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: values.name.trim(),
          email: values.email.trim(),
          company: values.company.trim(),
          service: services.map((s) => t(`service.options.${s}`)).join(", "),
          budget: budget ? t(`budget.options.${budget}`) : "",
          message: values.message.trim(),
          locale,
          website: values.website,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean };
      if (!res.ok || !data.ok) throw new Error("delivery");
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  function reset() {
    setValues({ name: "", email: "", company: "", message: "", website: "" });
    setServices([]);
    setBudget(null);
    setErrors({});
    setStatus("idle");
  }

  const submitting = status === "submitting";

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {status === "success" ? (
          <motion.div
            key="success"
            role="status"
            aria-live="polite"
            className="flex min-h-[30rem] flex-col items-start justify-center py-6"
            initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
          >
            <CheckMark />
            <h2 className="text-h3 mt-8 max-w-md text-balance">{t("success.title")}</h2>
            <p className="mt-5 max-w-md text-body text-muted text-pretty">{t("success.body")}</p>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
              <Button href="/" variant="secondary">
                {t("success.home")}
              </Button>
              <button
                type="button"
                onClick={reset}
                className="inline-flex h-11 items-center text-[0.95rem] text-muted underline-offset-6 transition-colors hover:text-fg hover:underline"
              >
                {t("success.again")}
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={onSubmit}
            noValidate
            className="space-y-7"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -12, filter: "blur(8px)" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="border-b border-line pb-6">
              <h2 className="text-h4 text-balance">{t("title")}</h2>
              <p className="mt-2 text-[0.9rem] text-muted">{t("intro")}</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2">
              <FieldWrap id={id("name")} label={t("name")} error={errors.name}>
                <input
                  id={id("name")}
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={values.name}
                  onChange={set("name")}
                  onBlur={onBlur("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? `${id("name")}-error` : undefined}
                  className={inputClass}
                />
              </FieldWrap>
              <FieldWrap id={id("email")} label={t("email")} error={errors.email}>
                <input
                  id={id("email")}
                  name="email"
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  required
                  value={values.email}
                  onChange={set("email")}
                  onBlur={onBlur("email")}
                  aria-invalid={Boolean(errors.email)}
                  aria-describedby={errors.email ? `${id("email")}-error` : undefined}
                  className={inputClass}
                />
              </FieldWrap>
            </div>

            <FieldWrap id={id("company")} label={t("company")} hint={t("optional")}>
              <input
                id={id("company")}
                name="company"
                type="text"
                autoComplete="organization"
                value={values.company}
                onChange={set("company")}
                className={inputClass}
              />
            </FieldWrap>

            <fieldset>
              <legend className={legendClass}>
                <span className={labelClass}>{t("service.label")}</span>
                <span className={hintClass}>{t("service.hint")}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {SERVICES.map((s) => (
                  <Pill key={s} selected={services.includes(s)} onClick={() => toggleService(s)}>
                    {t(`service.options.${s}`)}
                  </Pill>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className={legendClass}>
                <span className={labelClass}>{t("budget.label")}</span>
                <span className={hintClass}>{t("budget.hint")}</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <Pill key={b} selected={budget === b} onClick={() => setBudget((cur) => (cur === b ? null : b))}>
                    {t(`budget.options.${b}`)}
                  </Pill>
                ))}
              </div>
            </fieldset>

            <FieldWrap id={id("message")} label={t("message")} error={errors.message}>
              <textarea
                id={id("message")}
                name="message"
                rows={5}
                required
                minLength={10}
                placeholder={t("messagePlaceholder")}
                value={values.message}
                onChange={set("message")}
                onBlur={onBlur("message")}
                aria-invalid={Boolean(errors.message)}
                aria-describedby={errors.message ? `${id("message")}-error` : undefined}
                className={cn(inputClass, "h-auto min-h-32 resize-y py-3.5 leading-relaxed")}
              />
            </FieldWrap>

            {/* Honeypot — invisible to people, tempting to bots */}
            <div className="absolute -left-[9999px] top-0 h-px w-px overflow-hidden" aria-hidden>
              <label htmlFor={id("website")}>Website</label>
              <input
                id={id("website")}
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={values.website}
                onChange={set("website")}
              />
            </div>

            <div className="flex flex-col gap-5 border-t border-line pt-7 sm:flex-row sm:items-center sm:justify-between">
              <p className="max-w-sm text-[0.85rem] leading-relaxed text-muted text-pretty">
                {t.rich("note", {
                  link: (chunks) => (
                    <Link href="/privacy" className="text-fg underline underline-offset-4 hover:text-accent">
                      {chunks}
                    </Link>
                  ),
                })}
              </p>
              <Button type="submit" size="lg" disabled={submitting} icon={submitting ? "none" : "arrow"} className="disabled:cursor-wait disabled:opacity-80">
                <span className="inline-flex items-center gap-2.5">
                  {submitting ? <Spinner /> : null}
                  {submitting ? t("submitting") : t("submit")}
                </span>
              </Button>
            </div>

            <div aria-live="assertive" className="min-h-0">
              <AnimatePresence>
                {status === "error" ? (
                  <motion.p
                    className="flex items-start gap-3 rounded-xl border border-ember/40 bg-ember/10 px-4 py-3 text-[0.9rem] text-fg"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <ArrowRight className="mt-0.5 size-4 shrink-0 text-ember" aria-hidden />
                    <span>{t("errors.server", { email: siteConfig.email })}</span>
                  </motion.p>
                ) : null}
              </AnimatePresence>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
