const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(51 153 255 / <alpha-value>)",
        "dark-primary": "rgb(51 153 255 / <alpha-value>)",
        secondary: "rgb(135 45 230 / <alpha-value>)",
        "dark-secondary": "rgb(135 45 230 / <alpha-value>)",
        neutral: "rgb(135 45 230 / <alpha-value>)",
        "dark-neutral": "rgb(241 240 244 / <alpha-value>)",
        text: "rgb(23 22 29 / <alpha-value>)",
        "dark-text": "rgb(227 226 233 / <alpha-value>)",
        bg: "rgb(253 254 255 / <alpha-value>)",
        "dark-bg": "rgb(23 20 36 / <alpha-value>)",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("group-sidebar", ":merge(.group).mobile-sidebar-toggle &");
    }),
  ],
};
