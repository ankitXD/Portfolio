import React from "react";

const Footer = () => {
  return (
    <footer className="mt-16 border-t border-neutral-200/80 bg-white/60 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 py-8 text-center text-sm text-neutral-600 sm:flex-row sm:text-left">
        <p>© 2025 Ankit Gupta. All rights reserved.</p>
        <p className="text-xs text-neutral-400">
          Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};

export default Footer;
