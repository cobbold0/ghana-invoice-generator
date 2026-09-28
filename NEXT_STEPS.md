# Ghana Invoice Generator — Next Steps

## Owner must do

- Configure the production domain and set `NEXT_PUBLIC_SITE_URL` in the hosting environment (the sitemap, robots and canonical URLs use it; it defaults to `http://localhost:3000`).
- Create the hosting project (e.g. Vercel) and connect this repository.
- Review the three invoice templates and sample PDF output.
- Verify any statutory tax functionality before launch. Currently none is built in: users enter their own tax names and rates. The Ghana page tells VAT-registered users that GRA may require invoices through approved systems (E-VAT) — confirm this wording with an accountant.
- Create a GA4 property and set `NEXT_PUBLIC_GA_ID` (e.g. `G-XXXXXXXXXX`) in the hosting environment, then redeploy. Consider marking `pdf_downloaded` as a key event in GA4.
- Decide whether a cookie-consent banner is needed for GA/AdSense in your target markets (not built; GA loads on every page once configured).
- Apply for Google AdSense when ready, then set `NEXT_PUBLIC_ADSENSE_CLIENT` and `NEXT_PUBLIC_ADSENSE_SLOT`, and add `public/ads.txt`. Keep AdSense **Auto ads off** so ads cannot be injected into the editor.
- Review the privacy page and any legal requirements (e.g. Ghana Data Protection Act, cookie consent for ads).
- Submit the sitemap in Google Search Console after launch.

## Optional improvements

- Invoice history and multiple saved invoices
- Premium templates and business branding (custom accent colour)
- Recurring invoices, payment tracking, client management
- Downloadable reports
- Cloud synchronization (would require accounts and a privacy review)
- Open Graph images for social sharing
- Receipt and quotation modes
- Cookie-consent banner with Google Consent Mode
- Browser end-to-end tests in CI (Playwright)

## Completed

Verified by lint, type-check, 41 unit/PDF tests, production build, and manual browser runs (desktop and 375px mobile) on 2026-09-28:

- Next.js 16 + TypeScript + Tailwind CSS 4 + Zod project setup
- Invoice editor: business (logo, TIN), customer, invoice number, dates, payment terms, currency, repeatable line items, discount, optional taxes/levies, notes, payment instructions
- Exact calculations in minor units with half-up rounding (tested)
- Validation with an error summary and per-field messages; export is blocked until required fields are valid
- Modern, Classic and Minimal templates
- Live preview sharing the PDF layout code
- Client-side A4 PDF download: pagination, repeating table header, page numbers, long-text wrapping, logo, GH₵/Ɛ/Ɔ glyphs (tested short, long 60-item, optional fields omitted, all templates)
- Print support with A4 print styles (checked via Chromium print-to-PDF)
- Local draft persistence with corrupt-data handling, “New” invoice with next number, and “Delete saved data”
- Mobile Edit/Preview tabs; no horizontal scrolling at 375px
- SEO pages: `/`, `/invoice-generator`, `/free-invoice-generator`, `/invoice-templates`, `/invoice-template-ghana`, `/how-to-write-an-invoice`, `/invoice-vs-receipt`, `/privacy`
- Unique titles, descriptions, canonical URLs, Open Graph, one H1 per page, WebApplication JSON-LD, sitemap.xml, robots.txt, internal links
- Optional Google Analytics 4 (`NEXT_PUBLIC_GA_ID`): page views plus anonymous `invoice_started`, `template_selected`, `pdf_downloaded`, `invoice_printed` events carrying only template, currency and item count (verified in browser)
- AdSense-ready ad slot on content pages only, disabled until configured; no ads in the editor or PDFs
