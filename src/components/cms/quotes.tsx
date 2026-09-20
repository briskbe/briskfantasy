"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { Button, Card, Input, Table } from "@heroui/react";
import {
  Check,
  Copy,
  ExternalLink,
  FileText,
  Link2,
  LockKeyhole,
  Plus,
  Printer,
  Save,
  ShieldCheck,
  Trash2,
} from "lucide-react";
import {
  quoteStatuses,
  type Quote,
  type QuoteClient,
  type QuoteItem,
} from "@/lib/cms/types";
import { quoteTotals } from "@/lib/cms/quote-math";
import { useCms } from "./cms-provider";
import {
  ActionLink,
  Choice,
  date,
  EditorModal,
  EmptyState,
  ErrorNotice,
  Field,
  localDate,
  money,
  PageHeading,
  SearchBox,
  StatusBadge,
  titleCase,
  toCents,
  useCmsMutation,
  WorkspaceGate,
} from "./ui";

export function QuotesPage() {
  return (
    <WorkspaceGate>
      <QuotesContent />
    </WorkspaceGate>
  );
}
function QuotesContent() {
  const { data } = useCms();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  if (!data) return null;
  const quotes = data.quotes.filter(
    (quote) =>
      (status === "all" || quote.status === status) &&
      `${quote.title} ${quote.number} ${data.clients.find((client) => client.id === quote.clientId)?.company || ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        eyebrow="Clear proposals. Confident decisions."
        title="Put it in writing."
        description="Build a quote, share a private link, and keep track of the response."
      >
        <ActionLink href="/cms/quotes/new">
          <Plus size={16} />
          Create quote
        </ActionLink>
      </PageHeading>
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[
          {
            label: "In draft",
            count: data.quotes.filter((quote) => quote.status === "draft")
              .length,
            value: "Ready when you are",
          },
          {
            label: "Awaiting a decision",
            count: data.quotes.filter((quote) => quote.status === "shared")
              .length,
            value: money(
              data.quotes
                .filter((quote) => quote.status === "shared")
                .reduce((sum, quote) => sum + quote.totalCents, 0),
            ),
          },
          {
            label: "Accepted",
            count: data.quotes.filter((quote) => quote.status === "accepted")
              .length,
            value: money(
              data.quotes
                .filter((quote) => quote.status === "accepted")
                .reduce((sum, quote) => sum + quote.totalCents, 0),
            ),
          },
        ].map((metric) => (
          <Card
            key={metric.label}
            className="border border-border p-5 shadow-none"
          >
            <p className="text-xs font-medium text-muted">{metric.label}</p>
            <div className="mt-3 flex items-baseline justify-between gap-3">
              <span className="text-3xl font-semibold tracking-tight">
                {metric.count}
              </span>
              <span className="text-xs text-muted">{metric.value}</span>
            </div>
          </Card>
        ))}
      </div>
      <Card className="border border-border p-0 shadow-none">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border p-5">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search quotes…"
          />
          <div className="w-44">
            <Choice
              label="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "All quotes" },
                ...quoteStatuses.map((value) => ({
                  value,
                  label: titleCase(value),
                })),
              ]}
            />
          </div>
        </div>
        {quotes.length ? (
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Quotes" className="min-w-[760px]">
                <Table.Header>
                  <Table.Column isRowHeader>Quote</Table.Column>
                  <Table.Column>Client</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Valid until</Table.Column>
                  <Table.Column>Total incl. VAT</Table.Column>
                  <Table.Column aria-label="Open quote"> </Table.Column>
                </Table.Header>
                <Table.Body>
                  {quotes.map((quote) => (
                    <Table.Row id={quote.id} key={quote.id}>
                      <Table.Cell>
                        <Link
                          className="font-medium hover:underline"
                          href={`/cms/quotes/${quote.id}`}
                        >
                          {quote.title}
                        </Link>
                        <p className="mt-1 text-xs text-muted">
                          {quote.number}
                        </p>
                      </Table.Cell>
                      <Table.Cell>
                        {quote.clientSnapshot?.company ||
                          quote.clientSnapshot?.name ||
                          data.clients.find(
                            (client) => client.id === quote.clientId,
                          )?.company ||
                          data.clients.find(
                            (client) => client.id === quote.clientId,
                          )?.name}
                      </Table.Cell>
                      <Table.Cell>
                        <StatusBadge status={quote.status} />
                      </Table.Cell>
                      <Table.Cell>
                        <span
                          className={
                            quote.validUntil < localDate() &&
                            quote.status === "shared"
                              ? "text-danger"
                              : "text-muted"
                          }
                        >
                          {date(quote.validUntil)}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="font-medium tabular-nums">
                          {money(quote.totalCents)}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Link
                          href={`/cms/quotes/${quote.id}`}
                          aria-label={`Open ${quote.title}`}
                        >
                          <ExternalLink size={15} />
                        </Link>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
        ) : (
          <EmptyState
            icon={<FileText size={25} />}
            title={
              query || status !== "all"
                ? "No quotes match this view."
                : "Make the next yes easy."
            }
            description={
              query || status !== "all"
                ? "Try another search or status filter."
                : "Create a clear, professional proposal with line items, VAT and a private link your client can respond to."
            }
            action={
              <ActionLink href="/cms/quotes/new">
                Create your first quote
              </ActionLink>
            }
          />
        )}
      </Card>
    </>
  );
}

type DraftItem = {
  id: string;
  description: string;
  quantity: string;
  price: string;
  vat: string;
};
function blankItem(): DraftItem {
  return {
    id: crypto.randomUUID(),
    description: "",
    quantity: "1",
    price: "",
    vat: "21",
  };
}
function inputItems(items: DraftItem[]): QuoteItem[] {
  return items.map((item) => ({
    id: item.id,
    description: item.description,
    quantity: Number(item.quantity || 0),
    unitPriceCents: toCents(item.price || "0"),
    vatRate: Number(item.vat || 0),
  }));
}

export function QuoteEditorPage({
  id,
  clientId,
}: {
  id?: string;
  clientId?: string;
}) {
  return (
    <WorkspaceGate>
      <QuoteEditorLoader id={id} clientId={clientId} />
    </WorkspaceGate>
  );
}
function QuoteEditorLoader({
  id,
  clientId,
}: {
  id?: string;
  clientId?: string;
}) {
  const { data } = useCms();
  if (!data) return null;
  const quote = data.quotes.find((item) => item.id === id);
  if (id && !quote)
    return (
      <EmptyState
        title="Quote not found."
        description="This quote is not available in your workspace."
        action={<ActionLink href="/cms/quotes">Back to quotes</ActionLink>}
      />
    );
  if (!data.clients.length)
    return (
      <>
        <PageHeading
          title="Create a quote."
          back={{ href: "/cms/quotes", label: "All quotes" }}
        />
        <Card className="border border-border shadow-none">
          <EmptyState
            title="Who is this proposal for?"
            description="Add a client first so your quote has the right contact and billing details."
            action={<ActionLink href="/cms/clients">Add a client</ActionLink>}
          />
        </Card>
      </>
    );
  return (
    <QuoteEditor key={quote?.id || "new"} quote={quote} clientId={clientId} />
  );
}

function QuoteEditor({
  quote,
  clientId,
}: {
  quote?: Quote;
  clientId?: string;
}) {
  const { data } = useCms();
  const router = useRouter();
  const mutation = useCmsMutation();
  const [locallySaved, setSaved] = useState<Quote | undefined>(quote);
  // Shared quotes can receive a client response while this page stays open.
  // Derive that newer snapshot without resetting any editable draft fields.
  const saved =
    locallySaved &&
    locallySaved.status !== "draft" &&
    quote &&
    quote.updatedAt > locallySaved.updatedAt
      ? quote
      : locallySaved;
  const [form, setForm] = useState(() => ({
    clientId: quote?.clientId || clientId || "",
    title: quote?.title || "",
    issueDate: quote?.issueDate.slice(0, 10) || localDate(),
    validUntil:
      quote?.validUntil.slice(0, 10) ||
      localDate(new Date(Date.now() + 30 * 86400000)),
    introduction: quote?.introduction || "",
    terms: quote?.terms || "",
    discount: quote ? (quote.discountCents / 100).toFixed(2) : "0",
  }));
  const [items, setItems] = useState<DraftItem[]>(
    () =>
      quote?.items.map((item) => ({
        id: item.id,
        description: item.description,
        quantity: String(item.quantity),
        price: (item.unitPriceCents / 100).toFixed(2),
        vat: String(item.vatRate),
      })) || [blankItem()],
  );
  const [localError, setLocalError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [revokeOpen, setRevokeOpen] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);
  if (!data) return null;
  const locked = saved && saved.status !== "draft";
  const client =
    saved?.clientSnapshot ||
    data.clients.find((item) => item.id === form.clientId);
  const parsedItems = inputItems(items);
  let totals = { subtotalCents: 0, vatCents: 0, totalCents: 0 };
  let calculationError: string | null = null;
  try {
    if (
      parsedItems.some(
        (item) =>
          !Number.isFinite(item.quantity) ||
          !Number.isSafeInteger(item.unitPriceCents) ||
          !Number.isFinite(item.vatRate) ||
          item.quantity < 0 ||
          item.unitPriceCents < 0 ||
          item.vatRate < 0,
      ) ||
      !Number.isSafeInteger(toCents(form.discount)) ||
      toCents(form.discount) < 0
    )
      throw new Error("Use valid positive amounts for your quote.");
    totals = quoteTotals(parsedItems, toCents(form.discount || "0"));
  } catch (cause) {
    calculationError =
      cause instanceof Error ? cause.message : "Check your line item amounts.";
  }
  const set = (key: keyof typeof form) => (value: string) => {
    setForm((previous) => ({ ...previous, [key]: value }));
    setSavedNotice(false);
  };
  const changeItem = (id: string, key: keyof DraftItem, value: string) => {
    setItems((previous) =>
      previous.map((item) =>
        item.id === id ? { ...item, [key]: value } : item,
      ),
    );
    setSavedNotice(false);
  };
  const shareUrl = saved?.shareToken
    ? `${typeof window === "undefined" ? "" : window.location.origin}/quote/${saved.shareToken}`
    : "";

  async function persist(navigate = true) {
    setLocalError(null);
    setSavedNotice(false);
    if (calculationError) {
      setLocalError(calculationError);
      return null;
    }
    if (
      !form.clientId ||
      !form.title.trim() ||
      !form.issueDate ||
      !form.validUntil ||
      items.some(
        (item) => !item.description.trim() || Number(item.quantity) <= 0,
      )
    ) {
      setLocalError(
        "Choose a client and add a title, dates and a description with a positive quantity for every line item.",
      );
      return null;
    }
    if (form.validUntil < form.issueDate) {
      setLocalError("The valid-until date must be on or after the issue date.");
      return null;
    }
    const { discount, ...fields } = form;
    const result = await mutation.run<Quote>(
      `/api/cms/quotes${saved ? `/${saved.id}` : ""}`,
      {
        method: saved ? "PATCH" : "POST",
        body: JSON.stringify({
          ...fields,
          discountCents: toCents(discount || "0"),
          items: parsedItems,
        }),
      },
    );
    if (result) {
      setSaved(result);
      setSavedNotice(true);
      if (!saved && navigate) router.replace(`/cms/quotes/${result.id}`);
    }
    return result;
  }
  async function share() {
    const draft = await persist(false);
    if (!draft) return;
    const result = await mutation.run<Quote>(
      `/api/cms/quotes/${draft.id}/share`,
      { method: "POST" },
    );
    if (result) {
      setSaved(result);
      setSavedNotice(false);
      router.replace(`/cms/quotes/${result.id}`);
    }
  }
  async function copyLink() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2500);
    } catch {
      setLocalError(
        "Your browser could not copy the link. Select and copy it from the field below.",
      );
    }
  }
  async function duplicate() {
    if (!saved) return;
    const result = await mutation.run<Quote>(
      `/api/cms/quotes/${saved.id}/duplicate`,
      { method: "POST" },
    );
    if (result) router.push(`/cms/quotes/${result.id}`);
  }
  function submit(event: FormEvent) {
    event.preventDefault();
    void persist();
  }
  return (
    <>
      <PageHeading
        back={{ href: "/cms/quotes", label: "All quotes" }}
        eyebrow={saved?.number || "New proposal"}
        title={
          locked
            ? saved.title
            : saved
              ? "Refine your proposal."
              : "A good idea, well presented."
        }
        description={
          locked
            ? "Your shared proposal and its latest response."
            : "Build your quote on the left. See the client’s view on the right."
        }
      >
        {saved && <StatusBadge status={saved.status} />}
        {saved && (
          <Button
            variant="secondary"
            isDisabled={mutation.busy}
            onPress={() => void duplicate()}
          >
            <Copy size={15} />
            Duplicate
          </Button>
        )}
        {locked && (
          <Button variant="secondary" onPress={() => window.print()}>
            <Printer size={15} />
            Print
          </Button>
        )}
      </PageHeading>
      <ErrorNotice message={localError || mutation.error} />
      {savedNotice && (
        <p
          role="status"
          className="mb-5 flex items-center gap-2 text-sm text-success"
        >
          <Check size={16} />
          Draft saved.
        </p>
      )}
      {locked && (
        <Card className="mb-6 border border-border p-5 shadow-none">
          <div className="flex items-start gap-3">
            <LockKeyhole size={19} className="mt-0.5 shrink-0 text-muted" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                {saved.status === "accepted"
                  ? "This quote has been accepted."
                  : "This version is locked while shared."}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {saved.status === "accepted"
                  ? `Accepted by ${saved.acceptedName || "the client"}${saved.acceptedAt ? ` on ${date(saved.acceptedAt, true)}` : ""}. Duplicate it to prepare a new proposal.`
                  : "Your client sees a snapshot of this quote. Revoke the link to make changes, then share the updated version."}
              </p>
              {shareUrl && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <Input
                    aria-label="Private quote link"
                    value={shareUrl}
                    readOnly
                    className="min-w-0 flex-1 text-xs"
                  />
                  <Button variant="secondary" onPress={() => void copyLink()}>
                    <Copy size={15} />
                    {copied ? "Copied" : "Copy link"}
                  </Button>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border"
                    aria-label="Open shared quote"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted">
                  {saved.viewedAt
                    ? `First opened ${date(saved.viewedAt, true)}`
                    : "Not opened yet"}
                  {saved.validUntil < localDate() && saved.status === "shared"
                    ? " · Expired"
                    : ""}
                </p>
                {saved.status !== "accepted" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => setRevokeOpen(true)}
                  >
                    Revoke link & edit
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Card>
      )}
      <div
        className={
          locked
            ? "cms-quote-layout mx-auto max-w-4xl"
            : "cms-quote-layout grid items-start gap-6 xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]"
        }
      >
        {!locked && (
          <form onSubmit={submit} className="space-y-5">
            <fieldset disabled={mutation.busy} className="space-y-5">
              <Card className="border border-border p-6 shadow-none">
                <Card.Header>
                  <Card.Title className="text-base">The essentials</Card.Title>
                  <Card.Description className="text-xs">
                    Who it’s for, and what you’re proposing.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="mt-5 space-y-5">
                  <Choice
                    label="Client"
                    value={form.clientId}
                    onChange={set("clientId")}
                    required
                    options={data.clients
                      .filter(
                        (item) =>
                          item.status !== "archived" ||
                          item.id === form.clientId,
                      )
                      .map((item) => ({
                        value: item.id,
                        label: item.company || item.name,
                      }))}
                  />
                  <Field
                    label="Quote title"
                    value={form.title}
                    onChange={set("title")}
                    required
                    maxLength={200}
                    placeholder="Describe the project or service"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Issue date"
                      value={form.issueDate}
                      onChange={set("issueDate")}
                      type="date"
                      required
                    />
                    <Field
                      label="Valid until"
                      value={form.validUntil}
                      onChange={set("validUntil")}
                      type="date"
                      min={form.issueDate}
                      required
                    />
                  </div>
                  <Field
                    label="Introduction"
                    value={form.introduction}
                    onChange={set("introduction")}
                    multiline
                    placeholder="Set the scene. What will you help this client achieve?"
                  />
                </Card.Content>
              </Card>
              <Card className="border border-border p-6 shadow-none">
                <Card.Header>
                  <Card.Title className="text-base">Scope & pricing</Card.Title>
                  <Card.Description className="text-xs">
                    Prices in EUR, excluding VAT. Quantity supports three
                    decimal places.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="mt-5 space-y-5">
                  {items.map((item, index) => (
                    <div
                      key={item.id}
                      className="rounded-xl border border-border bg-surface-secondary/30 p-4"
                    >
                      <div className="mb-3 flex items-center justify-between">
                        <p className="text-xs font-medium text-muted">
                          Line item {index + 1}
                        </p>
                        <Button
                          isIconOnly
                          variant="ghost"
                          size="sm"
                          aria-label={`Remove line item ${index + 1}`}
                          isDisabled={items.length <= 1}
                          onPress={() => {
                            setItems((previous) =>
                              previous.filter((entry) => entry.id !== item.id),
                            );
                            setSavedNotice(false);
                          }}
                        >
                          <Trash2 size={14} />
                        </Button>
                      </div>
                      <Field
                        label={`Description ${index + 1}`}
                        value={item.description}
                        onChange={(value) =>
                          changeItem(item.id, "description", value)
                        }
                        required
                        maxLength={2000}
                        placeholder="Service, deliverable or product"
                      />
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <Field
                          label="Quantity"
                          value={item.quantity}
                          onChange={(value) =>
                            changeItem(item.id, "quantity", value)
                          }
                          type="number"
                          min="0.001"
                          max="1000000"
                          step="0.001"
                          required
                        />
                        <Field
                          label="Unit price"
                          value={item.price}
                          onChange={(value) =>
                            changeItem(item.id, "price", value)
                          }
                          type="number"
                          min="0"
                          step="0.01"
                          required
                          placeholder="0.00"
                        />
                        <Field
                          label="VAT (%)"
                          value={item.vat}
                          onChange={(value) =>
                            changeItem(item.id, "vat", value)
                          }
                          type="number"
                          min="0"
                          max="100"
                          step="0.01"
                          required
                        />
                      </div>
                    </div>
                  ))}
                  <Button
                    variant="secondary"
                    onPress={() =>
                      setItems((previous) => [...previous, blankItem()])
                    }
                    isDisabled={items.length >= 100}
                  >
                    <Plus size={15} />
                    Add line item
                  </Button>
                  <Field
                    label="Discount (EUR)"
                    value={form.discount}
                    onChange={set("discount")}
                    type="number"
                    min="0"
                    step="0.01"
                    description="Applied proportionally before VAT, across all line items."
                  />
                  <ErrorNotice message={calculationError} />
                </Card.Content>
              </Card>
              <Card className="border border-border p-6 shadow-none">
                <Card.Header>
                  <Card.Title className="text-base">Terms & details</Card.Title>
                </Card.Header>
                <Card.Content className="mt-5">
                  <Field
                    label="Payment terms and conditions"
                    value={form.terms}
                    onChange={set("terms")}
                    multiline
                    placeholder="Payment schedule, delivery details and any conditions for this proposal."
                  />
                </Card.Content>
              </Card>
            </fieldset>
            <div className="cms-quote-actions sticky bottom-4 flex flex-wrap justify-end gap-2 rounded-2xl border border-border bg-surface/95 p-4 shadow-sm backdrop-blur">
              <Button
                variant="secondary"
                type="submit"
                isPending={mutation.busy}
              >
                <Save size={15} />
                Save draft
              </Button>
              <Button
                type="button"
                onPress={() => void share()}
                isDisabled={mutation.busy || Boolean(calculationError)}
              >
                <Link2 size={15} />
                Save & create link
              </Button>
            </div>
            <p className="text-xs leading-5 text-muted">
              Creating a link saves and locks the current version. Copy the link
              to share it with your client.
            </p>
          </form>
        )}
        <div className="cms-quote-preview min-w-0">
          {!locked && (
            <p className="mb-3 flex items-center gap-2 text-xs font-medium text-muted">
              <FileText size={14} />
              Client preview
            </p>
          )}
          <QuotePreview
            quote={{
              number: saved?.number || "Draft quote",
              title: locked ? saved.title : form.title,
              issueDate: locked ? saved.issueDate : form.issueDate,
              validUntil: locked ? saved.validUntil : form.validUntil,
              introduction: locked ? saved.introduction : form.introduction,
              terms: locked ? saved.terms : form.terms,
              items: locked ? saved.items : parsedItems,
              discountCents: locked
                ? saved.discountCents
                : toCents(form.discount || "0"),
              ...(locked
                ? {
                    subtotalCents: saved.subtotalCents,
                    vatCents: saved.vatCents,
                    totalCents: saved.totalCents,
                  }
                : totals),
            }}
            client={client}
          />
          <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-muted">
            <ShieldCheck size={13} />
            Private link. No account needed for your client.
          </p>
        </div>
      </div>
      <EditorModal
        open={revokeOpen}
        onClose={() => setRevokeOpen(false)}
        title="Revoke the shared link?"
      >
        <p className="text-sm leading-6 text-muted">
          The current link will stop working immediately. You can edit this
          quote and generate a new link when it’s ready.
        </p>
        <ErrorNotice message={mutation.error} />
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="tertiary" onPress={() => setRevokeOpen(false)}>
            Keep link
          </Button>
          <Button
            variant="danger"
            isPending={mutation.busy}
            onPress={() =>
              saved &&
              void mutation.run<Quote>(
                `/api/cms/quotes/${saved.id}/revoke`,
                { method: "POST" },
                (result) => {
                  setSaved(result);
                  setRevokeOpen(false);
                },
              )
            }
          >
            Revoke & edit
          </Button>
        </div>
      </EditorModal>
    </>
  );
}

type PreviewQuote = Pick<
  Quote,
  | "number"
  | "title"
  | "issueDate"
  | "validUntil"
  | "introduction"
  | "terms"
  | "items"
  | "discountCents"
  | "subtotalCents"
  | "vatCents"
  | "totalCents"
>;
export function QuotePreview({
  quote,
  client,
}: {
  quote: PreviewQuote;
  client?: QuoteClient | null;
}) {
  return (
    <article className="cms-quote-paper overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="cms-quote-stripe h-2 bg-accent" />
      <div className="p-6 sm:p-9">
        <header className="flex flex-wrap justify-between gap-6">
          <div>
            <p className="text-4xl font-bold tracking-[-0.075em]">
              brisk<span className="text-accent">.</span>
            </p>
            <p className="mt-3 text-xs leading-5 text-muted">
              Herenstraat 15
              <br />
              3600 Genk, Belgium
              <br />
              info@brisk.be
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Proposal
            </p>
            <p className="mt-2 text-sm font-medium">{quote.number}</p>
            <p className="mt-2 text-xs text-muted">
              Issued {date(quote.issueDate)}
            </p>
            <p className="mt-1 text-xs text-muted">
              Valid until {date(quote.validUntil)}
            </p>
          </div>
        </header>
        <div className="mt-9 border-t border-border pt-7">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            Prepared for
          </p>
          <p className="mt-2 text-base font-semibold">
            {client?.company || client?.name || "Select a client"}
          </p>
          {client?.company && (
            <p className="mt-1 text-sm text-muted">{client.name}</p>
          )}
          {client?.address && (
            <p className="mt-2 whitespace-pre-line text-xs leading-5 text-muted">
              {client.address}
            </p>
          )}
          {client?.vatNumber && (
            <p className="mt-1 text-xs text-muted">VAT {client.vatNumber}</p>
          )}
          <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-tight">
            {quote.title || "Your proposal title"}
          </h2>
          {quote.introduction && (
            <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
              {quote.introduction}
            </p>
          )}
        </div>
        <div className="mt-7 overflow-x-auto">
          <table className="w-full min-w-[350px] text-left text-xs">
            <thead>
              <tr className="border-y border-border">
                <th className="py-3 pr-3 font-medium text-muted">
                  Description
                </th>
                <th className="px-2 py-3 text-right font-medium text-muted">
                  Qty
                </th>
                <th className="px-2 py-3 text-right font-medium text-muted">
                  Price
                </th>
                <th className="px-2 py-3 text-right font-medium text-muted">
                  VAT
                </th>
                <th className="py-3 pl-2 text-right font-medium text-muted">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <td className="max-w-64 py-4 pr-3 whitespace-pre-line leading-5">
                    {item.description || "Line item description"}
                  </td>
                  <td className="px-2 py-4 text-right tabular-nums">
                    {Number.isFinite(item.quantity) ? item.quantity : "—"}
                  </td>
                  <td className="px-2 py-4 text-right whitespace-nowrap tabular-nums">
                    {Number.isFinite(item.unitPriceCents)
                      ? money(item.unitPriceCents)
                      : "—"}
                  </td>
                  <td className="px-2 py-4 text-right tabular-nums">
                    {Number.isFinite(item.vatRate) ? `${item.vatRate}%` : "—"}
                  </td>
                  <td className="py-4 pl-2 text-right whitespace-nowrap font-medium tabular-nums">
                    {Number.isFinite(item.unitPriceCents * item.quantity)
                      ? money(Math.round(item.unitPriceCents * item.quantity))
                      : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <dl className="ml-auto mt-6 max-w-xs space-y-3 text-sm">
          <div className="flex justify-between gap-5">
            <dt className="text-muted">Subtotal</dt>
            <dd className="tabular-nums">{money(quote.subtotalCents)}</dd>
          </div>
          {quote.discountCents > 0 && (
            <div className="flex justify-between gap-5">
              <dt className="text-muted">Discount</dt>
              <dd className="tabular-nums">−{money(quote.discountCents)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-5">
            <dt className="text-muted">VAT</dt>
            <dd className="tabular-nums">{money(quote.vatCents)}</dd>
          </div>
          <div className="flex justify-between gap-5 border-t border-border pt-4 text-lg font-semibold">
            <dt>Total</dt>
            <dd className="tabular-nums">{money(quote.totalCents)}</dd>
          </div>
        </dl>
        {quote.terms && (
          <section className="mt-9 border-t border-border pt-6">
            <h3 className="text-xs font-semibold">Terms & conditions</h3>
            <p className="mt-3 whitespace-pre-line text-xs leading-6 text-muted">
              {quote.terms}
            </p>
          </section>
        )}
        <footer className="mt-9 border-t border-border pt-5 text-[11px] text-muted">
          Thank you for considering Brisk. Let’s make something that works.
        </footer>
      </div>
    </article>
  );
}
