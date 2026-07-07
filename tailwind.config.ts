import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#111111',
        cream: '#F7F4EC',
        stone: '#E8E4DB',
        sand: '#D8CDBD',
        taupe: '#B7AA98',
        muted: '#756F65',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(17, 17, 17, 0.10)',
      },
    },
  },
  plugins: [],
};

export default config;
