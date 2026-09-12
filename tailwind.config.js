/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#090d16',
        surface: '#111827',
        'surface-elevated': '#1f2937',
        border: '#2a3447',
        primary: {
          DEFAULT: '#2563eb',
          hover: '#1d4ed8',
          subtle: '#1e3a8a',
        },
      },
    },
  },
  plugins: [],
}
