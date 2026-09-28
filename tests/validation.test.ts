import { describe, expect, it } from "vitest";
import { createInvoice } from "@/lib/invoice/schema";
import { validateInvoice } from "@/lib/invoice/validation";
import { sampleInvoice } from "./fixtures";

describe("validateInvoice", () => {
  it("accepts a complete invoice", () => {
    expect(validateInvoice(sampleInvoice())).toEqual({});
  });
  it("requires the essentials on an empty invoice", () => {
    const errors = validateInvoice(createInvoice());
    expect(Object.keys(errors).sort()).toEqual(
      ["business.name", "customer.name", "items.0.description", "items.0.unitPrice"].sort(),
    );
  });
  it("flags invalid values", () => {
    const inv = sampleInvoice({
      dueDate: "2026-08-01",
      discount: { type: "percent", value: "120" },
      taxes: [{ id: "t", label: "", rate: "-5" }],
    });
    inv.business.email = "not-an-email";
    inv.items[0].quantity = "0";
    inv.items[1].unitPrice = "abc";
    const errors = validateInvoice(inv);
    expect(errors).toMatchObject({
      dueDate: expect.stringContaining("before"),
      "discount.value": expect.any(String),
      "taxes.0.label": expect.any(String),
      "taxes.0.rate": expect.any(String),
      "business.email": expect.any(String),
      "items.0.quantity": expect.any(String),
      "items.1.unitPrice": expect.any(String),
    });
  });
  it("requires at least one item", () => {
    expect(validateInvoice(sampleInvoice({ items: [] })).items).toBeDefined();
  });
});
