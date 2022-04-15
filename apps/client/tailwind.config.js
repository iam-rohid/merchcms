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
          200: "#f1f1f2",
          300: "#e4e4e7",
          400: "#d4d4d8",
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
