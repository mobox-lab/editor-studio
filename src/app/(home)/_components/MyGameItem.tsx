'use client';
import ArcanaIcon from '@/../public/svg/arcana.svg?component';
import DataIcon from '@/../public/svg/data.svg?component';
import EditIcon from '@/../public/svg/edit.svg?component';
import EmptySVG from '@/../public/svg/empty.svg?component';
import GparkIcon from '@/../public/svg/gpark.svg?component';
import LoadingSvg from '@/../public/svg/loading.svg?component';
import RemoveIcon from '@/../public/svg/remove.svg?component';
import SubmitIcon from '@/../public/svg/submit.svg?component';
import { DataListType } from '@/api/types/p12';
import { arcanaEditCreationDialogOpen, arcanaEditCreationIdAtom } from '@/atoms/category/arcana';
import Message from '@/components/ui/message';
import ToastIcon from '@/components/ui/toast/ToastIcon';
import { useMutationIsPublication } from '@/hooks/arcana/useMutationIsPublication';
import { useMutationToggleGameStatus } from '@/hooks/arcana/useMutationToggleGameStatus';
import { useP12Address } from '@/hooks/editor/useP12Account';
import { openExternalLink, sendEvent } from '@/utils';
import { clsx } from 'clsx';
import { useSetAtom } from 'jotai';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

export default function MyGameItem({
  gameInfo,
  refetchGameList,
}: {
  gameInfo: DataListType | null;
  refetchGameList?: () => void;
}) {
  const setOpen = useSetAtom(arcanaEditCreationDialogOpen);
  const setGameId = useSetAtom(arcanaEditCreationIdAtom);

  const onEdit = useCallback(() => {
    if (!gameInfo?.p12GameId) return;
    sendEvent('ed_mygame_manage', '管理我的游戏', {
      game_id: gameInfo?.gameCode,
      type: gameInfo?.channel === 2 ? 'gpark' : gameInfo?.channel === 4 ? 'arcana' : undefined,
      status: 2,
    });
    setOpen(true);
    setGameId(gameInfo?.p12GameId ?? null);
  }, [gameInfo?.channel, gameInfo?.gameCode, gameInfo?.p12GameId, setGameId, setOpen]);

  const { address } = useP12Address();
  const { mutateAsync: toggleGameStatusAsync } = useMutationToggleGameStatus();
  const { mutateAsync: isPublicationAsync } = useMutationIsPublication();
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [removeLoading, setRemoveLoading] = useState<boolean>(false);

  const submit = async (id?: number) => {
    if (!address || !id) return;
    setSubmitLoading(true);
    try {
      const isPublication = await isPublicationAsync(address);
      if (isPublication) {
        await toggleGameStatusAsync({ id, status: true });
        toast.success(`Submit creation #${id} successfully.`);
        refetchGameList?.();
      } else {
        openExternalLink('https://arcana.p12.games/');
      }
    } catch (error) {
      toast.error(`Submit creation #${id} failed. Please try again..`);
    } finally {
      setSubmitLoading(false);
    }
  };

  const remove = async (id?: number) => {
    if (!address || !id) return;
    setRemoveLoading(true);
    try {
      await toggleGameStatusAsync({ id, status: false });
      toast.success(`Remove creation #${id} successfully.`);
      refetchGameList?.();
    } catch (error) {
      toast.error(`Remove creation #${id} failed. Please try again..`);
    } finally {
      setRemoveLoading(false);
    }
  };

  if (!gameInfo) {
    return (
      <div className="relative flex min-h-[280px] cursor-pointer items-center justify-center border border-gray-500">
        <EmptySVG />
      </div>
    );
  }
  return (
    <div className="relative cursor-pointer border border-gray-500">
      <div className="relative h-31.5 w-full">
        <Image src={gameInfo.cover} style={{ objectFit: 'cover' }} alt="game-image" fill />
      </div>
      <div className="relative mt-1.5 px-2">
        {gameInfo?.channel === 2 && (
          <div className="absolute -top-2.5 left-2 h-9 w-9 overflow-hidden rounded-lg border-2 border-gray-700">
            <Image src={gameInfo.icon} style={{ objectFit: 'cover' }} alt="game-image" fill />
          </div>
        )}
        <div className={clsx('flex items-center justify-between', { 'ml-9': gameInfo?.channel === 2 })}>
          <p className={clsx('text-sm font-medium', { 'pl-1.5 ': gameInfo?.channel === 2 })}>{gameInfo.name}</p>
        </div>
        <div className="mt-2 flex gap-1.5">
          <div className="rounded-sm bg-blue/20 px-2 py-[1px] text-xs/4.5 text-blue">
            {gameInfo.isSubmitted ? 'Online' : 'Offline'}
          </div>
          <div className="rounded-sm bg-blue/20 px-2 py-[1px] text-xs/4.5 text-blue">v{gameInfo.version}</div>
          {/* <div className="rounded-sm bg-blue/20 px-2 py-[1px] text-xs/4.5 text-blue">10/27/2023 11:32</div> */}
        </div>
        <div className="mt-3 grid grid-cols-3">
          <div>
            <div className="text-xs text-gray-300">PV</div>
            <div className="mt-1.5 text-sm/5 font-semibold">--</div>
          </div>
          <div>
            <div className="text-xs text-gray-300">DAU</div>
            <div className="mt-1.5 text-sm/5 font-semibold">--</div>
          </div>
          <div>
            <div className="text-xs text-gray-300">DNU</div>
            <div className="mt-1.5 text-sm/5 font-semibold">--</div>
          </div>
        </div>
      </div>
      <div className="mt-4 flex h-9 items-center justify-between pl-2">
        {gameInfo.channel === 2 ? (
          <GparkIcon className="h-2.5" />
        ) : gameInfo.channel === 4 ? (
          <ArcanaIcon className="h-2.5" />
        ) : null}

        {gameInfo.channel === 2 ? (
          <div className="relative flex h-9 items-center bg-white/10">
            <div className="flex items-center gap-2 opacity-20">
              <div className="flex items-center gap-1 pl-3 text-sm font-semibold" onClick={onEdit}>
                <EditIcon className="h-5" /> Edit
              </div>
              <div className="h-3 w-[1px] bg-white"></div>
              <div className="flex items-center gap-1 pr-3 text-sm font-semibold">
                <DataIcon className="h-5" /> Data
              </div>
            </div>
          </div>
        ) : gameInfo.channel === 4 ? (
          <div className="relative flex h-9 items-center bg-white/10 px-3">
            <div className="flex items-center gap-2">
              {/* {gameInfo.isSubmitted ? (
                <div
                  className="flex min-w-[87px] items-center justify-center pl-3"
                  onClick={() => {
                    if (removeLoading) return;
                    sendEvent('ed_mygame_manage', '管理我的游戏', {
                      game_id: gameInfo?.gameCode,
                      type: gameInfo?.channel === 2 ? 'gpark' : gameInfo?.channel === 4 ? 'arcana' : undefined,
                      status: 2,
                    });
                    remove(gameInfo?.p12GameId);
                  }}
                >
                  {removeLoading ? (
                    <LoadingSvg className="animate-spin" />
                  ) : (
                    <div className="flex items-center gap-1 text-sm font-semibold">
                      <RemoveIcon className="h-6" /> Remove
                    </div>
                  )}
                </div>
              ) : (
                <div
                  className="flex min-w-[87px] items-center justify-center pl-3"
                  onClick={() => {
                    if (submitLoading) return;
                    sendEvent('ed_mygame_manage', '管理我的游戏', {
                      game_id: gameInfo?.gameCode,
                      type: gameInfo?.channel === 2 ? 'gpark' : gameInfo?.channel === 4 ? 'arcana' : undefined,
                      status: 1,
                    });
                    submit(gameInfo?.p12GameId);
                  }}
                >
                  {submitLoading ? (
                    <LoadingSvg className="animate-spin" />
                  ) : (
                    <div className="flex items-center gap-1  text-sm font-semibold">
                      <SubmitIcon className="h-5" /> Submit
                    </div>
                  )}
                </div>
              )} */}
              {/* <div className="h-3 w-[1px] bg-white"></div> */}
              <div className="flex items-center gap-1 text-sm font-semibold" onClick={onEdit}>
                <EditIcon className="h-5" /> Edit
              </div>
            </div>
          </div>
        ) : null}
      </div>
      {/* <StyledButton className="h-9 w-full" variant="gradient">
        Publish
      </StyledButton> */}

      {/* <div className="absolute left-0 top-0 flex items-center gap-0.5 rounded-ee-lg rounded-ss-lg bg-black/20 px-2 py-1.5 font-semibold backdrop-blur-lg">
        <div className="flex items-center gap-2 text-xs font-bold">
          No.1
          <p className="text-xs/6.5 flex items-center font-semibold text-red-300">
            <VoteIcon className="mr-1 h-3.5 w-3.5" />
            123
          </p>
        </div>
      </div> */}
    </div>
  );
}
