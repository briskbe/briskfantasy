import "server-only";

import { randomUUID } from "node:crypto";
import { betterAuth } from "better-auth";
import { APIError } from "better-auth/api";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { after } from "next/server";
import { z } from "zod";
import { CmsUnavailableError, getDb } from "@/lib/cms/db";
import { CmsError } from "@/lib/cms/errors";
import { isEmailConfigured, sendEmail } from "@/lib/resend";

const unavailableMessage = "Sign-in is temporarily unavailable. Please try again shortly.";

export function getCmsOwnerEmail(): string {
  const email = (process.env.CMS_OWNER_EMAIL || "info@brisk.be").trim().toLowerCase();
  if (!z.email().safeParse(email).success) throw new CmsUnavailableError(unavailableMessage);
  return email;
}

export function isCmsOwner(email: string): boolean {
  return email.trim().toLowerCase() === getCmsOwnerEmail();
}

function authOrigin(): string {
  const value = process.env.BETTER_AUTH_URL || (process.env.NODE_ENV === "production" ? "https://www.brisk.be" : "http://localhost:3000");
  try {
    const url = new URL(value);
    if (!["http:", "https:"].includes(url.protocol) || url.username || url.password) throw new Error();
    if (process.env.NODE_ENV === "production" && url.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(url.hostname)) throw new Error();
    return url.origin;
  } catch {
    throw new CmsUnavailableError(unavailableMessage);
  }
}

/** Mutating browser requests must come from this exact origin, including first login. */
export function assertCmsMutationOrigin(request: Request): void {
  if (["GET", "HEAD", "OPTIONS"].includes(request.method)) return;
  const origin = request.headers.get("origin");
  if (!origin || origin !== new URL(request.url).origin || request.headers.get("sec-fetch-site") === "cross-site") {
    throw new CmsError("This request is not permitted.", 403);
  }
}

async function consumeAuthRateLimit(key: string, rule: { window: number; max: number }) {
  const now = Date.now();
  const windowMs = rule.window * 1000;
  // A single PostgreSQL upsert prevents concurrent attempts sharing a stale count.
  // Explicit numeric conversion also avoids pg's bigint strings being concatenated
  // into an incorrect Retry-After value by Better Auth's default database storage.
  const result = await getDb().query<{ count: number; lastRequest: string }>(`
    INSERT INTO "rateLimit" (id, key, count, "lastRequest") VALUES ($1, $2, 1, $3)
    ON CONFLICT (key) DO UPDATE SET
      count = CASE WHEN "rateLimit"."lastRequest" <= $3::bigint - $4::bigint THEN 1 ELSE LEAST("rateLimit".count + 1, $5::integer + 1) END,
      "lastRequest" = CASE WHEN "rateLimit"."lastRequest" <= $3::bigint - $4::bigint THEN $3::bigint ELSE "rateLimit"."lastRequest" END
    RETURNING count, "lastRequest"`, [randomUUID(), key, now, windowMs, rule.max]);
  const row = result.rows[0];
  if (row.count === 1) await getDb().query('DELETE FROM "rateLimit" WHERE "lastRequest" < $1', [now - 300_000]);
  return {
    allowed: row.count <= rule.max,
    retryAfter: row.count <= rule.max ? null : Math.max(1, Math.ceil((Number(row.lastRequest) + windowMs - now) / 1000)),
  };
}

function createCmsAuth() {
  const secret = process.env.BETTER_AUTH_SECRET;
  if (!secret || secret.length < 32) throw new CmsUnavailableError(unavailableMessage);
  const database = getDb();
  const baseURL = authOrigin();
  getCmsOwnerEmail();

  return betterAuth({
    appName: "BRISK CMS",
    baseURL,
    basePath: "/api/auth",
    secret,
    database,
    trustedOrigins: [baseURL],
    emailAndPassword: {
      enabled: true,
      disableSignUp: true,
      minPasswordLength: 8,
      maxPasswordLength: 128,
      resetPasswordTokenExpiresIn: 30 * 60,
      revokeSessionsOnPasswordReset: true,
      ...(isEmailConfigured() ? {
        sendResetPassword: async ({ user, url }: { user: { email: string }; url: string }) => {
          if (!isCmsOwner(user.email)) return;
          // Next keeps this task alive after the generic reset response is sent.
          after(async () => {
            try {
              const safeUrl = url.replaceAll("&", "&amp;").replaceAll('"', "&quot;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
              const result = await sendEmail({
                from: process.env.CONTACT_FROM || process.env.RESEND_FROM || "BRISK <info@brisk.be>",
                to: getCmsOwnerEmail(),
                subject: "Reset your BRISK CMS password",
                html: `<p>A password reset was requested for your BRISK CMS account.</p><p><a href="${safeUrl}">Choose a new password</a></p><p>This link expires in 30 minutes. If you did not request this, you can ignore this email.</p>`,
                text: `A password reset was requested for your BRISK CMS account. Choose a new password: ${url}\n\nThis link expires in 30 minutes. If you did not request this, you can ignore this email.`,
              });
              if (!result.ok) console.error("[CMS auth] Password reset email could not be delivered.");
            } catch {
              console.error("[CMS auth] Password reset email could not be delivered.");
            }
          });
        },
      } : {}),
    },
    user: {
      changeEmail: { enabled: false },
      deleteUser: { enabled: false },
    },
    session: {
      expiresIn: 60 * 60 * 24 * 7,
      updateAge: 60 * 60 * 24,
      cookieCache: { enabled: false },
    },
    rateLimit: {
      enabled: true,
      storage: "database",
      customStorage: { consume: consumeAuthRateLimit },
      window: 60,
      max: 120,
      customRules: {
        "/sign-in/email": { window: 60, max: 5 },
        "/request-password-reset": { window: 300, max: 3 },
        "/reset-password": { window: 60, max: 5 },
        "/change-password": { window: 60, max: 5 },
      },
    },
    advanced: {
      cookiePrefix: "brisk-cms",
      useSecureCookies: process.env.NODE_ENV === "production",
      defaultCookieAttributes: { httpOnly: true, sameSite: "lax", path: "/" },
      // Vercel overwrites this header at the edge. Do not trust arbitrary IP headers there.
      ipAddress: { ipAddressHeaders: process.env.VERCEL ? ["x-vercel-forwarded-for"] : ["x-forwarded-for"] },
    },
    databaseHooks: {
      user: {
        create: { before: async () => false },
        update: {
          before: async (user) => {
            if (user.email && !isCmsOwner(user.email)) return false;
          },
        },
      },
      session: {
        create: {
          before: async (session) => {
            const result = await database.query<{ email: string }>('SELECT email FROM "user" WHERE id = $1', [session.userId]);
            if (!result.rows[0] || !isCmsOwner(result.rows[0].email)) {
              throw new APIError("UNAUTHORIZED", { message: "Invalid email or password." });
            }
          },
        },
      },
    },
    // Avoid vendor logs containing reset URLs, SQL details or personal data.
    logger: { disabled: true },
  });
}

let auth: ReturnType<typeof createCmsAuth> | undefined;

/** Lazy initialization lets the public website build without CMS credentials. */
export function getAuth() {
  auth ??= createCmsAuth();
  return auth;
}

/** Private APIs must call this for every request; a cookie alone grants no access. */
export async function getCmsSession(requestHeaders?: Headers) {
  const incomingHeaders = requestHeaders ?? await headers();
  try {
    const session = await getAuth().api.getSession({
      headers: incomingHeaders,
      query: { disableCookieCache: true, disableRefresh: true },
    });
    return session && isCmsOwner(session.user.email) ? session : null;
  } catch {
    throw new CmsUnavailableError(unavailableMessage);
  }
}

export async function requireCmsSession() {
  const session = await getCmsSession().catch(() => null);
  if (!session) redirect("/cms/login");
  return session;
}
