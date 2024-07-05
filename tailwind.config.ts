import type { Config } from "tailwindcss";
// default theme to extend
import defaultTheme from "tailwindcss/defaultTheme";

const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      "family-bold": ["var(--font-bold)"],
      "family-medium": ["var(--font-medium)"],
      "family-regular": ["var(--font-regular)"],
    },
  },
  plugins: [],
} satisfies Config;
export default config;
