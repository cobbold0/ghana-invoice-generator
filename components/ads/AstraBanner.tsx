"use client";

import React from "react";

export type AstraBannerSize = "160x600" | "728x90" | "300x250" | "320x50" | "468x60" | "160x300";

interface AstraBannerProps {
  size: AstraBannerSize;
  className?: string;
  label?: string;
}

const BANNER_CONFIG: Record<AstraBannerSize, { key: string; width: number; height: number }> = {
  "160x600": {
    key: "739c9df3e8191f8a1ea0880cb64f71e6",
    width: 160,
    height: 600,
  },
  "728x90": {
    key: "5403e3444a127dd809eb7e2b925a5b83",
    width: 728,
    height: 90,
  },
  "300x250": {
    key: "19fbcff3d837d8abfb0e7af861971e16",
    width: 300,
    height: 250,
  },
  "320x50": {
    key: "637d79292fb689b034234a4df7a4551d",
    width: 320,
    height: 50,
  },
  "468x60": {
    key: "752e658cfd98d15258880c4574880d5f",
    width: 468,
    height: 60,
  },
  "160x300": {
    key: "0bbc2e328c7f5860035b9e2daa945030",
    width: 160,
    height: 300,
  },
};

export function AstraBanner({ size, className = "", label = "Sponsored" }: AstraBannerProps) {
  const config = BANNER_CONFIG[size];
  if (!config) return null;

  const htmlContent = `<!DOCTYPE html><html><head><meta charset="utf-8"/><base target="_blank"/><style>body{margin:0;padding:0;overflow:hidden;background:transparent;display:flex;justify-content:center;align-items:center;}</style></head><body><script>atOptions = {'key' : '${config.key}','format' : 'iframe','height' : ${config.height},'width' : ${config.width},'params' : {}};</script><script type="text/javascript" src="https://bauval.org/22/${config.key}"></script></body></html>`;

  return (
    <aside
      aria-label={label}
      className={`print:hidden flex flex-col items-center justify-center overflow-hidden ${className}`}
    >
      {label && (
        <p className="mb-1 text-center text-[9px] font-medium tracking-wider text-gray-400 uppercase select-none">
          {label}
        </p>
      )}
      <iframe
        title={`${label} ${size}`}
        srcDoc={htmlContent}
        width={config.width}
        height={config.height}
        style={{
          width: `${config.width}px`,
          height: `${config.height}px`,
          border: "none",
          overflow: "hidden",
        }}
        scrolling="no"
        loading="lazy"
        sandbox="allow-scripts allow-same-origin allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
      />
    </aside>
  );
}
