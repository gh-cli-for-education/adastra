import { color, label } from "@astrojs/cli-kit";
import { align, sleep } from "@astrojs/cli-kit/utils";
import stripAnsi from "strip-ansi";
let { stdout } = process;
export const log = (message) => stdout.write(message + "\n");
export const title = (text) => align(label(text), "end", 7) + " ";
export const printHelp = ({ commandName, headline, usage, tables, description, }) => {
    const linebreak = () => "";
    const table = (rows, { padding }) => {
        const split = stdout.columns < 60;
        let raw = "";
        for (const row of rows) {
            if (split) {
                raw += `    ${row[0]}\n    `;
            }
            else {
                raw += `${`${row[0]}`.padStart(padding)}`;
            }
            raw += "  " + color.dim(row[1]) + "\n";
        }
        return raw.slice(0, -1); // remove latest \n
    };
    let message = [];
    if (headline) {
        message.push(linebreak(), `${title(commandName)} ${headline}`);
    }
    if (usage) {
        message.push(linebreak(), `${color.green(commandName)} ${color.bold(usage)}`);
    }
    if (tables) {
        function calculateTablePadding(rows) {
            return rows.reduce((val, [first]) => Math.max(val, first.length), 0);
        }
        const tableEntries = Object.entries(tables);
        const padding = Math.max(...tableEntries.map(([, rows]) => calculateTablePadding(rows)));
        for (const [, tableRows] of tableEntries) {
            message.push(linebreak(), table(tableRows, { padding }));
        }
    }
    if (description) {
        message.push(linebreak(), `${description}`);
    }
    log(message.join("\n") + "\n");
};
export const info = async (prefix, text) => {
    await sleep(100);
    if (stdout.columns < 80) {
        log(`${" ".repeat(5)} ${color.cyan("◼")}  ${color.cyan(prefix)}`);
        log(`${" ".repeat(9)}${color.dim(text)}`);
    }
    else {
        log(`${" ".repeat(5)} ${color.cyan("◼")}  ${color.cyan(prefix)} ${color.dim(text)}`);
    }
};
export const error = async (prefix, text) => {
    if (stdout.columns < 80) {
        log(`${" ".repeat(5)} ${color.red("▲")}  ${color.red(prefix)}`);
        log(`${" ".repeat(9)}${color.dim(text)}`);
    }
    else {
        log(`${" ".repeat(5)} ${color.red("▲")}  ${color.red(prefix)} ${color.dim(text)}`);
    }
};
export const nextSteps = async ({ projectDir, devCmd, }) => {
    const max = stdout.columns;
    const prefix = max < 80 ? " " : " ".repeat(9);
    await sleep(200);
    log(`\n ${color.bgCyan(` ${color.black("next")} `)}  ${color.bold("AdAstra LMS Created. Explore your project!")}`);
    await sleep(100);
    if (projectDir !== "") {
        projectDir = projectDir.includes(" ")
            ? `"./${projectDir}"`
            : `./${projectDir}`;
        const enter = [
            `\n${prefix}Enter your project directory using`,
            color.cyan(`cd ${projectDir}`, ""),
        ];
        const len = enter[0].length + stripAnsi(enter[1]).length;
        log(enter.join(len > max ? "\n" + prefix : " "));
    }
    log(`${prefix}Run ${color.cyan(devCmd)} to start the dev server. ${color.cyan("CTRL+C")} to stop.`);
    await sleep(100);
};
//# sourceMappingURL=messages.js.map