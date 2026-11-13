import React from "react";

const experience = [
  {
    role: "Freelance Software Engineer",
    company: "Independent",
    period: "Jul 2025 — Present",
    points: [
      "Built and shipped full-stack applications on the MERN stack for client work.",
      "Designed REST APIs with JWT authentication and schema-level data modelling.",
      "Delivered production deployments across Vercel and Heroku.",
    ],
  },
];

const skills = [
  "React",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "Express",
  "MongoDB",
  "Postgres",
  "Prisma",
  "REST",
  "JWT",
  "Figma",
  "Vercel",
];

const AboutMe = () => (
  <section id="about" aria-label="About" className="scroll-mt-16 bg-paper">
    <div className="mx-auto max-w-page px-6 pb-20 sm:px-10 sm:pb-24">
      <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
        <div>
          <h2 className="max-w-[16ch] font-serif text-[clamp(2rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
            Background and how I work
          </h2>
          <p className="mt-5 max-w-[42ch] font-serif text-[16px] leading-[1.5] text-ink/70">
            Full-stack, end to end. I care about systems that stay maintainable
            after the first release, and about interfaces that do not need
            explaining.
          </p>

          <div className="mt-10">
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
              Toolkit
            </p>
            <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
              {skills.map((s) => (
                <li key={s} className="font-serif text-[15px] text-ink/80">
                  {s}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div>
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
            Experience
          </p>

          {experience.map((r) => (
            <div key={r.role} className="mt-4 border-t border-line pt-4">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-serif text-[22px] leading-none">{r.role}</h3>
                <span className="font-sans text-[11px] tabular-nums tracking-[0.04em] text-mute">
                  {r.period}
                </span>
              </div>
              <p className="mt-2 font-serif text-[15px] text-ink/60">{r.company}</p>

              <ul className="mt-5 space-y-2.5">
                {r.points.map((p) => (
                  <li
                    key={p}
                    className="flex gap-3 font-serif text-[15px] leading-[1.45] text-ink/70"
                  >
                    <span className="mt-[10px] h-px w-4 shrink-0 bg-ink/25" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default AboutMe;
