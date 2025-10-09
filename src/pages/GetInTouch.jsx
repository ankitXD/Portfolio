import React, { useState, useRef } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import emailjs from "emailjs-com";

const GetInTouch = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState(null);
  const [sending, setSending] = useState(false);
  const formRef = useRef(null);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setStatus(null);

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setStatus("Email service not configured");
      setSending(false);
      return;
    }

    emailjs.sendForm(serviceId, templateId, formRef.current, publicKey).then(
      () => {
        setStatus("Message sent, I'll contact you within a few hours.");
        setForm({ name: "", email: "", subject: "", message: "" });
        setSending(false);
        setTimeout(() => setStatus(null), 4000);
      },
      (error) => {
        console.error("EmailJS error", error);
        setStatus("Failed to send message. Try again later.");
        setSending(false);
      }
    );
  };

  return (
    <section
      className="mx-auto max-w-6xl px-6 py-16 scroll-mt-20"
      aria-label="Get In Touch"
      id="contact"
    >
      <header className="mb-10 text-center">
        <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-neutral-500 dark:text-neutral-400">
          Contact
        </h3>
        <h2 className="text-3xl sm:text-4xl  tracking-tight text-neutral-900 dark:text-neutral-50">
          Let's Connect
        </h2>
      </header>

      <div className="grid gap-10 md:grid-cols-2">
        {/* Form */}
        <form
          ref={formRef}
          onSubmit={onSubmit}
          className="relative rounded-lg border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/70"
          noValidate
        >
          <div className="grid gap-5">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400"
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
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-neutral-400"
              />
            </div>

            <div>
              <label
                htmlFor="email"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400"
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
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-neutral-400"
              />
            </div>

            <div>
              <label
                htmlFor="subject"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400"
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
                className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-neutral-400"
              />
            </div>

            <div>
              <label
                htmlFor="message"
                className="mb-1 block text-xs font-semibold uppercase tracking-wide text-neutral-600 dark:text-neutral-400"
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
                className="w-full resize-y rounded-lg border border-neutral-300 bg-white px-3 py-2 text-sm text-neutral-800 placeholder-neutral-400 outline-none transition focus:border-neutral-500 focus:ring-2 focus:ring-neutral-400/40 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-500 dark:focus:border-neutral-400"
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-neutral-900 px-6 py-2.5 text-sm font-medium text-white shadow-sm transition hover:bg-neutral-800 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-white dark:focus-visible:ring-neutral-300"
                disabled={sending}
              >
                {sending ? "Sending…" : "Send Message"}
              </button>
              {status && (
                <span className="text-xs font-medium text-neutral-600 dark:text-neutral-300">
                  {status}
                </span>
              )}
            </div>
          </div>
        </form>

        {/* Contact Info */}
        <div className="space-y-8 rounded-lg border border-neutral-200 bg-white/70 p-6 shadow-sm backdrop-blur-sm dark:border-neutral-700 dark:bg-neutral-900/70">
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Contact Information
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-neutral-700 dark:text-neutral-300">
              <li>
                <a
                  href="mailto:guptankit.2003@gmail.com"
                  className="text-neutral-700 underline-offset-4 hover:underline dark:text-neutral-300 dark:hover:text-neutral-100"
                >
                  guptankit.2003@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Social Media
            </h3>
            <ul className="mt-3 flex gap-4" aria-label="Social Links">
              <li>
                <a
                  href="https://github.com/ankitXD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-400"
                  aria-label="GitHub"
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/ankit-gupta-s3v3nc3/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-neutral-200 text-neutral-600 transition-colors hover:border-neutral-400 hover:text-neutral-900 focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-500 dark:border-neutral-700 dark:text-neutral-400 dark:hover:border-neutral-500 dark:hover:text-neutral-200 dark:focus-visible:ring-neutral-400"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wide text-neutral-500 dark:text-neutral-400">
              Location
            </h3>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">
              India
            </p>
            <p className="mt-2 text-xs font-medium text-neutral-500 dark:text-neutral-400">
              Available for remote work worldwide
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
