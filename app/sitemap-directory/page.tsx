import Link from "next/link";
import { PAGES, pageMetadata } from "@/lib/site";

export const metadata = pageMetadata({
  title: "Sitemap Directory — Ghana Invoice Generator",
  description: "Browse all invoicing tools, Ghana invoice templates, business guides, and PDF resources.",
  path: "/sitemap-directory",
});

export default function SitemapDirectoryPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Site Directory & Sitemap</h1>
        <p className="mt-2 text-gray-600">
          Complete index of all invoicing tools, downloadable invoice templates, and billing guides for Ghanaian businesses.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2">
        {PAGES.map((page) => (
          <Link
            key={page.path}
            href={page.path}
            className="flex flex-col justify-between rounded-lg border border-gray-200 bg-white p-5 transition hover:border-brand-500 hover:shadow-xs"
          >
            <span className="font-semibold text-gray-900">{page.title}</span>
            <span className="text-xs text-gray-500 mt-1">{page.path}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
