import type { ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { font } from "./theme";

// Full-bleed browser window: tab strip, address bar, then the app fills the rest.
export const Browser = ({
  url,
  tab,
  dark,
  children,
}: {
  url: string;
  tab: string;
  dark: boolean;
  children: ReactNode;
}) => {
  const c = dark
    ? { strip: "#202124", bar: "#35363a", field: "#202124", text: "#e8eaed", muted: "#9aa0a6", line: "#3c4043", tab: "#35363a" }
    : { strip: "#dee1e6", bar: "#ffffff", field: "#f1f3f4", text: "#202124", muted: "#5f6368", line: "#dadce0", tab: "#ffffff" };
  return (
    <AbsoluteFill style={{ fontFamily: font.body, backgroundColor: c.strip }}>
      {/* Tab strip */}
      <div style={{ height: 44, display: "flex", alignItems: "flex-end", padding: "0 12px", gap: 8 }}>
        <div style={{ display: "flex", gap: 8, alignItems: "center", height: 44, paddingRight: 8 }}>
          {["#ff5f57", "#febc2e", "#28c840"].map((k) => (
            <span key={k} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: k }} />
          ))}
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            height: 36,
            padding: "0 16px",
            borderRadius: "10px 10px 0 0",
            backgroundColor: c.tab,
            color: c.text,
            fontSize: 13,
            minWidth: 240,
          }}
        >
          <span style={{ width: 14, height: 14, borderRadius: 4, backgroundColor: "#3b82f6" }} />
          {tab}
          <span style={{ marginLeft: "auto", color: c.muted }}>×</span>
        </div>
        <div style={{ color: c.muted, fontSize: 18, paddingBottom: 8 }}>+</div>
      </div>
      {/* Address bar */}
      <div style={{ height: 46, backgroundColor: c.bar, display: "flex", alignItems: "center", gap: 14, padding: "0 14px", borderBottom: `1px solid ${c.line}` }}>
        <span style={{ color: c.muted, fontSize: 18, letterSpacing: 4 }}>‹ › ↻</span>
        <div style={{ flex: 1, height: 30, borderRadius: 15, backgroundColor: c.field, display: "flex", alignItems: "center", gap: 8, padding: "0 14px", color: c.text, fontSize: 13 }}>
          <span style={{ color: c.muted }}>🔒</span>
          <span>{url}</span>
        </div>
        <span style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: "#3b82f6", color: "#fff", fontSize: 12, fontWeight: 700, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>E</span>
      </div>
      {/* Viewport */}
      <div style={{ position: "relative", flex: 1, display: "flex", minHeight: 0, overflow: "hidden" }}>{children}</div>
    </AbsoluteFill>
  );
};

export const Initial = ({ letter, bg, fg = "#fff", size = 32, radius }: { letter: string; bg: string; fg?: string; size?: number; radius?: number }) => (
  <span
    style={{
      width: size,
      height: size,
      borderRadius: radius ?? size * 0.3,
      backgroundColor: bg,
      color: fg,
      fontFamily: font.display,
      fontWeight: 700,
      fontSize: size * 0.48,
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: 0,
    }}
  >
    {letter}
  </span>
);
