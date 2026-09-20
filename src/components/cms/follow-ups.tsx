"use client";

import { useState, type FormEvent } from "react";
import { Button, Card } from "@heroui/react";
import {
  CalendarCheck2,
  Check,
  Mail,
  Pencil,
  Phone,
  Plus,
  RotateCcw,
  Trash2,
  Users,
} from "lucide-react";
import {
  followUpPriorities,
  followUpTypes,
  type FollowUp,
} from "@/lib/cms/types";
import { useCms } from "./cms-provider";
import {
  Choice,
  date,
  EditorModal,
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
          label="What needs to happen?"
          value={form.title}
          onChange={set("title")}
          required
          maxLength={200}
          placeholder="Send the proposal, check in, review feedback…"
        />
        <div className="grid gap-5 sm:grid-cols-2">
          <Choice
            label="Client"
            value={form.clientId}
            onChange={set("clientId")}
            options={[
              { value: "none", label: "General follow-up" },
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
              { value: "none", label: "No project" },
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
            label="Priority"
            value={form.priority}
            onChange={set("priority")}
            options={followUpPriorities.map((value) => ({
              value,
              label: titleCase(value),
            }))}
          />
          <Field
            label="Due date and time"
            value={form.dueAt}
            onChange={set("dueAt")}
            type="datetime-local"
            required
          />
          <Choice
            label="Status"
            value={form.status}
            onChange={set("status")}
            options={[
              { value: "open", label: "Open" },
              { value: "done", label: "Done" },
            ]}
          />
        </div>
        <Field
          label="Notes"
          value={form.notes}
          onChange={set("notes")}
          multiline
          placeholder="The details you’ll want to remember."
        />
      </div>
      <ErrorNotice message={mutation.error} />
      <FormActions
        busy={mutation.busy}
        onCancel={onClose}
        label={item ? "Save follow-up" : "Add follow-up"}
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
  const [filter, setFilter] = useState("open");
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
        filter === "all" ||
        (filter === "done"
          ? item.status === "done"
          : item.status === "open" &&
            (filter === "open" ||
              (filter === "overdue" && new Date(item.dueAt) < now) ||
              (filter === "today" &&
                localDate(new Date(item.dueAt)) === today) ||
              (filter === "upcoming" &&
                localDate(new Date(item.dueAt)) > today)));
      return (
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
        eyebrow="Keep the conversation going"
        title="The next small step."
        description="Calls, tasks, meetings and little things that make a big difference."
      >
        <Button onPress={() => setEditor("new")}>
          <Plus size={16} />
          Add follow-up
        </Button>
      </PageHeading>
      <div
        className="mb-5 flex flex-wrap gap-2"
        role="group"
        aria-label="Due date filter"
      >
        {["open", "today", "overdue", "upcoming", "done", "all"].map(
          (value) => (
            <Button
              key={value}
              size="sm"
              variant={filter === value ? "primary" : "secondary"}
              aria-pressed={filter === value}
              onPress={() => setFilter(value)}
            >
              {value === "open" ? "All open" : titleCase(value)}
            </Button>
          ),
        )}
      </div>
      <Card className="border border-border p-0 shadow-none">
        <div className="flex flex-wrap items-end gap-4 border-b border-border p-5">
          <SearchBox
            value={query}
            onChange={setQuery}
            placeholder="Search follow-ups…"
          />
          <div className="w-48">
            <Choice
              label="Client"
              value={client}
              onChange={(value) => {
                setClient(value);
                setProject("all");
              }}
              options={[
                { value: "all", label: "All clients" },
                ...data.clients.map((item) => ({
                  value: item.id,
                  label: item.company || item.name,
                })),
              ]}
            />
          </div>
          <div className="w-48">
            <Choice
              label="Project"
              value={project}
              onChange={setProject}
              options={[
                { value: "all", label: "All projects" },
                ...data.projects
                  .filter(
                    (item) => client === "all" || item.clientId === client,
                  )
                  .map((item) => ({ value: item.id, label: item.title })),
              ]}
            />
          </div>
        </div>
        <div className="px-5">
          <ErrorNotice message={mutation.error} />
        </div>
        {items.length ? (
          <ul className="divide-y divide-border">
            {items.map((item) => {
              const Icon = typeIcon[item.type];
              const overdue =
                item.status === "open" && new Date(item.dueAt) < now;
              return (
                <li
                  key={item.id}
                  className="flex items-start gap-3 p-5 sm:gap-4"
                >
                  <Button
                    size="sm"
                    variant={item.status === "done" ? "secondary" : "outline"}
                    isIconOnly
                    className="mt-0.5 rounded-full"
                    aria-label={
                      item.status === "done"
                        ? `Reopen ${item.title}`
                        : `Complete ${item.title}`
                    }
                    isDisabled={mutation.busy}
                    onPress={() =>
                      void mutation.run(`/api/cms/follow-ups/${item.id}`, {
                        method: "PATCH",
                        body: JSON.stringify({
                          status: item.status === "done" ? "open" : "done",
                        }),
                      })
                    }
                  >
                    {item.status === "done" ? (
                      <RotateCcw size={14} />
                    ) : (
                      <Check size={14} />
                    )}
                  </Button>
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
                    {item.notes && (
                      <p className="mt-1.5 line-clamp-2 text-xs leading-5 text-muted">
                        {item.notes}
                      </p>
                    )}
                    <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted">
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
                          "General"}
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
                        {overdue ? "Overdue · " : ""}
                        {date(item.dueAt, true)}
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 sm:flex-row">
                    <Button
                      size="sm"
                      isIconOnly
                      variant="ghost"
                      aria-label={`Edit ${item.title}`}
                      onPress={() => setEditor(item)}
                    >
                      <Pencil size={14} />
                    </Button>
                    <Button
                      size="sm"
                      isIconOnly
                      variant="ghost"
                      aria-label={`Delete ${item.title}`}
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
                ? "Completed tasks will appear here."
                : "Nothing on this list."
            }
            description="Add a follow-up or adjust your filters to see what’s next."
            icon={<CalendarCheck2 size={25} />}
            action={
              <Button variant="secondary" onPress={() => setEditor("new")}>
                Add follow-up
              </Button>
            }
          />
        )}
      </Card>
      <EditorModal
        open={editor !== null}
        onClose={() => setEditor(null)}
        title={editor === "new" ? "Plan a follow-up" : "Edit follow-up"}
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
        title="Delete this follow-up?"
      >
        <p className="text-sm text-muted">
          “{removing?.title}” will be permanently removed. Completed tasks can
          be kept in your history instead.
        </p>
        <ErrorNotice message={mutation.error} />
        <div className="mt-6 flex justify-end gap-2">
          <Button variant="tertiary" onPress={() => setRemoving(null)}>
            Keep it
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
            Delete follow-up
          </Button>
        </div>
      </EditorModal>
    </>
  );
}
