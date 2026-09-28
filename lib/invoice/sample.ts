import { createInvoice, type Invoice } from "./schema";

/** Example data for the templates page and tests. */

export function sampleInvoice(overrides: Partial<Invoice> = {}): Invoice {
  return createInvoice({
    invoiceNumber: "INV-0042",
    invoiceDate: "2026-09-01",
    dueDate: "2026-09-15",
    business: {
      name: "Ɛnɔ Creative Studio",
      address: "12 Oxford Street\nOsu, Accra",
      email: "hello@enocreative.com.gh",
      phone: "+233 24 000 0000",
      taxId: "C0001234567",
      logo: "",
    },
    customer: { name: "Kumasi Traders Ltd", address: "Adum, Kumasi", email: "accounts@kumasitraders.com", phone: "" },
    items: [
      { id: "a", description: "Logo design", quantity: "1", unitPrice: "1500" },
      { id: "b", description: "Business cards (box of 100)", quantity: "3", unitPrice: "85.50" },
    ],
    paymentInstructions: "MTN MoMo: 024 000 0000 (Ɛnɔ Creative)\nBank: GCB, Acc 1234567890",
    notes: "Thank you for your business.",
    ...overrides,
  });
}
