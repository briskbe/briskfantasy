import { privateRoute } from "@/lib/cms/api";
import { getCmsData } from "@/lib/cms/data";
export const runtime = "nodejs";
export async function GET(request: Request) {
  return privateRoute(request, (session) => getCmsData(session.user));
}
