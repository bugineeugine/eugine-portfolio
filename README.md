# Eugine Rosillon - Portfolio

Single-page portfolio built with Next.js 16, TypeScript, and Tailwind CSS 4.

## Edit content

All text lives in `src/data/portfolio.ts`: profile, facts, links, tech stack, projects, CTA.
Replace the `PLACEHOLDER` entries (GitHub/LinkedIn URLs, experience, and the three projects).
Project thumbnails live in `public/projects/`. To swap one for a real screenshot, drop the image there and point the project's `image` at it.

## Project thumbnails (Remotion)

The three thumbnails are rendered from `video/` (a standalone Remotion project, not part of the Next app):

```bash
cd video
pnpm install --ignore-workspace
pnpm render          # writes public/projects/*.png and clears .next/cache/images
pnpm studio          # preview and tweak in the browser
```

If a re-rendered thumbnail still looks old in the browser, the `next/image` optimizer cached the previous file
(`.next/cache/images`, 4-hour default TTL). `pnpm render` clears it; then hard-refresh the page (Ctrl+Shift+R).

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
