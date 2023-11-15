import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          xl: '2.5rem',
          '2xl': '10.5rem',
        },
      },
      spacing: {
        4.5: '1.125rem',
        7.5: '1.875rem',
        70: '17.5rem',
        93: '23.25rem',
        100: '25rem',
      },
      colors: {
        legendary: '#FFAA2C',
        epic: '#FC59FF',
        rare: '#43BBFF',
        uncommon: '#70FF6D',
        common: '#BDC9E3',
        gray: {
          300: '#A5A6AB',
          400: '#6F7784',
          500: '#434851',
          600: '#22242A',
          700: '#15171A',
          750: '#14161B',
        },
        blue: {
          DEFAULT: '#43BBFF',
          450: '#4383FF',
        },
        red: {
          DEFAULT: '#FF2358',
        },
        yellow: {
          DEFAULT: '#FFE7AB',
        },
        p12: {
          'gradient-from': 'var(--gradient-from)',
          'gradient-to': 'var(--gradient-to)',
        },
      },
      backgroundImage: {
        'p12-gradient': 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))',
      },
      keyframes: {
        breathing: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.12' },
        },
      },
      animation: {
        breathing: 'breathing 4s linear infinite alternate',
      },
    },
  },
  plugins: [],
};
export default config;
