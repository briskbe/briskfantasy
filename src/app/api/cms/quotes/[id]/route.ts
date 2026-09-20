import { privateRoute, readJson } from "@/lib/cms/api";
import { updateQuote } from "@/lib/cms/data";
export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) {
  return privateRoute(request, async () => updateQuote((await context.params).id, await readJson(request)));
}
