import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";

export default async function Page({ params }: PageProps<"/[locale]/webshop-op-maat">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="container-x section-y pt-40">
        <h1 className="text-h1">webshop-op-maat</h1>
      </section>
      <CtaBand />
    </>
  );
}
