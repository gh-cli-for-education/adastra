import enNav from "~/i18n/en/nav";

type NavDictionaryKeys = (typeof enNav)[number]["key"];
export type TabType = "learn" | "api";
export type NavDict = Array<
  {
    text: string;
    key: NavDictionaryKeys;
    isFallback?: boolean;
  } & ({ slug: string } | { header: true; type: TabType })
>;

/**
 * Helper to type check and process a dictionary of navigation menu translations.
 * Converts it to an array matching the English menu’s sorting with English items used as fallback entries.
 */
export const NavDictionary = (
  dict: Partial<Record<NavDictionaryKeys, string>>
) => {
  const orderedDictionary: NavDict = [];

  for (const enEntry of enNav) {
    const text = dict[enEntry.key] || enEntry.text;
    orderedDictionary.push({ ...enEntry, text });
  }

  return orderedDictionary;
};
