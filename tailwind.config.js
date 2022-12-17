/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        frAutoFr: "1fr auto 1fr",
        autoAuto: "auto auto",
      },
      colors: {
        vsGreen: "rgb(140, 241, 124)",
      }
  
    },

  },
  plugins: [],
}
