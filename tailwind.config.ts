import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // We can define Haramain brand colors here later
        brand: {
          dark: "#111827",
          light: "#F9FAFB",
          accent: "#0ea5e9" 
        }
      }
    },
  },
  plugins: [],
};
export default config;
