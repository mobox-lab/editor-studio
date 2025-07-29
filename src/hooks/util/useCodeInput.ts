import { FormEvent, useState } from 'react';

/**
 * 用于生成输入验证码的输入框数组。
 * @param length 输入框数组的长度
 * @returns {object} 返回：
 *  - code: 输入的验证码数组
 *  - setCodeValue: 用于设置指定索引位置的输入框值的函数
 *  - handleKeyDown: 用于处理键盘事件的函数
 *  - onInput: 处理输入，only allow input single digit，输入后自动聚焦到下一个输入框
 *  - onPaste: 处理粘贴事件。
 */
export function useCodeInput(length: number) {
  const [code, setCode] = useState(new Array(length).fill(''));

  /**
   * 处理键盘事件，聚焦到上一个输入框或下一个输入框。
   * @param e 键盘事件
   * @param index 输入框索引
   */
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    const target = e.target as HTMLInputElement;
    const prevSibling = target.previousElementSibling as HTMLInputElement;
    const nextSibling = target.nextElementSibling as HTMLInputElement;

    if (e.key === 'Backspace' && !code[index]) {
      if (index > 0) {
        setCodeValue(index - 1, '');
        prevSibling?.focus();
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      prevSibling?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      nextSibling?.focus();
    }
  };

  /**
   * 处理输入，only allow input single digit，输入后自动聚焦到下一个输入框
   */
  const onInput = (e: FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    // only allow input single digit
    if (!/^\d$/.test(target.value)) {
      target.value = ''; // clear non-numeric input
      return;
    }
    const nextSibling = (e.target as HTMLElement).nextElementSibling;
    if (nextSibling && nextSibling instanceof HTMLInputElement) {
      nextSibling.focus();
    }
  };

  /**
   * 处理粘贴事件。
   */
  const onPaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newCode = pastedData.split('');
      setCode(newCode);
    }
  };

  /**
   * 定义设置指定索引位置的输入框值的函数。
   * @param index 输入框索引
   * @param value 要设置的值
   */
  const setCodeValue = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);
  };

  // return input array and set value of input at specified index
  return { code, setCodeValue, handleKeyDown, onInput, onPaste };
}

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript internationalization: refactor: 🔧 improve component reusability
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
    refactor____improve_component_reusability: 'refactor: 🔧 improve component reusability',
    refactor____improve_component_reusability_description: 'Description for refactor: 🔧 improve component reusability'
  },
  zh: {
    refactor____improve_component_reusability: 'refactor: 🔧 improve component reusability',
    refactor____improve_component_reusability_description: 'refactor: 🔧 improve component reusability的描述'
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
