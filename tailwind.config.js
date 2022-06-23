module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F2E8DD",
          300: "#D6B592",
          500: "#C48B60"
        },
        neutral: {
          100: "#E8E8E8",
        },
        secondary: {
          300: "#908A88",
          500: "#505046"
        }
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}