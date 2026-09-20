import "server-only";
import { createHmac, randomBytes, randomUUID } from "node:crypto";
import type { PoolClient } from "pg";
import { getDb, transaction } from "./db";
import { CmsError, CmsUnavailableError } from "./errors";
import { quoteTotals } from "./quote-math";
import {
  assertDateOrder, clientPatchSchema, clientSchema, followUpPatchSchema, followUpSchema,
  idSchema, projectPatchSchema, projectSchema, quotePatchSchema, quoteSchema,
  responseSchema, tokenSchema, validate,
} from "./validation";
import type { Activity, Client, CmsData, FollowUp, Project, PublicQuote, Quote, QuoteClient } from "./types";
import { followUpStatusLabels } from "./types";

type Row = Record<string, unknown>;
type Table = "cms_clients" | "cms_projects" | "cms_follow_ups" | "cms_quotes";
const timestamp = (value: unknown) => value instanceof Date ? value.toISOString() : String(value);
const nullableTimestamp = (value: unknown) => value == null ? null : timestamp(value);
const day = (value: unknown) => value == null ? null : value instanceof Date ? value.toISOString().slice(0, 10) : String(value).slice(0, 10);
const base = (row: Row) => ({ id: String(row.id), createdAt: timestamp(row.created_at), updatedAt: timestamp(row.updated_at) });
const asClient = (row: Row): Client => ({ ...base(row), name: String(row.name), company: String(row.company), email: String(row.email), phone: String(row.phone), vatNumber: String(row.vat_number), address: String(row.address), notes: String(row.notes), status: row.status as Client["status"] });
const asProject = (row: Row): Project => ({ ...base(row), clientId: String(row.client_id), title: String(row.title), description: String(row.description), status: row.status as Project["status"], service: String(row.service), budgetCents: Number(row.budget_cents), startDate: day(row.start_date), dueDate: day(row.due_date), progress: Number(row.progress) });
const asFollowUp = (row: Row): FollowUp => ({ ...base(row), clientId: row.client_id == null ? null : String(row.client_id), projectId: row.project_id == null ? null : String(row.project_id), title: String(row.title), notes: String(row.notes), dueAt: timestamp(row.due_at), status: row.status as FollowUp["status"], priority: row.priority as FollowUp["priority"], type: row.type as FollowUp["type"] });
const asQuote = (row: Row): Quote => ({
  ...base(row), number: String(row.number), clientId: String(row.client_id), title: String(row.title), status: row.status as Quote["status"], currency: "EUR",
  issueDate: day(row.issue_date)!, validUntil: day(row.valid_until)!, introduction: String(row.introduction), terms: String(row.terms), items: row.items as Quote["items"],
  discountCents: Number(row.discount_cents), subtotalCents: Number(row.subtotal_cents), vatCents: Number(row.vat_cents), totalCents: Number(row.total_cents),
  clientSnapshot: row.client_snapshot as QuoteClient | null, shareToken: row.share_token as string | null, sharedAt: nullableTimestamp(row.shared_at),
  viewedAt: nullableTimestamp(row.viewed_at), acceptedAt: nullableTimestamp(row.accepted_at), acceptedName: row.accepted_name as string | null, acceptedEmail: row.accepted_email as string | null,
});
// Translate the original system-generated templates when reading older events.
// The captured client names and project titles remain unchanged in the activity log.
const legacyActivityTemplates: [RegExp, string, string][] = [
  [/^Added client ([\s\S]*)\.$/, "Klant", "toegevoegd"],
  [/^Archived client ([\s\S]*)\.$/, "Klant", "gearchiveerd"],
  [/^Updated client ([\s\S]*)\.$/, "Klant", "bijgewerkt"],
  [/^Created project ([\s\S]*)\.$/, "Project", "aangemaakt"],
  [/^Updated project ([\s\S]*)\.$/, "Project", "bijgewerkt"],
  [/^Added follow-up ([\s\S]*)\.$/, "Opvolging", "toegevoegd"],
  [/^Completed follow-up ([\s\S]*)\.$/, "Opvolging", "afgerond"],
  [/^Updated follow-up ([\s\S]*)\.$/, "Opvolging", "bijgewerkt"],
  [/^Deleted follow-up ([\s\S]*)\.$/, "Opvolging", "verwijderd"],
  [/^Created quote ([\s\S]*)\.$/, "Offerte", "aangemaakt"],
  [/^Updated quote ([\s\S]*)\.$/, "Offerte", "bijgewerkt"],
  [/^Shared quote ([\s\S]*)\.$/, "Offerte", "gedeeld"],
  [/^Revoked the share link for quote ([\s\S]*)\.$/, "Link voor offerte", "ingetrokken"],
  [/^Accepted quote ([\s\S]*)\.$/, "Offerte", "goedgekeurd"],
  [/^Declined quote ([\s\S]*)\.$/, "Offerte", "afgewezen"],
];
function activityDescription(value: unknown) {
  const description = String(value);
  for (const [pattern, subject, action] of legacyActivityTemplates) {
    const match = pattern.exec(description);
    if (match) return `${subject} ${match[1]} ${action}.`;
  }
  return description;
}
const asActivity = (row: Row): Activity => ({ id: String(row.id), description: activityDescription(row.description), href: row.href as string | null, createdAt: timestamp(row.created_at) });
const publicQuote = (quote: Quote): PublicQuote => {
  // Use an explicit allowlist: newly added private fields never leak publicly.
  return {
    id: quote.id, number: quote.number, title: quote.title, status: quote.status, currency: quote.currency,
    issueDate: quote.issueDate, validUntil: quote.validUntil, introduction: quote.introduction, terms: quote.terms,
    items: quote.items, discountCents: quote.discountCents, subtotalCents: quote.subtotalCents, vatCents: quote.vatCents,
    totalCents: quote.totalCents, clientSnapshot: quote.clientSnapshot, sharedAt: quote.sharedAt, viewedAt: quote.viewedAt,
    acceptedAt: quote.acceptedAt, acceptedName: quote.acceptedName, createdAt: quote.createdAt, updatedAt: quote.updatedAt,
  };
};

// SQL identifiers below are fixed server-side maps, never caller-provided names.
const clientColumns = { name: "name", company: "company", email: "email", phone: "phone", vatNumber: "vat_number", address: "address", notes: "notes", status: "status" };
const projectColumns = { clientId: "client_id", title: "title", description: "description", status: "status", service: "service", budgetCents: "budget_cents", startDate: "start_date", dueDate: "due_date", progress: "progress" };
const followUpColumns = { clientId: "client_id", projectId: "project_id", title: "title", notes: "notes", dueAt: "due_at", status: "status", priority: "priority", type: "type" };
const quoteColumns = { clientId: "client_id", title: "title", issueDate: "issue_date", validUntil: "valid_until", introduction: "introduction", terms: "terms", items: "items", discountCents: "discount_cents", subtotalCents: "subtotal_cents", vatCents: "vat_cents", totalCents: "total_cents" };

function fields(values: Record<string, unknown>, columns: Record<string, string>) {
  const keys = Object.keys(values).filter((key) => columns[key]);
  return { names: keys.map((key) => columns[key]), values: keys.map((key) => key === "items" ? JSON.stringify(values[key]) : values[key]) };
}
async function insert(db: PoolClient, table: Table, values: Record<string, unknown>, columns: Record<string, string>, extra: Record<string, unknown> = {}): Promise<Row> {
  const mapped = fields(values, columns);
  const names = ["id", ...mapped.names, ...Object.keys(extra)];
  const parameters = [randomUUID(), ...mapped.values, ...Object.values(extra)];
  return (await db.query(`INSERT INTO ${table} (${names.join(",")}) VALUES (${parameters.map((_, index) => `$${index + 1}`).join(",")}) RETURNING *`, parameters)).rows[0];
}
async function update(db: PoolClient, table: Table, id: string, values: Record<string, unknown>, columns: Record<string, string>): Promise<Row> {
  const mapped = fields(values, columns);
  return (await db.query(`UPDATE ${table} SET ${mapped.names.map((name, index) => `${name}=$${index + 2}`).join(",")},updated_at=now() WHERE id=$1 RETURNING *`, [id, ...mapped.values])).rows[0];
}
async function locked(db: PoolClient, table: Table, id: string): Promise<Row> {
  validate(idSchema, id);
  const result = await db.query(`SELECT * FROM ${table} WHERE id=$1 FOR UPDATE`, [id]);
  if (!result.rowCount) throw new CmsError("Deze gegevens zijn niet gevonden.", 404);
  return result.rows[0];
}
async function requireClient(db: PoolClient, id: string): Promise<Client> {
  const result = await db.query("SELECT * FROM cms_clients WHERE id=$1", [id]);
  if (!result.rowCount) throw new CmsError("Kies een bestaande klant.", 422, { clientId: "Klant niet gevonden." });
  return asClient(result.rows[0]);
}
async function logActivity(db: PoolClient, description: string, href: string) {
  await db.query("INSERT INTO cms_activity (id,description,href) VALUES ($1,$2,$3)", [randomUUID(), description, href]);
}

export async function getCmsData(user: CmsData["user"]): Promise<CmsData> {
  const db = getDb();
  const [clients, projects, followUps, quotes, activity] = await Promise.all([
    db.query("SELECT * FROM cms_clients ORDER BY updated_at DESC"), db.query("SELECT * FROM cms_projects ORDER BY updated_at DESC"),
    db.query("SELECT * FROM cms_follow_ups ORDER BY due_at ASC"), db.query("SELECT * FROM cms_quotes ORDER BY created_at DESC"),
    db.query("SELECT * FROM cms_activity ORDER BY created_at DESC LIMIT 100"),
  ]);
  return { user: { name: user.name, email: user.email }, clients: clients.rows.map(asClient), projects: projects.rows.map(asProject), followUps: followUps.rows.map(asFollowUp), quotes: quotes.rows.map(asQuote), activity: activity.rows.map(asActivity) };
}

export async function createClient(input: unknown): Promise<Client> {
  const values = validate(clientSchema, input);
  return transaction(async (db) => {
    const client = asClient(await insert(db, "cms_clients", values, clientColumns));
    await logActivity(db, `Klant ${client.name} toegevoegd.`, `/cms/clients/${client.id}`);
    return client;
  });
}
export async function updateClient(id: string, input: unknown): Promise<Client> {
  const values = validate(clientPatchSchema, input);
  return transaction(async (db) => {
    await locked(db, "cms_clients", id);
    const client = asClient(await update(db, "cms_clients", id, values, clientColumns));
    await logActivity(db, values.status === "archived" ? `Klant ${client.name} gearchiveerd.` : `Klant ${client.name} bijgewerkt.`, `/cms/clients/${id}`);
    return client;
  });
}
export async function createProject(input: unknown): Promise<Project> {
  const values = validate(projectSchema, input);
  assertDateOrder(values.startDate, values.dueDate, "dueDate");
  return transaction(async (db) => {
    await requireClient(db, values.clientId);
    const project = asProject(await insert(db, "cms_projects", values, projectColumns));
    await logActivity(db, `Project ${project.title} aangemaakt.`, `/cms/projects/${project.id}`);
    return project;
  });
}
export async function updateProject(id: string, input: unknown): Promise<Project> {
  const values = validate(projectPatchSchema, input);
  return transaction(async (db) => {
    const previous = asProject(await locked(db, "cms_projects", id));
    const merged = { ...previous, ...values };
    assertDateOrder(merged.startDate, merged.dueDate, "dueDate");
    await requireClient(db, merged.clientId);
    if (merged.clientId !== previous.clientId) {
      const linked = await db.query("SELECT 1 FROM cms_follow_ups WHERE project_id=$1 LIMIT 1", [id]);
      if (linked.rowCount) throw new CmsError("Aan dit project zijn opvolgingen gekoppeld. Behoud de huidige klant of verplaats eerst de opvolgingen.", 409);
    }
    const project = asProject(await update(db, "cms_projects", id, values, projectColumns));
    await logActivity(db, `Project ${project.title} bijgewerkt.`, `/cms/projects/${id}`);
    return project;
  });
}
async function validateFollowUpLinks(db: PoolClient, values: { clientId: string | null; projectId: string | null }) {
  if (values.clientId) await requireClient(db, values.clientId);
  if (values.projectId) {
    // Serialize project reassignment with creating/updating a linked follow-up.
    const project = await locked(db, "cms_projects", values.projectId);
    if (values.clientId && values.clientId !== project.client_id) throw new CmsError("Dit project hoort bij een andere klant.", 422, { projectId: "Kies een project van deze klant." });
    values.clientId = String(project.client_id);
  }
}
export async function createFollowUp(input: unknown): Promise<FollowUp> {
  const values = validate(followUpSchema, input);
  return transaction(async (db) => {
    await validateFollowUpLinks(db, values);
    const followUp = asFollowUp(await insert(db, "cms_follow_ups", values, followUpColumns));
    await logActivity(db, `Opvolging ${followUp.title} toegevoegd.`, "/cms/follow-ups");
    return followUp;
  });
}
export async function updateFollowUp(id: string, input: unknown): Promise<FollowUp> {
  const values = validate(followUpPatchSchema, input);
  return transaction(async (db) => {
    const previous = asFollowUp(await locked(db, "cms_follow_ups", id));
    const merged = { ...previous, ...values };
    await validateFollowUpLinks(db, merged);
    const followUp = asFollowUp(await update(db, "cms_follow_ups", id, { ...values, clientId: merged.clientId }, followUpColumns));
    await logActivity(db, previous.status !== followUp.status
      ? `Opvolging ${followUp.title}: status gewijzigd naar ${followUpStatusLabels[followUp.status]}.`
      : `Opvolging ${followUp.title} bijgewerkt.`, "/cms/follow-ups");
    return followUp;
  });
}
export async function deleteFollowUp(id: string) {
  return transaction(async (db) => {
    const followUp = asFollowUp(await locked(db, "cms_follow_ups", id));
    await db.query("DELETE FROM cms_follow_ups WHERE id=$1", [id]);
    await logActivity(db, `Opvolging ${followUp.title} verwijderd.`, "/cms/follow-ups");
    return { ok: true as const };
  });
}

async function nextQuoteNumber(db: PoolClient, issueDate: string) {
  const year = Number(issueDate.slice(0, 4));
  const result = await db.query("INSERT INTO cms_quote_sequences (year,value) VALUES ($1,1) ON CONFLICT (year) DO UPDATE SET value=cms_quote_sequences.value+1 RETURNING value", [year]);
  return `BR-${year}-${String(result.rows[0].value).padStart(4, "0")}`;
}
async function insertQuote(db: PoolClient, input: unknown): Promise<Quote> {
  const values = validate(quoteSchema, input);
  assertDateOrder(values.issueDate, values.validUntil, "validUntil");
  await requireClient(db, values.clientId);
  const number = await nextQuoteNumber(db, values.issueDate);
  const quote = asQuote(await insert(db, "cms_quotes", { ...values, ...quoteTotals(values.items, values.discountCents) }, quoteColumns, { number }));
  await logActivity(db, `Offerte ${number} aangemaakt.`, `/cms/quotes/${quote.id}`);
  return quote;
}
export function createQuote(input: unknown): Promise<Quote> { return transaction((db) => insertQuote(db, input)); }
export async function updateQuote(id: string, input: unknown): Promise<Quote> {
  const patch = validate(quotePatchSchema, input);
  return transaction(async (db) => {
    const previous = asQuote(await locked(db, "cms_quotes", id));
    if (previous.status !== "draft") throw new CmsError("Je kunt alleen conceptoffertes bewerken. Trek eerst de gedeelde link in of dupliceer deze offerte.", 409);
    const merged = { ...previous, ...patch };
    assertDateOrder(merged.issueDate, merged.validUntil, "validUntil");
    await requireClient(db, merged.clientId);
    const quote = asQuote(await update(db, "cms_quotes", id, { ...patch, ...quoteTotals(merged.items, merged.discountCents) }, quoteColumns));
    await logActivity(db, `Offerte ${quote.number} bijgewerkt.`, `/cms/quotes/${id}`);
    return quote;
  });
}
const unexpiredSql = "now() < ((valid_until + 1)::timestamp AT TIME ZONE 'Europe/Brussels')";
export async function shareQuote(id: string): Promise<Quote> {
  return transaction(async (db) => {
    const row = await locked(db, "cms_quotes", id);
    const quote = asQuote(row);
    if (quote.shareToken) return quote;
    const valid = await db.query(`SELECT 1 FROM cms_quotes WHERE id=$1 AND ${unexpiredSql}`, [id]);
    if (!valid.rowCount) throw new CmsError("Pas de geldigheidsdatum aan voordat je deze offerte deelt.", 422, { validUntil: "Deze offerte is verlopen." });
    const client = await requireClient(db, quote.clientId);
    const snapshot: QuoteClient = { name: client.name, company: client.company, email: client.email, address: client.address, vatNumber: client.vatNumber };
    const result = await db.query("UPDATE cms_quotes SET status='shared',client_snapshot=$2::jsonb,share_token=$3,shared_at=now(),viewed_at=NULL,accepted_at=NULL,accepted_name=NULL,accepted_email=NULL,response_ip_hash=NULL,response_consent_at=NULL,updated_at=now() WHERE id=$1 RETURNING *", [id, JSON.stringify(snapshot), randomBytes(32).toString("base64url")]);
    await logActivity(db, `Offerte ${quote.number} gedeeld.`, `/cms/quotes/${id}`);
    return asQuote(result.rows[0]);
  });
}
export async function revokeQuote(id: string): Promise<Quote> {
  return transaction(async (db) => {
    const quote = asQuote(await locked(db, "cms_quotes", id));
    if (quote.status === "accepted") throw new CmsError("Goedgekeurde offertes kunnen niet worden gewijzigd. Dupliceer de offerte om een nieuwe versie te maken.", 409);
    if (quote.status === "draft") return quote;
    const result = await db.query("UPDATE cms_quotes SET status='draft',share_token=NULL,client_snapshot=NULL,shared_at=NULL,viewed_at=NULL,accepted_at=NULL,accepted_name=NULL,accepted_email=NULL,response_ip_hash=NULL,response_consent_at=NULL,updated_at=now() WHERE id=$1 RETURNING *", [id]);
    await logActivity(db, `Link voor offerte ${quote.number} ingetrokken.`, `/cms/quotes/${id}`);
    return asQuote(result.rows[0]);
  });
}
export async function duplicateQuote(id: string): Promise<Quote> {
  return transaction(async (db) => {
    const quote = asQuote(await locked(db, "cms_quotes", id));
    const issueDate = new Date().toISOString().slice(0, 10);
    const validUntil = new Date(Date.now() + 30 * 86_400_000).toISOString().slice(0, 10);
    return insertQuote(db, { clientId: quote.clientId, title: quote.title, issueDate, validUntil, introduction: quote.introduction, terms: quote.terms, items: quote.items.map((item) => ({ ...item, id: randomUUID() })), discountCents: quote.discountCents });
  });
}

/** Token lookup never exposes private client records, internal notes, or email of a signer. */
export async function getPublicQuote(token: string): Promise<PublicQuote | null> {
  if (!tokenSchema.safeParse(token).success) return null;
  const result = await getDb().query(`UPDATE cms_quotes SET viewed_at=COALESCE(viewed_at,now()) WHERE share_token=$1 AND status IN ('shared','accepted','declined') AND ${unexpiredSql} RETURNING *`, [token]);
  return result.rowCount ? publicQuote(asQuote(result.rows[0])) : null;
}

/** Database-backed, atomic fixed-window limiter; works across serverless instances. */
export async function consumeRateLimit(key: string, limit: number, windowSeconds: number) {
  const result = await getDb().query(`INSERT INTO cms_rate_limits (key,window_start,count) VALUES ($1,now(),1)
    ON CONFLICT (key) DO UPDATE SET
      count=CASE WHEN cms_rate_limits.window_start <= now()-make_interval(secs=>$2) THEN 1 ELSE LEAST(cms_rate_limits.count+1,$3::integer+1) END,
      window_start=CASE WHEN cms_rate_limits.window_start <= now()-make_interval(secs=>$2) THEN now() ELSE cms_rate_limits.window_start END
    RETURNING count`, [key, windowSeconds, limit]);
  if (Number(result.rows[0].count) === 1) await getDb().query("DELETE FROM cms_rate_limits WHERE window_start < now()-interval '1 day'");
  if (Number(result.rows[0].count) > limit) throw new CmsError("Te veel pogingen. Wacht enkele minuten en probeer het opnieuw.", 429);
}
export function privateFingerprint(value: string) {
  if (!process.env.BETTER_AUTH_SECRET) throw new CmsUnavailableError();
  return createHmac("sha256", process.env.BETTER_AUTH_SECRET).update(value).digest("hex");
}
export async function respondToQuote(token: string, input: unknown, ipHash: string): Promise<PublicQuote> {
  if (!tokenSchema.safeParse(token).success) throw new CmsError("Deze offertelink is niet beschikbaar.", 404);
  const values = validate(responseSchema, input);
  return transaction(async (db) => {
    const found = await db.query("SELECT * FROM cms_quotes WHERE share_token=$1 FOR UPDATE", [token]);
    if (!found.rowCount) throw new CmsError("Deze offertelink is niet beschikbaar.", 404);
    const quote = asQuote(found.rows[0]);
    if (quote.status !== "shared") throw new CmsError("Er is al een reactie op deze offerte opgeslagen.", 409);
    const valid = await db.query(`SELECT 1 FROM cms_quotes WHERE id=$1 AND ${unexpiredSql}`, [quote.id]);
    if (!valid.rowCount) throw new CmsError("Deze offerte is verlopen. Neem contact op met Brisk voor een bijgewerkte offerte.", 410);
    const result = await db.query("UPDATE cms_quotes SET status=$2,accepted_at=CASE WHEN $2='accepted' THEN now() ELSE NULL END,accepted_name=$3,accepted_email=$4,response_ip_hash=$5,response_consent_at=now(),updated_at=now() WHERE id=$1 AND status='shared' RETURNING *", [quote.id, values.decision, values.name, values.email.toLowerCase(), ipHash]);
    if (!result.rowCount) throw new CmsError("Er is al een reactie op deze offerte opgeslagen.", 409);
    await logActivity(db, `Offerte ${quote.number} ${values.decision === "accepted" ? "goedgekeurd" : "afgewezen"}.`, `/cms/quotes/${quote.id}`);
    return publicQuote(asQuote(result.rows[0]));
  });
}
