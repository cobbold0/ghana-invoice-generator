import type { Currency } from "./schema";

const moneyFormatters = new Map<Currency, Intl.NumberFormat>();

/** Formats integer minor units, e.g. 123450 GHS → "GH₵1,234.50". */
export function formatMoney(minor: number, currency: Currency): string {
  let f = moneyFormatters.get(currency);
  if (!f) {
    f = new Intl.NumberFormat("en-GH", { style: "currency", currency, currencyDisplay: "narrowSymbol" });
    moneyFormatters.set(currency, f);
  }
  return f.format(minor / 100);
}

const dateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "short",
  year: "numeric",
  timeZone: "UTC",
});

/** "2026-09-28" → "28 Sep 2026". Returns "" for invalid dates. */
export function formatDate(iso: string): string {
  const d = new Date(`${iso}T00:00:00Z`);
  return Number.isNaN(d.getTime()) ? "" : dateFormatter.format(d);
}

/** Displays a user-typed quantity without trailing zeros: "2.500" → "2.5". */
export function formatQuantity(quantity: string): string {
  const n = Number(quantity.replace(/[,\s]/g, ""));
  return Number.isFinite(n) ? n.toLocaleString("en-GH", { maximumFractionDigits: 3 }) : quantity;
}
