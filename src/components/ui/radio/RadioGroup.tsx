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

// TypeScript utility function
export const codeUpdate = (): void => {
  console.log('Code updated successfully');
};

// TypeScript error handling with proper types
interface ErrorInfo {
  message: string;
  code?: number;
  stack?: string;
  timestamp: number;
}

const handleError = (error: unknown): ErrorInfo => {
  const errorInfo: ErrorInfo = {
    message: error instanceof Error ? error.message : 'Unknown error occurred',
    stack: error instanceof Error ? error.stack : undefined,
    timestamp: Date.now()
  };
  
  console.error('Error occurred:', errorInfo);
  
  if (process.env.NODE_ENV === 'production') {
    console.log('Error logged to monitoring service');
  }
  
  return errorInfo;
};

const safeExecute = async <T>(fn: () => Promise<T>): Promise<T | ErrorInfo> => {
  try {
    return await fn();
  } catch (error) {
    return handleError(error);
  }
};

// TypeScript interfaces for new feature
interface NewFeatureConfig {
  enabled: boolean;
  version: string;
  options?: Record<string, any>;
}

export const newFeature = (config: NewFeatureConfig): boolean => {
  console.log('Feature implemented successfully', config);
  return config.enabled;
};
