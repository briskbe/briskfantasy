import type { ReactNode } from "react";
import { Eyebrow } from "@/components/ui/eyebrow";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

/**
 * One intro rule for every section on this page: eyebrow + headline in columns
 * 1–6, lead paragraph in columns 8–12 top-aligned with the headline's first
 * line (the `lg:mt-8` matches the eyebrow height + its bottom margin), and any
 * link 24px under the paragraph.
 */
export function SectionIntro({
  index,
  eyebrow,
  title,
  titleId,
  lead,
  children,
  className,
}: {
  index?: number;
  eyebrow: string;
  title: ReactNode;
  titleId?: string;
  lead: string;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 lg:grid-cols-12 lg:items-start lg:gap-8", className)}>
      <div className="lg:col-span-6">
        <Reveal>
          <Eyebrow index={index}>{eyebrow}</Eyebrow>
        </Reveal>
        <Reveal delay={0.08}>
          <h2 id={titleId} className="text-h2 mt-5 max-w-[15ch] text-balance">
            {title}
          </h2>
        </Reveal>
      </div>
      <Reveal delay={0.16} className="lg:col-span-5 lg:col-start-8 lg:mt-8">
        <p className="text-lead max-w-xl text-muted text-pretty">{lead}</p>
        {children ? <div className="mt-6">{children}</div> : null}
      </Reveal>
    </div>
  );
}
