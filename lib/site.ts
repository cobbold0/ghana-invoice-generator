import type { Metadata } from "next";

export const SITE_NAME = "Ghana Invoice Generator";
const PRODUCTION_URL = "https://invoicegenerator.cobbold.dev";
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.NODE_ENV === "production" ? PRODUCTION_URL : "http://localhost:3000")
).replace(/\/$/, "");

/** Pages listed in the sitemap, navigation and footer. */
export const PAGES = [
  { path: "/", title: "Home" },
  { path: "/invoice-generator", title: "Invoice generator" },
  { path: "/free-invoice-generator", title: "Free invoice generator" },
  { path: "/invoice-templates", title: "Invoice templates" },
  { path: "/invoice-template-ghana", title: "Invoice template for Ghana" },
  { path: "/how-to-write-an-invoice", title: "How to write an invoice" },
  { path: "/invoice-vs-receipt", title: "Invoice vs receipt" },
  { path: "/sitemap-directory", title: "Sitemap Directory" },
  { path: "/privacy", title: "Privacy" },
] as const;

export function pageMetadata({ title, description, path }: { title: string; description: string; path: string }): Metadata {
  const canonicalUrl = `${SITE_URL}${path === "/" ? "" : path}`;
  const ogImageUrl = `${SITE_URL}/opengraph-image`;

  return {
    title,
    description,
    alternates: { canonical: canonicalUrl },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
      locale: "en_GH",
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${SITE_NAME} - ${title}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImageUrl],
    },
  };
}
