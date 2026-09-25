# Eugine Portfolio — Design Spec

Date: 2026-09-25
Status: approved in chat, pending written review

## Purpose

A single-page personal portfolio for Eugine Rosillon, aimed at both recruiters
(developer roles) and freelance clients (web apps, AI integration, automation).
Success: a visitor understands in under 10 seconds what Eugine builds, sees the
stack, sees sample projects, and can reach him by email or GitHub/LinkedIn.

## Look and feel

- White page. Fine gray "graph paper" grid across the whole background
  (CSS `background-image` with two `linear-gradient`s, ~24px cells, very light
  gray lines such as `#e5e7eb` at reduced opacity). No images for the grid.
- Content column: max-width ~720px, centered, with a thin vertical rule on the
  left and right edge of the column so content reads as sitting on the grid.
- Typography: Geist Sans for body/headings (already wired via `next/font`).
  Geist Mono for section numbers (`01`–`05`), labels, and skill/tech tags.
- One accent color: a blue matched to the avatar's neon (around `#3b82f6`),
  used only for links on hover and small details. Everything else is
  near-black text (`#171717`) and grays.
- Avatar: `public/eugine-avatar.png`, rendered as a circle (~96px on desktop,
  ~72px on mobile) with a 1px gray border, via `next/image`.
- No shadows, no gradients on content, no cards with fills. Sections are
  separated by 1px horizontal rules.
- No animation library, no dark-mode toggle. Remove the scaffold's
  `prefers-color-scheme: dark` override so the page stays white.
- No new dependencies. Tailwind 4 only.

## Page structure (top to bottom)

1. **Intro** — avatar left, name + one-line title right
   ("Full-stack developer building web apps and AI automations"), then a row
   of plain underlined text links: GitHub, LinkedIn, Email.
2. **Skills** — five groups, each a mono label followed by a wrapped row of
   tags with a 1px border:
   - Frontend: Next.js, React, TypeScript, JavaScript, HTML, CSS, Tailwind CSS,
     Material UI, shadcn/ui
   - Backend: Node.js, Hono, Express, REST API, Python
   - Data: PostgreSQL, MySQL, MongoDB, Redis, Qdrant, pgvector, Drizzle
   - AI & Automation: LangChain, Anthropic API, OpenAI API, Ollama, Embeddings,
     Tool calling, n8n, Zapier, Claude Code, Codex
   - Tools & Deploy: Git, GitHub, Docker, Vercel, VPS
3. **Projects** — three placeholder entries. Each is a row (not a card):
   title, one-line description, mono tech tags, optional Live / Code links.
   Divider line between rows.
4. **Services** — three numbered items with a title and 1–2 sentence
   description: Web applications; AI integration (chat, RAG, tool calling);
   Automation (n8n, Zapier, custom workflows).
5. **Contact** — one line ("Open for freelance and full-time work.") + email
   link. Footer: name and current year.

## Code structure

```
src/
  app/
    layout.tsx        # fonts, metadata (title/description for Eugine), body
    page.tsx          # composes the five sections
    globals.css       # tailwind import, grid background, theme tokens
  data/
    portfolio.ts      # ALL content: profile, links, skill groups, projects, services
  components/
    Section.tsx       # number + heading wrapper with top rule
    Tag.tsx           # mono bordered tag
    Intro.tsx
    Skills.tsx
    Projects.tsx
    Services.tsx
    Contact.tsx
```

- `portfolio.ts` exports typed data (`Profile`, `SkillGroup`, `Project`,
  `Service`). Components only render; changing text never touches components.
- All components are server components (no client state needed).
- Placeholder project fields are clearly marked so they are easy to find and
  replace (e.g. title "Project One", description "Short description here.").
- Email/GitHub/LinkedIn URLs live in `portfolio.ts` as placeholders until
  Eugine supplies real ones (email defaults to the git author email).

## Out of scope

Blog, CMS, contact form, analytics, dark mode, i18n, multiple pages.

## Testing / verification

- `pnpm lint` and `pnpm build` pass.
- Manual check in browser at desktop and ~375px width: grid visible but
  subtle, avatar round, no horizontal scroll, all links resolve to data values.
