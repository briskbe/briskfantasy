import { CmsError } from "./errors";
import { MAX_CENTS } from "./constants";
import type { QuoteItem } from "./types";

/** Integer arithmetic only; quantity has three decimals and VAT two. */
const round = (numerator: bigint, denominator: bigint) => (numerator + denominator / BigInt(2)) / denominator;

export function quoteTotals(items: QuoteItem[], discountCents: number) {
  const lines = items.map((item) => round(BigInt(item.unitPriceCents) * BigInt(Math.round(item.quantity * 1000)), BigInt(1000)));
  const subtotal = lines.reduce((sum, value) => sum + value, BigInt(0));
  const discount = BigInt(discountCents);
  if (discount > subtotal) throw new CmsError("The discount cannot exceed the subtotal.", 422, { discountCents: "Reduce the discount." });
  // Proportional discount allocation, with largest remainders getting the final
  // cents. This preserves the exact discount even when items have mixed VAT rates.
  const allocations = lines.map((value, index) => ({ index, discount: subtotal ? discount * value / subtotal : BigInt(0), remainder: subtotal ? discount * value % subtotal : BigInt(0) }));
  let remaining = discount - allocations.reduce((sum, item) => sum + item.discount, BigInt(0));
  for (const item of [...allocations].sort((a, b) => a.remainder === b.remainder ? a.index - b.index : a.remainder > b.remainder ? -1 : 1)) {
    if (remaining <= BigInt(0)) break;
    item.discount += BigInt(1);
    remaining -= BigInt(1);
  }
  const vat = items.reduce((sum, item, index) => sum + round((lines[index] - allocations[index].discount) * BigInt(Math.round(item.vatRate * 100)), BigInt(10_000)), BigInt(0));
  const total = subtotal - discount + vat;
  if (subtotal > BigInt(MAX_CENTS) || total > BigInt(MAX_CENTS)) throw new CmsError("The quote total exceeds the supported amount.", 422, { items: "Reduce the quantity or unit prices." });
  return { subtotalCents: Number(subtotal), vatCents: Number(vat), totalCents: Number(total) };
}
