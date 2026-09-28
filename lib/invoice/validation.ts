import { z } from "zod";
import { toMinor, toPercentBasis, toQuantityMilli } from "./calculations";
import type { Invoice } from "./schema";

export type ValidationErrors = Record<string, string>;

const MAX_QUANTITY_MILLI = 100_000_000; // 100,000 units
const MAX_PRICE_MINOR = 10_000_000_000; // 100,000,000.00 — keeps totals within safe integers

const email = z.email();
const isDate = (s: string) => /^\d{4}-\d{2}-\d{2}$/.test(s) && !Number.isNaN(Date.parse(s));

/**
 * Checks an invoice is complete enough to export. Keys are field paths
 * (e.g. "items.2.quantity") so the editor can show errors next to fields.
 */
export function validateInvoice(invoice: Invoice): ValidationErrors {
  const errors: ValidationErrors = {};
  const need = (path: string, value: string, message: string) => {
    if (!value.trim()) errors[path] = message;
  };
  const optionalEmail = (path: string, value: string) => {
    if (value.trim() && !email.safeParse(value.trim()).success) errors[path] = "Enter a valid email address.";
  };

  need("business.name", invoice.business.name, "Enter your business or trading name.");
  optionalEmail("business.email", invoice.business.email);
  need("customer.name", invoice.customer.name, "Enter the customer's name.");
  optionalEmail("customer.email", invoice.customer.email);
  need("invoiceNumber", invoice.invoiceNumber, "Enter an invoice number.");

  if (!isDate(invoice.invoiceDate)) errors.invoiceDate = "Enter a valid invoice date.";
  if (!isDate(invoice.dueDate)) errors.dueDate = "Enter a valid due date.";
  else if (isDate(invoice.invoiceDate) && invoice.dueDate < invoice.invoiceDate)
    errors.dueDate = "The due date cannot be before the invoice date.";

  if (invoice.items.length === 0) errors.items = "Add at least one item.";
  invoice.items.forEach((item, i) => {
    need(`items.${i}.description`, item.description, "Describe this item.");
    const q = toQuantityMilli(item.quantity);
    if (q === null || q <= 0 || q > MAX_QUANTITY_MILLI)
      errors[`items.${i}.quantity`] = "Enter a quantity greater than 0 (up to 100,000).";
    const p = toMinor(item.unitPrice);
    if (p === null || p > MAX_PRICE_MINOR) errors[`items.${i}.unitPrice`] = "Enter a price from 0 to 100,000,000.";
  });

  if (invoice.discount.value.trim()) {
    const isPercent = invoice.discount.type === "percent";
    const v = isPercent ? toPercentBasis(invoice.discount.value) : toMinor(invoice.discount.value);
    if (v === null || (isPercent && v > 10000) || (!isPercent && v > MAX_PRICE_MINOR))
      errors["discount.value"] = isPercent ? "Enter a percentage between 0 and 100." : "Enter a valid amount.";
  }

  invoice.taxes.forEach((tax, i) => {
    need(`taxes.${i}.label`, tax.label, "Name this tax or levy.");
    const r = toPercentBasis(tax.rate);
    if (r === null || r > 10000) errors[`taxes.${i}.rate`] = "Enter a rate between 0 and 100.";
  });

  return errors;
}
