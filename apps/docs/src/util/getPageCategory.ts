const defaultCategory = "Learn";

const categories = [
  ["guides/deploy", "Deploy Guides"],
  ["guides/integrations-guide/", "Integration Guides"],
  ["reference/error-reference", "Error Reference"],
  ["reference/", "Reference"],
  ["tutorial/", "Tutorials"],
] as const;

export const getPageCategory = (url: { pathname: string }) => {
  const langAgnosticPath = url.pathname.replace(/\/\w\w(-\w\w)?\//, "");

  for (const [path, label] of categories) {
    if (langAgnosticPath.startsWith(path)) return label;
  }

  return defaultCategory;
};
