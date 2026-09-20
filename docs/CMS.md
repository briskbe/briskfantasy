# Brisk workspace

The private workspace lives at `/cms`; sign-in is `/cms/login`. Clients, projects, follow-ups, quotes and activity are stored in PostgreSQL. An empty database produces real empty states. The workspace and public quote pages use separate layouts from the marketing site and do not load its Analytics integration.

## Environment and local setup

Use Node.js 24 and the repository's pinned pnpm version. Copy the variable names from `.env.example` into an untracked `.env.local`, then supply the values through your local secret store or deployment environment.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string. Production uses the Neon database connected to Vercel. |
| `BETTER_AUTH_SECRET` | Random secret of at least 32 characters. Keep the same value across instances of one environment. |
| `BETTER_AUTH_URL` | Exact public origin, including scheme and local port. Production: `https://www.brisk.be`. |
| `CMS_OWNER_EMAIL` | Only email allowed to access the workspace; defaults to `info@brisk.be`. |
| `CMS_INITIAL_PASSWORD` | Temporary input to the bootstrap command, 8–128 characters. Not needed by the running application. |
| `TEST_DATABASE_URL` | Local PostgreSQL server for integration tests; its role must be able to create temporary databases. |
| `RESEND_API_KEY` | Existing email integration; enables password-reset emails. |
| `CONTACT_FROM` or `RESEND_FROM` | Existing verified email sender, used for password reset. |

Never use a `NEXT_PUBLIC_` prefix for these secrets or commit environment files. Remove `CMS_INITIAL_PASSWORD` from the environment after setup. Changing the auth secret invalidates existing signed session cookies.

For a local application on port 3002, set `BETTER_AUTH_URL=http://localhost:3002`. Use that same hostname in the browser. Keep development, automated test and production databases separate.

```sh
pnpm install --frozen-lockfile
pnpm cms:migrate
pnpm cms:bootstrap
pnpm dev --port 3002
```

The package commands load `.env.local` if present. Variables already exported by the shell take precedence. In a deployment job, supply the intended environment directly and run:

```sh
node scripts/cms-migrate.mjs
node scripts/cms-bootstrap.mjs
```

## Migrations and owner bootstrap

`migrations/cms/001-auth.sql` creates Better Auth's user, credential, session, verification and rate-limit tables. `002-workspace.sql` creates the business records, quote sequence, activity log and public-response rate limits. `003-follow-up-statuses.sql` expands follow-up statuses without rewriting existing records.

The migration runner serializes concurrent runs with a PostgreSQL transaction advisory lock. All pending migrations and their SHA-256 checksums commit together; failure rolls back the batch. This lock is compatible with transaction pooling. Applied files must not be edited: add a new numbered migration instead. Repeated runs verify the checksums and leave existing data intact.

The bootstrap command creates only the configured owner. It stores a salted scrypt password hash through Better Auth's password utility. Re-running setup preserves an existing owner's password. It does not create example business records or enable registration.

For an intentional administrative password replacement, provide a new `CMS_INITIAL_PASSWORD` through the environment and run:

```sh
pnpm cms:bootstrap --reset-password
```

This explicit reset revokes that owner's existing sessions and outstanding password-reset links. Normal users can instead change their password in workspace settings or use the sign-in page's reset flow when Resend is configured. Reset links expire after 30 minutes and can be used once.

## Authentication and request boundaries

- Better Auth uses durable database sessions. Cookies are `HttpOnly`, `SameSite=Lax` and `Secure` in production. Sessions last up to seven days; password reset and sign-out revoke access.
- Public registration, account deletion and email changes are disabled. Creating another row in the auth database does not grant workspace access: every private API and protected server layout checks the configured owner email against a real session.
- Every mutation requires an `Origin` matching the request's origin and rejects cross-site Fetch Metadata. Better Auth additionally validates its trusted origin and reset redirects against `BETTER_AUTH_URL`.
- On Vercel, rate limits use its `x-vercel-forwarded-for` header. Login allows five attempts per minute; password-reset requests allow three per five minutes. Counters are consumed atomically in PostgreSQL, so parallel serverless instances share the same limit.
- Unknown/private errors return generic messages. Request bodies, passwords, tokens, connection strings and SQL parameters are not intentionally logged by the CMS.
- `/cms`, `/quote`, and the associated APIs have no-store/noindex/no-referrer headers and deny framing. Robots rules and the sitemap exclude the workspace and quote links. These indexing controls supplement authentication; they do not grant or deny access themselves.
- Auth and database initialization are lazy. The marketing site can build without database credentials. An unconfigured or unavailable database never enables a demo login or substitutes fake records; private APIs fail closed.

The endpoint implementations remain the security boundary. The proxy only bypasses locale rewriting and adds headers; it does not authenticate requests. Do not rely on hiding links or protecting only the workspace layout when adding an API.

## Records and APIs

All private endpoints below require the owner session. Dates are ISO strings, date-only fields use `YYYY-MM-DD`, and monetary values are integer EUR cents. Schemas reject unknown fields and invalid references. Writes use parameterized SQL and record activity in the same transaction.

| Endpoint | Behavior |
| --- | --- |
| `GET /api/cms/data` | Returns the signed-in user's display details, clients, projects, follow-ups, quotes and latest 100 activities. |
| `POST /api/cms/clients` | Creates a client. |
| `PATCH /api/cms/clients/:id` | Updates or archives a client; there is no destructive client-delete endpoint. |
| `POST /api/cms/projects` | Creates a project linked to an existing client. |
| `PATCH /api/cms/projects/:id` | Updates a project, with date and linked-follow-up consistency checks. |
| `POST /api/cms/follow-ups` | Creates a task, call, email or meeting reminder. |
| `PATCH /api/cms/follow-ups/:id` | Updates or completes a follow-up. |
| `DELETE /api/cms/follow-ups/:id` | Deletes a follow-up and records that action. |
| `POST /api/cms/quotes` | Creates a draft with a server-generated number and totals. |
| `PATCH /api/cms/quotes/:id` | Edits a draft only. |
| `POST /api/cms/quotes/:id/share` | Freezes a client snapshot and creates a public link. |
| `POST /api/cms/quotes/:id/revoke` | Invalidates an unaccepted quote's link and returns it to draft. |
| `POST /api/cms/quotes/:id/duplicate` | Creates a fresh draft with a new number, item IDs and validity dates. |

Errors use `{ "error": "...", "fields": { "fieldName": "..." } }` when field details are available. Missing sessions return 401, rejected origins 403, missing records 404, conflicting changes 409, validation failures 422, rate limits 429 and service failures 503.

## Follow-up statuses

Follow-ups use four Dutch statuses in this order: **In gesprek** (`open`),
**Gewonnen** (`won`), **Gaat later contact opnemen** (`waiting`), and **Afgerond**
(`done`). The original `open` and `done` values remain valid, so existing rows and
older clients remain compatible. The editor, inline status menu and status filters
share the same labels. Date filters are separate from the status filter.

Dashboard and client open-follow-up counts include `open` and `waiting`.
`won` and `done` do not appear in upcoming reminders or overdue counts. Changing a
follow-up status does not automatically change its client, project or quote.

## Quotes and client responses

Quote numbers use `BR-YYYY-NNNN`; a locked database sequence avoids collisions when drafts are created concurrently. Numbers are identifiers, not an invoice ledger. The server computes totals even when the client previews them.

Quantities support three decimal places and VAT rates two. Each line is rounded to integer cents using exact integer arithmetic. A quote-level discount is allocated proportionally across lines, with remaining cents assigned by largest remainder; VAT is then rounded per discounted line. This handles mixed VAT rates while preserving the exact discount amount. Negative amounts, discounts exceeding the subtotal and totals outside the supported range are rejected.

Sharing creates a cryptographically random 32-byte bearer token and captures only the client's name, company, email, address and VAT number. Later client edits do not alter a shared proposal. Draft terms and items cannot change while shared. Repeating the share request returns the existing link; revoke and share again creates a different token.

The recipient opens `/quote/:token`. The public API is:

- `GET /api/quotes/:token`: returns the public proposal DTO and records the first view.
- `POST /api/quotes/:token/respond`: accepts `{ decision: "accepted" | "declined", name, email, consent: true }`.

Public DTOs omit the share token, internal client ID, signer email, private client notes and response IP hash. Any further fields added to the private model must be deliberately added to the public allowlist before they can leave the server.

Links expire at the end of `validUntil` in the `Europe/Brussels` time zone, including links to already answered quotes. Expired or revoked links are unavailable; an expired response request returns 410. The owner retains the stored proposal in the workspace.

Responding locks the quote row and permits exactly one transition from `shared`. A second or concurrent decision returns 409. Approval records the supplied name and email, timestamp, explicit consent and a keyed IP fingerprint. Accepted quotes cannot be edited or reset to draft; duplicate one to prepare a revision. Declined quotes may be revoked and revised.

The link grants access to whoever possesses it. It is not an authenticated client account, and the entered signer name/email are not independently verified. The public page explains this access model. Share a link only with its intended recipient; use expiry and revocation when appropriate. Printing uses the browser's print/save-PDF flow, with response controls excluded from the print layout.

## Verification

The integration suites require `TEST_DATABASE_URL` pointing to localhost. Each creates a uniquely named database, generates temporary credentials, runs its checks and drops that database. They refuse remote database hosts, never use production records and disable outbound email.

```sh
pnpm cms:test:auth
CMS_TEST_SECURE=1 pnpm cms:test:auth
pnpm cms:test:backend
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

Auth coverage includes signup blocking, owner/non-owner credentials, genuine database sessions, cookie attributes, CSRF and redirect rejection, single-use reset, sign-out, explicit bootstrap reset, concurrent rate limits and bounded `Retry-After` values. The secure variant checks the production HTTPS cookie behavior.

Backend coverage includes simultaneous migration runs, all private API authorization gates, CRUD and archive behavior, reference/date validation, exact money math, concurrent numbering, snapshot privacy, token rotation and expiry, immutable approval, competing responses and durable rate-limit resets. The test-only loader bypasses Next's `server-only` import guard for Node; it is never imported by application code.

## Production deployment

Production uses Vercel and Neon PostgreSQL. Set the runtime variables in Vercel's **Production** environment, including `BETTER_AUTH_URL=https://www.brisk.be`, before promoting the application. Environment changes require a new deployment. Provision preview environments with their own database, secret and exact origin; do not point previews or automated tests at production data.

Use the Neon connection string supplied by the integration with TLS verification enabled. The application uses a small reusable `pg` pool. The migration runner works inside one transaction, including on the pooled endpoint; a direct connection is also supported for administrative jobs. Other database tooling may require a direct connection. See [Neon connection pooling](https://neon.com/docs/connect/connection-pooling) and [Vercel request headers](https://vercel.com/docs/headers/request-headers).

Run migrations as a controlled release step before deploying code that requires the new schema. Bootstrap is a separate one-time setup step, not part of every build. This release's schema and owner can be safely checked with the idempotent commands without resetting credentials. Future migrations should preserve compatibility with the previous app version while a deployment rolls out; rolling back application code does not undo committed database changes.

After deployment, verify `/cms/login`, an unauthenticated 401 from `/api/cms/data`, owner sign-in, sign-out, and the private response headers on the production domain. Perform record-creation and approval regression tests in the isolated environment. Preserve Neon backups/restore settings and migration history when managing the database; website redeployments do not replace database records.
