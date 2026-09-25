import { Avatar, Backdrop, Card, Dot, Label, Pill, Window } from "./ui";
import { color, font } from "./theme";

type Sub = { name: string; status: "running" | "done" | "queued"; steps: string; tone: "accent" | "magenta" | "green" | "amber" };

const subs: Sub[] = [
  { name: "Web Researcher", status: "done", steps: "14 steps · 6 sources", tone: "magenta" },
  { name: "Data Analyst", status: "running", steps: "step 7 · run_code", tone: "green" },
  { name: "Report Writer", status: "queued", steps: "waiting for analyst", tone: "amber" },
];

const statusPill = (s: Sub["status"]) =>
  s === "running" ? (
    <Pill tone="accent" size={12}><Dot tone="accent" size={6} /> running</Pill>
  ) : s === "done" ? (
    <Pill tone="green" size={12}><Dot tone="green" size={6} /> done</Pill>
  ) : (
    <Pill size={12}><Dot tone="muted" size={6} /> queued</Pill>
  );

export const Orchestrators = () => (
  <Backdrop>
    <Window title="Orchestrators" crumb="Market Research Lead" style={{ left: 80, top: 70, width: 1440, height: 760 }}>
      {/* Flow canvas */}
      <div style={{ flex: 1, position: "relative", padding: 26 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
          <Pill tone="accent" size={13}>Project · CRM pricing comparison</Pill>
          <Pill size={13}>sandbox on</Pill>
          <Pill size={13}>run #12</Pill>
        </div>
        <div style={{ backgroundColor: color.surface2, border: `1px solid ${color.line}`, borderRadius: 14, padding: "12px 16px", fontSize: 15, color: color.body, marginBottom: 20 }}>
          <span style={{ color: color.muted }}>You:</span> Compare pricing and limits of the top 5 CRM tools for a 20-person team, then write a one-page recommendation.
        </div>

        <svg style={{ position: "absolute", left: 0, top: 0, width: "100%", height: "100%", pointerEvents: "none" }} viewBox="0 0 1080 660">
          <defs>
            <marker id="arrow" markerWidth="10" markerHeight="10" refX="8" refY="5" orient="auto">
              <path d="M0,0 L10,5 L0,10 z" fill={color.accentSoft} />
            </marker>
          </defs>
          {[[300, 240], [300, 390], [300, 540]].map(([, y], i) => (
            <path
              key={i}
              d={`M 300 390 C 400 390, 420 ${y}, 560 ${y}`}
              stroke={i === 1 ? color.accentSoft : "rgba(96,165,250,0.55)"}
              strokeWidth={i === 1 ? 3 : 2}
              fill="none"
              markerEnd="url(#arrow)"
              strokeDasharray={i === 2 ? "8 8" : undefined}
            />
          ))}
        </svg>

        {/* Lead node */}
        <div style={{ position: "absolute", left: 40, top: 330, width: 262 }}>
          <Card style={{ borderColor: "rgba(96,165,250,0.5)", boxShadow: "0 0 0 4px rgba(59,130,246,0.12)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <Avatar letter="L" size={40} />
              <div>
                <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 17, color: color.ink }}>Lead</div>
                <div style={{ fontSize: 12, color: color.muted }}>claude-opus · delegates</div>
              </div>
            </div>
            <div style={{ marginTop: 12, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <Pill tone="accent" size={12}>planning</Pill>
              <Pill size={12}>3 subagents</Pill>
            </div>
          </Card>
        </div>

        {/* Subagent nodes */}
        {subs.map((s, i) => (
          <div key={s.name} style={{ position: "absolute", left: 590, top: 180 + i * 150, width: 400 }}>
            <Card style={{ display: "flex", flexDirection: "column", gap: 10, borderColor: s.status === "running" ? "rgba(96,165,250,0.5)" : color.line }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <Avatar letter={s.name[0]} tone={s.tone} size={36} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 16, color: color.ink }}>{s.name}</div>
                  <div style={{ fontSize: 12, color: color.muted }}>{s.steps}</div>
                </div>
                {statusPill(s.status)}
              </div>
            </Card>
          </div>
        ))}
      </div>

      {/* Trace */}
      <div style={{ width: 380, borderLeft: `1px solid ${color.line}`, padding: 18, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Label>TRACE</Label>
          <Pill tone="green" size={12}>$0.042 · 18.4k tokens</Pill>
        </div>
        {[
          ["Lead", "Split request into research, analysis, writing", "0.8s", "accent"],
          ["Web Researcher", "web_search · \"CRM pricing 2026\"", "3.1s", "magenta"],
          ["Web Researcher", "fetch · 6 pricing pages", "5.6s", "magenta"],
          ["Data Analyst", "run_code · normalize plans to per-seat", "2.4s", "green"],
          ["Data Analyst", "run_code · rank by 20-seat total", "…", "green"],
          ["Report Writer", "queued", "", "amber"],
        ].map(([who, what, t, tone], i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "8px 0", borderBottom: `1px solid ${color.line}` }}>
            <Dot tone={tone as "accent" | "magenta" | "green" | "amber"} size={8} />
            <div style={{ flex: 1, marginTop: -4 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: color.ink }}>{who}</div>
              <div style={{ fontSize: 13, color: color.body }}>{what}</div>
            </div>
            <span style={{ fontSize: 12, color: color.muted, marginTop: -2 }}>{t}</span>
          </div>
        ))}
      </div>
    </Window>
    <div style={{ position: "absolute", left: 80, top: 24, fontFamily: font.display, fontWeight: 700, fontSize: 22, color: color.accentSoft, letterSpacing: 0.3 }}>
      Orchestrators
    </div>
  </Backdrop>
);
