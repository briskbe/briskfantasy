import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";

export default async function Page({ params }: PageProps<"/[locale]/gesprek-inplannen">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="container-x section-y pt-40">
        <h1 className="text-h1">gesprek-inplannen</h1>
      </section>
      <CtaBand />
    </>
  );
}
