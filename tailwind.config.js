/** @type {import('tailwindcss').Config} */
// const colors require('tailwindcss/colors')
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", 'node_modules/flowbite-react/lib/esm/**/*.js'],
  darkMode: "class",
  theme: {
    screens: {
      sm: "450px",
      // => @media (min-width: 640px) { ... }

      md: "547px",

      lg: "768px",

      xl: "1024px",
      // => @media (min-width: 1024px) { ... }

      "2xl": "1280px",
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        primar: "#202225",
        secondary: "#5865f2",
        blue: {
          450: "#5F99F7",
          grey: {
            900: "#202225",
            800: "#2f316",
            700: "#36393f",
            600: "#4f545c",
            400: "#d4d7dc",
            300: "#e3f5e8",
            200: "#ebedef",
            100: "#f2f3fF",
          },
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms"),
    require('flowbite/plugin')
  ],
};
