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
          primary: "#F6BD20",
          secondary: "#20416A",
          accent: "#FFDE00",
          neutral: "#D5C573",
          "base-100": "#f3f4f6",
          info: "#5A7BBD",
          success: "#94D541",
          warning: "#FF6200",
          error: "#DD0000",
        },
      },
    ],
  },
} satisfies Config;
