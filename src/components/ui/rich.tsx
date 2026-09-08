import type { ReactNode } from "react";

/**
 * Tag renderers for next-intl `t.rich()`. Example:
 *   t.rich("title", richTags)  ->  "Websites die <em>bewegen</em>."
 * Available tags: <em> serif italic accent, <amber> accent color, <br> line break,
 * <nowrap> keeps words together, <strong> medium weight.
 */
export const richTags = {
  em: (chunks: ReactNode) => <em>{chunks}</em>,
  amber: (chunks: ReactNode) => <span className="text-amber">{chunks}</span>,
  strong: (chunks: ReactNode) => <strong className="font-medium text-fg">{chunks}</strong>,
  nowrap: (chunks: ReactNode) => <span className="whitespace-nowrap">{chunks}</span>,
  br: () => <br />,
};
