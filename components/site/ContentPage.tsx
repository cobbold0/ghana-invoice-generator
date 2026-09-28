import Link from "next/link";
import type { ReactNode } from "react";
import { PAGES } from "@/lib/site";
import { AdSlot } from "./AdSlot";

export function CreateInvoiceCta({ text = "Create your invoice now — free, no account needed." }: { text?: string }) {
  return (
    <div className="my-10 flex flex-col items-start gap-3 rounded-lg bg-brand-50 p-5 sm:flex-row sm:items-center sm:justify-between">
      <p className="font-semibold text-gray-900">{text}</p>
      <Link href="/invoice-generator" className="shrink-0 rounded-md bg-brand-700 px-4 py-2.5 font-semibold !text-white !no-underline hover:bg-brand-800">
        Create an invoice
      </Link>
    </div>
  );
}

/** Layout for guides and landing pages: one H1, content, a call to action, related links and an ad below the content. */
export function ContentPage({ title, intro, related, children }: { title: string; intro: ReactNode; related: string[]; children: ReactNode }) {
  const links = PAGES.filter((p) => related.includes(p.path));
  return (
    <article className="prose-page mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h1>
      <div className="text-lg">{intro}</div>
      {children}
      <CreateInvoiceCta />
      <nav aria-label="Related pages">
        <h2>Related</h2>
        <ul>
          {links.map((l) => (
            <li key={l.path}>
              <Link href={l.path}>{l.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
      <AdSlot />
    </article>
  );
}
