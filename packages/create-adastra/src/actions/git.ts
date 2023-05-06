import { color, spinner } from "@astrojs/cli-kit";
import { execa } from "execa";
import fs from "node:fs";
import path from "node:path";
import { error, info, title } from "../messages.js";
import type { Context } from "./context.js";

const init = async ({ cwd }: { cwd: string }) => {
  try {
    await execa("git", ["init"], { cwd, stdio: "ignore" });
    await execa("git", ["add", "-A"], { cwd, stdio: "ignore" });
    await execa(
      "git",
      [
        "commit",
        "-m",
        "Initial commit from Astro",
        '--author="houston[bot] <astrobot-houston@users.noreply.github.com>"',
      ],
      { cwd, stdio: "ignore" }
    );
  } catch (e) {}
};

export const git = async (context: Context) => {
  if (fs.existsSync(path.join(context.cwd, ".git")))
    return await info("Nice!", `Git has already been initialized`);

  const { git } = await context.prompt({
    name: "git",
    type: "confirm",
    label: title("git"),
    message: `Initialize a new git repository?`,
    hint: "optional",
    initial: true,
  });

  if (!git)
    return await info(
      "Sounds good!",
      `You can always run ${color.reset("git init")}${color.dim(" manually.")}`
    );

  await spinner({
    start: "Git initializing...",
    end: "Git initialized",
    while: () =>
      init({ cwd: context.cwd }).catch((e) => {
        error("error", e);
        process.exit(1);
      }),
  });
};
