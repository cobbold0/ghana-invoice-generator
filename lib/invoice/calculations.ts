import type { Invoice } from "./schema";

/**
 * Money is calculated in integer minor units (pesewas for GHS) to avoid
 * floating-point errors. Rounding policy: half-up to the nearest minor unit,
 * applied once per line total, once for the discount and once per tax.
 * All supported currencies use 2 decimal places.
 */

const DECIMAL = /^(\d*)(?:\.(\d*))?$/;

/**
 * Parses a non-negative decimal string exactly into an integer scaled by 10^scale,
 * rounding half-up. Thousands separators (commas) and surrounding spaces are ignored.
 * Returns null for empty or invalid input.
 */
export function parseScaled(input: string, scale: number): number | null {
  const s = input.replace(/[,\s]/g, "");
  const m = s.match(DECIMAL);
  if (!s || !m || (m[1] === "" && !m[2])) return null;
  const whole = m[1] || "0";
  const frac = (m[2] ?? "").padEnd(scale + 1, "0");
  let value = Number(whole) * 10 ** scale + Number(frac.slice(0, scale) || "0");
  if (Number(frac[scale]) >= 5) value += 1;
  return Number.isSafeInteger(value) ? value : null;
}

export const toMinor = (amount: string) => parseScaled(amount, 2);
/** Quantities support up to 3 decimals (e.g. 1.5 hours, 0.125 kg). */
export const toQuantityMilli = (quantity: string) => parseScaled(quantity, 3);
/** Percentages in hundredths of a percent: "12.5" → 1250. */
export const toPercentBasis = (rate: string) => parseScaled(rate, 2);

/** Rounds a non-negative BigInt division half-up. */
const divRound = (numerator: bigint, denominator: bigint) =>
  Number((numerator * 2n + denominator) / (denominator * 2n));

export function lineTotalMinor(quantity: string, unitPrice: string): number {
  const q = toQuantityMilli(quantity);
  const p = toMinor(unitPrice);
  if (q === null || p === null) return 0;
  return divRound(BigInt(q) * BigInt(p), 1000n);
}

/** Share of an amount at a percentage given in hundredths of a percent. */
const percentOf = (amountMinor: number, basis: number) => divRound(BigInt(amountMinor) * BigInt(basis), 10000n);

export interface Totals {
  lines: { id: string; totalMinor: number }[];
  subtotalMinor: number;
  discountMinor: number;
  taxableMinor: number;
  taxes: { id: string; label: string; rate: string; amountMinor: number }[];
  totalMinor: number;
}

export function calculateTotals(invoice: Pick<Invoice, "items" | "discount" | "taxes">): Totals {
  const lines = invoice.items.map((item) => ({
    id: item.id,
    totalMinor: lineTotalMinor(item.quantity, item.unitPrice),
  }));
  const subtotalMinor = lines.reduce((sum, l) => sum + l.totalMinor, 0);

  let discountMinor = 0;
  if (invoice.discount.type === "percent") {
    const basis = toPercentBasis(invoice.discount.value);
    if (basis !== null) discountMinor = percentOf(subtotalMinor, Math.min(basis, 10000));
  } else {
    discountMinor = Math.min(toMinor(invoice.discount.value) ?? 0, subtotalMinor);
  }

  const taxableMinor = subtotalMinor - discountMinor;
  // Each tax is applied to the discounted subtotal (not compounded on other taxes).
  const taxes = invoice.taxes.map((tax) => ({
    id: tax.id,
    label: tax.label,
    rate: tax.rate,
    amountMinor: percentOf(taxableMinor, toPercentBasis(tax.rate) ?? 0),
  }));
  const totalMinor = taxableMinor + taxes.reduce((sum, t) => sum + t.amountMinor, 0);

  return { lines, subtotalMinor, discountMinor, taxableMinor, taxes, totalMinor };
}
