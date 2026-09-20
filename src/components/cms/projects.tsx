"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { Button, Card, Table } from "@heroui/react";
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
          label="Project name"
          value={form.title}
          onChange={set("title")}
          required
          maxLength={200}
          placeholder="A clear name for the next big thing"
        />
        <Choice
          label="Client"
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
            label="Service"
            value={form.service}
            onChange={set("service")}
            placeholder="Website, branding, app…"
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
            placeholder="0.00"
          />
          <Field
            label="Progress (%)"
            value={form.progress}
            onChange={set("progress")}
            type="number"
            min="0"
            max="100"
            step="1"
          />
          <Field
            label="Start date"
            value={form.startDate}
            onChange={set("startDate")}
            type="date"
          />
          <Field
            label="Due date"
            value={form.dueDate}
            onChange={set("dueDate")}
            type="date"
            min={form.startDate || undefined}
          />
        </div>
        <Field
          label="Project description"
          value={form.description}
          onChange={set("description")}
          multiline
          placeholder="Scope, deliverables, and anything worth keeping in mind."
        />
      </div>
      <ErrorNotice message={mutation.error} />
      <FormActions
        busy={mutation.busy}
        onCancel={onClose}
        label={project ? "Save project" : "Create project"}
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
        eyebrow="From idea to delivery"
        title="Work in progress."
        description="See what’s moving, what’s next, and what’s ready to ship."
      >
        <Button
          onPress={() => setEditor("new")}
          isDisabled={!data.clients.length}
        >
          <Plus size={16} />
          New project
        </Button>
      </PageHeading>
      <div className="mb-6 flex flex-wrap items-end gap-4">
        <SearchBox
          value={query}
          onChange={setQuery}
          placeholder="Search projects…"
        />
        <div className="w-44">
          <Choice
            label="Status"
            value={status}
            onChange={setStatus}
            options={[
              { value: "all", label: "All statuses" },
              ...projectStatuses.map((value) => ({
                value,
                label: titleCase(value),
              })),
            ]}
          />
        </div>
        <div className="w-48">
          <Choice
            label="Client"
            value={selectedClient}
            onChange={setSelectedClient}
            options={[
              { value: "all", label: "All clients" },
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
          aria-label="Project view"
        >
          <Button
            isIconOnly
            size="sm"
            variant={view === "board" ? "secondary" : "ghost"}
            aria-label="Board view"
            aria-pressed={view === "board"}
            onPress={() => setView("board")}
          >
            <LayoutGrid size={17} />
          </Button>
          <Button
            isIconOnly
            size="sm"
            variant={view === "list" ? "secondary" : "ghost"}
            aria-label="List view"
            aria-pressed={view === "list"}
            onPress={() => setView("list")}
          >
            <List size={17} />
          </Button>
        </div>
      </div>
      {!data.clients.length ? (
        <Card className="border border-border shadow-none">
          <EmptyState
            title="Start with a client."
            description="Connect every project to the person or company you’re creating it for."
            action={
              <ActionLink href="/cms/clients">Add your first client</ActionLink>
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
                        className="border border-border p-4 shadow-none"
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
                            aria-label={`Edit ${project.title}`}
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
                        <div className="mt-6 flex items-center justify-between text-xs">
                          <span className="text-muted">Progress</span>
                          <span>{project.progress}%</span>
                        </div>
                        <div className="mt-2 h-1 overflow-hidden rounded-full bg-surface-secondary">
                          <div
                            className="h-full rounded-full bg-accent"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <div className="mt-4 flex items-center justify-between gap-2 border-t border-border pt-3 text-[11px] text-muted">
                          <span className="flex items-center gap-1.5">
                            <CalendarDays size={12} />
                            {project.dueDate
                              ? date(project.dueDate)
                              : "No due date"}
                          </span>
                          <span>{money(project.budgetCents)}</span>
                        </div>
                      </Card>
                    ))}
                  {!projects.some((project) => project.status === column) && (
                    <div className="flex min-h-28 items-center justify-center rounded-xl border border-dashed border-border p-5 text-center text-xs text-muted">
                      No projects here yet
                    </div>
                  )}
                </div>
              </section>
            ))}
          </div>
        </div>
      ) : (
        <Card className="border border-border p-0 shadow-none">
          {projects.length ? (
            <Table>
              <Table.ScrollContainer>
                <Table.Content aria-label="Projects" className="min-w-[760px]">
                  <Table.Header>
                    <Table.Column isRowHeader>Project</Table.Column>
                    <Table.Column>Client</Table.Column>
                    <Table.Column>Status</Table.Column>
                    <Table.Column>Budget</Table.Column>
                    <Table.Column>Due date</Table.Column>
                    <Table.Column>Progress</Table.Column>
                    <Table.Column aria-label="Actions"> </Table.Column>
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
                            aria-label={`Edit ${project.title}`}
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
              title="No projects in this view."
              description="Try another filter, or make a start on something new."
              action={
                <Button variant="secondary" onPress={() => setEditor("new")}>
                  New project
                </Button>
              }
            />
          )}
        </Card>
      )}
      <EditorModal
        open={editor !== null}
        onClose={() => setEditor(null)}
        title={editor === "new" ? "Start a project" : "Edit project"}
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
        title="Project not found."
        description="This project is no longer available."
        action={<ActionLink href="/cms/projects">Back to projects</ActionLink>}
      />
    );
  const client = data.clients.find((item) => item.id === project.clientId);
  const followUps = data.followUps.filter((item) => item.projectId === id);
  return (
    <>
      <PageHeading
        back={{ href: "/cms/projects", label: "All projects" }}
        title={project.title}
        description={project.service}
      >
        <StatusBadge status={project.status} />
        <Button onPress={() => setEditing(true)} variant="secondary">
          <Pencil size={16} />
          Edit project
        </Button>
      </PageHeading>
      <div className="grid gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <Card className="border border-border p-6 shadow-none">
            <Card.Header>
              <Card.Title className="text-base">Project overview</Card.Title>
            </Card.Header>
            <Card.Content>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-muted">
                {project.description ||
                  "Add a description to keep the scope and deliverables clear."}
              </p>
              <div className="mt-8 flex justify-between text-sm">
                <span>Progress</span>
                <span className="font-medium">{project.progress}%</span>
              </div>
              <div className="mt-3 h-2 overflow-hidden rounded-full bg-surface-secondary">
                <div
                  className="h-full rounded-full bg-accent"
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </Card.Content>
          </Card>
          <Card className="mt-6 border border-border p-0 shadow-none">
            <Card.Header className="flex-row items-center justify-between border-b border-border p-5">
              <Card.Title className="text-base">Project follow-ups</Card.Title>
              <ActionLink
                href={`/cms/follow-ups?clientId=${project.clientId}&projectId=${id}&new=1`}
                subtle
              >
                Add follow-up
              </ActionLink>
            </Card.Header>
            <Card.Content>
              {followUps.length ? (
                followUps.map((item) => (
                  <Link
                    key={item.id}
                    href={`/cms/follow-ups?projectId=${id}`}
                    className="flex items-center justify-between gap-3 border-b border-border p-5 last:border-0"
                  >
                    <div>
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
                  title="Your next step starts here."
                  description="Add a task, meeting, call or email to keep the project moving."
                />
              )}
            </Card.Content>
          </Card>
        </div>
        <Card className="h-fit border border-border p-6 shadow-none">
          <Card.Header>
            <Card.Title className="text-base">The details</Card.Title>
          </Card.Header>
          <Card.Content className="mt-5">
            <dl className="space-y-5 text-sm">
              <div>
                <dt className="text-xs text-muted">Client</dt>
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
                <dt className="text-xs text-muted">Project budget</dt>
                <dd className="mt-1.5 font-medium">
                  {money(project.budgetCents)}
                </dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Start date</dt>
                <dd className="mt-1.5">{date(project.startDate)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Due date</dt>
                <dd className="mt-1.5">{date(project.dueDate)}</dd>
              </div>
              <div>
                <dt className="text-xs text-muted">Last updated</dt>
                <dd className="mt-1.5">{date(project.updatedAt)}</dd>
              </div>
            </dl>
          </Card.Content>
        </Card>
      </div>
      <EditorModal
        open={editing}
        onClose={() => setEditing(false)}
        title="Edit project"
      >
        {editing && (
          <ProjectEditor project={project} onClose={() => setEditing(false)} />
        )}
      </EditorModal>
    </>
  );
}
