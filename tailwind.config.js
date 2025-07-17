/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'system-ui', 'sans-serif'],
      },
      spacing: {
        '30': '7.5rem',
        '18': '4.5rem',
      },
      colors: {
        primary: {
          DEFAULT: 'hsl(var(--color-primary))', 
          light: 'hsl(var(--color-primary-light))',
          dark: 'hsl(var(--color-primary-dark))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--color-secondary))', 
          light: 'hsl(var(--color-secondary-light))',
          dark: 'hsl(var(--color-secondary-dark))',
        },
        tertiary: {
          DEFAULT: 'hsl(var(--color-tertiary))', 
          light: 'hsl(var(--color-tertiary-light))',
          dark: 'hsl(var(--color-tertiary-dark))',
        },
        success: {
          DEFAULT: 'hsl(var(--color-success))',
        },
        warning: {
          DEFAULT: 'hsl(var(--color-warning))',
        },
        error: {
          DEFAULT: 'hsl(var(--color-error))',
        },
        text: {
          DEFAULT: 'hsl(var(--color-text))',
          light: 'hsl(var(--color-text-light))',
          disabled: 'hsl(var(--color-text-disabled))',
        },
        background: {
          DEFAULT: 'hsl(var(--color-background))',
          alt: 'hsl(var(--color-background-alt))',
        },
        content: {
          DEFAULT: 'hsl(var(--color-text))',
          light: 'hsl(var(--color-text-light))',
          muted: 'hsl(var(--color-text-disabled))',
        },
        surface: {
          1: 'hsl(var(--color-surface-1))',
          2: 'hsl(var(--color-surface-2))',
          3: 'hsl(var(--color-surface-3))',
        },
      },
      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.75rem',
        'xl': '1.125rem',
        '2xl': '1.5rem',
        '3xl': '1.75rem',
        'full': '9999px',
      },
      boxShadow: {
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        DEFAULT: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'nav': '0 2px 10px rgba(0, 0, 0, 0.05)',
        'dark-md': '0 4px 6px -1px rgba(0, 0, 0, 0.2), 0 2px 4px -1px rgba(0, 0, 0, 0.1)',
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.2), 0 4px 6px -2px rgba(0, 0, 0, 0.1)',
        'dark-xl': '0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)',
        'dark-2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'dark-inner': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.2)',
        'dark-none': 'none',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
        none: 'none',
      },
      letterSpacing: {
        tightest: '-0.05em',
        tighter: '-0.025em',
        tight: '-0.0125em',
        normal: '0em',
        wide: '0.025em',
        wider: '0.05em',
        widest: '0.1em',
      },
      lineHeight: {
        none: '1',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
      },
    },
  },
  plugins: [],
};