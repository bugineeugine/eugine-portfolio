// Every piece of text on the site lives here. Edit this file, not the components.

export type Link = { label: string; href: string };

export type Profile = {
  name: string;
  title: string;
  avatar: string;
  email: string;
  links: Link[];
};

export type SkillGroup = { label: string; skills: string[] };

export type Project = {
  title: string;
  description: string;
  tech: string[];
  links: Link[];
};

export type Service = { title: string; description: string };

export const profile: Profile = {
  name: "Eugine Rosillon",
  title: "Full-stack developer building web apps and AI automations.",
  avatar: "/eugine-avatar.png",
  email: "eugine.rosillon@clicktekconsulting.com",
  links: [
    // PLACEHOLDER: replace GitHub and LinkedIn URLs with your real profiles.
    { label: "GitHub", href: "https://github.com/your-username" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username" },
    { label: "Email", href: "mailto:eugine.rosillon@clicktekconsulting.com" },
  ],
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Frontend",
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "JavaScript",
      "HTML",
      "CSS",
      "Tailwind CSS",
      "Material UI",
      "shadcn/ui",
    ],
  },
  {
    label: "Backend",
    skills: ["Node.js", "Hono", "Express", "REST API", "Python"],
  },
  {
    label: "Data",
    skills: ["PostgreSQL", "MySQL", "MongoDB", "Redis", "Qdrant", "pgvector", "Drizzle"],
  },
  {
    label: "AI & Automation",
    skills: [
      "LangChain",
      "Anthropic API",
      "OpenAI API",
      "Ollama",
      "Embeddings",
      "Tool calling",
      "n8n",
      "Zapier",
      "Claude Code",
      "Codex",
    ],
  },
  {
    label: "Tools & Deploy",
    skills: ["Git", "GitHub", "Docker", "Vercel", "VPS"],
  },
];

export const projects: Project[] = [
  // PLACEHOLDER: replace these three with real projects.
  {
    title: "Project One",
    description: "Short description here.",
    tech: ["Next.js", "PostgreSQL", "Drizzle"],
    links: [
      { label: "Live", href: "https://example.com" },
      { label: "Code", href: "https://github.com/your-username/project-one" },
    ],
  },
  {
    title: "Project Two",
    description: "Short description here.",
    tech: ["Hono", "Anthropic API", "Qdrant"],
    links: [{ label: "Code", href: "https://github.com/your-username/project-two" }],
  },
  {
    title: "Project Three",
    description: "Short description here.",
    tech: ["n8n", "Node.js", "Redis"],
    links: [],
  },
];

export const services: Service[] = [
  {
    title: "Web applications",
    description:
      "Full-stack apps with Next.js, TypeScript, and a Postgres or MongoDB backend. From landing page to dashboard.",
  },
  {
    title: "AI integration",
    description:
      "Chat assistants, RAG over your documents, and tool-calling agents using Anthropic, OpenAI, or local models with Ollama.",
  },
  {
    title: "Automation",
    description:
      "Workflows with n8n, Zapier, or custom Node.js services that connect your tools and remove repetitive work.",
  },
];

export const availability = "Open for freelance and full-time work.";

// Guard: every href must be absolute or a mailto so no anchor points back at this page.
const allLinks: Link[] = [...profile.links, ...projects.flatMap((p) => p.links)];
for (const link of allLinks) {
  if (!/^(https?:\/\/|mailto:)/.test(link.href)) {
    throw new Error(`portfolio.ts: invalid href for "${link.label}": ${link.href}`);
  }
}
