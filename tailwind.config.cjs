/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#fbf9f4',
        blue: {
          50: '#f0f6f8',
          100: '#dceaf0',
          700: '#3d6e8a',
          800: '#2a4f64',
          900: '#203f51',
          950: '#183343',
        },
      },
      fontFamily: {
        display: ['Lora', 'serif'],
        script: ['Dancing Script', 'cursive'],
      },
    },
  },
  plugins: [],
}
