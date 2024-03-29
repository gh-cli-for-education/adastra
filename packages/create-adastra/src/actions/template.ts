import { color, spinner } from "@astrojs/cli-kit";
import { downloadTemplate } from "giget";
import fs from "node:fs";
import path from "node:path";
import symlinkDir from "symlink-dir";
import { error, info, title } from "../messages.js";
import type { Context } from "./context.js";

const FILES_TO_UPDATE = {
  "package.json": (
    file: string,
    overrides: {
      name: string;
      scripts: Record<string, string>;
    }
  ) =>
    fs.promises.readFile(file, "utf-8").then((value) => {
      // Match first indent in the file or fallback to `\t`
      const indent = /(^\s+)/m.exec(value)?.[1] ?? "\t";
      fs.promises.writeFile(
        file,
        JSON.stringify(
          Object.assign(
            JSON.parse(value),
            Object.assign(overrides, { private: undefined })
          ),
          null,
          indent
        ),
        "utf-8"
      );
    }),
};

const copyTemplate = async (template: string, context: Context) => {
  const templateTarget = `github:gh-cli-for-education/adastra/templates/${template}`;

  // Copy
  try {
    await downloadTemplate(templateTarget, {
      force: true,
      provider: "github",
      cwd: context.cwd,
      dir: "./.adastra",
    });
  } catch (err: any) {
    fs.rmdirSync(context.cwd + "/.adastra");
    if (err.message.includes("404")) {
      throw new Error(
        `Template ${color.reset(template)} ${color.dim("does not exist!")}`
      );
    } else {
      throw new Error(err.message);
    }
  }

  if (fs.readdirSync(context.cwd + "/.adastra").length === 0) {
    throw new Error(
      `Template ${color.reset(template)} ${color.dim("is empty!")}`
    );
  }

  fs.renameSync(
    `${context.cwd}/.adastra/package.json`,
    `${context.cwd}/package.json`
  );

  // Post-process in parallel
  const updateFiles = Object.entries(FILES_TO_UPDATE).map(
    async ([file, update]) => {
      const fileLoc = path.resolve(path.join(context.cwd, file));
      if (fs.existsSync(fileLoc)) {
        return update(fileLoc, {
          name: context.projectName!,
          scripts: {
            dev: 'astro dev --root "./.adastra"',
            build: 'astro build --root "./.adastra"',
          },
        });
      }
    }
  );

  await Promise.all([...updateFiles]);

  fs.renameSync(
    `${context.cwd}/.adastra/.gitignore`,
    `${context.cwd}/.gitignore`
  );
  fs.writeFileSync(`${context.cwd}/.env`, "GITHUB_SECRET=\n");

  fs.writeFileSync(
    `${context.cwd}/adastra.config.mjs`,
    `/**
 * @param {import('./node_modules/tailwindcss/plugin')} tailwindPlugin
 * @return {import('./node_modules/tailwindcss').Config}
 */
export const tailwindConfig = {
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
        title: "2rem",
        "title-sm": "3rem",
        "title-md": "4rem",
      },
    },
  },
};

export const organizationInfo = {
  pageTitle: "${context.projectName}",
  github: {
    organizationName: "",
    classroomUrl: "",
  },
  virtualCampus: {
    teachingGuideUrl: "",
    campusUrl: "",
    labsUrl: "",
  },
};
`
  );

  fs.symlinkSync(`../.env`, `${context.cwd}/.adastra/.env`, "file");
  symlinkDir(`${context.cwd}/.adastra/public`, `${context.cwd}/public`);
  symlinkDir(
    `${context.cwd}/.adastra/src/content/docs/1-activities/1-classes`,
    `${context.cwd}/classes`
  );
  symlinkDir(
    `${context.cwd}/.adastra/src/content/docs/1-activities/2-labs`,
    `${context.cwd}/labs`
  );
  symlinkDir(
    `${context.cwd}/.adastra/src/content/docs/1-activities/3-subjects`,
    `${context.cwd}/subjects`
  );
};

export const template = async (context: Context) => {
  if (!context.template) {
    const { template: tmpl } = await context.prompt({
      name: "template",
      type: "select",
      label: title("tmpl"),
      message: "How would you like to start your new project?",
      initial: "basic",
      choices: [
        {
          value: "basic",
          label: "Basic LMS",
          hint: "(recommended)",
        },
        // { value: "blog", label: "Use blog template" },
        // { value: "minimal", label: "Empty" },
      ],
    });
    context.template = tmpl;
  } else {
    await info(
      "tmpl",
      `Using ${color.reset(context.template)}${color.dim(
        " as project template"
      )}`
    );
  }

  if (context.template) {
    await spinner({
      start: "Template copying...",
      end: "Template copied",
      while: () =>
        copyTemplate(context.template!, context as Context).catch((e) => {
          // eslint-disable-next-line no-console
          if (e instanceof Error) {
            error("error", e.message);
            process.exit(1);
          } else {
            error("error", "Unable to clone template.");
            process.exit(1);
          }
        }),
    });
  } else {
    context.exit(1);
  }
};
