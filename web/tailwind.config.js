/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      fontFamily: {
        sans: "Roboto, sans-serif",
      },
      backgroundImage: { app: "url(/app-bg.png)" },
      colors: {
        nlwGreen: {
          500: "#129e57",
        },
        nlwYellow: {
          500: "#f7dd43",
          700: "#e5cd3d",
        },

        nlwGray: {
          100: "#e1e1e6",
          300: "#8D8D99",
          600: "#323238",
          800: "#202024",
          900: "#121214",
        },
      },
    },
  },
  plugins: [],
};
