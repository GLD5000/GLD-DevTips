/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',

  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      devTips: ['Delicious Handrawn', 'cursive'],
    },
    
    extend: {
      screens: {
        xs: '420px',
      },

      gridTemplateColumns: {
        frAutoFr: '1fr auto 1fr',
        autoAuto: 'auto auto',
        autoFr: 'auto 1fr',
      },
      gridTemplateRows: {
        autoFr: 'auto 1fr',
      },
      minWidth: {
        body: '340px',
      },
      maxWidth: {
        body: '1250px',
      },
      width: {
        body: 'calc(100vw - 4rem)',
        'body-sm': 'calc(100vw - 2rem)',
      },
      colors: {
        vsGreen: 'rgb(140, 241, 124)',
        cornsilk: '#FFF8DC',
        hintYellow: 'rgb(242, 220, 28)',
        mediumPurple: '#9933dd',
        aquamarine: '#7Eb987',

        'bg-var-dk': '#000000',
        'bg-dk': '#1f1f1f',
        'deco-dk': '#3d3d3d',
        'border-dk': '#6b6b6b',
        'txt-low-dk': '#878787',
        'txt-mid-dk': '#ababab',
        'txt-main-dk': '#ffffff',

        'txt-main': '#000000',
        'txt-mid': '#474747',
        'txt-low': '#636363',
        border: '#919191',
        deco: '#e0e0e0',
        'bg-var': '#fafafa',
        bg: '#ffffff',

      },
      boxShadow: {
        bottom: '1px 3px 0px -2px rgba(0, 0, 0, 1)',
      },

    },
  },
  plugins: [],
};
