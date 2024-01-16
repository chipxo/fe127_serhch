/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        "Source-Sans": "'Source Sans', sans-serif",
        Montserrat: "'Montserrat', sans-serif",
        "Open-Sans": "'Open Sans', sans-serif",
      },
      colors: {
        "light-blue": "hsla(205, 100%, 67%, 1)",
        "mid-purple": "hsla(253, 100%, 68%, 1)",
        "dark-blue": "hsla(213, 33%, 26%, 1)",
        "social-border": "hsla(0, 0%, 100%, 0.5)",
      },
      cursor: {
        glass: "url('/gallery_img/magnif_glass.svg'), zoom-in",
      },
      backgroundImage: {
        header: "url('/backgrounds/bg_slider_header.jpg')",
        news: "url('/backgrounds/bg_news.jpg')",
        form: "url('/backgrounds/bg_form.png')",
        footer: "url('/backgrounds/bg_footer.png')",
      },
      gridTemplateColumns: {
        header: "200px 1fr 140px",
        "header-md": "200px 1fr",
        gallery: "2fr repeat(3, 1fr)",
        "gallery-min": "repeat(auto-fit, minmax(120px, 1fr))",
      },
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
    },
  },
  plugins: [],
};
