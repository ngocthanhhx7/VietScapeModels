/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        heritage: {
          sand: '#FBF9F5',         // Alabaster Silk canvas
          dark: '#1C1714',         // Warm Dark Timber text & accents
          terracotta: '#A4422E',   // Bát Tràng Terracotta
          gold: '#C59B27',         // Imperial Bronze / Antique Gold
          'gold-light': '#D4AF37', // Polished Gold highlight
          'gold-dark': '#9A7818',  // Deep antique gold
          jade: '#2D5A4C',         // Patina Jade
          cream: '#F3EFE6',        // Architectural porcelain cream
          muted: '#786F66',        // Weathered stone gray / muted text
          border: '#E8E2D5',       // Subtle silk boundary border
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Lora', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Be Vietnam Pro"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        'pedestal': '0 20px 40px -15px rgba(28, 23, 20, 0.08), 0 0 0 1px rgba(232, 226, 213, 0.8)',
        'pedestal-elevated': '0 30px 60px -12px rgba(28, 23, 20, 0.14), 0 0 0 1px rgba(197, 155, 39, 0.25)',
        'spotlight': '0 0 80px 20px rgba(197, 155, 39, 0.12)',
      },
      backgroundImage: {
        'radial-spotlight': 'radial-gradient(circle at 50% 40%, rgba(212, 175, 55, 0.12) 0%, rgba(251, 249, 245, 0) 70%)',
        'radial-gallery': 'radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.9) 0%, rgba(243, 239, 230, 0.5) 100%)',
        'heritage-gradient': 'linear-gradient(135deg, #1C1714 0%, #2A221E 100%)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.9' },
        },
      },
      animation: {
        float: 'float 4s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
