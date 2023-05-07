import { getCollection } from "astro:content";

export type Entry = {
  text: string;
  slug: string;
};

export type Section = {
  name: string;
  entries: Entry[];
};

export type NavegationTab = {
  type: string;
  sections: Section[];
};

export type WithId<T> = T & { id: number };
type NavegationTabWithId = WithId<
  Omit<NavegationTab, "sections"> & {
    sections: WithId<Omit<Section, "entries"> & { entries: WithId<Entry>[] }>[];
  }
>;

let navegationTabs: NavegationTab[] | undefined = undefined;

const kebabCaseToTitleCase = (text: string) => {
  const textWithSpace = text.replace(/-/g, " ");
  const lowerCaseText = textWithSpace.toLowerCase();
  const titleCase = lowerCaseText.replace(
    /\b\w/g,
    (text) => text.charAt(0).toUpperCase() + text.substring(1)
  );

  return titleCase;
};

const extractIdAndText = (text: string): WithId<{ text: string }> => {
  const [idText, ...textArray] = text.split("-");
  const index = Number(idText);
  const textWithoutIndex = textArray.join("-");

  return { id: index, text: textWithoutIndex };
};

const getTabIndex = (
  navigationWithId: NavegationTabWithId[],
  tabId: number,
  tabText: string
): number | undefined => {
  if (Number.isNaN(tabId)) return;

  const tabIndex = navigationWithId.findIndex(
    (value) => value.type === tabText
  );
  if (tabIndex !== -1) return tabIndex;

  navigationWithId.push({ id: tabId, sections: [], type: tabText });
  return navigationWithId.length - 1;
};

const getSectionIndex = (
  navigationWithId: NavegationTabWithId[],
  tabIndex: number,
  sectionId: number,
  sectionText: string
): number | undefined => {
  if (Number.isNaN(sectionId)) return;

  const sectionIndex = navigationWithId[tabIndex].sections.findIndex(
    (value) => value.name === sectionText
  );
  if (sectionIndex !== -1) return sectionIndex;

  navigationWithId[tabIndex].sections.push({
    id: sectionId,
    entries: [],
    name: sectionText,
  });
  return navigationWithId[tabIndex].sections.length - 1;
};

const getEntryIndex = (
  navigationWithId: NavegationTabWithId[],
  tabIndex: number,
  sectionIndex: number,
  entryId: number,
  entrySlug: string,
  entryText: string
): number | undefined => {
  if (Number.isNaN(entryId)) return;

  const entryIndex = navigationWithId[tabIndex].sections[
    sectionIndex
  ].entries.findIndex((value) => value.slug === entrySlug);
  if (entryIndex === -1)
    navigationWithId[tabIndex].sections[sectionIndex].entries.push({
      id: entryId,
      slug: entrySlug,
      text: entryText,
    });

  return sectionIndex;
};

export const resetNavigation = () => {
  navegationTabs = undefined;
};

export const getNavigation = async (): Promise<NavegationTab[]> => {
  if (navegationTabs != undefined) return navegationTabs;

  const allPages = await getCollection("docs");
  const allRoutes = allPages.map(({ slug }) => slug);
  const routes = allRoutes.map((route) => route.split("/"));

  const navigationWithId: NavegationTabWithId[] = [];
  routes.forEach((route) => {
    if (route == undefined) return;
    if (route.length < 2 || route.length > 3) return;

    const [tab, section, entry] = route;
    if (entry != undefined) {
      const { id: tabId, text: tabText } = extractIdAndText(tab);
      const tabTitleText = kebabCaseToTitleCase(tabText);
      const tabIndex = getTabIndex(navigationWithId, tabId, tabTitleText);
      if (tabIndex == undefined) return;

      const { id: sectionId, text: sectionText } = extractIdAndText(section);
      const sectionTitleText = kebabCaseToTitleCase(sectionText);
      const sectionIndex = getSectionIndex(
        navigationWithId,
        tabIndex,
        sectionId,
        sectionTitleText
      );
      if (sectionIndex == undefined) return;

      const { id: entryId, text: entrySlug } = extractIdAndText(entry);
      const entryText = kebabCaseToTitleCase(entrySlug);
      const entryIndex = getEntryIndex(
        navigationWithId,
        tabIndex,
        sectionIndex,
        entryId,
        entrySlug,
        entryText
      );
      if (entryIndex == undefined) return;
    }
  });

  navegationTabs = navigationWithId
    .sort((firstNav, secondNav) => firstNav.id - secondNav.id)
    .map(({ sections, type }) => ({
      type,
      sections: sections
        .sort(
          (firstSection, secondSection) => firstSection.id - secondSection.id
        )
        .map(({ entries, name }) => ({
          name,
          entries: entries
            .sort((firstEntry, secondEntry) => firstEntry.id - secondEntry.id)
            .map(({ id, ...entry }) => entry),
        })),
    }));

  return navegationTabs;
};
