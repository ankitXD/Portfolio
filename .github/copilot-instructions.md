# Copilot Instructions for Portfolio

## Project Overview

Single-page React portfolio website using Vite, Tailwind CSS, and Framer Motion. Features dark/light mode theming, smooth scroll navigation, and EmailJS contact form integration.

## Architecture

### Directory Structure

- `src/componenets/` - Shared UI components (Layout, Navbar, Footer, ScrollToTop)
- `src/pages/` - Page-level section components (HeroSection, Projects, AboutMe, GetInTouch)
- `src/don't-push/` - Draft/experimental components not in production

### Component Hierarchy

```
App.jsx → Layout.jsx → LandingPage.jsx → [HeroSection, Projects, AboutMe, GetInTouch]
```

All sections render on single scrollable page; navigation uses anchor scrolling via `scrollIntoView()`.

## Key Patterns

### Dark Mode

- Uses **class-based dark mode** (`darkMode: "class"` in Tailwind config)
- Theme toggle in `Navbar.jsx` adds/removes `.dark` class on `<html>` element
- Persists to `localStorage` under key `"theme"`
- Always use `dark:` variants when styling (e.g., `text-neutral-900 dark:text-neutral-100`)

### Styling Conventions

- Use Tailwind utility classes exclusively; no separate CSS modules
- Color palette: `neutral-*` scale for consistent grays
- Custom font family: `font-brand` (Poppins/Inter/system fallback)
- Section containers: `max-w-6xl mx-auto px-6` for consistent padding
- Cards use: `rounded-lg border border-neutral-200 dark:border-neutral-700`

### Icons

- Use `react-icons` for common icons (FaGithub, FaLinkedin, etc.)
- Use `lucide-react` for specialized icons (Mouse scroll indicator)
- Wrap icons in `<IconContext.Provider>` when applying shared styles

### External Scripts (Vanta.js)

- Three.js and Vanta.js loaded via CDN in `index.html`
- `HeroSection.jsx` initializes Vanta FOG effect with dark/light color adaptation
- Uses `MutationObserver` to reinitialize effect on theme change

## Environment Variables

Contact form requires EmailJS configuration in `.env`:

```
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

## Commands

- `npm run dev` - Start dev server (accessible on network via `0.0.0.0:5173`)
- `npm run build` - Production build to `dist/`
- `npm run lint` - ESLint check

## Adding New Sections

1. Create component in `src/pages/` with section ID matching nav item
2. Add to `LandingPage.jsx` imports and render order
3. Add nav item to `navItems` array in `Navbar.jsx`
4. Use `scroll-mt-20` class on section for proper scroll offset under fixed navbar

## Code Style

- Functional components with hooks only (no class components)
- Named exports for reusable components; default exports for page components
- Keep data arrays (projects, skills, experience) at top of component files
- ESLint configured with React Hooks and React Refresh plugins
