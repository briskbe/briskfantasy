import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small mono label above headings. `index` renders a leading "01" style number. */
export function Eyebrow({
  children,
  index,
  className,
  tone = "accent",
}: {
  children: ReactNode;
  index?: string | number;
  className?: string;
  tone?: "accent" | "muted" | "fg";
}) {
  return (
    <p
      className={cn(
        "eyebrow inline-flex items-center gap-3",
        tone === "accent" && "text-accent",
        tone === "muted" && "text-muted",
        tone === "fg" && "text-fg",
        className,
      )}
    >
      {index !== undefined ? (
        <span className="text-muted">{typeof index === "number" ? String(index).padStart(2, "0") : index}</span>
      ) : (
        <span className="size-1.5 rounded-full bg-current" aria-hidden />
      )}
      <span>{children}</span>
    </p>
  );
}
