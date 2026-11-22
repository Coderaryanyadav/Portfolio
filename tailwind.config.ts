import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#050608",
        surface: {
          50: "#181c28",
          100: "#111420",
          200: "#0c0e17",
          300: "#07080f",
          border: "#171c2d",
          hover: "#222940",
        },
        // Mapped to Electric Cyan-Blue (#00D2FF / #38BDF8)
        lime: {
          DEFAULT: "#00D2FF",
          glow: "rgba(0, 210, 255, 0.25)",
          dim: "#0284c7",
          bright: "#38bdf8",
        },
        cyber: {
          blue: "#00D2FF",
          deep: "#2563EB",
          sky: "#38BDF8",
          navy: "#0a0f1d",
        },
        zinc: {
          850: "#181b24",
          950: "#080a10",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        heading: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 20s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
