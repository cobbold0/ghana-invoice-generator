import { Document, Font, Image, Page, pdf, Text, View } from "@react-pdf/renderer";
import { InvoiceLayout, type Primitives } from "@/components/invoice/InvoiceLayout";
import type { Invoice } from "./schema";
import { buildInvoiceView } from "./templates";

// Noto Sans covers the cedi sign (₵) and Ghanaian letters such as Ɛ and Ɔ, which the
// built-in PDF fonts lack. The latin-ext files act as a fallback for those glyphs.
const fontDir = typeof window === "undefined" ? `${process.cwd()}/public/fonts/` : "/fonts/";
for (const subset of ["latin", "latin-ext"]) {
  Font.register({
    family: `Noto-${subset}`,
    fonts: [
      { src: `${fontDir}noto-sans-${subset}-400-normal.woff` },
      { src: `${fontDir}noto-sans-${subset}-700-normal.woff`, fontWeight: 700 },
    ],
  });
}
// Break very long words (URLs, emails, account numbers) instead of overflowing.
Font.registerHyphenationCallback((word) => (word.length > 24 ? Array.from(word) : [word]));

const P = { View, Text, Logo: Image } as unknown as Primitives;

export function InvoicePdf({ invoice }: { invoice: Invoice }) {
  const view = buildInvoiceView(invoice);
  const title = `Invoice ${view.invoiceNumber}`.trim();
  return (
    <Document title={title} author={view.businessName} creator="Ghana Invoice Generator" producer="Ghana Invoice Generator">
      <Page
        size="A4"
        style={{ fontFamily: ["Noto-latin", "Noto-latin-ext"], fontSize: 10, color: "#111827", padding: 40, paddingBottom: 56 }}
      >
        {/* lineHeight resolves to a fixed 14pt that children inherit. On Page it hides the page-number text. */}
        <View style={{ fontSize: 10, lineHeight: 1.4 }}>
          <InvoiceLayout view={view} P={P} />
        </View>
        <Text
          fixed
          style={{ position: "absolute", bottom: 24, left: 40, right: 40, fontSize: 8, color: "#6b7280", textAlign: "right" }}
          render={({ pageNumber, totalPages }) => (totalPages > 1 ? `${title} · Page ${pageNumber} of ${totalPages}` : "")}
        />
      </Page>
    </Document>
  );
}

export const renderInvoicePdf = (invoice: Invoice) => pdf(<InvoicePdf invoice={invoice} />).toBlob();

export function pdfFileName(invoice: Invoice) {
  const safe = invoice.invoiceNumber.trim().replace(/[^\w.-]+/g, "-") || "draft";
  return `Invoice-${safe}.pdf`;
}
