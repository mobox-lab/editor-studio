import RightSvg from '@/../public/svg/right.svg?component';
import StyledButton from '@/components/ui/button/StyledButton';
import Empty from '@/components/ui/empty';
import Segmented from '@/components/ui/segmented';
import { DragonProposalSortField } from '@/constants/enum';
import { useFetchP12DragonGovernInfo } from '@/hooks/dragon/useFetchP12DragonGovernInfo';
import { useFetchP12DragonProposals } from '@/hooks/dragon/useFetchP12DragonProposals';
import { clsxm, openExternalLink } from '@/utils';
import clsx from 'clsx';
import { useMemo, useState } from 'react';
import { Keyboard } from 'swiper/modules';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import DragonBorder from './DragonBorder';
import DragonProposal from './DragonProposal';

const opts = [
  { label: 'ALL', value: DragonProposalSortField.ALL },
  { label: 'Active Proposals', value: DragonProposalSortField.ACTIVE_PROPOSALS },
  { label: 'Executed Proposals', value: DragonProposalSortField.EXECUTED_PROPOSALS }, // TODO: NEO API
];
export default function DragonVerseNeo({ className }: { className?: string }) {
  const [type, setType] = useState<DragonProposalSortField>(DragonProposalSortField.ALL);
  const { data: governInfo, isLoading } = useFetchP12DragonGovernInfo();
  const { data, isLoading: isLoadingProposals, fetchNextPage, hasNextPage } = useFetchP12DragonProposals(type);
  const [swiper, setSwiper] = useState<SwiperClass | null>(null);

  const proposals = useMemo(() => {
    if (data?.pages?.length && data.pages[0]?.length) {
      const res = data.pages.map((page) => page).flat(1);
      return res;
    } else return [];
  }, [data?.pages]);

  return (
    <div className={clsxm('relative mt-12 border border-gray-400 bg-gray-550/10 p-6 px-7.5 py-11', className)}>
      <DragonBorder className="inset-2 -z-10" />
      <div className="flex-center">
        <img draggable={false} src="/img/gpark/dragon-neo-title.webp" alt="DragonVerse" className="h-13" />
      </div>
      <p className="mt-2 text-center text-sm/6 font-medium">Co-created & Co-governed</p>
      {/* <div className={clsx('flex-center -mx-5 mt-3.5 gap-7.5 bg-white/10 py-1.5', { 'animate-pulse': isLoading })}>
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">{governInfo?.activeProposal?.toLocaleString() ?? 0}</span> active proposals
        </div>
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">{governInfo?.closedProposal?.toLocaleString() ?? 0}</span> closed Proposals
        </div>
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">{governInfo?.voterLength?.toLocaleString() ?? 0}</span> voters
        </div>
        <div className="font text-sm/6 font-semibold">
          <span className="text-xl/6 text-yellow">{governInfo?.votesCount?.toLocaleString() ?? 0}</span> DragonBit Votes
        </div>
      </div> */}
      <div className="mx-2.5">
        <div className="mt-9 flex items-end gap-4">
          <StyledButton
            variant="gradient-red"
            className="flex w-[362px] flex-col items-center gap-0.5 py-3 text-lg/5 font-bold"
            onClick={() => openExternalLink('https://testnet.snapshot.org/#/dracoens.eth')}
          >
            Voting Hall <div className="text-xs/3 font-semibold">Snapshot</div>
          </StyledButton>
          <StyledButton
            className="flex h-15 w-[362px] flex-col items-center gap-0.5 py-3 text-lg/5 font-bold"
            onClick={() => openExternalLink('https://testnet.snapshot.org/#/dracoens.eth/create')}
          >
            + New Proposal
          </StyledButton>
          <Segmented
            className="h-9.5 whitespace-nowrap text-sm/4 font-semibold"
            defaultValue={type}
            onChange={(value) => {
              setType(value as DragonProposalSortField);
            }}
            options={opts}
          />
        </div>
        <div className="relative mt-7.5">
          <div
            className="flex-center absolute -left-5 top-1/2 z-10 h-30 w-5 -translate-y-1/2 cursor-pointer border border-r-0 border-gray-400/50 bg-white/[0.08]"
            onClick={() => swiper?.slidePrev()}
          >
            <RightSvg className="rotate-180 fill-[#4C4C4C]" />
          </div>
          <Swiper
            keyboard={{
              enabled: true,
            }}
            onSwiper={(swiper) => setSwiper(swiper)}
            onSlideChange={(swiper) => {
              if (((swiper?.activeIndex ?? 0) % 15 === 12 || swiper?.isEnd) && hasNextPage) fetchNextPage();
            }}
            className="relative"
            draggable
            grabCursor
            initialSlide={0}
            slidesPerView={4}
            spaceBetween={16}
            modules={[Keyboard]}
          >
            {proposals?.length ? (
              proposals.map((proposal) => (
                <SwiperSlide key={proposal.id}>
                  <DragonProposal data={proposal} />
                </SwiperSlide>
              ))
            ) : (
              <Empty />
            )}
          </Swiper>

          <div
            className="flex-center absolute -right-5 top-1/2 h-30 w-5 -translate-y-1/2 cursor-pointer border border-l-0 border-gray-400/50 bg-white/[0.08]"
            onClick={() => swiper?.slideNext()}
          >
            <RightSvg className="fill-[#4C4C4C]" />
          </div>
        </div>
        <div className="mt-12 flex select-none flex-col items-center justify-center gap-2">
          <img className="h-13" draggable={false} alt="Voting Power" src="/img/gpark/dragon-voting-power.png" />
          {/* <p className="text-sm/6 font-medium">The Voting power for Co-governance</p> */}
        </div>
        <div className="mt-7.5 grid grid-cols-2 gap-5">
          <div className="flex items-center gap-3 border border-gray-400 p-3 pr-5">
            <img className="h-25.5 w-25.5 select-none" draggable={false} alt="ve-mobox" src="/img/gpark/ve-mobox.png" />
            <div className="flex w-[274px] flex-col gap-3">
              <h4 className="text-xl/6 font-semibold">$veMBOX</h4>
              <p className="line-clamp-2 text-sm/6 font-medium">Your $veMBOX balance is equivalent to votes on a 1:1 ratio</p>
            </div>
            <StyledButton
              variant="gradient-green"
              className="ml-3 flex w-[110px] flex-col items-center gap-0.5 py-3 text-lg/5 font-bold"
              onClick={() => openExternalLink('https://www.mobox.io/#/iframe/momo')}
            >
              GET
            </StyledButton>
          </div>
          <div className="flex items-center gap-3 border border-gray-400 p-3 pr-5">
            <img className="h-21.5 w-21.5" draggable={false} alt="ve-mobox" src="/img/gpark/mobox-burn.png" />
            <div className="flex w-[274px] flex-col gap-3">
              <h4 className="text-xl/6 font-semibold">Via Burn mechanism</h4>
              <p className="line-clamp-2 text-sm/6 font-medium">Burn $MBOX to acquire DragonBit at a 10x multiplier.</p>
            </div>
            <StyledButton
              variant="gradient-green"
              disabled
              className="ml-3 flex h-11 w-[110px] flex-col items-center gap-0.5 border-gray-400 py-3 text-base/4 font-bold"
            >
              Coming...
            </StyledButton>
          </div>
        </div>
      </div>
    </div>
  );
}
