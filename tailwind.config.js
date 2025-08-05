/** @type {import('tailwindcss').Config} */



export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite/**/*.js"

  ],
  theme: {
    extend: {
      colors:{
        primary: '#8B443F',
        secondary: '#F9D6D5',
        accent: '#A1B96F',
        neutral: '#374151',
        morado: '#887490',
        backgroundn: '#1B211F',
      }
    },
  },
  plugins: [
  ],
  darkMode: "class"
}
