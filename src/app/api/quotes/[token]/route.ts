import { apiError, json } from "@/lib/cms/api";
import { getPublicQuote } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function GET(_request: Request, context: { params: Promise<{ token: string }> }) {
  try {
    const quote = await getPublicQuote((await context.params).token);
    return quote ? json(quote) : json({ error: "Deze offertelink is niet beschikbaar of is verlopen." }, 404);
  } catch (error) { return apiError(error); }
}
