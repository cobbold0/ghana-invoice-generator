import { describe, expect, it } from "vitest";
import { calculateTotals, lineTotalMinor, parseScaled, toMinor } from "@/lib/invoice/calculations";

const item = (quantity: string, unitPrice: string, id = quantity + unitPrice) => ({ id, description: "x", quantity, unitPrice });
const noDiscount = { type: "percent" as const, value: "" };

describe("parseScaled", () => {
  it("parses decimals exactly", () => {
    expect(toMinor("1234.5")).toBe(123450);
    expect(toMinor("0.1")).toBe(10);
    expect(toMinor(".5")).toBe(50);
    expect(toMinor("5.")).toBe(500);
    expect(toMinor("1,000.25")).toBe(100025);
  });
  it("rounds half up beyond the scale", () => {
    expect(toMinor("1.005")).toBe(101); // 1.005 * 100 in floating point is 100.4999…
    expect(toMinor("1.004")).toBe(100);
    expect(parseScaled("2.0005", 3)).toBe(2001);
  });
  it("rejects invalid input", () => {
    for (const s of ["", " ", ".", "-1", "abc", "1.2.3", "1e5"]) expect(toMinor(s)).toBeNull();
    expect(toMinor("99999999999999999999")).toBeNull();
  });
});

describe("lineTotalMinor", () => {
  it("multiplies quantity by unit price", () => {
    expect(lineTotalMinor("3", "85.50")).toBe(25650);
    expect(lineTotalMinor("0.1", "0.2")).toBe(2); // not 0.020000000000000004
  });
  it("supports fractional quantities with half-up rounding", () => {
    expect(lineTotalMinor("1.5", "33.33")).toBe(5000); // 49.995 → 50.00
    expect(lineTotalMinor("0.333", "10")).toBe(333);
  });
  it("treats invalid or empty values as zero", () => {
    expect(lineTotalMinor("", "10")).toBe(0);
    expect(lineTotalMinor("2", "")).toBe(0);
  });
  it("handles large values without precision loss", () => {
    expect(lineTotalMinor("99999.999", "99999999.99")).toBe(999999989900000);
  });
});

describe("calculateTotals", () => {
  it("returns zeros for an empty invoice", () => {
    const t = calculateTotals({ items: [], discount: noDiscount, taxes: [] });
    expect(t).toMatchObject({ subtotalMinor: 0, discountMinor: 0, totalMinor: 0 });
  });

  it("sums line items", () => {
    const t = calculateTotals({ items: [item("1", "1500"), item("3", "85.50")], discount: noDiscount, taxes: [] });
    expect(t.subtotalMinor).toBe(175650);
    expect(t.totalMinor).toBe(175650);
  });

  it("applies a percentage discount then taxes on the discounted amount", () => {
    const t = calculateTotals({
      items: [item("1", "100")],
      discount: { type: "percent", value: "10" },
      taxes: [
        { id: "a", label: "VAT", rate: "15" },
        { id: "b", label: "Levy", rate: "2.5" },
      ],
    });
    expect(t.discountMinor).toBe(1000);
    expect(t.taxableMinor).toBe(9000);
    expect(t.taxes.map((x) => x.amountMinor)).toEqual([1350, 225]);
    expect(t.totalMinor).toBe(10575);
  });

  it("rounds each discount and tax to the nearest pesewa", () => {
    const t = calculateTotals({
      items: [item("1", "19537.50")],
      discount: { type: "percent", value: "5" },
      taxes: [{ id: "a", label: "VAT", rate: "15" }],
    });
    expect(t.discountMinor).toBe(97688); // 976.875 → 976.88
    expect(t.taxes[0].amountMinor).toBe(278409); // 2784.093 → 2784.09
    expect(t.totalMinor).toBe(2134471);
  });

  it("caps fixed and percentage discounts at the subtotal", () => {
    const items = [item("1", "50")];
    expect(calculateTotals({ items, discount: { type: "fixed", value: "80" }, taxes: [] }).totalMinor).toBe(0);
    expect(calculateTotals({ items, discount: { type: "percent", value: "150" }, taxes: [] }).totalMinor).toBe(0);
    expect(calculateTotals({ items, discount: { type: "fixed", value: "12.34" }, taxes: [] }).totalMinor).toBe(3766);
  });

  it("ignores taxes with invalid rates", () => {
    const t = calculateTotals({ items: [item("1", "10")], discount: noDiscount, taxes: [{ id: "a", label: "X", rate: "abc" }] });
    expect(t.totalMinor).toBe(1000);
  });
});
