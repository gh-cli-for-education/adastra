import type { CollectionEntry } from "astro:content";

export const getLangFromUrl = (pathname: string) => {
  const langCodeMatch = pathname.match(/\/([a-z]{2}-?[a-z]{0,2})\//);
  return langCodeMatch ? langCodeMatch[1] : "en";
};

export const removeLeadingSlash = (path: string) => {
  return path.replace(/^[/\\]+/, "");
};

export const removeTrailingSlash = (path: string) => {
  return path.replace(/[/\\]+$/, "");
};

export const getLangFromSlug = (slug: CollectionEntry<"docs">["slug"]) => {
  return slug.split("/")[0];
};

export const stripLangFromSlug = (slug: CollectionEntry<"docs">["slug"]) => {
  return slug.split("/").slice(1).join("/");
};
