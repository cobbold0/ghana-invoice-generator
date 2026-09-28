import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Invoice vs Receipt — What’s the Difference?",
  description:
    "An invoice asks for payment; a receipt confirms payment was received. Learn when to use each, what each should include and how they work together.",
  path: "/invoice-vs-receipt",
});

export default function InvoiceVsReceiptPage() {
  return (
    <ContentPage
      title="Invoice vs receipt: what’s the difference?"
      intro={
        <p>
          In short: an <strong>invoice</strong> is sent <em>before</em> payment to ask for it. A <strong>receipt</strong> is given <em>after</em> payment to
          confirm it was received. Many transactions use both.
        </p>
      }
      related={["/how-to-write-an-invoice", "/invoice-generator", "/invoice-templates"]}
    >
      <h2>Side by side</h2>
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Invoice</th>
            <th scope="col">Receipt</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">Purpose</th>
            <td>Requests payment</td>
            <td>Confirms payment</td>
          </tr>
          <tr>
            <th scope="row">When</th>
            <td>After delivering goods or services (or before, for deposits)</td>
            <td>When payment is received</td>
          </tr>
          <tr>
            <th scope="row">Shows</th>
            <td>Amount due, due date, how to pay</td>
            <td>Amount paid, date paid, payment method</td>
          </tr>
          <tr>
            <th scope="row">Customer’s next step</th>
            <td>Pay by the due date</td>
            <td>Keep it as proof of payment</td>
          </tr>
        </tbody>
      </table>

      <h2>When to send an invoice</h2>
      <p>
        Send an invoice when a customer will pay later — for example a company that pays suppliers by bank transfer, or a client who pays after a project is
        delivered. The invoice gives them the information they need to approve and make the payment.
      </p>

      <h2>When to give a receipt</h2>
      <p>
        Give a receipt once you have been paid, whether in cash, by Mobile Money or by bank transfer. For an invoice that has been paid, the receipt should refer
        to the invoice number so both records match.
      </p>

      <h2>What about a quotation or pro forma invoice?</h2>
      <p>
        A quotation (or estimate) is sent before work starts to say what it will cost. A pro forma invoice is a preliminary invoice, often used so a customer can
        arrange payment or approvals in advance. Neither replaces the final invoice.
      </p>

      <h2>Can one document be both?</h2>
      <p>
        For immediate payments, such as in a shop, a single receipt is usually enough. For work paid later, send an invoice first, then confirm payment with a
        receipt. Tax rules for VAT-registered businesses can be stricter, so check the requirements that apply to you.
      </p>
    </ContentPage>
  );
}
