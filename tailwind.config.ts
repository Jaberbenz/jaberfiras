import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // Active le Dark Mode avec la classe "dark"

  content: [
    "./src/sections/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],

  theme: {
    screens: {
      sm: "375px",
      md: "768px",
      lg: "1200px",
    },

    extend: {
      // Couleurs globales pour la landing page
      colors: {
        white: "#ffffff",
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          500: "#6b7280",
          700: "#374151",
          800: "#1f2937",
        },
        blue: {
          200: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
        },
        "blue-primary": "#0275ff",
        "stroke-dark": "#2d3135",

        // Thème clair (Light)
        "light-bg": "#F5F3FF", // Fond clair
        "light-card": "#FFFFFF", // Carte blanche
        "light-text": "#4C1D95", // Texte violet foncé
        "light-primary": "#8B5CF6", // Violet vibrant
        "light-border": "#DDD6FE", // Bordure douce violette
        "light-highlight": "#A78BFA", // Accent violet clair

        // Thème sombre (Dark)
        "dark-bg": "#1E153A", // Fond sombre principal
        "dark-card": "#2D1A4C", // Fond des cartes
        "dark-text": "#EDE9FE", // Texte clair
        "dark-primary": "#7C3AED", // Violet moyen
        "dark-border": "#4C1D95", // Bordure contrastée
        "dark-highlight": "#A78BFA", // Accent violet clair
      },

      // Configuration du container
      container: {
        center: true,
        padding: {
          DEFAULT: "20px",
          lg: "80px",
        },
      },

      // Images d'arrière-plan
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },

  plugins: [],
};

export default config;
