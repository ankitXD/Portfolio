import React from "react";

const skills = {
  title: "Skills",
  items: [
    "React",
    "Figma",
    "Tailwind CSS",
    "Express.js",
    "MongoDB",
    "Node.js",
    "REST APIs",
    "Auth",
    "Heroku",
  ],
};

const experience = {
  title: "Experience",
  roles: [
    {
      role: "Freelance Software Engineer",
      company: "Independent",
      period: "July 2025 – Present",
      points: [
        "Built and deployed full-stack web applications using the MERN stack (MongoDB, Express.js, React, Node.js) for diverse clients",
        "Designed and implemented REST APIs with modern authentication (JWT) and database integrations",
        "Delivered scalable, production-ready solutions using Docker and cloud platforms (Vercel, Heroku)",
        "Collaborated with clients, ensuring timely delivery and high-quality code through Agile workflows",
      ],
    },
  ],
};

const Card = ({ children, heading, footer, className = "" }) => (
  <div
    className={
      "relative flex flex-col rounded-xl border border-neutral-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-colors dark:border-neutral-700 dark:bg-neutral-900/60 " +
      className
    }
  >
    {heading && (
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
        {heading}
      </h3>
    )}
    <div className="flex-1 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      {children}
    </div>
    {footer && (
      <div className="mt-4 pt-3 text-[11px] text-neutral-500 dark:text-neutral-500">
        {footer}
      </div>
    )}
    <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 dark:ring-white/5" />
  </div>
);

const AboutMe = () => {
  return (
    <section
      id="about"
      className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20"
      aria-label="About Me"
    >
      <div className="mb-12 text-center">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          About
        </h3>
        <h2 className="text-3xl sm:text-4xl  tracking-tight text-neutral-900 dark:text-neutral-50">
          Background & Expertise
        </h2>
      </div>

      {/* Paragraph moved above cards */}
      <div className="mb-10 mx-auto max-w-3xl">
        <p className="text-center leading-relaxed text-lg text-neutral-600 dark:text-neutral-400">
          I'm a full‑stack developer who loves crafting focused, maintainable
          systems end‑to‑end. I love shipping things that feel effortless to use
          while being thoughtfully engineered underneath.
        </p>
      </div>

      {/* Cards layout: two equal columns on large screens; Experience left, Skills right */}
      <div className="grid gap-6 lg:grid-cols-2 items-start">
        {/* Left: experience card */}
        <Card heading={experience.title}>
          <ul className="space-y-5">
            {experience.roles.map((r, idx) => (
              <li key={idx} className="space-y-2">
                <div>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-100">
                    {r.role}
                  </p>
                  <p className="text-xs mt-2 font-medium text-neutral-500 dark:text-neutral-400">
                    {r.company} • {r.period}
                  </p>
                </div>
                <ul className="ml-4 list-disc space-y-1 text-[12px] text-neutral-600 dark:text-neutral-400">
                  {r.points.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </Card>

        {/* Right: skills card (square) */}
        <Card heading={skills.title} footer={skills.blurb}>
          <ul className="flex flex-wrap gap-2">
            {skills.items.map((item) => (
              <li
                key={item}
                className="rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 cursor-pointer"
              >
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </section>
  );
};

export default AboutMe;
