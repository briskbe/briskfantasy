import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextResponse, type NextRequest } from "next/server";

const localize = createMiddleware(routing);

export default function proxy(request: NextRequest) {
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
