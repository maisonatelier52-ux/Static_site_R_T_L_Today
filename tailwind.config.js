/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './lib/**/*.{js,jsx}'
  ],
  theme: {
    extend: {
      colors: {
        ink: '#101114',
        muted: '#687079',
        line: '#dfe3e6',
        soft: '#f2f4f5',
        brand: '#e30613',
        'brand-dark': '#b9000a',
        blue: '#07346d'
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica', 'sans-serif'],
        serif: ['Georgia', 'serif']
      },
      maxWidth: {
        container: '1100px'
      }
    }
  },
  plugins: []
};
