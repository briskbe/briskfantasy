import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";

const localize = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  // Private workspace and capability-based quote links have their own roots.
  if (/^\/(cms|quote)(\/|$)/.test(request.nextUrl.pathname)) {
    const response = NextResponse.next();
    response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
    response.headers.set("Cache-Control", "private, no-store");
    response.headers.set("Referrer-Policy", "no-referrer");
    return response;
  }
  // Country sections have their own fully localized, statically rendered shell.
  // Passing them through next-intl would incorrectly rewrite them to /nl/… .
  if (/^\/(fr|de|nl-nl|en-gb|en-us)(\/|$)/.test(request.nextUrl.pathname)) {
    return NextResponse.next();
  }
  return localize(request);
}

export const config = {
  // Skip API routes, Next internals, Vercel internals and all static files.
  matcher: "/((?!api|_next|_vercel|apple-icon|.*\\..*).*)",
};
