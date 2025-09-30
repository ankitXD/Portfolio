import React from "react";
import { FiGlobe } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    id: "toundra",
    name: "Toundra",
    description:
      "A fitness training platform with 6000+ paid users, built for real-time sessions and performance tracking.",
    website: "#",
    source: "#",
    technologies: ["Figma", "React.js", "Tailwind CSS", "Express.js"],
  },
  {
    id: "portfolio",
    name: "Portfolio Site",
    description:
      "My personal portfolio showcasing projects, skills, and a minimalist dark/light experience.",
    website: "#",
    source: "#",
    technologies: ["Vite", "React", "Tailwind", "Vanta.js"],
  },
  {
    id: "cms-lite",
    name: "CMS Lite",
    description:
      "A lightweight content management interface for small teams needing quick edits and publishing.",
    website: "#",
    source: "#",
    technologies: ["Node.js", "Express", "MongoDB", "Tailwind"],
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description:
      "Modular dashboard for tracking product KPIs with pluggable widgets and role-based access.",
    website: "#",
    source: "#",
    technologies: ["Next.js", "ShadCN", "PostgreSQL", "Prisma"],
  },
  {
    id: "task-flow",
    name: "Task Flow",
    description:
      "Kanban-inspired task management tool focusing on speed, keyboard shortcuts, and offline support.",
    website: "#",
    source: "#",
    technologies: ["React", "Redux Toolkit", "IndexedDB", "Tailwind"],
  },
  {
    id: "analytics-dashboard",
    name: "Analytics Dashboard",
    description:
      "Modular dashboard for tracking product KPIs with pluggable widgets and role-based access.",
    website: "#",
    source: "#",
    technologies: ["Next.js", "ShadCN", "PostgreSQL", "Prisma"],
  },
];

const ProjectCard = ({ project }) => (
  <article className="group relative flex h-full flex-col rounded-xl border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600">
    <div className="mb-4">
      <h3 className="text-xl font-semibold tracking-tight text-neutral-900 dark:text-neutral-50 line-clamp-1">
        {project.name}
      </h3>
    </div>
    <p className="mb-4 line-clamp-4 text-sm leading-relaxed text-neutral-600 dark:text-neutral-400">
      {project.description}
    </p>
    <div className="mt-auto flex flex-col gap-4">
      <ul className="flex flex-wrap gap-2">
        {project.technologies.map((t) => (
          <li
            key={t}
            className="rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-[10px] font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 cursor-pointer"
          >
            {t}
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-3 text-[11px] font-medium">
        {project.website && (
          <a
            href={project.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit website for ${project.name}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <FiGlobe className="h-3.5 w-3.5" />
            <span className="tracking-tight">Website</span>
          </a>
        )}
        {project.source && (
          <a
            href={project.source}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View source code for ${project.name}`}
            className="inline-flex items-center gap-1.5 rounded-md border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
          >
            <FaGithub className="h-3.5 w-3.5" />
            <span className="tracking-tight">Source</span>
          </a>
        )}
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
      <h3 className="mb-5 uppercase text-center text-xl tracking-tight">
        Projects
      </h3>
      <h2 className="mb-10 text-center text-3xl  tracking-tight">
        Proof of Work
      </h2>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
