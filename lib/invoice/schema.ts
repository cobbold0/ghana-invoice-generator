import { z } from "zod";

export const CURRENCIES = ["GHS", "USD", "EUR", "GBP", "NGN"] as const;
export const TEMPLATES = ["modern", "classic", "minimal"] as const;

export const PAYMENT_TERMS = {
  receipt: { label: "Due on receipt", days: 0 },
  net7: { label: "Net 7", days: 7 },
  net14: { label: "Net 14", days: 14 },
  net30: { label: "Net 30", days: 30 },
  custom: { label: "Custom due date", days: null },
} as const;

export type Currency = (typeof CURRENCIES)[number];
export type TemplateId = (typeof TEMPLATES)[number];
export type PaymentTerms = keyof typeof PAYMENT_TERMS;

// Numeric fields are stored as the strings the user typed so inputs stay editable
// ("1." or ""). They are parsed exactly in calculations.ts.
const lineItemSchema = z.object({
  id: z.string(),
  description: z.string(),
  quantity: z.string(),
  unitPrice: z.string(),
});

const taxSchema = z.object({
  id: z.string(),
  label: z.string(),
  rate: z.string(),
});

export const invoiceSchema = z.object({
  version: z.literal(1),
  id: z.string(),
  invoiceNumber: z.string(),
  invoiceDate: z.string(),
  dueDate: z.string(),
  paymentTerms: z.enum(Object.keys(PAYMENT_TERMS) as [PaymentTerms, ...PaymentTerms[]]),
  currency: z.enum(CURRENCIES),
  template: z.enum(TEMPLATES),
  business: z.object({
    name: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
    taxId: z.string(),
    logo: z.string(),
  }),
  customer: z.object({
    name: z.string(),
    address: z.string(),
    email: z.string(),
    phone: z.string(),
  }),
  items: z.array(lineItemSchema),
  discount: z.object({
    type: z.enum(["percent", "fixed"]),
    value: z.string(),
  }),
  taxes: z.array(taxSchema),
  notes: z.string(),
  paymentInstructions: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Invoice = z.infer<typeof invoiceSchema>;
export type LineItem = Invoice["items"][number];
export type Tax = Invoice["taxes"][number];

export const newId = () => crypto.randomUUID();

/** Local calendar date as YYYY-MM-DD. */
export function todayISO(now = new Date()): string {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())}`;
}

export function addDays(iso: string, days: number): string {
  const d = new Date(`${iso}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return iso;
  d.setUTCDate(d.getUTCDate() + days);
  return d.toISOString().slice(0, 10);
}

/** Increments the trailing number, keeping zero padding: INV-0009 → INV-0010. */
export function nextInvoiceNumber(previous: string): string {
  const match = previous.match(/^(.*?)(\d+)(\D*)$/);
  if (!match) return previous ? `${previous}-2` : "INV-0001";
  const [, prefix, digits, suffix] = match;
  return `${prefix}${String(Number(digits) + 1).padStart(digits.length, "0")}${suffix}`;
}

export const emptyItem = (): LineItem => ({ id: newId(), description: "", quantity: "1", unitPrice: "" });

export function createInvoice(overrides: Partial<Invoice> = {}): Invoice {
  const now = new Date();
  const invoiceDate = todayISO(now);
  return {
    version: 1,
    id: newId(),
    invoiceNumber: "INV-0001",
    invoiceDate,
    dueDate: addDays(invoiceDate, PAYMENT_TERMS.net14.days),
    paymentTerms: "net14",
    currency: "GHS",
    template: "modern",
    business: { name: "", address: "", email: "", phone: "", taxId: "", logo: "" },
    customer: { name: "", address: "", email: "", phone: "" },
    items: [emptyItem()],
    discount: { type: "percent", value: "" },
    taxes: [],
    notes: "",
    paymentInstructions: "",
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
    ...overrides,
  };
}

/** Starts a new invoice that keeps the sender's details and settings from the previous one. */
export function nextInvoice(previous: Invoice): Invoice {
  const invoiceDate = todayISO();
  const days = PAYMENT_TERMS[previous.paymentTerms].days;
  return createInvoice({
    ...(days !== null && {
      paymentTerms: previous.paymentTerms,
      dueDate: addDays(invoiceDate, days),
    }),
    invoiceNumber: nextInvoiceNumber(previous.invoiceNumber),
    currency: previous.currency,
    template: previous.template,
    business: previous.business,
    taxes: previous.taxes.map((t) => ({ ...t, id: newId() })),
    paymentInstructions: previous.paymentInstructions,
  });
}
