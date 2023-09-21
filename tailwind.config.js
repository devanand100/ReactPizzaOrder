/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fontFamily: {
      sans: ["Inclusive Sans", "sans-serif"],
    },
    extend: {
      colors: {
        primary: "#EF4444",
        secondary: "#ffffff",
      },
    },
  },
  plugins: [],
};
