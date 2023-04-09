import { defineConfig } from "astro/config";

// https://astro.build/config
import tailwind from "@astrojs/tailwind";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  // TODO: Use import.meta.env.SITE_URL
  site: "http://localhost:3000/",
});
