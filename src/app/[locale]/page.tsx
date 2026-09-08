import { setRequestLocale } from "next-intl/server";
import { CtaBand } from "@/components/blocks/cta-band";

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  setRequestLocale(locale);
  return (
    <>
      <section className="container-x section-y pt-40">
        <h1 className="text-display">
          Brisk<span className="text-amber">.</span>
        </h1>
      </section>
      <CtaBand />
    </>
  );
}
