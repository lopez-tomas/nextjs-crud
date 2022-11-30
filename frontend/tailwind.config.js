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
        "white-color": "var(--white)",
        "black-color": "var(--black)",
        "primary-color": "var(--primary-color)",
        "secondary-color": "var(--secondary-color)",
        "green-color": "var(--green)",
        "red-color": "var(--red)",
      }
    },
  },
  plugins: [],
}
