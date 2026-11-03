"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface AddThisProps {
  pubId?: string;
  url?: string;
  title?: string;
  className?: string;
}

/**
 * AddThis social share bar with an integrated high-converting native share fallback.
 * Works out-of-the-box with WhatsApp, X, Facebook, LinkedIn and Copy Link.
 */
export function AddThis({
  pubId = process.env.NEXT_PUBLIC_ADDTHIS_PUB_ID,
  url,
  title,
  className = "",
}: AddThisProps) {
  const [copied, setCopied] = useState(false);
  const [shareUrl, setShareUrl] = useState(url || "");
  const [shareTitle, setShareTitle] = useState(title || "");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setShareUrl(url || window.location.href);
      setShareTitle(title || document.title);
    }
  }, [url, title]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedTitle = encodeURIComponent(shareTitle);

  return (
    <div className={`my-6 rounded-xl border border-gray-200 bg-gray-50/70 p-4 shadow-sm print:hidden ${className}`}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-xs font-semibold tracking-wider text-gray-500 uppercase">Share this invoice tool</span>
        {copied && <span className="text-xs font-medium text-emerald-600">Link copied!</span>}
      </div>

      {pubId ? (
        <>
          <Script
            src={`https://s7.addthis.com/js/300/addthis_widget.js#pubid=${pubId}`}
            strategy="lazyOnload"
          />
          <div className="addthis_inline_share_toolbox" data-url={shareUrl} data-title={shareTitle} />
        </>
      ) : (
        <div className="flex flex-wrap items-center gap-2">
          {/* WhatsApp */}
          <a
            href={`https://api.whatsapp.com/send?text=${encodedTitle}%20${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#25D366]/15 px-3 py-1.5 text-xs font-semibold text-[#128C7E] transition hover:bg-[#25D366]/25"
            aria-label="Share on WhatsApp"
          >
            WhatsApp
          </a>

          {/* Twitter / X */}
          <a
            href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-800 transition hover:bg-gray-300"
            aria-label="Share on X"
          >
            X / Twitter
          </a>

          {/* LinkedIn */}
          <a
            href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#0A66C2]/15 px-3 py-1.5 text-xs font-semibold text-[#0A66C2] transition hover:bg-[#0A66C2]/25"
            aria-label="Share on LinkedIn"
          >
            LinkedIn
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-lg bg-[#1877F2]/15 px-3 py-1.5 text-xs font-semibold text-[#1877F2] transition hover:bg-[#1877F2]/25"
            aria-label="Share on Facebook"
          >
            Facebook
          </a>

          {/* Copy Link */}
          <button
            type="button"
            onClick={handleCopy}
            className="inline-flex items-center gap-1.5 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-semibold text-gray-700 transition hover:bg-gray-50 cursor-pointer"
            aria-label="Copy page link"
          >
            {copied ? "Copied!" : "Copy Link"}
          </button>
        </div>
      )}
    </div>
  );
}
