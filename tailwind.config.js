module.exports = {
  mode: "jit",
  purge: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        lightPink: "#FCF5F3",
        brightPink: "#F13361",
      },
      fontFamily: {
        serif: ["Rosarivo", "serif"],
        boldSerif: ["PT Serif", "serif"],
        cursive: ["Patrick Hand", "cursive"],
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
