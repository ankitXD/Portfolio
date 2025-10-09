import React from "react";
import { FiGlobe } from "react-icons/fi";
import { FaGithub } from "react-icons/fa";

const projects = [
  {
    id: "marwar-saheli",
    name: "Marwar Saheli",
    description:
      "An ecommerce platform for selling authentic Rajasthani spices online.",
    website: "https://marwarsaheli.com/",
    technologies: [
      "React.js",
      "Figma",
      "Tailwind CSS",
      "Express.js",
      "MongoDB",
      "Razorpay",
      "Node.js",
    ],
  },
  {
    id: "zms",
    name: "Zoo Managment System",
    description:
      "A full‑stack zoo management & ticketing platform Manage animals, admins, orders, messages & scheduled visits with role‑based access control.",
    website: "https://zms.chaipecharcha.tech/",
    source: "https://github.com/ankitXD/ZMS",
    technologies: [
      "React.js",
      "Express.js",
      "MongoDB",
      "Node.js",
      "Tailwind CSS",
      "Heroku",
    ],
  },
  {
    id: "newspaper-tracker-bot",
    name: "Newspaper Tracker Bot",
    description:
      "Lightweight Telegram bot that scrapes daily newspaper and returns the best link. Supports polling for local testing and webhook mode for production.",
    website: "https://t.me/Ankitkeapnekaamkabot",
    technologies: ["Node.js", "axios", "cheerio", "Heroku"],
  },
];

const ProjectCard = ({ project }) => (
  <article className="group relative flex h-full flex-col rounded-lg border border-neutral-200 bg-white p-5 shadow-sm transition-colors hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900 dark:hover:border-neutral-600">
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
            className="rounded-lg border border-neutral-300 bg-neutral-100 px-2 py-1 text-[10px] font-medium text-neutral-700 transition-colors duration-150 hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 cursor-pointer"
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
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
            className="inline-flex items-center gap-1.5 rounded-lg border border-neutral-300 bg-neutral-100 px-2.5 py-1.5 text-neutral-700 transition-colors hover:bg-neutral-200 hover:text-neutral-900 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
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
      <div className="mb-12 text-center">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Projects
        </h3>
        <h2 className="text-3xl sm:text-4xl tracking-tight text-neutral-900 dark:text-neutral-50">
          Proof of Work
        </h2>
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
