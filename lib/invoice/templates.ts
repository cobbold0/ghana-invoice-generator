import { calculateTotals, toMinor } from "./calculations";
import { formatDate, formatMoney, formatQuantity } from "./formatting";
import { PAYMENT_TERMS, type Invoice, type TemplateId } from "./schema";

export interface TemplateTheme {
  name: string;
  description: string;
  accent: string;
  header: "band" | "rule" | "plain";
}

export const TEMPLATE_THEMES: Record<TemplateId, TemplateTheme> = {
  modern: {
    name: "Modern",
    description: "A coloured header block and bold totals. Good for creative and digital work.",
    accent: "#0f766e",
    header: "band",
  },
  classic: {
    name: "Classic",
    description: "A traditional layout with a strong rule and bordered table. Suits established businesses.",
    accent: "#1e3a8a",
    header: "rule",
  },
  minimal: {
    name: "Minimal",
    description: "Black and white with generous spacing. Prints cleanly on any printer.",
    accent: "#111827",
    header: "plain",
  },
};

const lines = (text: string) =>
  text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

/** Everything a template needs, already formatted. Shared by the preview and the PDF. */
export function buildInvoiceView(invoice: Invoice) {
  const totals = calculateTotals(invoice);
  const money = (minor: number) => formatMoney(minor, invoice.currency);
  const { business, customer } = invoice;

  const rows = invoice.items
    .map((item, i) => ({ item, totalMinor: totals.lines[i].totalMinor }))
    .filter(({ item }) => item.description.trim() || item.unitPrice.trim())
    .map(({ item, totalMinor }) => ({
      id: item.id,
      description: item.description.trim(),
      quantity: formatQuantity(item.quantity),
      unitPrice: money(toMinor(item.unitPrice) ?? 0),
      total: money(totalMinor),
    }));

  const summary = [{ label: "Subtotal", value: money(totals.subtotalMinor) }];
  if (totals.discountMinor > 0) {
    const pct = invoice.discount.type === "percent" ? ` (${invoice.discount.value.trim()}%)` : "";
    summary.push({ label: `Discount${pct}`, value: `−${money(totals.discountMinor)}` });
  }
  for (const tax of totals.taxes) {
    summary.push({ label: `${tax.label.trim() || "Tax"} (${tax.rate.trim() || "0"}%)`, value: money(tax.amountMinor) });
  }

  const terms = invoice.paymentTerms === "custom" ? "" : PAYMENT_TERMS[invoice.paymentTerms].label;

  return {
    template: invoice.template,
    theme: TEMPLATE_THEMES[invoice.template],
    logo: business.logo,
    businessName: business.name.trim() || "Your business name",
    businessLines: [
      ...lines(business.address),
      business.phone.trim(),
      business.email.trim(),
      business.taxId.trim() && `TIN: ${business.taxId.trim()}`,
    ].filter(Boolean),
    customerName: customer.name.trim() || "Customer name",
    customerLines: [...lines(customer.address), customer.phone.trim(), customer.email.trim()].filter(Boolean),
    invoiceNumber: invoice.invoiceNumber.trim(),
    meta: [
      { label: "Invoice date", value: formatDate(invoice.invoiceDate) },
      { label: "Due date", value: formatDate(invoice.dueDate) },
      ...(terms ? [{ label: "Terms", value: terms }] : []),
    ],
    rows,
    summary,
    total: money(totals.totalMinor),
    notes: invoice.notes.trim(),
    paymentInstructions: invoice.paymentInstructions.trim(),
  };
}

export type InvoiceView = ReturnType<typeof buildInvoiceView>;
