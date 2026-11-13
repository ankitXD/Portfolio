import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const projects = [
  {
    id: "marwar-saheli",
    name: "Marwar Saheli",
    blurb:
      "Storefront and checkout for a Rajasthani spice label. Product pages, cart, and Razorpay payments.",
    website: "https://marwarsaheli.com/",
    stack: "React · Tailwind · Express · MongoDB",
    year: "2025",
  },
  {
    id: "zms",
    name: "Zoo Management System",
    blurb:
      "Ticketing and operations for a zoo. Animals, admins, orders and scheduled visits behind role-based access.",
    source: "https://github.com/ankitXD/ZMS",
    stack: "React · Express · MongoDB",
    year: "2025",
  },
  {
    id: "newspaper-tracker-bot",
    name: "Newspaper Tracker",
    blurb:
      "Telegram bot that scrapes the daily paper and returns the best link. Polling locally, webhook in production.",
    website: "https://t.me/Ankitkeapnekaamkabot",
    stack: "Node · axios · cheerio",
    year: "2025",
  },
];

const Projects = () => (
  <section id="projects" aria-label="Work" className="scroll-mt-16 bg-paper">
    <div className="mx-auto max-w-page px-6 py-20 sm:px-10 sm:py-24">
      <div className="flex items-baseline justify-between gap-6">
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] leading-none tracking-[-0.02em]">
          Selected work
        </h2>
        <span className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
          Three projects
        </span>
      </div>

      <div className="mt-10 border-t border-line">
        {projects.map((p, i) => (
          <article
            key={p.id}
            className="group grid grid-cols-1 items-baseline gap-x-8 gap-y-3 border-b border-line py-7 transition-colors duration-300 hover:bg-ink/[0.015] sm:grid-cols-[36px_minmax(0,1.1fr)_minmax(0,1.35fr)_auto]"
          >
            <span className="font-sans text-[11px] tabular-nums text-mute">
              {String(i + 1).padStart(2, "0")}
            </span>

            <h3 className="font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.05] tracking-[-0.015em] transition-colors duration-300 group-hover:text-cobalt">
              {p.name}
            </h3>

            <div>
              <p className="max-w-[52ch] font-serif text-[15px] leading-[1.45] text-ink/70">
                {p.blurb}
              </p>
              <p className="mt-2 font-sans text-[11px] tracking-[0.04em] text-mute">
                {p.stack}
              </p>
            </div>

            <div className="flex items-center gap-4 sm:justify-end">
              {p.website && (
                <a
                  href={p.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-serif text-[14px] text-ink/80 transition-colors hover:text-ink"
                >
                  <span className="link-underline">Live</span>
                  <FiArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
              {p.source && (
                <a
                  href={p.source}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 font-serif text-[14px] text-ink/80 transition-colors hover:text-ink"
                >
                  <span className="link-underline">Source</span>
                  <FiArrowUpRight className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
