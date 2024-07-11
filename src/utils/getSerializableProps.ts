export function getSerializableProps<T extends Record<string, any>>(
  obj: Record<string, any>
) {
  return JSON.parse(JSON.stringify(obj)) as T;
}
