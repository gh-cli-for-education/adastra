import { CollectionEntry, defineCollection, z } from "astro:content";

export const baseSchema = z
  .object({
    type: z.literal("base").optional().default("base"),
    title: z.string(),
    description: z.string().optional(),
  })
  .strict();

export const tutorialSchema = baseSchema.extend({
  type: z.literal("tutorial"),
  unitTitle: z.string().optional(),
});

export type TutorialEntry = CollectionEntry<"docs"> & {
  data: z.infer<typeof tutorialSchema>;
};

export const isTutorialEntry = (
  entry: CollectionEntry<"docs">
): entry is TutorialEntry => {
  return entry.data.type === "tutorial";
};

const docs = defineCollection({
  schema: z.union([baseSchema, tutorialSchema]),
});

export const collections = { docs };
