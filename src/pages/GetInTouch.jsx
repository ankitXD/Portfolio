import React, { useState } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

const GetInTouch = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    // Placeholder submit logic
    setStatus("Message sent (demo).");
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16"
      aria-label="Get In Touch"
      id="contact"
    >
      <header className="mb-10 text-center">
        <h2 className="text-3xl font-bold tracking-tight">Get In Touch</h2>
        <p className="mt-3 text-sm text-neutral-600">
          Feel free to reach out for collaborations or just a friendly hello.
        </p>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Form */}
        <form
          onSubmit={onSubmit}
          className="relative rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm"
          noValidate
        >
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                required
                value={form.name}
                onChange={onChange}
                placeholder="Your name"
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={onChange}
                placeholder="you@example.com"
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                value={form.subject}
                onChange={onChange}
                placeholder="Project / Opportunity"
                className="w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={onChange}
                placeholder="Tell me a bit about what you need..."
                className="w-full resize-y rounded-md border border-neutral-300 bg-white px-3 py-2 text-sm outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-400/40"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-full bg-emerald-600 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
              >
                Send Message
              </button>
              {status && (
                <span className="text-xs font-medium text-emerald-600">
                  {status}
                </span>
              )}
            </div>
          </div>
        </form>

        {/* Contact Info */}
        <div className="space-y-8 rounded-2xl border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Contact Information
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700">
              <li>
                <a
                  href="mailto:chrispaul1311@gmail.com"
                  className="text-emerald-600 underline-offset-4 hover:underline"
                >
                  chrispaul1311@gmail.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+918928016153"
                  className="text-neutral-700 hover:text-emerald-600"
                >
                  +91 8928016153
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Social Media
            </h3>
            <ul className="mt-3 flex gap-4" aria-label="Social Links">
              <li>
                <a
                  href="https://github.com/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-emerald-400 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourusername"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-emerald-400 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  href="mailto:chrispaul1311@gmail.com"
                  className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-200 text-neutral-600 transition hover:border-emerald-400 hover:text-emerald-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
                  aria-label="Email"
                >
                  <FaEnvelope />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500">
              Location
            </h3>
            <p className="mt-2 text-sm text-neutral-700">India</p>
            <p className="mt-1 text-xs font-medium text-emerald-600">
              Available for remote work worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
