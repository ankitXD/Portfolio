import React, { useEffect, useState, useCallback, useRef } from "react";
import { FaSun, FaMoon } from "react-icons/fa";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Check,
  RefreshCw,
  Shield,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  Eye,
  EyeOff,
} from "lucide-react";

/* ───── character sets ───── */
const UPPER = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const LOWER = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const SYMBOLS = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`";

/* ───── strength evaluator ───── */
const getStrength = (pwd) => {
  if (!pwd)
    return {
      label: "None",
      color: "bg-neutral-300 dark:bg-neutral-700",
      text: "text-neutral-400",
      percent: 0,
      icon: ShieldX,
    };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 14) score++;
  if (pwd.length >= 20) score++;
  if (/[a-z]/.test(pwd)) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^a-zA-Z0-9]/.test(pwd)) score++;

  if (score <= 2)
    return {
      label: "Weak",
      color: "bg-red-500",
      text: "text-red-500",
      percent: 25,
      icon: ShieldX,
    };
  if (score <= 4)
    return {
      label: "Fair",
      color: "bg-amber-500",
      text: "text-amber-500",
      percent: 50,
      icon: ShieldAlert,
    };
  if (score <= 5)
    return {
      label: "Strong",
      color: "bg-emerald-500",
      text: "text-emerald-500",
      percent: 75,
      icon: Shield,
    };
  return {
    label: "Very Strong",
    color: "bg-emerald-400",
    text: "text-emerald-400",
    percent: 100,
    icon: ShieldCheck,
  };
};

/* ───── component ───── */
const PasswordGenerator = () => {
  const [dark, setDark] = useState(false);
  const [password, setPassword] = useState("");
  const [length, setLength] = useState(16);
  const [uppercase, setUppercase] = useState(true);
  const [lowercase, setLowercase] = useState(true);
  const [numbers, setNumbers] = useState(true);
  const [symbols, setSymbols] = useState(true);
  const [copied, setCopied] = useState(false);
  const [visible, setVisible] = useState(true);
  const [history, setHistory] = useState([]);
  const passwordRef = useRef(null);

  /* ── theme ── */
  useEffect(() => {
    const stored = localStorage.getItem("theme");
    const prefers = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefers ? "dark" : "light");
    if (initial === "dark") {
      document.documentElement.classList.add("dark");
      setDark(true);
    }
  }, []);

  useEffect(() => {
    document.title = "Password Generator | Ankit Gupta";
  }, []);

  const toggleTheme = () => {
    setDark((d) => {
      const next = !d;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("theme", next ? "dark" : "light");
      return next;
    });
  };

  /* ── generate ── */
  const generate = useCallback(() => {
    let charset = "";
    if (uppercase) charset += UPPER;
    if (lowercase) charset += LOWER;
    if (numbers) charset += DIGITS;
    if (symbols) charset += SYMBOLS;

    if (!charset) {
      setPassword("");
      return;
    }

    const array = new Uint32Array(length);
    crypto.getRandomValues(array);
    let pwd = "";
    for (let i = 0; i < length; i++) {
      pwd += charset[array[i] % charset.length];
    }

    /* guarantee at least one of each selected type */
    const guarantees = [];
    if (uppercase) guarantees.push(UPPER);
    if (lowercase) guarantees.push(LOWER);
    if (numbers) guarantees.push(DIGITS);
    if (symbols) guarantees.push(SYMBOLS);

    const arr = pwd.split("");
    const rand = new Uint32Array(guarantees.length * 2);
    crypto.getRandomValues(rand);
    guarantees.forEach((set, i) => {
      const pos = rand[i] % arr.length;
      arr[pos] = set[rand[i + guarantees.length] % set.length];
    });

    const result = arr.join("");
    setPassword(result);
    setHistory((prev) => [result, ...prev].slice(0, 5));
    setCopied(false);
  }, [length, uppercase, lowercase, numbers, symbols]);

  /* generate on mount + option change */
  useEffect(() => {
    generate();
  }, [generate]);

  /* ── copy ── */
  const copyToClipboard = async () => {
    if (!password) return;
    try {
      await navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* fallback */
      const el = document.createElement("textarea");
      el.value = password;
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const strength = getStrength(password);
  const StrengthIcon = strength.icon;

  const noneSelected = !uppercase && !lowercase && !numbers && !symbols;

  /* ── toggle helper ── */
  const Toggle = ({ checked, onChange, label }) => (
    <label className="flex items-center justify-between cursor-pointer group">
      <span className="text-sm font-medium text-neutral-700 dark:text-neutral-300 group-hover:text-violet-600 dark:group-hover:text-violet-400 transition-colors">
        {label}
      </span>
      <button
        role="switch"
        aria-checked={checked}
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500 focus-visible:ring-offset-2 ${
          checked ? "bg-violet-600" : "bg-neutral-300 dark:bg-neutral-600"
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow-lg ring-0 transition-transform duration-200 ease-in-out ${
            checked ? "translate-x-5" : "translate-x-0"
          }`}
        />
      </button>
    </label>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-violet-50/40 to-indigo-50 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 transition-colors duration-300 font-brand">
      {/* ── theme toggle ── */}
      <div className="absolute top-4 right-4 z-50">
        <button
          onClick={toggleTheme}
          className="h-10 w-10 rounded-xl bg-white/80 dark:bg-neutral-800/80 backdrop-blur-sm border border-neutral-200 dark:border-neutral-700 flex items-center justify-center shadow-sm hover:scale-105 transition-transform"
          aria-label="Toggle theme"
        >
          {dark ? (
            <FaSun className="text-amber-400" />
          ) : (
            <FaMoon className="text-violet-600" />
          )}
        </button>
      </div>

      {/* ── main content ── */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-16 sm:px-6">
        {/* header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-semibold tracking-wide uppercase mb-4">
            <Shield className="w-3.5 h-3.5" />
            Secure &amp; Random
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 dark:from-violet-400 dark:via-purple-400 dark:to-indigo-400 bg-clip-text text-transparent">
            Password Generator
          </h1>
          <p className="mt-3 text-neutral-500 dark:text-neutral-400 max-w-md mx-auto text-sm sm:text-base">
            Generate cryptographically secure passwords tailored to your needs.
          </p>
        </motion.div>

        {/* card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="w-full max-w-lg"
        >
          <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-700/60 bg-white/70 dark:bg-neutral-900/70 backdrop-blur-xl shadow-xl shadow-violet-500/5 dark:shadow-black/20 overflow-hidden">
            {/* ─ password display ─ */}
            <div className="p-5 sm:p-6 border-b border-neutral-200/60 dark:border-neutral-700/40">
              <div className="flex items-center gap-2 rounded-xl bg-neutral-100/80 dark:bg-neutral-800/80 border border-neutral-200 dark:border-neutral-700 px-4 py-3">
                <div
                  ref={passwordRef}
                  className="flex-1 min-w-0 font-mono text-base sm:text-lg tracking-wide text-neutral-800 dark:text-neutral-100 select-all overflow-x-auto whitespace-nowrap scrollbar-none"
                >
                  {noneSelected ? (
                    <span className="text-neutral-400 dark:text-neutral-500 text-sm italic">
                      Select at least one character type
                    </span>
                  ) : visible ? (
                    password
                  ) : (
                    "•".repeat(password.length)
                  )}
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={() => setVisible((v) => !v)}
                    className="p-2 rounded-lg text-neutral-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors"
                    title={visible ? "Hide password" : "Show password"}
                  >
                    {visible ? (
                      <Eye className="w-4 h-4" />
                    ) : (
                      <EyeOff className="w-4 h-4" />
                    )}
                  </button>
                  <button
                    onClick={copyToClipboard}
                    disabled={!password}
                    className="p-2 rounded-lg text-neutral-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors disabled:opacity-30"
                    title="Copy to clipboard"
                  >
                    <AnimatePresence mode="wait">
                      {copied ? (
                        <motion.div
                          key="check"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Check className="w-4 h-4 text-emerald-500" />
                        </motion.div>
                      ) : (
                        <motion.div
                          key="copy"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          <Copy className="w-4 h-4" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </button>
                  <button
                    onClick={generate}
                    disabled={noneSelected}
                    className="p-2 rounded-lg text-neutral-400 hover:text-violet-600 dark:hover:text-violet-400 hover:bg-violet-50 dark:hover:bg-violet-900/30 transition-colors disabled:opacity-30"
                    title="Regenerate"
                  >
                    <RefreshCw className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* strength bar */}
              <div className="mt-4 flex items-center gap-3">
                <StrengthIcon className={`w-4 h-4 shrink-0 ${strength.text}`} />
                <div className="flex-1 h-2 rounded-full bg-neutral-200 dark:bg-neutral-700 overflow-hidden">
                  <motion.div
                    className={`h-full rounded-full ${strength.color}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${strength.percent}%` }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                </div>
                <span
                  className={`text-xs font-semibold min-w-[70px] text-right ${strength.text}`}
                >
                  {strength.label}
                </span>
              </div>
            </div>

            {/* ─ options ─ */}
            <div className="p-5 sm:p-6 space-y-5">
              {/* length slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium text-neutral-700 dark:text-neutral-300">
                    Length
                  </label>
                  <span className="text-xs font-bold tabular-nums px-2.5 py-1 rounded-lg bg-violet-100 dark:bg-violet-900/50 text-violet-700 dark:text-violet-300">
                    {length}
                  </span>
                </div>
                <input
                  type="range"
                  min={4}
                  max={64}
                  value={length}
                  onChange={(e) => setLength(Number(e.target.value))}
                  className="w-full h-2 rounded-full appearance-none bg-neutral-200 dark:bg-neutral-700 cursor-pointer accent-violet-600 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-violet-600 [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:shadow-violet-500/30 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-white dark:[&::-webkit-slider-thumb]:border-neutral-900 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:w-5 [&::-moz-range-thumb]:h-5 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-violet-600 [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-white dark:[&::-moz-range-thumb]:border-neutral-900 [&::-moz-range-thumb]:cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-500 mt-1 px-0.5">
                  <span>4</span>
                  <span>64</span>
                </div>
              </div>

              {/* toggles */}
              <div className="space-y-3">
                <Toggle
                  checked={uppercase}
                  onChange={() => setUppercase((v) => !v)}
                  label="Uppercase (A–Z)"
                />
                <Toggle
                  checked={lowercase}
                  onChange={() => setLowercase((v) => !v)}
                  label="Lowercase (a–z)"
                />
                <Toggle
                  checked={numbers}
                  onChange={() => setNumbers((v) => !v)}
                  label="Numbers (0–9)"
                />
                <Toggle
                  checked={symbols}
                  onChange={() => setSymbols((v) => !v)}
                  label="Symbols (!@#$%...)"
                />
              </div>
            </div>

            {/* ─ generate button ─ */}
            <div className="px-5 sm:px-6 pb-5 sm:pb-6">
              <button
                onClick={generate}
                disabled={noneSelected}
                className="w-full py-3 px-6 rounded-xl font-semibold text-white bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 active:scale-[0.98] transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                Generate Password
              </button>
            </div>
          </div>

          {/* ─ history ─ */}
          <AnimatePresence>
            {history.length > 1 && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4"
              >
                <div className="rounded-2xl border border-neutral-200/80 dark:border-neutral-700/60 bg-white/50 dark:bg-neutral-900/50 backdrop-blur-xl overflow-hidden">
                  <div className="px-5 py-3 border-b border-neutral-200/60 dark:border-neutral-700/40">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
                      Recent Passwords
                    </h3>
                  </div>
                  <div className="divide-y divide-neutral-100 dark:divide-neutral-800">
                    {history.slice(1).map((pwd, i) => (
                      <motion.div
                        key={`${pwd}-${i}`}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="flex items-center justify-between px-5 py-2.5 group hover:bg-violet-50/50 dark:hover:bg-violet-900/10 transition-colors"
                      >
                        <span className="font-mono text-xs text-neutral-500 dark:text-neutral-400 truncate max-w-[calc(100%-40px)]">
                          {pwd}
                        </span>
                        <button
                          onClick={async () => {
                            await navigator.clipboard.writeText(pwd);
                          }}
                          className="p-1.5 rounded-lg opacity-0 group-hover:opacity-100 text-neutral-400 hover:text-violet-600 dark:hover:text-violet-400 transition-all"
                          title="Copy"
                        >
                          <Copy className="w-3.5 h-3.5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* back link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8"
        >
          <a
            href="/tools"
            className="text-sm text-neutral-400 dark:text-neutral-500 hover:text-violet-600 dark:hover:text-violet-400 transition-colors flex items-center gap-1"
          >
            ← Back to Tools
          </a>
        </motion.div>
      </div>
    </div>
  );
};

export default PasswordGenerator;
