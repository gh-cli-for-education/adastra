declare module "astro:content" {
  export type CollectionEntry = {
    body: string;
    collection: string;
    data: object;
    id: string;
    render: () => Promise<object>;
    slug: string;
  };

  export function getCollection(collection: string): Promise<CollectionEntry[]>;
}
