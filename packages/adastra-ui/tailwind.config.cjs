const plugin = require("tailwindcss/plugin");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "rgb(255 115 179 <alpha-value>)",
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("group-sidebar", ":merge(.group).mobile-sidebar-toggle &");
    }),
  ],
};
