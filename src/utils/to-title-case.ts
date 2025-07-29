export function toTitleCase(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
