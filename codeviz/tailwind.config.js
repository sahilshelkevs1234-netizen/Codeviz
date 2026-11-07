/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Neutral slate scale (used for dark surfaces)
        navy: {
          50: '#f8fafc', 100: '#f1f5f9', 200: '#e2e8f0', 300: '#cbd5e1',
          400: '#94a3b8', 500: '#64748b', 600: '#334155', 700: '#273244',
          800: '#1c2433', 900: '#131a26', 950: '#0d121b',
        },
        // Single accent colour: deep teal
        accent: { DEFAULT: '#0f766e', hover: '#115e59' },
        // Legacy colour names remapped so old classes stay consistent
        cyan: '#0f766e',
        blue:   { 50: '#f1f5f9', 100: '#e2e8f0', 500: '#0f766e', 600: '#115e59' },
        purple: { 100: '#e2e8f0', 200: '#cbd5e1', 400: '#94a3b8', 500: '#475569', 600: '#334155', 900: '#1c2433' },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: { 'fade-in': 'fadeIn 0.3s ease-in-out', 'slide-up': 'slideUp 0.3s ease-out' },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(12px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },
    },
  },
  plugins: [],
}
