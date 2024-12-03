/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-orange': '#FFC565',
        'custom-gray': '#F5F7FA',  // Fondo suave
        'custom-light-gray': '#F9FAFB',  // Fondo del panel principal
      },
    },
  },
  plugins: [],
}
