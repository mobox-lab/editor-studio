import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './src/constants/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          '2xl': '10.5rem',
        },
      },
      screens: {
        xl: { min: '1200px' },
      },
      opacity: {
        '15': '.15',
      },
      lineHeight: {
        '4.5': '1.125rem',
        '5.5': '1.375rem',
      },
      spacing: {
        4.5: '1.125rem',
        5.5: '1.375rem',
        7.5: '1.875rem',
        9.5: '2.375rem',
        10.5: '2.625rem',
        13: '3.25rem',
        15: '3.75rem',
        17: '4.25rem',
        21.5: '5.375rem',
        25: '6.25rem',
        25.5: '6.375rem',
        27.5: '6.875rem',
        30: '7.5rem',
        31: '7.75rem',
        31.5: '7.875rem',
        35: '8.75rem',
        70: '17.5rem',
        90: '22.5rem',
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
          250: '#ADADAD',
          300: '#A5A6AB',
          350: '#8E8F91',
          400: '#6F7784',
          500: '#434851',
          550: '#3D444B',
          600: '#22242A',
          700: '#15171A',
          750: '#14161B',
          800: '#131418',
        },
        blue: {
          DEFAULT: '#43BBFF',
          450: '#4383FF',
        },
        yellow: {
          DEFAULT: '#FFE7AB',
        },
        red: {
          300: '#F2B8B0',
          400: '#F55D70',
          DEFAULT: '#FF2358',
        },
        green: {
          400: '#64AB85',
          DEFAULT: '#1EDB8C',
        },
        p12: {
          'gradient-from': 'var(--gradient-from)',
          'gradient-to': 'var(--gradient-to)',
        },
      },
      backgroundImage: {
        'gradient-p12': 'linear-gradient(to right, var(--gradient-from), var(--gradient-to))',
        'gradient-play': 'linear-gradient(to right, #00F0FF, #00FF94)',
        'gradient-publish':
          'linear-gradient(20deg, rgba(0, 0, 0, 0.95) 0%, rgba(0, 0, 0, 0.9) 25%, rgba(0, 0, 0, 0.70) 50%, rgba(0, 0, 0, 0.3) 75%, rgba(0, 0, 0, 0.2) 100%)',
        'gradient-corner-gold': 'linear-gradient(270deg, #FFF5BF 0%, #FFAA4B 100%)',
        'gradient-red': 'linear-gradient(180deg, #8C2329 7.27%, #B03B42 48.64%, #C03840 89.17%)',
        'gradient-green': 'linear-gradient(180deg, #1E6744 4.55%, #388657 52.28%, #499467 99.04%)',
      },
      keyframes: {
        breathing: {
          '0%': { opacity: '0' },
          '100%': { opacity: '0.14' },
        },
      },
      animation: {
        breathing: 'breathing 4s linear infinite alternate',
      },
      fontFamily: {
        poppins: 'var(--font-poppins)',
        ddin: ['D-DIN'],
      },
    },
  },
  plugins: [],
};
export default config;
