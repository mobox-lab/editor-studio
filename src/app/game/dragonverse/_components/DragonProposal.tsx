'use client';

import { DragonProposal } from '@/api';
import { DragonProposalState } from '@/constants/enum';
import { clsxm, openExternalLink, sendEvent, shortenAddress, shortenSnapStr } from '@/utils';
import { computeTimeDifference } from '@/utils/date';
import { formatCompactNumber } from '@/utils/format';
import dayjs from 'dayjs';
import { useMemo } from 'react';

type DragonProposalProps = {
  data?: DragonProposal;
};

function DragonState({ state }: { state?: DragonProposalState }) {
  if (state === DragonProposalState.ACTIVE) return <div className="bg-green/20 px-2.5 text-xs/4.5 text-green">Active</div>;
  if (state === DragonProposalState.PENDING)
    return <div className="bg-legendary/20 px-2.5 text-xs/4.5 text-legendary">Pending</div>;
  return <div className="bg-blue/20 px-2.5 text-xs/4.5 text-blue">Closed</div>;
}

export default function DragonProposal({ data }: DragonProposalProps) {
  const voteTotal = useMemo(() => {
    const total = formatCompactNumber(data?.scores_total ?? 0);
    return total?.length >= 8 ? shortenSnapStr(total) : total;
  }, [data?.scores_total]);

  const dateStr = useMemo(() => {
    if (data?.state === DragonProposalState.CLOSED) return 'ENDED';

    if (data?.state === DragonProposalState.ACTIVE) {
      const end = data?.end ? dayjs(data.end * 1000) : dayjs();
      const { value, str } = computeTimeDifference(end);
      return (
        <>
          ENDS IN <span className="text-[1.12vw]/[1.6vw] text-yellow xl:text-sm/5">{value}</span> {str}
        </>
      );
    }
    if (data?.state === DragonProposalState.PENDING) {
      const start = data?.start ? dayjs(data.start * 1000) : dayjs();
      const { value, str } = computeTimeDifference(start);
      return (
        <>
          STARTS IN <span className="text-[1.12vw]/[1.6vw] text-yellow xl:text-sm/5">{value}</span> {str}
        </>
      );
    }
  }, [data]);

  return (
    <div
      onClick={() => {
        https: sendEvent('gp_gov_proposal', '点击具体proposal', { proposal_id: data?.id });
        openExternalLink(`https://snapshot.org/#/dragonverseneo.eth/proposal/${data?.id}`);
      }}
      className="group flex h-[242px] cursor-pointer flex-col border border-gray-400 p-4 pb-3 backdrop-blur-sm hover:bg-white/[0.08]"
    >
      <div className="absolute left-0 top-0 origin-top-left border-[9px] border-gray-400 border-b-transparent border-r-transparent transition group-hover:scale-125" />
      <p className="line-clamp-2 h-12 overflow-hidden text-sm/6 font-medium">{data?.title}</p>
      <div className="mt-4 border-t border-gray-400" />
      <p className="mt-3 text-base/6 font-semibold">
        <span className="text-yellow">{voteTotal}</span> Votes
      </p>
      <div className="mt-auto">
        <div className="mt-7.5 flex items-center gap-2">
          <DragonState state={data?.state} />
          <p className="text-xs/5 font-semibold">by {shortenAddress(data?.author)}</p>
        </div>
        <div className="mt-2 text-xs/5 font-semibold uppercase">{dateStr}</div>
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
