/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      height:{
        'slider-normal':'22rem'
      }
    },
    colors: {
      title: '#2B1B42',
    },
    fontFamily: {
      RadioCanada: ['Radio Canada','sans-serif'],
    },
  },
  plugins: [],
};

