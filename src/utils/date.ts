import dayjs, { Dayjs } from 'dayjs';

export function computeTimeDifference(targetTime: Dayjs, now: Dayjs = dayjs()) {
  const diffInSeconds = targetTime.diff(now, 'second');

  const diffInDays = Math.floor(diffInSeconds / (3600 * 24));
  const diffInHours = Math.floor(diffInSeconds / 3600);
  const diffInMinutes = Math.floor(diffInSeconds / 60);

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
