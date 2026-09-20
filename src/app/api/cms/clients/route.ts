import { privateRoute, readJson } from "@/lib/cms/api";
import { createClient } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return privateRoute(request, async () => createClient(await readJson(request)), 201);
}
