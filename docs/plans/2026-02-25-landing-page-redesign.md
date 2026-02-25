# paliwowo Landing Page Redesign

**Date:** 2026-02-25
**Branch:** feat/bilingual-landing-page

---

## Goal

Replace the current plain HTML/CSS/JS static page with a professional, production-grade Next.js landing page for the paliwowo mobile app (iOS + Android).

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + CSS custom properties
- **Output:** `output: 'export'` (fully static, no Node server)
- **Hosting:** Netlify
- **Images:** `next/image` with `unoptimized: true` (required for static export)

---

## Project Structure

```
paliwowo/
├── app/
│   ├── layout.tsx          # Root layout: Inter font, metadata, globals.css
│   ├── page.tsx            # Full landing page (single file, inline components)
│   └── globals.css         # CSS variables + Tailwind base directives
├── public/
│   ├── paliwowo_logo.png
│   ├── paliwowo_background_image.jpg
│   ├── paliwowo_app_screenshot_1.PNG
│   ├── paliwowo_app_screenshot_2.PNG
│   └── paliwowo_app_screenshot_3.PNG
├── next.config.ts          # output: 'export', images: { unoptimized: true }
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

Assets are **copied** from `assets/` → `public/`. The old `index.html`, `script.js`, `styles.css` remain untouched.

---

## Component Architecture (`app/page.tsx`)

All components defined inline in one file:

| Component | Description |
|---|---|
| `T` constant | Translations object — EN + PL strings |
| `useLanguage()` | Client hook: IP detection on mount (ipapi.co, 1800ms timeout), fallback to `navigator.language`, then `localStorage`. Returns `[lang, setLang]`. |
| `<Navbar>` | Sticky, translucent dark-blue with backdrop-blur. Logo + wordmark left. Lang toggle + disabled store buttons right. |
| `<Hero>` | Full-width bg image with dark-blue gradient overlay + vignette. Left: headline, subtitle, trust line, CTAs. Right: phone mockup UI (decorative, no real data). |
| `<Features>` | 3-card grid (1-col mobile → 3-col desktop). Inline SVG icons. |
| `<HowItWorks>` | 3-step horizontal row. |
| `<Contributor>` | Highlight panel with yellow top-stripe. Bullet list + CTA. |
| `<FinalCTA>` | Email capture (local state). Success message on submit. Privacy microcopy. Disabled store buttons. |
| `<Footer>` | Logo + one-liner + copyright. |
| `<HomePage>` | Root: assembles all sections, owns `lang` + `email` + `submitted` state, passes `t` (translation object) and `setLang` down. |

---

## State

| State | Lives in | Purpose |
|---|---|---|
| `lang: 'en' \| 'pl'` | `<HomePage>` | Active language; set by IP detection, overridable by toggle |
| `email: string` | `<HomePage>` | Email capture input value |
| `submitted: boolean` | `<HomePage>` | Shows success message after form submit |

---

## Brand Colors (CSS variables in `globals.css`)

```css
:root {
  --brand-blue: #0B2757;
  --brand-yellow: #FCD73D;
  --blue-900: #081C40;
  --blue-700: #0B2757;
  --blue-500: #1F4E8C;
  --blue-300: #6E8FBF;
  --blue-100: #E7EEF8;
  --yellow-600: #E6C233;
  --yellow-500: #FCD73D;
  --yellow-300: #FFE98A;
  --yellow-100: #FFF7D6;
  --white: #FFFFFF;
  --gray-light: #F5F7FA;
  --gray-medium: #8A94A6;
  --gray-dark: #2A2F3A;
  --black-soft: #111827;
}
```

Used via Tailwind arbitrary values: `bg-[var(--blue-900)]`, `text-[var(--yellow-500)]`, etc.

---

## Page Sections (in order)

1. **Navbar** — sticky, logo + lang toggle + disabled store buttons
2. **Hero** — background image + overlay, headline, phone mockup
3. **Features** — 3 cards with icons
4. **How It Works** — 3 numbered steps
5. **Contributor** — highlight panel
6. **Final CTA** — email capture
7. **Footer**

---

## Key Implementation Notes

- **Static export**: `next.config.ts` must set `output: 'export'` and `images: { unoptimized: true }`
- **IP detection**: Client-side only (`'use client'`), `useEffect` on mount, 1800ms timeout, same logic as current `script.js`
- **Smooth scroll**: CSS `scroll-behavior: smooth` on `html` element
- **Anchor IDs**: `#features`, `#how-it-works`, `#cta`
- **Phone mockup**: Pure decorative JSX — fake status bar, station list rows, price pills in yellow
- **App screenshots**: Displayed in the Hero's right column inside the phone mockup frame, cycling or stacked
- **Accessibility**: `focus-visible` rings, `aria-label` on icon-only buttons, semantic HTML sections
- **Netlify deploy**: Static export to `out/` directory; `netlify.toml` with `publish = "out"` recommended
