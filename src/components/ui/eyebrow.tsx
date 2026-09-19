import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Plain section label above a heading. */
export function Eyebrow({
  children,
  className,
  tone = "accent",
}: {
  children: ReactNode;
  className?: string;
  tone?: "accent" | "muted" | "fg";
}) {
  return (
    <p
      className={cn(
        "eyebrow",
        tone === "accent" && "text-accent",
        tone === "muted" && "text-muted",
        tone === "fg" && "text-fg",
        className,
      )}
    >
      {children}
    </p>
  );
}
