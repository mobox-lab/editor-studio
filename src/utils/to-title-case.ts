export function toTitleCase(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}
