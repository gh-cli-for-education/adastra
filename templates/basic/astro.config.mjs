import solidJs from "@astrojs/solid-js";
import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";
import { organizationInfo } from "../adastra.config.mjs";

import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    solidJs(),
    mdx(),
  ],
  site: organizationInfo.site,
  outDir: "../dist",
});
