/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {}
    ,
  },
  variants: {},
  plugins: [require("preline/plugin"),
    require('tailwind-scrollbar'),
  ],
};
