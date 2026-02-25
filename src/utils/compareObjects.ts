export function getChangedFields<T extends object>(
  original: T,
  updated: Partial<T>,
  keys: (keyof T)[],
): Partial<T> {
  const changed: Partial<T> = {};

  for (const key of keys) {
    if (original[key] !== updated[key]) {
      changed[key] = updated[key] as T[keyof T];
    }
  }

  return changed;
}
