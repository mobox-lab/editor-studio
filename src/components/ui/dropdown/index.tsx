import Arrow from '@/../public/svg/arrow.svg?component';
import { clsxm } from '@/utils';
import { motion } from 'framer-motion';
import { FC, useMemo, useState } from 'react';
import { tv } from 'tailwind-variants';
import Popover from '../popover';

const dropdownStyles = tv({
  slots: {
    container: 'flex cursor-pointer select-none items-center justify-between gap-1.5 rounded-sm bg-white/10 px-3 py-2.5 pr-3.5',
    arrow: 'h-2.5 w-2.5 fill-white',
    popContainer: 'flex flex-col p-1.5',
  },
  variants: {
    type: {
      default: { container: 'bg-white/10 hover:bg-white/20' },
      warning: { container: 'bg-legendary/20 hover:bg-legendary/30 text-legendary' },
    },
  },
  defaultVariants: {
    type: 'default',
  },
});

export type OptionValue = string | number | null;
export type DropdownItem = {
  label: string | JSX.Element;
  value: OptionValue;
};

type DropdownProps = {
  type?: 'default' | 'warning';
  items: DropdownItem[];
  selectedValue: OptionValue;
  onSelectItem: (item: DropdownItem | null) => void;
  className?: string;
  popContainerClass?: string;
};

const Dropdown: FC<DropdownProps> = ({ items, type, selectedValue, onSelectItem, className, popContainerClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { container, arrow, popContainer } = dropdownStyles({ type });

  const selectedLabel = useMemo(() => {
    return items.find((item) => item.value === selectedValue)?.label;
  }, [items, selectedValue]);

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom"
      render={() => (
        <div className={popContainer({ className: popContainerClass })}>
          {items.map((item) => (
            <div
              key={item.value}
              onClick={() => {
                onSelectItem(item);
                setIsOpen(false);
              }}
              className="flex cursor-pointer items-center gap-1.5 rounded-sm px-2.5 py-2 hover:bg-white/10"
            >
              {item.label}
            </div>
          ))}
        </div>
      )}
    >
      <div className={container({ className })}>
        {selectedLabel ? selectedLabel : 'Select an item'}
        <motion.div animate={{ rotate: isOpen ? 0 : 180 }}>
          <Arrow className={clsxm(arrow(), { 'fill-gray-250': !isOpen })} />
        </motion.div>
      </div>
    </Popover>
  );
};

export default Dropdown;
