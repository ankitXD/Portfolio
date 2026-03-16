import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerItems = [
    { label: "Services", path: "/services" },
    { label: "Privacy", path: "/privacy" },
    { label: "Terms", path: "/terms" },
    // { label: "Tools", path: "/tools" },
  ];

  return (
    <footer className="mt-16 border-t border-neutral-200/80 bg-white/60 backdrop-blur-sm dark:border-neutral-700/60 dark:bg-neutral-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-sm text-neutral-600 dark:text-neutral-400 sm:flex-row sm:text-left">
        <p className="text-neutral-700 dark:text-neutral-300">
          © {new Date().getFullYear()} Ankit Gupta. All rights reserved.
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          {footerItems.map((item, index) => (
            <React.Fragment key={item.path}>
              <Link
                to={item.path}
                className="hover:text-neutral-600 dark:hover:text-neutral-300 transition-colors"
              >
                {item.label}
              </Link>
              {index < footerItems.length - 1 && " • "}
            </React.Fragment>
          ))}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
