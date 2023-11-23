import { clsxm } from '@/utils';
import { motion } from 'framer-motion';
import { useCallback, useEffect } from 'react';
import { twMerge } from 'tailwind-merge';
import { RadioOption } from './RadioGroup';

export const RadioItem = ({
  option,
  name,
  currentValue,
  onValueChange,
  inputValues,
  onInputChange,
  dotContainerClass,
  dotClass,
  labelClass,
  dotIsSelected,
  showDot = true,
}: {
  option: RadioOption;
  name: string;
  currentValue: string;
  onValueChange: (value: string, key?: string) => void;
  inputValues: Record<string, string>;
  onInputChange: (key: string, value: string) => void;
  dotContainerClass?: string;
  dotClass?: string;
  labelClass?: string;
  showDot?: boolean;
  dotIsSelected?: boolean;
}) => {
  const {
    label,
    value,
    labelClass: innerLabelClass,
    labelStyle: innerLabelStyle,
    isInput,
    placeholder,
    defaultValue,
    key,
    prefix,
    suffix,
    inputClass,
    dotContainerClass: innerDotContainerClass,
    dotClass: innerDotClass,
    beforeOnChange,
    onClick,
    className,
    disabledGradientBorder,
  } = option;
  const realValue = (prefix ?? '') + (isInput ? inputValues[key ?? 'default'] || '' : value) + (suffix ?? '');
  const isSelected = currentValue === realValue;
  const inputValue = inputValues[key ?? 'default'] || '';
  const _dotIsSelected = dotIsSelected ?? isSelected;

  const _onInputChange = useCallback(
    (e: any) => {
      if (beforeOnChange) {
        const isOK = beforeOnChange?.(e.target.value);
        if (!isOK) return;
      }
      onInputChange(key ?? 'default', e.target.value);
    },
    [beforeOnChange, key, onInputChange],
  );

  // When the value in an incoming option changes, the control changes together with the internal
  useEffect(() => {
    if (!value) return;
    if (beforeOnChange) {
      const isOK = beforeOnChange?.(value);
      if (!isOK) return;
    }
    onInputChange(key ?? 'default', value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <label className={twMerge('group inline-flex cursor-pointer items-center gap-2', className)}>
      <input
        type="radio"
        className="hidden"
        name={name}
        value={realValue}
        checked={isSelected}
        onChange={() => onValueChange(realValue, key)}
      />
      {showDot && (
        <div
          className={clsxm(
            'relative flex h-5 w-5 items-center justify-center rounded-full bg-gradient-p12 p-1',
            {
              'border-2 border-white/30 bg-transparent': !isSelected,
              'group-hover:border-white': !_dotIsSelected,
            },
            dotContainerClass,
            innerDotContainerClass,
          )}
        >
          <div className="grid h-4 w-4 place-items-center rounded-full bg-gray-600 p-1">
            {_dotIsSelected && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className={clsxm('h-2 w-2 transform rounded-full bg-gradient-p12', dotClass, innerDotClass)}
              ></motion.div>
            )}
          </div>
        </div>
      )}
      <div
        onClick={onClick}
        className={clsxm(
          'relative z-0 flex flex-grow items-center rounded-sm border border-white/30 px-3 py-2.5',
          { 'group-hover:border-white': !isSelected },
          { 'border-transparent bg-white/10 group-hover:border-gray-350': isInput },
          labelClass,
          innerLabelClass,
        )}
        style={innerLabelStyle}
      >
        <span className="text-gray-300">{prefix}</span>
        {label}
        {isInput && (
          <input
            className={clsxm('w-full bg-transparent placeholder:text-gray-300', inputClass)}
            placeholder={placeholder ?? 'Please Enter'}
            defaultValue={defaultValue}
            value={inputValue}
            onChange={_onInputChange}
          />
        )}
        <span className="whitespace-nowrap text-gray-300">{suffix}</span>
      </div>
    </label>
  );
};
