import React from "react";
import {
  FaHtml5,
  FaCss3Alt,
  FaReact,
  FaNodeJs,
  FaGitAlt,
  FaDocker,
  FaAws,
  FaPython,
  FaJsSquare,
} from "react-icons/fa";
import {
  SiTypescript,
  SiTailwindcss,
  SiNextdotjs,
  SiExpress,
  SiMongodb,
  SiPostgresql,
  SiPostman,
} from "react-icons/si";

const Skills = () => {
  const skills = [
    { label: "HTML", icon: <FaHtml5 className="text-[#E96228]" /> },
    { label: "CSS", icon: <FaCss3Alt className="text-[#2862E9]" /> },
    { label: "JavaScript", icon: <FaJsSquare className="text-[#EFD81D]" /> },
    { label: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { label: "Tailwind", icon: <SiTailwindcss className="text-[#38BDF8]" /> },
    { label: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    {
      label: "Next.js",
      icon: <SiNextdotjs className="text-neutral-800 dark:text-white" />,
    },
    { label: "Node.js", icon: <FaNodeJs className="text-[#679E63]" /> },
    { label: "Express", icon: <SiExpress className="text-neutral-700" /> },
    { label: "MongoDB", icon: <SiMongodb className="text-[#4FAA41]" /> },
    { label: "PostgreSQL", icon: <SiPostgresql className="text-[#336791]" /> },
    { label: "Git", icon: <FaGitAlt className="text-[#F05133]" /> },
    { label: "Docker", icon: <FaDocker className="text-[#2496ED]" /> },
    { label: "AWS", icon: <FaAws className="text-[#FF9900]" /> },
    { label: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    { label: "Postman", icon: <SiPostman className="text-[#FF6C37]" /> },
  ];

  return (
    <section
      id="skills"
      className="mx-auto max-w-5xl px-6 py-16"
      aria-label="Skills"
    >
      <h2 className="mb-10 text-center text-3xl font-bold tracking-tight">
        Skills
      </h2>
      <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
        {skills.map((s) => (
          <li key={s.label}>
            <div
              className="flex h-24 w-full flex-col items-center justify-center gap-2 rounded-lg border border-neutral-200 bg-white text-center text-[0.65rem] font-medium uppercase tracking-wide text-neutral-700 shadow-sm transition hover:border-emerald-400 hover:shadow focus-within:ring-2 focus-within:ring-emerald-500"
              role="group"
              aria-label={s.label}
            >
              <span className="text-2xl drop-shadow-sm">{s.icon}</span>
              <span>{s.label}</span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Skills;
