"use client";

import Link from "next/link";
import { Button, Card, ProgressBar } from "@heroui/react";
import {
  ArrowRight,
  CalendarCheck2,
  Check,
  FileText,
  FolderKanban,
  Plus,
  Users,
} from "lucide-react";
import { isOpenFollowUp } from "@/lib/cms/types";
import { useCms } from "./cms-provider";
import {
  ActionLink,
  date,
  EmptyState,
  ErrorNotice,
  money,
  PageHeading,
  StatusBadge,
  titleCase,
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
    .filter((item) => isOpenFollowUp(item.status))
    .sort((a, b) => a.dueAt.localeCompare(b.dueAt));
  const pendingQuotes = data.quotes.filter(
    (quote) => quote.status === "shared",
  );
  const metrics = [
    {
      label: "Actieve klanten",
      value: data.clients.filter((client) => client.status === "active").length,
      caption: `${data.clients.filter((client) => client.status === "lead").length} potentiële klanten`,
      icon: Users,
      href: "/cms/clients",
    },
    {
      label: "Lopende projecten",
      value: activeProjects.length,
      caption: `${data.projects.filter((project) => project.status === "review").length} ter beoordeling`,
      icon: FolderKanban,
      href: "/cms/projects",
    },
    {
      label: "Openstaande opvolging",
      value: followUps.length,
      caption: `${followUps.filter((item) => new Date(item.dueAt) < new Date()).length} te laat`,
      icon: CalendarCheck2,
      href: "/cms/follow-ups",
    },
    {
      label: "Openstaande offertes",
      value: money(
        pendingQuotes.reduce((sum, quote) => sum + quote.totalCents, 0),
      ),
      caption: `${pendingQuotes.length} gedeelde offertes · incl. btw`,
      icon: FileText,
      href: "/cms/quotes",
    },
  ];
  return (
    <>
      <PageHeading
        eyebrow={new Intl.DateTimeFormat("nl-BE", {
          weekday: "long",
          day: "numeric",
          month: "long",
        }).format(new Date())}
        title="Overzicht"
        description="Een overzicht van je klanten, projecten en geplande opvolging."
      >
        <ActionLink href="/cms/quotes/new">
          <Plus size={16} />
          Offerte maken
        </ActionLink>
      </PageHeading>
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map(({ label, value, caption, icon: Icon, href }) => (
          <Link key={label} href={href}>
            <Card className="h-full p-5">
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
        <Card className="p-0">
          <Card.Header className="flex-row items-center justify-between border-b border-border px-6 py-5">
            <div>
              <Card.Title className="text-base">Geplande opvolging</Card.Title>
              <Card.Description className="mt-1 text-xs">
                De eerstvolgende taken en afspraken.
              </Card.Description>
            </div>
            <ActionLink href="/cms/follow-ups" subtle>
              Alles bekijken
            </ActionLink>
          </Card.Header>
          <Card.Content>
            {followUps.length ? (
              <ul className="divide-y divide-border">
                {followUps.slice(0, 5).map((item) => (
                  <li
                    key={item.id}
                    className="grid grid-cols-[32px_minmax(0,1fr)] items-start gap-x-4 gap-y-2 px-6 py-5 sm:flex sm:items-center"
                  >
                    <Button
                      aria-label={`Rond af: ${item.title}`}
                      size="sm"
                      isIconOnly
                      variant="outline"
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
                          "Algemene opvolging"}
                      </p>
                      <div className="mt-2"><StatusBadge status={item.status} /></div>
                    </div>
                    <div className="col-start-2 flex flex-wrap items-center gap-x-2 gap-y-1 text-left sm:block sm:shrink-0 sm:text-right">
                      <p
                        className={`text-xs ${new Date(item.dueAt) < new Date() ? "text-danger" : "text-muted"}`}
                      >
                        {date(item.dueAt)}
                      </p>
                      <p className="text-[11px] capitalize text-muted sm:mt-1">
                        {titleCase(item.type)}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Geen openstaande opvolging"
                description="Plan een telefoongesprek, e-mail of taak."
                icon={<CalendarCheck2 size={24} />}
                action={
                  <ActionLink href="/cms/follow-ups">
                    Opvolging plannen
                  </ActionLink>
                }
              />
            )}
          </Card.Content>
        </Card>
        <Card className="p-0">
          <Card.Header className="flex-row items-center justify-between border-b border-border px-6 py-5">
            <div>
              <Card.Title className="text-base">Lopende projecten</Card.Title>
              <Card.Description className="mt-1 text-xs">
                De huidige voortgang per project.
              </Card.Description>
            </div>
            <Link href="/cms/projects" aria-label="Projecten bekijken">
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
                      <ProgressBar
                        aria-label={`Voortgang van ${project.title}`}
                        value={project.progress}
                        size="sm"
                        className="flex-1"
                      >
                        <ProgressBar.Track>
                          <ProgressBar.Fill />
                        </ProgressBar.Track>
                      </ProgressBar>
                      <span className="text-xs tabular-nums text-muted">
                        {project.progress}%
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <EmptyState
                title="Geen lopende projecten"
                description="Voeg een project toe om de voortgang bij te houden."
                icon={<FolderKanban size={24} />}
                action={
                  <ActionLink href="/cms/projects">Project toevoegen</ActionLink>
                }
              />
            )}
          </Card.Content>
        </Card>
      </div>
      <div className="mt-6">
        <Card className="p-6">
          <Card.Header>
            <Card.Title className="text-base">Recente activiteit</Card.Title>
            <Card.Description className="text-xs">
              De laatste wijzigingen in het beheerportaal.
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
                Nog geen activiteit. Voeg een klant toe om te beginnen.
              </p>
            )}
          </Card.Content>
        </Card>
      </div>
    </>
  );
}
