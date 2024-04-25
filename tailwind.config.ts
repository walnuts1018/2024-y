import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors: {
        primary: {
          default: '#f9842c',
          dark: '#FA6C28',
          light: '#f9842c'
        },
      }
    },
    fontFamily: {
      Nunito: ["var(--font-Nunito)"],
      Noto: ["var(--font-Noto)"],
    }
  },
  plugins: [
    function ({ addUtilities }: { addUtilities: (arg: any) => void }) {
      const newUtilities = {
        ".button-shadow-lg": {
          filter: "drop-shadow(0 8px 0 #F875AA)",
        },
        ".button-shadow": {
          filter: "drop-shadow(0 4px 0 #F875AA)",
        },
        ".button-shadow-disabled-lg": {
          filter: "drop-shadow(0 8px 0 #7777)",
        },
        ".button-shadow-disabled": {
          filter: "drop-shadow(0 4px 0 #7777)",
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
export default config
