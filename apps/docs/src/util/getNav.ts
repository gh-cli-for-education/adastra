import type { AstroGlobal } from "astro";
import { allPages } from "~/content";
import type { NavDict } from "~/i18n/translation-checkers";
import { fallbackLang, navTranslations } from "~/i18n/util";
import { getLangFromUrl, stripLangFromSlug } from "~/util";
import { groupPagesByLang } from "./groupPagesByLang";

const pagesByLang = groupPagesByLang(allPages);

const slugsByLang: Record<string, Set<string>> = Object.fromEntries(
  Object.entries(pagesByLang).map(([lang, pages]) => [
    lang,
    new Set(pages.map(({ slug }) => stripLangFromSlug(slug))),
  ])
);

// const markFallbackNavEntries = (lang: string, nav: NavDict) => {
//   const slugs = slugsByLang[lang];

//   for (const entry of nav) {
//     if ("header" in entry) continue;
//     if (!(slugs.has(entry.slug) || slugs.has(entry.slug + "/index")))
//       entry.isFallback = true;
//   }

//   return nav;
// };

export const getNav = (Astro: AstroGlobal): NavDict => {
  const lang = getLangFromUrl(Astro.url.pathname) || fallbackLang;
  // return markFallbackNavEntries(lang, navTranslations[lang]);
  return navTranslations[lang];
};
