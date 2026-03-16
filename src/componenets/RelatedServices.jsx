import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { servicesData } from "@/data/services";

const RelatedServices = ({ current }) => {
  const currentIndex = servicesData.findIndex((s) => s.slug === current);

  const related = Array.from(
    { length: 12 },
    (_, i) => servicesData[(currentIndex + i + 1) % servicesData.length],
  );

  return (
    <div>
      <h3 className="mb-6 text-sm font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
        Explore More Services
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {related.map((service) => (
          <Link
            key={service.slug}
            to={`/services/${service.slug}`}
            className="group relative flex flex-col rounded-xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm transition-all hover:border-neutral-300 hover:shadow-md dark:border-neutral-700 dark:bg-neutral-900/60 dark:hover:border-neutral-600"
          >
            <h4 className="mb-3 text-base font-semibold text-neutral-900 dark:text-neutral-50 group-hover:text-neutral-700 dark:group-hover:text-neutral-200 transition-colors">
              {service.title}
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-400 mb-4">
              {service.description}
            </p>
            <div className="mt-auto flex items-center justify-between">
              <span className="text-[11px] font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-600 dark:group-hover:text-neutral-400 transition-colors">
                Explore
              </span>
              <ArrowUpRight className="w-4 h-4 text-neutral-400 dark:text-neutral-500 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-all transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 dark:ring-white/5" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RelatedServices;
