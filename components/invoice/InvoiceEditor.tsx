"use client";

import { useEffect, useId, useState, type ChangeEvent, type ReactNode } from "react";
import { track } from "@/lib/analytics";
import { calculateTotals } from "@/lib/invoice/calculations";
import { formatMoney } from "@/lib/invoice/formatting";
import { clearDraft, loadDraft, saveDraft } from "@/lib/invoice/persistence";
import {
  addDays,
  createInvoice,
  CURRENCIES,
  emptyItem,
  newId,
  nextInvoice,
  PAYMENT_TERMS,
  TEMPLATES,
  type Invoice,
  type PaymentTerms,
  type TemplateId,
} from "@/lib/invoice/schema";
import { TEMPLATE_THEMES } from "@/lib/invoice/templates";
import { validateInvoice, type ValidationErrors } from "@/lib/invoice/validation";
import { InvoicePreview } from "./InvoicePreview";

const fieldId = (path: string) => `f-${path.replace(/\./g, "-")}`;
const inputClass =
  "block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 placeholder:text-gray-400 focus:border-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-600/30 aria-[invalid=true]:border-red-600 sm:text-sm";
const buttonClass =
  "inline-flex min-h-10 items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold disabled:opacity-60";
const secondaryButton = `${buttonClass} border border-gray-300 bg-white text-gray-800 hover:bg-gray-50`;

type FieldProps = {
  label: string;
  path: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  hint?: string;
  multiline?: boolean;
  className?: string;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange" | "className">;

function Field({ label, path, value, onChange, error, hint, multiline, className, ...rest }: FieldProps) {
  const id = fieldId(path);
  const describedBy = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ") || undefined;
  const common = {
    id,
    value,
    className: inputClass,
    "aria-invalid": Boolean(error),
    "aria-describedby": describedBy,
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
  };
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1 block text-sm font-medium text-gray-800">
        {label}
      </label>
      {multiline ? (
        <textarea {...common} rows={3} maxLength={rest.maxLength ?? 2000} placeholder={rest.placeholder} />
      ) : (
        <input {...common} {...rest} />
      )}
      {hint && (
        <p id={`${id}-hint`} className="mt-1 text-xs text-gray-500">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1 text-sm text-red-700">
          {error}
        </p>
      )}
    </div>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const id = useId();
  return (
    <section aria-labelledby={id} className="rounded-lg border border-gray-200 bg-white p-4 sm:p-5">
      <h2 id={id} className="mb-4 text-base font-bold text-gray-900">
        {title}
      </h2>
      <div className="grid gap-4">{children}</div>
    </section>
  );
}

/** Resizes an uploaded logo to a small PNG data URL so it fits in local storage and the PDF. */
async function readLogo(file: File): Promise<string> {
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 360 / bitmap.width, 160 / bitmap.height);
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(bitmap.width * scale);
  canvas.height = Math.round(bitmap.height * scale);
  canvas.getContext("2d")!.drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL("image/png");
}

type SaveState = "idle" | "saved" | "failed";

export function InvoiceEditor() {
  const [invoice, setInvoice] = useState<Invoice | null>(null);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [showErrors, setShowErrors] = useState(false);
  const [saveState, setSaveState] = useState<SaveState>("idle");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");

  // Restore the draft on the client only; storage and "today" are browser-specific.
  useEffect(() => {
    const draft = loadDraft() ?? createInvoice();
    const template = new URLSearchParams(window.location.search).get("template");
    if (TEMPLATES.includes(template as TemplateId)) draft.template = template as TemplateId;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time hydration from localStorage
    setInvoice(draft);
  }, []);

  useEffect(() => {
    if (!invoice) return;
    const timer = setTimeout(() => setSaveState(saveDraft(invoice) ? "saved" : "failed"), 400);
    return () => clearTimeout(timer);
  }, [invoice]);

  if (!invoice) {
    return (
      <div role="status" className="rounded-lg border border-gray-200 p-8 text-center text-gray-600">
        Loading your invoice…
      </div>
    );
  }

  const errors: ValidationErrors = showErrors ? validateInvoice(invoice) : {};
  const errorCount = Object.keys(errors).length;
  const totals = calculateTotals(invoice);
  const money = (minor: number) => formatMoney(minor, invoice.currency);

  const update = (patch: Partial<Invoice> | ((inv: Invoice) => Partial<Invoice>)) => {
    track("invoice_started", {}, { once: true });
    setInvoice((inv) => inv && { ...inv, ...(typeof patch === "function" ? patch(inv) : patch), updatedAt: new Date().toISOString() });
  };
  const setBusiness = (key: keyof Invoice["business"]) => (value: string) =>
    update((inv) => ({ business: { ...inv.business, [key]: value } }));
  const setCustomer = (key: keyof Invoice["customer"]) => (value: string) =>
    update((inv) => ({ customer: { ...inv.customer, [key]: value } }));
  const setItem = (index: number, key: "description" | "quantity" | "unitPrice") => (value: string) =>
    update((inv) => ({ items: inv.items.map((item, i) => (i === index ? { ...item, [key]: value } : item)) }));
  const setTax = (index: number, key: "label" | "rate") => (value: string) =>
    update((inv) => ({ taxes: inv.taxes.map((tax, i) => (i === index ? { ...tax, [key]: value } : tax)) }));

  const setInvoiceDate = (invoiceDate: string) =>
    update((inv) => {
      const days = PAYMENT_TERMS[inv.paymentTerms].days;
      return { invoiceDate, ...(days !== null && invoiceDate && { dueDate: addDays(invoiceDate, days) }) };
    });
  const setTerms = (paymentTerms: PaymentTerms) =>
    update((inv) => {
      const days = PAYMENT_TERMS[paymentTerms].days;
      return { paymentTerms, ...(days !== null && { dueDate: addDays(inv.invoiceDate, days) }) };
    });

  async function onLogo(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      setBusiness("logo")(await readLogo(file));
    } catch {
      setMessage("That image could not be read. Try a PNG or JPEG file.");
    }
  }

  /** Validates before export; on failure shows errors and moves focus to the first one. */
  function ready(): boolean {
    const found = validateInvoice(invoice!);
    const first = Object.keys(found)[0];
    if (!first) return true;
    setShowErrors(true);
    setTab("edit");
    setMessage("");
    requestAnimationFrame(() => document.getElementById("error-summary")?.focus());
    return false;
  }

  async function downloadPdf() {
    if (!ready()) return;
    setBusy(true);
    setMessage("");
    try {
      const { renderInvoicePdf, pdfFileName } = await import("@/lib/invoice/pdf");
      const url = URL.createObjectURL(await renderInvoicePdf(invoice!));
      const a = Object.assign(document.createElement("a"), { href: url, download: pdfFileName(invoice!) });
      a.click();
      track("pdf_downloaded", { template: invoice!.template, currency: invoice!.currency, items: invoice!.items.length });
      setTimeout(() => URL.revokeObjectURL(url), 10_000);
    } catch {
      setMessage("Sorry, the PDF could not be created. Please try again, or use Print and choose “Save as PDF”.");
    } finally {
      setBusy(false);
    }
  }

  function print() {
    if (!ready()) return;
    track("invoice_printed", { template: invoice!.template, currency: invoice!.currency });
    window.print();
  }

  function startNew() {
    if (!confirm("Start a new invoice? Customer details and items will be cleared. Your business details are kept.")) return;
    setShowErrors(false);
    setMessage("");
    setInvoice(nextInvoice(invoice!));
    setTab("edit");
  }

  function clearAll() {
    if (!confirm("Delete all invoice data saved in this browser, including your business details and logo?")) return;
    clearDraft();
    setShowErrors(false);
    setInvoice(createInvoice());
  }

  return (
    <div>
      <div className="sticky top-0 z-10 -mx-4 mb-4 border-b border-gray-200 bg-white/95 px-4 py-3 backdrop-blur print:hidden">
        <div className="flex flex-wrap items-center gap-2">
          <div role="tablist" aria-label="Editor view" className="mr-auto flex rounded-md border border-gray-300 p-0.5 lg:hidden">
            {(["edit", "preview"] as const).map((t) => (
              <button
                key={t}
                role="tab"
                aria-selected={tab === t}
                aria-controls={`panel-${t}`}
                onClick={() => setTab(t)}
                className={`min-h-9 rounded px-3 text-sm font-semibold capitalize ${tab === t ? "bg-gray-900 text-white" : "text-gray-700"}`}
              >
                {t}
              </button>
            ))}
          </div>
          <p className="mr-auto hidden text-sm text-gray-600 lg:block" aria-live="polite">
            {saveState === "saved" && "Draft saved in this browser"}
            {saveState === "failed" && <span className="text-red-700">Could not save the draft in this browser</span>}
          </p>
          <button type="button" onClick={startNew} className={secondaryButton}>
            New
          </button>
          <button type="button" onClick={print} className={secondaryButton}>
            Print
          </button>
          <button type="button" onClick={downloadPdf} disabled={busy} className={`${buttonClass} bg-brand-700 text-white hover:bg-brand-800`}>
            {busy ? "Preparing PDF…" : "Download PDF"}
          </button>
        </div>
        {message && (
          <p role="alert" className="mt-2 text-sm text-red-700">
            {message}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div id="panel-edit" className={`${tab === "edit" ? "grid" : "hidden"} content-start gap-4 lg:grid print:hidden`}>
          {errorCount > 0 && (
            <div id="error-summary" tabIndex={-1} role="alert" className="rounded-lg border border-red-300 bg-red-50 p-4 text-sm text-red-800">
              <p className="font-semibold">Please fix {errorCount === 1 ? "1 problem" : `${errorCount} problems`} before downloading:</p>
              <ul className="mt-2 list-disc pl-5">
                {Object.entries(errors).map(([path, msg]) => (
                  <li key={path}>
                    <a href={`#${fieldId(path)}`} className="underline">
                      {msg}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <Section title="Template and currency">
            <fieldset>
              <legend className="mb-2 text-sm font-medium text-gray-800">Template</legend>
              <div className="grid grid-cols-3 gap-2">
                {TEMPLATES.map((t) => (
                  <label
                    key={t}
                    className={`flex min-h-10 cursor-pointer items-center justify-center gap-2 rounded-md border px-2 text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-600 ${
                      invoice.template === t ? "border-brand-700 bg-brand-50 text-brand-800" : "border-gray-300 text-gray-700"
                    }`}
                  >
                    <input
                      type="radio"
                      name="template"
                      value={t}
                      checked={invoice.template === t}
                      onChange={() => {
                        update({ template: t });
                        track("template_selected", { template: t });
                      }}
                      className="sr-only"
                    />
                    <span aria-hidden className="size-3 rounded-full" style={{ background: TEMPLATE_THEMES[t].accent }} />
                    {TEMPLATE_THEMES[t].name}
                  </label>
                ))}
              </div>
            </fieldset>
            <div>
              <label htmlFor="f-currency" className="mb-1 block text-sm font-medium text-gray-800">
                Currency
              </label>
              <select id="f-currency" className={inputClass} value={invoice.currency} onChange={(e) => update({ currency: e.target.value as Invoice["currency"] })}>
                {CURRENCIES.map((c) => (
                  <option key={c} value={c}>
                    {c === "GHS" ? "GHS – Ghana cedi (GH₵)" : c}
                  </option>
                ))}
              </select>
            </div>
          </Section>

          <Section title="Your business">
            <Field label="Business or trading name" path="business.name" value={invoice.business.name} onChange={setBusiness("name")} error={errors["business.name"]} autoComplete="organization" maxLength={120} />
            <Field label="Address (optional)" path="business.address" value={invoice.business.address} onChange={setBusiness("address")} multiline maxLength={300} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone (optional)" path="business.phone" type="tel" value={invoice.business.phone} onChange={setBusiness("phone")} autoComplete="tel" maxLength={40} />
              <Field label="Email (optional)" path="business.email" type="email" value={invoice.business.email} onChange={setBusiness("email")} error={errors["business.email"]} autoComplete="email" maxLength={120} />
            </div>
            <Field label="Tax ID / TIN (optional)" path="business.taxId" value={invoice.business.taxId} onChange={setBusiness("taxId")} maxLength={40} hint="Shown on the invoice if entered." />
            <div>
              <span className="mb-1 block text-sm font-medium text-gray-800">Logo (optional)</span>
              <div className="flex flex-wrap items-center gap-3">
                {invoice.business.logo && (
                  // eslint-disable-next-line @next/next/no-img-element -- local data URL
                  <img src={invoice.business.logo} alt="Your logo" className="h-12 max-w-32 rounded border border-gray-200 object-contain" />
                )}
                <label className={`${secondaryButton} cursor-pointer has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-brand-600`}>
                  {invoice.business.logo ? "Change logo" : "Upload logo"}
                  <input type="file" accept="image/png,image/jpeg,image/webp" onChange={onLogo} className="sr-only" />
                </label>
                {invoice.business.logo && (
                  <button type="button" onClick={() => setBusiness("logo")("")} className="text-sm text-gray-700 underline">
                    Remove
                  </button>
                )}
              </div>
            </div>
          </Section>

          <Section title="Bill to">
            <Field label="Customer name" path="customer.name" value={invoice.customer.name} onChange={setCustomer("name")} error={errors["customer.name"]} maxLength={120} />
            <Field label="Address (optional)" path="customer.address" value={invoice.customer.address} onChange={setCustomer("address")} multiline maxLength={300} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone (optional)" path="customer.phone" type="tel" value={invoice.customer.phone} onChange={setCustomer("phone")} maxLength={40} />
              <Field label="Email (optional)" path="customer.email" type="email" value={invoice.customer.email} onChange={setCustomer("email")} error={errors["customer.email"]} maxLength={120} />
            </div>
          </Section>

          <Section title="Invoice details">
            <Field label="Invoice number" path="invoiceNumber" value={invoice.invoiceNumber} onChange={(v) => update({ invoiceNumber: v })} error={errors.invoiceNumber} maxLength={40} />
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Invoice date" path="invoiceDate" type="date" value={invoice.invoiceDate} onChange={setInvoiceDate} error={errors.invoiceDate} />
              <div>
                <label htmlFor="f-paymentTerms" className="mb-1 block text-sm font-medium text-gray-800">
                  Payment terms
                </label>
                <select id="f-paymentTerms" className={inputClass} value={invoice.paymentTerms} onChange={(e) => setTerms(e.target.value as PaymentTerms)}>
                  {Object.entries(PAYMENT_TERMS).map(([key, t]) => (
                    <option key={key} value={key}>
                      {t.days ? `${t.label} (${t.days} days)` : t.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <Field label="Due date" path="dueDate" type="date" value={invoice.dueDate} onChange={(v) => update({ dueDate: v, paymentTerms: "custom" })} error={errors.dueDate} />
          </Section>

          <Section title="Items">
            {errors.items && <p className="text-sm text-red-700">{errors.items}</p>}
            <ol className="grid gap-4">
              {invoice.items.map((item, i) => (
                <li key={item.id} className="grid gap-3 rounded-md border border-gray-200 bg-gray-50 p-3">
                  <Field label={`Item ${i + 1} description`} path={`items.${i}.description`} value={item.description} onChange={setItem(i, "description")} error={errors[`items.${i}.description`]} multiline maxLength={1000} />
                  <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                    <Field label="Quantity" path={`items.${i}.quantity`} inputMode="decimal" value={item.quantity} onChange={setItem(i, "quantity")} error={errors[`items.${i}.quantity`]} maxLength={12} />
                    <Field label={`Unit price (${invoice.currency})`} path={`items.${i}.unitPrice`} inputMode="decimal" placeholder="0.00" value={item.unitPrice} onChange={setItem(i, "unitPrice")} error={errors[`items.${i}.unitPrice`]} maxLength={16} />
                    <div className="col-span-2 flex items-end justify-between gap-2 sm:col-span-1 sm:flex-col sm:items-end">
                      <p className="text-sm text-gray-600">
                        Amount <span className="block font-semibold text-gray-900">{money(totals.lines[i].totalMinor)}</span>
                      </p>
                      {invoice.items.length > 1 && (
                        <button
                          type="button"
                          onClick={() => update((inv) => ({ items: inv.items.filter((x) => x.id !== item.id) }))}
                          className="min-h-9 text-sm text-red-700 underline"
                          aria-label={`Remove item ${i + 1}`}
                        >
                          Remove
                        </button>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ol>
            <button type="button" onClick={() => update((inv) => ({ items: [...inv.items, emptyItem()] }))} className={secondaryButton}>
              + Add item
            </button>
          </Section>

          <Section title="Discount and tax">
            <div className="grid grid-cols-[minmax(0,1fr)_auto] items-end gap-3">
              <Field
                label="Discount (optional)"
                path="discount.value"
                inputMode="decimal"
                value={invoice.discount.value}
                onChange={(value) => update((inv) => ({ discount: { ...inv.discount, value } }))}
                error={errors["discount.value"]}
                maxLength={16}
              />
              <select
                aria-label="Discount type"
                className={`${inputClass} w-auto`}
                value={invoice.discount.type}
                onChange={(e) => update((inv) => ({ discount: { ...inv.discount, type: e.target.value as "percent" | "fixed" } }))}
              >
                <option value="percent">%</option>
                <option value="fixed">{invoice.currency}</option>
              </select>
            </div>

            <div className="grid gap-3">
              <p className="text-sm text-gray-600">
                No tax is added automatically. If you charge VAT or levies, add each one with the rate that applies to your business. Each rate is applied to the
                subtotal after discount.
              </p>
              {invoice.taxes.map((tax, i) => (
                <div key={tax.id} className="grid grid-cols-[minmax(0,1fr)_7rem_auto] items-end gap-3">
                  <Field label="Tax or levy name" path={`taxes.${i}.label`} placeholder="e.g. VAT" value={tax.label} onChange={setTax(i, "label")} error={errors[`taxes.${i}.label`]} maxLength={40} />
                  <Field label="Rate %" path={`taxes.${i}.rate`} inputMode="decimal" value={tax.rate} onChange={setTax(i, "rate")} error={errors[`taxes.${i}.rate`]} maxLength={6} />
                  <button
                    type="button"
                    onClick={() => update((inv) => ({ taxes: inv.taxes.filter((x) => x.id !== tax.id) }))}
                    className="min-h-10 text-sm text-red-700 underline"
                    aria-label={`Remove ${tax.label || "tax"}`}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={() => update((inv) => ({ taxes: [...inv.taxes, { id: newId(), label: "", rate: "" }] }))} className={secondaryButton}>
                + Add tax or levy
              </button>
            </div>

            <dl className="grid gap-1 border-t border-gray-200 pt-3 text-sm">
              <div className="flex justify-between">
                <dt>Subtotal</dt>
                <dd>{money(totals.subtotalMinor)}</dd>
              </div>
              {totals.discountMinor > 0 && (
                <div className="flex justify-between">
                  <dt>Discount</dt>
                  <dd>−{money(totals.discountMinor)}</dd>
                </div>
              )}
              {totals.taxes.map((t) => (
                <div key={t.id} className="flex justify-between">
                  <dt>
                    {t.label || "Tax"} ({t.rate || 0}%)
                  </dt>
                  <dd>{money(t.amountMinor)}</dd>
                </div>
              ))}
              <div className="flex justify-between text-base font-bold">
                <dt>Total due</dt>
                <dd>{money(totals.totalMinor)}</dd>
              </div>
            </dl>
          </Section>

          <Section title="Payment and notes">
            <Field
              label="Payment instructions (optional)"
              path="paymentInstructions"
              value={invoice.paymentInstructions}
              onChange={(v) => update({ paymentInstructions: v })}
              multiline
              placeholder={"e.g. MTN MoMo: 024 000 0000 (Account name)\nBank: Bank name, account number, branch"}
            />
            <Field label="Notes (optional)" path="notes" value={invoice.notes} onChange={(v) => update({ notes: v })} multiline placeholder="e.g. Thank you for your business." />
          </Section>

          <p className="text-sm text-gray-600">
            Your invoice is saved only in this browser and is never uploaded.{" "}
            <button type="button" onClick={clearAll} className="underline">
              Delete saved data
            </button>
          </p>
        </div>

        <div id="panel-preview" className={`${tab === "preview" ? "block" : "hidden"} lg:block print:block`}>
          <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-auto print:static print:max-h-none print:overflow-visible">
            <p className="mb-2 text-sm text-gray-600 print:hidden">Preview — the PDF uses the same layout on A4 pages.</p>
            <InvoicePreview invoice={invoice} />
          </div>
        </div>
      </div>
    </div>
  );
}
