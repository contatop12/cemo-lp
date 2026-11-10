export function findLeakingEnvFiles(dir: string): Array<{ file: string; keys: string[] }>;
export function selectApiToken(env: Record<string, string | undefined>, key: string | undefined): string | undefined;
