import "server-only";
import { getCmsSession, assertCmsMutationOrigin } from "./auth";
import { CmsError } from "./errors";

export const privateHeaders = {
  "Cache-Control": "private, no-store, max-age=0",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  Vary: "Cookie",
};

export function json(data: unknown, status = 200) {
  return Response.json(data, { status, headers: privateHeaders });
}
export function apiError(error: unknown) {
  if (error instanceof CmsError) return json({ error: error.message, ...(error.fields ? { fields: error.fields } : {}) }, error.status);
  const code = error && typeof error === "object" && "code" in error ? String(error.code) : "";
  if (code === "23503") return json({ error: "The linked record is unavailable. Refresh and try again." }, 422);
  if (code === "23505") return json({ error: "This record already exists. Refresh and try again." }, 409);
  if (code === "40001" || code === "40P01") return json({ error: "Another update happened at the same time. Please try again." }, 409);
  console.error("[cms] Request could not be completed.");
  return json({ error: "The workspace is temporarily unavailable. Please try again shortly." }, 503);
}

type Session = NonNullable<Awaited<ReturnType<typeof getCmsSession>>>;
export async function privateRoute(request: Request, run: (session: Session) => Promise<unknown>, status = 200) {
  try {
    const session = await getCmsSession(request.headers);
    if (!session) throw new CmsError("Sign in to access the workspace.", 401);
    if (!["GET", "HEAD"].includes(request.method)) assertCmsMutationOrigin(request);
    return json(await run(session), status);
  } catch (error) { return apiError(error); }
}

/** Enforce the limit while reading, including requests without Content-Length. */
export async function readJson(request: Request): Promise<unknown> {
  if (!request.headers.get("content-type")?.toLowerCase().startsWith("application/json")) throw new CmsError("Send the request as JSON.", 415);
  const limit = 512 * 1024;
  if (Number(request.headers.get("content-length") ?? 0) > limit) throw new CmsError("The request is too large.", 413);
  if (!request.body) throw new CmsError("The request body is empty.", 400);
  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let size = 0;
  try {
    for (;;) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > limit) {
        await reader.cancel();
        throw new CmsError("The request is too large.", 413);
      }
      chunks.push(value);
    }
  } finally { reader.releaseLock(); }
  try { return JSON.parse(Buffer.concat(chunks).toString("utf8")); }
  catch { throw new CmsError("The request contains invalid JSON.", 400); }
}
