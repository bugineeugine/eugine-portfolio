import type { CSSProperties, ReactNode } from "react";
import { Browser, Initial } from "./chrome";
import { font } from "./theme";

// Light dashboard theme (shadcn-style).
const c = {
  bg: "#f8fafc",
  panel: "#ffffff",
  line: "#e2e8f0",
  ink: "#0f172a",
  body: "#475569",
  muted: "#94a3b8",
  accent: "#2563eb",
  accentSoft: "#dbeafe",
  green: "#16a34a",
  greenSoft: "#dcfce7",
  amber: "#d97706",
  amberSoft: "#fef3c7",
};

const Tag = ({ children, tone = "gray" }: { children: ReactNode; tone?: "gray" | "blue" | "green" | "amber" }) => {
  const m = {
    gray: { bg: "#f1f5f9", fg: c.body },
    blue: { bg: c.accentSoft, fg: c.accent },
    green: { bg: c.greenSoft, fg: c.green },
    amber: { bg: c.amberSoft, fg: c.amber },
  }[tone];
  return (
    <span style={{ backgroundColor: m.bg, color: m.fg, fontSize: 12, fontWeight: 500, padding: "4px 9px", borderRadius: 6, whiteSpace: "nowrap" }}>{children}</span>
  );
};

const NavItem = ({ label, active }: { label: string; active?: boolean }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 8, backgroundColor: active ? "#eef2ff" : "transparent", color: active ? c.accent : c.body, fontSize: 14, fontWeight: active ? 600 : 500 }}>
    <span style={{ width: 16, height: 16, borderRadius: 4, backgroundColor: active ? c.accent : c.line }} />
    {label}
  </div>
);

const Section = ({ title, children, style }: { title: string; children: ReactNode; style?: CSSProperties }) => (
  <div style={{ border: `1px solid ${c.line}`, borderRadius: 10, backgroundColor: c.panel, padding: 14, ...style }}>
    <div style={{ fontSize: 12, fontWeight: 600, color: c.muted, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>{title}</div>
    {children}
  </div>
);

export const AiAgents = () => (
  <Browser url="localhost:3000/ai-agents/support-assistant" tab="Support Assistant · AI Agents" dark={false}>
    <div style={{ display: "flex", flex: 1, backgroundColor: c.bg, color: c.ink }}>
      {/* App nav */}
      <div style={{ width: 232, backgroundColor: c.panel, borderRight: `1px solid ${c.line}`, padding: 16, display: "flex", flexDirection: "column", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "6px 8px 18px" }}>
          <Initial letter="A" bg={c.accent} size={30} />
          <div>
            <div style={{ fontFamily: font.display, fontWeight: 700, fontSize: 15 }}>Console</div>
            <div style={{ fontSize: 11, color: c.muted }}>workspace · production</div>
          </div>
        </div>
        <NavItem label="Dashboard" />
        <NavItem label="AI Agents" active />
        <NavItem label="Orchestrators" />
        <NavItem label="Knowledge" />
        <NavItem label="Skills" />
        <NavItem label="MCP Servers" />
        <NavItem label="Embeddings" />
        <NavItem label="Settings" />
        <div style={{ marginTop: "auto", display: "flex", alignItems: "center", gap: 10, padding: 8, borderTop: `1px solid ${c.line}` }}>
          <Initial letter="E" bg="#0f172a" size={28} />
          <div style={{ fontSize: 12 }}>
            <div style={{ fontWeight: 600 }}>Eugine</div>
            <div style={{ color: c.muted }}>Admin</div>
          </div>
        </div>
      </div>

      {/* Page */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <div style={{ padding: "18px 28px 0", backgroundColor: c.panel, borderBottom: `1px solid ${c.line}` }}>
          <div style={{ fontSize: 12, color: c.muted, marginBottom: 8 }}>AI Agents / Support Assistant</div>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <Initial letter="S" bg={c.accent} size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: 22 }}>Support Assistant</span>
                <Tag tone="green">● Active</Tag>
              </div>
              <div style={{ fontSize: 13, color: c.body, marginTop: 2 }}>Answers customer questions from the policy knowledge base.</div>
            </div>
            <div style={{ display: "flex", gap: 8 }}>
              <span style={{ border: `1px solid ${c.line}`, borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 500 }}>Get embed code</span>
              <span style={{ backgroundColor: c.ink, color: "#fff", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 500 }}>Edit agent</span>
            </div>
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 16, fontSize: 14 }}>
            {["Chat", "Configure", "Knowledge", "Tools", "Logs"].map((t, i) => (
              <span key={t} style={{ paddingBottom: 10, borderBottom: i === 0 ? `2px solid ${c.ink}` : "2px solid transparent", color: i === 0 ? c.ink : c.body, fontWeight: i === 0 ? 600 : 500 }}>
                {t}
              </span>
            ))}
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
          {/* Chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", padding: 24, gap: 16 }}>
            <div style={{ alignSelf: "center", fontSize: 12, color: c.muted }}>Today, 10:42</div>
            <div style={{ alignSelf: "flex-end", maxWidth: 480, backgroundColor: c.accent, color: "#fff", padding: "10px 14px", borderRadius: 14, borderBottomRightRadius: 4, fontSize: 14, lineHeight: 1.5 }}>
              A customer in Germany wants to return headphones bought 20 days ago. What do we tell them?
            </div>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <Initial letter="S" bg={c.accent} size={30} />
              <div style={{ display: "flex", flexDirection: "column", gap: 8, maxWidth: 620 }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  <Tag tone="green">✓ search_knowledge · refund-policy-v4.pdf, eu-consumer-rights.md</Tag>
                  <Tag tone="amber">✓ lookup_order · #48211</Tag>
                </div>
                <div style={{ backgroundColor: c.panel, border: `1px solid ${c.line}`, padding: "12px 14px", borderRadius: 14, borderTopLeftRadius: 4, fontSize: 14, lineHeight: 1.6, color: c.ink }}>
                  Yes, they can return them. The order (#48211) was delivered 20 days ago, which is past the 14-day EU withdrawal right but inside our 30-day guarantee. Ask them to keep the original packaging; we cover return shipping for defective items, otherwise it is €4.90.
                  <div style={{ marginTop: 8, fontSize: 12, color: c.muted }}>Sources: refund-policy-v4.pdf p.3 · eu-consumer-rights.md</div>
                </div>
                <div style={{ display: "flex", gap: 10, fontSize: 12, color: c.muted }}>
                  <span>👍</span><span>👎</span><span>Copy</span><span>Regenerate</span>
                </div>
              </div>
            </div>
            <div style={{ marginTop: "auto", border: `1px solid ${c.line}`, borderRadius: 12, backgroundColor: c.panel, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ flex: 1, color: c.muted, fontSize: 14 }}>Ask Support Assistant…</span>
              <span style={{ fontSize: 12, color: c.muted }}>📎</span>
              <span style={{ width: 32, height: 32, borderRadius: 8, backgroundColor: c.ink, color: "#fff", display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>↑</span>
            </div>
          </div>

          {/* Right rail */}
          <div style={{ width: 320, borderLeft: `1px solid ${c.line}`, padding: 18, display: "flex", flexDirection: "column", gap: 12, backgroundColor: "#fbfcfd" }}>
            <Section title="Model">
              <div style={{ fontSize: 14, fontWeight: 600 }}>Anthropic · Claude Sonnet</div>
              <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>temperature 0.4 · 32k context · streaming on</div>
            </Section>
            <Section title="Knowledge collections">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, fontSize: 13 }}>
                {[["Refund & shipping policies", "128 chunks"], ["Product FAQ", "64 chunks"], ["Order lookup (SQL)", "live"]].map(([n, m]) => (
                  <div key={n} style={{ display: "flex", justifyContent: "space-between" }}>
                    <span>{n}</span><span style={{ color: c.muted }}>{m}</span>
                  </div>
                ))}
              </div>
            </Section>
            <Section title="Tools & skills">
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <Tag tone="blue">MCP · orders-db</Tag>
                <Tag tone="blue">MCP · zendesk</Tag>
                <Tag>skill · pdf</Tag>
                <Tag>skill · xlsx</Tag>
              </div>
            </Section>
            <Section title="Runtime">
              {[["Docker sandbox", true], ["Structured output", false], ["Public embed", true]].map(([l, on]) => (
                <div key={String(l)} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13, padding: "4px 0" }}>
                  <span>{l}</span>
                  <span style={{ width: 34, height: 20, borderRadius: 10, backgroundColor: on ? c.accent : c.line, position: "relative" }}>
                    <span style={{ position: "absolute", top: 2, left: on ? 16 : 2, width: 16, height: 16, borderRadius: 8, backgroundColor: "#fff" }} />
                  </span>
                </div>
              ))}
            </Section>
            <div style={{ fontSize: 12, color: c.muted }}>Last 24h: 1,284 messages · 98.2% answered</div>
          </div>
        </div>
      </div>
    </div>
  </Browser>
);
