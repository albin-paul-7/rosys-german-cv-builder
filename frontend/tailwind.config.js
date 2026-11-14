/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rosys: {
          navy: '#14477c',
          navyDark: '#0d325a',
          navyLight: '#2463a5',
          gold: '#d4af37',
          crimson: '#b91c1c',
          crimsonDark: '#991b1b',
          bg: '#f8fafc',
          border: '#e2e8f0',
          textMuted: '#64748b'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif']
      }
    },
  },
  plugins: [],
}
