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
  FilterBar,
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
        eyebrow="Offertes"
        title="Offertes"
        description="Maak offertes, deel ze met je klant en volg de reactie op."
      >
        <ActionLink href="/cms/quotes/new">
          <Plus size={16} />
          Offerte maken
        </ActionLink>
      </PageHeading>
      <div className="mb-4 grid grid-cols-3 gap-2 sm:mb-6 sm:gap-4">
        {[
          {
            label: "Concepten",
            count: data.quotes.filter((quote) => quote.status === "draft")
              .length,
            value: "Nog niet gedeeld",
          },
          {
            label: "In afwachting",
            count: data.quotes.filter((quote) => quote.status === "shared")
              .length,
            value: money(
              data.quotes
                .filter((quote) => quote.status === "shared")
                .reduce((sum, quote) => sum + quote.totalCents, 0),
            ),
          },
          {
            label: "Goedgekeurd",
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
            className="p-3 sm:p-5"
          >
            <p className="truncate text-xs font-medium text-muted">{metric.label}</p>
            <div className="mt-2 flex flex-col gap-0.5 sm:mt-3 sm:flex-row sm:items-baseline sm:justify-between sm:gap-3">
              <span className="text-2xl font-semibold tracking-tight sm:text-3xl">
                {metric.count}
              </span>
              <span className="truncate text-xs text-muted">{metric.value}</span>
            </div>
          </Card>
        ))}
      </div>
      <Card className="p-0">
        <FilterBar
          className="border-b border-border p-3 sm:p-5"
          activeCount={status === "all" ? 0 : 1}
          search={
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Offertes zoeken…"
            />
          }
        >
          <div className="col-span-2 sm:w-44">
            <Choice
              label="Status"
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "Alle offertes" },
                ...quoteStatuses.map((value) => ({
                  value,
                  label: titleCase(value),
                })),
              ]}
            />
          </div>
        </FilterBar>
        {quotes.length ? (
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Offertes" className="min-w-[760px]">
                <Table.Header>
                  <Table.Column isRowHeader>Offerte</Table.Column>
                  <Table.Column>Klant</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Geldig tot</Table.Column>
                  <Table.Column>Totaal incl. btw</Table.Column>
                  <Table.Column aria-label="Offerte openen"> </Table.Column>
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
                          aria-label={`Open offerte ${quote.title}`}
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
                ? "Geen offertes gevonden"
                : "Nog geen offertes"
            }
            description={
              query || status !== "all"
                ? "Probeer een andere zoekterm of status."
                : "Maak je eerste offerte met diensten, prijzen en btw. Je klant kan via een persoonlijke link reageren."
            }
            action={
              <ActionLink href="/cms/quotes/new">
                Eerste offerte maken
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
        title="Offerte niet gevonden"
        description="Deze offerte is niet beschikbaar."
        action={<ActionLink href="/cms/quotes">Terug naar offertes</ActionLink>}
      />
    );
  if (!data.clients.length)
    return (
      <>
        <PageHeading
          title="Offerte maken"
          back={{ href: "/cms/quotes", label: "Alle offertes" }}
        />
        <Card>
          <EmptyState
            title="Voor welke klant is de offerte?"
            description="Voeg eerst een klant toe om de juiste contact- en facturatiegegevens op je offerte te gebruiken."
            action={<ActionLink href="/cms/clients">Klant toevoegen</ActionLink>}
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
      throw new Error("Vul geldige bedragen in. Negatieve bedragen zijn niet toegestaan.");
    totals = quoteTotals(parsedItems, toCents(form.discount || "0"));
  } catch (cause) {
    calculationError =
      cause instanceof Error ? cause.message : "Controleer de bedragen op je offerteregels.";
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
        "Kies een klant en vul een titel en datums in. Geef elke offerteregel een omschrijving en een aantal groter dan nul.",
      );
      return null;
    }
    if (form.validUntil < form.issueDate) {
      setLocalError("De geldigheidsdatum mag niet vóór de offertedatum liggen.");
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
        "De link kon niet worden gekopieerd. Selecteer en kopieer de link in het veld hieronder.",
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
        back={{ href: "/cms/quotes", label: "Alle offertes" }}
        eyebrow={saved?.number || "Nieuwe offerte"}
        title={
          locked
            ? saved.title
            : saved
              ? "Offerte bewerken"
              : "Offerte maken"
        }
        description={
          locked
            ? "Bekijk de gedeelde offerte en de reactie van je klant."
            : "Vul de gegevens in en bekijk direct hoe je offerte eruitziet."
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
            Dupliceren
          </Button>
        )}
        {locked && (
          <Button variant="secondary" onPress={() => window.print()}>
            <Printer size={15} />
            Afdrukken
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
          Concept opgeslagen.
        </p>
      )}
      {locked && (
        <Card className="mb-6 p-5">
          <div className="flex items-start gap-3">
            <LockKeyhole size={19} className="mt-0.5 shrink-0 text-muted" />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium">
                {saved.status === "accepted"
                  ? "Deze offerte is goedgekeurd."
                  : "Deze versie is gedeeld en kan niet worden bewerkt."}
              </p>
              <p className="mt-1 text-xs leading-5 text-muted">
                {saved.status === "accepted"
                  ? `Goedgekeurd door ${saved.acceptedName || "de klant"}${saved.acceptedAt ? ` op ${date(saved.acceptedAt, true)}` : ""}. Dupliceer de offerte om een nieuwe versie te maken.`
                  : "Je klant ziet deze vastgelegde versie. Trek de link in om de offerte te wijzigen en deel daarna de nieuwe versie."}
              </p>
              {shareUrl && (
                <div className="mt-4 flex flex-wrap gap-2">
                  <Input
                    aria-label="Persoonlijke offertelink"
                    value={shareUrl}
                    readOnly
                    className="min-w-0 flex-1 text-xs"
                  />
                  <Button variant="secondary" onPress={() => void copyLink()}>
                    <Copy size={15} />
                    {copied ? "Gekopieerd" : "Link kopiëren"}
                  </Button>
                  <a
                    href={shareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex size-10 items-center justify-center rounded-full border border-border"
                    aria-label="Gedeelde offerte openen"
                  >
                    <ExternalLink size={16} />
                  </a>
                </div>
              )}
              <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                <p className="text-xs text-muted">
                  {saved.viewedAt
                    ? `Voor het eerst bekeken op ${date(saved.viewedAt, true)}`
                    : "Nog niet bekeken"}
                  {saved.validUntil < localDate() && saved.status === "shared"
                    ? " · Verlopen"
                    : ""}
                </p>
                {saved.status !== "accepted" && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onPress={() => setRevokeOpen(true)}
                  >
                    Link intrekken en bewerken
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
              <Card className="p-6">
                <Card.Header>
                  <Card.Title className="text-base">Offertegegevens</Card.Title>
                  <Card.Description className="text-xs">
                    Kies een klant en beschrijf je voorstel.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="mt-5 space-y-5">
                  <Choice
                    label="Klant"
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
                    label="Offertetitel"
                    value={form.title}
                    onChange={set("title")}
                    required
                    maxLength={200}
                    placeholder="Beschrijf het project of de dienst"
                  />
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Offertedatum"
                      value={form.issueDate}
                      onChange={set("issueDate")}
                      type="date"
                      required
                    />
                    <Field
                      label="Geldig tot"
                      value={form.validUntil}
                      onChange={set("validUntil")}
                      type="date"
                      min={form.issueDate}
                      required
                    />
                  </div>
                  <Field
                    label="Inleiding"
                    value={form.introduction}
                    onChange={set("introduction")}
                    multiline
                    placeholder="Beschrijf de vraag van je klant en je aanpak."
                  />
                </Card.Content>
              </Card>
              <Card className="p-6">
                <Card.Header>
                  <Card.Title className="text-base">Diensten en prijzen</Card.Title>
                  <Card.Description className="text-xs">
                    Prijzen in euro, exclusief btw. Aantallen kunnen maximaal
                    drie decimalen bevatten.
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
                          Offerteregel {index + 1}
                        </p>
                        <Button
                          isIconOnly
                          variant="ghost"
                          size="sm"
                          aria-label={`Offerteregel ${index + 1} verwijderen`}
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
                        label={`Omschrijving ${index + 1}`}
                        value={item.description}
                        onChange={(value) =>
                          changeItem(item.id, "description", value)
                        }
                        required
                        maxLength={2000}
                        placeholder="Dienst, resultaat of product"
                      />
                      <div className="mt-4 grid grid-cols-3 gap-3">
                        <Field
                          label="Aantal"
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
                          label="Eenheidsprijs"
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
                          label="Btw (%)"
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
                    Regel toevoegen
                  </Button>
                  <Field
                    label="Korting (EUR)"
                    value={form.discount}
                    onChange={set("discount")}
                    type="number"
                    min="0"
                    step="0.01"
                    description="Evenredig verdeeld over alle offerteregels, vóór de btw-berekening."
                  />
                  <ErrorNotice message={calculationError} />
                </Card.Content>
              </Card>
              <Card className="p-6">
                <Card.Header>
                  <Card.Title className="text-base">Voorwaarden</Card.Title>
                </Card.Header>
                <Card.Content className="mt-5">
                  <Field
                    label="Betalings- en leveringsvoorwaarden"
                    value={form.terms}
                    onChange={set("terms")}
                    multiline
                    placeholder="Betalingstermijnen, oplevering en overige voorwaarden van deze offerte."
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
                Concept opslaan
              </Button>
              <Button
                type="button"
                onPress={() => void share()}
                isDisabled={mutation.busy || Boolean(calculationError)}
              >
                <Link2 size={15} />
                Opslaan en link maken
              </Button>
            </div>
            <p className="text-xs leading-5 text-muted">
              Door een link te maken, sla je de huidige versie op en zet je deze vast.
              Kopieer de link om de offerte met je klant te delen.
            </p>
          </form>
        )}
        <div className="cms-quote-preview min-w-0">
          {!locked && (
            <p className="mb-3 flex items-center gap-2 text-xs font-medium text-muted">
              <FileText size={14} />
              Voorbeeld voor de klant
            </p>
          )}
          <QuotePreview
            quote={{
              number: saved?.number || "Conceptofferte",
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
            Je klant kan de offerte via de link bekijken zonder account.
          </p>
        </div>
      </div>
      <EditorModal
        open={revokeOpen}
        onClose={() => setRevokeOpen(false)}
        title="Gedeelde link intrekken?"
      >
        <p className="text-sm leading-6 text-muted">
          De huidige link werkt daarna niet meer. Je kunt de offerte bewerken
          en een nieuwe link maken zodra deze klaar is.
        </p>
        <ErrorNotice message={mutation.error} />
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="tertiary" onPress={() => setRevokeOpen(false)}>
            Link behouden
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
            Intrekken en bewerken
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
    <Card className="cms-quote-paper overflow-hidden p-0">
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
              3600 Genk, België
              <br />
              info@brisk.be
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs font-medium uppercase tracking-widest text-muted">
              Offerte
            </p>
            <p className="mt-2 text-sm font-medium">{quote.number}</p>
            <p className="mt-2 text-xs text-muted">
              Offertedatum {date(quote.issueDate)}
            </p>
            <p className="mt-1 text-xs text-muted">
              Geldig tot {date(quote.validUntil)}
            </p>
          </div>
        </header>
        <div className="mt-9 border-t border-border pt-7">
          <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted">
            Voor
          </p>
          <p className="mt-2 text-base font-semibold">
            {client?.company || client?.name || "Selecteer een klant"}
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
            <p className="mt-1 text-xs text-muted">Btw {client.vatNumber}</p>
          )}
          <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-tight">
            {quote.title || "Titel van je offerte"}
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
                  Omschrijving
                </th>
                <th className="px-2 py-3 text-right font-medium text-muted">
                  Aantal
                </th>
                <th className="px-2 py-3 text-right font-medium text-muted">
                  Prijs
                </th>
                <th className="px-2 py-3 text-right font-medium text-muted">
                  Btw
                </th>
                <th className="py-3 pl-2 text-right font-medium text-muted">
                  Bedrag
                </th>
              </tr>
            </thead>
            <tbody>
              {quote.items.map((item) => (
                <tr key={item.id} className="border-b border-border">
                  <td className="max-w-64 py-4 pr-3 whitespace-pre-line leading-5">
                    {item.description || "Omschrijving van de dienst"}
                  </td>
                  <td className="px-2 py-4 text-right tabular-nums">
                    {Number.isFinite(item.quantity) ? item.quantity.toLocaleString("nl-BE", { maximumFractionDigits: 3 }) : "—"}
                  </td>
                  <td className="px-2 py-4 text-right whitespace-nowrap tabular-nums">
                    {Number.isFinite(item.unitPriceCents)
                      ? money(item.unitPriceCents)
                      : "—"}
                  </td>
                  <td className="px-2 py-4 text-right tabular-nums">
                    {Number.isFinite(item.vatRate) ? `${item.vatRate.toLocaleString("nl-BE", { maximumFractionDigits: 2 })}%` : "—"}
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
            <dt className="text-muted">Subtotaal</dt>
            <dd className="tabular-nums">{money(quote.subtotalCents)}</dd>
          </div>
          {quote.discountCents > 0 && (
            <div className="flex justify-between gap-5">
              <dt className="text-muted">Korting</dt>
              <dd className="tabular-nums">−{money(quote.discountCents)}</dd>
            </div>
          )}
          <div className="flex justify-between gap-5">
            <dt className="text-muted">Btw</dt>
            <dd className="tabular-nums">{money(quote.vatCents)}</dd>
          </div>
          <div className="flex justify-between gap-5 border-t border-border pt-4 text-lg font-semibold">
            <dt>Totaal</dt>
            <dd className="tabular-nums">{money(quote.totalCents)}</dd>
          </div>
        </dl>
        {quote.terms && (
          <section className="mt-9 border-t border-border pt-6">
            <h3 className="text-xs font-semibold">Voorwaarden</h3>
            <p className="mt-3 whitespace-pre-line text-xs leading-6 text-muted">
              {quote.terms}
            </p>
          </section>
        )}
        <footer className="mt-9 border-t border-border pt-5 text-[11px] text-muted">
          Vragen over deze offerte? Neem contact op via info@brisk.be.
        </footer>
      </div>
    </Card>
  );
}
