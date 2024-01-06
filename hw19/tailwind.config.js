/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.js"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      gridTemplateColumns: {
        header: "120px 1fr 220px",
      },
    },
  },
  plugins: [],
};
