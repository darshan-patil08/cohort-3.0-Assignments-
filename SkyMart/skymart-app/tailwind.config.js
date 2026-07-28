/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        display: ["Space Grotesk", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        indigo: {
          accent: "#6C63FF",
          hover: "#5A50F0",
          deep: "#4840E0",
        },
        surface: {
          dark: "#0A0B14",
          "dark-2": "#13141F",
          "dark-3": "#1C1D2E",
          "dark-4": "#252637",
          light: "#F5F6FA",
          "light-2": "#FFFFFF",
          "light-3": "#EDEEF5",
          "light-4": "#E0E1F0",
        },
        text: {
          primary: "#F0F1FA",
          muted: "#8E8FA8",
          "light-primary": "#0A0B14",
          "light-muted": "#5A5B72",
        },
        border: {
          dark: "#2A2B3D",
          light: "#D8D9E8",
        },
        danger: "#FF6B6B",
        success: "#4ADE80",
        warning: "#FBBF24",
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-in-right": "slideInRight 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
        shimmer: "shimmer 1.5s infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { transform: "translateX(100%)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        scaleIn: {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      boxShadow: {
        "accent-glow": "0 0 20px rgba(108, 99, 255, 0.15)",
        "accent-glow-lg": "0 0 40px rgba(108, 99, 255, 0.25)",
        card: "0 2px 8px rgba(0,0,0,0.3)",
        "card-hover": "0 8px 24px rgba(0,0,0,0.4)",
      },
    },
  },
  plugins: [],
};
