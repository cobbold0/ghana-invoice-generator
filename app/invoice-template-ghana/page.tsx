import Link from "next/link";
import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Invoice Template for Ghana — Cedis, MoMo and VAT Notes",
  description:
    "An invoice template set up for Ghana: amounts in Ghana cedis (GH₵), space for Mobile Money and bank details, your TIN, and configurable VAT or levies.",
  path: "/invoice-template-ghana",
});

export default function InvoiceTemplateGhanaPage() {
  return (
    <ContentPage
      title="Invoice template for Ghana"
      intro={
        <p>
          Our invoice generator is set up for businesses in Ghana. Amounts are shown in Ghana cedis by default, there is room for Mobile Money and bank details,
          and you can add your TIN. Fill it in online and download a PDF.
        </p>
      }
      related={["/invoice-generator", "/invoice-templates", "/how-to-write-an-invoice", "/invoice-vs-receipt"]}
    >
      <h2>Amounts in Ghana cedis</h2>
      <p>
        The default currency is the Ghana cedi (GHS), shown with the GH₵ symbol and two decimal places — for example GH₵1,250.00. Totals are calculated in
        pesewas, so they add up exactly. If you bill an international client, you can switch the invoice to USD, EUR, GBP or NGN.
      </p>

      <h2>Mobile Money and bank details</h2>
      <p>Tell your customer exactly how to pay in the payment instructions box. For example:</p>
      <ul>
        <li>Mobile Money number, network and the name on the account</li>
        <li>Bank name, account name, account number and branch</li>
        <li>What reference to use — usually the invoice number</li>
      </ul>

      <h2>Your TIN</h2>
      <p>
        If you have a Taxpayer Identification Number (TIN), you can add it in the business details and it will appear under your contact details. It is
        optional.
      </p>

      <h2>VAT and levies</h2>
      <p>
        The generator never adds tax automatically. If your business charges VAT or other levies, add each one with its name and rate. Each rate is applied to
        the subtotal after any discount, and each amount is shown on its own line.
      </p>
      <p>
        Tax rates and rules in Ghana change, and which ones apply depends on your business. Check the current rates with the{" "}
        <a href="https://gra.gov.gh" rel="noopener noreferrer" target="_blank">
          Ghana Revenue Authority (GRA)
        </a>{" "}
        or an accountant before adding them.
      </p>
      <p>
        <strong>Important:</strong> if your business is VAT-registered, GRA may require VAT invoices to be issued through its approved systems (such as E-VAT).
        Invoices from this generator are commercial invoices for requesting payment; they are not official GRA VAT invoices.
      </p>

      <h2>What to put on the invoice</h2>
      <p>
        At a minimum: your business name and contact details, the customer’s name, a unique invoice number, the invoice date, what you are billing for, the
        total and when payment is due. Our guide on <Link href="/how-to-write-an-invoice">how to write an invoice</Link> goes through each part.
      </p>
    </ContentPage>
  );
}
