"use client";
import { Button } from "@heroui/react";
export default function QuoteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-dvh flex-col items-center justify-center gap-5 p-8 text-center"><h1 className="text-2xl font-semibold">We couldn’t load your proposal.</h1><p className="text-sm text-muted">Please try again or contact info@brisk.be.</p><Button onPress={reset}>Try again</Button></main>;
}
