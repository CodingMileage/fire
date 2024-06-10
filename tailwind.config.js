/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens: {
      'sm': '450px',
      // => @media (min-width: 640px) { ... }

      'md': "547px",

      'lg': "768px",

      'xl': '1024px',
      // => @media (min-width: 1024px) { ... }

      '2xl': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    extend: {
      colors: {
        primar: "#ff4800",
        blue: {
          450: "#5F99F7",
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
