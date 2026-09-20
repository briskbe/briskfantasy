export const clientStatuses = ["lead", "active", "archived"] as const;
export const projectStatuses = ["planned", "in_progress", "review", "completed", "on_hold"] as const;
export const followUpPriorities = ["low", "normal", "high"] as const;
export const followUpTypes = ["task", "call", "email", "meeting"] as const;
export const followUpStatuses = ["open", "won", "waiting", "done"] as const;
export const followUpStatusLabels: Record<typeof followUpStatuses[number], string> = {
  open: "In gesprek",
  won: "Gewonnen",
  waiting: "Gaat later contact opnemen",
  done: "Afgerond",
};
export function isOpenFollowUp(status: typeof followUpStatuses[number]): boolean {
  return status === "open" || status === "waiting";
}
export const quoteStatuses = ["draft", "shared", "accepted", "declined"] as const;

export type Client = {
  id: string; name: string; company: string; email: string; phone: string;
  vatNumber: string; address: string; notes: string;
  status: typeof clientStatuses[number]; createdAt: string; updatedAt: string;
};
export type Project = {
  id: string; clientId: string; title: string; description: string;
  status: typeof projectStatuses[number]; service: string; budgetCents: number;
  startDate: string | null; dueDate: string | null; progress: number;
  createdAt: string; updatedAt: string;
};
export type FollowUp = {
  id: string; clientId: string | null; projectId: string | null; title: string; notes: string;
  dueAt: string; status: typeof followUpStatuses[number]; priority: typeof followUpPriorities[number];
  type: typeof followUpTypes[number]; createdAt: string; updatedAt: string;
};
export type QuoteItem = { id: string; description: string; quantity: number; unitPriceCents: number; vatRate: number };
export type QuoteClient = Pick<Client, "name" | "company" | "email" | "address" | "vatNumber">;
export type Quote = {
  id: string; number: string; clientId: string; title: string; status: typeof quoteStatuses[number];
  currency: "EUR"; issueDate: string; validUntil: string; introduction: string; terms: string;
  items: QuoteItem[]; discountCents: number; subtotalCents: number; vatCents: number; totalCents: number;
  clientSnapshot: QuoteClient | null; shareToken: string | null; sharedAt: string | null;
  viewedAt: string | null; acceptedAt: string | null; acceptedName: string | null;
  acceptedEmail: string | null; createdAt: string; updatedAt: string;
};
export type Activity = { id: string; description: string; createdAt: string; href: string | null };
export type CmsData = {
  user: { name: string; email: string };
  clients: Client[]; projects: Project[]; followUps: FollowUp[]; quotes: Quote[]; activity: Activity[];
};
export type PublicQuote = Omit<Quote, "shareToken" | "clientId" | "acceptedEmail">;
