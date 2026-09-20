"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button, Card, Table, Tabs } from "@heroui/react";
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
import { clientStatuses, type Client } from "@/lib/cms/types";
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
          label="Contact name"
          value={form.name}
          onChange={set("name")}
          required
          maxLength={160}
          autoComplete="name"
        />
        <Field
          label="Company"
          value={form.company}
          onChange={set("company")}
          maxLength={160}
          autoComplete="organization"
        />
        <Field
          label="Email address"
          value={form.email}
          onChange={set("email")}
          type="email"
          autoComplete="email"
        />
        <Field
          label="Phone number"
          value={form.phone}
          onChange={set("phone")}
          type="tel"
          autoComplete="tel"
        />
        <Field
          label="VAT number"
          value={form.vatNumber}
          onChange={set("vatNumber")}
          placeholder="BE 0123.456.789"
        />
        <Choice
          label="Relationship"
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
          label="Billing address"
          value={form.address}
          onChange={set("address")}
          multiline
          placeholder="Street, postcode, city and country"
        />
        <Field
          label="Private notes"
          value={form.notes}
          onChange={set("notes")}
          multiline
          placeholder="A little context for your next conversation…"
          description="Only visible in your workspace. Never included on shared quotes."
        />
      </div>
      <ErrorNotice message={mutation.error} />
      <FormActions
        busy={mutation.busy}
        onCancel={onClose}
        label={client ? "Save client" : "Add client"}
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
        eyebrow="Relationships"
        title="Your client book."
        description="The people behind the projects. All their details, in one place."
      >
        <Button onPress={() => setEditor("new")}>
          <Plus size={16} />
          Add client
        </Button>
      </PageHeading>
      <Card className="border border-border p-0 shadow-none">
        <div className="flex flex-wrap items-end justify-between gap-4 border-b border-border p-5">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search clients…"
          />
          <div className="w-44">
            <Choice
              label="Show clients"
              value={status}
              onChange={setStatus}
              options={[
                { value: "all", label: "All current clients" },
                ...clientStatuses.map((value) => ({
                  value,
                  label: titleCase(value),
                })),
              ]}
            />
          </div>
        </div>
        {clients.length ? (
          <Table className="rounded-none shadow-none">
            <Table.ScrollContainer>
              <Table.Content aria-label="Clients" className="min-w-[740px]">
                <Table.Header>
                  <Table.Column isRowHeader>Client</Table.Column>
                  <Table.Column>Contact</Table.Column>
                  <Table.Column>Status</Table.Column>
                  <Table.Column>Projects</Table.Column>
                  <Table.Column>Added</Table.Column>
                  <Table.Column aria-label="Actions"> </Table.Column>
                </Table.Header>
                <Table.Body>
                  {clients.map((client) => (
                    <Table.Row key={client.id} id={client.id}>
                      <Table.Cell>
                        <Link
                          href={`/cms/clients/${client.id}`}
                          className="flex items-center gap-3 py-1"
                        >
                          <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-surface-secondary text-xs font-semibold">
                            {initials(client.company || client.name)}
                          </span>
                          <span>
                            <span className="block font-medium">
                              {client.company || client.name}
                            </span>
                            <span className="mt-0.5 block text-xs text-muted">
                              {client.company
                                ? client.name
                                : "Individual client"}
                            </span>
                          </span>
                        </Link>
                      </Table.Cell>
                      <Table.Cell>
                        <span className="text-sm text-muted">
                          {client.email || "No email added"}
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
                          aria-label={`Edit ${client.name}`}
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
              {clients.length} {clients.length === 1 ? "client" : "clients"}
            </Table.Footer>
          </Table>
        ) : (
          <EmptyState
            icon={<Users size={25} />}
            title={
              query || status !== "all"
                ? "No clients match this view."
                : "Every good project starts here."
            }
            description={
              query || status !== "all"
                ? "Try a different search or relationship filter."
                : "Add your first client and keep their projects, quotes and follow-ups connected."
            }
            action={
              <Button variant="secondary" onPress={() => setEditor("new")}>
                <Plus size={16} />
                Add client
              </Button>
            }
          />
        )}
      </Card>
      <EditorModal
        open={editor !== null}
        onClose={() => setEditor(null)}
        title={editor === "new" ? "Add a client" : "Edit client"}
        description="Keep the essentials close, and the details organised."
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
        title="Client not found."
        description="This client is no longer available in your workspace."
        action={<ActionLink href="/cms/clients">Back to clients</ActionLink>}
      />
    );
  const projects = data.projects.filter((item) => item.clientId === id);
  const quotes = data.quotes.filter((item) => item.clientId === id);
  const followUps = data.followUps.filter((item) => item.clientId === id);
  return (
    <>
      <PageHeading
        back={{ href: "/cms/clients", label: "All clients" }}
        title={client.company || client.name}
        description={client.company ? client.name : "Client profile"}
      >
        <StatusBadge status={client.status} />
        <Button variant="secondary" onPress={() => setEditing(true)}>
          <Pencil size={15} />
          Edit client
        </Button>
        <Button
          variant="ghost"
          isIconOnly
          aria-label={
            client.status === "archived" ? "Restore client" : "Archive client"
          }
          onPress={() => setArchiveOpen(true)}
        >
          <Archive size={17} />
        </Button>
      </PageHeading>
      <ErrorNotice message={mutation.error} />
      <div className="grid items-start gap-6 lg:grid-cols-[300px_1fr]">
        <Card className="border border-border p-6 shadow-none">
          <span className="mb-4 flex size-16 items-center justify-center rounded-2xl bg-surface-secondary text-xl font-semibold">
            {initials(client.company || client.name)}
          </span>
          <Card.Header>
            <Card.Title>{client.name}</Card.Title>
            <Card.Description>
              {client.company || "Individual client"}
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
              Client since {date(client.createdAt)}
            </p>
          </Card.Content>
          <Card.Footer className="mt-5 flex-col items-stretch gap-2">
            <ActionLink href={`/cms/quotes/new?clientId=${id}`}>
              Create quote
            </ActionLink>
            <ActionLink href={`/cms/projects?clientId=${id}&new=1`} subtle>
              Add project
            </ActionLink>
            <ActionLink href={`/cms/follow-ups?clientId=${id}&new=1`} subtle>
              Plan follow-up
            </ActionLink>
          </Card.Footer>
        </Card>
        <div className="min-w-0">
          <Tabs defaultSelectedKey="overview">
            <Tabs.ListContainer className="mb-5">
              <Tabs.List aria-label="Client information">
                {["overview", "projects", "quotes", "follow-ups"].map((tab) => (
                  <Tabs.Tab key={tab} id={tab}>
                    {titleCase(tab)}
                    <Tabs.Indicator />
                  </Tabs.Tab>
                ))}
              </Tabs.List>
            </Tabs.ListContainer>
            <Tabs.Panel id="overview">
              <div className="grid gap-4 sm:grid-cols-3">
                {[
                  { label: "Projects", value: projects.length },
                  {
                    label: "Accepted quotes",
                    value: money(
                      quotes
                        .filter((quote) => quote.status === "accepted")
                        .reduce((sum, quote) => sum + quote.totalCents, 0),
                    ),
                  },
                  {
                    label: "Open follow-ups",
                    value: followUps.filter((item) => item.status === "open")
                      .length,
                  },
                ].map((item) => (
                  <Card
                    key={item.label}
                    className="border border-border p-5 shadow-none"
                  >
                    <p className="text-xs text-muted">{item.label}</p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight">
                      {item.value}
                    </p>
                  </Card>
                ))}
              </div>
              <Card className="mt-5 border border-border p-6 shadow-none">
                <Card.Header>
                  <Card.Title className="text-base">Private notes</Card.Title>
                  <Card.Description className="text-xs">
                    A little context for the next conversation.
                  </Card.Description>
                </Card.Header>
                <Card.Content className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                  {client.notes ||
                    "No notes yet. Add useful details about this client using Edit client."}
                </Card.Content>
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="projects">
              <Card className="border border-border p-0 shadow-none">
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
                    title="No projects yet."
                    description="Start the next chapter with a project for this client."
                    action={
                      <ActionLink href={`/cms/projects?clientId=${id}&new=1`}>
                        Add project
                      </ActionLink>
                    }
                  />
                )}
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="quotes">
              <Card className="border border-border p-0 shadow-none">
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
                    title="No quotes yet."
                    description="Turn the next conversation into a clear proposal."
                    action={
                      <ActionLink href={`/cms/quotes/new?clientId=${id}`}>
                        Create quote
                      </ActionLink>
                    }
                  />
                )}
              </Card>
            </Tabs.Panel>
            <Tabs.Panel id="follow-ups">
              <Card className="border border-border p-0 shadow-none">
                {followUps.length ? (
                  followUps.map((item) => (
                    <Link
                      key={item.id}
                      href={`/cms/follow-ups?clientId=${id}`}
                      className="flex items-center justify-between gap-4 border-b border-border p-5 last:border-0"
                    >
                      <div>
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
                    title="Nothing on the list yet."
                    description="Set a reminder for your next call, task or email."
                    action={
                      <ActionLink href={`/cms/follow-ups?clientId=${id}&new=1`}>
                        Plan follow-up
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
        title="Edit client"
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
            ? "Restore this client?"
            : "Archive this client?"
        }
      >
        <p className="text-sm leading-6 text-muted">
          {client.status === "archived"
            ? "The client will return to your active client book."
            : "Their projects, quotes and history stay available. You can restore this client at any time."}
        </p>
        <ErrorNotice message={mutation.error} />
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="tertiary" onPress={() => setArchiveOpen(false)}>
            Cancel
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
            {client.status === "archived" ? "Restore client" : "Archive client"}
          </Button>
        </div>
      </EditorModal>
    </>
  );
}
