import Link from "next/link";
import { InvoiceEditor } from "@/components/invoice/InvoiceEditor";
import { AdSlot } from "@/components/site/AdSlot";
import { AddThis } from "@/components/social/AddThis";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Invoice Generator — Create and Download a PDF Invoice",
  description:
    "Fill in your business, customer and item details, see a live preview and download a professional A4 PDF invoice. Supports GHS, discounts and optional taxes.",
  path: "/invoice-generator",
});

export default function InvoiceGeneratorPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-4">
      <div className="mb-6 print:hidden">
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Invoice Generator</h1>
        <p className="mt-1 text-gray-700">
          Fill in the form, check the real-time preview, then download your professional PDF invoice. Your draft is saved automatically in this browser.
        </p>
      </div>

      <InvoiceEditor />

      {/* Ad Placement: Right after invoice editor / download controls */}
      <AdSlot variant="inline" label="Advertisement" className="my-8" />

      {/* Social Share Bar */}
      <AddThis className="my-6" />

      <section className="prose-page mt-12 max-w-3xl print:hidden" aria-labelledby="tips">
        <h2 id="tips">Tips for Creating Clear Invoices in Ghana</h2>
        <ul>
          <li><strong>Unique Invoice Numbering:</strong> Always assign sequential invoice identifiers (e.g. INV-2026-001) for proper book-keeping and audits.</li>
          <li><strong>Itemised Descriptions:</strong> Specify project milestones, deliverables, quantities, and hourly rates so clients can verify services.</li>
          <li><strong>Mobile Money & Banking Details:</strong> Provide MTN MoMo, Telecel Cash, or bank details clearly in payment instructions for prompt settlement.</li>
          <li><strong>Ghana Revenue Authority (GRA) Tax Compliance:</strong> If your business is VAT-registered, include your TIN/Ghana Card number and standard GRA statutory levies (NHIL, GETFund, COVID-19, VAT).</li>
        </ul>
        <p>
          Need more guidance? Explore <Link href="/how-to-write-an-invoice">how to write an invoice</Link>, browse <Link href="/invoice-templates">invoice templates</Link>, or read the <Link href="/invoice-vs-receipt">difference between an invoice and a receipt</Link>.
        </p>
      </section>

      {/* Second Ad Placement: Below tips */}
      <AdSlot variant="inline" label="Sponsored Links" className="my-8" />
    </div>
  );
}
