'use client';

type DragonProposalProps = {};

export default function DragonProposal({}: DragonProposalProps) {
  return (
    <div className="cursor-pointer border border-gray-400 p-4 pb-3 backdrop-blur-sm hover:bg-white/[0.08]">
      <p className="text-sm/6 font-medium">
        In the middle of the map scene, insert a massive burning sword (similar to Sargeras inserting a sword in Azeroth),
        giving rise to a new corrupted dragon species as the antagonists for the gam....
      </p>
      <div className="mt-4 border-t border-gray-400" />
      <p className="mt-3 text-base/6 font-semibold">
        <span className="text-yellow">27</span> Votes
      </p>
      <div className="mt-7.5 flex items-center gap-2">
        <div className="text-green bg-green/20 px-2.5 text-xs/4.5">Active</div>
        <p className="text-xs/5 font-semibold">by 0x28...a7C8</p>
      </div>
      <div className="mt-1.5 text-sm/5">
        <p className="flex justify-between">
          <span className="text-gray-300">Start date:</span>
          Dec 17, 2023, 3:30 AM
        </p>
        <p className="mt-0.5 flex justify-between">
          <span className="text-gray-300">End date:</span>
          Dec 27, 2023, 3:30 AM
        </p>
      </div>
      <p className="mt-3 cursor-pointer text-center text-xs/6 font-semibold text-blue">GO VOTE</p>
    </div>
  );
}
