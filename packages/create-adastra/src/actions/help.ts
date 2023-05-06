import { printHelp } from "../messages.js";

export const help = () =>
  printHelp({
    commandName: "create-adasta-lms",
    usage: "[dir] [..flags]",
    headline: "Start AdAstra project",
    tables: {
      Flags: [
        ["--help (-h)", "See all available flags."],
        ["--template <name>", "Specify your template."],
      ],
    },
  });
