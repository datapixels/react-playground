/**
 * Gets a value from path on object, calling functions with parameters along the way
 * @param obj - The object to query
 * @param path - Example "model.getCode('test', 123)" calls getCode with those params
 * @returns The value at the path, or undefined if not found
 */
export function getValueOnPath(obj: Record<string, any>, path: string): any {
  if (!obj || !path) return undefined;
  
  try {
    return new Function('obj', `return obj.${path}`)(obj);
  } catch {
    return undefined;
  }
}