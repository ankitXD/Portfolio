import React, { useEffect, useState, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

const navItems = [
  { id: "projects", label: "Work" },
  { id: "stack", label: "Stack" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
  { id: "services", label: "Services" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && setMenuOpen(false);
    const onResize = () => window.innerWidth >= 768 && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const scrollTo = useCallback(
    (e, id) => {
      e.preventDefault();
      setMenuOpen(false);
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      else navigate("/#" + id);
    },
    [navigate]
  );

  return (
    <nav
      className={
        "fixed inset-x-0 top-0 z-40 transition-colors duration-300 " +
        (scrolled || menuOpen
          ? "border-b border-line bg-paper/85 backdrop-blur-md"
          : "border-b border-transparent")
      }
    >
      <div className="mx-auto flex h-16 max-w-page items-center justify-between px-6 sm:px-10">
        <a
          href="#home"
          onClick={(e) => scrollTo(e, "home")}
          className="font-serif text-[17px] tracking-[-0.01em] text-ink"
        >
          Ankit Gupta
        </a>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-6 md:flex">
            {navItems.map((n) =>
              n.id === "services" ? (
                <li key={n.id}>
                  <Link
                    to="/services"
                    className="font-serif text-[15px] text-ink/70 transition-colors hover:text-ink"
                  >
                    {n.label}
                  </Link>
                </li>
              ) : (
                <li key={n.id}>
                  <a
                    href={`#${n.id}`}
                    onClick={(e) => scrollTo(e, n.id)}
                    className="font-serif text-[15px] text-ink/70 transition-colors hover:text-ink"
                  >
                    {n.label}
                  </a>
                </li>
              )
            )}
          </ul>

          <a
            href="https://drive.google.com/file/d/1fTDuxTq3lgcFIX7T58PRbLYbwA6A4N4r/view?usp=sharing"
            target="_blank"
            rel="noopener noreferrer"
            className="ml-4 hidden font-serif text-[15px] text-ink/70 transition-colors hover:text-ink sm:inline-block"
          >
            <span className="link-underline">Résumé</span>
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="ml-1 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink/70 transition-colors hover:bg-ink/5 hover:text-ink md:hidden"
          >
            {menuOpen ? <FiX className="h-5 w-5" /> : <FiMenu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div
        id="mobile-nav"
        className={
          "fixed inset-x-0 top-16 border-b border-line bg-paper transition-all duration-200 md:hidden " +
          (menuOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none -translate-y-1 opacity-0")
        }
      >
        <ul className="flex flex-col px-6 py-2">
          {navItems.map((n) => (
            <li key={n.id}>
              {n.id === "services" ? (
                <Link
                  to="/services"
                  onClick={() => setMenuOpen(false)}
                  className="block py-3 font-serif text-[20px] text-ink"
                >
                  {n.label}
                </Link>
              ) : (
                <a
                  href={`#${n.id}`}
                  onClick={(e) => scrollTo(e, n.id)}
                  className="block py-3 font-serif text-[20px] text-ink"
                >
                  {n.label}
                </a>
              )}
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
