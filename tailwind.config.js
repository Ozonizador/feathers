module.exports = {
  content: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#F2E8DD",
          300: "#D6B592",
          500: "#C48B60",
        },
        terciary: {
          100: "#E8E8E8",
          300: "#F9F9F9",
          500: "#DFDFDF",
        },
        secondary: {
          300: "#908A88",
          500: "#505046",
        },
        socials: {
          facebook: "#F2F8FF",
          gmail: "#FFEBE9",
        },
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
