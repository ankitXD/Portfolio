import React from "react";
import { Link } from "react-router-dom";
import { AlertCircle, Home, ArrowRight } from "lucide-react";

const Custom404 = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-20 bg-white dark:bg-neutral-950 transition-colors duration-300">
      <div className="w-full max-w-2xl">
        {/* Main container */}
        <div className="flex flex-col items-center text-center space-y-8">
          {/* Icon with gradient effect */}
          <div className="relative">
            <div className="absolute inset-0 blur-2xl bg-gradient-to-r from-emerald-400/20 to-teal-400/20 dark:from-emerald-500/20 dark:to-teal-500/20 rounded-full" />
            <AlertCircle className="relative w-24 h-24 text-neutral-700 dark:text-neutral-300 transition-colors duration-300" />
          </div>

          {/* Main heading */}
          <div className="space-y-4">
            <div className="text-7xl font-bold">
              <span className="bg-gradient-to-r from-neutral-900 to-neutral-700 dark:from-neutral-100 dark:to-neutral-300 bg-clip-text text-transparent">
                404
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-neutral-100 font-brand">
              Page Not Found
            </h1>
            <p className="text-lg text-neutral-700 dark:text-neutral-400 max-w-md mx-auto">
              Oops! It seems like you've wandered into the void. The page you're
              looking for doesn't exist or has been moved.
            </p>
          </div>

          {/* Decorative line */}
          <div className="w-16 h-1 bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent rounded-full" />

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-neutral-900 hover:bg-neutral-800 dark:bg-neutral-100 dark:hover:bg-neutral-200 text-white dark:text-neutral-900 font-semibold rounded-lg transition-all duration-300 transform hover:scale-105 font-brand"
            >
              <Home className="w-5 h-5" />
              Go Home
            </Link>
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 hover:bg-neutral-50 dark:hover:bg-neutral-900/50 font-semibold rounded-lg transition-all duration-300 font-brand"
            >
              Go Back
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Subtle info card */}
          <div className="mt-8 w-full rounded-xl border border-neutral-200 dark:border-neutral-700 bg-white/70 dark:bg-neutral-900/60 backdrop-blur-sm p-6 transition-colors duration-300">
            <p className="text-sm text-neutral-600 dark:text-neutral-400">
              <span className="font-semibold">Error Code:</span> 404 • Page Not
              Found
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Custom404;
