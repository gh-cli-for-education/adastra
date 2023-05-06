import { spinner } from "@astrojs/cli-kit";
import { execa } from "execa";
import { error, info, title } from "../messages.js";
const install = async ({ pkgManager, cwd, }) => {
    const installExec = execa(pkgManager, ["install"], { cwd });
    return new Promise((resolve, reject) => {
        setTimeout(() => reject(`Request timed out after one minute`), 60000);
        installExec.on("error", (e) => reject(e));
        installExec.on("close", () => resolve());
    });
};
export const dependecies = async (context) => {
    const { deps } = await context.prompt({
        name: "deps",
        type: "confirm",
        label: title("deps"),
        message: `Install dependencies?`,
        hint: "recommended",
        initial: true,
    });
    context.install = deps;
    if (!deps)
        return await info("No problem!", "Remember to install dependencies after setup.");
    await spinner({
        start: `Dependencies installing with ${context.pkgManager}...`,
        end: "Dependencies installed",
        while: () => install({ pkgManager: context.pkgManager, cwd: context.cwd }).catch((e) => {
            error("error", e);
            process.exit(1);
        }),
    });
};
//# sourceMappingURL=dependencies.js.map