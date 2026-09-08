import { Link } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

/** Brisk wordmark. The amber period is the brand's one flourish. */
export function Logo({ className, onClick }: { className?: string; onClick?: () => void }) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label="Brisk — home"
      data-cursor="link"
      className={cn("inline-flex items-baseline font-medium tracking-[-0.04em] leading-none", className)}
    >
      <span>Brisk</span>
      <span className="text-amber">.</span>
    </Link>
  );
}
