/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#eefbf4",
          100: "#d7f4e2",
          200: "#b1e9c9",
          300: "#7fd6ab",
          400: "#4abd88",
          500: "#239061",
          600: "#198257",
          700: "#146848",
          800: "#12533b",
          900: "#104431",
          950: "#08261c",
        },
      },
    },
  },
  plugins: [],
};
