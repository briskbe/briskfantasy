"use client";

import { followUpStatusLabels } from "@/lib/cms/types";
import { DutchFieldError } from "./field-error";
import Link from "next/link";
import { useRef, useState, type ComponentProps, type ReactNode } from "react";
import {
  Button,
  buttonVariants,
  Card,
  Chip,
  Input,
  Label,
  ListBox,
  Modal,
  Select,
  Spinner,
  TextArea,
  TextField,
} from "@heroui/react";
import {
  ArrowLeft,
  ArrowUpRight,
  CircleAlert,
  Inbox,
  Search,
} from "lucide-react";
import { useCms } from "./cms-provider";
import { cmsApi, CmsApiError } from "./api";

export const money = (cents: number) =>
  new Intl.NumberFormat("nl-BE", { style: "currency", currency: "EUR" }).format(
    cents / 100,
  );
export const date = (value: string | null, withTime = false) =>
  value
    ? new Intl.DateTimeFormat("nl-BE", {
        day: "numeric",
        month: "short",
        year: "numeric",
        ...(withTime ? { hour: "2-digit", minute: "2-digit" } : {}),
      }).format(new Date(value.length === 10 ? `${value}T12:00:00` : value))
    : "Niet ingesteld";
const labels: Record<string, string> = {
  lead: "Potentiële klant",
  active: "Actief",
  archived: "Gearchiveerd",
  planned: "Gepland",
  in_progress: "In uitvoering",
  review: "Ter beoordeling",
  completed: "Afgerond",
  on_hold: "Gepauzeerd",
  draft: "Concept",
  shared: "Gedeeld",
  accepted: "Goedgekeurd",
  declined: "Afgewezen",
  ...followUpStatusLabels,
  low: "Laag",
  normal: "Normaal",
  high: "Hoog",
  task: "Taak",
  call: "Telefoongesprek",
  email: "E-mail",
  meeting: "Afspraak",
  today: "Vandaag",
  overdue: "Te laat",
  upcoming: "Binnenkort",
  all: "Alles",
  overview: "Overzicht",
  projects: "Projecten",
  quotes: "Offertes",
  "follow-ups": "Opvolging",
  name: "Naam",
  company: "Bedrijf",
  phone: "Telefoonnummer",
  vatNumber: "Btw-nummer",
  address: "Adres",
  notes: "Notities",
  clientId: "Klant",
  projectId: "Project",
  title: "Titel",
  description: "Omschrijving",
  status: "Status",
  service: "Dienst",
  budgetCents: "Budget",
  progress: "Voortgang",
  startDate: "Startdatum",
  dueDate: "Einddatum",
  dueAt: "Datum en tijd",
  priority: "Prioriteit",
  type: "Type",
  issueDate: "Offertedatum",
  validUntil: "Geldig tot",
  introduction: "Inleiding",
  terms: "Voorwaarden",
  items: "Offerteposten",
  discountCents: "Korting",
  quantity: "Aantal",
  unitPriceCents: "Eenheidsprijs",
  vatRate: "Btw-percentage",
  form: "Formulier",
  consent: "Akkoord",
  decision: "Reactie",
};
export const titleCase = (value: string) => {
  const itemField = /^items\.(\d+)\.(\w+)$/.exec(value);
  if (itemField) {
    return `Offertepost ${Number(itemField[1]) + 1} · ${labels[itemField[2]] ?? "Veld"}`;
  }
  return labels[value] ?? value;
};
export const toCents = (value: string) => Math.round(Number(value) * 100);
export const localDate = (value = new Date()) =>
  `${value.getFullYear()}-${String(value.getMonth() + 1).padStart(2, "0")}-${String(value.getDate()).padStart(2, "0")}`;
export const initials = (value: string) =>
  value
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

export function PageHeading({
  eyebrow,
  title,
  description,
  children,
  back,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  children?: ReactNode;
  back?: { href: string; label: string };
}) {
  return (
    <header className="cms-page-heading mb-8 flex flex-wrap items-end justify-between gap-5">
      <div className="min-w-0">
        {back && (
          <Link
            href={back.href}
            className="mb-5 inline-flex items-center gap-2 text-sm text-muted hover:text-foreground"
          >
            <ArrowLeft size={15} />
            {back.label}
          </Link>
        )}
        {eyebrow && (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.15em] text-muted">
            {eyebrow}
          </p>
        )}
        <h1 className="text-3xl font-semibold tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">
            {description}
          </p>
        )}
      </div>
      {children && (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      )}
    </header>
  );
}

export function EmptyState({
  title,
  description,
  action,
  icon,
}: {
  title: string;
  description: string;
  action?: ReactNode;
  icon?: ReactNode;
}) {
  return (
    <div className="cms-empty flex min-h-72 flex-col items-center justify-center px-6 py-14 text-center">
      <div className="mb-5 flex size-14 items-center justify-center rounded-2xl border border-border bg-surface-secondary text-muted">
        {icon || <Inbox size={23} strokeWidth={1.4} />}
      </div>
      <h3 className="text-base font-semibold tracking-tight">{title}</h3>
      <p className="mt-2 max-w-sm text-sm leading-6 text-muted">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}

export function ErrorNotice({ message }: { message?: string | null }) {
  if (!message) return null;
  return (
    <div
      role="alert"
      className="my-4 flex items-start gap-2 rounded-xl border border-danger/20 bg-danger/5 p-4 text-sm text-danger"
    >
      <CircleAlert size={17} className="mt-0.5 shrink-0" />
      {message}
    </div>
  );
}

export function WorkspaceGate({ children }: { children: ReactNode }) {
  const { data, loading, error, refresh } = useCms();
  if (loading)
    return (
      <div
        className="flex min-h-96 items-center justify-center gap-3 text-sm text-muted"
        role="status"
      >
        <Spinner size="sm" aria-label="Laden" />
        Beheerportaal laden…
      </div>
    );
  if (!data)
    return (
      <Card className="p-8">
        <ErrorNotice message={error || "Het beheerportaal kon niet worden geladen."} />
        <Button variant="secondary" onPress={() => void refresh()}>
          Opnieuw proberen
        </Button>
      </Card>
    );
  return (
    <>
      {error && <ErrorNotice message={error} />}
      {children}
    </>
  );
}

export function StatusBadge({ status }: { status: string }) {
  const color = ["active", "completed", "accepted", "done", "won"].includes(status)
    ? "success"
    : ["in_progress", "shared", "lead", "open"].includes(status)
      ? "accent"
      : ["review", "on_hold", "high", "waiting"].includes(status)
        ? "warning"
        : status === "declined"
          ? "danger"
          : "default";
  return (
    <Chip size="sm" color={color} variant="soft">
      <Chip.Label>{titleCase(status)}</Chip.Label>
    </Chip>
  );
}

export function Field({
  label,
  value,
  onChange,
  required,
  multiline,
  description,
  ...props
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  multiline?: boolean;
  description?: string;
} & Omit<ComponentProps<typeof Input>, "value" | "onChange" | "children">) {
  return (
    <TextField
      value={value}
      onChange={onChange}
      isRequired={required}
      className="w-full gap-2"
    >
      <Label className="text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </Label>
      {multiline ? (
        <TextArea
          rows={4}
          className="w-full resize-y"
          placeholder={props.placeholder}
          maxLength={props.maxLength}
          disabled={props.disabled}
        />
      ) : (
        <Input {...props} className="w-full" />
      )}
      {description && (
        <p className="text-xs leading-5 text-muted">{description}</p>
      )}
      <DutchFieldError type={props.type} min={props.min} max={props.max} minLength={props.minLength} maxLength={props.maxLength} />
    </TextField>
  );
}

export function Choice({
  label,
  value,
  onChange,
  options,
  required,
  disabled,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <Select
      value={value || null}
      onChange={(key) => onChange(key == null ? "" : String(key))}
      isRequired={required}
      isDisabled={disabled}
      fullWidth
      placeholder={`Kies ${label.toLowerCase()}`}
      className="gap-2"
    >
      <Label className="text-sm font-medium">
        {label}
        {required ? " *" : ""}
      </Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.value}
              id={option.value}
              textValue={option.label}
            >
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <DutchFieldError />
    </Select>
  );
}

export function SearchBox({
  value,
  onChange,
  placeholder = "Zoeken…",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <TextField
      aria-label={placeholder}
      value={value}
      onChange={onChange}
      className="relative w-full sm:max-w-xs"
    >
      <Search
        className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-muted"
        size={17}
      />
      <Input placeholder={placeholder} className="w-full pl-10" />
    </TextField>
  );
}

export function EditorModal({
  open,
  onClose,
  title,
  description,
  children,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <Modal.Backdrop
      isOpen={open}
      onOpenChange={(next) => {
        if (!next) onClose();
      }}
    >
      <Modal.Container size="lg" scroll="inside">
        <Modal.Dialog className="cms-editor-dialog">
          <Modal.CloseTrigger aria-label="Sluiten" />
          <Modal.Header className="pb-5">
            <Modal.Heading className="text-xl tracking-tight">
              {title}
            </Modal.Heading>
            {description && (
              <p className="mt-1 text-sm text-muted">{description}</p>
            )}
          </Modal.Header>
          <Modal.Body>{children}</Modal.Body>
        </Modal.Dialog>
      </Modal.Container>
    </Modal.Backdrop>
  );
}

export function FormActions({
  busy,
  onCancel,
  label = "Wijzigingen opslaan",
}: {
  busy: boolean;
  onCancel: () => void;
  label?: string;
}) {
  return (
    <div className="mt-7 flex justify-end gap-2 border-t border-border pt-5">
      <Button variant="tertiary" onPress={onCancel} isDisabled={busy}>
        Annuleren
      </Button>
      <Button type="submit" isPending={busy}>
        {busy ? "Opslaan…" : label}
      </Button>
    </div>
  );
}

export function ActionLink({
  href,
  children,
  subtle = false,
}: {
  href: string;
  children: ReactNode;
  subtle?: boolean;
}) {
  return (
    <Link
      href={href}
      className={
        subtle
          ? "inline-flex items-center gap-1.5 text-sm font-medium text-foreground hover:underline"
          : buttonVariants({ variant: "primary" })
      }
    >
      {children}
      <ArrowUpRight size={15} />
    </Link>
  );
}

export function useCmsMutation() {
  const { refresh } = useCms();
  const pending = useRef(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const run = async <T,>(
    path: string,
    init: RequestInit,
    after?: (result: T) => void,
  ) => {
    if (pending.current) return null;
    pending.current = true;
    setBusy(true);
    setError(null);
    try {
      const result = await cmsApi<T>(path, init);
      await refresh();
      after?.(result);
      return result;
    } catch (cause) {
      setError(
        cause instanceof CmsApiError && cause.fields
          ? Object.entries(cause.fields)
              .map(([field, message]) => `${titleCase(field)}: ${message}`)
              .join(" ")
          : cause instanceof Error
            ? cause.message
            : "Opslaan is niet gelukt. Probeer het opnieuw.",
      );
      return null;
    } finally {
      pending.current = false;
      setBusy(false);
    }
  };
  return { busy, error, run, clearError: () => setError(null) };
}
