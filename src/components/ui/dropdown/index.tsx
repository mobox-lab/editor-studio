import Arrow from '@/../public/svg/arrow.svg?component';
import { clsxm } from '@/utils';
import { motion } from 'framer-motion';
import { FC, useState } from 'react';
import Popover from '../popover';

export type DropdownItem = {
  label: string;
  value: string | number;
};

type DropdownProps = {
  items: DropdownItem[];
  selectedItem: DropdownItem | null;
  onSelectItem: (item: DropdownItem | null) => void;
  className?: string;
  popContainerClass?: boolean;
};

const Dropdown: FC<DropdownProps> = ({ items, selectedItem, onSelectItem, className, popContainerClass }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Popover
      open={isOpen}
      onOpenChange={setIsOpen}
      placement="bottom"
      render={() => (
        <div className={clsxm('flex flex-col p-1.5', popContainerClass)}>
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
      <div
        className={clsxm(
          'flex cursor-pointer select-none items-center justify-between gap-1.5 rounded-sm bg-white/10 px-3 py-2.5 pr-3.5',
          className,
        )}
      >
        {selectedItem ? selectedItem.label : 'Select an item'}
        <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
          <Arrow className="h-1.5 w-1.5" />
        </motion.div>
      </div>
    </Popover>
  );
};

export default Dropdown;
