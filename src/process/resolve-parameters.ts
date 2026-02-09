import { getValueOnPath } from "../components/ZustandPlayground/utils/get-value-on-path";


export function getValue(path: string, store: Record<string, unknown>): unknown {
    console.log("Resolving path:", path, "with store:", store);
    if (typeof path === "string" && path.startsWith("$")) {
        return getValueOnPath(store, path);
    }

    return path;
}

export function resolveArgs(args: Record<string, unknown>, store: Record<string, unknown>): unknown {
    const result: Record<string, unknown> = {};

    const keys = Object.keys(args);
    for (const key of keys) {
        result[key] = getValue(args[key] as string, store);
    }
  return result;
}