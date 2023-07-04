import { color, spinner } from "@astrojs/cli-kit";
import { downloadTemplate } from "giget";
import fs from "node:fs";
import path from "node:path";
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
            dev: 'astro dev --root ".\\.adastra"',
            build: 'astro build --root ".\\.adastra"',
          },
        });
      }
    }
  );

  fs.writeFileSync(`${context.cwd}/.env`, "GITHUB_SECRET=\n");

  await Promise.all([...updateFiles]);
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
