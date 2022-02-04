module.exports = {
  content: [],
  theme: {
    extend: {
      flex: {
        2: "2 2 0%",
      },
      maxWidth: {
        "8xl": "1920px",
      },
    },
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      cursor: ["disabled"],
    },
  },
  plugins: [],
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
};
