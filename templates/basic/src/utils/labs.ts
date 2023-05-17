import { labPages } from "~/content";

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

      return { slug: `${slugParts.join("/")}`, title: data.title };
    })
    .filter((value) => value != undefined) as { slug: string; title: string }[];
