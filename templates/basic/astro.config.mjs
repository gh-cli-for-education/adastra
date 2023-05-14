import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

import solidJs from "@astrojs/solid-js";
import { organizationInfo } from "../adastra.config.mjs";

// https://astro.build/config
export default defineConfig({
  integrations: [
    tailwind({
      config: { applyBaseStyles: false },
    }),
    solidJs(),
  ],
  site: organizationInfo.site,
});
