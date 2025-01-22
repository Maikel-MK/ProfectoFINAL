/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'verde-suave': '#66cc99',
        'aqua-claro': '#d3feea',
        'verde-oscuro': '#07301a',
        'beige-claro': '#f5f5dc',
        'blanco-puro': '#ffffff',
      },
    },
  },
  plugins: [],
}