"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { CONSENT_EVENT, CONSENT_NEEDED, getConsent, setConsent, type Consent } from "@/lib/consent";

export function ConsentBanner() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!CONSENT_NEEDED) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- stored choice is only readable on the client
    setOpen(getConsent() === null);
    const reopen = () => setOpen(true);
    window.addEventListener(CONSENT_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_EVENT, reopen);
  }, []);

  if (!open) return null;

  const choose = (consent: Consent) => {
    setConsent(consent);
    setOpen(false);
  };

  return (
    <div role="dialog" aria-labelledby="consent-title" className="fixed inset-x-0 bottom-0 z-50 border-t border-gray-200 bg-white p-4 shadow-lg print:hidden">
      <div className="mx-auto flex max-w-6xl flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="text-sm text-gray-700">
          <p id="consent-title" className="font-semibold text-gray-900">
            Cookies for analytics and personalised ads
          </p>
          <p className="mt-1">
            This free site is supported by ads. May we use cookies to measure visits and show ads based on your interests? If you say no, you’ll still see
            ads, but they won’t be personalised. Your invoice details are never shared. <Link href="/privacy" className="underline">Privacy</Link>
          </p>
        </div>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => choose("denied")} className="min-h-10 rounded-md border border-gray-300 px-4 text-sm font-semibold text-gray-800 hover:bg-gray-50">
            No thanks
          </button>
          <button type="button" onClick={() => choose("granted")} className="min-h-10 rounded-md bg-brand-700 px-4 text-sm font-semibold text-white hover:bg-brand-800">
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}

/** Footer link that reopens the banner so people can change their choice. */
export function ConsentSettingsButton() {
  if (!CONSENT_NEEDED) return null;
  return (
    <button type="button" onClick={() => window.dispatchEvent(new Event(CONSENT_EVENT))} className="text-left hover:text-gray-900 hover:underline">
      Cookie settings
    </button>
  );
}
