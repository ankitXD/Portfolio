import React, { useState, useRef } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import emailjs from "emailjs-com";

const fieldClass =
  "w-full border-b border-line bg-transparent py-2 font-serif text-[15px] text-ink placeholder-ink/35 outline-none transition-colors focus:border-ink";

const labelClass =
  "block font-sans text-[10px] uppercase tracking-[0.18em] text-mute";

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
        setStatus("Message sent. I'll reply within a few hours.");
        setForm({ name: "", email: "", subject: "", message: "" });
        setSending(false);
        setTimeout(() => setStatus(null), 5000);
      },
      (error) => {
        console.error("EmailJS error", error);
        setStatus("Failed to send. Try again, or email me directly.");
        setSending(false);
      }
    );
  };

  return (
    <section id="contact" aria-label="Contact" className="scroll-mt-16 bg-paper">
      <div className="mx-auto max-w-page px-6 pb-24 sm:px-10">
        <div className="grid gap-10 border-t border-line pt-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
          <div>
            <h2 className="max-w-[14ch] font-serif text-[clamp(2rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
              Have something worth building?
            </h2>

            <div className="mt-8 space-y-5">
              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
                  Email
                </p>
                <a
                  href="mailto:guptankit.2003@gmail.com"
                  className="mt-1 inline-block font-serif text-[17px] text-ink link-underline"
                >
                  guptankit.2003@gmail.com
                </a>
              </div>

              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
                  Elsewhere
                </p>
                <div className="mt-1.5 flex gap-4">
                  <a
                    href="https://github.com/ankitxD"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="text-ink/60 transition-colors hover:text-ink"
                  >
                    <FaGithub className="h-[17px] w-[17px]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ankit-gupta-s3v3nc3/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="text-ink/60 transition-colors hover:text-ink"
                  >
                    <FaLinkedin className="h-[17px] w-[17px]" />
                  </a>
                </div>
              </div>

              <div>
                <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
                  Location
                </p>
                <p className="mt-1 font-serif text-[15px] text-ink/70">
                  Delhi, India — working remotely worldwide
                </p>
              </div>
            </div>
          </div>

          <form ref={formRef} onSubmit={onSubmit} noValidate>
            <div className="grid gap-6">
              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    required
                    value={form.name}
                    onChange={onChange}
                    placeholder="Your name"
                    className={fieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
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
                    className={fieldClass}
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className={labelClass}>
                  Subject
                </label>
                <input
                  id="subject"
                  name="subject"
                  required
                  value={form.subject}
                  onChange={onChange}
                  placeholder="Project or role"
                  className={fieldClass}
                />
              </div>

              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  value={form.message}
                  onChange={onChange}
                  placeholder="A few lines is plenty."
                  className={`${fieldClass} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={sending}
                  className="inline-flex items-center rounded-full bg-ink px-6 py-2.5 font-sans text-[12px] uppercase tracking-[0.12em] text-paper transition-opacity hover:opacity-85 disabled:opacity-50"
                >
                  {sending ? "Sending…" : "Send"}
                </button>
                {status && (
                  <span role="status" className="font-serif text-[13px] text-ink/60">
                    {status}
                  </span>
                )}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default GetInTouch;
