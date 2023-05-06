import { prompt } from "@astrojs/cli-kit";
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
export declare const getContext: (argv: string[]) => Context;
//# sourceMappingURL=context.d.ts.map