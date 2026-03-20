/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dominant: '#0A0A0A',
        secondary: '#F5F5F5',
        accent: '#BCF000',
        primary: {
          50: '#f7fde6',
          100: '#edfbc1',
          200: '#dafa8a',
          300: '#BCF000', // Lemon Green
          400: '#a3d100',
          500: '#86ad00',
          600: '#688600',
          700: '#506700',
          800: '#3f5100',
          900: '#354400',
        },
        glass: {
          light: 'rgba(245,245,245,0.08)',
          dark: 'rgba(10,10,10,0.6)',
        }
      },
      fontFamily: {
        sans: ['Clash Display', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Clash Display', 'Outfit', 'system-ui', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'gradient': 'gradientShift 8s ease infinite',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'fade-in': 'fadeIn 0.6s ease-out',
        'typing': 'typing 1.5s steps(3) infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        slideUp: {
          from: { opacity: 0, transform: 'translateY(30px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
        slideIn: {
          from: { opacity: 0, transform: 'translateX(-20px)' },
          to: { opacity: 1, transform: 'translateX(0)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        typing: {
          '0%': { content: '.' },
          '33%': { content: '..' },
          '66%': { content: '...' },
        },
      },
      boxShadow: {
        glass: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
        'glass-dark': '0 8px 32px 0 rgba(0,0,0,0.8)',
        glow: '0 0 20px rgba(188, 240, 0, 0.4)',
        'glow-accent': '0 0 25px rgba(188, 240, 0, 0.6)',
      },
    },
  },
  plugins: [],
}
