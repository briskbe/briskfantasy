/**
 * Row planning for the two grids on the Referenties page.
 *
 * Both the live-website grid and the product-design gallery use a 12-column
 * editorial rhythm instead of a uniform 3-up repeat: rows alternate between
 * three and two tiles, so scale changes as you scroll. Every row is *complete*
 * (its spans always add up to 12), which is what keeps the gallery from
 * trailing off into a ragged masonry edge.
 */

/** Row sizes for `n` tiles, alternating 3 / 2 and never leaving a single orphan. */
export function planRows(n: number, startBig = true): number[] {
  const rows: number[] = [];
  let left = n;
  let big = startBig;
  while (left > 0) {
    let size = big ? 3 : 2;
    if (size > left) size = left;
    // An orphan row of one would leave a dead column: widen this row instead.
    if (left - size === 1) size = Math.min(left, size + 1);
    rows.push(size);
    left -= size;
    big = !big;
  }
  return rows;
}

/** Tailwind column span for a tile that sits in a row of `size` tiles. */
export function spanClass(size: number): string {
  switch (size) {
    case 4:
      return "lg:col-span-3";
    case 3:
      return "lg:col-span-4";
    case 2:
      return "lg:col-span-6";
    default:
      return "lg:col-span-12";
  }
}

/** Flattens a row plan into a per-tile row size, e.g. [3,2] -> [3,3,3,2,2]. */
export function flattenRows(rows: number[]): number[] {
  const out: number[] = [];
  for (const size of rows) for (let i = 0; i < size; i += 1) out.push(size);
  return out;
}
