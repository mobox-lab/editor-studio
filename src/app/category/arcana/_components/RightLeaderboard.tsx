import ArcanaGame from '@/components/ui/card/ArcanaGame';
import Dropdown, { DropdownItem } from '@/components/ui/dropdown';
import { useState } from 'react';

const dropdownItems = [
  { label: 'Total', value: 'Total' },
  { label: 'Round 2', value: 'Round 2' },
  { label: 'Round 1', value: 'Round 1' },
];
export default function RightLeaderboard() {
  const [selectedItem, setSelectedItem] = useState<DropdownItem | null>(null);

  const handleSelectItem = (item: DropdownItem | null) => {
    setSelectedItem(item);
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between gap-3">
        Leaderboard
        <Dropdown items={dropdownItems} selectedItem={selectedItem} onSelectItem={handleSelectItem} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
        <ArcanaGame />
      </div>
    </div>
  );
}
