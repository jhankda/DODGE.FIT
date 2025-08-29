module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}", // Make sure it scans your components folder
    "./app/**/*.{js,jsx,ts,tsx}",   // And your screens folder
  ],
  theme: {
    extend: {
      colors: {
        'custom-purple-text': '#634F96',
        'custom-border': '#E6E8EB',
        'custom-green-dot': '#088745',
        'custom-button-bg': '#EBE8F2',
        'custom-heading': '#120D1C',
        'custom-text-light': '#6E6387',
        'custom-text-dark': '#121217',
        'custom-purple': '#8C66E3',
        'custom-purple-dark': '#2900F3',   // Add this new color
        'custom-purple-light': '#A881FF',
        'custom-off-white': '#FAFAFA',
      },
    },
  },
  plugins: [],
};