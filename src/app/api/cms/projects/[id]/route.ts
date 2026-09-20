import { privateRoute, readJson } from "@/lib/cms/api";
import { updateProject } from "@/lib/cms/data";
export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) {
  return privateRoute(request, async () => updateProject((await context.params).id, await readJson(request)));
}
