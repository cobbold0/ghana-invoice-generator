# Ghana Invoice Generator — Product Specification

## Goal

A simple online invoice generator for Ghanaian freelancers and small businesses: **Enter details → Add items → Preview → Download PDF**, without accounting knowledge or a paid subscription.

## Target users

Freelancers, small business owners, contractors, consultants, graphic designers, developers, tradespeople, small agencies, service providers, entrepreneurs.

## Core features

- **Invoice creation:** business name, address, email, phone, optional logo; customer name, address, email; invoice number, invoice date, due date, payment terms, currency, line items, notes, payment instructions. Optional fields stay optional.
- **Line items:** add, edit, remove; description, quantity, unit price, automatic line total.
- **Totals:** subtotal, discount (if any), tax (if configured), total due — updated immediately.
- **Currency:** GHS default; data model ready for more currencies.
- **Invoice number:** sensible editable default, no backend needed.
- **Templates:** several professional, printable templates (e.g. Modern, Classic, Minimal, Business).
- **Preview:** realistic live preview that closely matches the PDF.
- **PDF download:** professional PDF, no account required.
- **Print:** browser printing.
- **Local persistence:** continue after refresh; way to start a new invoice.
- **Responsive:** works on mobile and desktop.

## Homepage

Headline: “Create professional invoices in minutes.” Explain free creation, easy editing, professional templates, PDF download, no account required. Primary CTA: “Create an invoice”.

## Public pages

`/`, `/invoice-generator`, `/free-invoice-generator`, `/invoice-templates`, `/invoice-template-ghana`, `/how-to-write-an-invoice`, `/invoice-vs-receipt`. No empty SEO pages.

## Tax handling

Optional configurable tax. Never auto-apply a Ghanaian rate unless verified for the date and context. Distinguish user-entered tax from statutory calculations.

## Privacy

No registration; keep invoice data in the browser; never send invoice details to analytics.

## Monetization

Free, ad-supported. Possible future premium features: premium templates, multiple saved invoices, branding, history, recurring invoices, payment tracking, client management. Never restrict basic PDF downloads.

## Out of scope

Full accounting, payroll, inventory, banking, payment processing, tax filing, complex CRM, subscription billing.

## Principle

A user should be able to create and download a professional invoice quickly, without creating an account.
