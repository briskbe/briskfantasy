/**
 * Minimal Resend client.
 *
 * The REST API is one POST, so the SDK would be a dependency to save four
 * lines. Kept as plain fetch, which also means the route stays on the edge of
 * nothing: no bundle, no version drift.
 */

export interface SendArgs {
  from: string;
  to: string | string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
}

export type SendResult = { ok: true; id: string } | { ok: false; status: number; detail: string };

const ENDPOINT = "https://api.resend.com/emails";

export function isEmailConfigured(): boolean {
  return Boolean(process.env.RESEND_API_KEY);
}

export async function sendEmail(args: SendArgs): Promise<SendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return { ok: false, status: 0, detail: "RESEND_API_KEY is not set" };

  let res: Response;
  try {
    res = await fetch(ENDPOINT, {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: args.from,
        to: Array.isArray(args.to) ? args.to : [args.to],
        subject: args.subject,
        html: args.html,
        text: args.text,
        // Resend's field is snake_case; the SDK's camelCase name does not work here.
        ...(args.replyTo ? { reply_to: args.replyTo } : {}),
      }),
      // A hung request must not hold the serverless function open to its limit.
      signal: AbortSignal.timeout(10_000),
    });
  } catch (e) {
    return { ok: false, status: 0, detail: e instanceof Error ? e.message : "network error" };
  }

  const payload: unknown = await res.json().catch(() => null);
  if (!res.ok) {
    const detail =
      payload && typeof payload === "object" && "message" in payload
        ? String((payload as { message: unknown }).message)
        : `HTTP ${res.status}`;
    return { ok: false, status: res.status, detail };
  }
  const id = payload && typeof payload === "object" && "id" in payload ? String((payload as { id: unknown }).id) : "";
  return { ok: true, id };
}
