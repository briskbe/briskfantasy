import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * The typographic scale in globals.css (`.text-display`, `.text-h1` … `.text-body`)
 * is registered as a font-size group so tailwind-merge does not drop it when a
 * text colour (`text-fg`, `text-fg/70`, …) is merged in later.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": ["text-display", "text-h1", "text-h2", "text-h3", "text-h4", "text-lead", "text-body"],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
