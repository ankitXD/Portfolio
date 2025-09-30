import React, { useEffect, useRef } from "react";
import { IconContext } from "react-icons";
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from "react-icons/fa";
import { Mouse } from "lucide-react";

const HeroSection = () => {
  const heroRef = useRef(null);

  const vantaRef = useRef(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const createEffect = () => {
      if (!window.VANTA?.FOG) return;
      const isDark = document.documentElement.classList.contains("dark");
      // Destroy existing instance before creating new one
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
      vantaRef.current = window.VANTA.FOG({
        el: heroRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        // Color palette adapts to light / dark
        highlightColor: isDark ? 0x34d399 : 0x8ae6c1, // emerald shades
        midtoneColor: isDark ? 0x155e75 : 0x89c9c2, // teal vs soft cyan
        lowlightColor: isDark ? 0x020617 : 0x1d2730, // near black vs slate
        baseColor: isDark ? 0x0a0f14 : 0xf8fafc, // very dark base vs near white
        blurFactor: isDark ? 0.75 : 0.6,
        speed: 1.2,
      });
    };

    // Attempt initial creation (scripts might already be loaded)
    createEffect();

    // Observe class changes on <html> to detect dark mode toggle
    const observer = new MutationObserver((mutations) => {
      for (const m of mutations) {
        if (m.attributeName === "class") {
          createEffect();
          break;
        }
      }
    });
    observer.observe(document.documentElement, { attributes: true });

    // Fallback interval if scripts load after component mount
    let retryCount = 0;
    const retryInterval = setInterval(() => {
      if (window.VANTA?.FOG) {
        createEffect();
        clearInterval(retryInterval);
      } else if (retryCount++ > 20) {
        clearInterval(retryInterval);
      }
    }, 300);

    return () => {
      observer.disconnect();
      clearInterval(retryInterval);
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  const socials = [
    {
      label: "GitHub",
      href: "https://github.com/ankitxD",
      icon: <FaGithub />,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/ankit-gupta-s3v3nc3/",
      icon: <FaLinkedin />,
    },
    { label: "Email", href: "guptankit.2003@gmail.com", icon: <FaEnvelope /> },
  ];

  return (
    <section
      ref={heroRef}
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center overflow-hidden"
      aria-label="Hero"
    >
      {/* Content wrapper to ensure readable contrast */}
      <div className="relative z-10 flex flex-col items-center text-center">
        <p className="text-xs sm:text-lg uppercase font-medium text-neutral-700 dark:text-neutral-300 mb-5">
          Full Stack Developer
        </p>
        <h1
          className="mb-5 tracking-tight text-5xl sm:text-7xl md:text-8xl leading-none drop-shadow-sm text-neutral-900 dark:text-neutral-50"
          style={{
            fontFamily: `'Poppins', 'Inter', 'Segoe UI', system-ui, sans-serif`,
          }}
        >
          ANKIT GUPTA
        </h1>

        <p className="mt-5 text-md  tracking-wide text-neutral-500 dark:text-neutral-400">
          Available for Freelance Projects
        </p>
      </div>

      <div className="relative z-10 flex flex-wrap items-center justify-center gap-6 mt-2">
        <a
          href="/Ankit_Gupta_Resume.pdf"
          download
          className="rounded-lg bg-neutral-900 px-8 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-neutral-900/20 transition hover:bg-neutral-800 hover:shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white dark:focus-visible:ring-neutral-300"
        >
          Download Resume
        </a>
      </div>

      <IconContext.Provider
        value={{
          size: "1.8rem",
          className:
            "transition-colors text-neutral-600 hover:text-neutral-900 focus:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-200 dark:focus:text-neutral-200",
        }}
      >
        <ul className="relative z-10 mt-6 flex items-center gap-8">
          {socials.map((s) => (
            <li key={s.label}>
              <a
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 rounded"
              >
                {s.icon}
              </a>
            </li>
          ))}
        </ul>
      </IconContext.Provider>

      <button
        type="button"
        onClick={() =>
          window.scrollTo({ top: window.innerHeight, behavior: "smooth" })
        }
        className="group absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-neutral-500 dark:text-neutral-400 z-20"
        aria-label="Scroll down"
      >
        <Mouse className="h-7 w-7 animate-pulse text-neutral-400 group-hover:text-neutral-700 dark:group-hover:text-neutral-200" />
        <span className="text-[10px] tracking-wider group-hover:text-neutral-800 dark:group-hover:text-neutral-200">
          Scroll
        </span>
      </button>

      {/* Optional subtle overlay for readability */}
      <div className="pointer-events-none absolute inset-0 bg-white/10 dark:bg-black/40 -z-10" />
    </section>
  );
};

export default HeroSection;
