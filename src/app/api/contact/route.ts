import { NextResponse } from "next/server";

/**
 * Contact / "Gesprek inplannen" form endpoint.
 * - Validates the payload.
 * - If RESEND_API_KEY is set, sends the lead by email through Resend's REST API
 *   (no SDK needed). Otherwise it logs the lead so the form still works locally.
 * Set CONTACT_TO (recipient) and CONTACT_FROM (verified sender) in .env.
 */
interface Lead {
  name: string;
  email: string;
  company?: string;
  service?: string;
  budget?: string;
  message: string;
  locale?: string;
  website?: string; // honeypot
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(req: Request) {
  let body: Lead;
  try {
    body = (await req.json()) as Lead;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  if (body.website) return NextResponse.json({ ok: true }); // bot filled the honeypot

  const name = body.name?.trim();
  const email = body.email?.trim();
  const message = body.message?.trim();
  if (!name || !email || !EMAIL_RE.test(email) || !message || message.length < 10) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const text = [
    `Naam: ${name}`,
    `E-mail: ${email}`,
    body.company ? `Bedrijf: ${body.company}` : null,
    body.service ? `Dienst: ${body.service}` : null,
    body.budget ? `Budget: ${body.budget}` : null,
    body.locale ? `Taal: ${body.locale}` : null,
    "",
    message,
  ]
    .filter(Boolean)
    .join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Brisk <noreply@brisk.be>",
        to: [process.env.CONTACT_TO ?? "info@brisk.be"],
        reply_to: email,
        subject: `Nieuwe aanvraag via brisk.be — ${name}`,
        text,
      }),
    });
    if (!res.ok) {
      console.error("[contact] resend failed", res.status, await res.text());
      return NextResponse.json({ ok: false, error: "delivery" }, { status: 502 });
    }
  } else {
    console.info("[contact] lead received (RESEND_API_KEY not set)\n" + text);
  }

  return NextResponse.json({ ok: true });
}
