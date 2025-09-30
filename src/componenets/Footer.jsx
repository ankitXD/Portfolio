import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200/80 bg-white/60 backdrop-blur-sm dark:border-neutral-700/60 dark:bg-neutral-950/60">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-sm text-neutral-600 dark:text-neutral-400 sm:flex-row sm:text-left">
        <p className="text-neutral-700 dark:text-neutral-300">
          © 2025 Ankit Gupta. All rights reserved.
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500">
          Built with React, Tailwind CSS and Vanta.js
        </p>
      </div>
    </footer>
  );
};

export default Footer;
