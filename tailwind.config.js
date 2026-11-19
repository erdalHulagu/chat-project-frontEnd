
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#075E45",
          dark: "#043D30",
          light: "#0B7657",
          soft: "#E6F2ED",
        },

        background: "#F1F5F9",
        surface: "#FFFFFF",

        gray: {
          custom: "#64748B",
          dark: "#334155",
          light: "#E2E8F0",
          soft: "#F1F5F9",
        },

        text: {
          DEFAULT: "#1E293B",
          secondary: "#64748B",
          muted: "#94A3B8",
        },

        border: "#E2E8F0",

        danger: {
          DEFAULT: "#DC2626",
          dark: "#B91C1C",
          light: "#FEE2E2",
        },
      },
    },
  },

  plugins: [],
};
