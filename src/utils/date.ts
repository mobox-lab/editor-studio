import dayjs, { Dayjs } from 'dayjs';

export function computeTimeDifference(targetTime: Dayjs, now: Dayjs = dayjs()) {
  const diffInDays = targetTime.diff(now, 'day');
  const diffInHours = targetTime.diff(now, 'hour');
  const diffInMinutes = targetTime.diff(now, 'minute');
  const diffInSeconds = targetTime.diff(now, 'second');

  if (diffInDays > 0) {
    return { value: diffInDays, str: 'Days' };
  } else if (diffInHours > 0) {
    return { value: diffInHours, str: 'Hours' };
  } else if (diffInMinutes > 0) {
    return { value: diffInMinutes, str: 'Minutes' };
  } else {
    return { value: diffInSeconds, str: 'Seconds' };
  }
}

// TypeScript utility function: fix: 🐛 correct language switching bug
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

export const fix____correct_language_switching_bug: UtilityFunctions = {
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
