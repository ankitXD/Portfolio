/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["Instrument Serif", "Georgia", "Times New Roman", "serif"],
        sans: ["Inter", "Segoe UI", "system-ui", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Cascadia Mono", "monospace"],
      },
      maxWidth: {
        page: "1200px",
      },
      colors: {
        paper: "#fcfcfc",
        ink: "#060606",
        line: "#e4e4e4",
        mute: "#6f6f6f",
        cobalt: "#1d1cff",
      },
    },
  },
  plugins: [],
};
