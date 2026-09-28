import Link from "next/link";
import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "How to Write an Invoice — A Step-by-Step Guide",
  description:
    "What an invoice should contain, how to number invoices, how to set payment terms and how to send a PDF invoice. A practical guide for freelancers and small businesses.",
  path: "/how-to-write-an-invoice",
});

export default function HowToWriteAnInvoicePage() {
  return (
    <ContentPage
      title="How to write an invoice"
      intro={
        <p>
          An invoice is a request for payment. A clear invoice tells your customer what they are paying for, how much, by when and how — which means fewer
          questions and faster payment. Here is what to include and how to put it together.
        </p>
      }
      related={["/invoice-generator", "/invoice-templates", "/invoice-template-ghana", "/invoice-vs-receipt"]}
    >
      <h2>What an invoice should contain</h2>
      <ol>
        <li>
          <strong>The word “Invoice”</strong> so it is not mistaken for a quote or receipt.
        </li>
        <li>
          <strong>Your business details:</strong> name, address, phone and email. Add your logo and TIN if you have them.
        </li>
        <li>
          <strong>Your customer’s details:</strong> the person or company paying, and their address or email.
        </li>
        <li>
          <strong>A unique invoice number</strong> so you and your customer can refer to it.
        </li>
        <li>
          <strong>The invoice date and due date.</strong>
        </li>
        <li>
          <strong>A list of items or services,</strong> each with a description, quantity, unit price and amount.
        </li>
        <li>
          <strong>The totals:</strong> subtotal, any discount, any taxes that apply to you, and the total due.
        </li>
        <li>
          <strong>Payment instructions:</strong> how to pay you, such as Mobile Money or bank details.
        </li>
      </ol>

      <h2>Step by step</h2>
      <h3>1. Add your details and your customer’s</h3>
      <p>Use your registered or trading name exactly as your customer knows you. For company customers, ask who should receive invoices.</p>

      <h3>2. Number the invoice</h3>
      <p>
        Use a simple sequence that never repeats, such as INV-0001, INV-0002, INV-0003. Some businesses include the year, like 2026-001. Whatever you choose,
        keep it consistent and don’t reuse numbers — it makes your records much easier to follow.
      </p>

      <h3>3. Describe what you are billing for</h3>
      <p>
        Be specific. “Website design — home, about and contact pages (June)” is clearer than “Web work”. For time-based work, put hours in the quantity and your
        hourly rate in the unit price.
      </p>

      <h3>4. Set payment terms</h3>
      <p>Payment terms tell the customer how long they have to pay. Common options are:</p>
      <ul>
        <li>
          <strong>Due on receipt</strong> — payment is expected immediately.
        </li>
        <li>
          <strong>Net 7 / Net 14 / Net 30</strong> — payment is due 7, 14 or 30 days after the invoice date.
        </li>
      </ul>
      <p>Agree the terms with your customer before you start the work, and show the due date on the invoice.</p>

      <h3>5. Add discounts and taxes only if they apply</h3>
      <p>
        If you offered a discount, show it as its own line so the customer can see it. Only add VAT or other taxes if your business is required to charge them —
        check with the tax authority or an accountant if you are unsure. See our <Link href="/invoice-template-ghana">notes for Ghana</Link>.
      </p>

      <h3>6. Explain how to pay</h3>
      <p>Include your Mobile Money or bank details and ask the customer to use the invoice number as the payment reference.</p>

      <h3>7. Send it as a PDF</h3>
      <p>
        A PDF looks the same on every phone and computer and can’t be edited by accident. Download the PDF, then attach it to an email or send it on WhatsApp
        with a short message: the invoice number, the total and the due date. Keep a copy for your records.
      </p>

      <h2>After you send it</h2>
      <p>
        If the due date passes, send a polite reminder that quotes the invoice number and amount. When you are paid, you can give the customer a receipt — see{" "}
        <Link href="/invoice-vs-receipt">invoice vs receipt</Link>.
      </p>
    </ContentPage>
  );
}
