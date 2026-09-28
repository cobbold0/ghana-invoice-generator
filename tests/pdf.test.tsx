import { renderToBuffer } from "@react-pdf/renderer";
import { describe, expect, it } from "vitest";
import { InvoicePdf, pdfFileName } from "@/lib/invoice/pdf";
import { TEMPLATES } from "@/lib/invoice/schema";
import { longInvoice, sampleInvoice } from "./fixtures";

const pageCount = (buf: Buffer) => buf.toString("latin1").match(/\/Type\s*\/Page\b(?!s)/g)?.length ?? 0;

describe("PDF export", () => {
  it.each(TEMPLATES)("renders a one-page A4 PDF with the %s template", async (template) => {
    const buf = await renderToBuffer(<InvoicePdf invoice={sampleInvoice({ template })} />);
    const text = buf.toString("latin1");
    expect(text.startsWith("%PDF-")).toBe(true);
    expect(text).toMatch(/\/MediaBox \[0 0 595\.2\d* 841\.8\d*\]/);
    expect(pageCount(buf)).toBe(1);
    if (process.env.PDF_OUT) (await import("node:fs")).writeFileSync(`${process.env.PDF_OUT}/short-${template}.pdf`, buf);
  });

  it("paginates long invoices", async () => {
    const buf = await renderToBuffer(<InvoicePdf invoice={longInvoice()} />);
    expect(pageCount(buf)).toBeGreaterThan(1);
    if (process.env.PDF_OUT) (await import("node:fs")).writeFileSync(`${process.env.PDF_OUT}/long.pdf`, buf);
  });

  it("renders with optional fields omitted", async () => {
    const invoice = sampleInvoice({ notes: "", paymentInstructions: "", taxes: [] });
    invoice.business = { name: "A", address: "", email: "", phone: "", taxId: "", logo: "" };
    invoice.customer = { name: "B", address: "", email: "", phone: "" };
    const buf = await renderToBuffer(<InvoicePdf invoice={invoice} />);
    expect(pageCount(buf)).toBe(1);
  });

  it("builds a safe file name", () => {
    expect(pdfFileName(sampleInvoice({ invoiceNumber: "INV/2026 01" }))).toBe("Invoice-INV-2026-01.pdf");
    expect(pdfFileName(sampleInvoice({ invoiceNumber: " " }))).toBe("Invoice-draft.pdf");
  });
});
