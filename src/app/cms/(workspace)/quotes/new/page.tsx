import { QuoteEditorPage } from "@/components/cms/quotes";
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ clientId?: string }>;
}) {
  const { clientId } = await searchParams;
  return <QuoteEditorPage clientId={clientId} />;
}
