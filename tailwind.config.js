module.exports = {
  content: [],
  theme: {
    extend: {
      maxWidth: {
        "8xl": "1920px",
      },
    },
  },
  plugins: [],
  purge: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
};
