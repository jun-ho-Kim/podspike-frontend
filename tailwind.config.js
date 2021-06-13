const colors = require("tailwindcss/colors");

module.exports = {
  purge: ["./src/**/*.tsx","./src/**/*.jsx"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extends: {
      colors: {
        primary: '#1FA1EB',
        lightblue: colors.lightBlue
      }
    },
    
  },
  variants: {
    extend: {
    }
  },
  plugins: [],
}
