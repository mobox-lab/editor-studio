import { useDebounce } from 'react-use';
import { twMerge } from 'tailwind-merge';
import { KeyboardEvent, useState } from 'react';
import SearchSVG from '@/../public/svg/search.svg?component';

type SearchProps = {
  defaultValue?: string;
  className?: string;
  placeholder?: string;
  onChange?: (value: string) => void;
  onEnterUp?: (value: string) => void;
  debounceMs?: number;
};
export default function Search({
  defaultValue,
  className,
  placeholder = 'work name...',
  onChange,
  onEnterUp,
  debounceMs = 500,
}: SearchProps) {
  const [value, setValue] = useState<string>(defaultValue ?? '');
  useDebounce(() => onChange?.(value), debounceMs, [value]);

  const handleKeyPress = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') onEnterUp?.(value);
  };

  return (
    <div className={twMerge('flex items-center gap-2 rounded-sm bg-white/10 px-3 py-2.5 text-xs/5', className)}>
      <SearchSVG />
      <input
        type="text"
        value={value}
        onChange={({ target }) => setValue(target.value)}
        onKeyUp={(event) => handleKeyPress(event)}
        className="w-4/5 bg-transparent text-xs/5"
        placeholder={placeholder}
      />
    </div>
  );
}
