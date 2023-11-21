import { twMerge } from 'tailwind-merge';
import SearchSVG from '@/../public/svg/search.svg?component';

type SearchProps = {
  className?: string;
  placeholder?: string;
};
export default function Search({ className, placeholder = 'work name...' }: SearchProps) {
  return (
    <div className={twMerge('flex items-center gap-2 rounded-sm bg-white/10 px-3 py-2.5 text-xs/5', className)}>
      <SearchSVG />
      <input type="text" className="w-4/5 bg-transparent text-xs/5" placeholder={placeholder} />
    </div>
  );
}
