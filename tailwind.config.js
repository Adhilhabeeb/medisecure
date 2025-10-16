/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",       // your app folder
    "./pages/**/*.{js,ts,jsx,tsx}",     // pages folder if exists
    "./components/**/*.{js,ts,jsx,tsx}", // components folder
  ],
  theme: {
    extend: {},  // you can add custom colors, fonts, etc here
  },
  plugins: [],
};

