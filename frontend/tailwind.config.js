/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    color: {
      "mint": "C8FFED"
    },
    extend: {},
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}