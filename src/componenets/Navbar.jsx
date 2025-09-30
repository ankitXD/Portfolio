import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // Init theme
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefers ? "dark" : "light");
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  // Scroll listener
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Close menu on escape key or resize >= md
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth >= 768) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Prevent body scroll when menu open
  useEffect(() => {
    if (menuOpen) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [menuOpen]);

  const scrollTo = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  // Maintain constant height & persistent (initially transparent) border to avoid flash
  const navClass =
    "fixed inset-x-0 top-0 z-40 flex items-center h-20 border-b transition-colors duration-300 " +
    (scrolled
      ? "border-neutral-200/70 bg-white/80 backdrop-blur-md shadow-sm dark:border-neutral-700/60 dark:bg-neutral-900/70"
      : "border-transparent bg-transparent dark:border-transparent");

  return (
    <nav className={navClass}>
      <div className="mx-auto flex h-full w-full max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "home")}
          className="text-lg tracking-tight text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
          style={{
            fontFamily: `SUSE Mono, sans-serif`,
          }}
        >
          Ankit Gupta
        </a>

        {/* Nav + Toggle */}
        <div className="flex items-center gap-4 md:gap-8">
          {/* Desktop nav */}
          <ul className="hidden items-center gap-8 md:flex">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => scrollTo(e, n.id)}
                  className="text-sm font-semibold tracking-wide text-neutral-700 transition-colors hover:text-neutral-900 dark:text-neutral-300 dark:hover:text-neutral-100"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle dark mode"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white/70 text-neutral-700 shadow-sm backdrop-blur transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300"
          >
            {dark ? (
              <FaSun className="text-[15px]" />
            ) : (
              <FaMoon className="text-[15px]" />
            )}
          </button>

          {/* Hamburger button (mobile) */}
          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 bg-white/70 text-neutral-700 shadow-sm backdrop-blur transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 md:hidden dark:border-neutral-700 dark:bg-neutral-800/60 dark:text-neutral-300"
          >
            {menuOpen ? (
              <FiX className="h-5 w-5" />
            ) : (
              <FiMenu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {/* Mobile overlay */}
      <div
        className={`fixed inset-0 z-30 bg-black/30 backdrop-blur-sm transition-opacity duration-200 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
        aria-hidden={!menuOpen}
      />
      {/* Mobile menu panel */}
      <div
        id="mobile-nav"
        className={`md:hidden fixed top-20 inset-x-0 z-40 origin-top px-6 pb-10 pt-4 shadow-sm transition-all duration-200 ${
          menuOpen
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        } border-b border-neutral-200 bg-white/90 backdrop-blur dark:border-neutral-700 dark:bg-neutral-900/90`}
      >
        <ul className="flex flex-col gap-4">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => {
                  scrollTo(e, n.id);
                  setMenuOpen(false);
                }}
                className="block rounded-md px-2 py-2 text-sm font-semibold tracking-wide text-neutral-800 transition-colors hover:bg-neutral-200/60 hover:text-neutral-900 dark:text-neutral-200 dark:hover:bg-neutral-700/60 dark:hover:text-white"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
