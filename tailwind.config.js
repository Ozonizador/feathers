module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      colors: {
        primary: {
          50: "#F9F3EF",
          100: "#F2E8DD",
          200: "#EDDCCF",
          300: "#D6B592",
          400: "#D0A280",
          500: "#C48B60",
        },
        terciary: {
          100: "#E8E8E8",
          200: "#DEDEDE",
          300: "#F9F9F9",
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
        spacing: {
          100: "25rem",
          140: "35rem",
        },
        socials: {
          facebook: "#F2F8FF",
          gmail: "#FFEBE9",
        },
      },
      zIndex: {
        900: 900,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
};
