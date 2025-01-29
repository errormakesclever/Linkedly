/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#1A73E8',
        'secondary': '#F6F6F6',
        'text-gray': '#6B7280'
      }
    },
  },
  plugins: [],
}