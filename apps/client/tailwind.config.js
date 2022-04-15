module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./layouts/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          50: "#ffffff",
          100: "#fafafa",
          200: "#E8E8EA",
          300: "#e4e4e7",
          400: "#C4C4CA",
          // Darker gray
          500: "#52525b",
          600: "#3f3f46",
          700: "#27272a",
          800: "#18181b",
          900: "#09090A",
        },
      },
    },
  },
  plugins: [],
};
