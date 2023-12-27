export * from './shorten';
export * from './to-title-case';
export * from './camel-to-snake';

import { qtClient } from '@/api';
import { twMerge } from 'tailwind-merge';
import { clsx, type ClassValue } from 'clsx';

export function clsxm(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const openExternalLink = (link: string) => {
  qtClient.openExternalLink(link);
};

export const sendEvent = (eventName: string, desc?: string, data?: any) => {
  qtClient.eventTrack({ kind: eventName, kind_desc: desc, data });
};
