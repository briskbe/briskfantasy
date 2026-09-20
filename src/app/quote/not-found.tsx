import Link from "next/link";
export default function QuoteUnavailable() {
  return <main className="flex min-h-dvh items-center justify-center p-6"><section className="max-w-md rounded-2xl border border-border bg-surface p-10 text-center"><p className="mb-5 text-3xl font-semibold tracking-tighter">brisk.</p><h1 className="text-2xl font-semibold tracking-tight">This proposal is unavailable.</h1><p className="mt-4 text-sm leading-7 text-muted">The link may have expired or been withdrawn. Get in touch with Brisk for an updated proposal.</p><a className="mt-7 inline-block font-medium underline underline-offset-4" href="mailto:info@brisk.be">info@brisk.be</a><p className="mt-7 text-xs text-muted"><Link href="/">Visit brisk.be</Link></p></section></main>;
}
