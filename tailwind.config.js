/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        beige: {
          50: '#fdf9f3',
          100: '#f9f0e1',
          200: '#f3e0c3',
          300: '#e8c99a',
          400: '#d4a96a',
          500: '#c08d45',
        },
        sage: {
          50: '#f3f7f0',
          100: '#e4eedd',
          200: '#c8ddb9',
          300: '#a2c48e',
          400: '#77a662',
          500: '#5a8a47',
          600: '#456e37',
          700: '#37572c',
        },
        gold: {
          300: '#e8d08a',
          400: '#d4b866',
          500: '#b8973d',
          600: '#9a7c2a',
        },
        charcoal: {
          700: '#3a3a3a',
          800: '#2a2a2a',
          900: '#1a1a1a',
        },
        cream: '#faf7f2',
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
