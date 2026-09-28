import type { ComponentType, ReactNode } from "react";
import type { InvoiceView } from "@/lib/invoice/templates";

type Style = Record<string, string | number | undefined>;

/**
 * The layout is written once against these primitives and rendered with HTML
 * elements (preview/print) or @react-pdf/renderer (PDF download), so both outputs
 * share the same structure and measurements. Units are PDF points; the HTML
 * preview renders a 595px-wide page and scales it.
 */
export interface Primitives {
  View: ComponentType<{ style?: Style; fixed?: boolean; wrap?: boolean; children?: ReactNode }>;
  Text: ComponentType<{ style?: Style; children?: ReactNode }>;
  Logo: ComponentType<{ src: string; style?: Style }>;
}

const GRAY = "#4b5563";
const LIGHT = "#e5e7eb";

function stylesFor(view: InvoiceView) {
  const { accent } = view.theme;
  const t = view.template;
  const band = t === "modern";
  const onHeader = band ? "#ffffff" : GRAY;

  return {
    header: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginBottom: 24,
      ...(band && { backgroundColor: accent, color: "#ffffff", padding: 20, borderRadius: 6 }),
      ...(t === "classic" && { paddingBottom: 14, borderBottomWidth: 3, borderBottomStyle: "solid", borderBottomColor: accent }),
      ...(t === "minimal" && { paddingBottom: 16, borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: LIGHT }),
    },
    brand: { flexShrink: 1, flexGrow: 1, paddingRight: 16 },
    logo: { maxWidth: 120, maxHeight: 50, objectFit: "contain", alignSelf: "flex-start", marginBottom: 8 },
    businessName: { fontSize: 15, lineHeight: 1.25, fontWeight: 700, marginBottom: 3 },
    headerLine: { fontSize: 9, color: onHeader },
    titleBlock: { alignItems: "flex-end", flexShrink: 0, maxWidth: "45%" },
    title:
      t === "minimal"
        ? { fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: GRAY }
        : { fontSize: 24, lineHeight: 1.15, fontWeight: 700, textTransform: "uppercase", color: band ? "#ffffff" : accent },
    number: { fontSize: 10, marginTop: 4, color: band ? "#ffffff" : "#111827", textAlign: "right" },

    parties: { flexDirection: "row", justifyContent: "space-between", marginBottom: 22 },
    billTo: { flexShrink: 1, flexGrow: 1, paddingRight: 16 },
    label: { fontSize: 8, fontWeight: 700, textTransform: "uppercase", letterSpacing: 1, color: t === "minimal" ? GRAY : accent, marginBottom: 4 },
    strong: { fontSize: 11, fontWeight: 700, marginBottom: 2 },
    small: { fontSize: 9, color: GRAY },
    metaBox: { width: 190, flexShrink: 0 },
    metaRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 2 },
    metaLabel: { fontSize: 9, color: GRAY },
    metaValue: { fontSize: 9, fontWeight: 700, textAlign: "right" },

    tableHead: {
      flexDirection: "row",
      paddingVertical: 6,
      paddingHorizontal: 8,
      fontSize: 8,
      fontWeight: 700,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      ...(band && { backgroundColor: accent, color: "#ffffff", borderRadius: 3 }),
      ...(t === "classic" && { backgroundColor: "#e8edf7", color: accent }),
      ...(t === "minimal" && { borderBottomWidth: 1, borderBottomStyle: "solid", borderBottomColor: "#111827" }),
    },
    row: {
      flexDirection: "row",
      paddingVertical: 7,
      paddingHorizontal: 8,
      fontSize: 9.5,
      borderBottomWidth: 1,
      borderBottomStyle: "solid",
      borderBottomColor: LIGHT,
    },
    colDescription: { flexGrow: 1, flexShrink: 1, flexBasis: 0, paddingRight: 8 },
    colQty: { width: 50, textAlign: "right", flexShrink: 0 },
    colMoney: { width: 90, textAlign: "right", flexShrink: 0 },
    empty: { fontSize: 9.5, color: GRAY, paddingVertical: 10, paddingHorizontal: 8 },

    totals: { alignSelf: "flex-end", width: 250, marginTop: 12 },
    summaryRow: { flexDirection: "row", justifyContent: "space-between", paddingVertical: 3, paddingHorizontal: 8, fontSize: 9.5 },
    totalRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 6,
      paddingVertical: 8,
      paddingHorizontal: 8,
      fontSize: 12,
      fontWeight: 700,
      ...(band && { backgroundColor: accent, color: "#ffffff", borderRadius: 3 }),
      ...(t === "classic" && { borderTopWidth: 2, borderTopStyle: "solid", borderTopColor: accent, color: accent }),
      ...(t === "minimal" && { borderTopWidth: 1, borderTopStyle: "solid", borderTopColor: "#111827" }),
    },
    section: { marginTop: 22 },
    body: { fontSize: 9.5, color: "#1f2937" },
  } satisfies Record<string, Style>;
}

export function InvoiceLayout({ view, P }: { view: InvoiceView; P: Primitives }) {
  const { View, Text, Logo } = P;
  const s = stylesFor(view);

  return (
    <>
      <View style={s.header}>
        <View style={s.brand}>
          {view.logo && <Logo src={view.logo} style={s.logo} />}
          <Text style={s.businessName}>{view.businessName}</Text>
          {view.businessLines.map((line, i) => (
            <Text key={i} style={s.headerLine}>
              {line}
            </Text>
          ))}
        </View>
        <View style={s.titleBlock}>
          <Text style={s.title}>Invoice</Text>
          {view.invoiceNumber && <Text style={s.number}>No. {view.invoiceNumber}</Text>}
        </View>
      </View>

      <View style={s.parties}>
        <View style={s.billTo}>
          <Text style={s.label}>Bill to</Text>
          <Text style={s.strong}>{view.customerName}</Text>
          {view.customerLines.map((line, i) => (
            <Text key={i} style={s.small}>
              {line}
            </Text>
          ))}
        </View>
        <View style={s.metaBox}>
          {view.meta.map((m) => (
            <View key={m.label} style={s.metaRow}>
              <Text style={s.metaLabel}>{m.label}</Text>
              <Text style={s.metaValue}>{m.value}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={s.tableHead} fixed>
        <Text style={s.colDescription}>Description</Text>
        <Text style={s.colQty}>Qty</Text>
        <Text style={s.colMoney}>Unit price</Text>
        <Text style={s.colMoney}>Amount</Text>
      </View>
      {view.rows.length === 0 ? (
        <Text style={s.empty}>No items added yet.</Text>
      ) : (
        view.rows.map((row) => (
          <View key={row.id} style={s.row} wrap={false}>
            <Text style={s.colDescription}>{row.description}</Text>
            <Text style={s.colQty}>{row.quantity}</Text>
            <Text style={s.colMoney}>{row.unitPrice}</Text>
            <Text style={s.colMoney}>{row.total}</Text>
          </View>
        ))
      )}

      <View style={s.totals} wrap={false}>
        {view.summary.map((line) => (
          <View key={line.label} style={s.summaryRow}>
            <Text>{line.label}</Text>
            <Text>{line.value}</Text>
          </View>
        ))}
        <View style={s.totalRow}>
          <Text>Total due</Text>
          <Text>{view.total}</Text>
        </View>
      </View>

      {view.paymentInstructions && (
        <View style={s.section} wrap={false}>
          <Text style={s.label}>Payment instructions</Text>
          <Text style={s.body}>{view.paymentInstructions}</Text>
        </View>
      )}
      {view.notes && (
        <View style={s.section} wrap={false}>
          <Text style={s.label}>Notes</Text>
          <Text style={s.body}>{view.notes}</Text>
        </View>
      )}
    </>
  );
}
