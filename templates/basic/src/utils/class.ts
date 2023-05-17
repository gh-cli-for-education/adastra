import { labPages, subjectPages } from "~/content";

export const getRelatedLabsInfo = (relatedLabs: string[]) =>
  relatedLabs
    .map((lab) => {
      const foundLab = labPages.find(({ data }) => data.key === lab);
      if (foundLab == undefined) return;

      const { slug, data } = foundLab;

      const slugParts = slug.split("/").map((value) => {
        const [idText, ...textArray] = value.split("-");
        if (Number.isNaN(Number(idText))) return;

        return textArray.join("-");
      });
      if (slugParts.some((value) => value == undefined)) return;

      return { slug: `/${slugParts.join("/")}`, title: data.title };
    })
    .filter((value) => value != undefined) as { slug: string; title: string }[];

export const getRelatedSubjectsInfo = (relatedSubjects: string[]) =>
  relatedSubjects
    .map((subject) => {
      const foundSubject = subjectPages.find(
        ({ data }) => data.key === subject
      );
      if (foundSubject == undefined) return;

      const { slug, data } = foundSubject;

      const slugParts = slug.split("/").map((value) => {
        const [idText, ...textArray] = value.split("-");
        if (Number.isNaN(Number(idText))) return;

        return textArray.join("-");
      });
      if (slugParts.some((value) => value == undefined)) return;

      return { slug: `/${slugParts.join("/")}`, title: data.title };
    })
    .filter((value) => value != undefined) as { slug: string; title: string }[];
