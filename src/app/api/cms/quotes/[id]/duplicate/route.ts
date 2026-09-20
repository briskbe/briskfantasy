import { privateRoute } from "@/lib/cms/api";
import { duplicateQuote } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  return privateRoute(request, async () => duplicateQuote((await context.params).id), 201);
}
