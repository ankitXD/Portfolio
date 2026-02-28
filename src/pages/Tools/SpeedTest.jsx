import React, { useEffect, useReducer, useState, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
import { LazyMotion, domAnimation, m, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import {
  Download,
  Upload,
  Activity,
  Play,
  RotateCcw,
  Square,
} from "lucide-react";

/* ───── speed-test configuration ───── */
const TEST_DURATION = 10_000; // 10 seconds per phase
const PING_ITERATIONS = 5;
const CF_DOWN = "https://speed.cloudflare.com/__down";
const CF_UP = "https://speed.cloudflare.com/__up";

const DL_CHUNK_SIZES = [500_000, 2_000_000, 5_000_000, 10_000_000, 25_000_000];
const UL_CHUNK_SIZES = [500_000, 1_000_000, 2_000_000];

/* ───── SVG gauge helpers ───── */
const GAUGE_SIZE = 280;
const STROKE = 14;
const RADIUS = (GAUGE_SIZE - STROKE) / 2;
const CENTER = GAUGE_SIZE / 2;
const ARC_SPAN = 270;
const START_ANGLE = 135;
const MAX_SPEED = 250;

const polar = (angle) => {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + RADIUS * Math.cos(rad),
    y: CENTER + RADIUS * Math.sin(rad),
  };
};

const arc = (from, to) => {
  const s = polar(to);
  const e = polar(from);
  const large = to - from > 180 ? "1" : "0";
  return `M ${s.x} ${s.y} A ${RADIUS} ${RADIUS} 0 ${large} 0 ${e.x} ${e.y}`;
};

const BG_ARC = arc(START_ANGLE, START_ANGLE + ARC_SPAN);
const TICKS = [0, 25, 50, 100, 150, 200, 250];

/* ───── utility helpers ───── */
const gaugeColor = (speed) => {
  if (speed < 10) return "#ef4444";
  if (speed < 30) return "#f59e0b";
  if (speed < 75) return "#22c55e";
  return "#06b6d4";
};

const fmt = (v) => {
  if (v == null) return "—";
  if (v >= 1000) return (v / 1000).toFixed(1);
  if (v >= 100) return v.toFixed(0);
  if (v >= 10) return v.toFixed(1);
  return v.toFixed(2);
};

const unit = (v) => (v != null && v >= 1000 ? "Gbps" : "Mbps");

const PHASE_LABELS = {
  idle: "Press start to begin",
  ping: "Measuring latency…",
  download: "Testing download speed…",
  upload: "Testing upload speed…",
  complete: "Test complete",
};

/* ───── reducer for test state ───── */
const initialTestState = {
  phase: "idle",
  liveSpeed: 0,
  downloadResult: null,
  uploadResult: null,
  pingResult: null,
  progress: 0,
};

function testReducer(state, action) {
  switch (action.type) {
    case "START":
      return { ...initialTestState };
    case "STOP":
      return { ...state, phase: "idle", liveSpeed: 0, progress: 0 };
    case "SET_PHASE":
      return { ...state, phase: action.phase, progress: 0, liveSpeed: 0 };
    case "SET_LIVE_SPEED":
      return { ...state, liveSpeed: action.speed };
    case "SET_PROGRESS":
      return { ...state, progress: action.progress };
    case "SET_PING":
      return { ...state, pingResult: action.ping };
    case "SET_DOWNLOAD":
      return { ...state, downloadResult: action.download };
    case "SET_UPLOAD":
      return { ...state, uploadResult: action.upload };
    case "COMPLETE":
      return { ...state, phase: "complete", liveSpeed: 0 };
    default:
      return state;
  }
}

/* ───── extracted: SpeedGauge ───── */
const SpeedGauge = ({ displaySpeed, phase, dark, isRunning }) => {
  const gaugeAngle = Math.min(displaySpeed / MAX_SPEED, 1) * ARC_SPAN;
  const activeArc =
    gaugeAngle > 0.5 ? arc(START_ANGLE, START_ANGLE + gaugeAngle) : "";

  return (
    <m.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="relative mb-6"
    >
      <svg
        width={GAUGE_SIZE}
        height={GAUGE_SIZE}
        viewBox={`0 0 ${GAUGE_SIZE} ${GAUGE_SIZE}`}
      >
        {/* bg arc */}
        <path
          d={BG_ARC}
          fill="none"
          stroke={dark ? "#262626" : "#e5e5e5"}
          strokeWidth={STROKE}
          strokeLinecap="round"
        />

        {/* active arc */}
        {activeArc && (
          <path
            d={activeArc}
            fill="none"
            stroke={gaugeColor(displaySpeed)}
            strokeWidth={STROKE}
            strokeLinecap="round"
            style={{ transition: "d 0.35s ease, stroke 0.5s ease" }}
          />
        )}

        {/* tick labels */}
        {TICKS.map((t) => {
          const angle = START_ANGLE + (t / MAX_SPEED) * ARC_SPAN;
          const offset = 28;
          const rad = ((angle - 90) * Math.PI) / 180;
          return (
            <text
              key={t}
              x={CENTER + (RADIUS - offset) * Math.cos(rad)}
              y={CENTER + (RADIUS - offset) * Math.sin(rad)}
              textAnchor="middle"
              dominantBaseline="central"
              className="fill-neutral-400 dark:fill-neutral-600"
              fontSize={11}
              fontWeight={500}
            >
              {t}
            </text>
          );
        })}

        {/* small tick marks */}
        {TICKS.map((t) => {
          const angle = START_ANGLE + (t / MAX_SPEED) * ARC_SPAN;
          const outerR = RADIUS + 2;
          const innerR = RADIUS - 8;
          const rad = ((angle - 90) * Math.PI) / 180;
          return (
            <line
              key={`l-${t}`}
              x1={CENTER + outerR * Math.cos(rad)}
              y1={CENTER + outerR * Math.sin(rad)}
              x2={CENTER + innerR * Math.cos(rad)}
              y2={CENTER + innerR * Math.sin(rad)}
              stroke={dark ? "#404040" : "#d4d4d4"}
              strokeWidth={2}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Center readout */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <AnimatePresence mode="wait">
          <m.span
            key={phase === "complete" ? "final" : "live"}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="text-5xl sm:text-6xl font-bold tabular-nums leading-none"
          >
            {fmt(displaySpeed === 0 && phase === "idle" ? null : displaySpeed)}
          </m.span>
        </AnimatePresence>
        <span className="text-neutral-400 dark:text-neutral-500 text-xs uppercase tracking-[0.2em] mt-2">
          {unit(displaySpeed)}
        </span>

        {/* phase indicator dot */}
        {isRunning && (
          <m.span
            className="mt-3 flex items-center gap-1.5 text-[11px] text-neutral-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500" />
            </span>
            {phase === "ping" && "PING"}
            {phase === "download" && "DOWNLOAD"}
            {phase === "upload" && "UPLOAD"}
          </m.span>
        )}
      </div>
    </m.div>
  );
};

/* ───── extracted: ResultCards ───── */
const ResultCards = ({ downloadResult, uploadResult, pingResult }) => {
  const hasResults =
    downloadResult != null || uploadResult != null || pingResult != null;

  if (!hasResults) return null;

  return (
    <m.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "spring", stiffness: 200, damping: 22 }}
      className="grid grid-cols-3 gap-4 sm:gap-8 mt-12 max-w-md w-full"
    >
      {/* Download */}
      <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
        <Download size={22} className="text-cyan-500 mb-1" />
        <span className="text-2xl font-bold tabular-nums">
          {fmt(downloadResult)}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-neutral-400">
          {unit(downloadResult)} ↓
        </span>
      </div>

      {/* Upload */}
      <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
        <Upload size={22} className="text-emerald-500 mb-1" />
        <span className="text-2xl font-bold tabular-nums">
          {fmt(uploadResult)}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-neutral-400">
          {unit(uploadResult)} ↑
        </span>
      </div>

      {/* Ping */}
      <div className="flex flex-col items-center gap-1 p-4 rounded-xl bg-white/70 dark:bg-neutral-900/70 backdrop-blur-sm border border-neutral-200 dark:border-neutral-800">
        <Activity size={22} className="text-amber-500 mb-1" />
        <span className="text-2xl font-bold tabular-nums">
          {pingResult != null ? Math.round(pingResult) : "—"}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-neutral-400">
          MS PING
        </span>
      </div>
    </m.div>
  );
};

/* ───── main component ───── */
const SpeedTest = () => {
  const [dark, setDark] = useState(false);
  const [state, dispatch] = useReducer(testReducer, initialTestState);
  const abortRef = useRef(null);
  const runRef = useRef(false);

  const {
    phase,
    liveSpeed,
    downloadResult,
    uploadResult,
    pingResult,
    progress,
  } = state;

  /* ── theme ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const init = stored || (prefers ? "dark" : "light");
    if (init === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    document.title = "Speed Test | Ankit Gupta";
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  /* ── ping ── */
  const measurePing = async (signal) => {
    const times = [];
    for (let i = 0; i < PING_ITERATIONS; i++) {
      if (!runRef.current) return null;
      const t0 = performance.now();
      try {
        await fetch(`${CF_DOWN}?bytes=0&_=${Date.now()}`, {
          cache: "no-store",
          signal,
        });
        times.push(performance.now() - t0);
      } catch {
        /* skip */
      }
    }
    if (!times.length) return null;
    times.sort((a, b) => a - b);
    return times[Math.floor(times.length / 2)];
  };

  /* ── download (runs for TEST_DURATION ms) ── */
  const measureDownload = async (signal) => {
    const phaseStart = performance.now();
    let chunkIdx = 0;
    const samples = [];

    while (runRef.current) {
      const elapsed = performance.now() - phaseStart;
      if (elapsed >= TEST_DURATION) break;

      dispatch({
        type: "SET_PROGRESS",
        progress: Math.min((elapsed / TEST_DURATION) * 100, 100),
      });

      const bytes =
        DL_CHUNK_SIZES[Math.min(chunkIdx, DL_CHUNK_SIZES.length - 1)];
      chunkIdx++;

      const t0 = performance.now();
      try {
        const res = await fetch(`${CF_DOWN}?bytes=${bytes}&_=${Date.now()}`, {
          cache: "no-store",
          signal,
        });
        const reader = res.body.getReader();
        let received = 0;

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;
          received += value.length;

          const chunkElapsed = (performance.now() - t0) / 1000;
          if (chunkElapsed > 0.05) {
            const instantMbps = (received * 8) / (chunkElapsed * 1_000_000);
            dispatch({ type: "SET_LIVE_SPEED", speed: instantMbps });
          }

          const now = performance.now() - phaseStart;
          dispatch({
            type: "SET_PROGRESS",
            progress: Math.min((now / TEST_DURATION) * 100, 100),
          });
        }

        const chunkElapsed = (performance.now() - t0) / 1000;
        if (chunkElapsed > 0 && chunkIdx > 1) {
          const mbps = (received * 8) / (chunkElapsed * 1_000_000);
          samples.push({ mbps, weight: received });
        }
      } catch (e) {
        if (e.name === "AbortError") return null;
      }
    }

    dispatch({ type: "SET_PROGRESS", progress: 100 });
    if (!samples.length) return null;

    const totalWeight = samples.reduce((s, v) => s + v.weight, 0);
    return samples.reduce((s, v) => s + v.mbps * (v.weight / totalWeight), 0);
  };

  /* ── upload (runs for TEST_DURATION ms) ── */
  const measureUpload = async (signal) => {
    const phaseStart = performance.now();
    let chunkIdx = 0;
    const samples = [];

    while (runRef.current) {
      const elapsed = performance.now() - phaseStart;
      if (elapsed >= TEST_DURATION) break;

      dispatch({
        type: "SET_PROGRESS",
        progress: Math.min((elapsed / TEST_DURATION) * 100, 100),
      });

      const size =
        UL_CHUNK_SIZES[Math.min(chunkIdx, UL_CHUNK_SIZES.length - 1)];
      chunkIdx++;

      const blob = new Blob([new ArrayBuffer(size)]);
      const t0 = performance.now();

      try {
        await fetch(CF_UP, { method: "POST", body: blob, signal });
        const chunkElapsed = (performance.now() - t0) / 1000;
        if (chunkElapsed > 0) {
          const mbps = (size * 8) / (chunkElapsed * 1_000_000);
          if (chunkIdx > 1) samples.push({ mbps, weight: size });
          dispatch({ type: "SET_LIVE_SPEED", speed: mbps });
        }
      } catch (e) {
        if (e.name === "AbortError") return null;
      }
    }

    dispatch({ type: "SET_PROGRESS", progress: 100 });
    if (!samples.length) return null;

    const totalWeight = samples.reduce((s, v) => s + v.weight, 0);
    return samples.reduce((s, v) => s + v.mbps * (v.weight / totalWeight), 0);
  };

  /* ── orchestrator ── */
  const startTest = async () => {
    if (phase !== "idle" && phase !== "complete") {
      runRef.current = false;
      abortRef.current?.abort();
      dispatch({ type: "STOP" });
      return;
    }

    runRef.current = true;
    abortRef.current = new AbortController();
    const { signal } = abortRef.current;

    dispatch({ type: "START" });

    // 1 — Ping
    dispatch({ type: "SET_PHASE", phase: "ping" });
    const p = await measurePing(signal);
    if (!runRef.current) return;
    dispatch({ type: "SET_PING", ping: p });

    // 2 — Download
    dispatch({ type: "SET_PHASE", phase: "download" });
    const dl = await measureDownload(signal);
    if (!runRef.current) return;
    dispatch({ type: "SET_DOWNLOAD", download: dl });

    // 3 — Upload
    dispatch({ type: "SET_PHASE", phase: "upload" });
    const ul = await measureUpload(signal);
    if (!runRef.current) return;
    dispatch({ type: "SET_UPLOAD", upload: ul });

    // Done
    dispatch({ type: "COMPLETE" });
    runRef.current = false;
  };

  useEffect(
    () => () => {
      runRef.current = false;
      abortRef.current?.abort();
    },
    [],
  );

  /* ── derived values ── */
  const displaySpeed = phase === "complete" ? (downloadResult ?? 0) : liveSpeed;
  const isRunning = phase !== "idle" && phase !== "complete";

  /* ── render ── */
  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors flex flex-col selection:bg-cyan-600/30">
        {/* Theme toggle */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={toggleTheme}
            className="h-10 w-10 rounded-lg bg-neutral-200 dark:bg-neutral-800 flex items-center justify-center hover:bg-neutral-300 dark:hover:bg-neutral-700 transition-colors"
            aria-label="Toggle theme"
          >
            {dark ? (
              <FaSun className="text-amber-400" />
            ) : (
              <FaMoon className="text-neutral-600" />
            )}
          </button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 py-16">
          {/* Header */}
          <m.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-1"
          >
            Speed Test
          </m.h1>
          <m.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-neutral-500 dark:text-neutral-400 mb-10 text-sm"
          >
            {PHASE_LABELS[phase]}
          </m.p>

          {/* Gauge */}
          <SpeedGauge
            displaySpeed={displaySpeed}
            phase={phase}
            dark={dark}
            isRunning={isRunning}
          />

          {/* Progress bar (thin) */}
          <div className="w-64 h-1 rounded-full bg-neutral-200 dark:bg-neutral-800 overflow-hidden mb-8">
            <m.div
              className="h-full rounded-full"
              style={{
                backgroundColor: isRunning
                  ? gaugeColor(displaySpeed)
                  : "transparent",
              }}
              animate={{ width: `${isRunning ? progress : 0}%` }}
              transition={{ ease: "easeOut", duration: 0.4 }}
            />
          </div>

          {/* Start / Stop button */}
          <m.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={startTest}
            className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-semibold tracking-wide transition-colors shadow-lg ${
              isRunning
                ? "bg-red-500 hover:bg-red-600 text-white"
                : "bg-cyan-500 hover:bg-cyan-600 text-white"
            }`}
          >
            {isRunning ? (
              <>
                <Square size={16} fill="currentColor" /> STOP
              </>
            ) : phase === "complete" ? (
              <>
                <RotateCcw size={16} /> TEST AGAIN
              </>
            ) : (
              <>
                <Play size={16} fill="currentColor" /> START
              </>
            )}
          </m.button>

          {/* Results cards */}
          <AnimatePresence>
            <ResultCards
              downloadResult={downloadResult}
              uploadResult={uploadResult}
              pingResult={pingResult}
            />
          </AnimatePresence>

          {/* Powered-by note */}
          <p className="mt-10 text-[11px] text-neutral-400 dark:text-neutral-600">
            Powered by Cloudflare edge network
          </p>
        </div>
      </div>
    </LazyMotion>
  );
};

export default SpeedTest;
