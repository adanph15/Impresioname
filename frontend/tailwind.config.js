/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
      },
      colors: {
        'primary': '#333333',
        'secundary': '#ffff00',
        'terciary': '#222222',
        'quaternary': '#CBCBCB',
      },
    },
  },
  plugins: [],
}

