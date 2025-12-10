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
        // Turquoise primary color
        primary: {
          DEFAULT: "#40E0D0",
          light: "#6FFAEB",
          dark: "#2DB3A6",
        },
        // Dark mode colors
        dark: {
          bg: "#000000",
          surface: "#0A0A0A",
          border: "#1A1A1A",
        },
        // Light mode colors
        light: {
          bg: "#FFFFFF",
          surface: "#F8F8F8",
          border: "#E5E5E5",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 6s ease-in-out infinite",
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
            boxShadow: "0 0 20px rgba(64, 224, 208, 0.3), 0 0 40px rgba(64, 224, 208, 0.2)",
          },
          "100%": {
            boxShadow: "0 0 30px rgba(64, 224, 208, 0.6), 0 0 60px rgba(64, 224, 208, 0.4)",
          },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [
    // Custom plugin for glassmorphism utilities
    function ({ addUtilities }: any) {
      const newUtilities = {
        ".glass": {
          background: "rgba(255, 255, 255, 0.05)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".glass-dark": {
          background: "rgba(0, 0, 0, 0.3)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.05)",
        },
        ".glass-light": {
          background: "rgba(255, 255, 255, 0.7)",
          backdropFilter: "blur(10px)",
          border: "1px solid rgba(0, 0, 0, 0.1)",
        },
        ".text-glow": {
          textShadow: "0 0 20px rgba(64, 224, 208, 0.6)",
        },
      };
      addUtilities(newUtilities);
    },
  ],
};
export default config;
