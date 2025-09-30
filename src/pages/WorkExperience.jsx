import React from "react";

const experiences = [
  {
    id: "block-intelligence",
    company: "Block Intelligence",
    role: "Front-end Developer Intern",
    dateRange: "Nov 2024 – Jan 2025",
    bullets: [
      "Developed efficient and maintainable code in HTML, CSS, and JavaScript.",
      "Built responsive UI layouts using Tailwind CSS and ensured cross-device compatibility.",
      "Collaborated on UI/UX design using Figma and translated mockups into pixel-perfect components.",
      "Gained experience in agile development methodologies and team collaboration.",
    ],
  },
];

const WorkExperience = () => {
  return (
    <section
      className="mx-auto max-w-4xl px-6 py-16"
      aria-label="Work Experience"
    >
      <h2 className="mb-12 text-center text-3xl font-bold tracking-tight">
        Work Experience
      </h2>

      <div className="space-y-8">
        {experiences.map((exp) => (
          <article
            key={exp.id}
            className="relative overflow-hidden rounded-xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md"
          >
            <header className="mb-4">
              <h3 className="text-xl font-semibold tracking-tight">
                {exp.company}
              </h3>
              <p className="text-sm font-medium text-emerald-600">{exp.role}</p>
              <p className="mt-1 text-xs uppercase tracking-wide text-neutral-500">
                {exp.dateRange}
              </p>
            </header>

            <ul className="space-y-2 text-sm leading-relaxed text-neutral-700">
              {exp.bullets.map((b, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-emerald-500">•</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>
    </section>
  );
};

export default WorkExperience;
