import { apiError, json, readJson } from "@/lib/cms/api";
import { assertCmsMutationOrigin } from "@/lib/cms/auth";
import { consumeRateLimit, privateFingerprint, respondToQuote } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    assertCmsMutationOrigin(request);
    const { token } = await context.params;
    // Vercel overwrites this header; never trust a client-supplied forwarded IP in production.
    const ip = process.env.VERCEL ? request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() || "unknown" : "local";
    const fingerprint = privateFingerprint(ip);
    await consumeRateLimit(`quote-response:ip:${fingerprint}`, 30, 900);
    await consumeRateLimit(`quote-response:token:${privateFingerprint(token)}`, 10, 900);
    return json(await respondToQuote(token, await readJson(request), fingerprint));
  } catch (error) { return apiError(error); }
}
