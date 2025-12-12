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
        // Primary - Teal
        primary: {
          DEFAULT: "#14b8a6",
          light: "#2dd4bf",
          dark: "#0d9488",
        },
        // Accent - Blue
        accent: {
          DEFAULT: "#3b82f6",
          light: "#60a5fa",
          dark: "#2563eb",
        },
        // Secondary - Indigo
        secondary: {
          DEFAULT: "#6366f1",
          light: "#818cf8",
          dark: "#4f46e5",
        },
        // Navy - Dark backgrounds
        navy: {
          DEFAULT: "#0a1628",
          light: "#1e293b",
          lighter: "#334155",
        },
        // Dark mode colors
        dark: {
          bg: "#0a1628",
          surface: "#0f172a",
          border: "#334155",
        },
        // Light mode colors
        light: {
          bg: "#f8fafc",
          surface: "#ffffff",
          border: "#e2e8f0",
        },
        // Muted text
        muted: {
          DEFAULT: "#64748b",
          dark: "#94a3b8",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "var(--font-space-grotesk)", "monospace"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "particle": "particle 20s linear infinite",
        "orbit": "orbit 15s linear infinite",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(100px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        glow: {
          "0%": {
            boxShadow: "0 0 20px rgba(20, 184, 166, 0.3), 0 0 40px rgba(59, 130, 246, 0.2)",
          },
          "100%": {
            boxShadow: "0 0 40px rgba(20, 184, 166, 0.6), 0 0 80px rgba(59, 130, 246, 0.4)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        particle: {
          "0%": { transform: "translateY(0) rotate(0deg)", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { transform: "translateY(-100vh) rotate(720deg)", opacity: "0" },
        },
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(100px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(100px) rotate(-360deg)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(20, 184, 166, 0.4), 0 0 40px rgba(20, 184, 166, 0.2)"
          },
          "50%": {
            boxShadow: "0 0 40px rgba(20, 184, 166, 0.6), 0 0 80px rgba(59, 130, 246, 0.4)"
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    // Custom plugin for glassmorphism utilities
    function ({ addUtilities }: { addUtilities: (utilities: Record<string, Record<string, string>>) => void }) {
      const newUtilities = {
        ".glass": {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".glass-dark": {
          background: "rgba(10, 22, 40, 0.8)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(20, 184, 166, 0.1)",
        },
        ".glass-light": {
          background: "rgba(255, 255, 255, 0.9)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(20, 184, 166, 0.1)",
        },
        ".text-glow": {
          textShadow: "0 0 20px rgba(20, 184, 166, 0.6), 0 0 40px rgba(59, 130, 246, 0.4)",
        },
        ".text-glow-strong": {
          textShadow: "0 0 30px rgba(20, 184, 166, 0.8), 0 0 60px rgba(59, 130, 246, 0.6)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;

