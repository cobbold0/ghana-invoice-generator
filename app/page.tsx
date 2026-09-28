import Link from "next/link";
import { AdSlot } from "@/components/site/AdSlot";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Invoice Generator for Ghana — Create PDF Invoices in Minutes",
  description:
    "Create professional invoices in Ghana cedis (GHS), preview them live and download a PDF. Free, no sign-up, and your invoice data stays in your browser.",
  path: "/",
});

const features = [
  { title: "Free to use", text: "Create, preview, print and download as many invoices as you need. No trial, no watermark." },
  { title: "No account required", text: "Start typing straight away. There is nothing to sign up for." },
  { title: "Professional templates", text: "Choose Modern, Classic or Minimal. Each one prints cleanly on A4." },
  { title: "PDF download", text: "Get a real A4 PDF you can send by email or WhatsApp, with page numbers on longer invoices." },
  { title: "Accurate totals", text: "Line totals, discounts and any taxes you add are calculated to the pesewa." },
  { title: "Private by design", text: "Your invoice is saved in your own browser. It is not uploaded to our servers." },
];

const steps = [
  "Enter your business details and your customer’s details.",
  "Add the items or services you are billing for.",
  "Set the invoice date and payment terms. Add a discount or tax if you need one.",
  "Check the live preview, then download the PDF or print it.",
];

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: SITE_NAME,
    url: SITE_URL,
    applicationCategory: "BusinessApplication",
    operatingSystem: "Any (web browser)",
    offers: { "@type": "Offer", price: "0", priceCurrency: "GHS" },
    description: "Free online invoice generator for freelancers and small businesses in Ghana.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:py-24">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Create professional invoices in minutes.</h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-700">
            A free invoice generator for freelancers, small businesses and contractors in Ghana. Bill in cedis, preview as you type and download a clean PDF — no
            account needed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/invoice-generator" className="rounded-md bg-brand-700 px-5 py-3 text-base font-semibold text-white hover:bg-brand-800">
              Create an invoice
            </Link>
            <Link href="/invoice-templates" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-base font-semibold text-gray-800 hover:bg-gray-50">
              See templates
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="features">
        <h2 id="features" className="text-2xl font-bold text-gray-900">
          Everything you need to get paid
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-gray-700">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="how">
        <h2 id="how" className="text-2xl font-bold text-gray-900">
          How it works
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-lg bg-gray-50 p-5">
              <span className="text-sm font-bold text-brand-700">Step {i + 1}</span>
              <p className="mt-1 text-gray-800">{s}</p>
            </li>
          ))}
        </ol>
        <Link href="/invoice-generator" className="mt-8 inline-block rounded-md bg-brand-700 px-5 py-3 font-semibold text-white hover:bg-brand-800">
          Start your invoice
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-12" aria-labelledby="guides">
        <h2 id="guides" className="text-2xl font-bold text-gray-900">
          Invoicing guides
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { href: "/how-to-write-an-invoice", title: "How to write an invoice", text: "What to include, how to number invoices and set payment terms." },
            { href: "/invoice-template-ghana", title: "Invoice template for Ghana", text: "Cedi amounts, Mobile Money payment details and VAT notes." },
            { href: "/invoice-vs-receipt", title: "Invoice vs receipt", text: "When to send an invoice and when to issue a receipt." },
          ].map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="block h-full rounded-lg border border-gray-200 p-5 hover:border-brand-600">
                <span className="font-bold text-brand-700">{g.title}</span>
                <span className="mt-2 block text-gray-700">{g.text}</span>
              </Link>
            </li>
          ))}
        </ul>
        <AdSlot />
      </section>
    </>
  );
}
