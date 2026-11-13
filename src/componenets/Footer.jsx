import React from "react";
import { Link } from "react-router-dom";

const footerItems = [
  { label: "Services", path: "/services" },
  { label: "Privacy", path: "/privacy" },
  { label: "Terms", path: "/terms" },
];

const Footer = () => (
  <footer className="border-t border-line bg-paper">
    <div className="mx-auto max-w-page px-6 py-8 sm:px-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-serif text-[14px] text-ink/60">
          © {new Date().getFullYear()} Ankit Gupta
        </p>
        <nav className="flex flex-wrap items-center gap-5">
          {footerItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className="font-serif text-[14px] text-ink/60 transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://github.com/ankitxD"
            target="_blank"
            rel="noopener noreferrer"
            className="font-serif text-[14px] text-ink/60 transition-colors hover:text-ink"
          >
            GitHub
          </a>
        </nav>
      </div>
    </div>
  </footer>
);

export default Footer;
