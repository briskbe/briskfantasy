"use client";
import { Button } from "@heroui/react";
export default function CmsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <main className="flex min-h-[70dvh] flex-col items-center justify-center gap-5 p-8 text-center"><h1 className="text-2xl font-semibold">We couldn’t load your workspace.</h1><p className="text-sm text-muted">Please try again in a moment.</p><Button onPress={reset}>Try again</Button></main>;
}
