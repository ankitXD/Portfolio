import React, { useEffect, useState } from "react";
import { FaSun, FaMoon } from "react-icons/fa";

const navItems = [
  { id: "home", label: "Home" },
  { id: "projects", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

const Navbar = () => {
  const [dark, setDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
          className="text-lg font-bold tracking-tight text-neutral-900 hover:text-neutral-700 dark:text-neutral-100 dark:hover:text-neutral-300"
        >
          Ankit Gupta
        </a>

        {/* Nav + Toggle */}
        <div className="flex items-center gap-8">
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
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
