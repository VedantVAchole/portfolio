/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        ink: {
          50: "#FAFAFA",
          200: "#E0E0E8",
          400: "#B0B0B8",
          500: "#8A8A94",
          600: "#6A6A74",
          800: "#1A1A1F",
          900: "#0D0D10",
          950: "#08080A",
        },
        accent: {
          amber: "#E8A87C",
          pink: "#C38D9E",
        },
      },
      maxWidth: {
        shell: "1400px",
      },
    },
  },
  plugins: [],
};
