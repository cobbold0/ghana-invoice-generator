"use client";

import Script from "next/script";
import { useEffect } from "react";

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const slot = process.env.NEXT_PUBLIC_ADSENSE_SLOT;

/**
 * A clearly labelled ad unit for content pages only. Renders nothing until AdSense
 * is configured. Never place this in the editor, the preview or near export buttons.
 */
export function AdSlot() {
  useEffect(() => {
    if (!client || !slot) return;
    try {
      ((window as unknown as { adsbygoogle: unknown[] }).adsbygoogle ||= []).push({});
    } catch {
      // Blocked by an ad blocker or not ready: leave the slot empty.
    }
  }, []);

  if (!client || !slot) return null;
  return (
    <aside aria-label="Advertisement" className="my-10 border-t border-gray-200 pt-3 print:hidden">
      <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">Advertisement</p>
      <Script src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`} crossOrigin="anonymous" strategy="afterInteractive" />
      <ins className="adsbygoogle block" data-ad-client={client} data-ad-slot={slot} data-ad-format="auto" data-full-width-responsive="true" />
    </aside>
  );
}
