import { clsxm } from '@/utils';
import { CSSProperties, Fragment, MouseEventHandler, ReactNode, Ref, forwardRef, useCallback, useState } from 'react';
import { RadioItem } from './RadioItem';

export type OptionValueType = string;

export interface RadioOption {
  label?: string | ReactNode;
  key?: string;
  value?: OptionValueType;
  suffix?: string;
  prefix?: string;
  onClick?: MouseEventHandler<HTMLSpanElement>;
  beforeOnChange?: (value: string) => boolean;
  // input value
  isInput?: boolean;
  defaultValue?: string;
  inputClass?: string;
  placeholder?: string;
  inputOnForce?: () => void;
  // classes
  className?: string;
  labelClass?: string;
  labelStyle?: CSSProperties;
  dotClass?: string;
  dotContainerClass?: string;
}

interface RadioGroupProps {
  options: Array<RadioOption | RadioOption[] | null>;
  name: string;
  onChange: (value: string, key?: string) => void;
  value?: OptionValueType;
  defaultValue?: string;
  className?: string;
  dotClass?: string;
  dotContainerClass?: string;
  labelClass?: string;
}

const RadioGroup = forwardRef(
  (
    {
      options,
      name,
      value: externalValue,
      defaultValue,
      onChange,
      className,
      dotClass,
      dotContainerClass,
      labelClass,
    }: RadioGroupProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const [selectedValue, setSelectedValue] = useState<string | null>(defaultValue ?? null);
    const [inputValues, setInputValues] = useState<Record<string, string>>({});
    const isControlled = externalValue !== undefined;
    const currentValue = isControlled ? externalValue : selectedValue ?? '';

    const handleRadioChange = useCallback(
      (value?: string, key?: string) => {
        if (!value) return;
        if (!isControlled) {
          setSelectedValue(value);
        }
        onChange(value, key);
      },
      [isControlled, onChange],
    );

    const handleInputChange = useCallback(
      (key: string, value: string) => {
        setInputValues((prev) => ({
          ...prev,
          [key]: value,
        }));
        handleRadioChange(value, key);
      },
      [handleRadioChange],
    );

    const renderOptions = useCallback(
      () =>
        options.map((option, idx) => {
          if (!option) return null;
          const isArray = Array.isArray(option);
          if (isArray && !option?.length) return null;

          if (isArray) {
            const opts = option as RadioOption[];
            const realValues = opts.map((opt) => {
              const { value, isInput, key, prefix, suffix } = opt;
              const realValue =
                // (prefix ?? '') +
                isInput ? inputValues[key ?? 'default'] || '' : value;
              //  + (suffix ?? '');
              return realValue;
            });
            return (
              <Fragment key={idx}>
                {opts.map((opt, idx) => {
                  const isSelected = realValues.includes(currentValue);
                  return (
                    <RadioItem
                      showDot={idx === 0}
                      key={opt?.key ?? opt?.value}
                      option={opt}
                      name={name}
                      currentValue={currentValue}
                      onValueChange={handleRadioChange}
                      inputValues={inputValues}
                      onInputChange={handleInputChange}
                      dotContainerClass={dotContainerClass}
                      dotClass={dotClass}
                      labelClass={labelClass}
                      dotIsSelected={isSelected}
                    />
                  );
                })}
              </Fragment>
            );
          }
          const opt = option as RadioOption;

          return (
            <RadioItem
              key={opt?.key ?? opt?.value}
              option={opt}
              name={name}
              currentValue={currentValue}
              onValueChange={handleRadioChange}
              inputValues={inputValues}
              onInputChange={handleInputChange}
              dotContainerClass={dotContainerClass}
              dotClass={dotClass}
              labelClass={labelClass}
            />
          );
        }),
      [currentValue, dotClass, dotContainerClass, handleInputChange, handleRadioChange, inputValues, labelClass, name, options],
    );
    return (
      <div className={clsxm('flex gap-3 text-xs/5 text-white', className)} ref={ref}>
        {renderOptions()}
      </div>
    );
  },
);
RadioGroup.displayName = 'RadioGroup';
export default RadioGroup;

// TypeScript internationalization: feat: ✨ implement wallet connection for Web3
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
    feat____implement_wallet_connection_for_Web3: 'feat: ✨ implement wallet connection for Web3',
    feat____implement_wallet_connection_for_Web3_description: 'Description for feat: ✨ implement wallet connection for Web3'
  },
  zh: {
    feat____implement_wallet_connection_for_Web3: 'feat: ✨ implement wallet connection for Web3',
    feat____implement_wallet_connection_for_Web3_description: 'feat: ✨ implement wallet connection for Web3的描述'
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
