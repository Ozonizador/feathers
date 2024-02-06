module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.{js,jsx,ts,tsx}",
    "./node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@zach.codes/react-calendar/dist/**/*.js",
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
      minHeight: {
        "screen-75": "75vh",
      },
      fontSize: {
        55: "55rem",
      },
      opacity: {
        80: ".8",
      },
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
          800: "#D9D9D9",
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
        700: 700,
        900: 900,
        2: 2,
        3: 3,
      },
      inset: {
        "-100": "-100%",
        "-225-px": "-225px",
        "-160-px": "-160px",
        "-150-px": "-150px",
        "-94-px": "-94px",
        "-50-px": "-50px",
        "-29-px": "-29px",
        "-20-px": "-20px",
        "25-px": "25px",
        "40-px": "40px",
        "95-px": "95px",
        "145-px": "145px",
        "195-px": "195px",
        "210-px": "210px",
        "260-px": "260px",
      },
      height: {
        "95-px": "95px",
        "70-px": "70px",
        "350-px": "350px",
        "500-px": "500px",
        "600-px": "600px",
      },
      maxHeight: {
        "860-px": "860px",
      },
      maxWidth: {
        "100-px": "100px",
        "120-px": "120px",
        "150-px": "150px",
        "180-px": "180px",
        "200-px": "200px",
        "210-px": "210px",
        "580-px": "580px",
      },
      minWidth: {
        "140-px": "140px",
        48: "12rem",
      },
      backgroundSize: {
        full: "100%",
      },
    },
  },
  variants: [
    "responsive",
    "group-hover",
    "focus-within",
    "first",
    "last",
    "odd",
    "even",
    "hover",
    "focus",
    "active",
    "visited",
    "disabled",
  ],
  plugins: [
    require("flowbite/plugin")]
};
