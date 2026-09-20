"use client";

import { useState, type FormEvent } from "react";
import { Button, Card, Dropdown, Label } from "@heroui/react";
import {
  CalendarCheck2,
  ChevronDown,
  Mail,
  Pencil,
  Phone,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import {
  followUpPriorities,
  followUpStatuses,
  followUpStatusLabels,
  isOpenFollowUp,
  followUpTypes,
  type FollowUp,
} from "@/lib/cms/types";
import { useCms } from "./cms-provider";
import {
  ChipRow,
  Choice,
  date,
  EditorModal,
  FilterBar,
  EmptyState,
  ErrorNotice,
  Field,
  FormActions,
  localDate,
  PageHeading,
  SearchBox,
  StatusBadge,
  titleCase,
  useCmsMutation,
  WorkspaceGate,
} from "./ui";

function localDateTime(value: string) {
  const time = new Date(value);
  return `${localDate(time)}T${String(time.getHours()).padStart(2, "0")}:${String(time.getMinutes()).padStart(2, "0")}`;
}
function FollowUpEditor({
  item,
  clientId,
  projectId,
  onClose,
}: {
  item?: FollowUp;
  clientId?: string;
  projectId?: string;
  onClose: () => void;
}) {
  const { data } = useCms();
  const linkedProject = data?.projects.find(
    (project) => project.id === projectId,
  );
  const [form, setForm] = useState({
    title: item?.title || "",
    notes: item?.notes || "",
    clientId: item?.clientId || linkedProject?.clientId || clientId || "none",
    projectId: item?.projectId || projectId || "none",
    type: item?.type || "task",
    priority: item?.priority || "normal",
    dueAt: item ? localDateTime(item.dueAt) : `${localDate()}T10:00`,
    status: item?.status || "open",
  });
  const mutation = useCmsMutation();
  const set = (key: keyof typeof form) => (value: string) =>
    setForm((previous) => ({
      ...previous,
      [key]: value,
      ...(key === "clientId" ? { projectId: "none" } : {}),
    }));
  function submit(event: FormEvent) {
    event.preventDefault();
    void mutation.run(
      `/api/cms/follow-ups${item ? `/${item.id}` : ""}`,
      {
        method: item ? "PATCH" : "POST",
        body: JSON.stringify({
          ...form,
          dueAt: new Date(form.dueAt).toISOString(),
          clientId: form.clientId === "none" ? null : form.clientId,
          projectId: form.projectId === "none" ? null : form.projectId,
        }),
      },
      onClose,
    );
  }
  return (
    <form onSubmit={submit}>
      <div className="space-y-5">
        <Field
          label="Onderwerp"
          value={form.title}
          onChange={set("title")}
          required
          maxLength={200}
          placeholder="Bijvoorbeeld: offerte versturen of feedback bespreken"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Choice
            label="Klant"
            value={form.clientId}
            onChange={set("clientId")}
            options={[
              { value: "none", label: "Algemene opvolging" },
              ...(data?.clients || []).map((client) => ({
                value: client.id,
                label: client.company || client.name,
              })),
            ]}
          />
          <Choice
            label="Project"
            value={form.projectId}
            onChange={set("projectId")}
            options={[
              { value: "none", label: "Geen project" },
              ...(data?.projects || [])
                .filter(
                  (project) =>
                    form.clientId === "none" ||
                    project.clientId === form.clientId,
                )
                .map((project) => ({
                  value: project.id,
                  label: project.title,
                })),
            ]}
          />
          <Choice
            label="Type"
            value={form.type}
            onChange={set("type")}
            options={followUpTypes.map((value) => ({
              value,
              label: titleCase(value),
            }))}
          />
          <Choice
            label="Prioriteit"
            value={form.priority}
            onChange={set("priority")}
            options={followUpPriorities.map((value) => ({
              value,
              label: titleCase(value),
            }))}
          />
          <Field
            label="Datum en tijd"
            value={form.dueAt}
            onChange={set("dueAt")}
            type="datetime-local"
            required
          />
          <Choice
            label="Status"
            value={form.status}
            onChange={set("status")}
            options={followUpStatuses.map((value) => ({ value, label: followUpStatusLabels[value] }))}
          />
        </div>
        <Field
          label="Notities"
          value={form.notes}
          onChange={set("notes")}
          multiline
          placeholder="Afspraken en aandachtspunten…"
        />
      </div>
      <ErrorNotice message={mutation.error} />
      <FormActions
        busy={mutation.busy}
        onCancel={onClose}
        label={item ? "Opvolging opslaan" : "Opvolging toevoegen"}
      />
    </form>
  );
}

export function FollowUpsPage({
  clientId = "",
  projectId = "",
  create = false,
}: {
  clientId?: string;
  projectId?: string;
  create?: boolean;
}) {
  return (
    <WorkspaceGate>
      <FollowUpsContent
        clientId={clientId}
        projectId={projectId}
        create={create}
      />
    </WorkspaceGate>
  );
}
function FollowUpsContent({
  clientId,
  projectId,
  create,
}: {
  clientId: string;
  projectId: string;
  create: boolean;
}) {
  const { data } = useCms();
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<FollowUp["status"] | "all">("all");
  const [period, setPeriod] = useState("all");
  const [client, setClient] = useState(clientId || "all");
  const [project, setProject] = useState(projectId || "all");
  const [editor, setEditor] = useState<FollowUp | "new" | null>(
    create ? "new" : null,
  );
  const [removing, setRemoving] = useState<FollowUp | null>(null);
  const mutation = useCmsMutation();
  if (!data) return null;
  const now = new Date();
  const today = localDate(now);
  const items = data.followUps
    .filter((item) => {
      const matchesTime =
        period === "all" ||
        (period === "overdue" && isOpenFollowUp(item.status) && new Date(item.dueAt) < now) ||
        (period === "today" && localDate(new Date(item.dueAt)) === today) ||
        (period === "upcoming" && localDate(new Date(item.dueAt)) > today);
      return (
        (filter === "all" || item.status === filter) &&
        matchesTime &&
        (client === "all" || item.clientId === client) &&
        (project === "all" || item.projectId === project) &&
        `${item.title} ${item.notes}`
          .toLowerCase()
          .includes(query.toLowerCase())
      );
    })
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  const typeIcon = {
    task: CalendarCheck2,
    call: Phone,
    email: Mail,
    meeting: Users,
  };
  return (
    <>
      <PageHeading
        title="Opvolging"
        description="Plan taken, telefoongesprekken, e-mails en afspraken."
      >
        <Button onPress={() => setEditor("new")}>
          <Plus size={16} />
          Opvolging toevoegen
        </Button>
      </PageHeading>
      <ChipRow
        label="Filter op status"
        value={filter}
        onChange={setFilter}
        className="mb-4 sm:mb-5"
        options={([...followUpStatuses, "all"] as const).map((value) => ({
          value,
          label: value === "all" ? "Alles" : followUpStatusLabels[value],
        }))}
      />
      <Card className="p-0">
        <FilterBar
          className="border-b border-border p-3 sm:p-5"
          activeCount={
            [period !== "all", client !== "all", project !== "all"].filter(
              Boolean,
            ).length
          }
          search={
            <SearchBox
              value={query}
              onChange={setQuery}
              placeholder="Opvolging zoeken…"
            />
          }
        >
          <div className="col-span-2 sm:w-44">
            <Choice
              label="Periode"
              value={period}
              onChange={setPeriod}
              options={[
                { value: "all", label: "Alle datums" },
                { value: "today", label: "Vandaag" },
                { value: "overdue", label: "Te laat" },
                { value: "upcoming", label: "Binnenkort" },
              ]}
            />
          </div>
          <div className="sm:w-48">
            <Choice
              label="Klant"
              value={client}
              onChange={(value) => {
                setClient(value);
                setProject("all");
              }}
              options={[
                { value: "all", label: "Alle klanten" },
                ...data.clients.map((item) => ({
                  value: item.id,
                  label: item.company || item.name,
                })),
              ]}
            />
          </div>
          <div className="sm:w-48">
            <Choice
              label="Project"
              value={project}
              onChange={setProject}
              options={[
                { value: "all", label: "Alle projecten" },
                ...data.projects
                  .filter(
                    (item) => client === "all" || item.clientId === client,
                  )
                  .map((item) => ({ value: item.id, label: item.title })),
              ]}
            />
          </div>
        </FilterBar>
        <div className="px-3 sm:px-5">
          <ErrorNotice message={mutation.error} />
        </div>
        {items.length ? (
          <ul className="divide-y divide-border">
            {items.map((item) => {
              const Icon = typeIcon[item.type];
              const overdue =
                isOpenFollowUp(item.status) && new Date(item.dueAt) < now;
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-2 p-3 sm:gap-4 sm:p-5"
                >
                  <div className="mt-1 hidden size-8 shrink-0 items-center justify-center rounded-lg bg-default text-muted sm:flex" aria-hidden="true">
                    <Icon size={16} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        className={`text-left text-sm font-medium hover:underline ${item.status === "done" ? "text-muted line-through" : ""}`}
                        onClick={() => setEditor(item)}
                      >
                        {item.title}
                      </button>
                      {item.priority === "high" && (
                        <StatusBadge status="high" />
                      )}
                    </div>
                    <div className="mt-2">
                      <Dropdown>
                        <Button size="sm" variant="ghost" className="max-w-full gap-1 px-0" isDisabled={mutation.busy}
                          aria-label={`Status wijzigen: ${item.title}. Huidige status: ${followUpStatusLabels[item.status]}`}>
                          <StatusBadge status={item.status} /><ChevronDown size={13} className="shrink-0 text-muted" aria-hidden="true" />
                        </Button>
                        <Dropdown.Popover>
                          <Dropdown.Menu aria-label="Opvolgstatus" selectionMode="single" selectedKeys={[item.status]}
                            onAction={(key) => { if (key !== item.status) void mutation.run(`/api/cms/follow-ups/${item.id}`, { method: "PATCH", body: JSON.stringify({ status: key }) }); }}>
                            {followUpStatuses.map((status) => <Dropdown.Item key={status} id={status} textValue={followUpStatusLabels[status]}>
                              <Label>{followUpStatusLabels[status]}</Label><Dropdown.ItemIndicator />
                            </Dropdown.Item>)}
                          </Dropdown.Menu>
                        </Dropdown.Popover>
                      </Dropdown>
                    </div>
                    {item.notes && (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted">
                        {item.notes}
                      </p>
                    )}
                    <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted sm:mt-3">
                      <span className="flex items-center gap-1.5">
                        <Icon size={13} />
                        {titleCase(item.type)}
                      </span>
                      <span>
                        {data.clients.find(
                          (entry) => entry.id === item.clientId,
                        )?.company ||
                          data.clients.find(
                            (entry) => entry.id === item.clientId,
                          )?.name ||
                          "Algemeen"}
                      </span>
                      {item.projectId && (
                        <span>
                          {
                            data.projects.find(
                              (entry) => entry.id === item.projectId,
                            )?.title
                          }
                        </span>
                      )}
                      <span className={overdue ? "text-danger" : ""}>
                        {overdue ? "Te laat · " : ""}
                        {date(item.dueAt, true)}
                      </span>
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
                    <Button
                      size="sm"
                      isIconOnly
                      variant="ghost"
                      aria-label={`Bewerk ${item.title}`}
                      onPress={() => setEditor(item)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="ghost"
                      aria-label={`Verwijder ${item.title}`}
                      onPress={() => setRemoving(item)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </li>
              );
            })}
          </ul>
        ) : (
          <EmptyState
            title={
              filter === "done"
                ? "Nog geen afgeronde taken"
                : "Geen opvolging gevonden"
            }
            description="Voeg opvolging toe of pas de filters aan."
            icon={<CalendarCheck2 size={25} />}
            action={
              <Button variant="secondary" onPress={() => setEditor("new")}>
                Opvolging toevoegen
              </Button>
            }
          />
        )}
      </Card>
      <EditorModal
        open={editor !== null}
        onClose={() => setEditor(null)}
        title={editor === "new" ? "Opvolging plannen" : "Opvolging bewerken"}
      >
        {editor && (
          <FollowUpEditor
            key={editor === "new" ? "new" : editor.id}
            item={editor === "new" ? undefined : editor}
            clientId={client === "all" ? undefined : client}
            projectId={project === "all" ? undefined : project}
            onClose={() => setEditor(null)}
          />
        )}
      </EditorModal>
      <EditorModal
        open={removing !== null}
        onClose={() => setRemoving(null)}
        title="Deze opvolging verwijderen?"
      >
        <p className="text-sm text-muted">
          “{removing?.title}” wordt definitief verwijderd. Je kunt een afgewerkte taak ook
          markeren als afgerond om deze in de historiek te bewaren.
        </p>
        <ErrorNotice message={mutation.error} />
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="tertiary" onPress={() => setRemoving(null)}>
            Behouden
          </Button>
          <Button
            variant="danger"
            isPending={mutation.busy}
            onPress={() =>
              removing &&
              void mutation.run(
                `/api/cms/follow-ups/${removing.id}`,
                { method: "DELETE" },
                () => setRemoving(null),
              )
            }
          >
            Opvolging verwijderen
          </Button>
        </div>
      </EditorModal>
    </>
  );
}
