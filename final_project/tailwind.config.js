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
        home: "repeat(auto-fill, minmax(200px, 1fr))",
        products: "repeat(auto-fill, minmax(300px, 1fr))",
        filterLayout: "repeat(auto-fill, minmax(200px, 1fr))",
      },
      fontFamily: {
        Merriweather: ["'Merriweather', 'Roboto Condensed', sans-serif"],
        "Roboto-Condensed": ["'Roboto Condensed', 'Merriweather', sans-serif"],
      },
    },
  },
  daisyui: {
    themes: [
      "dracula",
      "retro",
      "dark",
      "light",
      "garden",
      "business",
      "sunset",
      "dim",
      "cupcake",
      "fantasy",
      "wireframe",
      "wireframe",
    ],
  },
  plugins: [require("daisyui")],
};
