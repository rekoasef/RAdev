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
        sans: ['"Open Sans"', 'sans-serif'],
        display: ['"Exo 2"', 'sans-serif'],
      },
      colors: {
        // Paleta Principal (Tema Oscuro)
        'brand-dark': '#1A1A1A',        // Fondo Principal
        'brand-surface': '#2C2C2C',    // Superficies Secundarias (cards)
        'brand-accent': '#FF4500',      // Acento Vibrante (Naranja Eléctrico)
        'brand-text-primary': '#E0E0E0',// Texto Principal
        'brand-text-secondary': '#A0A0A0',// Texto Secundario
        
        // Paleta Secundaria (Para un futuro tema claro)
        'brand-light-bg': '#F8F8F8',
        'brand-light-surface': '#F0F2F5',
        'brand-light-accent': '#4682B4', // Azul Acero
        'brand-light-text': '#212529',
      },
    },
  },
  plugins: [],
};
export default config;