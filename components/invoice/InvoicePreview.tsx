"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import type { Invoice } from "@/lib/invoice/schema";
import { buildInvoiceView } from "@/lib/invoice/templates";
import { InvoiceLayout, type Primitives } from "./InvoiceLayout";

// A4 is 595 × 842 pt; the preview renders 1px per pt and zooms to fit.
const PAGE_WIDTH = 595;

/** Converts react-pdf shorthand properties that CSS lacks. */
function css(style: Record<string, string | number | undefined> = {}): CSSProperties {
  const { paddingVertical, paddingHorizontal, marginVertical, marginHorizontal, ...rest } = style;
  return {
    ...(paddingVertical !== undefined && { paddingTop: paddingVertical, paddingBottom: paddingVertical }),
    ...(paddingHorizontal !== undefined && { paddingLeft: paddingHorizontal, paddingRight: paddingHorizontal }),
    ...(marginVertical !== undefined && { marginTop: marginVertical, marginBottom: marginVertical }),
    ...(marginHorizontal !== undefined && { marginLeft: marginHorizontal, marginRight: marginHorizontal }),
    ...rest,
  } as CSSProperties;
}

const html: Primitives = {
  View: ({ style, wrap, children }) => (
    <div className="flex flex-col" style={{ ...css(style), ...(wrap === false && { breakInside: "avoid" }) }}>
      {children}
    </div>
  ),
  Text: ({ style, children }) => (
    <div className="whitespace-pre-wrap [overflow-wrap:anywhere]" style={css(style)}>
      {children}
    </div>
  ),
  // eslint-disable-next-line @next/next/no-img-element -- local data URL
  Logo: ({ src, style }) => <img src={src} alt="" style={css(style)} />,
};

export function InvoiceDocument({ invoice }: { invoice: Invoice }) {
  return (
    <div className="invoice-page flex flex-col bg-white text-[#111827]" style={{ width: PAGE_WIDTH, minHeight: 842, padding: "40px 40px 56px", fontSize: 10, lineHeight: "14px" }}>
      <InvoiceLayout view={buildInvoiceView(invoice)} P={html} />
    </div>
  );
}

/** The invoice scaled to the width of its container. */
export function InvoicePreview({ invoice }: { invoice: Invoice }) {
  const ref = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(1);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 0) setZoom(Math.min(1.25, entry.contentRect.width / PAGE_WIDTH));
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full min-w-0 overflow-hidden print:overflow-visible">
      <div className="invoice-zoom shadow-sm ring-1 ring-gray-200 print:shadow-none print:ring-0" style={{ zoom, width: PAGE_WIDTH }}>
        <InvoiceDocument invoice={invoice} />
      </div>
    </div>
  );
}
