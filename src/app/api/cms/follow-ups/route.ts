import { privateRoute, readJson } from "@/lib/cms/api";
import { createFollowUp } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return privateRoute(request, async () => createFollowUp(await readJson(request)), 201);
}
