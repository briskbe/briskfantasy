"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Avatar, Button, Card, Table, Tabs } from "@heroui/react";
import {
  Archive,
  Building2,
  Mail,
  MapPin,
  Pencil,
  Phone,
  Plus,
  Users,
} from "lucide-react";
import { clientStatuses, isOpenFollowUp, type Client } from "@/lib/cms/types";
import { useCms } from "./cms-provider";
import {
  ActionLink,
  Choice,
  date,
  EditorModal,
  EmptyState,
  ErrorNotice,
  Field,
  FormActions,
  initials,
  money,
  PageHeading,
  SearchBox,
  StatusBadge,
  titleCase,
  useCmsMutation,
  WorkspaceGate,
} from "./ui";

function ClientEditor({
  client,
  onClose,
}: {
  client?: Client;
  onClose: () => void;
}) {
  const [form, setForm] = useState({
    name: client?.name || "",
    company: client?.company || "",
    email: client?.email || "",
    phone: client?.phone || "",
    vatNumber: client?.vatNumber || "",
    address: client?.address || "",
    notes: client?.notes || "",
    status: client?.status || "lead",
  });
  const mutation = useCmsMutation();
  const set = (key: keyof typeof form) => (value: string) =>
    setForm((previous) => ({ ...previous, [key]: value }));
  function submit(event: FormEvent) {
    event.preventDefault();
    void mutation.run(
      `/api/cms/clients${client ? `/${client.id}` : ""}`,
      { method: client ? "PATCH" : "POST", body: JSON.stringify(form) },
      onClose,
    );
  }
  return (
    <form onSubmit={submit}>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field
          label="Contactpersoon"
          value={form.name}
          onChange={set("name")}
          required
          maxLength={160}
          autoComplete="name"
        />
        <Field
          label="Bedrijf"
          value={form.company}
          onChange={set("company")}
          maxLength={160}
          autoComplete="organization"
        />
        <Field
          label="E-mailadres"
          value={form.email}
          onChange={set("email")}
          type="email"
          autoComplete="email"
        />
        <Field
          label="Telefoonnummer"
          value={form.phone}
          onChange={set("phone")}
          type="tel"
          autoComplete="tel"
        />
        <Field
          label="Btw-nummer"
          value={form.vatNumber}
          onChange={set("vatNumber")}
          placeholder="BE 0123.456.789"
        />
        <Choice
          label="Klantstatus"
          value={form.status}
          onChange={set("status")}
          options={clientStatuses.map((value) => ({
            value,
            label: titleCase(value),
          }))}
        />
      </div>
      <div className="mt-5 space-y-5">
        <Field
          label="Factuuradres"
          value={form.address}
          onChange={set("address")}
          multiline
          placeholder="Straat, postcode, gemeente en land"
        />
        <Field
          label="Interne notities"
          value={form.notes}
          onChange={set("notes")}
          multiline
          placeholder="Afspraken en informatie over deze klant…"
          description="Alleen zichtbaar in het beheerportaal. Deze notities staan niet op gedeelde offertes."
        />
      </div>
      <ErrorNotice message={mutation.error} />
      <FormActions
        busy={mutation.busy}
        onCancel={onClose}
        label={client ? "Klant opslaan" : "Klant toevoegen"}
      />
    </form>
  );
}

export function ClientsPage() {
  return (
    <WorkspaceGate>
      <ClientsContent />
    </WorkspaceGate>
  );
}
function ClientsContent() {
  const { data } = useCms();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [editor, setEditor] = useState<Client | "new" | null>(null);
  if (!data) return null;
  const clients = data.clients.filter(
    (client) =>
      (status === "all"
        ? client.status !== "archived"
        : client.status === status) &&
      `${client.name} ${client.company} ${client.email}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  return (
    <>
      <PageHeading
        title="Klanten"
        description="Beheer contactgegevens, projecten en offertes per klant."
      >
        <Button onPress={() => setEditor("new")}>
          <Plus size={16} />
          Klant toevoegen
        </Button>
      </PageHeading>
      <Card className="p-0">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border p-5">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Klanten zoeken…"
          />
          <div className="w-44">
            <Choice
              label="Klantstatus"
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "Alle huidige klanten" },
                ...clientStatuses.map((value) => ({
                  value,
                  label: titleCase(value),
                })),
              ]}
            />
          </div>
        </div>
        {clients.length ? (
          <Table>
            <Table.ScrollContainer>
              <Table.Content aria-label="Klanten" className="min-w-[740px]">
                <Table.Header>
                  <Table.Column isRowHeader>Klant</Table.Column>
                  <Table.Column>Contact</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Projecten</Table.Column>
                  <Table.Column>Toegevoegd</Table.Column>
                  <Table.Column aria-label="Acties"> </Table.Column>
                </Table.Header>
                <Table.Body>
                  {clients.map((client) => (
                    <Table.Row key={client.id} id={client.id}>
                      <Table.Cell>
                        <Link
                          href={`/cms/clients/${client.id}`}
                          className="flex items-center gap-3 py-1"
                        >
                          <Avatar className="shrink-0">
                            <Avatar.Fallback>
                              {initials(client.company || client.name)}
                            </Avatar.Fallback>
                          </Avatar>
                          <span>
                            <span className="block font-medium">
                              {client.company || client.name}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted">
                              {client.company
                                ? client.name
                                : "Particuliere klant"}
                            </span>
                          </span>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-muted">
                          {client.email || "Geen e-mailadres"}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <StatusBadge status={client.status} />
                      </Table.Cell>
                      <Table.Cell>
                        {
                          data.projects.filter(
                            (project) => project.clientId === client.id,
                          ).length
                        }
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-xs text-muted">
                          {date(client.createdAt)}
                        </span>
                      </Table.Cell>
                      <Table.Cell>
                        <Button
                          variant="ghost"
                          size="sm"
                          isIconOnly
                          aria-label={`Bewerk ${client.name}`}
                          onPress={() => setEditor(client)}
                        >
                          <Pencil size={15} />
                        </Button>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
            <Table.Footer className="border-t border-border px-5 py-3 text-xs text-muted">
              {clients.length} {clients.length === 1 ? "klant" : "klanten"}
            </Table.Footer>
          </Table>
        ) : (
          <EmptyState
            icon={<Users size={25} />}
            title={
              query || status !== "all"
                ? "Geen klanten gevonden"
                : "Nog geen klanten"
            }
            description={
              query || status !== "all"
                ? "Pas je zoekopdracht of het statusfilter aan."
                : "Voeg een klant toe om projecten, offertes en opvolging te beheren."
            }
            action={
              <Button variant="secondary" onPress={() => setEditor("new")}>
                <Plus size={16} />
                Klant toevoegen
              </Button>
            }
          />
        )}
      </Card>
      <EditorModal
        open={editor !== null}
        onClose={() => setEditor(null)}
        title={editor === "new" ? "Klant toevoegen" : "Klant bewerken"}
        description="Vul de contact- en factuurgegevens in."
      >
        {editor && (
          <ClientEditor
            key={editor === "new" ? "new" : editor.id}
            client={editor === "new" ? undefined : editor}
            onClose={() => setEditor(null)}
          />
        )}
      </EditorModal>
    </>
  );
}

export function ClientDetail({ id }: { id: string }) {
  return (
    <WorkspaceGate>
      <ClientDetailContent id={id} />
    </WorkspaceGate>
  );
}
function ClientDetailContent({ id }: { id: string }) {
  const { data } = useCms();
  const [editing, setEditing] = useState(false);
  const [archiveOpen, setArchiveOpen] = useState(false);
  const mutation = useCmsMutation();
  const client = data?.clients.find((item) => item.id === id);
  if (!data) return null;
  if (!client)
    return (
      <EmptyState
        title="Klant niet gevonden"
        description="Deze klant is niet beschikbaar in het beheerportaal."
        action={<ActionLink href="/cms/clients">Terug naar klanten</ActionLink>}
      />
    );
  const projects = data.projects.filter((item) => item.clientId === id);
  const quotes = data.quotes.filter((item) => item.clientId === id);
  const followUps = data.followUps.filter((item) => item.clientId === id);
  return (
    <>
      <PageHeading
        back={{ href: "/cms/clients", label: "Alle klanten" }}
        title={client.company || client.name}
        description={client.company ? client.name : "Klantgegevens"}
      >
        <StatusBadge status={client.status} />
        <Button variant="secondary" onPress={() => setEditing(true)}>
          <Pencil size={15} />
          Klant bewerken
        </Button>
        <Button
          variant="ghost"
          isIconOnly
          aria-label={
            client.status === "archived" ? "Klant herstellen" : "Klant archiveren"
          }
          onPress={() => setArchiveOpen(true)}
        >
          <Archive size={17} />
        </Button>
      </PageHeading>
      <ErrorNotice message={mutation.error} />
      <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="p-6">
          <Avatar size="lg" className="mb-4">
            <Avatar.Fallback>
              {initials(client.company || client.name)}
            </Avatar.Fallback>
          </Avatar>
          <Card.Header>
            <Card.Title>{client.name}</Card.Title>
            <Card.Description>
              {client.company || "Particuliere klant"}
            </Card.Description>
          </Card.Header>
          <Card.Content className="mt-5 space-y-4 text-sm">
            {[
              {
                icon: Mail,
                value: client.email,
                href: client.email ? `mailto:${client.email}` : undefined,
              },
              {
                icon: Phone,
                value: client.phone,
                href: client.phone ? `tel:${client.phone}` : undefined,
              },
              { icon: MapPin, value: client.address },
              { icon: Building2, value: client.vatNumber },
            ].map(
              ({ icon: Icon, value, href }, index) =>
                value && (
                  <div key={index} className="flex gap-3">
                    <Icon size={16} className="mt-0.5 shrink-0 text-muted" />
                    {href ? (
                      <a className="break-all hover:underline" href={href}>
                        {value}
                      </a>
                    ) : (
                      <span className="whitespace-pre-line leading-6">
                        {value}
                      </span>
                    )}
                  </div>
                ),
            )}
            <p className="border-t border-border pt-5 text-xs text-muted">
              Klant sinds {date(client.createdAt)}
            </p>
          </Card.Content>
          <Card.Footer className="mt-5 flex-col items-stretch gap-2">
            <ActionLink href={`/cms/quotes/new?clientId=${id}`}>
              Offerte maken
            </ActionLink>
            <ActionLink href={`/cms/projects?clientId=${id}&new=1`} subtle>
              Project toevoegen
            </ActionLink>
            <ActionLink href={`/cms/follow-ups?clientId=${id}&new=1`} subtle>
              Opvolging plannen
            </ActionLink>
          </Card.Footer>
        </Card>
        <div className="min-w-0">
          <Tabs defaultSelectedKey="overview">
            <div className="tabs__list-container mb-5 overflow-x-auto">
              <Tabs.List aria-label="Klantinformatie">
                {["overview", "projects", "quotes", "follow-ups"].map((tab) => (
                  <Tabs.Tab key={tab} id={tab}>
                    {titleCase(tab)}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </div>
            <Tabs.Panel id="overview">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Projecten", value: projects.length },
                  {
                    label: "Goedgekeurde offertes",
                    value: money(
                      quotes
                        .filter((quote) => quote.status === "accepted")
                        .reduce((sum, quote) => sum + quote.totalCents, 0),
                    ),
                  },
                  {
                    label: "Openstaande opvolging",
                    value: followUps.filter((item) => isOpenFollowUp(item.status))
                      .length,
                  },
                ].map((item) => (
                  <Card
                    key={item.label}
                    className="p-5"
                  >
                    <p className="text-xs text-muted">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {item.value}
                    </p>
                  </Card>
                ))}
              </div>
              <Card className="mt-5 p-6">
                <Card.Header>
                  <Card.Title className="text-base">Interne notities</Card.Title>
                  <Card.Description className="text-xs">
                    Afspraken en informatie voor intern gebruik.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                  {client.notes ||
                    "Nog geen notities. Voeg ze toe via Klant bewerken."}
                </Card.Content>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="projects">
              <Card className="p-0">
                {projects.length ? (
                  projects.map((project) => (
                    <Link
                      key={project.id}
                      href={`/cms/projects/${project.id}`}
                      className="flex items-center justify-between gap-4 border-b border-border p-5 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="mt-1 text-xs text-muted">
                          {project.service} · {money(project.budgetCents)}
                        </p>
                      </div>
                      <StatusBadge status={project.status} />
                    </Link>
                  ))
                ) : (
                  <EmptyState
                    title="Nog geen projecten"
                    description="Voeg een project toe voor deze klant."
                    action={
                      <ActionLink href={`/cms/projects?clientId=${id}&new=1`}>
                        Project toevoegen
                      </ActionLink>
                    }
                  />
                )}
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="quotes">
              <Card className="p-0">
                {quotes.length ? (
                  quotes.map((quote) => (
                    <Link
                      key={quote.id}
                      href={`/cms/quotes/${quote.id}`}
                      className="flex items-center justify-between gap-4 border-b border-border p-5 last:border-0"
                    >
                      <div>
                        <p className="font-medium">{quote.title}</p>
                        <p className="mt-1 text-xs text-muted">
                          {quote.number} · {money(quote.totalCents)}
                        </p>
                      </div>
                      <StatusBadge status={quote.status} />
                    </Link>
                  ))
                ) : (
                  <EmptyState
                    title="Nog geen offertes"
                    description="Maak een offerte voor deze klant."
                    action={
                      <ActionLink href={`/cms/quotes/new?clientId=${id}`}>
                        Offerte maken
                      </ActionLink>
                    }
                  />
                )}
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="follow-ups">
              <Card className="p-0">
                {followUps.length ? (
                  followUps.map((item) => (
                    <Link
                      key={item.id}
                      href={`/cms/follow-ups?clientId=${id}`}
                      className="flex flex-col items-start gap-3 border-b border-border p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="min-w-0 [overflow-wrap:anywhere]">
                        <p className="font-medium">{item.title}</p>
                        <p className="mt-1 text-xs text-muted">
                          {date(item.dueAt, true)}
                        </p>
                      </div>
                      <StatusBadge status={item.status} />
                    </Link>
                  ))
                ) : (
                  <EmptyState
                    title="Nog geen opvolging"
                    description="Plan een telefoongesprek, taak of e-mail voor deze klant."
                    action={
                      <ActionLink href={`/cms/follow-ups?clientId=${id}&new=1`}>
                        Opvolging plannen
                      </ActionLink>
                    }
                  />
                )}
              </Card>
            </Tabs.Panel>
          </Tabs>
        </div>
      </div>
      <EditorModal
        open={editing}
        onClose={() => setEditing(false)}
        title="Klant bewerken"
      >
        {editing && (
          <ClientEditor client={client} onClose={() => setEditing(false)} />
        )}
      </EditorModal>
      <EditorModal
        open={archiveOpen}
        onClose={() => setArchiveOpen(false)}
        title={
          client.status === "archived"
            ? "Deze klant herstellen?"
            : "Deze klant archiveren?"
        }
      >
        <p className="text-sm leading-6 text-muted">
          {client.status === "archived"
            ? "Deze klant verschijnt opnieuw bij je actieve klanten."
            : "Projecten, offertes en historiek blijven beschikbaar. Je kunt deze klant later herstellen."}
        </p>
        <ErrorNotice message={mutation.error} />
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="tertiary" onPress={() => setArchiveOpen(false)}>
            Annuleren
          </Button>
          <Button
            isPending={mutation.busy}
            onPress={() =>
              void mutation.run(
                `/api/cms/clients/${id}`,
                {
                  method: "PATCH",
                  body: JSON.stringify({
                    status:
                      client.status === "archived" ? "active" : "archived",
                  }),
                },
                () => setArchiveOpen(false),
              )
            }
          >
            {client.status === "archived" ? "Klant herstellen" : "Klant archiveren"}
          </Button>
        </div>
      </EditorModal>
    </>
  );
}
