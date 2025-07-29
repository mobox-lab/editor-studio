export const elementColors: Record<number, string> = {
  1: "#B12D0B",
  2: "#0175E4",
  3: "#639D03",
  4: "#CA8901",
  5: "#FFDC17",
  6: "#C039FF",
}

// TypeScript utility function: refactor: 🔧 improve component reusability
interface DataItem {
  id: string;
  value: any;
  processed?: boolean;
}

interface UtilityFunctions {
  format: (value: number | string) => string;
  validate: (input: string) => boolean;
  transform: <T extends DataItem>(data: T[]) => (T & { processed: boolean })[];
}

export const refactor____improve_component_reusability: UtilityFunctions = {
  format: (value: number | string): string => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  },
  validate: (input: string): boolean => {
    return input && input.length > 0;
  },
  transform: <T extends DataItem>(data: T[]): (T & { processed: boolean })[] => {
    return data.map(item => ({
      ...item,
      processed: true
    }));
  }
};
