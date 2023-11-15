import LastGame from '@/components/ui/card/LastGame';

export default function Continue() {
  return (
    <div className="h-[438px] overflow-auto">
      <div className="grid grid-cols-1 gap-4">
        <LastGame />
        <LastGame />
        <LastGame />
        <LastGame />
        <LastGame />
        <LastGame />
        <LastGame />
        <LastGame />
        <LastGame />
        <LastGame />
      </div>
    </div>
  );
}
