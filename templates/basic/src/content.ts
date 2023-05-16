import { getCollection } from "astro:content";
import { isLabEntry } from "~/content/config";

export const allPages = await getCollection("docs");
export const labPages = allPages.filter(isLabEntry);

export type LabTemplates = {
  name: string;
  templateKey: string;
};

export const labsTemplates: LabTemplates[] = labPages.map(({ data }) => ({
  name: data.title,
  templateKey: data.templateKey,
}));
