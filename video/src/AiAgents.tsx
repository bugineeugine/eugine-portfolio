import { Avatar, Backdrop, Card, Dot, Label, Pill, Window } from "./ui";
import { color, font } from "./theme";

const agents = [
  { name: "Support Assistant", model: "claude-sonnet", on: true },
  { name: "Sales Copilot", model: "llama3.1:70b", on: false },
  { name: "Docs Helper", model: "qwen2.5:14b", on: false },
  { name: "Data Analyst", model: "claude-opus", on: false },
];

export const AiAgents = () => (
  <Backdrop>
    <Window title="AI Agents" crumb="Support Assistant" style={{ left: 80, top: 70, width: 1440, height: 760 }}>
      {/* Agent list */}
      <div style={{ width: 300, borderRight: `1px solid ${color.line}`, padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>AGENTS</Label>
        {agents.map((a) => (
          <div
            key={a.name}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 12px",
              borderRadius: 12,
              backgroundColor: a.on ? "rgba(59,130,246,0.14)" : "transparent",
              border: a.on ? "1px solid rgba(96,165,250,0.35)" : "1px solid transparent",
            }}
          >
            <Avatar letter={a.name[0]} tone={a.on ? "accent" : "magenta"} size={32} />
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <span style={{ fontSize: 15, fontWeight: 600, color: color.ink }}>{a.name}</span>
              <span style={{ fontSize: 12, color: color.muted }}>{a.model}</span>
            </div>
          </div>
        ))}
        <div style={{ marginTop: "auto" }}>
          <Pill tone="accent">+ Create agent</Pill>
        </div>
      </div>

      {/* Chat */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 26, gap: 18 }}>
        <div style={{ alignSelf: "flex-end", maxWidth: 520, backgroundColor: color.accent, color: "#fff", padding: "12px 16px", borderRadius: 16, borderBottomRightRadius: 4, fontSize: 16, lineHeight: 1.5 }}>
          Summarize our refund policy for EU customers and draft a reply.
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
          <Avatar letter="S" size={34} />
          <div style={{ display: "flex", flexDirection: "column", gap: 10, maxWidth: 640 }}>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <Pill tone="green" size={13}>
                <Dot tone="green" size={7} /> search_knowledge · Policies · 3 results
              </Pill>
              <Pill tone="amber" size={13}>
                <Dot tone="amber" size={7} /> run_code · sandbox
              </Pill>
              <Pill size={13}>Reasoning · 2.1s</Pill>
            </div>
            <div style={{ backgroundColor: color.surface2, border: `1px solid ${color.line}`, padding: "14px 16px", borderRadius: 16, borderTopLeftRadius: 4, fontSize: 16, lineHeight: 1.6, color: color.body }}>
              <span style={{ color: color.ink, fontWeight: 600 }}>Refunds for EU customers</span> are accepted within 14 days of delivery under the withdrawal right, plus our own 30-day guarantee. Items must be unused; return shipping is covered for defective goods.
              <div style={{ marginTop: 10, color: color.muted, fontSize: 14 }}>Sources: refund-policy-v4.pdf · eu-consumer-rights.md · faq.csv</div>
            </div>
          </div>
        </div>

        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 12, backgroundColor: color.surface2, border: `1px solid ${color.line}`, borderRadius: 14, padding: "14px 18px" }}>
          <span style={{ flex: 1, color: color.muted, fontSize: 16 }}>Message Support Assistant…</span>
          <Pill size={13}>Attach</Pill>
          <span style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: color.accent, display: "inline-flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 18 }}>↑</span>
        </div>
      </div>

      {/* Config */}
      <div style={{ width: 330, borderLeft: `1px solid ${color.line}`, padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
        <Label>CONFIGURATION</Label>
        <Card style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          <span style={{ fontSize: 12, color: color.muted }}>Model</span>
          <span style={{ fontSize: 15, fontWeight: 600, color: color.ink }}>Anthropic · claude-sonnet</span>
          <span style={{ fontSize: 12, color: color.muted }}>temperature 0.4 · ctx 32k · streaming</span>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: color.muted, display: "block", marginBottom: 8 }}>Knowledge (RAG)</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Pill tone="accent" size={13}>Policies · 128 docs</Pill>
            <Pill tone="accent" size={13}>Product FAQ</Pill>
          </div>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: color.muted, display: "block", marginBottom: 8 }}>Tools · MCP servers</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Pill size={13}>github</Pill>
            <Pill size={13}>jira</Pill>
            <Pill size={13}>postgres</Pill>
          </div>
        </Card>
        <Card>
          <span style={{ fontSize: 12, color: color.muted, display: "block", marginBottom: 8 }}>Skills</span>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            <Pill size={13}>pdf</Pill>
            <Pill size={13}>xlsx</Pill>
            <Pill size={13}>web-research</Pill>
          </div>
        </Card>
        <Card style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            ["Docker sandbox", true],
            ["Structured JSON output", true],
            ["Embeddable widget", true],
          ].map(([label, on]) => (
            <div key={String(label)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, color: color.body }}>{label}</span>
              <span style={{ width: 38, height: 22, borderRadius: 11, backgroundColor: on ? color.accent : color.line, position: "relative" }}>
                <span style={{ position: "absolute", top: 3, left: on ? 19 : 3, width: 16, height: 16, borderRadius: 8, backgroundColor: "#fff" }} />
              </span>
            </div>
          ))}
        </Card>
      </div>
    </Window>
    <div style={{ position: "absolute", left: 80, top: 24, fontFamily: font.display, fontWeight: 700, fontSize: 22, color: color.accentSoft, letterSpacing: 0.3 }}>
      AI Agents
    </div>
  </Backdrop>
);
