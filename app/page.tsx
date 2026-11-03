import Link from "next/link";
import { AdSlot } from "@/components/site/AdSlot";
import { AddThis } from "@/components/social/AddThis";
import { pageMetadata, SITE_NAME, SITE_URL } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Free Invoice Generator for Ghana — Create PDF Invoices in Minutes",
  description:
    "Create professional invoices in Ghana cedis (GHS), preview them live and download a PDF. Free, no sign-up, and your invoice data stays in your browser.",
  path: "/",
});

const features = [
  { title: "Free to use", text: "Create, preview, print and download as many invoices as you need. No trial, no watermark, completely free." },
  { title: "No account required", text: "Start typing straight away. There is nothing to sign up for, with zero friction." },
  { title: "Professional templates", text: "Choose Modern, Classic or Minimal. Each one prints cleanly on standard A4." },
  { title: "Instant PDF download", text: "Get an authentic A4 PDF you can send immediately by WhatsApp or email to clients." },
  { title: "Accurate cedi totals", text: "Line totals, item discounts, and optional statutory GRA taxes calculated to the pesewa." },
  { title: "Private by design", text: "Your financial details and customer information stay saved in your browser storage only." },
];

const steps = [
  "Enter your business details, contact information, and your customer's billing address.",
  "Add the deliverables, project milestones, hourly rates or products you are billing for.",
  "Set the issue date, due date, and your preferred payment details (MTN MoMo, Telecel Cash, Bank).",
  "Review the real-time A4 preview, then download your professional PDF invoice or print directly.",
];

const faqs = [
  {
    question: "Is this invoice generator free for Ghanaian businesses and freelancers?",
    answer: "Yes, Ghana Invoice Generator is 100% free with no monthly subscription, hidden fees, or watermarks. You can generate unlimited professional PDF invoices.",
  },
  {
    question: "Can I include Mobile Money payment details on my invoice?",
    answer: "Yes. In the payment instructions section, you can add your MTN Mobile Money merchant or personal number, Telecel Cash, or bank account details with branch codes.",
  },
  {
    question: "Do I have to charge VAT on invoices in Ghana?",
    answer: "Under Ghana Revenue Authority (GRA) regulations, you only charge VAT and statutory levies (such as NHIL and GETFund) if your business is registered for VAT with the GRA. If you are not VAT registered or operate under the threshold, you issue standard non-tax invoices.",
  },
  {
    question: "What information must be included on an invoice in Ghana?",
    answer: "A valid business invoice in Ghana should include: your business name and contact details, your TIN or Ghana Card number, client name and contact, a unique invoice number, date of issue and due date, an itemized description of goods or services, line totals in Ghana Cedis (GHS), and payment instructions.",
  },
  {
    question: "Are my clients' and invoice details uploaded to a server?",
    answer: "No. All invoice generation and PDF compilation occurs entirely client-side in your web browser. Your confidential customer lists and financial numbers are never transmitted to our servers.",
  },
];

export default function HomePage() {
  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.svg`,
      sameAs: ["https://github.com/cobbold0/ghana-invoice-generator"],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: SITE_NAME,
      url: SITE_URL,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Any (web browser)",
      offers: { "@type": "Offer", price: "0", priceCurrency: "GHS" },
      description: "Free online invoice generator for freelancers and small businesses in Ghana.",
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      })),
    },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <section className="bg-gradient-to-b from-brand-50 to-white">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:py-16">
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Create professional invoices in minutes.
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-gray-700">
            A free invoice generator for freelancers, small businesses and contractors in Ghana. Bill in Ghana Cedis (GHS), preview in real-time as you type, and download a clean PDF — no account or sign-up needed.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/invoice-generator" className="rounded-md bg-brand-700 px-6 py-3 text-base font-semibold text-white hover:bg-brand-800 shadow-sm transition">
              Create an invoice now
            </Link>
            <Link href="/invoice-templates" className="rounded-md border border-gray-300 bg-white px-5 py-3 text-base font-semibold text-gray-800 hover:bg-gray-50 transition">
              Explore templates
            </Link>
          </div>
        </div>
      </section>

      {/* Ad Placement: High-visibility top ad below hero */}
      <div className="mx-auto max-w-5xl px-4">
        <AdSlot variant="banner" label="Advertisement" className="my-6" />
      </div>

      {/* Social Sharing */}
      <div className="mx-auto max-w-5xl px-4">
        <AddThis className="my-6" />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-10" aria-labelledby="features">
        <h2 id="features" className="text-2xl font-bold text-gray-900">
          Everything Ghanaian businesses need to get paid faster
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f) => (
            <li key={f.title} className="rounded-lg border border-gray-200 p-5 bg-white shadow-xs">
              <h3 className="font-bold text-gray-900">{f.title}</h3>
              <p className="mt-2 text-sm text-gray-700 leading-relaxed">{f.text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* In-Content Ad */}
      <div className="mx-auto max-w-5xl px-4">
        <AdSlot variant="inline" label="Sponsored Links" className="my-8" />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-10" aria-labelledby="how">
        <h2 id="how" className="text-2xl font-bold text-gray-900">
          How to create an invoice in 4 simple steps
        </h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s} className="rounded-lg bg-gray-50 border border-gray-200/60 p-5">
              <span className="text-sm font-bold text-brand-700">Step {i + 1}</span>
              <p className="mt-2 text-sm text-gray-800">{s}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link href="/invoice-generator" className="inline-block rounded-md bg-brand-700 px-6 py-3 font-semibold text-white hover:bg-brand-800 transition shadow-sm">
            Launch invoice editor
          </Link>
        </div>
      </section>

      {/* In-depth content on Ghanaian Invoicing Best Practices */}
      <section className="mx-auto max-w-5xl px-4 py-10 prose-page">
        <h2 className="text-2xl font-bold text-gray-900">Invoicing Guidelines for Businesses in Ghana</h2>
        <p className="text-gray-700 leading-relaxed">
          Running a business, agency, or freelancing practice in Accra, Kumasi, or across Ghana requires professional billing documentation.
          A clear invoice establishes credibility, speeds up client settlements, and prevents payment disputes.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 not-prose my-6">
          <div className="rounded-lg border border-gray-200 p-5 bg-white">
            <h3 className="font-bold text-gray-900">Mobile Money Billing (MoMo)</h3>
            <p className="mt-2 text-sm text-gray-600">
              Mobile Money is the primary settlement channel for transactions in Ghana. Always list the registered subscriber name alongside your MTN MoMo or Telecel Cash number to allow prompt verification before transfer.
            </p>
          </div>
          <div className="rounded-lg border border-gray-200 p-5 bg-white">
            <h3 className="font-bold text-gray-900">Payment Terms & Due Dates</h3>
            <p className="mt-2 text-sm text-gray-600">
              Specify clear credit terms such as &quot;Payment due upon receipt&quot;, &quot;Net 7&quot;, or &quot;Net 14&quot;. Explicit payment deadlines reduce overdue receivables and maintain healthy cash flow.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="mx-auto max-w-5xl px-4 py-10" aria-labelledby="faq-title">
        <h2 id="faq-title" className="text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <div className="mt-6 space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-lg border border-gray-200 p-5 bg-white">
              <h3 className="font-semibold text-gray-900 text-base">{faq.question}</h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Second In-Content Ad */}
      <div className="mx-auto max-w-5xl px-4">
        <AdSlot variant="inline" label="Advertisement" className="my-8" />
      </div>

      <section className="mx-auto max-w-5xl px-4 py-10" aria-labelledby="guides">
        <h2 id="guides" className="text-2xl font-bold text-gray-900">
          Helpful invoicing resources
        </h2>
        <ul className="mt-6 grid gap-4 sm:grid-cols-3">
          {[
            { href: "/how-to-write-an-invoice", title: "How to write an invoice", text: "What to include, how to number invoices, and setting professional payment terms." },
            { href: "/invoice-template-ghana", title: "Invoice template for Ghana", text: "Ghana Cedi amounts, Mobile Money payment details, and GRA tax notes." },
            { href: "/invoice-vs-receipt", title: "Invoice vs receipt", text: "Understand the key legal and accounting differences between an invoice and a receipt." },
          ].map((g) => (
            <li key={g.href}>
              <Link href={g.href} className="block rounded-lg border border-gray-200 p-5 transition hover:border-brand-500 hover:shadow-xs bg-white">
                <h3 className="font-bold text-gray-900">{g.title}</h3>
                <p className="mt-2 text-sm text-gray-700">{g.text}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
