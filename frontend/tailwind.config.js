/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#eef4ff",
          100: "#dbe7ff",
          200: "#b9d1ff",
          300: "#8ab0ff",
          400: "#5885ff",
          500: "#3560ff",
          600: "#1f3fed",
          700: "#1930c2",
          800: "#192c98",
          900: "#1a2b78",
        },
      },
      boxShadow: {
        card: "0 1px 2px 0 rgba(16,24,40,0.05), 0 1px 3px 0 rgba(16,24,40,0.06)",
      },
    },
  },
  plugins: [],
};
