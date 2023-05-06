import path from "node:path";
import { nextSteps } from "../messages.js";
import type { Context } from "./context.js";

export const next = async (context: Context) => {
  let projectDir = path.relative(process.cwd(), context.cwd);
  const devCmd =
    context.pkgManager === "npm" ? "npm run dev" : `${context.pkgManager} dev`;

  await nextSteps({ projectDir, devCmd });
};
