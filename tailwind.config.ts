/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    screens: {
      sm: '600px',
      md: '768px',
      lg: '1280px',
      xl: '1450px',
      '2xl': '1720px',
    },
    extend: {},
  },
  plugins: [],
};
