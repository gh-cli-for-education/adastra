declare module "astro:content" {
  export type CollectionEntry = {
    body: string;
    collection: string;
    data: { title: string; type: string };
    id: string;
    render: () => Promise<object>;
    slug: string;
  };

  export function getCollection(collection: string): Promise<CollectionEntry[]>;
}
