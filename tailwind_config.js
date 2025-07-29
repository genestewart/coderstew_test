/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./resources/**/*.blade.php",
    "./resources/**/*.js",
    "./resources/**/*.vue",
  ],
  theme: {
    extend: {
      colors: {
        'primary-orange': '#FF9410',
        'golden-yellow': '#E6C417',
        'bright-green': '#70E000',
        'sky-blue': '#63B1C7',
        'dark-gray': '#171717',
      },
    },
  },
  plugins: [],
}