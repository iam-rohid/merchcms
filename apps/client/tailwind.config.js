const colors = require("tailwindcss/colors");
module.exports = {
  darkMode: "class",
  content: ["pages/**/*.{js,jsx,ts,tsx}", "components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gray: colors.zinc,
        primary: colors.indigo,
        facebook: "#3290F2",
        google: "#DB4437",
      },
    },
  },
  plugins: [],
};
