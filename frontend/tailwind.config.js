/** @type {import('tailwindcss').Config} */
const withMT = require('@material-tailwind/react/utils/withMT');

module.exports = withMT({
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    fontFamily: {
      sans: ['Rubik', 'sans-serif'],
      serif: ['Cardo', 'serif'],
      cairo: ['Cairo', 'sans-serif'],
    },
    extend: {
      borderWidth: {
        big: '2rem',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: {
        wiggle: 'wiggle 1s ease-in-out infinte',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
});
