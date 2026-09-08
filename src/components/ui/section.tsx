import type { ReactNode, CSSProperties } from "react";
import { cn } from "@/lib/utils";

/**
 * Page section with theme scoping. `theme="light"` switches the runtime
 * tokens (bg/fg/muted/line) so every child that uses `bg-bg`, `text-fg`,
 * `text-muted`, `border-line` adapts automatically.
 */
export function Section({
  children,
  theme = "dark",
  className,
  innerClassName,
  id,
  padded = true,
  style,
}: {
  children: ReactNode;
  theme?: "dark" | "light";
  className?: string;
  innerClassName?: string;
  id?: string;
  padded?: boolean;
  style?: CSSProperties;
}) {
  return (
    <section
      id={id}
      style={style}
      className={cn(
        "relative bg-bg text-fg",
        theme === "light" ? "theme-light" : "theme-dark",
        padded && "section-y",
        className,
      )}
    >
      <div className={cn("container-x relative", innerClassName)}>{children}</div>
    </section>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("container-x", className)}>{children}</div>;
}
