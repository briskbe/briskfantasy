import { assertCmsMutationOrigin, getAuth, getCmsSession, isCmsOwner } from "@/lib/cms/auth";
import { CmsError } from "@/lib/cms/errors";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const publicPostPaths = new Set(["/sign-in/email", "/sign-out", "/request-password-reset", "/reset-password"]);
const privatePostPaths = new Set(["/change-password", "/revoke-session", "/revoke-sessions", "/revoke-other-sessions"]);

function safeError(status: number, retryAfter?: string | null) {
  const message = status === 429 ? "Te veel pogingen. Wacht even en probeer het opnieuw."
    : status === 401 ? "Onjuist e-mailadres of wachtwoord."
    : status === 403 ? "Dit verzoek is niet toegestaan."
    : status === 404 ? "Deze functie is niet beschikbaar."
    : status >= 500 ? "Inloggen is tijdelijk niet beschikbaar. Probeer het straks opnieuw."
    : "Het verzoek kon niet worden uitgevoerd. Controleer je gegevens en probeer het opnieuw.";
  return Response.json({ error: message, message }, {
    status,
    headers: { "Cache-Control": "no-store", ...(retryAfter ? { "Retry-After": retryAfter, "X-Retry-After": retryAfter } : {}) },
  });
}

async function handle(request: Request) {
  const path = new URL(request.url).pathname.slice("/api/auth".length).replace(/\/$/, "");
  const allowed = request.method === "GET"
    ? path === "/get-session" || path === "/list-sessions" || /^\/reset-password\/[A-Za-z0-9_-]+$/.test(path)
    : request.method === "POST" && (publicPostPaths.has(path) || privatePostPaths.has(path));
  if (!allowed) return safeError(404);

  try {
    assertCmsMutationOrigin(request);
    if ((privatePostPaths.has(path) || path === "/list-sessions") && !await getCmsSession(request.headers)) return safeError(401);
    const response = await getAuth().handler(request);
    if (response.status >= 400) return safeError(response.status >= 500 ? 503 : response.status, response.headers.get("X-Retry-After"));
    if (path === "/get-session") {
      const session = await response.clone().json();
      if (session?.user && !isCmsOwner(session.user.email)) return Response.json(null, { headers: { "Cache-Control": "no-store" } });
    }
    const responseHeaders = new Headers(response.headers);
    responseHeaders.set("Cache-Control", "no-store");
    return new Response(response.body, { status: response.status, statusText: response.statusText, headers: responseHeaders });
  } catch (error) {
    if (error instanceof CmsError) return safeError(error.status);
    return safeError(503);
  }
}

export const GET = handle;
export const POST = handle;
