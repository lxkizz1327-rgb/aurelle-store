import type { Config } from "tailwindcss";

/**
 * You normally do NOT need to edit this file.
 * Brand colours are changed in:  src/data/site-config.ts  (section "colors")
 * Fonts are changed in:          src/app/fonts.ts
 */
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--c-primary)",
        "on-primary": "var(--c-on-primary)",
        secondary: "var(--c-secondary)",
        accent: "var(--c-accent)",
        canvas: "var(--c-background)",
        surface: "var(--c-surface)",
        ink: "var(--c-text)",
        muted: "var(--c-muted)",
        line: "var(--c-border)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "Georgia", "serif"],
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      keyframes: {
        "toast-in": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
      },
      animation: {
        "toast-in": "toast-in 0.35s ease-out both",
        "fade-in": "fade-in 0.4s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
