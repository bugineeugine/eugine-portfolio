// Every piece of text on the site lives here. Edit this file, not the components.
import { existsSync } from "node:fs";
import { join } from "node:path";

export type Link = { label: string; href: string; icon: string | null; monogram?: string };
export type NavLink = { label: string; href: string };
export type Fact = {
  icon: "location" | "availability" | "experience";
  label: string;
  value: string;
};

export type Profile = {
  name: string;
  role: string;
  roleSecondary: string;
  headline: string;
  headlineAccent: string;
  headlineTail: string;
  intro: string;
  bio: string;
  avatar: string;
  email: string;
  facts: Fact[];
  links: Link[];
};

export type Tech = { name: string; icon: string | null };

export type Project = {
  title: string;
  description: string;
  tech: string[];
  href: string | null;
  image: string | null;
};

export type Cta = { title: string; text: string; button: string };

const email = "eugine.rosillon@clicktekconsulting.com";

export const profile: Profile = {
  name: "Eugine Rosillon",
  role: "Full-Stack Developer",
  roleSecondary: "AI Automation Engineer",
  headline: "Building modern web apps and",
  headlineAccent: "AI-powered",
  headlineTail: "solutions.",
  intro:
    "I'm a developer who enjoys turning ideas into real products, from clean, responsive web applications to AI automation workflows and intelligent systems.",
  bio:
    "I'm a full-stack developer focused on building scalable web applications and AI-powered solutions. I enjoy working with modern technologies, writing clean and maintainable code, and exploring ways AI can make systems smarter and more efficient.",
  avatar: "/eugine-avatar.png",
  email,
  facts: [
    { icon: "location", label: "Location", value: "Philippines" },
    { icon: "availability", label: "Availability", value: "Open for opportunities" },
    { icon: "experience", label: "Experience", value: "4+ years" },
  ],
  links: [
    // PLACEHOLDER: replace GitHub and LinkedIn URLs with your real profiles.
    { label: "GitHub", href: "https://github.com/your-username", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username", icon: null, monogram: "in" },
    { label: "Email", href: `mailto:${email}`, icon: null },
  ],
};

export const navLinks: NavLink[] = [
  { label: "Home", href: "#home" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
];

// icon = file name under public/icons without .svg; null = monogram tile.
export const techStack: Tech[] = [
  { name: "Next.js", icon: "nextdotjs" },
  { name: "React", icon: "react" },
  { name: "TypeScript", icon: "typescript" },
  { name: "JavaScript", icon: "javascript" },
  { name: "HTML", icon: "html5" },
  { name: "CSS", icon: "css" },
  { name: "Tailwind CSS", icon: "tailwindcss" },
  { name: "Material UI", icon: "mui" },
  { name: "shadcn/ui", icon: "shadcnui" },
  { name: "Node.js", icon: "nodedotjs" },
  { name: "Hono", icon: "hono" },
  { name: "Express", icon: "express" },
  { name: "Python", icon: "python" },
  { name: "MongoDB", icon: "mongodb" },
  { name: "MySQL", icon: "mysql" },
  { name: "PostgreSQL", icon: "postgresql" },
  { name: "Redis", icon: "redis" },
  { name: "Qdrant", icon: "qdrant" },
  { name: "Drizzle", icon: "drizzle" },
  { name: "LangChain", icon: "langchain" },
  { name: "Anthropic", icon: "anthropic" },
  { name: "OpenAI", icon: "openai" },
  { name: "Ollama", icon: "ollama" },
  { name: "n8n", icon: "n8n" },
  { name: "Zapier", icon: "zapier" },
  { name: "Claude Code", icon: "claude" },
  { name: "Codex", icon: "codex" },
  { name: "Docker", icon: "docker" },
  { name: "Vercel", icon: "vercel" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
];

// Modules of a private AI agent platform (client work, so no public links).
// Thumbnails are rendered from the Remotion project in video/ (see README).
export const projects: Project[] = [
  {
    title: "AI Agents",
    description:
      "Build chat agents on Ollama or Anthropic models with custom prompts, MCP tools, skills, and RAG knowledge bases on pgvector. Optional Docker sandbox per agent for code execution, structured JSON output, and an embeddable chat widget.",
    tech: ["Next.js", "Hono", "LangChain", "PostgreSQL + pgvector", "Docker", "Ollama", "Anthropic"],
    href: null,
    image: "/projects/ai-agents.png",
  },
  {
    title: "Orchestrators",
    description:
      "Multi-agent orchestration: a lead model plans a request and delegates to specialist subagents. Live flow view of every run, step-by-step traces, per-run token and cost tracking, and optional sandboxed execution.",
    tech: ["Next.js", "Hono", "LangChain", "Anthropic", "Redis", "PostgreSQL"],
    href: null,
    image: "/projects/orchestrators.png",
  },
  {
    title: "Dev Teams",
    description:
      "Autonomous software teams: chat a project into a plan, then a planner splits it into tasks that Frontend, Backend, and QA agents build through the Claude Agent SDK in a continuous loop, with a kanban board, activity timeline, and live dev-server previews.",
    tech: ["Next.js", "Hono", "Claude Agent SDK", "PostgreSQL", "Redis", "Docker"],
    href: null,
    image: "/projects/dev-teams.png",
  },
];

export const cta: Cta = {
  title: "Interested in working together?",
  text: "I'm open to freelance, full-time, or collaboration opportunities.",
  button: "Send Message",
};

// Section titles, button labels, and other UI copy.
export const ui = {
  heroCta: "View My Projects",
  tech: { title: "Tech Stack", subtitle: "Technologies I work with" },
  projects: { title: "Featured Projects", subtitle: "Some of the projects I've built" },
  aboutTitle: "About Me",
  connectTitle: "Let's Connect",
};

// Guard: external hrefs must be absolute or mailto so no anchor points back at this page.
const externalLinks: { label: string; href: string }[] = [
  ...profile.links,
  ...projects.flatMap((p) => (p.href ? [{ label: p.title, href: p.href }] : [])),
];
for (const link of externalLinks) {
  if (!/^(https?:\/\/|mailto:)/.test(link.href)) {
    throw new Error(`portfolio.ts: invalid href for "${link.label}": ${link.href}`);
  }
}

// Guard: every icon slug must have a file in public/icons so a typo fails the build, not the page.
// This module is only imported by server components, so the filesystem is available.
const iconSlugs = [...techStack, ...profile.links]
  .map((item) => item.icon)
  .filter((slug): slug is string => slug !== null);
for (const slug of iconSlugs) {
  if (!existsSync(join(process.cwd(), "public", "icons", `${slug}.svg`))) {
    throw new Error(`portfolio.ts: missing icon file public/icons/${slug}.svg`);
  }
}
