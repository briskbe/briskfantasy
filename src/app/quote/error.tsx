"use client";
import { Button } from "@heroui/react";
export default function QuoteError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-dvh flex-col items-center justify-center gap-5 p-8 text-center"><h1 className="text-2xl font-semibold">De offerte kon niet worden geladen.</h1><p className="text-sm text-muted">Probeer het opnieuw of neem contact op via info@brisk.be.</p><Button onPress={reset}>Opnieuw proberen</Button></main>;
}
