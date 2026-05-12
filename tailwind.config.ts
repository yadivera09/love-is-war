import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        mincho: ["'Shippori Mincho'", "serif"],
        klee: ["'Klee One'", "cursive"],
      },
      colors: {
        red: {
          deep: "#8b0000",
          mid: "#c0392b",
          dark: "#3d0000",
        },
        cream: "#f0e6d3",
        parchment: "#d4c4b0",
      },
    },
  },
  plugins: [],
};

export default config;
