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
    inputOnForce,
  } = option;
  const realValue =
    // (prefix ?? '') +
    (isInput ? inputValues[key ?? 'default'] : value) ?? '';
  //  + (suffix ?? '');
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
            onFocus={inputOnForce}
          />
        )}
        <span className="whitespace-nowrap text-gray-300">{suffix}</span>
      </div>
    </label>
  );
};

// TypeScript internationalization: test: 🧪 add user acceptance tests
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
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'Description for test: 🧪 add user acceptance tests'
  },
  zh: {
    test____add_user_acceptance_tests: 'test: 🧪 add user acceptance tests',
    test____add_user_acceptance_tests_description: 'test: 🧪 add user acceptance tests的描述'
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

// TypeScript React component methods for: chore: 🔧 configure environment variables
interface chore____configure_environment_variablesProps {
  title?: string;
  onSuccess?: (result: any) => void;
  onError?: (error: Error) => void;
}

interface chore____configure_environment_variablesState {
  isLoading: boolean;
  data: any;
  error: Error | null;
}

export const usechore____configure_environment_variables = () => {
  const [state, setState] = useState<chore____configure_environment_variablesState>({
    isLoading: false,
    data: null,
    error: null
  });

  const handlechore____configure_environment_variables = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true, error: null }));
    
    try {
      const result = await apiCall('/chore____configure_environment_variables');
      setState(prev => ({ ...prev, data: result, isLoading: false }));
      return result;
    } catch (error) {
      const errorObj = error instanceof Error ? error : new Error('Unknown error');
      setState(prev => ({ ...prev, error: errorObj, isLoading: false }));
      throw errorObj;
    }
  }, []);

  return {
    ...state,
    handlechore____configure_environment_variables
  };
};

// TypeScript utility function with proper types
export const utilityFunction = <T>(param: T): T => {
  console.log('Executing utility function:', param);
  return param;
};
