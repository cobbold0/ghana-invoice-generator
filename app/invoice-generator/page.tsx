import Link from "next/link";
import { InvoiceEditor } from "@/components/invoice/InvoiceEditor";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Invoice Generator — Create and Download a PDF Invoice",
  description:
    "Fill in your business, customer and item details, see a live preview and download a professional A4 PDF invoice. Supports GHS, discounts and optional taxes.",
  path: "/invoice-generator",
});

export default function InvoiceGeneratorPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="mb-4 print:hidden">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Invoice generator</h1>
        <p className="mt-1 text-gray-700">Fill in the form, check the preview, then download your PDF. Your draft is saved automatically in this browser.</p>
      </div>

      <InvoiceEditor />

      <section className="prose-page mt-16 max-w-3xl print:hidden" aria-labelledby="tips">
        <h2 id="tips">Tips for a clear invoice</h2>
        <ul>
          <li>Use a unique invoice number for every invoice. The next number is suggested when you click “New”.</li>
          <li>Describe each item so your customer can match it to what they ordered — dates, quantities and deliverables help.</li>
          <li>Put your Mobile Money or bank details under payment instructions so the customer knows exactly how to pay.</li>
          <li>Only add VAT or levies if they apply to your business. The generator never adds tax automatically.</li>
        </ul>
        <p>
          New to invoicing? Read <Link href="/how-to-write-an-invoice">how to write an invoice</Link> or compare the <Link href="/invoice-templates">invoice templates</Link>.
        </p>
      </section>
    </div>
  );
}
