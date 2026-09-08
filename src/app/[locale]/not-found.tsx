import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  const t = useTranslations("Common");
  return (
    <section className="container-x section-y min-h-[70vh] flex flex-col justify-end">
      <p className="eyebrow text-amber mb-6">404</p>
      <h1 className="text-h1 max-w-4xl text-balance">{t("notFound.title")}</h1>
      <p className="text-lead text-muted mt-6 max-w-xl">{t("notFound.body")}</p>
      <Link href="/" className="mt-10 inline-flex items-center gap-3 text-fg underline underline-offset-8 decoration-line-2 hover:decoration-amber transition-colors">
        {t("notFound.cta")}
      </Link>
    </section>
  );
}
