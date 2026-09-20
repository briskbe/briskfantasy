import { ProjectsPage } from "@/components/cms/projects";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string; new?: string }>;
}) {
  const query = await searchParams;
  return <ProjectsPage clientId={query.clientId} create={query.new === "1"} />;
}
