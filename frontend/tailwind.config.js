/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/flowbite-react/lib/esm/*/.js',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Times New Roman', 'serif'],
      },
      colors: {
        'primary': '#333333',
        'secundary': '#428e61',
        'secundary1': '#ffff00',
        'terciary': '#222222',
        'quaternary': '#CBCBCB',
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('@tailwindcss/aspect-ratio')
  ]
};

