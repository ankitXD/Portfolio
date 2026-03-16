import React from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { servicesData } from "@/data/services";

const ServiceCard = ({ service }) => {
  const navigate = useNavigate();

  return (
    <article
      onClick={() => navigate(`/services/${service.slug}`)}
      className="group relative flex h-full flex-col rounded-xl border border-neutral-200/50 bg-gradient-to-br from-white/80 to-white/60 p-6 shadow-sm transition-all duration-300 hover:border-neutral-300 hover:shadow-lg hover:-translate-y-1 dark:border-neutral-700/50 dark:bg-gradient-to-br dark:from-neutral-900/80 dark:to-neutral-900/60 dark:hover:border-neutral-600 cursor-pointer overflow-hidden"
    >
      {/* Background accent */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-50/50 to-transparent dark:from-neutral-800/20 dark:to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-neutral-900 dark:text-neutral-50 mb-3 group-hover:text-neutral-700 dark:group-hover:text-neutral-100 transition-colors duration-300">
          {service.title}
        </h3>
        <p className="text-sm text-neutral-600 dark:text-neutral-400 flex-1 leading-relaxed mb-4">
          {service.description}
        </p>

        {/* Arrow with animation */}
        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="text-xs font-medium text-neutral-500 dark:text-neutral-500 uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Learn more
          </span>
          <div className="flex items-center justify-center w-8 h-8 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-400 group-hover:bg-neutral-900 dark:group-hover:bg-neutral-100 group-hover:text-white dark:group-hover:text-neutral-900 transition-all duration-300 group-hover:translate-x-1">
            <ArrowRight className="w-4 h-4" />
          </div>
        </div>
      </div>
    </article>
  );
};

const Services = () => {
  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 scroll-mt-20 mt-10"
      id="services"
    >
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="mb-4 text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Services
        </h1>
        <p className="mb-8 text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          End-to-end web development, from landing pages and marketing sites to
          complex SaaS platforms, APIs, and AI integrations.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://cal.com/ankit-gupta/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
          >
            Book a free call
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="mailto:guptankit.2003@gmail.com"
            className="px-6 py-3 border border-neutral-300 text-neutral-900 rounded-lg font-medium hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Email me
          </a>
        </div>
      </header>

      {/* Services Grid */}
      <div className="mb-16">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servicesData.map((service) => (
            <ServiceCard key={service.slug} service={service} />
          ))}
        </div>
      </div>

      {/* CTA Footer */}
      <div className="rounded-lg border border-neutral-200 bg-white/70 p-12 text-center shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/70">
        <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Let's build something great
        </h2>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Whether you have a detailed spec or just a rough idea, I can help turn
          it into a polished, production-ready product.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://cal.com/ankit-gupta/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors inline-flex items-center gap-2"
          >
            Schedule a free call
            <ArrowUpRight className="w-4 h-4" />
          </a>
          <a
            href="mailto:guptankit.2003@gmail.com"
            className="px-6 py-3 border border-neutral-300 text-neutral-900 rounded-lg font-medium hover:bg-neutral-50 dark:border-neutral-600 dark:text-neutral-100 dark:hover:bg-neutral-900 transition-colors"
          >
            Email me
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
