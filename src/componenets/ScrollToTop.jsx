import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

// Scrolls to top on route change (ignores in-page hash navigations)
export function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) return; // allow anchor jumps
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  }, [pathname, hash]);

  return null;
}

// Floating button that appears after scrolling down
export function BackToTopButton({ offset = 240 }) {
  const [visible, setVisible] = useState(false);
  const containerRef = useRef(null);
  const vantaInstance = useRef(null);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > offset);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [offset]);

  const scrollTop = () => {
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReduced ? "auto" : "smooth",
    });
  };

  // Initialize Vanta Fog effect (similar to HeroSection) and sync with theme
  useEffect(() => {
    if (!containerRef.current) return;

    const createEffect = () => {
      if (!window.VANTA?.FOG || !containerRef.current) return;
      const isDark = document.documentElement.classList.contains("dark");
      if (vantaInstance.current) {
        vantaInstance.current.destroy();
        vantaInstance.current = null;
      }
      // Apply effect on the container (small footprint; tuned params)
      vantaInstance.current = window.VANTA.FOG({
        el: containerRef.current,
        mouseControls: false,
        touchControls: false,
        gyroControls: false,
        highlightColor: isDark ? 0x34d399 : 0x8ae6c1,
        midtoneColor: isDark ? 0x155e75 : 0x89c9c2,
        lowlightColor: isDark ? 0x020617 : 0x1d2730,
        baseColor: isDark ? 0x0a0f14 : 0xf8fafc,
        blurFactor: isDark ? 0.85 : 0.7,
        speed: 1.0,
        zoom: 0.7,
      });
    };

    createEffect();

    // Observe theme class changes
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class") {
          createEffect();
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    // Retry if script loads late
    let retries = 0;
    const interval = setInterval(() => {
      if (window.VANTA?.FOG) {
        createEffect();
        clearInterval(interval);
      } else if (retries++ > 15) {
        clearInterval(interval);
      }
    }, 250);

    return () => {
      observer.disconnect();
      clearInterval(interval);
      if (vantaInstance.current) {
        vantaInstance.current.destroy();
        vantaInstance.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-5 right-5 z-50 h-12 w-12 overflow-hidden rounded-xl transition-opacity ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      aria-hidden={!visible}
    >
      {/* Overlay button for interaction */}
      <button
        type="button"
        onClick={scrollTop}
        aria-label="Back to top"
        className="group relative flex h-full w-full items-center justify-center rounded-xl bg-neutral-900/70 text-neutral-50 backdrop-blur-sm transition-colors hover:bg-neutral-900/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:bg-neutral-100/80 dark:text-neutral-900 dark:hover:bg-neutral-100"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className="h-5 w-5"
          fill="none"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 15l7-7 7 7"
          />
        </svg>
        <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/10 dark:ring-white/10" />
      </button>
    </div>
  );
}

export default ScrollToTop;
