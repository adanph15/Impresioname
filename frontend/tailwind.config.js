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
<<<<<<< HEAD
        'secundary': '#ffff00',
=======
        'secundary': '#D6FF91',
        'secundary1': '#36B383',
>>>>>>> d0e67c1163453ca3ae70bb00f2376728a6d8ea42
        'terciary': '#222222',
        'quaternary': '#CBCBCB',
      },
    },
  },
  plugins: [],
}

