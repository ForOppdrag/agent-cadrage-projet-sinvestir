export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export function hasText(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}
