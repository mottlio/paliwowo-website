# Repository Guidelines

## Project Structure & Module Organization
The Next.js 15 app router lives in `app/`, with `layout.tsx` supplying the shared shell and `page.tsx` holding the bilingual landing content plus the `useLanguage` client hook. Global tokens and Tailwind layer imports sit in `app/globals.css`. Static assets used by `<Image />` belong in `public/`; higher‑resolution or design reference files may remain in `assets/` but are not bundled. Keep configuration (`next.config.ts`, `tsconfig.json`, `postcss.config.mjs`, `netlify.toml`) at the repo root so deployments pick them up automatically. Legacy static prototypes such as `index.html`, `styles.css`, and `script.js` are still referenced from `docs/` for context—do not delete without discussion.

## Build, Test, and Development Commands
- `npm install`: install Next.js, React 19, TypeScript, and Tailwind 4 dependencies.
- `npm run dev`: start the local dev server on port 3000 with fast refresh—use this for UI reviews and manual localization checks.
- `npm run build`: create a production build; run before opening a PR to ensure the app compiles with strict TypeScript settings.
- `npm run start`: serve the optimized build locally, mirroring the Netlify deployment.

## Coding Style & Naming Conventions
Use TypeScript everywhere (`.tsx`) and keep components functional. Follow the existing two‑space indentation, single quotes for strings, and trailing commas in objects such as the translation map. Prefer descriptive, lowerCamelCase variable names and PascalCase for components. Tailwind utility classes live directly on JSX nodes; when custom CSS is required, add tokens in `app/globals.css`. The `@/*` path alias is available for future module organization. Keep hooks (`useLanguage`) colocated with their consuming component until reuse demands extraction.

## Testing Guidelines
There is no automated test suite yet, so lean on manual regression passes: verify both English and Polish flows, the sticky navbar, and the signup form after every significant change. When adding functionality that can be isolated, provide Jest or Playwright coverage under a future `tests/` directory and name specs after the component under test (`landing.spec.ts`). Document any QA steps in the PR description so reviewers can replicate them.

## Commit & Pull Request Guidelines
Recent history favors short, imperative commit subjects (e.g., “increase logo size”, “chore: add .gitignore”). Keep commits scoped to a single concern and include a prefix such as `feat:`, `fix:`, or `chore:` when it improves clarity. Pull requests should describe the motivation, list functional changes, and mention any Netlify config updates. Attach screenshots or screen recordings whenever the UI shifts. Link relevant issues, call out follow‑ups, and confirm `npm run build` status before requesting review.

## Security & Configuration Tips
Secrets are not stored in this repo; rely on Netlify environment variables for APIs such as `ipapi.co` if rate limits become a concern. Avoid committing production data—media exports belong in `assets/` or object storage. If you introduce browser APIs, gate them behind feature detection so the static fallback in `index.html` stays safe to open offline.
