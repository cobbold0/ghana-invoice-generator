# Ghana Invoice Generator — Claude Code Instructions

## Mission

Build a production-ready invoice generator for freelancers, small businesses, contractors, and entrepreneurs in Ghana. Users create professional invoices quickly, customize them, and download them as PDFs.

Work autonomously. Read all project context files and inspect the repository before coding. Make sensible, reversible engineering decisions without waiting for approval. Only ask Augustine when an action genuinely requires human involvement (credentials, domain configuration, paid services, legal/business decisions). If blocked by an owner-only action, continue everything else and document it in `NEXT_STEPS.md`.

## Read first

`CLAUDE.md`, `PRODUCT.md`, `TECHNICAL_SPEC.md`, `MONETIZATION.md`, `SEO.md`, `NEXT_STEPS.md`. Inspect the existing repository and preserve useful work.

## Product priorities

1. Fast invoice creation
2. Professional PDF output
3. Accurate totals
4. Excellent mobile usability
5. Simple editing
6. Privacy
7. Reliability
8. SEO
9. Monetization

## User experience

No registration. Core flow: business details → customer details → items → dates and payment terms → preview → download or print the PDF. Keep the interface straightforward: no unnecessary animations, excessive decoration, complicated forms, forced registration or intrusive advertising.

## Financial accuracy

- Calculate line totals, subtotals, discounts, taxes and totals carefully.
- Do not invent or automatically apply Ghanaian tax rates. Tax settings must be configurable and clearly labelled.
- If statutory tax functionality is included, verify the rules and state the applicable date and assumptions.
- Do not present the application as tax-filing or accounting software.

## Privacy

Prefer client-side processing and local persistence. Do not upload invoice contents to external services without clear need and consent. Do not collect unnecessary personal information. Never commit secrets.

## PDF quality

Professional layout, A4, readable typography, correct currency formatting, wrapped long descriptions, multiple items, proper pagination, no clipped content, visible totals. Test short and long invoices.

## Engineering

Prefer Next.js, TypeScript, React, Tailwind CSS, Zod. Keep invoice calculations separate from UI components. Reusable components, clear data model, no overengineering.

## SEO

Useful public pages for invoice creation, templates and business guidance. Metadata, canonical URLs, sitemap, robots, internal linking. Never index private invoice data or user-generated invoice URLs.

## Monetization

Free, ad-supported. Ads must never interfere with editing, previewing, printing or downloading; never resemble invoice controls; never appear in exported PDFs.

## Testing

Line items, quantity × unit price, discounts, tax configuration, rounding, currency formatting, empty invoices, validation, local persistence, PDF export, multi-page invoices. Run lint, type checking, tests and the production build; fix failures before completion.

## Git and documentation

Review the diff, ensure no secrets, commit and push meaningful work. Keep `README.md` and `NEXT_STEPS.md` updated. `NEXT_STEPS.md` has: Owner must do, Optional improvements, Completed (verified work only).

## Definition of done

Invoice editor; business and customer details; repeatable line items; automatic calculations; currency formatting; invoice preview; PDF download; print support; mobile-friendly interface; local persistence; useful SEO pages; sitemap and robots; tests; successful production build; updated documentation. Final review for calculation correctness, PDF quality, mobile usability, accessibility, privacy, performance, SEO and monetization placement.
