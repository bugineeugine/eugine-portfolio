// Every piece of text on the site lives here. Edit this file, not the components.
import { existsSync } from "node:fs";
import { join } from "node:path";

export type Link = { label: string; href: string; icon: string | null };
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
    // PLACEHOLDER: adjust experience.
    { icon: "experience", label: "Experience", value: "1+ years (self-taught / freelance)" },
  ],
  links: [
    // PLACEHOLDER: replace GitHub and LinkedIn URLs with your real profiles.
    { label: "GitHub", href: "https://github.com/your-username", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-username", icon: null },
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
  { name: "OpenAI", icon: null },
  { name: "Ollama", icon: "ollama" },
  { name: "n8n", icon: "n8n" },
  { name: "Zapier", icon: "zapier" },
  { name: "Claude Code", icon: "claude" },
  { name: "Codex", icon: null },
  { name: "Docker", icon: "docker" },
  { name: "Vercel", icon: "vercel" },
  { name: "Git", icon: "git" },
  { name: "GitHub", icon: "github" },
];

export const projects: Project[] = [
  // PLACEHOLDER: replace these three with real projects. image = path under public/, e.g. "/projects/one.png".
  {
    title: "Project One",
    description: "Short description here.",
    tech: ["Next.js", "TypeScript", "PostgreSQL", "Drizzle"],
    href: "https://github.com/your-username/project-one",
    image: null,
  },
  {
    title: "Project Two",
    description: "Short description here.",
    tech: ["Hono", "Anthropic", "Qdrant"],
    href: "https://github.com/your-username/project-two",
    image: null,
  },
  {
    title: "Project Three",
    description: "Short description here.",
    tech: ["n8n", "Node.js", "Redis"],
    href: null,
    image: null,
  },
];

export const cta: Cta = {
  title: "Interested in working together?",
  text: "I'm open to freelance, full-time, or collaboration opportunities.",
  button: "Send Message",
};

// Section titles, button labels, and other UI copy.
export const ui = {
  navCta: "Get in Touch",
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
