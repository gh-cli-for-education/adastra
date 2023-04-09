/**
 * This configures the navigation sidebar.
 * All other languages follow this ordering/structure and will fall back to
 * English for any entries they haven’t translated.
 *
 * - All entries MUST include `text` and `key`
 * - Heading entries MUST include `header: true` and `type`
 * - Link entries MUST include `slug` (which excludes the language code)
 */
export default [
  {
    text: "Start Here",
    header: true,
    type: "learn",
    key: "startHere",
  },
  {
    text: "Getting Started",
    slug: "getting-started",
    key: "getting-started",
  },
  {
    text: "Test",
    slug: "test",
    key: "test",
  },
] as const;
