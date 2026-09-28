import Link from "next/link";
import { InvoicePreview } from "@/components/invoice/InvoicePreview";
import { ContentPage } from "@/components/site/ContentPage";
import { sampleInvoice } from "@/lib/invoice/sample";
import { TEMPLATES } from "@/lib/invoice/schema";
import { TEMPLATE_THEMES } from "@/lib/invoice/templates";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Invoice Templates — Modern, Classic and Minimal",
  description:
    "Compare three free, printable A4 invoice templates. Pick one, fill in your details online and download it as a PDF. No Word or Excel needed.",
  path: "/invoice-templates",
});

export default function InvoiceTemplatesPage() {
  return (
    <ContentPage
      title="Free invoice templates"
      intro={
        <p>
          Every template uses the same information — only the look changes — so you can switch at any time without retyping. All three are designed for A4
          paper, print well in black and white, and are free to download as PDF.
        </p>
      }
      related={["/invoice-template-ghana", "/how-to-write-an-invoice", "/free-invoice-generator"]}
    >
      <div className="mt-8 grid grid-cols-1 gap-10">
        {TEMPLATES.map((id) => {
          const theme = TEMPLATE_THEMES[id];
          return (
            <section key={id} aria-labelledby={`t-${id}`} className="grid grid-cols-1 gap-4 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] sm:items-start">
              <div>
                <h2 id={`t-${id}`} className="!mt-0">
                  {theme.name}
                </h2>
                <p>{theme.description}</p>
                <Link href={`/invoice-generator?template=${id}`} className="inline-block rounded-md bg-brand-700 px-4 py-2 !text-white !no-underline hover:bg-brand-800">
                  Use the {theme.name} template
                </Link>
              </div>
              <div aria-hidden className="pointer-events-none select-none">
                <InvoicePreview invoice={sampleInvoice({ template: id })} />
              </div>
            </section>
          );
        })}
      </div>

      <h2>Which template should I choose?</h2>
      <ul>
        <li>
          <strong>Modern</strong> stands out on screen, which suits invoices sent by email or WhatsApp.
        </li>
        <li>
          <strong>Classic</strong> looks formal and familiar to accounts departments at larger companies.
        </li>
        <li>
          <strong>Minimal</strong> uses no colour, so it prints sharply and saves ink.
        </li>
      </ul>
      <p>
        Whichever you choose, make sure the invoice includes the details your customer needs to pay you. Our guide on{" "}
        <Link href="/how-to-write-an-invoice">how to write an invoice</Link> lists them.
      </p>
    </ContentPage>
  );
}
