import { privateRoute, readJson } from "@/lib/cms/api";
import { createQuote } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return privateRoute(request, async () => createQuote(await readJson(request)), 201);
}
