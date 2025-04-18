/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}", 
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
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100px)' },
        },
      },
      animation: {
        slideLeft: 'slideLeft 0.5s ease-out forwards',
        slideRight: 'slideRight 0.3s ease-in-out forwards', // Fixed to match keyframe name
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
}
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
      },colors: {
        secondary: "#350967",
        hovered: "#4F1B7F",
        charcoal: "#1F1F1F",
        light: "#F5F1F9",
        background: "#E1D4ED",
      },
      keyframes: {
        slideLeft: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        slideLeft: 'slideLeft 0.5s ease-out forwards',
        slideRight: 'slideRight 0.5s ease-out forwards', // Fixed to match keyframe name
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
