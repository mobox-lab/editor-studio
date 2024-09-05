'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import dayjs from 'dayjs';
import EmptySVG from '@/../public/svg/empty.svg?component';
import MoreIcon from '@/../public/svg/more.svg?component';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import { DataListType } from '@/api/types/p12';
import { arcanaEditCreationDialogOpen, arcanaEditCreationIdAtom } from '@/atoms/category/arcana';
import { useMutationIsPublication, useMutationPublishGame } from '@/hooks/arcana/useMutationPublication';
import { useMutationToggleGameStatus } from '@/hooks/arcana/useMutationToggleGameStatus';
import { useP12Address } from '@/hooks/editor/useP12Account';
import { openExternalLink, sendEvent } from '@/utils';
import Popover from '@/components/ui/popover';
import Dialog from '@/components/ui/dialog';
import Link from 'next/link';
import { DEFAULT_COVER } from '@/constants/editor';

export default function MyGameItem({
  gameInfo,
  refetchGameList,
}: {
  gameInfo: DataListType | null;
  refetchGameList?: () => void;
}) {
  const [game, setGame] = useState(gameInfo);
  const [isShowUnpublish, setShowUnpublish] = useState(false);
  const [isShowRemoveTip, setShowRemoveTip] = useState(false);
  const [improveTips, setImproveTips] = useState(false);
  const setOpen = useSetAtom(arcanaEditCreationDialogOpen);
  const setGameId = useSetAtom(arcanaEditCreationIdAtom);

  const onEdit = useCallback(() => {
    if (!game?.p12GameId) return;
    sendEvent('ed_mygame_manage', '管理我的游戏', {
      game_id: game?.gameCode,
      type: game?.channel === 2 ? 'gpark' : game?.channel === 4 ? 'arcana' : undefined,
      status: 2,
    });
    setOpen(true);
    setGameId(game?.p12GameId ?? null);
  }, [game?.channel, game?.gameCode, game?.p12GameId, setGameId, setOpen]);

  const { address } = useP12Address();
  const { mutateAsync: toggleGamePublish, isPending: isPublishLoading } = useMutationPublishGame();
  const { mutateAsync: toggleGameStatusAsync, isPending: isToggleGameStatusLoading } = useMutationToggleGameStatus();
  const { mutateAsync: isPublicationAsync } = useMutationIsPublication();

  const submit = async () => {
    if (!address) return;

    if (isToggleGameStatusLoading) return;

    const id = game!.p12GameId!;

    sendEvent('ed_mygame_manage', '管理我的游戏', {
      game_id: game?.gameCode,
      type: game?.channel === 2 ? 'gpark' : game?.channel === 4 ? 'arcana' : undefined,
      status: 1,
    });

    try {
      const isPublication = await isPublicationAsync(address);
      if (isPublication) {
        await toggleGameStatusAsync({ id, status: true });
        toast.success(`Submit creation #${id} successfully.`);
        setGame({
          ...game!,
          isSubmitted: true,
        });
        refetchGameList?.();
      } else {
        openExternalLink('https://arcana.p12.games/');
      }
    } catch (error) {
      toast.error(`Submit creation #${id} failed. Please try again..`);
    }
  };

  const remove = async () => {
    if (!address) return;

    if (isToggleGameStatusLoading) return;
    const id = game!.p12GameId!;
    sendEvent('ed_mygame_manage', '管理我的游戏', {
      game_id: game?.gameCode,
      type: game?.channel === 2 ? 'gpark' : game?.channel === 4 ? 'arcana' : undefined,
      status: 2,
    });

    try {
      await toggleGameStatusAsync({ id, status: false });
      toast.success(`Remove creation #${id} successfully.`);
      setGame({
        ...game!,
        isSubmitted: false,
      });
      refetchGameList?.();
    } catch (error) {
      toast.error(`Remove creation #${id} failed. Please try again..`);
    }
  };

  const onTogglePublishGame = useCallback(async () => {
    if (isPublishLoading) return;

    const status = game!.canPlay ? 1 : 0;

    try {
      await toggleGamePublish({
        id: game!.p12GameId!,
        status,
      });

      setGame({
        ...game!,
        state: status,
      });
    } catch (error: any) {
      if (error?.code === 400) {
        setImproveTips(true);
        return;
      }
    }
  }, [toggleGamePublish, isPublishLoading, game]);

  useEffect(() => {
    setGame(gameInfo);
  }, [gameInfo]);

  if (!game) {
    return (
      <div className="relative flex min-h-[144px] cursor-pointer items-center justify-center border border-gray-500">
        <EmptySVG />
      </div>
    );
  }

  return (
    <>
      <div className="flex h-[210px] cursor-pointer flex-col border border-gray-500">
        <div className="relative h-[144px] w-full">
          <div className="absolute left-0 top-0 flex items-center rounded-br-sm bg-[#00000040] p-[6px] backdrop-blur-[7.78px]">
            {game.rank && game.rank <= 3 ? (
              <img src={`/svg/rank-${game.rank}.svg`} className="w-[20px]" alt="" />
            ) : (
              <span className="font-poppins text-[12px] font-semibold text-white">No.{game.rank}</span>
            )}
            <img src="/svg/ticket.svg" className="ml-[6px] mr-[2px] w-[18px]" alt="" />
            <span className="font-poppins text-[14px] font-semibold text-[#F2B8B0]">12321</span>
          </div>
          <Image src={game.cover || DEFAULT_COVER} style={{ objectFit: 'cover' }} alt="game image" fill />
        </div>
        <div className="relative flex-1 p-[8px]">
          {game.canPlay ? (
            <Link
              href={`/game/${game.gameCode}`}
              className="absolute right-2 top-0 flex translate-y-[-50%] items-center rounded-full bg-gradient-button px-[10px] py-1 !no-underline"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="11" height="14" viewBox="0 0 11 14" fill="none">
                <path d="M11 7L0.5 13.0622L0.500001 0.937822L11 7Z" fill="black" />
              </svg>
              <span className="ml-[4px] text-[13px] font-semibold text-black">PLAY</span>
            </Link>
          ) : null}
          <p className="text-[14px]">{game.name}</p>
          <div className="mt-[8px] flex items-center">
            <div className="flex flex-1 items-center">
              <span className="rounded-sm bg-[#4383ff20] px-[8px] text-[12px] leading-[20px] text-blue">
                {game.canPlay ? 'Published' : 'Unpublish'}
              </span>
              <span className="ml-[6px] rounded-sm bg-[#4383ff20] px-[8px] text-[12px] leading-[20px] text-blue">
                v{game.version}
              </span>
              <span className="ml-[6px] rounded-sm bg-[#4383ff20] px-[8px] text-[12px] leading-[20px] text-blue">
                {dayjs(game.updatedAt).format('DD/MM/YYYY')}
              </span>
            </div>
            <div className=" relative">
              <Popover
                render={() => (
                  <ul className="w-[106px] p-[6px]">
                    <li className="flex h-[30px] items-center rounded-sm px-[10px] text-sm hover:bg-white/10" onClick={onEdit}>
                      Edit Info
                    </li>
                    <li
                      className="flex h-[30px] items-center rounded-sm px-[10px] text-sm hover:bg-white/10"
                      onClick={game.canPlay ? () => setShowUnpublish(true) : onTogglePublishGame}
                    >
                      {isPublishLoading ? (
                        <div className="flex-center w-full">
                          <LoadingSvg className="animate-spin" />
                        </div>
                      ) : game.canPlay ? (
                        'Unpublish'
                      ) : (
                        'Published'
                      )}
                    </li>
                    <li
                      className="flex h-[30px] items-center rounded-sm px-[10px] text-sm hover:bg-white/10"
                      onClick={game.isSubmitted ? () => setShowRemoveTip(true) : submit}
                    >
                      {isToggleGameStatusLoading ? (
                        <div className="flex-center w-full">
                          <LoadingSvg className="animate-spin" />
                        </div>
                      ) : game.isSubmitted ? (
                        'Remove'
                      ) : (
                        'Submit'
                      )}
                    </li>
                  </ul>
                )}
                placement="right-end"
              >
                <MoreIcon className="hover:opacity-80" />
              </Popover>
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={improveTips}
        onOpenChange={() => setImproveTips(false)}
        render={({ close }) => (
          <div className="flex flex-col items-center p-[24px] md:w-full">
            <div className="text-orange flex flex-col items-center gap-4">
              <img src="/svg/warning.svg" alt="Warning" className="h-12 w-12" />
              <p className="text-center text-[20px] font-semibold text-legendary">Please complete game information</p>
            </div>
            <div className="mt-8 text-sm/6">
              You have to complete game information:
              <ul>
                <li>&bull; 4 Images with 5:3 or 3:5 ratio, size &lt; 1MB, support PNG, JPG.</li>
                <li>&bull; 1 Game Icon with 1:1 ratio, 256x256 pixels, size &lt; 1MB, support PNG, JPG.</li>
              </ul>
            </div>
            <div className="mt-8 flex w-full items-center justify-center">
              {/* <button className="flex-center mr-[16px] h-[44px] flex-1 rounded-sm border hover:opacity-80">Edit Game</button> */}
              <button
                className="flex-center h-[44px] w-[50%] rounded-sm bg-gradient-p12 hover:opacity-80"
                onClick={() => {
                  setImproveTips(false);
                  onEdit();
                }}
              >
                Edit Game
              </button>
            </div>
          </div>
        )}
      />
      {isShowRemoveTip ? (
        <Dialog
          open={true}
          className="w-[440px]"
          onOpenChange={() => setShowRemoveTip(false)}
          render={({ close }) => (
            <div className="flex flex-col items-center p-[24px] md:w-full">
              <div className="text-orange flex flex-col items-center gap-4">
                <img src="/svg/warning.svg" alt="Warning" className="h-12 w-12" />
                <p className="text-center text-[20px] font-semibold text-legendary">
                  Remove #{game.p12GameId} from Arcana Galley
                </p>
              </div>
              <div className="mt-8 text-sm/6">
                Once removed, the creation will no longer displayed in the Arcana Gallery and cannot be voted.
              </div>
              <div className="mt-8 flex w-full items-center justify-center">
                <button className="flex-center mr-[16px] h-[44px] flex-1 rounded-sm border hover:opacity-80" onClick={close}>
                  Cancel
                </button>
                <button
                  className="flex-center h-[44px] flex-1 rounded-sm bg-gradient-p12 hover:opacity-80"
                  onClick={() => {
                    close();
                    remove();
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          )}
        />
      ) : null}
      {isShowUnpublish ? (
        <Dialog
          open={true}
          className="w-[440px]"
          onOpenChange={() => setShowUnpublish(false)}
          render={({ close }) => (
            <div className="flex flex-col items-center p-[24px] md:w-full">
              <div className="text-orange flex flex-col items-center gap-4">
                <img src="/svg/warning.svg" alt="Warning" className="h-12 w-12" />
                <p className="text-center text-[20px] font-semibold text-legendary">Unpublish {game.p12GameId}</p>
              </div>
              <div className="mt-8 text-sm/6">Once unpublished, the creation will be unplayable.</div>
              <div className="mt-8 flex w-full items-center justify-center">
                <button className="flex-center mr-[16px] h-[44px] flex-1 rounded-sm border hover:opacity-80" onClick={close}>
                  Cancel
                </button>
                <button
                  className="flex-center h-[44px] flex-1 rounded-sm bg-gradient-p12 hover:opacity-80"
                  onClick={() => {
                    close();
                    onTogglePublishGame();
                  }}
                >
                  Unpublish
                </button>
              </div>
            </div>
          )}
        />
      ) : null}
    </>
  );
}
