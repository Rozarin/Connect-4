/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary": "#E2F1E7",
        "secondary": "#629584",
        "tertiary": "#387478",
        "quaternary": "#243642",
      },
      fontFamily: {
        Montserrat: ["Montserrat, sans-serif"]
      },
      container: {
        padding: "2rem",
        center: true,
      },
      screens: {
        sm: "640px",
        md: "720px",
      },
    },
  },
  plugins: [],
}