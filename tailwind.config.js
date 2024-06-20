/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        "3d": "1px 1px #34d399, 2px 2px #34d399",
      },
      fontFamily: {
        rounded: ["Varela Round", "sans-serif"],
      },
      textShadow: {
        "3d": "5px 5px #32CD32, 10px 10px #006400",
      },
    },
  },
  plugins: [],
};
