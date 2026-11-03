import { ImageResponse } from "next/og";

export const alt = "Ghana Invoice Generator — Free Professional PDF Invoices";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "60px 80px",
          background: "linear-gradient(135deg, #042f2e 0%, #0f766e 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              display: "flex",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#14b8a6",
              color: "#ffffff",
              fontSize: 26,
              fontWeight: 800,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            GH
          </div>
          <div style={{ fontSize: 32, fontWeight: 700, color: "#ccfbf1" }}>
            Ghana Invoice Generator
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.15, color: "#ffffff" }}>
            Create & Download Professional PDF Invoices
          </div>
          <div style={{ fontSize: 26, color: "#99f6e4", fontWeight: 400 }}>
            Bill in Ghana Cedis (GHS) · Instant A4 PDF · No Sign-up Required
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 24, borderTop: "1px solid rgba(255,255,255,0.15)", paddingTop: 24 }}>
          <div style={{ fontSize: 20, color: "#5eead4", fontWeight: 600 }}>
            MTN MoMo & Bank Details · Tax Calculations · Clean Templates
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
