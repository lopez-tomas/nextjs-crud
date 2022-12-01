/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/containers/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'white-color': 'var(--white)',
        'black-color': 'var(--black)',
        'black-2-color': 'var(--black-2)',
        'green-color': 'var(--green)',
        'red-color': 'var(--red)',
        'primary-color': 'var(--primary-color)',
        'secondary-color': 'var(--secondary-color)',
        'tertiary-color': 'var(--tertiary-color)',
        'fourth-color': 'var(--fourth-color)',
        'auxiliar-color': 'var(--auxiliar-color)',
      },
      spacing: {
        '10vh': '10vh',
        '20vh': '20vh',
        '80vh': '80vh',
        '90vh': '90vh',
      }
    },
  },
  plugins: [],
}
