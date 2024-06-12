/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    fontFamily: {
      'sans': ['Lato', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  plugins: [],
}

