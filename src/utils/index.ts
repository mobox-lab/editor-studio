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
