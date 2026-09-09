"use client";

import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import type { StaticAppPathname } from "@/i18n/routing";
import { cn } from "@/lib/utils";
import { Magnetic } from "./magnetic";

type Variant = "primary" | "secondary" | "ghost" | "inverse";
type Size = "sm" | "md" | "lg";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: Variant;
  size?: Size;
  /** Internal (localized) route. Use `external` for outbound URLs. */
  href?: StaticAppPathname;
  external?: string;
  icon?: "arrow" | "up-right" | "none";
  magnetic?: boolean;
  children: ReactNode;
  className?: string;
}

const base =
  "group relative inline-flex items-center justify-center gap-2.5 rounded-full font-medium tracking-[-0.01em] transition-[transform,background-color,color,border-color,box-shadow] duration-500 ease-[var(--ease-out-expo)] select-none whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary:
    "bg-brand text-ink hover:bg-brand-2 shadow-[0_0_0_0_rgba(255,159,77,0)] hover:shadow-[0_12px_40px_-12px_rgba(255,159,77,0.65)]",
  secondary:
    "bg-transparent text-fg border border-line-2 hover:border-fg/60 hover:bg-fg/5",
  inverse: "bg-fg text-bg hover:bg-fg/90",
  ghost: "bg-transparent text-fg px-0 hover:text-accent",
};

const sizes: Record<Size, string> = {
  sm: "h-10 px-4 text-[0.9rem]",
  md: "h-12 px-6 text-[0.95rem]",
  lg: "h-14 px-7 text-base",
};

function Icon({ icon, variant }: { icon: ButtonProps["icon"]; variant: Variant }) {
  if (icon === "none") return null;
  const cls = cn(
    "size-4 shrink-0 transition-transform duration-500 ease-[var(--ease-out-expo)]",
    icon === "up-right" ? "group-hover:translate-x-0.5 group-hover:-translate-y-0.5" : "group-hover:translate-x-1",
    variant === "ghost" && "size-[1.05em]",
  );
  return icon === "up-right" ? <ArrowUpRight className={cls} /> : <ArrowRight className={cls} />;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  { variant = "primary", size = "md", href, external, icon = "arrow", magnetic = true, className, children, ...rest },
  ref,
) {
  const classes = cn(base, variants[variant], variant !== "ghost" && sizes[size], className);
  const content = (
    <>
      <span className="relative z-10">{children}</span>
      <Icon icon={icon} variant={variant} />
    </>
  );

  let el: ReactNode;
  if (href) {
    el = (
      <Link href={href} className={classes} data-cursor="link">
        {content}
      </Link>
    );
  } else if (external) {
    el = (
      <a href={external} target="_blank" rel="noreferrer noopener" className={classes} data-cursor="link">
        {content}
      </a>
    );
  } else {
    el = (
      <button ref={ref} className={classes} data-cursor="link" {...rest}>
        {content}
      </button>
    );
  }

  if (!magnetic || variant === "ghost") return el;
  return <Magnetic strength={0.35}>{el}</Magnetic>;
});
