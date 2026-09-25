# Eugine Portfolio v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Restyle the portfolio from the v1 graph-paper layout to the v2 modern card layout (navbar, dark hero with avatar, tech-stack icon grid, project cards, About/Connect/CTA sidebar).

**Architecture:** Same shape as v1: one typed data file, one component per block, `page.tsx` composes them, all server components. v1 components are deleted at the end. Brand icons are static SVGs under `public/icons/`.

**Tech Stack:** Next.js 16.3.6, React 19, TypeScript 5, Tailwind CSS 4, `next/font` (Geist), `next/image` (with `unoptimized` for SVG icons). pnpm. Branch `portfolio` (continues from v1 commits).

**Spec:** `docs/superpowers/specs/2026-09-25-portfolio-design.md` (v2)

## Global Constraints

- No new dependencies. Tailwind 4 only for styling. No runtime CDN for icons.
- Colors: page `#f8fafc`, heading ink `#0f172a`, body `#475569`, muted `#94a3b8`, line `#e5e7eb`, accent `#3b82f6`, accent-soft `#eff6ff`, navy `#0b1220`.
- Cards: white, 1px `line` border, `rounded-xl`, no shadows. Hero and CTA: navy background.
- Container `max-w-6xl`, padding `px-6 lg:px-8`.
- Geist Sans everywhere; Geist Mono only for project tech tags.
- Light theme only. No resume button. No Services section.
- All copy in `src/data/portfolio.ts`. Placeholders keep literal "Project One/Two/Three", "Short description here.", and `PLACEHOLDER` comments.
- Verification: `pnpm exec tsc --noEmit`, `pnpm lint`, `pnpm build`, greps on `.next/server/app/index.html`, headless Chrome screenshots (1280px direct; 375px via a local iframe page because headless Chrome clamps window width to ~500px).

## Review Focus

1. A `Tech` with `icon: null` renders a monogram tile, not a broken image. (Task 4 test.)
2. A `Project` with `image: null` renders the navy placeholder panel with its title; with `href: null` renders no arrow link. (Task 4 test.)
3. A `Link` with `icon: null` in the Connect card renders an inline glyph chosen by href prefix (mailto → envelope, else arrow), never an `<img>` with an empty src. (Task 5 test.)
4. Every icon slug referenced in data has a file in `public/icons/`; a typo must fail the check, not ship a 404. (Task 1 test.)
5. At 375px nothing overflows horizontally: nav center links hidden, hero stacks, tiles 3-up, cards 1-up, sidebar below main. (Task 5 screenshot.)

---

### Task 1: Icons and data v2

**Files:**
- Create: `public/icons/*.svg` (31 files)
- Modify: `src/data/portfolio.ts` (replace whole file)

**Interfaces:**
- Produces:
  ```ts
  export type Link = { label: string; href: string; icon: string | null };
  export type NavLink = { label: string; href: string };
  export type Fact = { icon: "location" | "availability" | "experience"; label: string; value: string };
  export type Profile = {
    name: string; role: string; roleSecondary: string;
    headline: string; headlineAccent: string; headlineTail: string;
    intro: string; bio: string; avatar: string; email: string;
    facts: Fact[]; links: Link[];
  };
  export type Tech = { name: string; icon: string | null };
  export type Project = { title: string; description: string; tech: string[]; href: string | null; image: string | null };
  export type Cta = { title: string; text: string; button: string };
  export const profile: Profile;
  export const navLinks: NavLink[];
  export const techStack: Tech[];
  export const projects: Project[];
  export const cta: Cta;
  ```

- [ ] **Step 1: Download icons**

```bash
mkdir -p public/icons
for s in nextdotjs react typescript javascript html5 css tailwindcss mui shadcnui nodedotjs hono express python mongodb mysql postgresql redis qdrant drizzle langchain anthropic ollama n8n zapier claude docker vercel git github; do
  curl -sf -o public/icons/$s.svg "https://cdn.simpleicons.org/$s" || echo "MISSING $s"
done
ls public/icons | wc -l
```
Expected: no `MISSING` lines; count `29`.

- [ ] **Step 2: Write the data file**

```ts
// Every piece of text on the site lives here. Edit this file, not the components.

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
```

- [ ] **Step 3: Type-check and run the guard**

Run: `pnpm exec tsc --noEmit && node src/data/portfolio.ts && echo data-ok`
Expected: `data-ok` (a Node module-type warning is fine).

- [ ] **Step 4: Icon file check (Review Focus 4)**

```bash
for s in $(grep -o 'icon: "[a-z0-9]*"' src/data/portfolio.ts | cut -d'"' -f2 | sort -u); do test -f public/icons/$s.svg || echo "MISSING $s"; done; echo icons-checked
```
Expected: only `icons-checked`. Then temporarily change `"react"` to `"reactx"` and rerun: expect `MISSING reactx`. Revert.

- [ ] **Step 5: Commit**

```bash
git add public/icons src/data/portfolio.ts
git commit -m "feat(v2): brand icons and data model"
```

---

### Task 2: Theme tokens and page stub

**Files:**
- Modify: `src/app/globals.css` (replace whole file)
- Modify: `src/app/page.tsx` (temporary stub; v1 components become unused but still compile)

**Interfaces:**
- Produces Tailwind tokens: `bg-page`, `text-ink`, `text-body`, `text-muted`, `border-line`, `divide-line`, `bg-accent`, `text-accent`, `border-accent`, `bg-accent-soft`, `bg-navy`.

- [ ] **Step 1: Replace `globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-page: #f8fafc;
  --color-ink: #0f172a;
  --color-body: #475569;
  --color-muted: #94a3b8;
  --color-line: #e5e7eb;
  --color-accent: #3b82f6;
  --color-accent-soft: #eff6ff;
  --color-navy: #0b1220;
}

html {
  background-color: var(--color-page);
  scroll-behavior: smooth;
}

body {
  color: var(--color-ink);
  background-color: var(--color-page);
  font-family: var(--font-sans), system-ui, sans-serif;
}
```

- [ ] **Step 2: Stub `page.tsx`**

```tsx
export default function Home() {
  return <main />;
}
```

- [ ] **Step 3: Build and check**

Run: `pnpm build`
```bash
cat .next/static/chunks/*.css | grep -c "background-size:24px" || true
grep -o "<title>[^<]*</title>" .next/server/app/index.html
```
Expected: `0` (grid gone); `<title>Eugine Rosillon</title>`.

- [ ] **Step 4: Commit**

```bash
git add src/app/globals.css src/app/page.tsx
git commit -m "feat(v2): theme tokens, drop graph-paper background"
```

---

### Task 3: Navbar, Hero, SectionHeading, Footer, page shell

**Files:**
- Create: `src/components/Navbar.tsx`, `src/components/Hero.tsx`, `src/components/SectionHeading.tsx`, `src/components/Footer.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile`, `navLinks` from `@/data/portfolio`.
- Produces: `Navbar()`, `Hero()`, `Footer()` (no props); `SectionHeading({ title, subtitle }: { title: string; subtitle: string })`.

- [ ] **Step 1: `Navbar.tsx`**

```tsx
import { navLinks, profile } from "@/data/portfolio";

export function Navbar() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-white/90 backdrop-blur">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6 lg:px-8">
        <a href="#home" className="flex items-center gap-2.5 font-semibold text-ink">
          <span className="h-6 w-6 rounded-md bg-accent" aria-hidden />
          {profile.name}
        </a>
        <ul className="hidden gap-8 text-sm font-medium text-body md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a href={link.href} className="hover:text-accent">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={`mailto:${profile.email}`}
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-white hover:bg-blue-500"
        >
          Get in Touch
        </a>
      </nav>
    </header>
  );
}
```

- [ ] **Step 2: `Hero.tsx`**

```tsx
import Image from "next/image";
import { profile } from "@/data/portfolio";

export function Hero() {
  return (
    <section id="home" className="bg-navy text-white">
      <div className="mx-auto grid max-w-6xl items-center gap-10 px-6 py-16 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-20">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-xs font-medium text-white/80">
            {profile.role}
            <span className="text-white/40" aria-hidden>
              /
            </span>
            {profile.roleSecondary}
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {profile.headline} <span className="text-accent">{profile.headlineAccent}</span>{" "}
            {profile.headlineTail}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/70">{profile.intro}</p>
          <a
            href="#projects"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white hover:bg-blue-500"
          >
            View My Projects
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
        <div className="justify-self-center">
          <Image
            src={profile.avatar}
            alt={`Avatar of ${profile.name}`}
            width={360}
            height={360}
            priority
            className="h-60 w-60 rounded-3xl object-cover ring-1 ring-white/10 lg:h-90 lg:w-90"
          />
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `SectionHeading.tsx`**

```tsx
type Props = { title: string; subtitle: string };

export function SectionHeading({ title, subtitle }: Props) {
  return (
    <div className="border-l-[3px] border-accent pl-4">
      <h2 className="text-xl font-bold text-ink">{title}</h2>
      <p className="mt-0.5 text-sm text-body">{subtitle}</p>
    </div>
  );
}
```

- [ ] **Step 4: `Footer.tsx`**

```tsx
import { profile } from "@/data/portfolio";

export function Footer() {
  return (
    <footer className="border-t border-line bg-white">
      <div className="mx-auto max-w-6xl px-6 py-6 text-sm text-body lg:px-8">
        &copy; {new Date().getFullYear()} {profile.name}
      </div>
    </footer>
  );
}
```

- [ ] **Step 5: `page.tsx`**

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="mx-auto max-w-6xl px-6 py-12 lg:px-8" />
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Build and check**

Run: `pnpm build`
```bash
H=.next/server/app/index.html
grep -o "Get in Touch\|View My Projects\|AI-powered\|Full-Stack Developer" $H | sort -u
grep -o 'href="#[a-z]*"' $H | sort -u
grep -c "prefers-color-scheme" .next/static/chunks/*.css || true
```
Expected: all four strings; hrefs `#about #home #projects #skills`; `0`.

- [ ] **Step 7: Commit**

```bash
git add src/components/Navbar.tsx src/components/Hero.tsx src/components/SectionHeading.tsx src/components/Footer.tsx src/app/page.tsx
git commit -m "feat(v2): navbar, hero, footer"
```

---

### Task 4: Tech stack and projects

**Files:**
- Create: `src/components/TechTile.tsx`, `src/components/TechStack.tsx`, `src/components/ProjectCard.tsx`, `src/components/Projects.tsx` (replace v1 file)
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `techStack`, `projects`, `Tech`, `Project` from data; `SectionHeading`.
- Produces: `TechTile({ tech }: { tech: Tech })`, `TechStack()`, `ProjectCard({ project }: { project: Project })`, `Projects()`.

- [ ] **Step 1: `TechTile.tsx`**

```tsx
import Image from "next/image";
import type { Tech } from "@/data/portfolio";

export function TechTile({ tech }: { tech: Tech }) {
  return (
    <li className="flex flex-col items-center gap-2 rounded-xl border border-line bg-white px-2 py-4">
      {tech.icon ? (
        <Image
          src={`/icons/${tech.icon}.svg`}
          alt=""
          width={32}
          height={32}
          unoptimized
          className="h-8 w-8"
        />
      ) : (
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-sm font-bold text-accent">
          {tech.name.charAt(0)}
        </span>
      )}
      <span className="text-center text-xs font-medium text-ink">{tech.name}</span>
    </li>
  );
}
```

- [ ] **Step 2: `TechStack.tsx`**

```tsx
import { techStack } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { TechTile } from "@/components/TechTile";

export function TechStack() {
  return (
    <section id="skills" className="scroll-mt-20">
      <SectionHeading title="Tech Stack" subtitle="Technologies I work with" />
      <ul className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6">
        {techStack.map((tech) => (
          <TechTile key={tech.name} tech={tech} />
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 3: `ProjectCard.tsx`**

```tsx
import Image from "next/image";
import type { Project } from "@/data/portfolio";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="overflow-hidden rounded-xl border border-line bg-white">
      <div className="relative aspect-video bg-navy">
        {project.image ? (
          <Image src={project.image} alt={project.title} fill className="object-cover" />
        ) : (
          <div className="flex h-full items-center justify-center text-sm font-medium text-white/60">
            {project.title}
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-4">
          <h3 className="border-l-[3px] border-accent pl-3 font-semibold text-ink">{project.title}</h3>
          {project.href && (
            <a
              href={project.href}
              className="text-body hover:text-accent"
              aria-label={`Open ${project.title}`}
            >
              &#8599;
            </a>
          )}
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 pl-3.5 font-mono text-[11px] text-muted">
          {project.tech.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <p className="mt-3 pl-3.5 text-sm leading-6 text-body">{project.description}</p>
      </div>
    </article>
  );
}
```

- [ ] **Step 4: `Projects.tsx` (replace v1)**

```tsx
import { projects } from "@/data/portfolio";
import { SectionHeading } from "@/components/SectionHeading";
import { ProjectCard } from "@/components/ProjectCard";

export function Projects() {
  return (
    <section id="projects" className="scroll-mt-20">
      <SectionHeading title="Featured Projects" subtitle="Some of the projects I've built" />
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        {projects.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `page.tsx`**

```tsx
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TechStack } from "@/components/TechStack";
import { Projects } from "@/components/Projects";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <main className="mx-auto grid max-w-6xl gap-8 px-6 py-12 lg:grid-cols-[1fr_360px] lg:px-8">
        <div className="flex flex-col gap-12">
          <TechStack />
          <Projects />
        </div>
        <aside className="flex flex-col gap-6" />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 6: Build and check (Review Focus 1 and 2)**

Run: `pnpm build`
```bash
H=.next/server/app/index.html
echo "icons: $(grep -o '/icons/[a-z0-9]*\.svg' $H | sort -u | wc -l)"
grep -o '>O</span>\|>C</span>' $H | sort -u
grep -o 'Project Three</div>' $H | head -1
grep -o 'aria-label="Open Project [A-Za-z]*"' $H | sort -u
```
Expected: icons `29` (OpenAI and Codex have none); both `>O</span>` and `>C</span>` monograms; `Project Three</div>` (placeholder panel text); arrows only for `Project One` and `Project Two`.

- [ ] **Step 7: Commit**

```bash
git add src/components/TechTile.tsx src/components/TechStack.tsx src/components/ProjectCard.tsx src/components/Projects.tsx src/app/page.tsx
git commit -m "feat(v2): tech stack grid and project cards"
```

---

### Task 5: Sidebar cards and screenshots

**Files:**
- Create: `src/components/AboutCard.tsx`, `src/components/ConnectCard.tsx`, `src/components/CtaCard.tsx`, `src/components/Glyph.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `profile`, `cta`, `Fact`, `Link` from data.
- Produces: `Glyph({ name, className }: { name: "location" | "availability" | "experience" | "mail" | "arrow"; className?: string })`, `AboutCard()`, `ConnectCard()`, `CtaCard()`.

- [ ] **Step 1: `Glyph.tsx`** (inline SVG set, `currentColor`)

```tsx
type GlyphName = "location" | "availability" | "experience" | "mail" | "arrow";

const paths: Record<GlyphName, string> = {
  location: "M12 21s-6-5.33-6-10a6 6 0 1 1 12 0c0 4.67-6 10-6 10Zm0-8a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
  availability: "M4 7h16v12H4V7Zm4-3h8v3H8V4Zm4 8v4",
  experience: "M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm0 4v5l3 2",
  mail: "M3 6h18v12H3V6Zm0 0 9 7 9-7",
  arrow: "M7 17 17 7M9 7h8v8",
};

export function Glyph({ name, className = "h-4 w-4" }: { name: GlyphName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d={paths[name]} />
    </svg>
  );
}
```

- [ ] **Step 2: `AboutCard.tsx`**

```tsx
import { profile } from "@/data/portfolio";
import { Glyph } from "@/components/Glyph";

export function AboutCard() {
  return (
    <section id="about" className="scroll-mt-20 rounded-xl border border-line bg-white p-6">
      <h2 className="border-l-[3px] border-accent pl-3 text-lg font-bold text-ink">About Me</h2>
      <p className="mt-4 text-sm leading-7 text-body">{profile.bio}</p>
      <dl className="mt-6 flex flex-col gap-4 border-t border-line pt-6">
        {profile.facts.map((fact) => (
          <div key={fact.label} className="flex items-center gap-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Glyph name={fact.icon} />
            </span>
            <dt className="w-24 text-sm text-body">{fact.label}</dt>
            <dd className="text-sm font-medium text-ink">{fact.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
```

- [ ] **Step 3: `ConnectCard.tsx`** (Review Focus 3: null icon → glyph by href prefix)

```tsx
import Image from "next/image";
import { profile } from "@/data/portfolio";
import { Glyph } from "@/components/Glyph";

export function ConnectCard() {
  return (
    <section className="rounded-xl border border-line bg-white p-6">
      <h2 className="border-l-[3px] border-accent pl-3 text-lg font-bold text-ink">Let&apos;s Connect</h2>
      <ul className="mt-4 flex flex-col gap-3">
        {profile.links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              className="flex items-center gap-3 text-sm font-medium text-ink hover:text-accent"
            >
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft text-accent">
                {link.icon ? (
                  <Image
                    src={`/icons/${link.icon}.svg`}
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                    className="h-4 w-4"
                  />
                ) : (
                  <Glyph name={link.href.startsWith("mailto:") ? "mail" : "arrow"} />
                )}
              </span>
              {link.label}
              <Glyph name="arrow" className="ml-auto h-3.5 w-3.5 text-muted" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 4: `CtaCard.tsx`**

```tsx
import { cta, profile } from "@/data/portfolio";
import { Glyph } from "@/components/Glyph";

export function CtaCard() {
  return (
    <section className="rounded-xl bg-navy p-6 text-white">
      <div className="flex gap-4">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent">
          <Glyph name="mail" className="h-5 w-5" />
        </span>
        <div>
          <h2 className="font-semibold">{cta.title}</h2>
          <p className="mt-1 text-sm leading-6 text-white/70">{cta.text}</p>
          <a
            href={`mailto:${profile.email}`}
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2 text-sm font-semibold hover:bg-blue-500"
          >
            {cta.button}
            <span aria-hidden>&rarr;</span>
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `page.tsx` sidebar**

Replace `<aside className="flex flex-col gap-6" />` with:

```tsx
<aside className="flex flex-col gap-6">
  <AboutCard />
  <ConnectCard />
  <CtaCard />
</aside>
```
and add imports:
```tsx
import { AboutCard } from "@/components/AboutCard";
import { ConnectCard } from "@/components/ConnectCard";
import { CtaCard } from "@/components/CtaCard";
```

- [ ] **Step 6: Build and check**

Run: `pnpm build`
```bash
H=.next/server/app/index.html
grep -o "About Me\|Let's Connect\|Interested in working together?\|Send Message\|Philippines" $H | sort -u
echo "link imgs: $(grep -o '/icons/github.svg' $H | wc -l)"   # 2: tech tile + connect row
grep -c 'src="/icons/.svg"\|src="/icons/null' $H || true
```
Expected: all five strings; `2`; `0`.

- [ ] **Step 7: Screenshots (Review Focus 5)**

```bash
pnpm start -p 3111 &   # or run in background
# desktop
chrome --headless=new --disable-gpu --hide-scrollbars --window-size=1280,2400 --screenshot=<ws>/v2-desktop.png http://localhost:3111/
# mobile via iframe
printf '<!doctype html><html><body style="margin:0;background:#888"><iframe src="http://localhost:3111/" width="375" height="3200" style="border:0;display:block"></iframe></body></html>' > <ws>/frame.html
chrome --headless=new --disable-gpu --hide-scrollbars --window-size=600,3200 --screenshot=<ws>/v2-mobile.png file:///<ws>/frame.html
```
Expected on inspection: navbar with name + button (center links hidden on mobile), navy hero with avatar (stacked on mobile), 6-up tiles desktop / 3-up mobile, 2-up cards desktop / 1-up mobile, sidebar to the right on desktop / below on mobile, no horizontal clipping.

- [ ] **Step 8: Commit**

```bash
git add src/components/Glyph.tsx src/components/AboutCard.tsx src/components/ConnectCard.tsx src/components/CtaCard.tsx src/app/page.tsx
git commit -m "feat(v2): about, connect, and CTA sidebar cards"
```

---

### Task 6: Remove v1 components, README, full check

**Files:**
- Delete: `src/components/Section.tsx`, `src/components/Tag.tsx`, `src/components/Intro.tsx`, `src/components/Skills.tsx`, `src/components/Services.tsx`, `src/components/Contact.tsx`
- Modify: `README.md`

- [ ] **Step 1: Delete v1 components**

```bash
git rm src/components/Section.tsx src/components/Tag.tsx src/components/Intro.tsx src/components/Skills.tsx src/components/Services.tsx src/components/Contact.tsx
grep -rn "components/Section\|components/Tag\|components/Intro\|components/Skills\|components/Services\|components/Contact\"" src || echo no-refs
```
Expected: `no-refs`.

- [ ] **Step 2: README**

````md
# Eugine Rosillon - Portfolio

Single-page portfolio built with Next.js 16, TypeScript, and Tailwind CSS 4.

## Edit content

All text lives in `src/data/portfolio.ts`: profile, facts, links, tech stack, projects, CTA.
Replace the `PLACEHOLDER` entries (GitHub/LinkedIn URLs, experience, and the three projects).
To show a project screenshot, put the image under `public/projects/` and set the project's `image` to its path.

Brand icons are Simple Icons SVGs (CC0) in `public/icons/`. Add one with
`curl -o public/icons/<slug>.svg https://cdn.simpleicons.org/<slug>` and reference the slug in `techStack`.

## Run

```bash
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # production build
pnpm lint
```

## Deploy

Push to GitHub and import the repo in Vercel. No environment variables are needed.
````

- [ ] **Step 3: Full check**

Run: `pnpm lint && pnpm exec tsc --noEmit && pnpm build`
Expected: all exit 0.
```bash
grep -rn "Create Next App\|vercel.com/templates" src README.md || echo clean
git status --short
```
Expected: `clean`; only README and deletions staged.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "chore(v2): remove v1 components, update README"
```
