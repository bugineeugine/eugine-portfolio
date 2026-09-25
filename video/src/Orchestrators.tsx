import type { ReactNode } from "react";
import { Browser, Initial } from "./chrome";
import { font } from "./theme";

// Dark canvas workspace with a dotted grid, like a node editor.
const c = {
  bg: "#0f1117",
  panel: "#161a23",
  line: "#262b36",
  ink: "#f1f3f7",
  body: "#aab2c2",
  muted: "#6b7385",
  accent: "#60a5fa",
  green: "#4ade80",
  amber: "#fbbf24",
  magenta: "#e879f9",
};

const Chip = ({ children, color }: { children: ReactNode; color: string }) => (
  <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 500, color, border: `1px solid ${color}55`, backgroundColor: `${color}1a`, padding: "3px 9px", borderRadius: 999, whiteSpace: "nowrap" }}>
    <span style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: color }} />
    {children}
  </span>
);

type Node = { x: number; y: number; name: string; sub: string; color: string; status: string; letter: string };
const lead: Node = { x: 70, y: 300, name: "Research Lead", sub: "Claude Opus · orchestrator", color: c.accent, status: "delegating", letter: "L" };
const subs: Node[] = [
  { x: 470, y: 120, name: "Web Researcher", sub: "web_search · fetch", color: c.magenta, status: "done · 14 steps", letter: "W" },
  { x: 470, y: 300, name: "Data Analyst", sub: "run_code · sandbox", color: c.green, status: "running · step 7", letter: "D" },
  { x: 470, y: 480, name: "Report Writer", sub: "writes final report", color: c.amber, status: "queued", letter: "R" },
];

const NodeCard = ({ n, glow }: { n: Node; glow?: boolean }) => (
  <div style={{ position: "absolute", left: n.x, top: n.y, width: 300, backgroundColor: c.panel, border: `1px solid ${glow ? n.color : c.line}`, borderRadius: 12, boxShadow: glow ? `0 0 0 3px ${n.color}22, 0 20px 40px rgba(0,0,0,0.4)` : "0 20px 40px rgba(0,0,0,0.35)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", borderBottom: `1px solid ${c.line}` }}>
      <Initial letter={n.letter} bg={n.color} fg="#0b0f17" size={30} />
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: c.ink }}>{n.name}</div>
        <div style={{ fontSize: 11, color: c.muted }}>{n.sub}</div>
      </div>
      <span style={{ color: c.muted, fontSize: 14 }}>⋯</span>
    </div>
    <div style={{ padding: "10px 14px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
      <Chip color={n.color}>{n.status}</Chip>
      <span style={{ fontSize: 11, color: c.muted }}>out ●</span>
    </div>
  </div>
);

export const Orchestrators = () => (
  <Browser url="localhost:3000/orchestrators/research-lead/runs/12" tab="Run #12 · Research Lead" dark>
    <div style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: c.bg, color: c.ink }}>
      {/* Toolbar */}
      <div style={{ height: 52, display: "flex", alignItems: "center", gap: 14, padding: "0 20px", borderBottom: `1px solid ${c.line}`, backgroundColor: c.panel }}>
        <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: 16 }}>Research Lead</span>
        <span style={{ color: c.muted }}>/</span>
        <span style={{ fontSize: 14, color: c.body }}>CRM pricing comparison</span>
        <Chip color={c.accent}>run #12 · live</Chip>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, fontSize: 13, color: c.body }}>
          {["Flow", "Chat", "Trace", "Cost"].map((t, i) => (
            <span key={t} style={{ padding: "6px 12px", borderRadius: 8, backgroundColor: i === 0 ? "#252a36" : "transparent", color: i === 0 ? c.ink : c.body }}>{t}</span>
          ))}
          <span style={{ padding: "6px 12px", borderRadius: 8, backgroundColor: "#ef4444", color: "#fff", fontWeight: 600 }}>Stop run</span>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* Canvas */}
        <div style={{ flex: 1, position: "relative", backgroundColor: c.bg, backgroundImage: "radial-gradient(#2a3040 1px, transparent 1px)", backgroundSize: "22px 22px", overflow: "hidden" }}>
          <div style={{ position: "absolute", left: 20, top: 16, display: "flex", gap: 8 }}>
            <span style={{ fontSize: 12, color: c.muted, backgroundColor: c.panel, border: `1px solid ${c.line}`, padding: "6px 10px", borderRadius: 8 }}>Prompt: Compare pricing of the top 5 CRM tools for a 20-person team and recommend one.</span>
          </div>
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <defs>
              <marker id="m" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
                <path d="M0,0 L8,4 L0,8 z" fill={c.accent} />
              </marker>
            </defs>
            {subs.map((s, i) => (
              <path
                key={s.name}
                d={`M 370 345 C 420 345, 420 ${s.y + 45}, 468 ${s.y + 45}`}
                stroke={i === 1 ? c.accent : `${c.accent}88`}
                strokeWidth={i === 1 ? 2.5 : 1.5}
                strokeDasharray={i === 2 ? "6 6" : undefined}
                fill="none"
                markerEnd="url(#m)"
              />
            ))}
            <path d="M 770 165 C 830 165, 830 345, 890 345" stroke={`${c.magenta}88`} strokeWidth={1.5} fill="none" markerEnd="url(#m)" />
            <path d="M 770 345 C 830 345, 830 345, 890 345" stroke={c.green} strokeWidth={2} fill="none" markerEnd="url(#m)" />
          </svg>
          <NodeCard n={lead} glow />
          {subs.map((s, i) => (
            <NodeCard key={s.name} n={s} glow={i === 1} />
          ))}
          <div style={{ position: "absolute", left: 892, top: 300, width: 220, backgroundColor: c.panel, border: `1px dashed ${c.line}`, borderRadius: 12, padding: 14, color: c.muted, fontSize: 12 }}>
            <div style={{ color: c.body, fontWeight: 600, marginBottom: 4 }}>Final answer</div>
            waiting for Report Writer…
          </div>
          <div style={{ position: "absolute", right: 16, bottom: 14, display: "flex", gap: 6 }}>
            {["−", "100%", "+", "⤢"].map((k) => (
              <span key={k} style={{ fontSize: 12, color: c.body, backgroundColor: c.panel, border: `1px solid ${c.line}`, padding: "5px 9px", borderRadius: 6 }}>{k}</span>
            ))}
          </div>
        </div>

        {/* Trace drawer */}
        <div style={{ width: 400, borderLeft: `1px solid ${c.line}`, backgroundColor: c.panel, display: "flex", flexDirection: "column" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${c.line}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Trace</span>
            <span style={{ fontSize: 12, color: c.green }}>$0.042 · 18.4k tokens · 11.9s</span>
          </div>
          <div style={{ padding: "6px 18px", display: "flex", flexDirection: "column" }}>
            {[
              ["10:42:03", "Lead", "Split request into research → analysis → writing", c.accent],
              ["10:42:04", "Lead", "Delegated to Web Researcher, Data Analyst", c.accent],
              ["10:42:05", "Web Researcher", 'web_search("CRM pricing 2026 per seat")', c.magenta],
              ["10:42:08", "Web Researcher", "fetch × 6 pricing pages · 41k chars", c.magenta],
              ["10:42:11", "Web Researcher", "Returned 5 plans with limits", c.magenta],
              ["10:42:12", "Data Analyst", "run_code · normalize plans to per-seat/month", c.green],
              ["10:42:14", "Data Analyst", "run_code · total cost for 20 seats, 12 months", c.green],
              ["10:42:15", "Data Analyst", "▍ ranking by total cost…", c.green],
              ["—", "Report Writer", "queued (needs analyst output)", c.amber],
            ].map(([t, who, what, col], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "62px 8px 1fr", gap: 10, alignItems: "start", padding: "9px 0", borderBottom: `1px solid ${c.line}`, fontSize: 12 }}>
                <span style={{ color: c.muted, fontVariantNumeric: "tabular-nums" }}>{t}</span>
                <span style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: col as string, marginTop: 4 }} />
                <div>
                  <span style={{ fontWeight: 600, color: c.ink }}>{who}</span>
                  <div style={{ color: c.body, fontFamily: "ui-monospace, Menlo, monospace", fontSize: 11.5, marginTop: 2 }}>{what}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </Browser>
);
