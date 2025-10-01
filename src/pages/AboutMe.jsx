import React from "react";

const skills = {
  title: "Skills",
  items: [
    "React",
    "Vite",
    "Tailwind CSS",
    "Accessibility",
    "Responsive UI",
    "Node.js",
    "Express",
    "REST APIs",
    "MongoDB",
    "Auth",
  ],
  blurb:
    "Full-stack skills spanning frontend UI, accessibility, backend services, and data modeling.",
};

const experience = {
  title: "Experience",
  roles: [
    {
      role: "Full Stack Developer",
      company: "Acme Corp",
      period: "2024 – Present",
      points: [
        "Led rebuild of internal dashboard (30% faster load)",
        "Introduced component design system & code guidelines",
        "Collaborated with design & product to refine UX flows",
      ],
    },
    {
      role: "Software Intern",
      company: "Beta Labs",
      period: "2023",
      points: [
        "Built automation scripts reducing manual QA by 40%",
        "Implemented REST endpoints & documentation",
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

      {/* Cards layout: two equal columns on large screens; both cards are square */}
      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        {/* Left: combined skills card (square) */}
        <Card
          heading={skills.title}
          footer={skills.blurb}
          className="aspect-square"
        >
          <div className="h-full overflow-auto">
            <ul className="flex flex-wrap gap-2">
              {skills.items.map((item) => (
                <li
                  key={item}
                  className="rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Card>
        {/* Right column (experience card, square) */}
        <Card heading={experience.title} className="aspect-square">
          <ul className="space-y-5">
            {experience.roles.map((r, idx) => (
              <li key={idx} className="space-y-2">
                <div>
                  <p className="font-semibold text-neutral-800 dark:text-neutral-100">
                    {r.role}
                  </p>
                  <p className="text-xs font-medium text-neutral-500 dark:text-neutral-400">
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
      </div>

      {/* Paragraph */}
      <div className="mt-14 mx-auto max-w-3xl">
        <p className="text-center leading-relaxed text-sm sm:text-base text-neutral-600 dark:text-neutral-400">
          I'm a full‑stack developer who enjoys crafting focused, maintainable
          systems end‑to‑end. I iterate quickly, favor clarity over cleverness,
          and care about the subtle details—load speed, keyboard flow, semantic
          structure, and resilience. I love shipping things that feel effortless
          to use while being thoughtfully engineered underneath.
        </p>
      </div>
    </section>
  );
};

export default AboutMe;
