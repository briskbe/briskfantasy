import { privateRoute } from "@/lib/cms/api";
import { revokeQuote } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  return privateRoute(request, async () => revokeQuote((await context.params).id));
}
