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
    screens: {
      xs: { max: "639px" },
      ...defaultTheme.screens,
    },
    fontFamily: {
      "family-bold": ["var(--font-bold)"],
      "family-medium": ["var(--font-medium)"],
      "family-regular": ["var(--font-regular)"],
    },
    extend: {
      fontSize: {
        h1: ["3.5rem", {}],
        h2: ["2.5rem", {}],
        h3: ["2rem", {}],
        h4: ["1.75rem", {}],
        h5: ["1.5rem", {}],
        h6: ["1rem", {}],
      },
    },
  },
  plugins: [],
} satisfies Config;
export default config;
