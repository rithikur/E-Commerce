/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        'ub-darkest': '#3A2D28',
        'ub-dark':    '#A48374',
        'ub-mid':     '#CBAD8D',
        'ub-muted':   '#D1C7BD',
        'ub-light':   '#EBE3DB',
        'ub-lightest':'#F1EDE6',
      },
      fontFamily: {
        cormorant: ['"Cormorant Garamond"', 'serif'],
        jost:      ['Jost', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
