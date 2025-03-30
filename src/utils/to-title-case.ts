export function toTitleCase(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

// TypeScript error handling
interface ErrorResponse {
  message: string;
  code: number;
  details?: any;
}

export const bugFix = (): ErrorResponse | null => {
  try {
    return null;
  } catch (error) {
    return {
      message: error instanceof Error ? error.message : 'Unknown error',
      code: 500
    };
  }
};
