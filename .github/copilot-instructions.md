# Copilot Instructions for Portfolio

## Project Overview

React portfolio website (Vite + Tailwind CSS 3 + Framer Motion) with dark/light theming, smooth-scroll landing page, EmailJS contact form, and a standalone `/tools` section. Deployed on Vercel with SPA rewrites (`vercel.json`).

## Architecture

### Directory Structure (note: `componenets` is the actual folder name — keep the typo)

- `src/componenets/` — shared UI: Layout, Navbar, Footer, ScrollToTop (named + default exports)
- `src/pages/` — landing-page sections + standalone pages
- `src/pages/Tools/` — individual tool pages (DataWaster, PasswordGenerator, BlackPage, SpeedTest, URLShortner)
- `src/don't-push/` — draft/experimental components, not imported anywhere

### Routing (`App.jsx`)

```
BrowserRouter (main.jsx)
└─ Routes
   ├─ / → Layout (Navbar + Outlet + Footer)
   │     └─ index → LandingPage → [HeroSection, Projects, AboutMe, GetInTouch]
   ├─ /tools → Tools (standalone, no Layout wrapper — has its own theme toggle + Vanta WAVES)
   ├─ /data-waster, /password-generator, /black-page, /speed-test, /url-shortner → standalone tool pages
```

**Key detail:** Tools page and tool sub-pages render *outside* the `Layout` component — they manage their own theme toggle and Vanta effects independently.

### Scroll Navigation

Landing-page sections use anchor IDs: `home`, `projects`, `about`, `contact`. Navbar scrolls to them via `element.scrollIntoView({ behavior: "smooth" })`. The "Tools" nav item is a `<Link to="/tools">` (route navigation, not scroll).

## Key Patterns

### Dark Mode

- Class-based: `darkMode: "class"` in `tailwind.config.js`
- Toggle in `Navbar.jsx` flips `.dark` on `<html>` and persists to `localStorage` key `"theme"`
- Falls back to `prefers-color-scheme` on first visit
- **Always pair** light and dark variants: `text-neutral-900 dark:text-neutral-100`
- Body base styles applied via Tailwind `@apply` in `index.css`

### Styling Conventions

- Tailwind utility classes only — no CSS modules or styled-components
- Color palette: `neutral-*` scale exclusively (landing page); Tools page uses some `gray-*` and `blue-*`
- Custom font: `font-brand` → Poppins / Inter / system fallback (defined in `tailwind.config.js`)
- Section containers: `max-w-5xl mx-auto px-6` or `max-w-6xl mx-auto px-6`
- Cards: `rounded-lg border border-neutral-200 dark:border-neutral-700` with `bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm`
- Fixed navbar height: `h-20`; sections need `scroll-mt-20` for proper scroll offset

### Data Co-location

Project data, skills, and experience arrays are defined as `const` at the **top of the component file** that renders them (see `Projects.jsx`, `AboutMe.jsx`). No separate data files.

### Vanta.js Background Effects

- Three.js + Vanta loaded via CDN `<script>` tags in `index.html` (not npm packages)
- `HeroSection.jsx` → `VANTA.FOG` with emerald/teal palette adapting to dark mode
- `Tools.jsx` → `VANTA.WAVES` with blue palette
- `BackToTopButton` (in `ScrollToTop.jsx`) → `VANTA.FOG` on a 12×12 floating button
- All use `MutationObserver` on `<html>` class changes to reinitialize on theme toggle
- Include retry polling (`setInterval`) as fallback for late-loading CDN scripts

### Icons

- `react-icons` for social/UI icons: `FaGithub`, `FaLinkedin`, `FaSun`, `FaMoon`, `FiMenu`, `FiX`
- `lucide-react` for tool/feature icons: `Mouse`, `Download`, `Lock`, `Gauge`, `Link`
- Use `<IconContext.Provider>` for shared icon styles (see `HeroSection.jsx` social links)

## Environment Variables

Contact form (EmailJS) requires `.env`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

Accessed via `import.meta.env.VITE_*` in `GetInTouch.jsx`.

## Commands

- `npm run dev` — dev server on `0.0.0.0:5173` (LAN-accessible)
- `npm run build` — production build to `dist/`
- `npm run lint` — ESLint (flat config, React Hooks + React Refresh plugins)
- `npm run preview` — preview production build locally

## Adding New Sections to Landing Page

1. Create component in `src/pages/` with an `id` attribute matching the nav anchor
2. Import and add to render order in `src/componenets/LandingPage.jsx`
3. Add entry to `navItems` array in `src/componenets/Navbar.jsx` (use `id` for scroll targets, or `"tools"` pattern for route links)
4. Apply `scroll-mt-20` on the section root for fixed-navbar offset

## Adding New Tool Pages

1. Create component in `src/pages/Tools/`
2. Add route in `App.jsx` (flat, outside Layout)
3. Add entry to `tools` array in `Tools.jsx` with `path` matching the route
4. Tool pages are standalone — include their own theme toggle if needed

## Code Style

- Functional components with hooks only
- Default exports for page/section components; named exports for shared utilities (e.g., `ScrollToTop` exports both `ScrollToTop` and `BackToTopButton`)
- ESLint: `no-unused-vars` ignores uppercase/underscore-prefixed names; `react-refresh/only-export-components` warns with `allowConstantExport`
