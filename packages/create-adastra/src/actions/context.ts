import { prompt } from "@astrojs/cli-kit";
import arg from "arg";
import detectPackageManager from "which-pm-runs";

export interface Context {
  help: boolean;
  prompt: typeof prompt;
  cwd: string;
  pkgManager: string;
  projectName?: string;
  template?: string;
  install?: boolean;
  exit(code: number): never;
}

export const getContext = (argv: string[]): Context => {
  const flags = arg(
    {
      "--help": Boolean,
      "--template": String,

      "-h": "--help",
    },
    { argv, permissive: true }
  );

  const pkgManager = detectPackageManager()?.name ?? "npm";
  let cwd = flags["_"][0];
  let { "--help": help = false, "--template": template } = flags;
  let projectName = cwd;

  const context: Context = {
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
