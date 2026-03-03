

## Plan: Jan Sommershoff Personal Brand Landing Page

Complete redesign of the current photographer portfolio into a high-end personal brand landing page for Jan Sommershoff.

### Approach

Replace the existing photographer site entirely with a single-page landing page. Remove unused portfolio/project detail routes and data. Build all sections directly in the Home page component with Framer Motion animations.

### Color Palette & Styling

Update `src/index.css` with:
- Background: `#ffffff` / dark: `#1a1a1a`
- Primary (dark grey): `#63666a`
- Accent (orange): `#f6711f`
- Secondary (grey): `#b2b4b2`
- Clean sans-serif typography, generous whitespace

### Files to Modify

1. **`src/data/photographer.ts`** → Rename/replace with `src/data/siteData.ts` containing Jan's info, expertise areas, projects, quotes, and contact details.

2. **`src/index.css`** — Update CSS variables to the new color palette.

3. **`src/pages/Home.tsx`** — Complete rewrite as a single-page landing with 7 sections:
   - **Hero**: Full-viewport with professional business image (Unsplash), headline "Mehr aus deinem Leben machen.", subheadline, two CTA buttons (orange accent)
   - **About**: Two-column layout — text left, image right. Personal story about entrepreneurship and investing
   - **Expertise**: Three-column card grid (Real Estate, AI & Digital, Entrepreneurship) with icons, subtle hover animations
   - **Social Proof**: Quote cards with entrepreneur insights, styled with left orange border accent
   - **Projects**: Two showcase cards for KRS Immobilien and KRS Digital with descriptions
   - **CTA**: Centered section with dark background, headline "Der nächste Schritt liegt bei dir.", orange button
   - **Contact**: Minimal section with email and location

4. **`src/components/layout/Header.tsx`** — Simplify to show "JAN SOMMERSHOFF" logo + minimal nav (Über mich, Expertise, Projekte, Kontakt) as smooth-scroll anchor links. Remove portfolio/project routes.

5. **`src/components/layout/Footer.tsx`** — Clean minimal footer with copyright and optional LinkedIn/email links.

6. **`src/App.tsx`** — Remove Portfolio, ProjectDetail routes. Keep only Home (Index), About, Contact, NotFound. Or simplify to single-page with anchor navigation.

7. **`src/components/layout/Layout.tsx`** — Adjust for single-page behavior (no `pt-16` logic needed since header overlays hero).

### Files to Remove/Ignore
- `src/data/projects.ts`, `src/pages/Portfolio.tsx`, `src/pages/ProjectDetail.tsx` — no longer needed
- `src/components/portfolio/` — remove portfolio components

### Design Details
- Hero uses a high-quality Unsplash business/entrepreneur image
- Sections use `ScrollReveal` component (already exists) for entrance animations
- Cards use subtle shadow + hover lift effect
- Orange accent used sparingly: CTA buttons, section dividers, icon highlights
- All text in German

