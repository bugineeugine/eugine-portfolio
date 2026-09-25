# Eugine Portfolio Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a single-page, white, graph-paper-styled portfolio for Eugine Rosillon with all content in one data file.

**Architecture:** Next.js App Router, all server components. `src/data/portfolio.ts` holds every string; small components under `src/components/` render one section each; `src/app/page.tsx` composes them; `globals.css` owns the grid background and theme tokens.

**Tech Stack:** Next.js 16.3.6, React 19, TypeScript 5, Tailwind CSS 4, `next/font` (Geist Sans + Geist Mono, already wired), `next/image`. pnpm.

**Spec:** `docs/superpowers/specs/2026-09-25-portfolio-design.md`

## Global Constraints

- No new dependencies (runtime or dev). Tailwind 4 only for styling.
- White page (`#ffffff`); remove the scaffold's `prefers-color-scheme: dark` override.
- Text color `#171717`; grid line color `#e5e7eb` at reduced opacity; grid cell ~24px; single accent `#3b82f6`.
- Content column max-width ~720px, centered, 1px vertical rules on both edges.
- Geist Sans for body/headings, Geist Mono for section numbers, labels, tags.
- Avatar `public/eugine-avatar.png` rendered as a circle (~96px desktop, ~72px mobile) with 1px gray border via `next/image`.
- No shadows, gradients on content, filled cards, animation libraries, or dark-mode toggle.
- All copy lives in `src/data/portfolio.ts`; components never hard-code content.
- Placeholder project text uses the literal strings "Project One/Two/Three" and "Short description here." so they are easy to find.
- Verification for each task: `pnpm exec tsc --noEmit` and/or `pnpm build`; rendered-HTML checks grep `.next/server/app/index.html` (if absent after build, run `pnpm start` and `curl http://localhost:3000`).

## Review Focus

1. A skill group with an empty `skills` array should render the label with no tags and no crash. (Task 4 test.)
2. A project with no `links` should render no link row and no stray separator. (Task 5 test.)
3. Very long skill names must wrap inside the column at 375px without horizontal scroll (`flex-wrap` on tag rows). (Task 4 test.)
4. The avatar image must not stretch: `width`/`height` equal and `object-cover` applied. (Task 4 test.)
5. Every link `href` in the data must be a non-empty string starting with `http` or `mailto:` so no anchor points at the page itself. (Task 1 test.)

---

### Task 1: Content data file

**Files:**
- Create: `src/data/portfolio.ts`

**Interfaces:**
- Produces:
  ```ts
  export type Link = { label: string; href: string };
  export type Profile = { name: string; title: string; avatar: string; email: string; links: Link[] };
  export type SkillGroup = { label: string; skills: string[] };
  export type Project = { title: string; description: string; tech: string[]; links: Link[] };
  export type Service = { title: string; description: string };
  export const profile: Profile;
  export const skillGroups: SkillGroup[];
  export const projects: Project[];
  export const services: Service[];
  export const availability: string;
  ```

- [ ] **Step 1: Write the data file**

```ts
// src/data/portfolio.ts
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
```

- [ ] **Step 2: Add a compile-time link check**

Append to the bottom of `src/data/portfolio.ts`:

```ts
// Guard: every href must be absolute or a mailto so no anchor points back at this page.
const allLinks: Link[] = [...profile.links, ...projects.flatMap((p) => p.links)];
for (const link of allLinks) {
  if (!/^(https?:\/\/|mailto:)/.test(link.href)) {
    throw new Error(`portfolio.ts: invalid href for "${link.label}": ${link.href}`);
  }
}
```

- [ ] **Step 3: Type-check**

Run: `pnpm exec tsc --noEmit`
Expected: no output, exit code 0.

- [ ] **Step 4: Verify the guard fires**

Temporarily change the GitHub `href` to `"#"`, run `pnpm build`.
Expected: build fails with `invalid href for "GitHub": #`. Revert the change.

- [ ] **Step 5: Commit**

```bash
git add src/data/portfolio.ts
git commit -m "feat: add portfolio content data"
```

---

### Task 2: Global styles, layout, metadata

**Files:**
- Modify: `src/app/globals.css` (replace whole file)
- Modify: `src/app/layout.tsx`
- Modify: `src/app/page.tsx` (temporary stub)
- Delete: `public/next.svg`, `public/vercel.svg`, `public/file.svg`, `public/globe.svg`, `public/window.svg`
- Add: `public/eugine-avatar.png` (already on disk, untracked)

**Interfaces:**
- Produces Tailwind tokens usable in later tasks: `text-ink`, `text-muted`, `text-accent`, `border-line`, `divide-line`, `decoration-line`, `decoration-accent`, `font-sans`, `font-mono`.

- [ ] **Step 1: Replace `globals.css`**

```css
@import "tailwindcss";

@theme inline {
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  --color-ink: #171717;
  --color-muted: #6b7280;
  --color-line: #e5e7eb;
  --color-accent: #3b82f6;
}

html {
  background-color: #ffffff;
}

body {
  color: var(--color-ink);
  background-color: #ffffff;
  /* Graph-paper grid: two 1px lines repeating every 24px. */
  background-image:
    linear-gradient(to right, rgb(229 231 235 / 0.7) 1px, transparent 1px),
    linear-gradient(to bottom, rgb(229 231 235 / 0.7) 1px, transparent 1px);
  background-size: 24px 24px;
  font-family: var(--font-sans), system-ui, sans-serif;
}
```

- [ ] **Step 2: Update `layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { profile } from "@/data/portfolio";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: profile.name,
  description: profile.title,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full">{children}</body>
    </html>
  );
}
```

- [ ] **Step 3: Remove scaffold SVGs, track the avatar**

```bash
git rm public/next.svg public/vercel.svg public/file.svg public/globe.svg public/window.svg
git add public/eugine-avatar.png
```

- [ ] **Step 4: Temporarily stub `page.tsx` so the build passes**

Replace `src/app/page.tsx` with:

```tsx
export default function Home() {
  return <main />;
}
```

- [ ] **Step 5: Build and check head**

Run: `pnpm build`
Expected: success. Then:
```bash
grep -o "<title>[^<]*</title>" .next/server/app/index.html
grep -c "prefers-color-scheme" .next/static/css/*.css || true
```
Expected: `<title>Eugine Rosillon</title>`; the second grep prints `0` (no dark-mode override left).

- [ ] **Step 6: Commit**

```bash
git add src/app/globals.css src/app/layout.tsx src/app/page.tsx public
git commit -m "feat: graph-paper base styles, metadata, remove scaffold assets"
```

---

### Task 3: Section and Tag primitives

**Files:**
- Create: `src/components/Section.tsx`
- Create: `src/components/Tag.tsx`

**Interfaces:**
- Produces:
  ```ts
  export function Section(props: { number: string; title: string; id?: string; children: React.ReactNode }): JSX.Element;
  export function Tag(props: { children: React.ReactNode }): JSX.Element;
  ```

- [ ] **Step 1: Write `Section.tsx`**

```tsx
import type { ReactNode } from "react";

type SectionProps = {
  number: string;
  title: string;
  id?: string;
  children: ReactNode;
};

export function Section({ number, title, id, children }: SectionProps) {
  return (
    <section id={id} className="border-t border-line py-12">
      <div className="mb-8 flex items-baseline gap-4">
        <span className="font-mono text-xs text-muted">{number}</span>
        <h2 className="text-sm font-medium uppercase tracking-[0.2em] text-ink">
          {title}
        </h2>
      </div>
      {children}
    </section>
  );
}
```

- [ ] **Step 2: Write `Tag.tsx`**

```tsx
import type { ReactNode } from "react";

export function Tag({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block border border-line bg-white px-2 py-0.5 font-mono text-xs leading-5 text-ink">
      {children}
    </span>
  );
}
```

- [ ] **Step 3: Type-check and lint**

Run: `pnpm exec tsc --noEmit && pnpm lint`
Expected: both exit 0.

- [ ] **Step 4: Commit**

```bash
git add src/components/Section.tsx src/components/Tag.tsx
git commit -m "feat: add Section and Tag primitives"
```

---

### Task 4: Intro and Skills sections, page shell

**Files:**
- Create: `src/components/Intro.tsx`
- Create: `src/components/Skills.tsx`
- Modify: `src/app/page.tsx` (replace whole file)

**Interfaces:**
- Consumes: `profile`, `skillGroups` from `@/data/portfolio`; `Section`, `Tag` from Task 3.
- Produces: `Intro()` and `Skills()` components with no props, and the page wrapper that Task 5 extends.

- [ ] **Step 1: Write `Intro.tsx`**

```tsx
import Image from "next/image";
import { profile } from "@/data/portfolio";

export function Intro() {
  return (
    <header className="flex flex-col gap-6 py-16 sm:flex-row sm:items-center sm:gap-8">
      <Image
        src={profile.avatar}
        alt={`Avatar of ${profile.name}`}
        width={96}
        height={96}
        priority
        className="h-18 w-18 shrink-0 rounded-full border border-line object-cover sm:h-24 sm:w-24"
      />
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-ink">
          {profile.name}
        </h1>
        <p className="mt-1 max-w-md text-muted">{profile.title}</p>
        <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-1 font-mono text-sm">
          {profile.links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                className="underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Write `Skills.tsx`**

```tsx
import { skillGroups } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";

export function Skills() {
  return (
    <Section number="01" title="Skills" id="skills">
      <dl className="flex flex-col gap-6">
        {skillGroups.map((group) => (
          <div key={group.label} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6">
            <dt className="font-mono text-xs uppercase tracking-wider text-muted sm:pt-1">
              {group.label}
            </dt>
            <dd className="flex flex-wrap gap-1.5">
              {group.skills.map((skill) => (
                <Tag key={skill}>{skill}</Tag>
              ))}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
```

- [ ] **Step 3: Replace `page.tsx`**

```tsx
import { Intro } from "@/components/Intro";
import { Skills } from "@/components/Skills";

export default function Home() {
  return (
    <div className="mx-auto min-h-screen w-full max-w-[720px] border-x border-line px-6 sm:px-10">
      <Intro />
      <main>
        <Skills />
      </main>
    </div>
  );
}
```

- [ ] **Step 4: Build and check rendered output**

Run: `pnpm build`
Then:
```bash
grep -c "Eugine Rosillon" .next/server/app/index.html
grep -o "rounded-full[^\"]*" .next/server/app/index.html | head -1
grep -o "shadcn/ui\|Claude Code\|pgvector" .next/server/app/index.html | sort -u
```
Expected: count >= 1; the class string contains `object-cover`; all three skill names print.

- [ ] **Step 5: Empty-group and wrap check (Review Focus 1 and 3)**

Temporarily add `{ label: "Empty", skills: [] }` to `skillGroups` and rename `"Tool calling"` to `"Tool calling with very long descriptive name for wrapping"`. Run `pnpm build`.
Expected: build passes; `grep -c ">Empty<" .next/server/app/index.html` prints 1. Revert both edits.

- [ ] **Step 6: Visual check**

Run `pnpm dev`, open http://localhost:3000 at desktop width and at 375px (browser devtools). Confirm: grid visible but faint, vertical rules on column edges, avatar is a circle, tags wrap, no horizontal scrollbar. Stop the dev server.

- [ ] **Step 7: Commit**

```bash
git add src/components/Intro.tsx src/components/Skills.tsx src/app/page.tsx
git commit -m "feat: intro and skills sections"
```

---

### Task 5: Projects, Services, Contact sections

**Files:**
- Create: `src/components/Projects.tsx`
- Create: `src/components/Services.tsx`
- Create: `src/components/Contact.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: `projects`, `services`, `profile`, `availability` from `@/data/portfolio`; `Section`, `Tag`.
- Produces: `Projects()`, `Services()`, `Contact()` components with no props.

- [ ] **Step 1: Write `Projects.tsx`**

```tsx
import { projects } from "@/data/portfolio";
import { Section } from "@/components/Section";
import { Tag } from "@/components/Tag";

export function Projects() {
  return (
    <Section number="02" title="Projects" id="projects">
      <ul className="divide-y divide-line">
        {projects.map((project) => (
          <li key={project.title} className="py-6 first:pt-0 last:pb-0">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-medium text-ink">{project.title}</h3>
              {project.links.length > 0 && (
                <ul className="flex gap-4 font-mono text-xs">
                  {project.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <p className="mt-1 text-sm text-muted">{project.description}</p>
            <div className="mt-3 flex flex-wrap gap-1.5">
              {project.tech.map((tech) => (
                <Tag key={tech}>{tech}</Tag>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
```

- [ ] **Step 2: Write `Services.tsx`**

```tsx
import { services } from "@/data/portfolio";
import { Section } from "@/components/Section";

export function Services() {
  return (
    <Section number="03" title="Services" id="services">
      <ol className="flex flex-col gap-6">
        {services.map((service, index) => (
          <li key={service.title} className="grid gap-2 sm:grid-cols-[140px_1fr] sm:gap-6">
            <span className="font-mono text-xs text-muted sm:pt-1">
              {String(index + 1).padStart(2, "0")}
            </span>
            <div>
              <h3 className="font-medium text-ink">{service.title}</h3>
              <p className="mt-1 text-sm leading-6 text-muted">{service.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
```

- [ ] **Step 3: Write `Contact.tsx`**

```tsx
import { availability, profile } from "@/data/portfolio";
import { Section } from "@/components/Section";

export function Contact() {
  return (
    <Section number="04" title="Contact" id="contact">
      <p className="text-ink">{availability}</p>
      <a
        href={`mailto:${profile.email}`}
        className="mt-2 inline-block font-mono text-sm underline decoration-line underline-offset-4 hover:text-accent hover:decoration-accent"
      >
        {profile.email}
      </a>
    </Section>
  );
}
```

- [ ] **Step 4: Update `page.tsx`**

```tsx
import { Intro } from "@/components/Intro";
import { Skills } from "@/components/Skills";
import { Projects } from "@/components/Projects";
import { Services } from "@/components/Services";
import { Contact } from "@/components/Contact";
import { profile } from "@/data/portfolio";

export default function Home() {
  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[720px] flex-col border-x border-line px-6 sm:px-10">
      <Intro />
      <main className="flex-1">
        <Skills />
        <Projects />
        <Services />
        <Contact />
      </main>
      <footer className="border-t border-line py-6 font-mono text-xs text-muted">
        &copy; {new Date().getFullYear()} {profile.name}
      </footer>
    </div>
  );
}
```

- [ ] **Step 5: Build and check rendered output**

Run: `pnpm build`
Then:
```bash
grep -o "Project One\|Project Two\|Project Three" .next/server/app/index.html | sort -u
grep -c "Open for freelance" .next/server/app/index.html
grep -o "mailto:[^\"]*" .next/server/app/index.html | sort -u
grep -o ">0[1-4]<" .next/server/app/index.html | sort -u
```
Expected: three project titles; count 1; one mailto address; `>01<` through `>04<`.

- [ ] **Step 6: No-links project check (Review Focus 2)**

"Project Three" has `links: []`. Confirm no link list follows its heading:
```bash
grep -o "Project Three</h3>[^<]*<[a-z/]*" .next/server/app/index.html
```
Expected: the tag following `</h3>` is `</div` or `<p`, not `<ul`.

- [ ] **Step 7: Visual check**

Run `pnpm dev`, open http://localhost:3000. Confirm sections stack with 1px rules, footer sits at the bottom, links turn blue on hover, layout holds at 375px. Stop the server.

- [ ] **Step 8: Commit**

```bash
git add src/components/Projects.tsx src/components/Services.tsx src/components/Contact.tsx src/app/page.tsx
git commit -m "feat: projects, services, contact sections and footer"
```

---

### Task 6: Final verification and README

**Files:**
- Modify: `README.md` (replace scaffold text)

- [ ] **Step 1: Replace `README.md`**

````md
# Eugine Rosillon - Portfolio

Single-page portfolio built with Next.js 16, TypeScript, and Tailwind CSS 4.

## Edit content

All text lives in `src/data/portfolio.ts`: profile, links, skills, projects, services.
Replace the `PLACEHOLDER` entries (GitHub/LinkedIn URLs and the three projects) with real ones.

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

- [ ] **Step 2: Full check**

Run: `pnpm lint && pnpm exec tsc --noEmit && pnpm build`
Expected: all exit 0.

- [ ] **Step 3: Confirm no scaffold leftovers**

```bash
grep -rn "Create Next App\|create next app\|vercel.com/templates" src README.md || echo "clean"
git status --short
```
Expected: `clean`; only `README.md` modified.

- [ ] **Step 4: Commit**

```bash
git add README.md
git commit -m "docs: portfolio README"
```
