import { color, spinner } from "@astrojs/cli-kit";
import { downloadTemplate } from "giget";
import fs from "node:fs";
import path from "node:path";
import { error, info, title } from "../messages.js";
const FILES_TO_UPDATE = {
    "package.json": (file, overrides) => fs.promises.readFile(file, "utf-8").then((value) => {
        // Match first indent in the file or fallback to `\t`
        const indent = /(^\s+)/m.exec(value)?.[1] ?? "\t";
        fs.promises.writeFile(file, JSON.stringify(Object.assign(JSON.parse(value), Object.assign(overrides, { private: undefined })), null, indent), "utf-8");
    }),
};
const copyTemplate = async (template, context) => {
    const templateTarget = `github:withastro/astro/examples/${template}#latest`;
    // Copy
    try {
        await downloadTemplate(templateTarget, {
            force: true,
            provider: "github",
            cwd: context.cwd,
            dir: ".",
        });
    }
    catch (err) {
        fs.rmdirSync(context.cwd);
        if (err.message.includes("404")) {
            throw new Error(`Template ${color.reset(template)} ${color.dim("does not exist!")}`);
        }
        else {
            throw new Error(err.message);
        }
    }
    // It's possible the repo exists (ex. `withastro/astro`),
    // But the template route is invalid (ex. `withastro/astro/examples/DNE`).
    // `giget` doesn't throw for this case,
    // so check if the directory is still empty as a heuristic.
    if (fs.readdirSync(context.cwd).length === 0) {
        throw new Error(`Template ${color.reset(template)} ${color.dim("is empty!")}`);
    }
    // Post-process in parallel
    const updateFiles = Object.entries(FILES_TO_UPDATE).map(async ([file, update]) => {
        const fileLoc = path.resolve(path.join(context.cwd, file));
        if (fs.existsSync(fileLoc)) {
            return update(fileLoc, { name: context.projectName });
        }
    });
    await Promise.all([...updateFiles]);
};
export const template = async (context) => {
    if (!context.template) {
        const { template: tmpl } = await context.prompt({
            name: "template",
            type: "select",
            label: title("tmpl"),
            message: "How would you like to start your new project?",
            initial: "basics",
            choices: [
                {
                    value: "basics",
                    label: "Include sample files",
                    hint: "(recommended)",
                },
                // { value: "blog", label: "Use blog template" },
                // { value: "minimal", label: "Empty" },
            ],
        });
        context.template = tmpl;
    }
    else {
        await info("tmpl", `Using ${color.reset(context.template)}${color.dim(" as project template")}`);
    }
    if (context.template) {
        await spinner({
            start: "Template copying...",
            end: "Template copied",
            while: () => copyTemplate(context.template, context).catch((e) => {
                // eslint-disable-next-line no-console
                if (e instanceof Error) {
                    error("error", e.message);
                    process.exit(1);
                }
                else {
                    error("error", "Unable to clone template.");
                    process.exit(1);
                }
            }),
        });
    }
    else {
        context.exit(1);
    }
};
//# sourceMappingURL=template.js.map