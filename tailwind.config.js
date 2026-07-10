/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#F8F8FB',
        card: '#FFFFFF',
        primary: '#6C63FF',
        secondary: '#A78BFA',
        ink: '#2F2F2F',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Poppins', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '28px',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(108, 99, 255, 0.08)',
        'soft-lg': '0 16px 50px rgba(108, 99, 255, 0.12)',
        glow: '0 0 40px rgba(108, 99, 255, 0.25)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'fade-up': 'fadeUp 0.6s cubic-bezier(0.22,1,0.36,1)',
        'fade-scale': 'fadeScale 0.4s cubic-bezier(0.22,1,0.36,1)',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeScale: {
          '0%': { opacity: '0', transform: 'scale(0.96)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        pulseSoft: {
          '0%,100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
};
