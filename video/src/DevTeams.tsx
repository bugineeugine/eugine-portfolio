import type { ReactNode } from "react";
import { Browser, Initial } from "./chrome";
import { font } from "./theme";

// Dark zinc build console: analysis → auto-picked agents → build log + live preview.
const c = {
  bg: "#18181b",
  panel: "#1f1f23",
  panel2: "#26262b",
  line: "#2e2e34",
  ink: "#fafafa",
  body: "#a1a1aa",
  muted: "#71717a",
  accent: "#22c55e",
  blue: "#60a5fa",
  amber: "#f59e0b",
  violet: "#a78bfa",
  pink: "#f472b6",
};

const Step = ({ label, state }: { label: string; state: "done" | "active" | "todo" }) => (
  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
    <span style={{ width: 20, height: 20, borderRadius: 10, display: "inline-flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, backgroundColor: state === "done" ? c.accent : state === "active" ? c.blue : c.panel2, color: state === "todo" ? c.muted : "#0b0f17", border: state === "todo" ? `1px solid ${c.line}` : "none" }}>
      {state === "done" ? "✓" : state === "active" ? "▶" : ""}
    </span>
    <span style={{ fontSize: 13, color: state === "todo" ? c.muted : c.ink, fontWeight: state === "active" ? 600 : 500 }}>{label}</span>
  </div>
);

const Box = ({ title, right, children, style }: { title: string; right?: ReactNode; children: ReactNode; style?: React.CSSProperties }) => (
  <div style={{ backgroundColor: c.panel, border: `1px solid ${c.line}`, borderRadius: 10, display: "flex", flexDirection: "column", minHeight: 0, ...style }}>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", borderBottom: `1px solid ${c.line}`, fontSize: 12, fontWeight: 600, color: c.body, textTransform: "uppercase", letterSpacing: 0.5 }}>
      <span>{title}</span>
      {right}
    </div>
    <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10, minHeight: 0, flex: 1 }}>{children}</div>
  </div>
);

const picked = [
  { name: "Next.js Frontend Engineer", why: "App Router + Tailwind detected in PLAN.md", color: c.pink, letter: "F" },
  { name: "Hono API Engineer", why: "REST endpoints + Drizzle schema in scope", color: c.blue, letter: "B" },
  { name: "Postgres Data Modeler", why: "5 tables, 2 relations, migrations needed", color: c.violet, letter: "D" },
  { name: "QA & Test Writer", why: "Vitest + Playwright requested", color: c.amber, letter: "Q" },
];

export const DevTeams = () => (
  <Browser url="localhost:3000/dev-teams/projects/inventory-app" tab="Inventory App · Dev Teams" dark>
    <div style={{ display: "flex", flex: 1, flexDirection: "column", backgroundColor: c.bg, color: c.ink }}>
      {/* Project header */}
      <div style={{ padding: "14px 22px", borderBottom: `1px solid ${c.line}`, backgroundColor: c.panel, display: "flex", alignItems: "center", gap: 16 }}>
        <Initial letter="I" bg={c.accent} fg="#0b0f17" size={36} radius={8} />
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontFamily: font.display, fontWeight: 700, fontSize: 18 }}>Inventory App</span>
            <span style={{ fontSize: 11, fontWeight: 600, color: c.accent, border: `1px solid ${c.accent}66`, backgroundColor: `${c.accent}1a`, padding: "3px 8px", borderRadius: 999 }}>● AUTONOMOUS · building</span>
          </div>
          <div style={{ fontSize: 12, color: c.muted, marginTop: 2 }}>Build #3 · started 41 min ago · Claude Agent</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", gap: 28 }}>
          <Step label="Analyze project" state="done" />
          <Step label="Pick agents" state="done" />
          <Step label="Plan tasks" state="done" />
          <Step label="Build" state="active" />
          <Step label="Test & review" state="todo" />
          <Step label="Ship" state="todo" />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 13, padding: "7px 12px", borderRadius: 8, border: `1px solid ${c.line}`, color: c.body }}>Pause</span>
          <span style={{ fontSize: 13, padding: "7px 12px", borderRadius: 8, backgroundColor: c.ink, color: "#0b0f17", fontWeight: 600 }}>Open preview</span>
        </div>
      </div>

      {/* Body */}
      <div style={{ display: "grid", gridTemplateColumns: "400px 1fr 470px", gap: 14, padding: 14, flex: 1, minHeight: 0 }}>
        {/* Left: analysis + picked agents */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, minHeight: 0 }}>
          <Box title="Project analysis" right={<span style={{ color: c.accent, textTransform: "none" }}>done · 12s</span>}>
            <div style={{ fontSize: 13, color: c.body, lineHeight: 1.55 }}>
              Read the brief and PLAN.md, detected a <span style={{ color: c.ink }}>Next.js 16 + Hono + Postgres</span> stack with auth, product CRUD, CSV import and low-stock alerts. Split into <span style={{ color: c.ink }}>9 tasks</span> across 3 milestones.
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["Next.js 16", "Hono", "Drizzle", "Postgres", "Tailwind", "Vitest"].map((t) => (
                <span key={t} style={{ fontSize: 11, color: c.body, backgroundColor: c.panel2, padding: "3px 8px", borderRadius: 6 }}>{t}</span>
              ))}
            </div>
          </Box>
          <Box title="Agents selected automatically" right={<span style={{ textTransform: "none", color: c.muted }}>4 of 23 in library</span>} style={{ flex: 1 }}>
            {picked.map((a) => (
              <div key={a.name} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Initial letter={a.letter} bg={a.color} fg="#0b0f17" size={30} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{a.name}</div>
                  <div style={{ fontSize: 12, color: c.muted }}>{a.why}</div>
                </div>
              </div>
            ))}
            <div style={{ fontSize: 12, color: c.muted, borderTop: `1px solid ${c.line}`, paddingTop: 10 }}>Roster is re-evaluated after every milestone.</div>
          </Box>
        </div>

        {/* Middle: build log */}
        <Box title="Build log" right={<span style={{ color: c.blue, textTransform: "none" }}>task 6 / 9 · running</span>}>
          <div style={{ fontFamily: "ui-monospace, Menlo, Consolas, monospace", fontSize: 12, lineHeight: 1.75, color: c.body, display: "flex", flexDirection: "column" }}>
            {[
              ["10:02", c.accent, "planner", "wrote PLAN.md · 9 tasks · 3 milestones"],
              ["10:04", c.violet, "data", "created products, categories, stock_levels tables"],
              ["10:05", c.violet, "data", "drizzle-kit generate → 0003_stock_levels.sql ✓"],
              ["10:19", c.blue, "api", "POST /api/items · zod validation · 201/400"],
              ["10:21", c.amber, "qa", "vitest · 12 passed, 0 failed (3.1s)"],
              ["10:31", c.pink, "web", "dashboard layout + sidebar nav ✓"],
              ["10:44", c.blue, "api", "GET /api/items?low=true · index on stock_levels(qty)"],
              ["10:45", c.pink, "web", "inventory table: filters, sort, pagination"],
              ["10:46", c.muted, "system", "dev server ready → http://localhost:3001"],
              ["10:47", c.pink, "web", "▍ wiring low-stock badge to /api/items?low=true"],
            ].map(([t, col, who, msg], i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "44px 56px 1fr", gap: 10 }}>
                <span style={{ color: c.muted }}>{t}</span>
                <span style={{ color: col as string }}>{who}</span>
                <span style={{ color: i === 9 ? c.ink : c.body }}>{msg}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "auto", display: "flex", gap: 8 }}>
            {["Task 6: inventory table with filters", "web", "in progress"].map((t, i) => (
              <span key={t} style={{ fontSize: 12, color: i === 0 ? c.ink : c.body, backgroundColor: c.panel2, padding: "5px 10px", borderRadius: 6 }}>{t}</span>
            ))}
          </div>
        </Box>

        {/* Right: live preview */}
        <Box title="Live preview" right={<span style={{ color: c.accent, textTransform: "none" }}>● localhost:3001</span>}>
          <div style={{ flex: 1, backgroundColor: "#ffffff", borderRadius: 8, overflow: "hidden", display: "flex", color: "#0f172a", fontSize: 11 }}>
            <div style={{ width: 120, backgroundColor: "#f8fafc", borderRight: "1px solid #e2e8f0", padding: 10, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontWeight: 700, fontSize: 12, marginBottom: 6 }}>Inventory</div>
              {["Dashboard", "Products", "Stock", "Suppliers", "Reports"].map((n, i) => (
                <div key={n} style={{ padding: "5px 8px", borderRadius: 6, backgroundColor: i === 1 ? "#e0e7ff" : "transparent", color: i === 1 ? "#3730a3" : "#475569" }}>{n}</div>
              ))}
            </div>
            <div style={{ flex: 1, padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontWeight: 700, fontSize: 13 }}>Products</span>
                <span style={{ backgroundColor: "#0f172a", color: "#fff", padding: "4px 8px", borderRadius: 6 }}>+ Add product</span>
              </div>
              <div style={{ display: "flex", gap: 6 }}>
                {["All", "Low stock (4)", "Out of stock"].map((f, i) => (
                  <span key={f} style={{ padding: "3px 8px", borderRadius: 999, border: "1px solid #e2e8f0", backgroundColor: i === 1 ? "#fef3c7" : "#fff", color: i === 1 ? "#92400e" : "#475569" }}>{f}</span>
                ))}
              </div>
              <div style={{ border: "1px solid #e2e8f0", borderRadius: 6, overflow: "hidden" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr 0.8fr", backgroundColor: "#f8fafc", padding: "6px 8px", color: "#64748b", fontWeight: 600 }}>
                  <span>Name</span><span>SKU</span><span>Qty</span><span>Status</span>
                </div>
                {[["Wireless Headphones", "WH-2201", "3", "Low"], ["USB-C Hub 7-in-1", "HB-0710", "48", "OK"], ["Mechanical Keyboard", "KB-8801", "0", "Out"], ["27\" Monitor", "MN-2700", "12", "OK"], ["Laptop Stand", "LS-1100", "2", "Low"]].map(([n, s, q, st]) => (
                  <div key={s} style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr 0.7fr 0.8fr", padding: "6px 8px", borderTop: "1px solid #f1f5f9", alignItems: "center" }}>
                    <span>{n}</span><span style={{ color: "#64748b" }}>{s}</span><span>{q}</span>
                    <span style={{ color: st === "OK" ? "#15803d" : st === "Low" ? "#b45309" : "#b91c1c", fontWeight: 600 }}>{st}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Box>
      </div>
    </div>
  </Browser>
);
