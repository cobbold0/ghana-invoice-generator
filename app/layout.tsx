import { GoogleAnalytics } from "@next/third-parties/google";
import type { Metadata, Viewport } from "next";
import Link from "next/link";
import { GA_ID } from "@/lib/analytics";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: `Free Invoice Generator for Ghana | ${SITE_NAME}`, template: `%s | ${SITE_NAME}` },
  description: "Create professional invoices in Ghana cedis and download them as PDFs. Free, no account required.",
  applicationName: SITE_NAME,
};

export const viewport: Viewport = { themeColor: "#0f766e" };

const nav = [
  { href: "/invoice-templates", label: "Templates" },
  { href: "/how-to-write-an-invoice", label: "Guides" },
];

const footerLinks = [
  { href: "/invoice-generator", label: "Invoice generator" },
  { href: "/free-invoice-generator", label: "Free invoice generator" },
  { href: "/invoice-templates", label: "Invoice templates" },
  { href: "/invoice-template-ghana", label: "Invoice template for Ghana" },
  { href: "/how-to-write-an-invoice", label: "How to write an invoice" },
  { href: "/invoice-vs-receipt", label: "Invoice vs receipt" },
  { href: "/privacy", label: "Privacy" },
];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-GH">
      <body className="flex min-h-screen flex-col">
        <a href="#main" className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-white focus:px-3 focus:py-2">
          Skip to content
        </a>
        <header className="border-b border-gray-200 print:hidden">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link href="/" className="font-bold text-gray-900">
              <span className="text-brand-700">GH</span> Invoice Generator
            </Link>
            <nav aria-label="Main" className="flex items-center gap-1 text-sm sm:gap-4">
              {nav.map((l) => (
                <Link key={l.href} href={l.href} className="hidden rounded px-2 py-2 text-gray-700 hover:text-gray-900 sm:inline">
                  {l.label}
                </Link>
              ))}
              <Link href="/invoice-generator" className="rounded-md bg-brand-700 px-3 py-2 font-semibold text-white hover:bg-brand-800">
                Create invoice
              </Link>
            </nav>
          </div>
        </header>
        <main id="main" className="flex-1">
          {children}
        </main>
        <footer className="mt-16 border-t border-gray-200 bg-gray-50 print:hidden">
          <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-gray-600">
            <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {footerLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-gray-900 hover:underline">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-6">
              {SITE_NAME} creates invoices only. It is not accounting or tax-filing software. Invoice details stay in your browser.
            </p>
          </div>
        </footer>
      </body>
      {GA_ID && <GoogleAnalytics gaId={GA_ID} />}
    </html>
  );
}
