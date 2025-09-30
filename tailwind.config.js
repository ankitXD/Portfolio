/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // enable class-based dark mode (uses .dark on <html>)
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        brand: ["Poppins", "Inter", "Segoe UI", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
