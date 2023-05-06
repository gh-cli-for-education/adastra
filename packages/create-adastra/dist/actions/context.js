import { prompt } from "@astrojs/cli-kit";
import arg from "arg";
import detectPackageManager from "which-pm-runs";
export const getContext = (argv) => {
    const flags = arg({
        "--help": Boolean,
        "--template": String,
        "-h": "--help",
    }, { argv, permissive: true });
    const pkgManager = detectPackageManager()?.name ?? "npm";
    let cwd = flags["_"][0];
    let { "--help": help = false, "--template": template } = flags;
    let projectName = cwd;
    const context = {
        help,
        prompt,
        pkgManager,
        projectName,
        template,
        cwd,
        exit: (code) => {
            process.exit(code);
        },
    };
    return context;
};
//# sourceMappingURL=context.js.map