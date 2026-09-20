import { privateRoute, readJson } from "@/lib/cms/api";
import { createProject } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function POST(request: Request) {
  return privateRoute(request, async () => createProject(await readJson(request)), 201);
}
