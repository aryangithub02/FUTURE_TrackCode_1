/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8B5CF6',
          dark: '#7C3AED',
        },
        dark: {
          DEFAULT: '#0F172A',
          light: '#1E293B',
        },
        accent: {
          DEFAULT: '#8B5CF6',
          light: '#A78BFA',
        },
        emerald: '#22c55e',
        lightBg: '#F8FAFC',
        darkBg: '#0F172A',
        text: '#F8FAFC',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'ui-sans-serif', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'Noto Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'Consolas', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Liberation Mono', 'monospace'],
      },
      boxShadow: {
        glowBlue: '0 0 0 2px rgba(88, 166, 255, 0.25), 0 0 12px rgba(88, 166, 255, 0.35)',
        glowGreen: '0 0 0 2px rgba(63, 185, 80, 0.25), 0 0 12px rgba(63, 185, 80, 0.35)',
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(139,148,158,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(139,148,158,0.12) 1px, transparent 1px)',
      },
      backgroundSize: {
        grid: '24px 24px',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

