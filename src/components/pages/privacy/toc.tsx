"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface TocItem {
  id: string;
  index: string;
  title: string;
}

/** In-page table of contents; the item whose section is on screen lights up. */
export function Toc({ label, items, className }: { label: string; items: TocItem[]; className?: string }) {
  const [active, setActive] = useState<string>(items[0]?.id ?? "");

  useEffect(() => {
    const els = items.map((i) => document.getElementById(i.id)).filter((el): el is HTMLElement => Boolean(el));
    if (!els.length) return;
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-20% 0px -65% 0px", threshold: 0 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label={label} className={cn("min-w-0 max-w-full", className)}>
      <p className="eyebrow text-muted">{label}</p>
      <ol className="mask-fade-x -mx-5 mt-4 flex gap-x-5 overflow-x-auto px-5 no-scrollbar lg:mx-0 lg:mt-5 lg:flex-col lg:px-0 lg:[mask-image:none]">
        {items.map((item) => {
          const isActive = active === item.id;
          return (
            <li key={item.id} className="shrink-0">
              <a
                href={`#${item.id}`}
                aria-current={isActive ? "true" : undefined}
                className={cn(
                  "group flex min-h-11 items-center gap-3 whitespace-nowrap text-[0.95rem] tracking-[-0.01em] transition-colors duration-300",
                  isActive ? "text-fg" : "text-muted hover:text-fg",
                )}
              >
                <span
                  className={cn(
                    "font-mono text-[0.68rem] tracking-[0.16em] transition-colors duration-300",
                    isActive ? "text-accent" : "text-muted/70",
                  )}
                >
                  {item.index}
                </span>
                <span className="relative">
                  {item.title}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-brand transition-transform duration-500 ease-[var(--ease-out-expo)]",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </span>
              </a>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
