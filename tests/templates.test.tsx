import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, it } from "vitest";
import { InvoiceDocument } from "@/components/invoice/InvoicePreview";
import { TEMPLATES } from "@/lib/invoice/schema";
import { buildInvoiceView } from "@/lib/invoice/templates";
import { longInvoice, sampleInvoice } from "./fixtures";

describe("invoice templates", () => {
  it.each(TEMPLATES)("renders the %s template with all invoice details", (template) => {
    const html = renderToStaticMarkup(<InvoiceDocument invoice={sampleInvoice({ template })} />);
    for (const text of ["Ɛnɔ Creative Studio", "Kumasi Traders Ltd", "INV-0042", "Logo design", "GH₵1,756.50", "TIN: C0001234567", "Payment instructions"]) {
      expect(html).toContain(text);
    }
  });

  it("omits empty optional sections", () => {
    const view = buildInvoiceView(sampleInvoice({ notes: "", paymentInstructions: "", taxes: [] }));
    const html = renderToStaticMarkup(<InvoiceDocument invoice={sampleInvoice({ notes: "", paymentInstructions: "" })} />);
    expect(view.summary.map((s) => s.label)).toEqual(["Subtotal"]);
    expect(html).not.toContain("Payment instructions");
    expect(html).not.toContain("Notes");
  });

  it("skips blank item rows and labels discounts and taxes", () => {
    const inv = longInvoice(2);
    inv.items.push({ id: "blank", description: " ", quantity: "1", unitPrice: "" });
    const view = buildInvoiceView(inv);
    expect(view.rows).toHaveLength(2);
    expect(view.summary.map((s) => s.label)).toEqual(["Subtotal", "Discount (5%)", "VAT (15%)"]);
  });

  it("uses custom due dates without a terms label", () => {
    const view = buildInvoiceView(sampleInvoice({ paymentTerms: "custom" }));
    expect(view.meta.map((m) => m.label)).toEqual(["Invoice date", "Due date"]);
  });
});
