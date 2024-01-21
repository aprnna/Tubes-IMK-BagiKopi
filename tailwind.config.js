/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        'background' : '#006EB9',
        'background2' : '#C7C7C7',
        'accent1' : '#224086',
        'accent2' : '#FFEAA1',
        'accent3' : '#4171B9',
        'accent4' : '#C93827',
        'accent5' : '#F76E24',
      },
    },
  },
  plugins: [],
}

