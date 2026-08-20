/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dirora: {
          purple: '#4F14E8', // Royal purple extracted from the Dirora logo
          dark: '#0A0A0A',   // Deep dark text for contrast
          ivory: '#FDFCF0',  // Clean ivory/white base from spec
          gold: '#D4AF37',   // Subtle gold gradient accent for the sale banner
        }
      },
      fontFamily: {
        // Elegant serif for premium jewellery feel (e.g., Playfair Display or similar)
        serif: ['"Playfair Display"', 'serif'], 
        sans: ['"Inter"', 'sans-serif'],
      }
    },
  },
  plugins: [],
}