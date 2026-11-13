let ctx = null;
let muted = false;
let lastPlayed = 0;

const STORAGE_KEY = "ui-sound";

if (typeof window !== "undefined") {
  muted = window.localStorage.getItem(STORAGE_KEY) === "off";
}

const context = () => {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
  }
  return ctx;
};

const noise = (c, seconds) => {
  const length = Math.max(1, Math.floor(c.sampleRate * seconds));
  const buffer = c.createBuffer(1, length, c.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < length; i += 1) data[i] = Math.random() * 2 - 1;
  return buffer;
};

const schedule = (c, { gain, freq, q, decay }) => {
  const now = c.currentTime;

  const out = c.createGain();
  out.gain.value = gain;
  out.connect(c.destination);

  const source = c.createBufferSource();
  source.buffer = noise(c, 0.012);

  const band = c.createBiquadFilter();
  band.type = "bandpass";
  band.frequency.value = freq;
  band.Q.value = q;

  const env = c.createGain();
  env.gain.setValueAtTime(0.5, now);
  env.gain.exponentialRampToValueAtTime(0.0001, now + decay);

  source.connect(band);
  band.connect(env);
  env.connect(out);
  source.start(now);
  source.stop(now + 0.03);
};

export const playTick = (options = {}) => {
  if (muted) return;

  const now = performance.now();
  if (now - lastPlayed < 45) return;
  lastPlayed = now;

  const settings = { gain: 0.09, freq: 3100, q: 1.2, decay: 0.007, ...options };

  const c = context();
  if (!c) return;

  if (c.state === "running") {
    schedule(c, settings);
    return;
  }

  c.resume()
    .then(() => schedule(c, settings))
    .catch(() => {});
};

export const isSoundOn = () => !muted;

export const setSoundOn = (on) => {
  muted = !on;
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, muted ? "off" : "on");
  }
};
