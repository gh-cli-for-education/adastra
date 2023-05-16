import { CollectionEntry, defineCollection, z } from "astro:content";

export const baseSchema = z
  .object({
    type: z.literal("base").optional().default("base"),
    title: z.string(),
    description: z.string().optional(),
  })
  .strict();

export const labSchema = baseSchema
  .extend({
    type: z.literal("lab"),
    templateKey: z.string(),
  });

export type LabEntry = CollectionEntry<"docs"> & {
  data: z.infer<typeof labSchema>;
};

export const isLabEntry = (
  entry: CollectionEntry<"docs">
): entry is LabEntry => {
  return entry.data.type === "lab";
};

const docs = defineCollection({
  schema: z.union([baseSchema, labSchema]),
});

export const collections = { docs };
