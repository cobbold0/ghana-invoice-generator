import Link from "next/link";
import { ContentPage } from "@/components/site/ContentPage";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Invoice Generator — No Sign-up, No Watermark",
  description:
    "What you get for free: unlimited invoices, three templates, PDF download and printing, GHS and other currencies. No account, no watermark, data stays in your browser.",
  path: "/free-invoice-generator",
});

export default function FreeInvoiceGeneratorPage() {
  return (
    <ContentPage
      title="A free invoice generator with no catches"
      intro={
        <p>
          Many “free” invoice tools ask you to sign up, add a watermark or limit how many invoices you can download. This one doesn’t. You can create and download
          as many invoices as you need, today and later.
        </p>
      }
      related={["/invoice-generator", "/invoice-templates", "/how-to-write-an-invoice"]}
    >
      <h2>What is free</h2>
      <table>
        <thead>
          <tr>
            <th scope="col">Feature</th>
            <th scope="col">Included</th>
          </tr>
        </thead>
        <tbody>
          {[
            ["Creating and editing invoices", "Unlimited"],
            ["PDF download (A4)", "Unlimited, no watermark"],
            ["Printing", "Yes"],
            ["Templates", "Modern, Classic and Minimal"],
            ["Currencies", "GHS (default), USD, EUR, GBP, NGN"],
            ["Discounts and optional taxes", "Yes"],
            ["Your logo", "Yes"],
            ["Account required", "No"],
          ].map(([feature, value]) => (
            <tr key={feature}>
              <td>{feature}</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>How is it free?</h2>
      <p>
        The site may show clearly labelled adverts on guide pages like this one. Adverts never appear in the invoice editor, the preview, or your downloaded PDF
        — your invoices stay clean and professional.
      </p>

      <h2>Your data stays with you</h2>
      <p>
        There is no account, so there is nothing for us to store. Your draft is saved in your own browser so you can close the tab and come back later. The PDF
        is created on your device. See the <Link href="/privacy">privacy page</Link> for details.
      </p>
      <p>
        Because drafts live in your browser, clearing your browsing data or switching devices will remove them. Keep a copy of each PDF you send.
      </p>

      <h2>Who it’s for</h2>
      <p>
        Freelancers, consultants, designers, developers, tradespeople, small agencies and shop owners who need to send a professional invoice quickly. It is not
        accounting software: it does not track payments, file taxes or keep your books.
      </p>
    </ContentPage>
  );
}
