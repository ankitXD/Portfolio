import React, { useCallback, useRef, useState } from "react";
import { playTick, isSoundOn, setSoundOn } from "@/lib/sound";

const groups = [
  {
    label: "Frontend",
    items: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Radix",
      "Zustand",
      "TanStack Query",
      "Zod",
      "TipTap",
      "Vite",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "Express",
      "Laravel",
      "FastAPI",
      "Better Auth",
      "Socket.IO",
      "BullMQ",
      "JWT",
    ],
  },
  {
    label: "Data & infra",
    items: [
      "PostgreSQL",
      "MySQL",
      "Redis",
      "Drizzle ORM",
      "Prisma",
      "AWS S3",
      "Docker",
      "Vercel",
    ],
  },
  {
    label: "Audio & ML",
    items: ["Whisper", "pyannote", "Silero VAD", "SpeechBrain", "Hugging Face"],
  },
  {
    label: "Quality",
    items: ["Vitest", "Playwright", "Testing Library", "ESLint", "Prettier"],
  },
];

const Chip = ({ children }) => {
  const [ripples, setRipples] = useState([]);
  const counter = useRef(0);

  const press = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2.2;
    const id = counter.current++;
    const ripple = {
      id,
      size,
      x: e.clientX - rect.left - size / 2,
      y: e.clientY - rect.top - size / 2,
    };
    setRipples((prev) => [...prev, ripple]);
    setTimeout(() => {
      setRipples((prev) => prev.filter((r) => r.id !== id));
    }, 620);
    playTick();
  }, []);

  return (
    <button
      type="button"
      onPointerDown={press}
      className="relative touch-manipulation select-none overflow-hidden rounded-full border border-line px-4 py-2 font-serif text-[15px] leading-none text-ink/80 transition-all duration-200 hover:border-ink/30 hover:text-ink active:scale-[0.97]"
    >
      {ripples.map((r) => (
        <span
          key={r.id}
          aria-hidden="true"
          className="pointer-events-none absolute rounded-full bg-cobalt/25 animate-ripple"
          style={{ width: r.size, height: r.size, left: r.x, top: r.y }}
        />
      ))}
      <span className="relative z-10">{children}</span>
    </button>
  );
};

const SoundToggle = () => {
  const [on, setOn] = useState(() => isSoundOn());

  return (
    <button
      type="button"
      onClick={() => {
        const next = !on;
        setSoundOn(next);
        setOn(next);
        if (next) playTick();
      }}
      aria-pressed={on}
      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 font-sans text-[10px] uppercase tracking-[0.14em] text-mute transition-colors hover:border-ink/30 hover:text-ink"
    >
      <span
        aria-hidden="true"
        className={"h-1.5 w-1.5 rounded-full " + (on ? "bg-cobalt" : "bg-line")}
      />
      {on ? "Sound on" : "Sound off"}
    </button>
  );
};

const Stack = () => (
  <section id="stack" aria-label="Stack" className="scroll-mt-16 bg-paper">
    <div className="mx-auto max-w-page px-6 pb-20 sm:px-10 sm:pb-24">
      <div className="border-t border-line pt-10">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="font-sans text-[11px] uppercase tracking-[0.18em] text-mute">
              Stack
            </p>
            <h2 className="mt-4 max-w-[18ch] font-serif text-[clamp(2rem,4vw,3rem)] leading-[0.98] tracking-[-0.02em]">
              What I build with
            </h2>
          </div>
          <div className="flex flex-col items-start gap-4 sm:items-end">
            <p className="max-w-[38ch] font-serif text-[15px] leading-[1.5] text-ink/70 sm:text-right">
              Only what has shipped. No tutorials, no side-project toys — each of
              these is running in production somewhere.
            </p>
            <SoundToggle />
          </div>
        </div>

        <div className="mt-10 space-y-8 lg:space-y-7">
          {groups.map((g) => (
            <div
              key={g.label}
              className="grid gap-3 sm:grid-cols-[140px_minmax(0,1fr)] sm:items-baseline sm:gap-6"
            >
              <p className="font-sans text-[10px] uppercase tracking-[0.18em] text-mute sm:pt-2">
                {g.label}
              </p>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((item) => (
                  <li key={item}>
                    <Chip>{item}</Chip>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Stack;
