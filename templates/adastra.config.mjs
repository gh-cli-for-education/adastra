/**
 * @param {import('./basic/node_modules/tailwindcss/plugin')} tailwindPlugin
 * @return {import('./basic/node_modules/tailwindcss').Config}
 */
export const tailwindConfig = (tailwindPlugin) => {
  return {
    theme: {
      extend: {
        colors: {
          primary: "rgb(51 153 255 / <alpha-value>)",
          "dark-primary": "rgb(51 153 255 / <alpha-value>)",
          secondary: "rgb(135 45 230 / <alpha-value>)",
          "dark-secondary": "rgb(135 45 230 / <alpha-value>)",
          neutral: "rgb(135 45 230 / <alpha-value>)",
          "dark-neutral": "rgb(241 240 244 / <alpha-value>)",
          text: "rgb(23 22 29 / <alpha-value>)",
          "dark-text": "rgb(227 226 233 / <alpha-value>)",
          "bg-from": "rgb(238 231 244/ <alpha-value>)",
          "bg-to": "rgb(253 254 255 / <alpha-value>)",
          "dark-bg-from": "rgb(50 40 70 / <alpha-value>)",
          "dark-bg-to": "rgb(30 20 36 / <alpha-value>)",
          code: "rgb(49 39 73 / <alpha-value>)",
          "code-dark": "rgb(24 19 37 / <alpha-value>)",
        },
        spacing: {
          "navbar-height": "6rem",
          "sidebar-width": "18rem",
          "right-sidebar-width": "0rem",
          min: "1rem",
          "min-md": "1.5rem",
          "padding-block": "0.5rem",
          "padding-block-md": "1rem",
          "padding-block-xl": "1.5rem",
        },
        fontSize: {
          code: "1rem",
        },
      },
    },
    plugins: [],
  };
};

export const organizationInfo = {
  name: "gh-cli-for-education",
  site: "http://localhost:3000/",
};
