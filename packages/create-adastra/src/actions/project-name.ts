import { color, generateProjectName } from "@astrojs/cli-kit";
import path from "node:path";
import { info, log, title } from "../messages.js";
import type { Context } from "./context.js";
import { isEmpty, toValidName } from "./shared.js";

const checkCwd = async (cwd: string | undefined) => {
  const empty = cwd && isEmpty(cwd);
  if (empty) {
    log("");
    await info(
      "dir",
      `Using ${color.reset(cwd)}${color.dim(" as project directory")}`
    );
  }

  return empty;
};

export const projectName = async (context: Context) => {
  await checkCwd(context.cwd);

  if (!context.cwd || !isEmpty(context.cwd)) {
    if (!isEmpty(context.cwd)) {
      await info(
        "Hmm...",
        `${color.reset(`"${context.cwd}"`)}${color.dim(` is not empty!`)}`
      );
    }

    const { name } = await context.prompt({
      name: "name",
      type: "text",
      label: title("dir"),
      message: "Where should we create your new project?",
      initial: `./${generateProjectName()}`,
      validate(value: string) {
        if (!isEmpty(value)) {
          return `Directory is not empty!`;
        }
        // Check for non-printable characters
        if (value.match(/[^\x20-\x7E]/g) !== null)
          return `Invalid non-printable character present!`;
        return true;
      },
    });

    context.cwd = name!;
    context.projectName = toValidName(name!);
  } else {
    let name = context.cwd;
    if (name === "." || name === "./") {
      const parts = process.cwd().split(path.sep);
      name = parts[parts.length - 1];
    } else if (name.startsWith("./") || name.startsWith("../")) {
      const parts = name.split("/");
      name = parts[parts.length - 1];
    }
    context.projectName = toValidName(name);
  }

  if (!context.cwd) {
    context.exit(1);
  }
};
