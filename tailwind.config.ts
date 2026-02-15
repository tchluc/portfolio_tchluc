import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Minimalist Palette - Monochrome + Green Accent
        primary: {
          DEFAULT: "#22c55e", // Green accent
          light: "#4ade80",
          dark: "#16a34a",
        },
        // Dark mode colors
        dark: {
          bg: "#000000",
          surface: "#0a0a0a",
          border: "#27272a",
        },
        // Light mode colors
        light: {
          bg: "#ffffff",
          surface: "#fafafa",
          border: "#e5e5e5",
        },
        // Muted text
        muted: {
          DEFAULT: "#71717a",
          dark: "#a1a1aa",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-up": "slideUp 0.6s ease-out forwards",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(30px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      letterSpacing: {
        tighter: "-0.05em",
      },
      lineHeight: {
        relaxed: "1.8",
      },
    },
  },
  plugins: [],
};
export default config;
