/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",   // expo-router pages
    "./components/**/*.{js,jsx,ts,tsx}", // your shared components
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

