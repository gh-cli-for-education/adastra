import type { CollectionEntry } from "astro:content";

export const getLangFromSlug = (slug: CollectionEntry<"docs">["slug"]) => {
  return slug.split("/")[0];
};

export const stripLangFromSlug = (slug: CollectionEntry<"docs">["slug"]) => {
  return slug.split("/").slice(1).join("/");
};
