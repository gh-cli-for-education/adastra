import { CollectionEntry, defineCollection, z } from "astro:content";

export const baseSchema = z
  .object({
    type: z.literal("base").optional().default("base"),
    title: z.string(),
    description: z.string().optional(),
  })
  .strict();

export const labSchema = baseSchema.extend({
  type: z.literal("lab"),
  key: z.string(),
  templateKey: z.string(),
});

export const classSchema = baseSchema.extend({
  type: z.literal("class"),
  relatedLabs: z.array(z.string()),
});

export type LabEntry = CollectionEntry<"docs"> & {
  data: z.infer<typeof labSchema>;
};

export type ClassEntry = CollectionEntry<"docs"> & {
  data: z.infer<typeof classSchema>;
};

export const isLabEntry = (
  entry: CollectionEntry<"docs">
): entry is LabEntry => {
  return entry.data.type === "lab";
};

export const isClassEntry = (
  entry: CollectionEntry<"docs">
): entry is ClassEntry => {
  return entry.data.type === "class";
};

const docs = defineCollection({
  schema: z.union([baseSchema, labSchema, classSchema]),
});

export const collections = { docs };
