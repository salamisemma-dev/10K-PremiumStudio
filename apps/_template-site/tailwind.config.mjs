/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js}"],
  theme: {
    extend: {
      colors: {
        ink: "#111111",
        paper: "#f7f3eb",
        steel: "#8d9695",
        copper: "#b8643a",
        night: "#151719"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
