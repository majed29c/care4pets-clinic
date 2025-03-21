/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", // Fixed typo: "tx" → "ts"
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        xs: "300px",
        sm: "480px",
        md: "640px",
        lg: "850px",
        xl: "1024px",
        "2xl": "1400px",
      },
      fontFamily: {
        roboto: ["Roboto Mono", "monospace"], // Removed extra quotes
      },
    },
  },
  plugins:[require("tailwind-scrollbar-hide"),],
};
