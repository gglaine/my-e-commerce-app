/** @type {import('tailwindcss').Config} */




export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          500: '#FF6363;',
          800: '#FF1313;',
        }
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
        Bungee: ['Bungee', 'cursive'],
      },
    },
  },
  plugins: [],
}

