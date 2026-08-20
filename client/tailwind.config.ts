import type { Config } from 'tailwindcss';

const config = {
  content: [
    './client/app/**/*.{js,ts,jsx,tsx,mdx}',
    './client/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
} satisfies Config;

export default config;
