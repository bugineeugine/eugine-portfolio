import type { CSSProperties, ReactNode } from "react";
import { AbsoluteFill } from "remotion";
import { color, font } from "./theme";

// Faint workflow graph, the same motif the site uses.
const nodes: [number, number][] = [
  [60, 90], [240, 40], [420, 130], [640, 60], [860, 160], [1080, 70], [1300, 180], [1520, 90],
  [140, 320], [360, 380], [580, 300], [820, 400], [1040, 330], [1260, 420], [1480, 340],
  [220, 620], [480, 700], [700, 600], [960, 720], [1180, 640], [1420, 740], [1580, 620],
];
const edges: [number, number][] = [
  [0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7],
  [0, 8], [1, 9], [2, 10], [3, 10], [4, 11], [5, 12], [6, 13], [7, 14],
  [8, 9], [9, 10], [10, 11], [11, 12], [12, 13], [13, 14],
  [8, 15], [9, 16], [10, 17], [11, 18], [12, 19], [13, 20], [14, 21],
  [15, 16], [16, 17], [17, 18], [18, 19], [19, 20], [20, 21],
];

export const Backdrop = ({ children }: { children: ReactNode }) => (
  <AbsoluteFill style={{ backgroundColor: color.page, fontFamily: font.body, color: color.ink }}>
    <svg viewBox="0 0 1600 900" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <g stroke="rgba(96,165,250,0.12)" strokeWidth={1.2} fill="none">
        {edges.map(([a, b]) => (
          <line key={`${a}-${b}`} x1={nodes[a][0]} y1={nodes[a][1]} x2={nodes[b][0]} y2={nodes[b][1]} />
        ))}
      </g>
      <g fill="rgba(96,165,250,0.35)">
        {nodes.map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 4 === 0 ? 5 : 3} />
        ))}
      </g>
    </svg>
    <div
      style={{
        position: "absolute",
        left: -200,
        top: -260,
        width: 760,
        height: 760,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(59,130,246,0.28) 0%, rgba(59,130,246,0) 65%)",
      }}
    />
    <div
      style={{
        position: "absolute",
        right: -220,
        bottom: -300,
        width: 760,
        height: 760,
        borderRadius: "50%",
        background: "radial-gradient(circle, rgba(232,121,249,0.16) 0%, rgba(232,121,249,0) 65%)",
      }}
    />
    {children}
  </AbsoluteFill>
);

// App window frame with a title bar. Positioned by the caller.
export const Window = ({
  title,
  crumb,
  style,
  children,
}: {
  title: string;
  crumb: string;
  style?: CSSProperties;
  children: ReactNode;
}) => (
  <div
    style={{
      position: "absolute",
      display: "flex",
      flexDirection: "column",
      backgroundColor: color.surface,
      border: `1px solid ${color.line}`,
      borderRadius: 22,
      boxShadow: "0 40px 90px rgba(0,0,0,0.45)",
      overflow: "hidden",
      ...style,
    }}
  >
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 14,
        height: 56,
        padding: "0 22px",
        borderBottom: `1px solid ${color.line}`,
        backgroundColor: color.surface2,
      }}
    >
      <div style={{ display: "flex", gap: 7 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map((c) => (
          <span key={c} style={{ width: 12, height: 12, borderRadius: 6, backgroundColor: c, opacity: 0.9 }} />
        ))}
      </div>
      <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 18, color: color.ink }}>{title}</span>
      <span style={{ color: color.muted, fontSize: 16 }}>/</span>
      <span style={{ color: color.body, fontSize: 16 }}>{crumb}</span>
    </div>
    <div style={{ position: "relative", flex: 1, display: "flex", minHeight: 0 }}>{children}</div>
  </div>
);

export const Pill = ({
  children,
  tone = "default",
  size = 14,
}: {
  children: ReactNode;
  tone?: "default" | "accent" | "green" | "amber" | "magenta";
  size?: number;
}) => {
  const tones: Record<string, { bg: string; fg: string; bd: string }> = {
    default: { bg: "rgba(255,255,255,0.04)", fg: color.body, bd: color.line },
    accent: { bg: "rgba(59,130,246,0.16)", fg: color.accentSoft, bd: "rgba(96,165,250,0.35)" },
    green: { bg: "rgba(52,211,153,0.14)", fg: color.green, bd: "rgba(52,211,153,0.35)" },
    amber: { bg: "rgba(251,191,36,0.14)", fg: color.amber, bd: "rgba(251,191,36,0.35)" },
    magenta: { bg: "rgba(232,121,249,0.14)", fg: color.magenta, bd: "rgba(232,121,249,0.35)" },
  };
  const t = tones[tone];
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        padding: `${size * 0.35}px ${size * 0.8}px`,
        borderRadius: 999,
        fontSize: size,
        fontWeight: 500,
        backgroundColor: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
};

export const Dot = ({ tone, size = 8 }: { tone: "accent" | "green" | "amber" | "muted" | "magenta"; size?: number }) => {
  const map = { accent: color.accent, green: color.green, amber: color.amber, muted: color.muted, magenta: color.magenta };
  return <span style={{ width: size, height: size, borderRadius: size, backgroundColor: map[tone], display: "inline-block", flexShrink: 0 }} />;
};

export const Card = ({ children, style }: { children: ReactNode; style?: CSSProperties }) => (
  <div
    style={{
      backgroundColor: color.surface2,
      border: `1px solid ${color.line}`,
      borderRadius: 14,
      padding: 16,
      ...style,
    }}
  >
    {children}
  </div>
);

export const Label = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 13, fontWeight: 600, letterSpacing: 0.4, color: color.muted, marginBottom: 8 }}>{children}</div>
);

export const Avatar = ({ letter, tone = "accent", size = 34 }: { letter: string; tone?: "accent" | "magenta" | "green" | "amber"; size?: number }) => {
  const map = { accent: color.accent, magenta: color.magenta, green: color.green, amber: color.amber };
  return (
    <span
      style={{
        width: size,
        height: size,
        borderRadius: size * 0.32,
        backgroundColor: map[tone],
        color: "#06131f",
        fontFamily: font.display,
        fontWeight: 700,
        fontSize: size * 0.5,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {letter}
    </span>
  );
};
