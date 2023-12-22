import StyledButton from '@/components/ui/button/StyledButton';
import { clsxm } from '@/utils';
import DragonBorder from './DragonBorder';

export default function DragonVerseNeo({ className }: { className?: string }) {
  return (
    <div className={clsxm('relative mt-12 border border-gray-400 bg-gray-550/10 p-6 px-7.5 py-11', className)}>
      <DragonBorder className="inset-2 -z-10" />
      <div className="flex-center">
        <img draggable={false} src="/img/gpark/dragon-neo-title.webp" alt="DragonVerse" className="h-13" />
      </div>
      <p className="mt-2 text-center text-sm/6 font-medium">Co-created & Co-governed</p>
      <div className="flex-center -mx-5 mt-3.5 gap-7.5 bg-white/10 py-1.5">
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">3</span> active proposals
        </div>
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">19</span> closed Proposals
        </div>
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">128</span> voters
        </div>
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">7,238,012</span> DragonBit Votes
        </div>
      </div>
      <div className="mt-9 flex gap-4">
        <StyledButton variant="gradient-red" className="flex w-[362px] flex-col items-center gap-0.5 py-3 text-lg/5 font-bold">
          Voting Hall <div className="text-xs/3 font-semibold">Snapshot</div>
        </StyledButton>
        <StyledButton className="flex w-[362px] flex-col items-center gap-0.5 py-3 text-lg/5 font-bold">
          + New Proposal
        </StyledButton>
        <StyledButton
          variant="gradient-green"
          className="flex w-[110px] flex-col items-center gap-0.5 py-3 text-lg/5 font-bold"
        >
          GET
        </StyledButton>
      </div>
    </div>
  );
}
