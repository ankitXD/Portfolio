import React from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight } from "react-icons/fi";
import { servicesData } from "@/data/services";

const ServiceRow = ({ service, index }) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate(`/services/${service.slug}`)}
      className="group grid w-full grid-cols-[32px_minmax(0,1fr)] items-baseline gap-x-6 border-b border-line py-6 text-left transition-colors duration-300 hover:bg-ink/[0.015] sm:grid-cols-[36px_minmax(0,1.1fr)_minmax(0,1.4fr)_auto] sm:gap-x-8"
    >
      <span className="font-sans text-[11px] tabular-nums text-mute">
        {String(index + 1).padStart(2, "0")}
      </span>

      <h3 className="font-serif text-[clamp(1.35rem,2.1vw,1.75rem)] leading-[1.1] tracking-[-0.01em] transition-colors duration-300 group-hover:text-cobalt">
        {service.title}
      </h3>

      <p className="col-start-2 mt-2 max-w-[54ch] font-serif text-[15px] leading-[1.45] text-ink/70 sm:col-start-auto sm:mt-0">
        {service.description}
      </p>

      <span className="col-start-2 mt-3 inline-flex items-center gap-1 font-serif text-[14px] text-ink/60 transition-colors group-hover:text-ink sm:col-start-auto sm:mt-0 sm:justify-self-end">
        Read
        <FiArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      </span>
    </button>
  );
};

const Services = () => (
  <section
    id="services"
    className="scroll-mt-16 bg-paper"
    aria-label="Services"
  >
    <div className="mx-auto max-w-page px-6 pb-20 pt-28 sm:px-10 sm:pb-24">
      <div className="grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <h1 className="max-w-[22ch] font-serif text-[clamp(2rem,4.4vw,3.25rem)] leading-[0.98] tracking-[-0.02em]">
            End-to-end web development, from first screen to production.
          </h1>
          <p className="mt-5 max-w-[50ch] font-serif text-[16px] leading-[1.5] text-ink/70">
            Landing pages and marketing sites through to SaaS platforms, APIs
            and AI integrations.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <a
              href="https://cal.com/ankit-gupta/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-2.5 font-sans text-[12px] uppercase tracking-[0.12em] text-paper transition-opacity hover:opacity-85"
            >
              Book a call
              <FiArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <a
              href="mailto:guptankit.2003@gmail.com"
              className="font-serif text-[15px] text-ink/70 link-underline"
            >
              or email me
            </a>
          </div>
        </div>

        <div className="self-end">
          <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
            What I take on
          </p>
          <p className="mt-2 max-w-[44ch] font-serif text-[16px] leading-[1.5] text-ink/70">
            Most engagements are a few weeks long, scoped around one product
            surface: a storefront, a dashboard, an API. Fixed scope, fixed price.
          </p>
        </div>
      </div>

      <div className="mt-14 border-t border-line">
        {servicesData.map((service, i) => (
          <ServiceRow key={service.slug} service={service} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Services;
