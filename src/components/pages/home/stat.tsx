import { cn } from "@/lib/utils";

/**
 * A proof number. Deliberately *not* a count-up: 17 live sites and a 24-hour
 * reply are the claims this page rests on, so the real figure is in the server
 * HTML and on screen from the first frame — no zero for crawlers, screen
 * readers or anyone who scrolls past mid-animation.
 */
export function StatNumber({ value, suffix = "", className }: { value: number; suffix?: string; className?: string }) {
  return (
    <span className={cn("tabular-nums", className)}>
      {value}
      {suffix}
    </span>
  );
}
