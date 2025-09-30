import React from "react";
import { IconContext } from "react-icons";
import { FaReact, FaNodeJs, FaDatabase, FaCode } from "react-icons/fa";

const AboutMe = () => {
  const highlights = [
    { icon: <FaReact />, label: "React & SPA Architecture" },
    { icon: <FaNodeJs />, label: "Node.js & REST APIs" },
    { icon: <FaDatabase />, label: "Database Design & Optimization" },
    { icon: <FaCode />, label: "Clean, Maintainable Code" },
  ];

  return (
    <section
      id="about"
      className="mx-auto max-w-3xl space-y-8 px-6 py-16"
      aria-label="About Me"
    >
      <header>
        <h2 className="mb-2 text-3xl font-bold tracking-tight text-center">
          About Me
        </h2>
      </header>

      <p className="leading-relaxed text-neutral-700">
        I'm a passionate full-stack developer with a strong foundation in both
        frontend and backend technologies. My journey started with curiosity
        about how things work behind the scenes and grew into building
        efficient, scalable, user-focused applications. I love solving complex
        problems—whether optimizing queries, refining UI performance, or
        designing resilient service layers. I value clean architecture,
        accessibility, and continuous learning. My goal is to build products
        that align technical excellence with real user impact.
      </p>

      <IconContext.Provider
        value={{
          size: "1.4rem",
          className:
            "text-emerald-600 drop-shadow-sm group-hover:scale-110 transition-transform",
        }}
      >
        <ul className="grid gap-4 sm:grid-cols-2">
          {highlights.map((h) => (
            <li
              key={h.label}
              className="group flex items-start gap-3 rounded-lg border border-neutral-200/70 bg-white/60 p-4 shadow-sm backdrop-blur-sm transition hover:border-emerald-300 hover:shadow"
            >
              <span className="mt-0.5">{h.icon}</span>
              <span className="text-sm font-medium text-neutral-700">
                {h.label}
              </span>
            </li>
          ))}
        </ul>
      </IconContext.Provider>
    </section>
  );
};

export default AboutMe;
