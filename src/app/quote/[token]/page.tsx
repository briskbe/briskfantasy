import { notFound } from "next/navigation";
import { getPublicQuote } from "@/lib/cms/data";
import { PublicQuoteScreen } from "@/components/cms/public-quote-screen";

export const dynamic = "force-dynamic";

export default async function SharedQuotePage({ params }: { params: Promise<{ token: string }> }) {
  const { token } = await params;
  const quote = await getPublicQuote(token);
  if (!quote) notFound();
  return <PublicQuoteScreen initialQuote={quote} token={token} />;
}
