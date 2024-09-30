/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {

    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        'game-orange': '#FF8D3B',
        'game-green': '#B2EC68',
        'game-gray': '#636363',
        'game-pink': '#FFC6C6',
        'game-red': '#FD4A4A',
      },
      fontFamily: {
        "ibmBI": "var(--font-ibm-bi)",
        "ibmR": "var(--font-ibm-r)",
        "ibmM": "var(--font-ibm-m)",
        "ibmB": "var(--font-ibm-b)",
      },
      dropShadow: {
        glow: [
          "0 0px 20px rgba(255,255, 255, 0.35)",
          "0 0px 65px rgba(255, 255,255, 0.2)"
        ]
      },
      fontSize: {
        'get-ready': '18rem',
      },
    },
  },
  plugins: [],
};
