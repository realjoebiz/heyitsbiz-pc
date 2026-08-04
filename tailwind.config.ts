import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        win: ['"MS Sans Serif"', 'Tahoma', 'Arial', 'sans-serif'],
      },
      colors: {
        win: {
          teal: '#008080',
          face: '#c0c0c0',
          dark: '#808080',
          light: '#dfdfdf',
          title: '#000080',
          title2: '#1084d0',
        },
      },
      boxShadow: {
        outset: 'inset -1px -1px #0a0a0a, inset 1px 1px #fff, inset -2px -2px #808080, inset 2px 2px #dfdfdf',
        inset: 'inset 1px 1px #0a0a0a, inset -1px -1px #fff, inset 2px 2px #808080, inset -2px -2px #dfdfdf',
      },
    },
  },
  plugins: [],
};

export default config;
