import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Invoices never have their own URLs (drafts live in the browser), so there is nothing private to exclude.
  // Query-string variants of the editor (e.g. ?template=) are covered by its canonical URL.
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE_URL}/sitemap.xml`, host: SITE_URL };
}
