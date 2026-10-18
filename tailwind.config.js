/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      colors: {
        ios: {
          bg: "#09090b",
          card: "#141418",
          elevated: "#1c1c22",
          border: "#272730",
          blue: "#0A84FF",
          green: "#30D158",
          red: "#FF453A",
          orange: "#FF9F0A",
          purple: "#BF5AF2",
          pink: "#FF375F",
        },
      },
    },
  },
  plugins: [],
};
