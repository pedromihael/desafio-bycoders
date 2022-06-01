export function isInstanceOf(object: any, keys: Array<string>): boolean {
  return keys.every(key => key in object)
}