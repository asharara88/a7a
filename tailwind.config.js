/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand colors from logo - 3 blue gradients
        'brand-blue-1': 'hsl(210, 100%, 50%)', // Primary blue
        'brand-blue-2': 'hsl(190, 100%, 45%)', // Secondary blue  
        'brand-blue-3': 'hsl(183, 100%, 40%)', // Tertiary blue
        // Neon green accent for selections and buttons
        'accent': 'hsl(142, 76%, 36%)',
        'accent-light': 'hsl(142, 76%, 46%)',
        'accent-dark': 'hsl(142, 76%, 26%)',
        // Enhanced color system
        primary: {
          50: 'hsl(210, 100%, 97%)',
          100: 'hsl(210, 100%, 94%)',
          200: 'hsl(210, 100%, 87%)',
          300: 'hsl(210, 100%, 78%)',
          400: 'hsl(210, 100%, 66%)',
          500: 'hsl(210, 100%, 50%)',
          600: 'hsl(210, 100%, 45%)',
          700: 'hsl(210, 100%, 40%)',
          800: 'hsl(210, 100%, 35%)',
          900: 'hsl(210, 100%, 30%)',
          950: 'hsl(210, 100%, 20%)',
        },
        secondary: {
          50: 'hsl(190, 100%, 97%)',
          100: 'hsl(190, 100%, 94%)',
          200: 'hsl(190, 100%, 87%)',
          300: 'hsl(190, 100%, 78%)',
          400: 'hsl(190, 100%, 66%)',
          500: 'hsl(190, 100%, 45%)',
          600: 'hsl(190, 100%, 40%)',
          700: 'hsl(190, 100%, 35%)',
          800: 'hsl(190, 100%, 30%)',
          900: 'hsl(190, 100%, 25%)',
          950: 'hsl(190, 100%, 15%)',
        },
        tertiary: {
          50: 'hsl(183, 100%, 97%)',
          100: 'hsl(183, 100%, 94%)',
          200: 'hsl(183, 100%, 87%)',
          300: 'hsl(183, 100%, 78%)',
          400: 'hsl(183, 100%, 66%)',
          500: 'hsl(183, 100%, 40%)',
          600: 'hsl(183, 100%, 35%)',
          700: 'hsl(183, 100%, 30%)',
          800: 'hsl(183, 100%, 25%)',
          900: 'hsl(183, 100%, 20%)',
          950: 'hsl(183, 100%, 10%)',
        },
        gray: {
          50: 'hsl(220, 20%, 98%)',
          100: 'hsl(220, 14%, 96%)',
          200: 'hsl(220, 13%, 91%)',
          300: 'hsl(220, 9%, 78%)',
          400: 'hsl(220, 9%, 46%)',
          500: 'hsl(220, 9%, 26%)',
          600: 'hsl(220, 12%, 17%)',
          700: 'hsl(220, 13%, 13%)',
          800: 'hsl(220, 15%, 9%)',
          900: 'hsl(220, 18%, 6%)',
          950: 'hsl(220, 23%, 4%)',
        },
        surface: {
          50: 'hsl(220, 20%, 99%)',
          100: 'hsl(220, 20%, 97%)',
          200: 'hsl(220, 20%, 94%)',
          300: 'hsl(220, 20%, 88%)',
          400: 'hsl(220, 20%, 82%)',
          500: 'hsl(220, 20%, 76%)',
          600: 'hsl(220, 20%, 70%)',
          700: 'hsl(220, 20%, 64%)',
          800: 'hsl(220, 20%, 58%)',
          900: 'hsl(220, 20%, 52%)',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'elegant': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 30px -5px rgba(0, 0, 0, 0.04)',
        'premium': '0 8px 40px -12px rgba(0, 0, 0, 0.25)',
        'glow': '0 0 20px rgba(142, 76, 36, 0.3)',
        'glow-lg': '0 0 30px rgba(142, 76, 36, 0.4)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      transitionTimingFunction: {
        'bounce-in': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [],
}