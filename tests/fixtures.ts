import type { Invoice } from "@/lib/invoice/schema";
import { sampleInvoice } from "@/lib/invoice/sample";

export { sampleInvoice };

export function longInvoice(count = 60): Invoice {
  return sampleInvoice({
    items: Array.from({ length: count }, (_, i) => ({
      id: `item-${i}`,
      description:
        i % 5 === 0
          ? `Item ${i + 1}: extended consulting engagement covering discovery workshops, stakeholder interviews, detailed reporting and follow-up support across several regional offices in Accra, Kumasi and Takoradi`
          : `Item ${i + 1}: standard service`,
      quantity: String((i % 4) + 1),
      unitPrice: `${100 + i}.25`,
    })),
    discount: { type: "percent", value: "5" },
    taxes: [{ id: "t", label: "VAT", rate: "15" }],
  });
}
