import type { Config } from "tailwindcss";
import daisyui from "daisyui";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: [
      "light",
      "dark",
      "cupcake",
      "cyberpunk",
      {
        pokeball: {
          primary: "#fde047",
          secondary: "#ef4444",
          accent: "#111827",
          neutral: "#d1d5db",
          "base-100": "#f3f4f6",
          info: "#0ea5e9",
          success: "#84cc16",
          warning: "#f59e0b",
          error: "#dc2626",
        },
      },
    ],
  },
} satisfies Config;
