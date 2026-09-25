import { Avatar, Backdrop, Card, Dot, Label, Pill, Window } from "./ui";
import { color, font } from "./theme";

const roster: { name: string; role: string; tone: "accent" | "magenta" | "green" | "amber"; state: "working" | "idle" }[] = [
  { name: "Planner", role: "splits PLAN.md into tasks", tone: "accent", state: "idle" },
  { name: "Frontend", role: "Next.js · UI tasks", tone: "magenta", state: "working" },
  { name: "Backend", role: "API · database", tone: "green", state: "working" },
  { name: "QA", role: "tests · review", tone: "amber", state: "idle" },
];

type Task = { title: string; who?: string; tone?: "accent" | "magenta" | "green" | "amber" };
const columns: { name: string; count: number; tasks: Task[] }[] = [
  {
    name: "To do",
    count: 3,
    tasks: [{ title: "Low-stock email alerts" }, { title: "CSV import for products" }, { title: "Role-based access" }],
  },
  {
    name: "In progress",
    count: 2,
    tasks: [
      { title: "Inventory table with filters", who: "Frontend", tone: "magenta" },
      { title: "POST /api/items + validation", who: "Backend", tone: "green" },
    ],
  },
  {
    name: "Done",
    count: 4,
    tasks: [
      { title: "Project scaffold + auth", who: "Backend", tone: "green" },
      { title: "Products schema + migration", who: "Backend", tone: "green" },
      { title: "Dashboard layout", who: "Frontend", tone: "magenta" },
      { title: "12 tests passing", who: "QA", tone: "amber" },
    ],
  },
];

export const DevTeams = () => (
  <Backdrop>
    <Window title="Dev Teams" crumb="Inventory App · build #3" style={{ left: 80, top: 70, width: 1440, height: 760 }}>
      {/* Roster */}
      <div style={{ width: 290, borderRight: `1px solid ${color.line}`, padding: 18, display: "flex", flexDirection: "column", gap: 8 }}>
        <Label>TEAM</Label>
        {roster.map((m) => (
          <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 12px", borderRadius: 12, backgroundColor: m.state === "working" ? "rgba(255,255,255,0.03)" : "transparent" }}>
            <Avatar letter={m.name[0]} tone={m.tone} size={34} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: color.ink }}>{m.name}</div>
              <div style={{ fontSize: 12, color: color.muted }}>{m.role}</div>
            </div>
            <Dot tone={m.state === "working" ? "green" : "muted"} size={8} />
          </div>
        ))}
        <div style={{ marginTop: 16 }}>
          <Label>BUILD LOOP</Label>
          <Card style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, color: color.body }}>
              <span>Task 6 of 9</span>
              <span style={{ color: color.green }}>running</span>
            </div>
            <div style={{ height: 8, borderRadius: 4, backgroundColor: color.line }}>
              <div style={{ width: "62%", height: 8, borderRadius: 4, backgroundColor: color.accent }} />
            </div>
            <div style={{ fontSize: 12, color: color.muted }}>Claude Code · session resumed · 41 min</div>
          </Card>
        </div>
        <div style={{ marginTop: "auto", display: "flex", gap: 6 }}>
          <Pill tone="green" size={12}><Dot tone="green" size={6} /> preview :3001</Pill>
          <Pill size={12}>Pause</Pill>
        </div>
      </div>

      {/* Kanban */}
      <div style={{ flex: 1, padding: 22, display: "flex", gap: 16 }}>
        {columns.map((c) => (
          <div key={c.name} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0 4px" }}>
              <span style={{ fontFamily: font.display, fontWeight: 600, fontSize: 16, color: color.ink }}>{c.name}</span>
              <span style={{ fontSize: 12, color: color.muted }}>{c.count}</span>
            </div>
            {c.tasks.map((t) => (
              <Card key={t.title} style={{ padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                <span style={{ fontSize: 14, color: color.ink, lineHeight: 1.4 }}>{t.title}</span>
                {t.who ? (
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <Avatar letter={t.who[0]} tone={t.tone} size={20} />
                    <span style={{ fontSize: 12, color: color.muted }}>{t.who}</span>
                  </div>
                ) : (
                  <span style={{ fontSize: 12, color: color.muted }}>unassigned</span>
                )}
              </Card>
            ))}
          </div>
        ))}
      </div>

      {/* Activity */}
      <div style={{ width: 340, borderLeft: `1px solid ${color.line}`, padding: 18, display: "flex", flexDirection: "column", gap: 4 }}>
        <Label>ACTIVITY</Label>
        {[
          ["Planner", "Wrote PLAN.md and split it into 9 tasks", "accent", "10:02"],
          ["Backend", "Added products table + migration", "green", "10:19"],
          ["Frontend", "Dashboard layout shipped", "magenta", "10:31"],
          ["QA", "12 tests passing, 0 failing", "amber", "10:40"],
          ["Backend", "Working on POST /api/items", "green", "10:44"],
          ["Frontend", "Working on inventory table filters", "magenta", "10:45"],
          ["System", "Dev server ready on port 3001", "muted", "10:46"],
        ].map(([who, what, tone, t], i) => (
          <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", padding: "9px 0", borderBottom: `1px solid ${color.line}` }}>
            <Dot tone={tone as "accent" | "green" | "magenta" | "amber" | "muted"} size={8} />
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
      Dev Teams
    </div>
  </Backdrop>
);
