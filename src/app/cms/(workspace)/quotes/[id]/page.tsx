import { QuoteEditorPage } from "@/components/cms/quotes";
export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <QuoteEditorPage id={id} />;
}
