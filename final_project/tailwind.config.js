/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
      },
      gridTemplateColumns: {
        header: "1fr 140px",
      },
    },
  },
  daisyui: {
    themes: ["dracula", "retro", "dark", "light", "garden"],
  },
  plugins: [require("daisyui")],
};
