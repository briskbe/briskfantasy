import { FollowUpsPage } from "@/components/cms/follow-ups";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{
    clientId?: string;
    projectId?: string;
    new?: string;
  }>;
}) {
  const query = await searchParams;
  return (
    <FollowUpsPage
      clientId={query.clientId}
      projectId={query.projectId}
      create={query.new === "1"}
    />
  );
}
