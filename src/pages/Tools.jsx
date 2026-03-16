import React, { useEffect, useState, useRef } from "react";
import { FaSun, FaMoon, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  Download,
  Lock,
  Moon,
  Gauge,
  Link as LinkIcon,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

const Tools = () => {
  const [dark, setDark] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

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

  // Set page title
  useEffect(() => {
    document.title = "Tools | Ankit Gupta";
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  // Initialize Vanta effect
  useEffect(() => {
    if (vantaRef.current && window.VANTA) {
      vantaEffect.current = window.VANTA.WAVES({
        el: vantaRef.current,
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: dark ? 0x374151 : 0x3b82f6,
        shininess: 50,
        waveHeight: 20,
        waveSpeed: 0.5,
      });
    }

    return () => {
      if (vantaEffect.current) {
        vantaEffect.current.destroy();
      }
    };
  }, [dark]);

  const tools = [
    {
      id: 1,
      title: "Data Waster",
      description:
        "The fastest and most efficient way to waste your internet data.",
      icon: Download,
      path: "/tools/data-waster",
    },
    {
      id: 2,
      title: "Password Generator",
      description: "Create strong, secure, and random passwords with ease.",
      icon: Lock,
      path: "/tools/password-generator",
    },
    {
      id: 3,
      title: "Black Page",
      description: "A minimalist, distraction-free page for focus.",
      icon: Moon,
      path: "/tools/black-page",
    },
    {
      id: 4,
      title: "Speed Test",
      description:
        "Check your internet connection speed quickly and accurately.",
      icon: Gauge,
      path: "/tools/speed-test",
    },
    {
      id: 5,
      title: "URL Shortener",
      description: "Shorten long URLs into manageable and shareable links.",
      icon: LinkIcon,
      path: "/tools/url-shortner",
    },
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % tools.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + tools.length) % tools.length);
  };

  return (
    <div
      ref={vantaRef}
      className="min-h-screen text-black dark:text-white transition-colors duration-300 flex flex-col justify-center"
    >
      {/* Theme toggle */}
      <div className="absolute top-4 right-4 z-10">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label="Toggle dark mode"
          className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gray-200 text-gray-700 transition-colors hover:bg-gray-300 focus:outline-none dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
        >
          {dark ? (
            <FaSun className="text-lg" />
          ) : (
            <FaMoon className="text-lg" />
          )}
        </button>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-6 py-12">
        <Link
          to="/"
          className="block text-4xl text-center underline decoration-blue-500 hover:text-blue-600 transition-colors"
        >
          Ankit Gupta
        </Link>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <div className="overflow-hidden rounded-lg">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
              {tools.map((tool) => (
                <div
                  key={tool.id}
                  className="w-full flex-shrink-0 p-6 flex justify-center"
                >
                  <div className="bg-gray-100 dark:bg-gray-800 rounded-lg shadow-md p-8 text-center w-full max-w-md h-80 flex flex-col items-center justify-center relative">
                    <tool.icon className="w-12 h-12 mb-4 text-blue-500" />
                    <h2 className="text-2xl font-semibold mb-4">
                      {tool.title}
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400 text-lg mb-6">
                      {tool.description}
                    </p>
                    <a
                      href={tool.path}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition-colors flex items-center gap-2 mb-4"
                    >
                      Visit Page <ArrowRight className="w-4 h-4" />
                    </a>
                    {/* Navigation buttons inside card */}
                    <div className="absolute bottom-4 left-4 right-4 flex justify-between">
                      <button
                        onClick={prevSlide}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full p-2 transition-colors focus:outline-none"
                        aria-label="Previous slide"
                      >
                        <FaChevronLeft />
                      </button>
                      <button
                        onClick={nextSlide}
                        className="bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 rounded-full p-2 transition-colors focus:outline-none"
                        aria-label="Next slide"
                      >
                        <FaChevronRight />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tools;
