import type { Metadata } from "next";

export const SITE_NAME = "Ghana Invoice Generator";
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000").replace(/\/$/, "");

/** Pages listed in the sitemap, navigation and footer. */
export const PAGES = [
  { path: "/", title: "Home" },
  { path: "/invoice-generator", title: "Invoice generator" },
  { path: "/free-invoice-generator", title: "Free invoice generator" },
  { path: "/invoice-templates", title: "Invoice templates" },
  { path: "/invoice-template-ghana", title: "Invoice template for Ghana" },
  { path: "/how-to-write-an-invoice", title: "How to write an invoice" },
  { path: "/invoice-vs-receipt", title: "Invoice vs receipt" },
  { path: "/privacy", title: "Privacy" },
] as const;

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: { title, description, url: path, siteName: SITE_NAME, type: "website", locale: "en_GH" },
    twitter: { card: "summary", title, description },
  };
}
