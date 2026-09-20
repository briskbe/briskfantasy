import { z } from "zod";
import { randomUUID } from "node:crypto";
import { clientStatuses, followUpPriorities, followUpTypes, projectStatuses } from "./types";
import { CmsError } from "./errors";
import { MAX_CENTS } from "./constants";

const text = (max: number) => z.string().trim().max(max);
const title = text(200).min(1, "This field is required.");
const email = z.union([z.email().max(254), z.literal("")]);
const cents = z.number().int().min(0).max(MAX_CENTS);
export const idSchema = z.uuid();
export const tokenSchema = z.string().regex(/^[A-Za-z0-9_-]{43}$/);
const date = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine((value) => {
  const parsed = new Date(`${value}T00:00:00.000Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.getUTCFullYear() >= 1 && parsed.toISOString().slice(0, 10) === value;
}, "Use a valid date.");
const nullableDate = date.nullable();
export const clientSchema = z.object({
  name: title, company: text(200), email, phone: text(80), vatNumber: text(80),
  address: text(1000), notes: text(20_000), status: z.enum(clientStatuses),
}).strict();
export const clientPatchSchema = clientSchema.partial().refine((value) => Object.keys(value).length > 0, "Supply a field to update.");
export const projectSchema = z.object({
  clientId: idSchema, title, description: text(20_000), status: z.enum(projectStatuses),
  service: text(200), budgetCents: cents, startDate: nullableDate, dueDate: nullableDate,
  progress: z.number().int().min(0).max(100),
}).strict();
export const projectPatchSchema = projectSchema.partial().refine((value) => Object.keys(value).length > 0, "Supply a field to update.");
export const followUpSchema = z.object({
  clientId: idSchema.nullable(), projectId: idSchema.nullable(), title, notes: text(20_000),
  dueAt: z.iso.datetime({ offset: true }).transform((value) => new Date(value).toISOString()),
  status: z.enum(["open", "done"]), priority: z.enum(followUpPriorities), type: z.enum(followUpTypes),
}).strict();
export const followUpPatchSchema = followUpSchema.partial().refine((value) => Object.keys(value).length > 0, "Supply a field to update.");
const decimalPlaces = (value: number, scale: number) => value === Number(value.toFixed(Math.log10(scale)));
export const quoteItemSchema = z.object({
  id: idSchema.optional().transform((value) => value ?? randomUUID()),
  description: text(2000).min(1, "Describe this item."),
  quantity: z.number().positive().max(1_000_000).refine((value) => decimalPlaces(value, 1000), "Use at most three decimal places."),
  unitPriceCents: cents,
  vatRate: z.number().min(0).max(100).refine((value) => decimalPlaces(value, 100), "Use at most two decimal places."),
}).strict();
export const quoteSchema = z.object({
  clientId: idSchema, title, issueDate: date, validUntil: date,
  introduction: text(20_000), terms: text(30_000),
  items: z.array(quoteItemSchema).min(1).max(100).refine((items) => new Set(items.map((item) => item.id)).size === items.length, "Item IDs must be unique."),
  discountCents: cents,
}).strict();
export const quotePatchSchema = quoteSchema.partial().refine((value) => Object.keys(value).length > 0, "Supply a field to update.");
export const responseSchema = z.object({
  decision: z.enum(["accepted", "declined"]), name: text(200).min(2), email: z.email().max(254), consent: z.literal(true),
}).strict();

export function validate<T>(schema: z.ZodType<T>, input: unknown): T {
  const result = schema.safeParse(input);
  if (result.success) return result.data;
  const fields: Record<string, string> = {};
  for (const issue of result.error.issues) fields[issue.path.join(".") || "form"] ??= issue.message;
  throw new CmsError("Check the highlighted fields and try again.", 422, fields);
}

export function assertDateOrder(start: string | null, end: string | null, endField: string) {
  if (start && end && end < start) throw new CmsError("The end date cannot be before the start date.", 422, { [endField]: "Choose a date on or after the start date." });
}
