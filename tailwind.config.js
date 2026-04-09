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
          50: '#fdf3f7',
          100: '#fae6ef',
          200: '#f4cede',
          300: '#ecb3ca',
          400: '#df91b3',
          500: '#cc6e98',
        },
        sage: {
          50: '#f8f5fc',
          100: '#ede8f7',
          200: '#dcd0f1',
          300: '#c3b3e8',
          400: '#a591db',
          500: '#8970cb',
          600: '#6e57ad',
          700: '#594693',
        },
        // These map to CSS variables — changing the variable recolors the whole site
        gold: {
          300: 'rgb(var(--tw-gold-300) / <alpha-value>)',
          400: 'rgb(var(--tw-gold-400) / <alpha-value>)',
          500: 'rgb(var(--tw-gold-500) / <alpha-value>)',
          600: 'rgb(var(--tw-gold-600) / <alpha-value>)',
        },
        charcoal: {
          700: 'rgb(var(--tw-charcoal-700) / <alpha-value>)',
          800: 'rgb(var(--tw-charcoal-800) / <alpha-value>)',
          900: 'rgb(var(--tw-charcoal-900) / <alpha-value>)',
        },
        cream: 'rgb(var(--tw-cream) / <alpha-value>)',
        petal: {
          50: '#fdf5ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#eda8fd',
        },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Raleway', 'system-ui', 'sans-serif'],
        script: ['Dancing Script', 'cursive'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.7s ease-out forwards',
        'float': 'float 8s ease-in-out infinite',
        'float-slow': 'float 11s ease-in-out 3s infinite',
        'shimmer': 'shimmer 3s linear infinite',
        'glow-pulse': 'glowPulse 4s ease-in-out infinite',
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
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        glowPulse: {
          '0%, 100%': { opacity: '0.35', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
}
