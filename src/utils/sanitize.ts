export function sanitize<T extends object>(
  entity: T,
  fieldsToRemove: string[]
): Partial<T> {
  const sanitized = { ...entity };
  for (const field of fieldsToRemove) {
    delete (sanitized as any)[field];
  }
  return sanitized;
}
