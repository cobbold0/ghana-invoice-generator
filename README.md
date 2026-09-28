# Ghana Invoice Generator

A free, no-sign-up invoice generator for freelancers and small businesses in Ghana. Enter your details, add items, preview live, and download an A4 PDF or print it. Invoice data stays in the browser.

## Features

- Invoice editor: business (with optional logo and TIN), customer, invoice number, dates, payment terms, currency, line items, discount, optional taxes/levies, notes, payment instructions
- Exact totals in integer minor units (pesewas), half-up rounding
- Three templates: Modern, Classic, Minimal
- Live preview that uses the same layout code as the PDF
- Client-side PDF download (A4, paginated, repeating table header, page numbers) and browser printing
- Draft auto-saved to `localStorage`; “New” keeps business details and suggests the next invoice number
- SEO pages, metadata, canonical URLs, Open Graph, sitemap and robots
- Optional AdSense slot on content pages only (never in the editor or PDFs)

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command | Purpose |
| --- | --- |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript |
| `npm test` | Vitest unit and PDF tests |
| `npm run build` | Production build |

### Environment variables

Copy `.env.example` to `.env.local`:

- `NEXT_PUBLIC_SITE_URL` — production URL for canonical URLs, Open Graph and the sitemap (defaults to `http://localhost:3000`).
- `NEXT_PUBLIC_ADSENSE_CLIENT`, `NEXT_PUBLIC_ADSENSE_SLOT` — optional. Without them no ad code is loaded.

## Architecture

```
app/                       Pages (all statically rendered), sitemap.ts, robots.ts
components/invoice/
  InvoiceEditor.tsx        Client editor: form, validation display, persistence, export actions
  InvoiceLayout.tsx        Invoice layout written once against View/Text/Logo primitives
  InvoicePreview.tsx       HTML primitives + scaled preview (also used for printing)
components/site/           Content page layout, CTA, AdSlot
lib/invoice/
  schema.ts                Zod schema, types, defaults, invoice numbering
  calculations.ts          Pure money maths (minor units, BigInt products)
  formatting.ts            Currency, date and quantity formatting
  validation.ts            Export validation with per-field messages
  persistence.ts           localStorage draft load/save with corrupt-data handling
  templates.ts             Template themes and the formatted view model
  pdf.tsx                  @react-pdf/renderer document and download helper (lazy-loaded)
public/fonts/              Noto Sans (latin + latin-ext) for GH₵ and Ghanaian letters (Ɛ, Ɔ)
tests/                     Vitest suites
```

### Key decisions

- **One layout, two renderers.** `InvoiceLayout` is rendered with HTML elements for the preview and print, and with `@react-pdf/renderer` for the download. Units are PDF points; the preview renders a 595px page and scales it with CSS `zoom`, so preview and PDF match closely.
- **Client-side PDF.** Invoices are never uploaded. The PDF library is loaded only when “Download PDF” is clicked.
- **Numbers stored as typed strings** and parsed exactly (no floats) — so inputs like `1.` stay editable and `1.005` rounds correctly.
- **Tax is never automatic.** Users add named taxes/levies with their own rates; each applies to the subtotal after discount (not compounded).
- **Rounding:** half-up to the nearest minor unit, once per line, once for the discount and once per tax.
- **Limits:** quantity ≤ 100,000 (3 decimals), unit price ≤ 100,000,000, keeping all totals within safe integers.
- **Fonts:** built-in PDF fonts lack `₵`, `Ɛ` and `Ɔ`, so Noto Sans is embedded (latin-ext as fallback family).

## Privacy

No accounts, no analytics, no server storage. Drafts live in the user's browser; “Delete saved data” below the form removes them.

## Deployment

Any Next.js host works (e.g. Vercel). Set `NEXT_PUBLIC_SITE_URL` before building so the sitemap and canonical URLs use the real domain.
