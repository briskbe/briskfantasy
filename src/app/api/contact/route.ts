import { NextResponse } from "next/server";
import { confirmationEmail, notificationEmail, type Lead, type LeadLocale } from "@/emails/lead";
import { isEmailConfigured, sendEmail } from "@/lib/resend";
import { siteConfig } from "@/data/site";

/**
 * The "Gesprek inplannen" form endpoint.
 *
 * One submission produces two emails: the lead to the studio, and a branded
 * confirmation to the person who filled in the form, in their own language.
 *
 * The two are not equally important, and the error handling says so. Losing the
 * lead is losing a client, so a failed notification is a 502 and the form shows
 * its error state with the mail address to write to instead. A failed
 * confirmation is logged and swallowed: the lead is already safe, and telling
 * the visitor their message did not arrive would be a lie.
 *
 * Env: RESEND_API_KEY, CONTACT_TO, CONTACT_FROM. Without the key the lead is
 * logged so the form still works on a local checkout.
 */

interface Payload {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  locale?: string;
  website?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Caps on every field, so a bot cannot post a megabyte into an email body. */
const LIMITS = { name: 120, email: 200, company: 160, service: 240, budget: 120, message: 5000 } as const;

const clean = (value: unknown, max: number): string =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

export async function POST(req: Request) {
  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // A bot filled the hidden field. Answer as if all is well rather than telling
  // it which check it failed.
  if (clean(payload.website, 200)) return NextResponse.json({ ok: true });

  const name = clean(payload.name, LIMITS.name);
  const email = clean(payload.email, LIMITS.email);
  const message = clean(payload.message, LIMITS.message);
  if (!name || !EMAIL_RE.test(email) || message.length < 10) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const lead: Lead = {
    name,
    email,
    company: clean(payload.company, LIMITS.company) || undefined,
    service: clean(payload.service, LIMITS.service) || undefined,
    budget: clean(payload.budget, LIMITS.budget) || undefined,
    message,
    locale: payload.locale === "en" ? "en" : ("nl" as LeadLocale),
  };

  const notification = notificationEmail(lead);
  const confirmation = confirmationEmail(lead);

  if (!isEmailConfigured()) {
    console.info(`[contact] RESEND_API_KEY not set — lead not emailed\n${notification.text}`);
    return NextResponse.json({ ok: true });
  }

  const from = process.env.CONTACT_FROM ?? `Brisk <noreply@${new URL(siteConfig.url).hostname.replace(/^www\./, "")}>`;
  const to = process.env.CONTACT_TO ?? siteConfig.email;

  // The lead first: everything else is optional next to this.
  const sent = await sendEmail({
    from,
    to,
    replyTo: email,
    subject: notification.subject,
    html: notification.html,
    text: notification.text,
  });
  if (!sent.ok) {
    console.error("[contact] lead notification failed", sent.status, sent.detail, `\n${notification.text}`);
    return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
  }

  const acknowledged = await sendEmail({
    from,
    to: email,
    replyTo: to,
    subject: confirmation.subject,
    html: confirmation.html,
    text: confirmation.text,
  });
  if (!acknowledged.ok) {
    // The lead is in. Say nothing to the visitor; this is ours to notice.
    console.error("[contact] confirmation to visitor failed", acknowledged.status, acknowledged.detail);
  }

  return NextResponse.json({ ok: true });
}
