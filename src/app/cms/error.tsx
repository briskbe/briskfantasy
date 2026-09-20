"use client";
import { Button } from "@heroui/react";
export default function CmsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-[70dvh] flex-col items-center justify-center gap-5 p-8 text-center"><h1 className="text-2xl font-semibold">Het portaal kon niet worden geladen.</h1><p className="text-sm text-muted">Probeer het zo meteen opnieuw.</p><Button onPress={reset}>Opnieuw proberen</Button></main>;
}
