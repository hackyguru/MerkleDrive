module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        bg: "#014550",
        primary: "#0fd290",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
