import plugin from "tailwindcss/plugin.js";
import { tailwindConfig } from "../adastra.config.mjs";

/** @type {import('tailwindcss').Config} */
export default {
  presets: [tailwindConfig(plugin)],
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/adastra-ui/components/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],
  theme: {},
  plugins: [
    plugin(({ addVariant }) => {
      addVariant("group-sidebar", ":merge(.group).mobile-sidebar-toggle &");
    }),
  ],
  darkMode: "class",
};
