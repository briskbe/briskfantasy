import { cn } from "@/lib/utils";

/**
 * Line-art drawing of a diesel particulate filter, used inside the illustrative
 * shop screens instead of grey image placeholders. Purely decorative: it draws
 * with `currentColor`, so it adapts to whatever surface it sits on.
 */
export function FilterMark({ className, detail = true }: { className?: string; detail?: boolean }) {
  return (
    <svg
      viewBox="0 0 160 96"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn("h-full w-full", className)}
      aria-hidden
      focusable="false"
    >
      {/* pipes */}
      <path d="M2 42h26v12H2z" opacity={0.5} />
      <path d="M132 42h26v12h-26z" opacity={0.5} />
      {/* cones */}
      <path d="M28 42 44 26v44L28 54z" opacity={0.7} />
      <path d="M116 26l16 16v12l-16 16z" opacity={0.7} />
      {/* body */}
      <rect x={44} y={22} width={72} height={52} rx={6} />
      {detail && (
        <g opacity={0.35}>
          {[52, 60, 68, 76, 84, 92, 100, 108].map((x) => (
            <path key={x} d={`M${x} 28v40`} />
          ))}
          <path d="M46 48h68" />
        </g>
      )}
      {detail && (
        <g opacity={0.6}>
          <path d="M74 22v-8h12v8" />
          <path d="M77 14h6" />
        </g>
      )}
    </svg>
  );
}
