import type { CollectionEntry } from "astro:content";
import { englishPages } from "~/content";
import { getPageCategory } from "./getPageCategory";

export const removeSubPageSegment = (path: string) => {
  const regex =
    /(?:install|deploy|integrations-guide|tutorial|migrate-to-astro|recipes|cms)\//;
  const matches = regex.exec(path);

  if (matches) {
    const matchIndex = matches.index;
    const slashIndex = path.slice(matchIndex).indexOf("/") + matchIndex;
    return path.slice(0, slashIndex);
  }

  return path;
};

const typeIndexes: Partial<
  Record<CollectionEntry<"docs">["data"]["type"], string>
> = {};

const categoryIndex: Partial<
  Record<ReturnType<typeof getPageCategory>, string>
> = { "Error Reference": "reference/error-reference" };

export const isSubPage = (currentPage: string, parentSlug: string) => {
  // Test 1: do the two pages share a base URL segment?
  if (
    removeSubPageSegment(currentPage).endsWith(removeSubPageSegment(parentSlug))
  )
    return true;

  // Test 2: is there a known parent page for this page category?
  const category = getPageCategory({ pathname: "/" + currentPage + "/" });
  if (categoryIndex[category] === parentSlug) return true;

  // Test 3: is there a known parent page for this page type?
  const type = englishPages.find(({ slug }) => slug === currentPage)?.data.type;
  if (type && typeIndexes[type] === parentSlug) return true;

  return false; 
};
