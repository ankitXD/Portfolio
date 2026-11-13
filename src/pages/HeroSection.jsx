// Hero composition rebuilt from Sam Cheng's "Lanyard ID Badge Portfolio"
// (lookap entry 1oi0w9-lanyard-id-badge-portfolio), measured with lookap.
// Credit kept in Footer.jsx per lookap's agent terms.
import React, { useEffect, useRef, useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

const Pill = ({ children }) => (
  <span className="rounded-full border border-ink/15 px-2 py-[3px] font-sans text-[9px] font-medium tracking-[0.02em] text-ink">
    {children}
  </span>
);

const MAX_ANGLE = 0.62;
const GRAVITY = 2900;
const LENGTH = 320;
const FREE_DAMPING = 1.05;
const DRAG_STIFFNESS = 260;
const DRAG_DAMPING = 19;
const HINGE = 0.62;

const Lanyard = () => {
  const strapRef = useRef(null);
  const cardRef = useRef(null);
  const frame = useRef(0);
  const sim = useRef({
    angle: 0,
    vel: 0,
    target: 0,
    dragging: false,
    pivotX: 0,
    pivotY: 0,
    running: false,
  });
  const [grabbing, setGrabbing] = useState(false);

  const paint = () => {
    const s = sim.current;
    if (strapRef.current) {
      strapRef.current.style.transform = `rotate(${s.angle}rad)`;
    }
    if (cardRef.current) {
      cardRef.current.style.transform = `rotate(${-s.angle * HINGE}rad) scale(${
        s.dragging ? 1.015 : 1
      })`;
    }
  };

  const start = () => {
    const s = sim.current;
    if (s.running) return;
    s.running = true;
    let last = performance.now();

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000, 1 / 30);
      last = now;

      if (s.dragging) {
        const acc =
          DRAG_STIFFNESS * (s.target - s.angle) - DRAG_DAMPING * s.vel;
        s.vel += acc * dt;
        s.angle += s.vel * dt;
        paint();
        frame.current = requestAnimationFrame(tick);
        return;
      }

      const acc = -(GRAVITY / LENGTH) * Math.sin(s.angle) - FREE_DAMPING * s.vel;
      s.vel += acc * dt;
      s.angle += s.vel * dt;
      paint();

      if (Math.abs(s.angle) < 0.002 && Math.abs(s.vel) < 0.02) {
        s.angle = 0;
        s.vel = 0;
        paint();
        s.running = false;
        frame.current = 0;
        return;
      }
      frame.current = requestAnimationFrame(tick);
    };

    frame.current = requestAnimationFrame(tick);
  };

  useEffect(() => {
    const s = sim.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    s.vel = -1.15;
    start();
    return () => {
      cancelAnimationFrame(frame.current);
      frame.current = 0;
      s.running = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPointerDown = (e) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    const rect = strapRef.current.getBoundingClientRect();
    const s = sim.current;
    s.dragging = true;
    s.pivotX = rect.left + rect.width / 2;
    s.pivotY = rect.top + window.innerHeight * 0.04;
    s.target = s.angle;
    setGrabbing(true);
    start();
  };

  const onPointerMove = (e) => {
    const s = sim.current;
    if (!s.dragging) return;
    const dx = e.clientX - s.pivotX;
    const dy = Math.max(e.clientY - s.pivotY, 90);
    const next = Math.max(-MAX_ANGLE, Math.min(MAX_ANGLE, -Math.atan2(dx, dy)));
    s.target = next;
  };

  const onPointerUp = () => {
    const s = sim.current;
    if (!s.dragging) return;
    s.dragging = false;
    setGrabbing(false);
    start();
  };

  return (
    <div className="flex flex-col items-center">
      <div
        ref={strapRef}
        className="flex flex-col items-center will-change-transform"
        style={{ transformOrigin: "50% 0%" }}
      >
        <div className="relative h-[126px] w-[220px] sm:h-[286px] sm:w-[240px]">
          <span
            className="absolute bottom-0 left-1/2 h-[170px] w-[12px] rounded-[1px] bg-[#161616] sm:h-[330px] sm:w-[14px]"
            style={{ transform: "translateX(-50%) rotate(11deg)", transformOrigin: "bottom center" }}
          />
          <span
            className="absolute bottom-0 left-1/2 h-[170px] w-[12px] rounded-[1px] bg-[#202020] sm:h-[330px] sm:w-[14px]"
            style={{ transform: "translateX(-50%) rotate(-11deg)", transformOrigin: "bottom center" }}
          />
        </div>

        <div className="relative z-10 -mt-[3px] flex flex-col items-center">
          <div className="h-[14px] w-[7px] rounded-t-sm border border-neutral-400 bg-gradient-to-b from-neutral-200 to-neutral-400" />
          <div className="h-[18px] w-[13px] rounded-b-[4px] border border-neutral-400 bg-gradient-to-b from-neutral-300 to-neutral-500" />
        </div>

        <div
          ref={cardRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          role="img"
          aria-label="Ankit Gupta — full stack developer, Delhi. Drag to swing."
          style={{ transformOrigin: "50% 0%" }}
          className={
            "relative mt-[-2px] w-[214px] touch-none select-none will-change-transform rounded-[16px] border border-neutral-300/90 bg-white/55 p-[10px] shadow-[0_44px_80px_-34px_rgba(0,0,0,0.5)] transition-shadow duration-300 sm:w-[268px] sm:rounded-[18px] sm:p-[11px] " +
            (grabbing
              ? "cursor-grabbing shadow-[0_60px_100px_-40px_rgba(0,0,0,0.55)]"
              : "cursor-grab")
          }
        >
          <div className="pointer-events-none absolute inset-x-7 top-[5px] h-[3px] rounded-full bg-white/70" />
          <div className="flex h-[306px] flex-col justify-between rounded-[10px] bg-white px-5 pb-5 pt-6 ring-1 ring-black/[0.06] sm:h-[392px] sm:px-6 sm:pb-6 sm:pt-7">
            <div className="font-serif leading-[0.76] tracking-[-0.015em]">
              <span className="block text-[44px] sm:text-[60px]">Ankit</span>
              <span className="block pl-2 text-[44px] text-cobalt sm:text-[60px]">
                Gupta
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <div>
                <p className="font-sans text-[7px] uppercase tracking-[0.16em] text-neutral-400 sm:text-[8px]">
                  Currently
                </p>
                <p className="mt-1 font-serif text-[12px] leading-[1.25] sm:text-[14px]">
                  Full stack developer, Delhi
                </p>
              </div>
              <div>
                <p className="font-sans text-[7px] uppercase tracking-[0.16em] text-neutral-400 sm:text-[8px]">
                  Previously
                </p>
                <div className="mt-[6px] flex flex-wrap gap-1">
                  <Pill>Viral Works Tech</Pill>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const HeroSection = () => (
  <section
    id="home"
    aria-label="Intro"
    className="relative min-h-[100svh] overflow-hidden bg-paper"
  >
    <div className="relative z-20 mx-auto grid max-w-page grid-cols-1 gap-4 px-6 pt-24 sm:grid-cols-2 sm:gap-8 sm:px-10 sm:pt-28">
      <p className="max-w-[230px] font-serif text-[15px] leading-[1.35] text-ink">
        I build products and the systems behind them.{" "}
        <a href="#about" className="link-underline">
          more
        </a>
      </p>
      <div className="sm:justify-self-end sm:text-right">
        <p className="max-w-[230px] font-serif text-[15px] leading-[1.35] text-ink">
          Currently freelancing in Delhi,
          <br />
          open to full-time work.
        </p>
        <div className="mt-3 flex gap-3 sm:justify-end">
          <a
            href="https://github.com/ankitxD"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-ink/50 transition-colors hover:text-ink"
          >
            <FaGithub className="h-[14px] w-[14px]" />
          </a>
          <a
            href="https://www.linkedin.com/in/ankit-gupta-s3v3nc3/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-ink/50 transition-colors hover:text-ink"
          >
            <FaLinkedin className="h-[14px] w-[14px]" />
          </a>
        </div>
      </div>
    </div>

    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none pb-[4vw] text-center"
    >
      <span className="block whitespace-nowrap font-serif text-[26vw] leading-[0.78] tracking-[-0.035em] text-ink">
        Ankit Gupta
      </span>
    </div>

    <div className="absolute left-1/2 top-0 z-10 -translate-x-1/2 pt-[208px] sm:pt-0">
      <Lanyard />
    </div>
  </section>
);

export default HeroSection;
