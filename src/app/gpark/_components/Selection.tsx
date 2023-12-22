'use client';

import { P12SelectionGameInfo } from '@/api';
import { useP12SelectionGames } from '@/hooks/gpark/useP12SelectionGames';
import { openExternalLink } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { useInterval } from 'react-use';

export default function Selection() {
  const { data, isLoading } = useP12SelectionGames();
  const [lists, setLists] = useState<P12SelectionGameInfo[]>([]);
  const selectedGame = useMemo(() => lists[0], [lists]);
  const unSelectedGames = useMemo(() => lists.slice(1, 4), [lists]);
  const router = useRouter();

  useEffect(() => {
    if (isLoading || !data?.length) return;
    setLists(data);
  }, [data, isLoading]);

  useInterval(() => {
    if (!lists?.length) return;
    const newList = lists.slice(1);
    newList.push(lists[0]);
    setLists(newList);
  }, 4000);

  return (
    <div>
      <h3 className="text-base font-medium">Selection</h3>
      <div className="mt-3 flex gap-3">
        <div
          className="h-93 w-[35.625rem] flex-none cursor-pointer border border-gray-500 hover:border-gray-350"
          onClick={() => {
            selectedGame?.externalLink
              ? openExternalLink(selectedGame.externalLink)
              : router.push(`/game/${selectedGame?.mwGameCode}`);
          }}
        >
          <div className="relative h-80 w-full">
            <img className="h-full w-full object-cover" src={selectedGame?.mainImage} alt="game-image" />
          </div>
          <div className="relative p-4">
            <div className="absolute bottom-4 left-4 h-15 w-15 overflow-hidden rounded-lg border-2 border-gray-700">
              <img className="h-full w-full object-cover" src={selectedGame?.gameIcon} alt="game-image" />
            </div>
            <div className="ml-15 flex items-center justify-between">
              <p className="pl-3 text-base/5 font-semibold">{selectedGame?.gameName}</p>
              <p className="text-xs text-gray-300">By {selectedGame?.showName}</p>
            </div>
          </div>
        </div>
        <div className="grid w-full grid-cols-1 gap-3">
          {unSelectedGames?.length
            ? unSelectedGames.map((item, index) => (
                <div
                  key={index}
                  className="relative cursor-pointer border border-gray-500 hover:border-gray-350"
                  onClick={() => {
                    item?.externalLink ? openExternalLink(item.externalLink) : router.push(`/game/${item?.mwGameCode}`);
                  }}
                >
                  <img className="h-full w-full object-cover" src={selectedGame?.mainImage} alt="game-image" />
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}
