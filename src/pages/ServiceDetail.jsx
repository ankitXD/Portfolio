import React from "react";
import { useParams } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { getServiceBySlug } from "@/data/services";
import RelatedServices from "@/componenets/RelatedServices";
import Custom404 from "@/componenets/Custom404";

const Card = ({ children, heading, className = "" }) => (
  <div
    className={
      "relative flex flex-col rounded-xl border border-neutral-200 bg-white/70 p-5 shadow-sm backdrop-blur-sm transition-colors dark:border-neutral-700 dark:bg-neutral-900/60 " +
      className
    }
  >
    {heading && (
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-neutral-700 dark:text-neutral-300">
        {heading}
      </h3>
    )}
    <div className="flex-1 space-y-3 text-sm text-neutral-700 dark:text-neutral-300">
      {children}
    </div>
    <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-black/5 dark:ring-white/5" />
  </div>
);

const ServiceDetail = () => {
  const { slug } = useParams();
  const service = getServiceBySlug(slug);

  if (!service) {
    return <Custom404 />;
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20 scroll-mt-20">
      {/* Header */}
      <div className="mb-12 text-center">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          {service.subheading}
        </h3>
        <h1 className="mb-6 text-4xl sm:text-5xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          {service.title}
        </h1>
        <p className="mx-auto max-w-3xl text-lg leading-relaxed text-neutral-600 dark:text-neutral-400">
          {service.descriptionLong}
        </p>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
        <a
          href="https://cal.com/ankit-gupta/30min"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
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

      {/* Content Sections */}
      {service.sections && service.sections.length > 0 && (
        <div className="space-y-16 mb-16">
          {service.sections.map((section, index) => (
            <div key={index}>
              <Card heading={section.heading}>
                <div className="space-y-4">
                  {section.items.map((item, itemIndex) => (
                    <div key={itemIndex}>
                      <p className="font-semibold text-neutral-900 dark:text-neutral-100 mb-2">
                        {item.title}
                      </p>
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {item.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          ))}
        </div>
      )}

      {/* Tech Stack */}
      <div className="mb-16">
        <Card heading="Technologies">
          <ul className="flex flex-wrap gap-2">
            {service.technologies.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-neutral-300 bg-neutral-100 px-2 py-1 text-[11px] font-medium text-neutral-700 transition-colors hover:border-neutral-400 hover:bg-neutral-200 dark:border-neutral-600 dark:bg-neutral-800 dark:text-neutral-300 dark:hover:border-neutral-500 dark:hover:bg-neutral-700 cursor-pointer"
              >
                {tech}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Deliverables */}
      <div className="mb-16">
        <Card heading="What You Get">
          <ul className="space-y-2">
            {service.deliverables.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-neutral-700 dark:text-neutral-300"
              >
                <span className="mt-1.5 flex h-2 w-2 flex-shrink-0 rounded-full bg-neutral-700 dark:bg-neutral-400" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* CTA Footer */}
      <div className="rounded-lg border border-neutral-200 bg-white/70 p-12 text-center shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/70">
        <h2 className="mb-4 text-2xl sm:text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-50">
          Ready to build something amazing?
        </h2>
        <p className="mb-8 text-neutral-600 dark:text-neutral-400 max-w-xl mx-auto">
          Let's talk about your project and how we can bring your vision to
          life.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <a
            href="https://cal.com/ankit-gupta/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-200 transition-colors"
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

      {/* Related Services */}
      <div className="mt-16">
        <RelatedServices current={slug} />
      </div>
    </section>
  );
};

export default ServiceDetail;
