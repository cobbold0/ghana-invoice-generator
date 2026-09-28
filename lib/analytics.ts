import { sendGAEvent } from "@next/third-parties/google";

export const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

type EventName = "invoice_started" | "template_selected" | "pdf_downloaded" | "invoice_printed";

const sent = new Set<EventName>();

/**
 * Sends an anonymous GA4 event. No-op unless GA is configured.
 * Only pass non-identifying settings (template, currency, counts) — never invoice contents.
 * `once` limits an event to one send per page load.
 */
export function track(name: EventName, params: Record<string, string | number> = {}, { once = false } = {}) {
  if (!GA_ID || (once && sent.has(name))) return;
  sent.add(name);
  sendGAEvent("event", name, params);
}
