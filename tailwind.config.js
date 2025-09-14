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
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        accent: 'var(--accent)',
        background: 'var(--background)',
        surface: 'var(--surface)',
        success: 'var(--success)',
        warning: 'var(--warning)',
        error: 'var(--error)',
        border: 'var(--border)',
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
      },
    },
  },
  plugins: [
    function({ addBase, theme }) {
      addBase({
        ':root': {
          '--primary-opacity-90': 'rgba(158, 127, 255, 0.9)',
          '--primary-opacity-50': 'rgba(158, 127, 255, 0.5)',
          '--secondary-opacity-90': 'rgba(56, 189, 248, 0.9)',
          '--secondary-opacity-50': 'rgba(56, 189, 248, 0.5)',
        }
      });
    }
  ],
  safelist: [
    'hover:bg-primary/90',
    'hover:bg-secondary/90',
    'focus:ring-primary/50',
    'focus:ring-secondary/50'
  ]
}
