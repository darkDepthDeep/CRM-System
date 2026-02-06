function areEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (a == null || b == null) {
    return a === b;
  }

  const typeA = typeof a;
  const typeB = typeof b;

  if (typeA !== typeB) {
    return false;
  }

  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    return a.every((item, index) => areEqual(item, b[index]));
  }

  if (typeA === "object" && typeB === "object") {
    const objA = a as Record<string, unknown>;
    const objB = b as Record<string, unknown>;

    const keysA = Object.keys(objA);
    const keysB = Object.keys(objB);

    if (keysA.length !== keysB.length) {
      return false;
    }

    return keysA.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(objB, key) &&
        areEqual(objA[key], objB[key]),
    );
  }

  return false;
}

export function getChangedFields<T extends object>(
  original: T,
  updated: Partial<T>,
  keysToCompare?: (keyof T)[],
): Partial<T> {
  const changed: Partial<T> = {};

  // Определяем, какие ключи сравнивать
  const keys = keysToCompare || (Object.keys(updated) as (keyof T)[]);

  for (const key of keys) {
    // Проверяем, что ключ существует в обновленном объекте
    if (key in updated) {
      const originalValue = original[key];
      const updatedValue = updated[key];

      // Сравниваем значения (учитываем разные типы)
      if (!areEqual(originalValue, updatedValue)) {
        changed[key] = updatedValue as T[keyof T];
      }
    }
  }

  return changed;
}
