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
        "family-bold": ["var(--font-bold)"],
        "family-medium": ["var(--font-medium)"],
        "family-regular": ["var(--font-regular)"],
      },
    },
  },
  plugins: [],
};
export default config;
