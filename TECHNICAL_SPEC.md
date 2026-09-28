# Ghana Invoice Generator — Technical Specification

## Stack

Next.js, TypeScript, React, Tailwind CSS, Zod. Simple and maintainable.

## Data model

Strongly typed invoice: id, invoiceNumber, invoiceDate, dueDate, currency, business (name, address, email, phone, logo), customer (name, address, email, phone), items[] (id, description, quantity, unitPrice, lineTotal), discount, tax, notes, paymentInstructions, template, createdAt, updatedAt. The schema may evolve.

## Calculation engine

Pure functions separate from React: quantity × unit price, line totals, subtotal, optional discount, optional tax, total. Consistent rounding policy; avoid floating-point errors (integer minor units or decimal strategy). Validate before calculating.

## Tax

Optional and configurable; never silently apply a statutory rate. Verified statutory support would need versioned configuration with effective dates.

## Editor

Sections: business, customer, invoice details, line items, discount and tax, notes and payment instructions. Clear validation errors.

## Templates

Consume the same normalized data; layout separate from editing; at least three; handle long names/details, many items, long descriptions, optional logo and fields.

## PDF generation

Simplest reliable approach that keeps data private and gives consistent output. Test short, long, many items, long descriptions, omitted optional fields, all templates. A4, readable, paginated, not clipped, no ads.

## Persistence

localStorage/IndexedDB: save/restore drafts, handle corrupt or missing data, start new invoice, store only what is needed. No database unless necessary.

## SEO

Unique titles, meta descriptions, canonical URLs, Open Graph, semantic headings, internal links, sitemap, robots. Never index user-specific invoice content.

## Analytics

Anonymous events only (invoice_started, invoice_completed, template_selected, pdf_downloaded). Never send invoice contents or business/customer details.

## Accessibility

Keyboard navigation, visible focus, semantic HTML, labels, accessible validation, touch-friendly controls.

## Performance

Fast loading, mobile first, avoid unnecessary client-side dependencies.

## Deployment

Inexpensive mainstream Next.js hosting. `.env.example` only if env vars are needed. Never commit secrets.
