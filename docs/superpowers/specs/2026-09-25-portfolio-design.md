# Eugine Portfolio — Design Spec (v2)

Date: 2026-09-25
Status: v2 supersedes v1 (white graph-paper layout). v1 was built through
Task 5 of the plan; v2 restyles the page to a modern card layout modeled on a
reference screenshot the user supplied, kept clean.

## Purpose

A single-page personal portfolio for Eugine Rosillon, aimed at both recruiters
(developer roles) and freelance clients (web apps, AI integration, automation).
Success: a visitor understands in under 10 seconds what Eugine builds, sees the
stack, sees sample projects, and can reach him by email or GitHub/LinkedIn.

## Decisions carried from the user

- Accent color: blue (matches the avatar's neon blue), not the reference's orange.
- Hero visual: the existing avatar (`public/eugine-avatar.png`), shown large.
  Its dark navy background becomes the hero background color.
- Light theme only. No dark-mode toggle.
- No "Download Resume" button (no PDF yet).
- Projects and some profile facts stay placeholders until Eugine supplies them.

## Look and feel

- Page background: very light gray (`#f8fafc`). Cards: white, 1px border
  (`#e5e7eb`), `rounded-xl`, no drop shadows. Text: `#0f172a` headings,
  `#475569` body.
- Accent blue `#3b82f6` for: primary buttons, the small vertical bar left of
  section headings, the highlighted word in the hero headline, hover states.
- Hero and CTA card: dark navy `#0b1220` background, white text.
- Fonts: Geist Sans everywhere. Geist Mono only for the small tech tags on
  project cards.
- Layout container: `max-w-6xl` (1152px), horizontal padding 24px on mobile,
  32px on desktop.
- No animation library, no new runtime dependencies.
- Brand icons: SVGs from Simple Icons (CC0) downloaded once into
  `public/icons/<slug>.svg` at build-authoring time. No CDN at runtime. A tech
  entry with `icon: null` renders a monogram tile (first letter, blue on
  `#eff6ff`) instead.

## Page structure (top to bottom)

1. **Navbar** — sticky, white, bottom border. Left: a small blue rounded
   square mark + "Eugine Rosillon". Center (hidden below `md`): anchor links
   Home, Projects, Skills, About. Right: "Get in Touch" blue pill button →
   `mailto:`.
2. **Hero** — full-width dark navy band. Two columns on `lg`, stacked on
   mobile. Left: a pill label ("Full-Stack Developer / AI Automation
   Engineer"), h1 "Building modern web apps and AI-powered solutions." with
   "AI-powered" in accent blue, one paragraph, one button "View My Projects"
   → `#projects`. Right: avatar in a `rounded-3xl` frame, ~360px on desktop,
   ~240px on mobile, with a 1px white/10% ring.
3. **Body** — two columns on `lg` (`1fr` + 360px sidebar), stacked on mobile.

   **Main column:**
   - **Tech Stack** (`id="skills"`) — heading with blue bar and subtitle
     "Technologies I work with". Grid of tiles (3 cols mobile, 4 on `sm`, 6 on
     `lg`): white card, icon 32px, label below. Order: Next.js, React,
     TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Material UI, shadcn/ui,
     Node.js, Hono, Express, Python, MongoDB, MySQL, PostgreSQL, Redis, Qdrant,
     Drizzle, LangChain, Anthropic, OpenAI (monogram), Ollama, n8n, Zapier,
     Claude Code, Codex (monogram), Docker, Vercel, Git, GitHub.
   - **Featured Projects** (`id="projects"`) — heading with blue bar and
     subtitle "Some of the projects I've built". 2-col grid of cards (1 col
     mobile). Card: 16:9 thumbnail (project `image` if set, else a dark navy
     placeholder panel with the title in white), then title with a small blue
     bar, a row of mono tech tags, a 2-line description, and an arrow link
     when `href` is set. Three placeholder projects.

   **Sidebar:**
   - **About Me** (`id="about"`) card — bio paragraph, then three rows with a
     small blue icon square: Location / Philippines, Availability / Open for
     opportunities, Experience / placeholder "1+ years (self-taught /
     freelance)".
   - **Let's Connect** card — GitHub, LinkedIn, Email as rows with the brand
     icon and an external-link arrow.
   - **CTA** card — dark navy: "Interested in working together?" + one line +
     "Send Message" blue button → `mailto:`.
4. **Footer** — light, thin top border: "© {year} Eugine Rosillon".

Services section from v1 is dropped: the CTA card carries the client-facing
message. Skill grouping labels from v1 are dropped in favor of the flat icon
grid.

## Code structure

```
src/
  app/
    layout.tsx        # fonts, metadata, body bg
    page.tsx          # Navbar, Hero, body grid, Footer
    globals.css       # tailwind import, theme tokens (no grid background)
  data/
    portfolio.ts      # ALL content, typed (see below)
  components/
    Navbar.tsx
    Hero.tsx
    SectionHeading.tsx  # blue bar + title + subtitle
    TechStack.tsx
    TechTile.tsx        # icon or monogram tile
    Projects.tsx
    ProjectCard.tsx
    AboutCard.tsx
    ConnectCard.tsx
    CtaCard.tsx
    Footer.tsx
public/
  icons/*.svg         # Simple Icons, CC0
```

Data types in `portfolio.ts`:

```ts
type Link = { label: string; href: string; icon: string | null };
type Profile = {
  name: string; role: string; roleSecondary: string;
  headline: string; headlineAccent: string;   // "Building modern web apps and " + "AI-powered" + " solutions."
  headlineTail: string;
  intro: string; bio: string; avatar: string; email: string;
  location: string; availability: string; experience: string;
  links: Link[];
};
type Tech = { name: string; icon: string | null };   // icon = slug under /icons
type Project = { title: string; description: string; tech: string[]; href: string | null; image: string | null };
```

All components are server components. Components only render data; no
hard-coded copy.

## Out of scope

Blog, CMS, contact form, analytics, dark mode, i18n, multiple pages, resume.

## Testing / verification

- `pnpm lint`, `pnpm exec tsc --noEmit`, `pnpm build` pass.
- Every `Tech.icon` slug and every `Link.icon` slug has a matching file in
  `public/icons/`. Checked by a shell loop in the plan's verification step
  (`test -f public/icons/<slug>.svg` for each slug), not at runtime.
- Headless screenshots at 1280px and 375px (iframe method): navbar, hero,
  tiles wrap, cards stack on mobile, no horizontal overflow.
