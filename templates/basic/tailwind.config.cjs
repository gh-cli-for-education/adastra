const plugin = require("tailwindcss/plugin");
const { tailwindConfig } = require("../adastra.config.cjs");

/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [tailwindConfig],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/**/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/**/src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {},
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("group-sidebar", ":merge(.group).mobile-sidebar-toggle &");
    }),
  ],
  darkMode: "class",
};
