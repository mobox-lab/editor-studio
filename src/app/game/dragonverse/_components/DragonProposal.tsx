'use client';

import { DragonProposal } from '@/api';
import { DragonProposalState } from '@/constants/enum';
import { clsxm, openExternalLink, sendEvent, shortenAddress } from '@/utils';
import dayjs from 'dayjs';

type DragonProposalProps = {
  data?: DragonProposal;
};

function DragonState({ state }: { state?: DragonProposalState }) {
  if (state === DragonProposalState.ACTIVE) return <div className="bg-green/20 px-2.5 text-xs/4.5 text-green">Active</div>;
  return <div className="bg-blue/20 px-2.5 text-xs/4.5 text-blue">Closed</div>;
}

export default function DragonProposal({ data }: DragonProposalProps) {
  return (
    <div
      onClick={() => {
        https: sendEvent('gp_gov_proposal', '点击具体proposal', { proposal_id: data?.id });
        openExternalLink(`https://snapshot.org/#/dragonverseneo.eth/proposal/${data?.id}`);
      }}
      className="flex h-[358px] cursor-pointer flex-col border border-gray-400 p-4 pb-3 backdrop-blur-sm hover:bg-white/[0.08]"
    >
      <p className="text-sm/6 font-medium">{data?.title}</p>
      <div className="mt-4 border-t border-gray-400" />
      <p className="mt-3 text-base/6 font-semibold">
        <span className="text-yellow">{data?.votes?.toLocaleString()}</span> Votes
      </p>
      <div className="mt-auto">
        <div className="mt-7.5 flex items-center gap-2">
          <DragonState state={data?.state} />
          <p className="text-xs/5 font-semibold">by {shortenAddress(data?.author)}</p>
        </div>
        <div className="mt-1.5 text-sm/5">
          {data?.start ? (
            <p className="flex justify-between">
              <span className="text-gray-300">Start date:</span>
              {dayjs(data.start * 1000).format('MMM D, YYYY, h:mm A')}
            </p>
          ) : null}
          {data?.end ? (
            <p className="mt-0.5 flex justify-between">
              <span className="text-gray-300">End date:</span>
              {dayjs(data.end * 1000).format('MMM D, YYYY, h:mm A')}
            </p>
          ) : null}
        </div>
        <p
          className={clsxm('mt-3 cursor-pointer text-center text-xs/6 font-semibold text-blue', {
            'text-gray-300': data?.state === DragonProposalState.CLOSED,
          })}
        >
          GO VOTE
        </p>
      </div>
    </div>
  );
}
