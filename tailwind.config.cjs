/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      width: {
        form: '348px',
        'form-desktop': '960px',
      },
      letterSpacing: {
            disclaimer: '0.15em',
          },
      maxWidth: {
        form: '960px',
      },
      spacing: {
        'form-x': '4rem', // 64px
        'form-y': '2.5rem', // 40px
        'stepper-width': '420px',
      },
      colors: {
        // ── Semantic tokens (use as bg-primary, text-secondary, etc.) ──
        primary:   '#F5821F',   // orange — main CTA
        secondary: '#1A3A6B',   // navy  — secondary actions

        // ── Brand palette ──────────────────────────────────────────────
        navy:     { DEFAULT: '#1A3A6B', light: '#2F69B3', dark: '#112850' },
        brand:    { blue: '#2B7DC8', disclaimer: '#2F7EC7' },
        orange:   { DEFAULT: '#F5821F', hover: '#E0730E', light: '#FEF0E4' },
        cream:    { DEFAULT: '#F9EFE5', border: '#E2CDB8' },
        progress: { active: '#5CB85C', inactive: '#C5B89A' },
        flag:     { red: '#BF0A30', blue: '#002868' },
        gray:     { custom: '#515151', border:"#2C2C37" },
        heading:  { custom: '#104E8B' },
      },
      fontFamily: {
        heading:   ['"Fira Sans"', 'sans-serif'],
        body:      ['Lato', 'sans-serif'],
        headingCustom: ['Helvetica', 'Arial', 'sans-serif'],
        inter:     ['Inter', 'sans-serif'],
      },
      fontSize: {
        xs: '10px',
        sm: '14px',
        base: '19px',
        md: '20px',
        lg : '24px',
        xl : '26px',
},
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.12)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.18)',
        btn: '0 4px 12px rgba(245,130,31,0.35)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease forwards',
        'slide-up': 'slideUp 0.35s ease forwards',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
    },
  },
  plugins: [],
};
