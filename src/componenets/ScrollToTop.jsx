import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FiArrowUp } from "react-icons/fi";

const prefersReduced = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: prefersReduced() ? "auto" : "smooth" });
        else window.scrollTo({ top: 0, left: 0 });
      }, 60);
      return () => clearTimeout(timer);
    }

    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced() ? "auto" : "smooth",
    });
  }, [pathname, hash]);

  return null;
}

export function BackToTopButton({ offset = 700 }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  return (
    <button
      type="button"
      onClick={() =>
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: prefersReduced() ? "auto" : "smooth",
        })
      }
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-50 inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper/90 text-ink/60 backdrop-blur-md transition-all duration-300 hover:border-ink/30 hover:text-ink ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-2 opacity-0"
      }`}
    >
      <FiArrowUp className="h-4 w-4" />
    </button>
  );
}

export default ScrollToTop;
