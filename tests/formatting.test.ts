import { describe, expect, it } from "vitest";
import { formatDate, formatMoney, formatQuantity } from "@/lib/invoice/formatting";

describe("formatting", () => {
  it("formats cedis by default style", () => {
    expect(formatMoney(123450, "GHS")).toBe("GH₵1,234.50");
    expect(formatMoney(0, "GHS")).toBe("GH₵0.00");
    expect(formatMoney(5, "GHS")).toBe("GH₵0.05");
  });
  it("formats other currencies", () => {
    expect(formatMoney(100000, "USD")).toBe("$1,000.00");
    expect(formatMoney(100000, "EUR")).toBe("€1,000.00");
    expect(formatMoney(100000, "GBP")).toBe("£1,000.00");
    expect(formatMoney(100000, "NGN")).toBe("₦1,000.00");
  });
  it("formats dates without timezone shifts", () => {
    expect(formatDate("2026-01-01")).toMatch(/^1 Jan 2026$/);
    expect(formatDate("not-a-date")).toBe("");
  });
  it("formats quantities", () => {
    expect(formatQuantity("2.500")).toBe("2.5");
    expect(formatQuantity("1000")).toBe("1,000");
  });
});
