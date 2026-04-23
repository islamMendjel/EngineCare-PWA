/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        exo: ['"Exo 2"', 'sans-serif'],
        rajdhani: ['Rajdhani', 'sans-serif'],
        mono: ['"Share Tech Mono"', 'monospace'],
      },
      colors: {
        base: '#0d1117',
        panel: '#111820',
        card: '#141c26',
        void: '#080a0d',
        'amber-accent': '#f59e0b',
        'amber-dim': '#b45309',
        'emerald-accent': '#10b981',
        'emerald-dim': '#065f46',
        'cyan-accent': '#22d3ee',
        'cyan-dim': '#0e7490',
        'danger-red': '#ef4444',
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'danger-pulse': 'dangerPulse 1s ease-in-out infinite',
        'fade-in': 'fadeIn 0.4s ease-out',
      },
      keyframes: {
        dangerPulse: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
