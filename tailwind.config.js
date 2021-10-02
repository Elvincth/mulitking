module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightPink: "#FCF5F3",
      },
      fontFamily: {
        sans: ["Rosarivo", "serif"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
