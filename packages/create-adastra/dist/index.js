import { getContext } from "./actions/context.js";
import { dependecies } from "./actions/dependencies.js";
import { git } from "./actions/git.js";
import { help } from "./actions/help.js";
import { next } from "./actions/next.js";
import { projectName } from "./actions/project-name.js";
const exit = () => process.exit(0);
process.on("SIGINT", exit);
process.on("SIGTERM", exit);
export const main = async () => {
    const clearArgv = process.argv.slice(2).filter((arg) => arg !== "--");
    const context = getContext(clearArgv);
    if (context.help)
        return help();
    const steps = [
        projectName,
        // template,
        dependecies,
        git,
        next,
    ];
    for (const step of steps) {
        await step(context);
    }
    exit();
};
// export const main = async () => {
//   try {
//     await downloadTemplate("gh:gh-cli-for-education/astro-example", {
//       force: true,
//       provider: "github",
//       cwd: "./prueba",
//       dir: ".",
//     });
//   } catch (err: any) {
//     console.error(err.message);
//   }
// };
//# sourceMappingURL=index.js.map