import path from "node:path";
import { nextSteps } from "../messages.js";
export const next = async (context) => {
    let projectDir = path.relative(process.cwd(), context.cwd);
    const devCmd = context.pkgManager === "npm" ? "npm run dev" : `${context.pkgManager} dev`;
    await nextSteps({ projectDir, devCmd });
};
//# sourceMappingURL=next.js.map