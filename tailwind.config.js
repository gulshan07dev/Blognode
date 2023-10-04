/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter': ["Inter", "sans-serif"],
        'lato': ["Lato", "sans"],
        'nunito-sans': ["Nunito Sans", "sans-serif"],
        'open-sans': ["Open Sans", "sans-serif"],
        'roboto': ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
  darkMode: ["class"]
}