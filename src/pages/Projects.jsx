import React from "react";

const projects = [
  {
    id: "toundra",
    name: "Toundra",
    tag: "Freelance",
    image: "https://via.placeholder.com/480x320?text=Toundra",
    live: "#",
    github: "#",
    points: [
      "Design & Development: Customized website design using modern UI/UX principles, enhancing user engagement and accessibility.",
      "Content Management: Integrated Link content management system (CMS) for easy updates, allowing the client to manage content effortlessly.",
      "SEO Optimization: Implemented SEO best practices, improving website visibility and search engine rankings.",
    ],
    technologies: ["Figma", "React.js", "Tailwind CSS", "Express.js"],
  },
];

const ProjectCard = ({ project }) => (
  <article className="group relative flex flex-col overflow-hidden rounded-xl border border-neutral-200 bg-white/70 shadow-sm backdrop-blur-sm transition hover:shadow-md md:flex-row">
    <div className="relative w-full shrink-0 md:w-1/2">
      <img
        src={project.image}
        alt={`${project.name} preview`}
        className="h-full w-full object-cover"
        loading="lazy"
      />
      {project.tag && (
        <span className="absolute left-3 top-3 rounded-full bg-emerald-600 px-3 py-1 text-xs font-medium uppercase tracking-wide text-white shadow">
          {project.tag}
        </span>
      )}
    </div>

    <div className="flex flex-col justify-between gap-6 p-6 md:w-1/2">
      <header>
        <h3 className="text-xl font-semibold tracking-tight">{project.name}</h3>
      </header>

      <ul className="space-y-3 text-sm leading-relaxed text-neutral-700">
        {project.points.map((p, i) => (
          <li key={i} className="flex gap-2">
            <span className="text-emerald-500">•</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>

      <div className="mt-2 flex flex-wrap items-center gap-4">
        {project.live && (
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-emerald-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            Live
          </a>
        )}
        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-medium text-emerald-600 underline-offset-4 hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
          >
            GitHub
          </a>
        )}
      </div>

      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-500">
          Technologies Used
        </p>
        <ul className="flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <li
              key={t}
              className="rounded-md border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700"
            >
              {t}
            </li>
          ))}
        </ul>
      </div>
    </div>
  </article>
);

const Projects = () => {
  return (
    <section
      id="projects"
      className="mx-auto max-w-5xl px-6 py-16 scroll-mt-20"
      aria-label="Projects"
    >
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
        Projects
      </h2>
      <div className="space-y-10">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
