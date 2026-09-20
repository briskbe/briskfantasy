"use client";

import Link from "next/link";
import { Button, Card } from "@heroui/react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  FileText,
  FolderKanban,
  Plus,
  Users,
} from "lucide-react";
import { useCms } from "./cms-provider";
import {
  ActionLink,
  date,
  EmptyState,
  ErrorNotice,
  money,
  PageHeading,
  StatusBadge,
  useCmsMutation,
  WorkspaceGate,
} from "./ui";

export function Dashboard() {
  return (
    <WorkspaceGate>
      <DashboardContent />
    </WorkspaceGate>
  );
}

function DashboardContent() {
  const { data } = useCms();
  const mutation = useCmsMutation();
  if (!data) return null;
  const activeProjects = data.projects.filter((project) =>
    ["planned", "in_progress", "review"].includes(project.status),
  );
  const followUps = data.followUps
    .filter((item) => item.status === "open")
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  const pendingQuotes = data.quotes.filter(
    (quote) => quote.status === "shared",
  );
  const firstName = data.user.name.split(" ")[0] || "there";
  const metrics = [
    {
      label: "Active clients",
      value: data.clients.filter((client) => client.status === "active").length,
      caption: `${data.clients.filter((client) => client.status === "lead").length} leads to nurture`,
      icon: Users,
      href: "/cms/clients",
    },
    {
      label: "Projects in motion",
      value: activeProjects.length,
      caption: `${data.projects.filter((project) => project.status === "review").length} ready for review`,
      icon: FolderKanban,
      href: "/cms/projects",
    },
    {
      label: "Open follow-ups",
      value: followUps.length,
      caption: `${followUps.filter((item) => new Date(item.dueAt) < new Date()).length} past their due date`,
      icon: CalendarCheck2,
      href: "/cms/follow-ups",
    },
    {
      label: "Awaiting a decision",
      value: money(
        pendingQuotes.reduce((sum, quote) => sum + quote.totalCents, 0),
      ),
      caption: `${pendingQuotes.length} shared quotes · incl. VAT`,
      icon: FileText,
      href: "/cms/quotes",
    },
  ];
  return (
    <>
      <PageHeading
        eyebrow={new Intl.DateTimeFormat("en-GB", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }).format(new Date())}
        title={`Good to see you, ${firstName}.`}
        description="Your clients, your work, and what needs your attention."
      >
        <ActionLink href="/cms/quotes/new">
          <Plus size={16} />
          Create a quote
        </ActionLink>
      </PageHeading>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, caption, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="cms-metric h-full border border-border p-5 shadow-none transition-shadow hover:shadow-sm">
              <Card.Header className="flex-row items-center justify-between">
                <Card.Description className="text-sm font-medium text-muted">
                  {label}
                </Card.Description>
                <Icon className="text-muted" size={18} strokeWidth={1.5} />
              </Card.Header>
              <Card.Content>
                <p className="mt-3 text-[2rem] font-semibold tracking-[-0.055em]">
                  {value}
                </p>
                <p className="mt-2 text-xs text-muted">{caption}</p>
              </Card.Content>
            </Card>
          </Link>
        ))}
      </div>
      <ErrorNotice message={mutation.error} />
      <div className="mt-7 grid items-start gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Card className="border border-border p-0 shadow-none">
          <Card.Header className="flex-row items-center justify-between border-b border-border px-6 py-5">
            <div>
              <Card.Title className="text-base">Next on your list</Card.Title>
              <Card.Description className="mt-1 text-xs">
                Small actions that keep things moving.
              </Card.Description>
            </div>
            <ActionLink href="/cms/follow-ups" subtle>
              View all
            </ActionLink>
          </Card.Header>
          <Card.Content>
            {followUps.length ? (
              <ul className="divide-y divide-border">
                {followUps.slice(0, 5).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center gap-4 px-6 py-5"
                  >
                    <Button
                      aria-label={`Complete ${item.title}`}
                      size="sm"
                      isIconOnly
                      variant="outline"
                      className="rounded-full"
                      isDisabled={mutation.busy}
                      onPress={() =>
                        void mutation.run(`/api/cms/follow-ups/${item.id}`, {
                          method: "PATCH",
                          body: JSON.stringify({ status: "done" }),
                        })
                      }
                    >
                      <Check size={14} />
                    </Button>
                    <div className="min-w-0 flex-1">
                      <Link
                        href="/cms/follow-ups"
                        className="text-sm font-medium hover:underline"
                      >
                        {item.title}
                      </Link>
                      <p className="mt-1 text-xs text-muted">
                        {data.clients.find(
                          (client) => client.id === item.clientId,
                        )?.company ||
                          data.clients.find(
                            (client) => client.id === item.clientId,
                          )?.name ||
                          "General follow-up"}
                      </p>
                    </div>
                    <div className="shrink-0 text-right">
                      <p
                        className={`text-xs ${new Date(item.dueAt) < new Date() ? "text-danger" : "text-muted"}`}
                      >
                        {date(item.dueAt)}
                      </p>
                      <p className="mt-1 text-[11px] capitalize text-muted">
                        {item.type}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="A clear head. A clear list."
                description="Add your next client call, email, or task. We’ll keep it all in one place."
                icon={<CalendarCheck2 size={24} />}
                action={
                  <ActionLink href="/cms/follow-ups">
                    Plan a follow-up
                  </ActionLink>
                }
              />
            )}
          </Card.Content>
        </Card>
        <Card className="border border-border p-0 shadow-none">
          <Card.Header className="flex-row items-center justify-between border-b border-border px-6 py-5">
            <div>
              <Card.Title className="text-base">Projects in motion</Card.Title>
              <Card.Description className="mt-1 text-xs">
                A quick look at active work.
              </Card.Description>
            </div>
            <Link href="/cms/projects" aria-label="View projects">
              <ArrowRight size={18} />
            </Link>
          </Card.Header>
          <Card.Content>
            {activeProjects.length ? (
              <ul className="divide-y divide-border">
                {activeProjects.slice(0, 4).map((project) => (
                  <li key={project.id} className="px-6 py-5">
                    <div className="flex items-start justify-between gap-3">
                      <Link
                        href={`/cms/projects/${project.id}`}
                        className="text-sm font-medium hover:underline"
                      >
                        {project.title}
                      </Link>
                      <StatusBadge status={project.status} />
                    </div>
                    <p className="mt-1 text-xs text-muted">
                      {data.clients.find(
                        (client) => client.id === project.clientId,
                      )?.company ||
                        data.clients.find(
                          (client) => client.id === project.clientId,
                        )?.name}
                    </p>
                    <div className="mt-4 flex items-center gap-3">
                      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-secondary">
                        <div
                          className="h-full rounded-full bg-accent"
                          style={{ width: `${project.progress}%` }}
                        />
                      </div>
                      <span className="text-xs tabular-nums text-muted">
                        {project.progress}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Make room for your next project."
                description="Bring a client’s next idea into your workspace and track it from start to finish."
                icon={<FolderKanban size={24} />}
                action={
                  <ActionLink href="/cms/projects">Add a project</ActionLink>
                }
              />
            )}
          </Card.Content>
        </Card>
      </div>
      <div className="mt-6 grid gap-6 xl:grid-cols-[1.35fr_1fr]">
        <Card className="border border-border p-6 shadow-none">
          <Card.Header>
            <Card.Title className="text-base">Recent activity</Card.Title>
            <Card.Description className="text-xs">
              The latest changes across your workspace.
            </Card.Description>
          </Card.Header>
          <Card.Content className="mt-5">
            {data.activity.length ? (
              <ol className="space-y-5">
                {data.activity.slice(0, 6).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-start justify-between gap-4 text-sm"
                  >
                    <div className="flex gap-3">
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-accent" />
                      <span>
                        {item.href ? (
                          <Link href={item.href} className="hover:underline">
                            {item.description}
                          </Link>
                        ) : (
                          item.description
                        )}
                      </span>
                    </div>
                    <time
                      className="shrink-0 text-xs text-muted"
                      dateTime={item.createdAt}
                    >
                      {date(item.createdAt)}
                    </time>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="py-5 text-sm text-muted">
                Your workspace story starts with your first client.
              </p>
            )}
          </Card.Content>
        </Card>
        <div className="cms-welcome-card rounded-2xl p-7">
          <span className="text-xs font-medium uppercase tracking-widest opacity-60">
            Everything, a little closer.
          </span>
          <h2 className="mt-4 max-w-[15ch] text-2xl font-medium leading-tight tracking-tight">
            Good work starts with a good overview.
          </h2>
          <p className="mt-3 max-w-sm text-sm leading-6 opacity-75">
            Keep your client details, project progress and proposals connected.
            Less searching, more doing.
          </p>
          <Link
            href="/cms/clients"
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
          >
            Your client book
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </>
  );
}
