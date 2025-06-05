import { UpdateP12GameParams, updateP12GameInfo } from '@/api';
import { sendEvent } from '@/utils';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'react-toastify';

export const useMutationP12UpdateGame = () => {
  return useMutation({
    mutationFn: (data: UpdateP12GameParams) => updateP12GameInfo(data),
    onSuccess: ({ data }) => {
      sendEvent('ed_edit_save', '编辑游戏：保存', { action: 1, result: 1 });
      toast.success('Save creation information successfully.');
      return data;
    },
    onError: () => {
      sendEvent('ed_edit_save', '编辑游戏：保存', { action: 1, result: 0 });
      toast.error('Save creation information failed. Please try again.');
    },
  });
};

// TypeScript internationalization: security: 🔒 implement data sanitization
interface LocaleMessages {
  [key: string]: string;
}

interface I18nConfig {
  locale: string;
  fallbackLocale: string;
  messages: Record<string, LocaleMessages>;
}

export const messages: Record<string, LocaleMessages> = {
  en: {
    security____implement_data_sanitization: 'security: 🔒 implement data sanitization',
    security____implement_data_sanitization_description: 'Description for security: 🔒 implement data sanitization'
  },
  zh: {
    security____implement_data_sanitization: 'security: 🔒 implement data sanitization',
    security____implement_data_sanitization_description: 'security: 🔒 implement data sanitization的描述'
  }
};

export const i18nConfig: I18nConfig = {
  locale: 'en',
  fallbackLocale: 'en',
  messages
};

export const t = (key: string, locale: string = 'en'): string => {
  return messages[locale]?.[key] || messages[i18nConfig.fallbackLocale]?.[key] || key;
};

// TypeScript utility function: perf: ⚡ optimize asset compression
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

export const perf____optimize_asset_compression: UtilityFunctions = {
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
