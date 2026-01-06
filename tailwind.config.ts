import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // SheGymZ colour palette
        plum: {
          900: '#4a2c4a',
          800: '#6b3d6b',
          700: '#8b5a8b',
        },
        rose: {
          100: '#f5e6e8',
          200: '#f0cdd5',
          300: '#e8b5c3',
          400: '#d9889a',
        },
        warmgray: {
          50: '#faf8f7',
          100: '#f5f2f0',
          200: '#ebe6e2',
          300: '#ddd4ce',
          400: '#c9bab2',
          500: '#b5a699',
          600: '#9d8d7f',
        },
      },
      fontFamily: {
        sans: ['system-ui', 'sans-serif'],
      },
      spacing: {
        'generous': '2rem',
        'luxe': '4rem',
      },
      borderRadius: {
        subtle: '0.5rem',
        DEFAULT: '0.625rem',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};

export default config;
