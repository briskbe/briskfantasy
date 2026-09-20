import { privateRoute, readJson } from "@/lib/cms/api";
import { updateFollowUp, deleteFollowUp } from "@/lib/cms/data";
export const runtime = "nodejs";
type Context = { params: Promise<{ id: string }> };
export async function PATCH(request: Request, context: Context) {
  return privateRoute(request, async () => updateFollowUp((await context.params).id, await readJson(request)));
}
export async function DELETE(request: Request, context: Context) {
  return privateRoute(request, async () => deleteFollowUp((await context.params).id));
}
