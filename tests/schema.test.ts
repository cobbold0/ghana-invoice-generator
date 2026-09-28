import { describe, expect, it } from "vitest";
import { addDays, createInvoice, nextInvoice, nextInvoiceNumber, todayISO } from "@/lib/invoice/schema";
import { sampleInvoice } from "./fixtures";

describe("invoice defaults", () => {
  it("creates a GHS invoice due in 14 days with one empty item", () => {
    const inv = createInvoice();
    expect(inv.currency).toBe("GHS");
    expect(inv.items).toHaveLength(1);
    expect(inv.taxes).toEqual([]); // no tax is applied automatically
    expect(inv.dueDate).toBe(addDays(inv.invoiceDate, 14));
  });
  it("increments invoice numbers preserving padding", () => {
    expect(nextInvoiceNumber("INV-0009")).toBe("INV-0010");
    expect(nextInvoiceNumber("2026/15-A")).toBe("2026/16-A");
    expect(nextInvoiceNumber("ABC")).toBe("ABC-2");
    expect(nextInvoiceNumber("")).toBe("INV-0001");
  });
  it("adds days across month ends", () => {
    expect(addDays("2026-01-25", 14)).toBe("2026-02-08");
    expect(todayISO(new Date(2026, 8, 5))).toBe("2026-09-05");
  });
  it("starts the next invoice keeping business details only", () => {
    const next = nextInvoice(sampleInvoice());
    expect(next.invoiceNumber).toBe("INV-0043");
    expect(next.business.name).toBe("Ɛnɔ Creative Studio");
    expect(next.customer.name).toBe("");
    expect(next.items).toHaveLength(1);
    expect(next.items[0].description).toBe("");
  });
});
