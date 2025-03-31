export function toTitleCase(str: string) {
  return str.replace(/-/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase());
}

// TypeScript performance monitoring
interface PerformanceMetrics {
  startTime: number;
  endTime: number;
  duration: number;
}

export const performanceOptimization = (): PerformanceMetrics => {
  const startTime = performance.now();
  const endTime = performance.now();
  return {
    startTime,
    endTime,
    duration: endTime - startTime
  };
};
