/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      gridTemplateColumns: {
        frAutoFr: "1fr auto 1fr",
        autoAuto: "auto auto",
      },
      colors: {
        vsGreen: "rgb(140, 241, 124)",
        borderGrey: "#777",
        backgroundDark: "#1B1B1B",
        backgroundLight: "#343434",
        linksBlue: "#8CB4FB",
        textGrey: "#cdcdcd",
        cornsilk: "#FFF8DC",
        hintYellow: "rgb(242, 220, 28)",
        whitesmoke: "#f7f7f7",
        dodgerBlue: "#1188dd",
        mediumPurple: "#9933dd",
        transparent: "#0000",
        quotePaleGrey: "#E4E4E4",
        quoteMedGrey: "#9A9A9A",
        aquamarine: "#7Eb987",
      },
    },
  },
  plugins: [],
};
