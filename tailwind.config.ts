import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        display: ['var(--font-display)', 'sans-serif'],
      },
      colors: {
        'brand-dark': '#0A0A0A',
        'brand-surface': '#141414',
        'brand-surface-2': '#1E1E1E',
        'brand-accent': '#FF6500',
        'brand-text-primary': '#F0F0F0',
        'brand-text-secondary': '#8A8A8A',
        'brand-border': 'rgba(255,255,255,0.07)',
      },
      boxShadow: {
        'accent-glow': '0 0 40px rgba(255, 101, 0, 0.15)',
        'accent-glow-sm': '0 0 20px rgba(255, 101, 0, 0.10)',
      },
    },
  },
  plugins: [],
};
export default config;
