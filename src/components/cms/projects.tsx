"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button, Card, Label, ProgressBar, Table } from "@heroui/react";
import {
  ArrowUpRight,
  CalendarDays,
  FolderKanban,
  LayoutGrid,
  List,
  Pencil,
  Plus,
} from "lucide-react";
import { projectStatuses, type Project } from "@/lib/cms/types";
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
  money,
  PageHeading,
  SearchBox,
  StatusBadge,
  titleCase,
  toCents,
  useCmsMutation,
  WorkspaceGate,
} from "./ui";

function ProjectEditor({
  project,
  clientId,
  onClose,
}: {
  project?: Project;
  clientId?: string;
  onClose: () => void;
}) {
  const { data } = useCms();
  const [form, setForm] = useState({
    clientId: project?.clientId || clientId || "",
    title: project?.title || "",
    description: project?.description || "",
    service: project?.service || "Website",
    status: project?.status || "planned",
    budget: project ? (project.budgetCents / 100).toFixed(2) : "",
    progress: String(project?.progress || 0),
    startDate: project?.startDate?.slice(0, 10) || "",
    dueDate: project?.dueDate?.slice(0, 10) || "",
  });
  const mutation = useCmsMutation();
  const set = (key: keyof typeof form) => (value: string) =>
    setForm((previous) => ({ ...previous, [key]: value }));
  function submit(event: FormEvent) {
    event.preventDefault();
    const { budget, ...rest } = form;
    void mutation.run(
      `/api/cms/projects${project ? `/${project.id}` : ""}`,
      {
        method: project ? "PATCH" : "POST",
        body: JSON.stringify({
          ...rest,
          budgetCents: toCents(budget || "0"),
          progress: Number(form.progress),
          startDate: form.startDate || null,
          dueDate: form.dueDate || null,
        }),
      },
      onClose,
    );
  }
  return (
    <form onSubmit={submit}>
      <div className="space-y-5">
        <Field
          label="Projectnaam"
          value={form.title}
          onChange={set("title")}
          required
          maxLength={200}
          placeholder="Bijvoorbeeld: nieuwe bedrijfswebsite"
        />
        <Choice
          label="Klant"
          value={form.clientId}
          onChange={set("clientId")}
          required
          options={(data?.clients || [])
            .filter(
              (client) =>
                client.status !== "archived" || client.id === form.clientId,
            )
            .map((client) => ({
              value: client.id,
              label: client.company || client.name,
            }))}
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field
            label="Dienst"
            value={form.service}
            onChange={set("service")}
            placeholder="Website, huisstijl, app…"
          />
          <Choice
            label="Status"
            value={form.status}
            onChange={set("status")}
            options={projectStatuses.map((value) => ({
              value,
              label: titleCase(value),
            }))}
          />
          <Field
            label="Budget (EUR)"
            value={form.budget}
            onChange={set("budget")}
            type="number"
            min="0"
            step="0.01"
            placeholder="0,00"
          />
          <Field
            label="Voortgang (%)"
            value={form.progress}
            onChange={set("progress")}
            type="number"
            min="0"
            max="100"
            step="1"
          />
          <Field
            label="Startdatum"
            value={form.startDate}
            onChange={set("startDate")}
            type="date"
          />
          <Field
            label="Einddatum"
            value={form.dueDate}
            onChange={set("dueDate")}
            type="date"
            min={form.startDate || undefined}
          />
        </div>
        <Field
          label="Projectomschrijving"
          value={form.description}
          onChange={set("description")}
          multiline
          placeholder="Beschrijf de opdracht, het resultaat en de gemaakte afspraken."
        />
      </div>
      <ErrorNotice message={mutation.error} />
      <FormActions
        busy={mutation.busy}
        onCancel={onClose}
        label={project ? "Project opslaan" : "Project aanmaken"}
      />
    </form>
  );
}

export function ProjectsPage({
  clientId = "",
  create = false,
}: {
  clientId?: string;
  create?: boolean;
}) {
  return (
    <WorkspaceGate>
      <ProjectsContent clientId={clientId} create={create} />
    </WorkspaceGate>
  );
}
function ProjectsContent({
  clientId,
  create,
}: {
  clientId: string;
  create: boolean;
}) {
  const { data } = useCms();
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("all");
  const [selectedClient, setSelectedClient] = useState(clientId || "all");
  const [view, setView] = useState<"board" | "list">("board");
  const [editor, setEditor] = useState<Project | "new" | null>(
    create ? "new" : null,
  );
  if (!data) return null;
  const projects = data.projects.filter(
    (project) =>
      (status === "all" || project.status === status) &&
      (selectedClient === "all" || project.clientId === selectedClient) &&
      `${project.title} ${project.service} ${data.clients.find((client) => client.id === project.clientId)?.company || ""}`
        .toLowerCase()
        .includes(query.toLowerCase()),
  );
  const columns = projectStatuses.filter(
    (column) => status === "all" || column === status,
  );
  return (
    <>
      <PageHeading
        title="Projecten"
        description="Volg de planning, voortgang en oplevering van je projecten."
      >
        <Button
          onPress={() => setEditor("new")}
          isDisabled={!data.clients.length}
        >
          <Plus size={16} />
          Nieuw project
        </Button>
      </PageHeading>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Projecten zoeken…"
        />
        <div className="w-44">
          <Choice
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: "Alle statussen" },
              ...projectStatuses.map((value) => ({
                value,
                label: titleCase(value),
              })),
            ]}
          />
        </div>
        <div className="w-48">
          <Choice
            label="Klant"
            value={selectedClient}
            onChange={setSelectedClient}
            options={[
              { value: "all", label: "Alle klanten" },
              ...data.clients.map((client) => ({
                value: client.id,
                label: client.company || client.name,
              })),
            ]}
          />
        </div>
        <div
          className="ml-auto flex gap-1 rounded-xl border border-border bg-surface p-1"
          role="group"
          aria-label="Projectweergave"
        >
          <Button
            isIconOnly
            size="sm"
            variant={view === "board" ? "secondary" : "ghost"}
            aria-label="Bordweergave"
            aria-pressed={view === "board"}
            onPress={() => setView("board")}
          >
            <LayoutGrid size={17} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant={view === "list" ? "secondary" : "ghost"}
            aria-label="Lijstweergave"
            aria-pressed={view === "list"}
            onPress={() => setView("list")}
          >
            <List size={17} />
          </Button>
        </div>
      </div>
      {!data.clients.length ? (
        <Card>
          <EmptyState
            title="Voeg eerst een klant toe"
            description="Elk project wordt gekoppeld aan een klant."
            action={
              <ActionLink href="/cms/clients">Klant toevoegen</ActionLink>
            }
          />
        </Card>
      ) : view === "board" ? (
        <div className="overflow-x-auto pb-4">
          <div
            className="grid gap-4"
            style={{
              gridTemplateColumns: `repeat(${columns.length}, minmax(240px, 1fr))`,
            }}
          >
            {columns.map((column) => (
              <section
                key={column}
                className="rounded-2xl bg-surface-secondary/60 p-3"
              >
                <header className="mb-4 flex items-center justify-between px-1 pt-1">
                  <h2 className="text-sm font-medium">{titleCase(column)}</h2>
                  <span className="rounded-md bg-surface px-2 py-0.5 text-xs text-muted">
                    {
                      projects.filter((project) => project.status === column)
                        .length
                    }
                  </span>
                </header>
                <div className="space-y-3">
                  {projects
                    .filter((project) => project.status === column)
                    .map((project) => (
                      <Card
                        key={project.id}
                        className="p-4"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-[11px] font-medium uppercase tracking-wider text-muted">
                            {project.service || "Project"}
                          </span>
                          <Button
                            size="sm"
                            isIconOnly
                            variant="ghost"
                            className="-mr-2 -mt-2"
                            aria-label={`Bewerk ${project.title}`}
                            onPress={() => setEditor(project)}
                          >
                            <Pencil size={14} />
                          </Button>
                        </div>
                        <Link
                          href={`/cms/projects/${project.id}`}
                          className="mt-3 block text-sm font-semibold leading-6 hover:underline"
                        >
                          {project.title}
                        </Link>
                        <p className="mt-1 text-xs text-muted">
                          {data.clients.find(
                            (client) => client.id === project.clientId,
                          )?.company ||
                            data.clients.find(
                              (client) => client.id === project.clientId,
                            )?.name}
                        </p>
                        <ProgressBar value={project.progress} size="sm" className="mt-6">
                          <Label>Voortgang</Label>
                          <ProgressBar.Output />
                          <ProgressBar.Track>
                            <ProgressBar.Fill />
                          </ProgressBar.Track>
                        </ProgressBar>
                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3 text-[11px] text-muted">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={12} />
                            {project.dueDate
                              ? date(project.dueDate)
                              : "Geen einddatum"}
                          </span>
                          <span>{money(project.budgetCents)}</span>
                        </div>
                      </Card>
                    ))}
                  {!projects.some((project) => project.status === column) && (
                    <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-border p-5 text-center text-xs text-muted">
                      Nog geen projecten
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      ) : (
        <Card className="p-0">
          {projects.length ? (
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Projecten" className="min-w-[760px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Project</Table.Column>
                    <Table.Column>Klant</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Budget</Table.Column>
                    <Table.Column>Einddatum</Table.Column>
                    <Table.Column>Voortgang</Table.Column>
                    <Table.Column aria-label="Acties"> </Table.Column>
                  </Table.Header>
                  <Table.Body>
                    {projects.map((project) => (
                      <Table.Row key={project.id} id={project.id}>
                        <Table.Cell>
                          <Link
                            href={`/cms/projects/${project.id}`}
                            className="font-medium hover:underline"
                          >
                            {project.title}
                          </Link>
                          <p className="mt-1 text-xs text-muted">
                            {project.service}
                          </p>
                        </Table.Cell>
                        <Table.Cell>
                          {data.clients.find(
                            (client) => client.id === project.clientId,
                          )?.company ||
                            data.clients.find(
                              (client) => client.id === project.clientId,
                            )?.name}
                        </Table.Cell>
                        <Table.Cell>
                          <StatusBadge status={project.status} />
                        </Table.Cell>
                        <Table.Cell>{money(project.budgetCents)}</Table.Cell>
                        <Table.Cell>{date(project.dueDate)}</Table.Cell>
                        <Table.Cell>{project.progress}%</Table.Cell>
                        <Table.Cell>
                          <Button
                            size="sm"
                            variant="ghost"
                            isIconOnly
                            aria-label={`Bewerk ${project.title}`}
                            onPress={() => setEditor(project)}
                          >
                            <Pencil size={15} />
                          </Button>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table.Content>
              </Table.ScrollContainer>
            </Table>
          ) : (
            <EmptyState
              icon={<FolderKanban size={24} />}
              title="Geen projecten gevonden"
              description="Pas de filters aan of maak een project aan."
              action={
                <Button variant="secondary" onPress={() => setEditor("new")}>
                  Nieuw project
                </Button>
              }
            />
          )}
        </Card>
      )}
      <EditorModal
        open={editor !== null}
        onClose={() => setEditor(null)}
        title={editor === "new" ? "Project aanmaken" : "Project bewerken"}
      >
        {editor && (
          <ProjectEditor
            key={editor === "new" ? "new" : editor.id}
            project={editor === "new" ? undefined : editor}
            clientId={selectedClient === "all" ? undefined : selectedClient}
            onClose={() => setEditor(null)}
          />
        )}
      </EditorModal>
    </>
  );
}

export function ProjectDetail({ id }: { id: string }) {
  return (
    <WorkspaceGate>
      <ProjectDetailContent id={id} />
    </WorkspaceGate>
  );
}
function ProjectDetailContent({ id }: { id: string }) {
  const { data } = useCms();
  const [editing, setEditing] = useState(false);
  const project = data?.projects.find((item) => item.id === id);
  if (!data) return null;
  if (!project)
    return (
      <EmptyState
        title="Project niet gevonden"
        description="Dit project is niet meer beschikbaar."
        action={<ActionLink href="/cms/projects">Terug naar projecten</ActionLink>}
      />
    );
  const client = data.clients.find((item) => item.id === project.clientId);
  const followUps = data.followUps.filter((item) => item.projectId === id);
  return (
    <>
      <PageHeading
        back={{ href: "/cms/projects", label: "Alle projecten" }}
        title={project.title}
        description={project.service}
      >
        <StatusBadge status={project.status} />
        <Button onPress={() => setEditing(true)} variant="secondary">
          <Pencil size={16} />
          Project bewerken
        </Button>
      </PageHeading>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Card className="p-6">
            <Card.Header>
              <Card.Title className="text-base">Projectoverzicht</Card.Title>
            </Card.Header>
            <Card.Content>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                {project.description ||
                  "Voeg een omschrijving toe met de opdracht en het verwachte resultaat."}
              </p>
              <ProgressBar value={project.progress} className="mt-8">
                <Label>Voortgang</Label>
                <ProgressBar.Output />
                <ProgressBar.Track>
                  <ProgressBar.Fill />
                </ProgressBar.Track>
              </ProgressBar>
            </Card.Content>
          </Card>
          <Card className="mt-6 p-0">
            <Card.Header className="flex-row items-center justify-between border-b border-border p-5">
              <Card.Title className="text-base">Opvolging van dit project</Card.Title>
              <ActionLink
                href={`/cms/follow-ups?clientId=${project.clientId}&projectId=${id}&new=1`}
                subtle
              >
                Opvolging toevoegen
              </ActionLink>
            </Card.Header>
            <Card.Content>
              {followUps.length ? (
                followUps.map((item) => (
                  <Link
                    key={item.id}
                    href={`/cms/follow-ups?projectId=${id}`}
                    className="flex flex-col items-start gap-3 border-b border-border p-5 last:border-0 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0 [overflow-wrap:anywhere]">
                      <p className="text-sm font-medium">{item.title}</p>
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
                  description="Plan een taak, afspraak, telefoongesprek of e-mail voor dit project."
                />
              )}
            </Card.Content>
          </Card>
        </div>
        <Card className="h-fit p-6">
          <Card.Header>
            <Card.Title className="text-base">Projectgegevens</Card.Title>
          </Card.Header>
          <Card.Content className="mt-5">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-xs text-muted">Klant</dt>
                <dd className="mt-1.5">
                  <Link
                    href={`/cms/clients/${project.clientId}`}
                    className="inline-flex items-center gap-2 font-medium hover:underline"
                  >
                    {client?.company || client?.name}
                    <ArrowUpRight size={14} />
                  </Link>
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Projectbudget</dt>
                <dd className="mt-1.5 font-medium">
                  {money(project.budgetCents)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Startdatum</dt>
                <dd className="mt-1.5">{date(project.startDate)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Einddatum</dt>
                <dd className="mt-1.5">{date(project.dueDate)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Laatst bijgewerkt</dt>
                <dd className="mt-1.5">{date(project.updatedAt)}</dd>
              </div>
            </dl>
          </Card.Content>
        </Card>
      </div>
      <EditorModal
        open={editing}
        onClose={() => setEditing(false)}
        title="Project bewerken"
      >
        {editing && (
          <ProjectEditor project={project} onClose={() => setEditing(false)} />
        )}
      </EditorModal>
    </>
  );
}
