import React from "react";

const services = [
  {
    id: "full-stack",
    title: "Full Stack Development",
    price: "Starting from $2000",
    description:
      "Complete web application development from concept to deployment",
    accent: "from-emerald-500/10 to-emerald-500/0",
  },
  {
    id: "frontend",
    title: "Frontend Development",
    price: "Starting from $800",
    description: "Modern, responsive user interfaces using React and Next.js",
    accent: "from-cyan-500/10 to-cyan-500/0",
  },
  {
    id: "backend",
    title: "Backend Development",
    price: "Starting from $1000",
    description:
      "Scalable server-side solutions with APIs and database integration",
    accent: "from-amber-500/10 to-amber-500/0",
  },
];

const FreelanceServices = () => {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16"
      aria-label="Freelance Services"
    >
      <header className="mb-12 text-center">
        <h2 className="text-3xl font-bold tracking-tight">
          Freelance Services
        </h2>
        <p className="mt-3 text-sm text-neutral-600">
          Flexible, high-quality development offerings
        </p>
      </header>

      <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((s) => (
          <li key={s.id} className="group">
            <div className="relative flex h-full flex-col overflow-hidden rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition hover:shadow-md">
              <div
                className={`pointer-events-none absolute inset-0 bg-gradient-to-b ${s.accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
                aria-hidden="true"
              />
              <div className="relative">
                <h3 className="text-lg font-semibold tracking-tight">
                  {s.title}
                </h3>
                <p className="mt-1 text-sm font-medium text-emerald-600">
                  {s.price}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-neutral-700">
                  {s.description}
                </p>
              </div>
              <div className="relative mt-6 pt-4">
                <button
                  type="button"
                  className="inline-flex items-center rounded-full border border-emerald-600 px-4 py-2 text-xs font-medium uppercase tracking-wide text-emerald-700 transition hover:bg-emerald-600 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                >
                  Get Quote
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FreelanceServices;
