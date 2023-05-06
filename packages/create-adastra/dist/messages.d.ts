export declare const log: (message: string) => boolean;
export declare const title: (text: string) => string;
export declare const printHelp: ({ commandName, headline, usage, tables, description, }: {
    commandName: string;
    headline?: string | undefined;
    usage?: string | undefined;
    tables?: Record<string, [command: string, help: string][]> | undefined;
    description?: string | undefined;
}) => void;
export declare const info: (prefix: string, text: string) => Promise<void>;
export declare const error: (prefix: string, text: string) => Promise<void>;
export declare const nextSteps: ({ projectDir, devCmd, }: {
    projectDir: string;
    devCmd: string;
}) => Promise<void>;
//# sourceMappingURL=messages.d.ts.map