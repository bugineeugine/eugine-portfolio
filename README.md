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
