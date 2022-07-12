

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
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
          200: "#DEDEDE",
          300: "#F9F9F9",
          400: "#262E36",
          500: "#DFDFDF",
          600: "#F2E8DE",
          700: "#DBDBDB",
        },
        secondary: {
          300: "#908A88",
          400: "#7D8A97",
          500: "#505046",
          600: "#262E36",
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
  plugins: [require("flowbite/plugin")],
};
