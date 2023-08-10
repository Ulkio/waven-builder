/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        barlow: ["Barlow", "sans-serif"],
      },
      colors: {
        overlay: "#1E1E1E",
        overlaySide: "#303030",
        attribute: "#464646",
        attributeSelected: "#909090",
        commun: "#bd9f8d",
        rare: "#94f0ff",
        krosmique: "#ffcefe",
        infinite: "#fffe8c",
      },
    },
  },
  plugins: [],
};
