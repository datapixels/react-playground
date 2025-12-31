/**
 * Sets a value at path on object (immutable - creates new object)
 * @param obj - The object to modify
 * @param path - Example "model.code" sets value at that path
 * @param value - The value to set
 * @returns A new object with the value set
 */
export function setValueOnPath(
    obj: Record<string, any>,
    path: string,
    value: any
): void {
    const keys = path.split('.');
    let current: any = obj;

    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }

    current[keys[keys.length - 1]] = value;
}